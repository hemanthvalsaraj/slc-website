import Link from "next/link";

export default function QuickStartPage() {
  return (
    <div className="min-h-screen flex flex-col font-geist">
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      <header className="relative w-full px-6 py-6 sm:px-10 flex justify-between items-center">
        <Link
          href="/"
          className="uppercase tracking-[0.3em] text-xs text-zinc-400 hover:text-white transition"
        >
          SLC.RUN
        </Link>
        <Link
          href="/docs"
          className="text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition"
        >
          Docs
        </Link>
      </header>

      <main className="relative flex-1 px-6 sm:px-10 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8 text-sm text-zinc-400">
            <Link href="/docs" className="hover:text-white transition">
              Docs
            </Link>
            <span className="mx-2">/</span>
            <span>Quick Start</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-semibold mb-6">
            Quick Start
          </h1>
          <p className="text-lg text-zinc-300 mb-12">
            Deploy your first stateful serverless function in minutes.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Create a Worker</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-zinc-300">
                  Create a new file called `worker.ts`:
                </p>
                <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{`export default async function handler(ctx: {
  actorId: string;
  state: {
    get(): Promise<Record<string, any>>;
    set(partial: Record<string, any>): Promise<void>;
  };
  request: {
    method: string;
    body?: any;
    headers?: Record<string, string>;
  };
}): Promise<Response | any> {
  // Your handler logic
  const currentState = await ctx.state.get();
  
  if (ctx.request.method === "POST") {
    await ctx.state.set({
      ...currentState,
      ...ctx.request.body,
    });
  }
  
  return {
    message: "Hello from actor!",
    state: await ctx.state.get(),
  };
}`}</code>
                  </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. Configure Your App
              </h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-zinc-300">
                  Create `slc.config.json` in your project root:
                </p>
                <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{`{
  "name": "hello-world-app",
  "entry": "./worker.ts"
}`}</code>
                  </pre>
                <div className="text-sm text-zinc-400 space-y-2 mt-4">
                  <p>
                    <strong>Note:</strong> The `apiBaseUrl` field is optional.
                    If not specified, the CLI will use the endpoint from your
                    `~/.slcrc` configuration file (defaults to `https://api.slc.run`).
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <code className="text-zinc-300">name</code>: Your app
                      name (used in the invoke URL)
                    </li>
                    <li>
                      <code className="text-zinc-300">entry</code>: Path to
                      your worker file (relative to the config file)
                    </li>
                    <li>
                      <code className="text-zinc-300">apiBaseUrl</code>{" "}
                      (optional): The API endpoint URL (defaults to production
                      API)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Deploy Your App</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>slc deploy</code>
                </pre>
                <p className="text-zinc-300">
                  This will bundle your `worker.ts` into a single JavaScript
                  file, upload it to the regional node, and register it as a
                  deployable app.
                </p>
                <p className="text-sm text-zinc-400">
                  You'll see output like:
                </p>
                <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm text-zinc-400">
                  <code>{`Bundling worker.ts...
Uploading to https://api.slc.run...
✓ App 'hello-world-app' deployed successfully
  Version: 1
  Created: 12/1/2024, 10:30:00 AM

Invoke via: slc invoke hello-world-app <actorId>`}</code>
                  </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Invoke Your App</h2>
              <div className="glass rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Using the CLI (Recommended)
                  </h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>{`slc invoke hello-world-app user-123 --data '{"message":"hi there"}'`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Using curl with versioned API
                  </h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>{`curl -X POST https://api.slc.run/v1/invoke/my-project/hello-world-app/user-123 \\
  -H "Content-Type: application/json" \\
  -H "x-slc-api-key: sk_your_api_key" \\
  -d '{"message":"hi there"}'`}</code>
                  </pre>
                </div>

                <p className="text-sm text-zinc-400">
                  The handler will load or create the actor with ID `user-123`,
                  pass the request body to your handler, update the actor's
                  state, and return a JSON response with version metadata.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Handler Context</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <ul className="space-y-3 text-zinc-300">
                  <li>
                    <strong className="text-white">`actorId`</strong>: The
                    unique identifier of the actor instance
                  </li>
                  <li>
                    <strong className="text-white">`state.get()`</strong>:
                    Returns the current state as a JSON object
                  </li>
                  <li>
                    <strong className="text-white">`state.set(partial)`</strong>:
                    Merges `partial` into the current state
                  </li>
                  <li>
                    <strong className="text-white">`request`</strong>: The
                    incoming HTTP request (method, body, headers)
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Return Value</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-zinc-300">
                  Your handler can return:
                </p>
                <ul className="space-y-2 text-zinc-300 ml-4">
                  <li>
                    • A JSON-serializable object (will be sent as JSON with 200
                    status)
                  </li>
                  <li>
                    • A `Response` object (for full control over status and
                    headers)
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
              <div className="glass rounded-2xl p-6">
                <p className="text-zinc-300 mb-4">
                  Learn more about the CLI, SDK, and API:
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/docs/cli"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black text-sm font-semibold tracking-wide uppercase hover:bg-zinc-100 transition"
                  >
                    CLI Docs →
                  </Link>
                  <Link
                    href="/docs/sdk"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white text-sm font-semibold tracking-wide uppercase hover:bg-white/10 transition"
                  >
                    SDK Docs →
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="relative px-6 sm:px-10 py-10 border-t border-white/5 text-sm text-zinc-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span>© Slick Enterprises LLP — Backend logic that remembers</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white transition">
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
}

