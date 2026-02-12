const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

type DemoKind = "boilerplate" | "custom";

/**
 * Best-effort insert into Supabase demo_projects table.
 * Uses the service role key and REST API. Fails silently if not configured.
 */
export async function trackDemoProject(params: {
  projectId: string;
  kind: DemoKind;
  expiresAt: string;
}): Promise<void> {
  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.warn(
        "[demo-tracking] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set; skipping demo_projects insert."
      );
      return;
    }

    const url = `${SUPABASE_URL.replace(/\/+$/, "")}/rest/v1/demo_projects`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        project_id: params.projectId,
        kind: params.kind,
        expires_at: params.expiresAt,
      }),
    });

    if (!res.ok) {
      // Log on server, but don't break demo flow
      const text = await res.text();
      console.error("Failed to track demo project in Supabase:", res.status, text);
    }
  } catch (error) {
    console.error("Error tracking demo project in Supabase:", error);
  }
}

