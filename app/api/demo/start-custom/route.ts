import { NextRequest, NextResponse } from "next/server";
import { trackDemoProject } from "@/lib/demo-tracking";

const SLC_API_ENDPOINT = process.env.SLC_API_ENDPOINT || "https://api.slc.run";
const SLC_DEMO_ADMIN_TOKEN = process.env.SLC_DEMO_ADMIN_TOKEN;
const DEMO_PROJECT_PREFIX = process.env.SLC_DEMO_PROJECT_PREFIX || "demo";
const DEMO_EXPIRY_MINUTES = 30;

interface StartCustomDemoRequest {
  code: string;
  appName?: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!SLC_DEMO_ADMIN_TOKEN) {
      return NextResponse.json(
        { error: "Demo service not configured. Missing SLC_DEMO_ADMIN_TOKEN." },
        { status: 500 }
      );
    }

    const body: StartCustomDemoRequest = await request.json();
    const { code, appName: rawAppName } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Missing required field: code" },
        { status: 400 }
      );
    }

    // Basic size limit to prevent abuse (roughly 64 KB of source)
    const MAX_CODE_LENGTH = 64 * 1024;
    if (code.length > MAX_CODE_LENGTH) {
      return NextResponse.json(
        {
          error:
            "Code is too large for demo deployment. Please keep it under ~64KB.",
        },
        { status: 413 }
      );
    }

    const appName =
      rawAppName && rawAppName.trim() !== "" ? rawAppName : "custom-demo-app";

    // Generate unique project ID
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    const projectId = `${DEMO_PROJECT_PREFIX}-${timestamp}-${random}`;

    // Create project
    const createProjectResponse = await fetch(
      `${SLC_API_ENDPOINT}/v1/_control/create-project`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-slc-admin": SLC_DEMO_ADMIN_TOKEN,
        },
        body: JSON.stringify({ projectId }),
      }
    );

    if (!createProjectResponse.ok) {
      const error = await createProjectResponse
        .json()
        .catch(() => ({ error: "Unknown error" }));
      return NextResponse.json(
        { error: `Failed to create project: ${error.error || "Unknown error"}` },
        { status: createProjectResponse.status }
      );
    }

    const projectData = await createProjectResponse.json();
    const apiKey = projectData.apiKey;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Failed to get API key from project creation" },
        { status: 500 }
      );
    }

    // Deploy the custom app
    const deployResponse = await fetch(
      `${SLC_API_ENDPOINT}/v1/_control/deploy-app`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-slc-api-key": apiKey,
        },
        body: JSON.stringify({
          name: appName,
          bundle: code,
        }),
      }
    );

    if (!deployResponse.ok) {
      const error = await deployResponse
        .json()
        .catch(() => ({ error: "Unknown error" }));

      // Clean up project if deployment fails
      await fetch(`${SLC_API_ENDPOINT}/v1/_control/revoke-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-slc-admin": SLC_DEMO_ADMIN_TOKEN,
        },
        body: JSON.stringify({ projectId }),
      }).catch(() => {});

      return NextResponse.json(
        { error: `Failed to deploy app: ${error.error || "Unknown error"}` },
        { status: deployResponse.status }
      );
    }

    // Calculate expiration time
    const expiresAt = new Date(Date.now() + DEMO_EXPIRY_MINUTES * 60 * 1000);
    const expiresAtIso = expiresAt.toISOString();

    // Best-effort tracking in Supabase for cron-based cleanup
    await trackDemoProject({
      projectId,
      kind: "custom",
      expiresAt: expiresAtIso,
    });

    return NextResponse.json({
      success: true,
      projectId,
      apiKey,
      appName,
      // For compatibility with DemoConfig, we label this as a "custom" boilerplate
      boilerplate: "custom",
      expiresAt: expiresAtIso,
      expiresInSeconds: DEMO_EXPIRY_MINUTES * 60,
    });
  } catch (error) {
    console.error("Error starting custom demo:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

