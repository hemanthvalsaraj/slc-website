"use client";

import { useState, useEffect } from "react";

interface CounterDemoProps {
  projectId: string;
  apiKey: string;
  appName: string;
  actorId?: string;
}

export function CounterDemo({ projectId, apiKey, appName, actorId = "counter-1" }: CounterDemoProps) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = `https://api.slc.run/v1/invoke/${projectId}/${appName}/${actorId}`;

  const fetchState = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-slc-api-key": apiKey,
        },
        body: JSON.stringify({ action: "get" }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setCount(data.count || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch state");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  const handleAction = async (action: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-slc-api-key": apiKey,
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setCount(data.count || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update counter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass p-8 text-center">
        <div className="text-6xl font-bold mb-6">{count !== null ? count : "—"}</div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleAction("decrement")}
            disabled={loading}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium uppercase tracking-wider"
          >
            Decrement
          </button>
          <button
            onClick={() => handleAction("reset")}
            disabled={loading}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium uppercase tracking-wider"
          >
            Reset
          </button>
          <button
            onClick={() => handleAction("increment")}
            disabled={loading}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium uppercase tracking-wider"
          >
            Increment
          </button>
        </div>
        {error && (
          <div className="mt-4 text-sm text-red-400">{error}</div>
        )}
      </div>
      <div className="text-xs text-zinc-500 space-y-2">
        <p>Try refreshing the page - the counter value persists!</p>
        <p className="font-mono break-all">API: {apiUrl}</p>
      </div>
    </div>
  );
}
