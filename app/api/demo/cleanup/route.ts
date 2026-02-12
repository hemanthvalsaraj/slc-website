import { NextRequest, NextResponse } from 'next/server';

const SLC_API_ENDPOINT = process.env.SLC_API_ENDPOINT || 'https://api.slc.run';
const SLC_DEMO_ADMIN_TOKEN = process.env.SLC_DEMO_ADMIN_TOKEN;

interface CleanupRequest {
  projectId: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!SLC_DEMO_ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Demo service not configured. Missing SLC_DEMO_ADMIN_TOKEN.' },
        { status: 500 }
      );
    }

    const body: CleanupRequest = await request.json();
    const { projectId } = body;

    if (!projectId) {
      return NextResponse.json(
        { error: 'Missing required field: projectId' },
        { status: 400 }
      );
    }

    // Revoke the project (this disables it and prevents further use)
    const revokeResponse = await fetch(`${SLC_API_ENDPOINT}/v1/_control/revoke-project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-slc-admin': SLC_DEMO_ADMIN_TOKEN,
      },
      body: JSON.stringify({ projectId }),
    });

    if (!revokeResponse.ok) {
      const error = await revokeResponse.json().catch(() => ({ error: 'Unknown error' }));
      return NextResponse.json(
        { error: `Failed to revoke project: ${error.error || 'Unknown error'}` },
        { status: revokeResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Project ${projectId} has been cleaned up`,
    });
  } catch (error) {
    console.error('Error cleaning up demo:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
