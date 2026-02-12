export interface DemoConfig {
  projectId: string;
  apiKey: string;
  appName: string;
  boilerplate: string;
  expiresAt: string;
}

let cleanupTimer: NodeJS.Timeout | null = null;

export function scheduleCleanup(
  config: DemoConfig,
  onExpired: () => void,
  onWarning?: (remainingSeconds: number) => void
): () => void {
  // Clear any existing timer
  if (cleanupTimer) {
    clearTimeout(cleanupTimer);
  }

  const expirationTime = new Date(config.expiresAt).getTime();
  const now = Date.now();
  const remainingMs = expirationTime - now;

  if (remainingMs <= 0) {
    onExpired();
    return () => {};
  }

  // Schedule warning at 5 minutes before expiration
  const warningTime = remainingMs - 5 * 60 * 1000;
  if (warningTime > 0 && onWarning) {
    setTimeout(() => {
      const remainingSeconds = Math.max(0, Math.floor((expirationTime - Date.now()) / 1000));
      onWarning(remainingSeconds);
    }, warningTime);
  }

  // Schedule cleanup
  cleanupTimer = setTimeout(async () => {
    try {
      // Call cleanup API
      await fetch('/api/demo/cleanup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: config.projectId }),
      }).catch((error) => {
        console.error('Failed to cleanup demo project:', error);
      });

      onExpired();
    } catch (error) {
      console.error('Error during cleanup:', error);
      onExpired();
    }
  }, remainingMs);

  // Return cleanup function
  return () => {
    if (cleanupTimer) {
      clearTimeout(cleanupTimer);
      cleanupTimer = null;
    }
  };
}

export function formatTimeRemaining(remainingSeconds: number): string {
  if (remainingSeconds <= 0) {
    return '0:00';
  }

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function checkExpiration(expiresAt: string): {
  isExpired: boolean;
  remainingSeconds: number;
} {
  const expirationTime = new Date(expiresAt).getTime();
  const now = Date.now();
  const remainingSeconds = Math.max(0, Math.floor((expirationTime - now) / 1000));
  const isExpired = remainingSeconds === 0;

  return { isExpired, remainingSeconds };
}
