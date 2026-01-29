import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Reference",
  description:
    "Complete API documentation for all SLC endpoints. Learn how to invoke apps, deploy applications, manage projects, and use system endpoints.",
  keywords: [
    "SLC API",
    "SLC API reference",
    "stateful serverless API",
    "durable actors API",
    "SLC REST API",
    "SLC endpoints",
    "SLC API documentation"
  ],
  openGraph: {
    title: "SLC API Reference",
    description: "Complete API documentation for all SLC endpoints and operations.",
    url: "https://slc.run/docs/api"
  },
  alternates: {
    canonical: "https://slc.run/docs/api"
  }
};

export default function APIPage() {
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
            <span>API Reference</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-semibold mb-6">
            API Reference
          </h1>
          <p className="text-lg text-zinc-300 mb-12">
            Complete API documentation for all SLC endpoints.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4">API Versioning</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-zinc-300">
                  SLC uses versioned API endpoints to ensure backward
                  compatibility and smooth migrations. All public API endpoints
                  support versioning through the `/v1/` namespace.
                </p>
                <div className="text-sm text-zinc-400 space-y-2">
                  <p>
                    <strong>Default:</strong> If not specified, the CLI defaults
                    to `v1`.
                  </p>
                  <p>
                    All versioned endpoints follow the pattern: <code className="text-zinc-400">/{`{version}`}/{`{endpoint}`}</code>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                App Invocation (Versioned)
              </h2>
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    POST /v1/invoke/:projectId/:appName/:actorId
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Invoke an app handler for a specific actor.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-400 mb-2">
                        Headers:
                      </p>
                      <ul className="text-sm text-zinc-300 space-y-1 ml-4">
                        <li>
                          • <code className="text-zinc-400">Content-Type: application/json</code>
                        </li>
                        <li>
                          • <code className="text-zinc-400">x-slc-api-key: sk_your_api_key</code> (required)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-400 mb-2">
                        Example:
                      </p>
                      <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                        <code>{`curl -X POST https://api.slc.run/v1/invoke/my-project/hello-world-app/user-123 \\
  -H "Content-Type: application/json" \\
  -H "x-slc-api-key: sk_your_api_key" \\
  -d '{"message":"hi there"}'`}</code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    GET /v1/invoke/:projectId/:appName/:actorId
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Invoke an app handler with GET method.
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">
                      Example:
                    </p>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code>{`curl https://api.slc.run/v1/invoke/my-project/hello-world-app/user-123 \\
  -H "x-slc-api-key: sk_your_api_key"`}</code>
                    </pre>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    DELETE /v1/invoke/:projectId/:appName/:actorId
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Delete actor state completely.
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">
                      Example:
                    </p>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code>{`curl -X DELETE https://api.slc.run/v1/invoke/my-project/hello-world-app/user-123 \\
  -H "x-slc-api-key: sk_your_api_key"`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">App Deployment</h2>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3">
                  POST /v1/_control/deploy-app
                </h3>
                <p className="text-zinc-300 mb-4">
                  Deploy an app bundle (used by `slc deploy`).
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">
                      Headers:
                    </p>
                    <ul className="text-sm text-zinc-300 space-y-1 ml-4">
                      <li>
                        • <code className="text-zinc-400">Content-Type: application/json</code>
                      </li>
                      <li>
                        • <code className="text-zinc-400">x-slc-api-key: sk_your_api_key</code> (required)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">
                      Body:
                    </p>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code>{`{
  "name": "my-app",
  "bundle": "<bundled-code>",
  "version": 1
}`}</code>
                    </pre>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">
                      Response:
                    </p>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code>{`{
  "success": true,
  "name": "my-app",
  "version": 1,
  "apiVersion": "v1"
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Project Management</h2>
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    POST /v1/_control/create-project
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Create a new project. Requires admin secret.
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">
                      Headers:
                    </p>
                    <ul className="text-sm text-zinc-300 space-y-1 ml-4">
                      <li>
                        • <code className="text-zinc-400">x-slc-admin-secret: your-admin-secret</code> (required)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    GET /v1/_control/list-projects
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    List all projects. Requires admin secret.
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">
                      Headers:
                    </p>
                    <ul className="text-sm text-zinc-300 space-y-1 ml-4">
                      <li>
                        • <code className="text-zinc-400">x-slc-admin-secret: your-admin-secret</code> (required)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    POST /v1/_control/rotate-apikey
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Rotate API key for a project. Requires admin secret.
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">
                      Headers:
                    </p>
                    <ul className="text-sm text-zinc-300 space-y-1 ml-4">
                      <li>
                        • <code className="text-zinc-400">x-slc-admin-secret: your-admin-secret</code> (required)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">System Endpoints</h2>
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    GET /v1/_health
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Health check endpoint that returns server status, database
                    file size, and actor count.
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">
                      Example:
                    </p>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code>curl https://api.slc.run/v1/_health</code>
                    </pre>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2 mt-4">
                      Response:
                    </p>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code>{`{
  "status": "ok",
  "dbFileSizeBytes": 8192,
  "actorCountInDb": 5
}`}</code>
                    </pre>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    GET /v1/_system/info
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Returns system information and version details.
                  </p>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    GET /_debug/metrics
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Debug metrics endpoint that returns runtime statistics.
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2">
                      Example:
                    </p>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code>curl https://api.slc.run/_debug/metrics</code>
                    </pre>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-400 mb-2 mt-4">
                      Response:
                    </p>
                    <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                      <code>{`{
  "activeActors": 3,
  "dbFileSizeBytes": 8192,
  "requestsLastMinute": 42,
  "uptimeSeconds": 3600
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Response Format</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-zinc-300">
                  Versioned API responses include version metadata:
                </p>
                <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{`{
  "success": true,
  "count": 2,
  "actorId": "user1",
  "apiVersion": "v1",
  "gatewayVersion": "1.0",
  "gatewayRegion": "global",
  "runtimeRegion": "mumbai"
}`}</code>
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                API Versioning
              </h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-zinc-300">
                  <strong>Note:</strong> Only v1 routes are currently supported. Always use the <code className="text-zinc-400">/v1/</code> prefix for all API endpoints.
                </p>
                <p className="text-sm text-zinc-400">
                  Legacy routes (without the <code className="text-zinc-300">/v1/</code> prefix) are not implemented in the region-node and will not work. All endpoints must use the v1 API version.
                </p>
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

