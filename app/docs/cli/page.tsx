import Link from "next/link";

export default function CLIPage() {
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
            <span>CLI</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-semibold mb-6">CLI</h1>
          <p className="text-lg text-zinc-300 mb-12">
            Command-line tool for deploying and developing Durable Actor
            applications on the SLC platform.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-zinc-300">
                  SLC CLI enables you to:
                </p>
                <ul className="space-y-2 text-zinc-300 ml-4">
                  <li>• Deploy your Durable Actor workers to regional nodes</li>
                  <li>
                    • Develop applications locally with remote node support
                  </li>
                  <li>
                    • Bundle TypeScript/JavaScript workers into optimized
                    bundles
                  </li>
                </ul>
                <p className="text-zinc-300 mt-4">
                  Each deployed application becomes available as an invokable
                  actor service on the regional node.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Commands</h2>

              <div className="space-y-8">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">slc deploy</h3>
                  <p className="text-zinc-300 mb-4">
                    Deploys your application to the regional node specified in
                    `slc.config.json`.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-400 mb-2">
                        Usage:
                      </p>
                      <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                        <code>slc deploy</code>
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-400 mb-2">
                        What it does:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-zinc-300 text-sm ml-2">
                        <li>Reads `slc.config.json` from the current directory</li>
                        <li>Bundles your worker using esbuild</li>
                        <li>
                          Uploads the bundle to the regional node via
                          `/_control/deploy-app`
                        </li>
                        <li>
                          Makes your app available at <code className="text-zinc-400">/invoke/&lt;app-name&gt;/:actorId</code>
                        </li>
                      </ol>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-400 mb-2">
                        Output:
                      </p>
                      <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm text-zinc-400">
                        <code>{`Bundling worker...
Uploading to https://api.slc.run...
✓ Deployed app 'my-app'
  Invoke via: POST https://api.slc.run/v1/invoke/my-project/my-app/:actorId`}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">slc dev</h3>
                  <p className="text-zinc-300 mb-4">
                    Starts development mode (currently informational).
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">
                      Usage:
                    </p>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code>slc dev</code>
                    </pre>
                    <p className="text-sm text-zinc-400 mt-3">
                      <strong>Note:</strong> Local development server coming
                      soon. For now, deploy and test directly against the remote
                      node.
                    </p>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">slc config</h3>
                  <p className="text-zinc-300 mb-4">
                    Manage CLI configuration stored in `~/.slcrc`.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-400 mb-2">
                        View all config:
                      </p>
                      <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                        <code>slc config get</code>
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-400 mb-2">
                        Set a config value:
                      </p>
                      <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                        <code>{`slc config set endpoint https://api.slc.run
slc config set apiVersion v1
slc config set projectId my-project`}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-400 mb-2">
                        Get a specific config value:
                      </p>
                      <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                        <code>slc config get apiVersion</code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">slc login</h3>
                  <p className="text-zinc-300 mb-4">
                    Store your credentials for authentication.
                  </p>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>slc login</code>
                  </pre>
                  <p className="text-sm text-zinc-400 mt-3">
                    Follow prompts to enter API key and endpoint. Or set
                    manually:
                  </p>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm mt-3">
                    <code>{`slc config set apiKey sk_your_api_key
slc config set projectId my-project`}</code>
                  </pre>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Configuration File
              </h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-zinc-300">
                  Create `slc.config.json` in your project root:
                </p>
                <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{`{
  "name": "my-app",
  "entry": "./worker.ts"
}`}</code>
                  </pre>
                <div className="text-sm text-zinc-400 space-y-2 mt-4">
                  <p>
                    <strong>Fields:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <code className="text-zinc-300">name</code> (required):
                      Your app name. Used in the invocation URL:
                      <code className="text-zinc-400">/v1/invoke/&lt;projectId&gt;/&lt;name&gt;/:actorId</code>
                    </li>
                    <li>
                      <code className="text-zinc-300">entry</code> (required):
                      Path to your worker file (relative to config file
                      location)
                    </li>
                    <li>
                      <code className="text-zinc-300">apiBaseUrl</code>{" "}
                      (optional): Base URL of the SLC API. If not specified,
                      uses the endpoint from `~/.slcrc` (defaults to
                      `https://api.slc.run`)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Worker Handler</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-zinc-300">
                  Your worker file must export a default async function with
                  this signature:
                </p>
                <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{`export default async function handler(ctx: {
  actorId: string;
  state: {
    get(): Promise<any>;
    set(partial: any): Promise<void>;
  };
  request: Request | { method: string; body?: any };
}): Promise<Response | any>`}</code>
                  </pre>
                <div className="text-sm text-zinc-400 space-y-2 mt-4">
                  <p>
                    <strong>Context Properties:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <code className="text-zinc-300">actorId</code>: Unique
                      identifier for the actor instance (from URL:
                      `/invoke/:app/:actorId`)
                    </li>
                    <li>
                      <code className="text-zinc-300">state</code>: Persistent
                      state management
                      <ul className="list-disc list-inside ml-6 mt-1">
                        <li>
                          <code className="text-zinc-300">get()</code>:
                          Retrieves the current state for this actor
                        </li>
                        <li>
                          <code className="text-zinc-300">set(partial)</code>:
                          Updates the state (merges with existing state)
                        </li>
                      </ul>
                    </li>
                    <li>
                      <code className="text-zinc-300">request</code>: Request
                      object with `method` and optionally `body`
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <div className="glass rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Deployment Flow
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-zinc-300 text-sm ml-2">
                    <li>
                      <strong>Bundle:</strong> Your TypeScript/JavaScript worker
                      is bundled using esbuild
                      <ul className="list-disc list-inside ml-6 mt-1 text-zinc-400">
                        <li>Format: ESM (ES modules)</li>
                        <li>Platform: Node.js</li>
                        <li>Target: Node 20+</li>
                        <li>All dependencies are bundled (no external deps)</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Upload:</strong> The bundle is sent to the
                      regional node via HTTP POST to `/v1/_control/deploy-app`
                      (versioned) or `/_control/deploy-app` (legacy)
                    </li>
                    <li>
                      <strong>Registration:</strong> The node stores the bundle
                      and makes it available at
                      <code className="text-zinc-400">/v1/invoke/&lt;projectId&gt;/&lt;app-name&gt;/:actorId</code> (versioned)
                      or <code className="text-zinc-400">/invoke/&lt;app-name&gt;/:actorId</code> (legacy)
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Invocation Flow
                  </h3>
                  <p className="text-zinc-300 text-sm mb-2">
                    When you invoke an actor:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-zinc-300 text-sm ml-2">
                    <li>
                      Request: <code className="text-zinc-400">POST /v1/invoke/&lt;projectId&gt;/&lt;app-name&gt;/:actorId</code>
                      (versioned) or <code className="text-zinc-400">POST /invoke/&lt;app-name&gt;/:actorId</code>
                      (legacy)
                    </li>
                    <li>Node looks up the app bundle</li>
                    <li>
                      Node uses DOSupervisor to get/create actor by `actorId`
                    </li>
                    <li>
                      Node provides handler with: `actorId`, `state` wrapper
                      (get/set), `request` (method/body)
                    </li>
                    <li>Handler executes and returns response</li>
                    <li>Node returns handler's response as HTTP response</li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    "slc.config.json not found"
                  </h3>
                  <ul className="text-sm text-zinc-300 space-y-1 ml-4">
                    <li>
                      • Make sure you're running `slc deploy` from the
                      directory containing `slc.config.json`
                    </li>
                    <li>
                      • Check that the file is named exactly `slc.config.json`
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    "Entry file not found"
                  </h3>
                  <ul className="text-sm text-zinc-300 space-y-1 ml-4">
                    <li>
                      • Verify the `entry` path in `slc.config.json` is correct
                    </li>
                    <li>
                      • Path is relative to the `slc.config.json` file location
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    "Failed to connect to &lt;url&gt;"
                  </h3>
                  <ul className="text-sm text-zinc-300 space-y-1 ml-4">
                    <li>• Ensure the regional node is running</li>
                    <li>
                      • Check that `apiBaseUrl` in `slc.config.json` is correct
                    </li>
                    <li>• Verify network connectivity to the node</li>
                  </ul>
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

