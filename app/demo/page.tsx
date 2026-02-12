"use client";

import { useState, useEffect } from "react";
import { getAllBoilerplates } from "@/lib/demo-boilerplates";
import {
  scheduleCleanup,
  formatTimeRemaining,
  checkExpiration,
  type DemoConfig,
} from "@/lib/demo-cleanup";
import { CounterDemo } from "@/components/demo/counter-demo";
import { ChatDemo } from "@/components/demo/chat-demo";
import { TodoDemo } from "@/components/demo/todo-demo";
import { ShoppingCartDemo } from "@/components/demo/shopping-cart-demo";
import { InteractiveCode } from "@/components/interactive-code";
import { CustomIdeDemo } from "@/components/demo/custom-ide-demo";

type DemoState = "selecting" | "starting" | "active" | "expired";
type DemoView = "presets" | "custom";

export default function DemoPage() {
  const [state, setState] = useState<DemoState>("selecting");
  const [view, setView] = useState<DemoView>("presets");
  const [selectedBoilerplate, setSelectedBoilerplate] = useState<string | null>(null);
  const [demoConfig, setDemoConfig] = useState<DemoConfig | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [warningShown, setWarningShown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const boilerplates = getAllBoilerplates();

  useEffect(() => {
    if (demoConfig) {
      // Update time remaining every second
      const interval = setInterval(() => {
        const { isExpired, remainingSeconds } = checkExpiration(demoConfig.expiresAt);
        setTimeRemaining(remainingSeconds);

        if (isExpired && state === "active") {
          setState("expired");
        }
      }, 1000);

      // Schedule cleanup
      const cleanup = scheduleCleanup(
        demoConfig,
        () => {
          setState("expired");
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
    }
  }, [demoConfig, state]);

  const handleStartDemo = async (boilerplateId: string) => {
    setSelectedBoilerplate(boilerplateId);
    setState("starting");
    setError(null);

    try {
      const response = await fetch("/api/demo/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boilerplate: boilerplateId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const config: DemoConfig = {
        projectId: data.projectId,
        apiKey: data.apiKey,
        appName: data.appName,
        boilerplate: data.boilerplate,
        expiresAt: data.expiresAt,
      };

      setDemoConfig(config);
      setTimeRemaining(data.expiresInSeconds);
      setState("active");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start demo");
      setState("selecting");
      setSelectedBoilerplate(null);
    }
  };

  const handleReset = () => {
    setState("selecting");
    setView("presets");
    setSelectedBoilerplate(null);
    setDemoConfig(null);
    setTimeRemaining(0);
    setWarningShown(false);
    setError(null);
  };

  const renderDemoComponent = () => {
    if (!demoConfig) return null;

    const props = {
      projectId: demoConfig.projectId,
      apiKey: demoConfig.apiKey,
      appName: demoConfig.appName,
    };

    switch (demoConfig.boilerplate) {
      case "counter":
        return <CounterDemo {...props} />;
      case "chat":
        return <ChatDemo {...props} />;
      case "todo":
        return <TodoDemo {...props} />;
      case "shopping-cart":
        return <ShoppingCartDemo {...props} />;
      default:
        return <div>Unknown boilerplate: {demoConfig.boilerplate}</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-geist">
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      
      <header className="relative w-full px-6 py-6 sm:px-10 flex justify-between items-center z-10">
        <a href="/" className="uppercase tracking-[0.15em] text-xs text-zinc-400 font-medium hover:text-white transition">
          SLC.RUN
        </a>
        <div className="flex gap-6 items-center">
          <a
            href="/docs"
            className="text-xs uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition font-medium"
          >
            Docs
          </a>
          <a
            href="/#waitlist"
            className="text-xs uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition font-medium"
          >
            Early Access
          </a>
        </div>
      </header>

      <main className="relative flex-1 px-6 sm:px-10 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-semibold mb-4 leading-tight tracking-tight">
              Try SLC Live
            </h1>
            <p className="text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Experience stateful serverless computing with a temporary demo. Your demo will expire in 30 minutes.
            </p>
          </div>

          {view === "presets" && (
            <>
              {state === "selecting" && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Custom App tile */}
                    <button
                      onClick={() => {
                        setView("custom");
                      }}
                      className="glass p-6 text-left hover:bg-white/5 transition group"
                    >
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition">
                        Custom App
                      </h3>
                      <p className="text-sm text-zinc-400 mb-4">
                        Open an in-browser IDE, write your own worker, deploy it to a temporary demo project, and invoke it.
                      </p>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">
                        Open IDE →
                      </div>
                    </button>

                    {boilerplates.map((boilerplate) => (
                      <button
                        key={boilerplate.id}
                        onClick={() => handleStartDemo(boilerplate.id)}
                        className="glass p-6 text-left hover:bg-white/5 transition group"
                      >
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition">
                          {boilerplate.name}
                        </h3>
                        <p className="text-sm text-zinc-400 mb-4">{boilerplate.description}</p>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">
                          Start Demo →
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {state === "starting" && (
                <div className="text-center py-20">
                  <div className="text-lg text-zinc-400">Starting your demo...</div>
                </div>
              )}

              {state === "active" && demoConfig && (
                <div className="space-y-6">
                  {/* Timer and Info Bar */}
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
                    <button
                      onClick={handleReset}
                      className="text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition"
                    >
                      Start New Demo
                    </button>
                  </div>

                  {/* API Key */}
                  <div className="glass p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-zinc-500 uppercase tracking-wider">API Key</div>
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
                    <div className="font-mono text-sm break-all bg-white/5 p-3 rounded">
                      {demoConfig.apiKey}
                    </div>
                    <div className="text-xs text-zinc-500 mt-2">
                      This key is valid for 30 minutes. Use it in the{" "}
                      <code className="text-zinc-400">x-slc-api-key</code> header.
                    </div>
                  </div>

                  {/* API Info */}
                  <div className="glass p-4">
                    <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                      API Endpoint
                    </div>
                    <div className="font-mono text-sm break-all mb-4 bg-white/5 p-3 rounded">
                      https://api.slc.run/v1/invoke/{demoConfig.projectId}/{demoConfig.appName}/
                      {"{actorId}"}
                    </div>
                    <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">
                      Example curl
                    </div>
                    <div className="font-mono text-xs bg-white/5 p-3 rounded break-all">
                      curl -X POST https://api.slc.run/v1/invoke/{demoConfig.projectId}/
                      {demoConfig.appName}/demo-1 \<br />
                      &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                      &nbsp;&nbsp;-H "x-slc-api-key: {demoConfig.apiKey}" \<br />
                      &nbsp;&nbsp;-d '{"{"}"action": "get"{"}"}'
                    </div>
                  </div>

                  {/* Worker Code */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Worker Code</h2>
                    <InteractiveCode
                      code={
                        boilerplates.find((b) => b.id === demoConfig.boilerplate)?.workerCode || ""
                      }
                      language="javascript"
                      title="This is the code running behind the demo"
                    />
                  </div>

                  {/* Demo Component */}
                  <div className="glass p-6">
                    <h2 className="text-2xl font-semibold mb-6">
                      {boilerplates.find((b) => b.id === demoConfig.boilerplate)?.name || "Demo"}
                    </h2>
                    {renderDemoComponent()}
                  </div>
                </div>
              )}
            </>
          )}

          {view === "custom" && (
            <div className="space-y-6">
              <CustomIdeDemo
                onBack={() => {
                  setView("presets");
                }}
              />
            </div>
          )}

          {view === "presets" && state === "expired" && (
            <div className="text-center py-20 space-y-6">
              <div className="text-2xl font-semibold mb-2">Demo Expired</div>
              <div className="text-zinc-400 mb-8">
                Your demo instance has been automatically cleaned up after 30 minutes.
              </div>
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-white text-black text-sm font-semibold tracking-wide uppercase transition-all duration-200 hover:bg-zinc-100"
              >
                Start New Demo
              </button>
            </div>
          )}

          {error && (
            <div className="glass p-4 bg-red-500/10 border border-red-500/20">
              <div className="text-sm text-red-400">{error}</div>
              <button
                onClick={handleReset}
                className="mt-4 text-xs uppercase tracking-wider text-red-400 hover:text-red-300 transition"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="relative px-6 sm:px-10 py-10 border-t border-white/5 text-sm text-zinc-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span className="text-zinc-400">© SLC.RUN — Backend logic that remembers</span>
        <div className="flex gap-6">
          <a href="/privacy" className="text-zinc-400 hover:text-white transition">
            Privacy
          </a>
          <a href="/terms" className="text-zinc-400 hover:text-white transition">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
}
