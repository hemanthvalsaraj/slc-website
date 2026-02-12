import { NextRequest, NextResponse } from "next/server";
import { trackDemoProject } from "@/lib/demo-tracking";

const SLC_API_ENDPOINT = process.env.SLC_API_ENDPOINT || "https://api.slc.run";
const SLC_DEMO_ADMIN_TOKEN = process.env.SLC_DEMO_ADMIN_TOKEN;
const DEMO_PROJECT_PREFIX = process.env.SLC_DEMO_PROJECT_PREFIX || "demo";
const DEMO_EXPIRY_MINUTES = 30;

interface StartDemoRequest {
  boilerplate: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!SLC_DEMO_ADMIN_TOKEN) {
      return NextResponse.json(
        { error: "Demo service not configured. Missing SLC_DEMO_ADMIN_TOKEN." },
        { status: 500 }
      );
    }

    const body: StartDemoRequest = await request.json();
    const { boilerplate } = body;

    if (!boilerplate) {
      return NextResponse.json(
        { error: "Missing required field: boilerplate" },
        { status: 400 }
      );
    }

    // Generate unique project ID
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    const projectId = `${DEMO_PROJECT_PREFIX}-${timestamp}-${random}`;
    const appName = "demo-app";

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

    // Get boilerplate worker code
    const { getBoilerplate } = await import("@/lib/demo-boilerplates");
    const boilerplateData = getBoilerplate(boilerplate);

    if (!boilerplateData) {
      // Clean up project if boilerplate not found
      await fetch(`${SLC_API_ENDPOINT}/v1/_control/revoke-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-slc-admin": SLC_DEMO_ADMIN_TOKEN,
        },
        body: JSON.stringify({ projectId }),
      }).catch(() => {}); // Ignore cleanup errors

      return NextResponse.json(
        { error: `Unknown boilerplate: ${boilerplate}` },
        { status: 400 }
      );
    }

    // Deploy the boilerplate app
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
          bundle: boilerplateData.workerCode,
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
      }).catch(() => {}); // Ignore cleanup errors

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
      kind: "boilerplate",
      expiresAt: expiresAtIso,
    });

    return NextResponse.json({
      success: true,
      projectId,
      apiKey,
      appName,
      boilerplate,
      expiresAt: expiresAtIso,
      expiresInSeconds: DEMO_EXPIRY_MINUTES * 60,
    });
  } catch (error) {
    console.error("Error starting demo:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

