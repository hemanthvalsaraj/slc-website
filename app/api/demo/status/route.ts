import { NextRequest, NextResponse } from 'next/server';

interface StatusRequest {
  expiresAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: StatusRequest = await request.json();
    const { expiresAt } = body;

    if (!expiresAt) {
      return NextResponse.json(
        { error: 'Missing required field: expiresAt' },
        { status: 400 }
      );
    }

    const expirationTime = new Date(expiresAt).getTime();
    const now = Date.now();
    const remainingSeconds = Math.max(0, Math.floor((expirationTime - now) / 1000));
    const isExpired = remainingSeconds === 0;

    return NextResponse.json({
      valid: !isExpired,
      expiresAt,
      remainingSeconds,
      isExpired,
    });
  } catch (error) {
    console.error('Error checking demo status:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
