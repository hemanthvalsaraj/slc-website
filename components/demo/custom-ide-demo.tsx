"use client";

import { useEffect, useState } from "react";
import {
  scheduleCleanup,
  formatTimeRemaining,
  checkExpiration,
  type DemoConfig,
} from "@/lib/demo-cleanup";
import { InteractiveCode } from "@/components/interactive-code";

interface CustomIdeDemoProps {
  onBack: () => void;
}

interface DeployResponse {
  projectId: string;
  apiKey: string;
  appName: string;
  boilerplate: string;
  expiresAt: string;
  expiresInSeconds: number;
}

export function CustomIdeDemo({ onBack }: CustomIdeDemoProps) {
  const [code, setCode] = useState<string>(() => {
    return `export default async function handler(ctx) {
  const state = await ctx.state.get();
  const body = ctx.request.body || {};

  const count = (state.count || 0) + 1;
  await ctx.state.set({ count, lastBody: body });

  return {
    message: "Hello from your custom app!",
    count,
    received: body
  };
}`;
  });

  const [appName, setAppName] = useState("custom-demo-app");
  const [actorId, setActorId] = useState("custom-1");
  const [requestBody, setRequestBody] = useState<string>('{"message":"hi from browser"}');

  const [demoConfig, setDemoConfig] = useState<DemoConfig | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [warningShown, setWarningShown] = useState(false);

  const [deploying, setDeploying] = useState(false);
  const [invoking, setInvoking] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const [responseJson, setResponseJson] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Timer + cleanup for custom demo
  useEffect(() => {
    if (!demoConfig) return;

    const interval = setInterval(() => {
      const { isExpired, remainingSeconds } = checkExpiration(demoConfig.expiresAt);
      setTimeRemaining(remainingSeconds);
      if (isExpired) {
        setError("Demo expired. Please deploy again.");
      }
    }, 1000);

    const cleanup = scheduleCleanup(
      demoConfig,
      () => {
        setError("Demo expired. Please deploy again.");
      },
      (remainingSeconds) => {
        setWarningShown(true);
        setTimeRemaining(remainingSeconds);
      }
    );

    return () => {
      clearInterval(interval);
      cleanup();
    };
  }, [demoConfig]);

  const handleDeploy = async () => {
    setDeploying(true);
    setError(null);
    setResponseJson(null);

    try {
      const response = await fetch("/api/demo/start-custom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, appName }),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = (await response.json()) as DeployResponse;

      const config: DemoConfig = {
        projectId: data.projectId,
        apiKey: data.apiKey,
        appName: data.appName,
        boilerplate: data.boilerplate,
        expiresAt: data.expiresAt,
      };

      setDemoConfig(config);
      setTimeRemaining(data.expiresInSeconds);
      setWarningShown(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to deploy custom app");
    } finally {
      setDeploying(false);
    }
  };

  const handleInvoke = async () => {
    if (!demoConfig) {
      setError("Please deploy your app first.");
      return;
    }

    let parsedBody: unknown = {};
    try {
      parsedBody = requestBody.trim() ? JSON.parse(requestBody) : {};
    } catch (err) {
      setError("Request body is not valid JSON.");
      return;
    }

    setInvoking(true);
    setError(null);

    const invokeUrl = `https://api.slc.run/v1/invoke/${demoConfig.projectId}/${appName}/${actorId}`;

    try {
      const response = await fetch(invokeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-slc-api-key": demoConfig.apiKey,
        },
        body: JSON.stringify(parsedBody),
      });

      const text = await response.text();
      let json: unknown;
      try {
        json = JSON.parse(text);
      } catch {
        json = text;
      }

      setResponseJson(JSON.stringify(json, null, 2));

      if (!response.ok) {
        setError(`Invoke failed with status ${response.status}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to invoke app");
    } finally {
      setInvoking(false);
    }
  };

  const hasDeployed = !!demoConfig;
  const invokeUrl = demoConfig
    ? `https://api.slc.run/v1/invoke/${demoConfig.projectId}/${appName}/${actorId}`
    : "https://api.slc.run/v1/invoke/<projectId>/<appName>/<actorId>";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Custom App IDE</h2>
          <p className="text-sm text-zinc-400">
            Write a worker function, deploy it to a temporary demo project, and invoke it directly from your browser.
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-xs uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition"
        >
          ← Back to presets
        </button>
      </div>

      {/* Timer bar when deployed */}
      {demoConfig && (
        <div className="glass p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-zinc-500">Time remaining: </span>
              <span
                className={`font-mono font-semibold ${
                  timeRemaining < 300 ? "text-red-400" : ""
                }`}
              >
                {formatTimeRemaining(timeRemaining)}
              </span>
            </div>
            {warningShown && (
              <div className="text-xs text-red-400 bg-red-500/10 px-3 py-1 rounded">
                Demo expires in 5 minutes
              </div>
            )}
          </div>
          <div className="text-xs text-zinc-500">
            Project: <span className="font-mono">{demoConfig.projectId}</span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6 items-start">
        {/* Code editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-zinc-500">
              Worker Code
            </span>
            <span className="text-[11px] text-zinc-500">
              File: <code className="text-zinc-300">worker.ts</code>
            </span>
          </div>
          <div className="glass p-3">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[420px] bg-transparent text-xs font-mono text-zinc-100 outline-none resize-none"
              spellCheck={false}
            />
          </div>
          <div className="hidden lg:block">
            <InteractiveCode
              code={code}
              language="javascript"
              title="Preview"
              showCopy={false}
            />
          </div>
        </div>

        {/* Config + controls + output */}
        <div className="space-y-4">
          <div className="glass p-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1">
                  App name
                </label>
                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm focus:outline-none focus:border-white/20"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1">
                  Actor ID
                </label>
                <input
                  type="text"
                  value={actorId}
                  onChange={(e) => setActorId(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm focus:outline-none focus:border-white/20"
                />
              </div>
            </div>

            <button
              onClick={handleDeploy}
              disabled={deploying || !code.trim()}
              className="mt-2 inline-flex items-center justify-center px-4 py-2 bg-white text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deploying ? "Deploying..." : hasDeployed ? "Redeploy App" : "Deploy App"}
            </button>
          </div>

          {demoConfig && (
            <div className="glass p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-zinc-500 uppercase tracking-wider">
                  API Key
                </div>
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(demoConfig.apiKey);
                    setApiKeyCopied(true);
                    setTimeout(() => setApiKeyCopied(false), 2000);
                  }}
                  className="text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition flex items-center gap-2"
                >
                  {apiKeyCopied ? "Copied" : "Copy"}
                </button>
              </div>
              <div className="font-mono text-xs break-all bg-white/5 p-3 rounded">
                {demoConfig.apiKey}
              </div>
              <div className="text-xs text-zinc-500">
                Use this in the{" "}
                <code className="text-zinc-300">x-slc-api-key</code> header.
              </div>
            </div>
          )}

          <div className="glass p-4 space-y-3">
            <div className="text-xs text-zinc-500 uppercase tracking-wider">
              Invoke Endpoint
            </div>
            <div className="font-mono text-xs break-all bg-white/5 p-3 rounded">
              {invokeUrl}
            </div>
            {demoConfig && (
              <>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">
                  Example curl
                </div>
                <div className="font-mono text-[11px] bg-white/5 p-3 rounded break-all">
                  curl -X POST {invokeUrl} \{"\n"}
                  {"  "}-H "Content-Type: application/json" \{"\n"}
                  {"  "}-H "x-slc-api-key: {demoConfig.apiKey}" \{"\n"}
                  {"  "}-d '{requestBody}'
                </div>
              </>
            )}
          </div>

          <div className="glass p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs text-zinc-500 uppercase tracking-wider">
                Request Body (JSON)
              </div>
              <button
                onClick={handleInvoke}
                disabled={invoking}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-wider"
              >
                {invoking ? "Invoking..." : "Invoke"}
              </button>
            </div>
            <textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              className="w-full h-24 bg-white/5 border border-white/10 rounded text-xs font-mono text-zinc-100 outline-none resize-none"
              spellCheck={false}
            />
          </div>

          <div className="glass p-4 space-y-3">
            <div className="text-xs text-zinc-500 uppercase tracking-wider">
              Last Response
            </div>
            <div className="font-mono text-xs bg-white/5 p-3 rounded max-h-64 overflow-y-auto whitespace-pre-wrap">
              {responseJson ?? "// Invoke your app to see the response here"}
            </div>
          </div>

          {error && (
            <div className="glass p-4 bg-red-500/10 border border-red-500/20">
              <div className="text-xs text-red-400">{error}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

