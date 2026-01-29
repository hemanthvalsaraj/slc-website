import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SDK Documentation",
  description:
    "Production-ready TypeScript/JavaScript SDK for interacting with SLC Durable Actors API. Works in Node.js and browsers with full type safety.",
  keywords: [
    "SLC SDK",
    "SLC JavaScript SDK",
    "SLC TypeScript SDK",
    "durable actors SDK",
    "SLC API client",
    "stateful serverless SDK",
    "@slcrun/sdk"
  ],
  openGraph: {
    title: "SLC SDK Documentation",
    description: "TypeScript/JavaScript SDK for building stateful serverless applications with SLC.",
    url: "https://slc.run/docs/sdk"
  },
  alternates: {
    canonical: "https://slc.run/docs/sdk"
  }
};

export default function SDKPage() {
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
            <span>SDK</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-semibold mb-6">SDK</h1>
          <p className="text-lg text-zinc-300 mb-12">
            A production-ready TypeScript/JavaScript SDK for interacting with
            the SLC Durable Actors API.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <div className="glass rounded-2xl p-6">
                <ul className="space-y-2 text-zinc-300">
                  <li>✅ Type-safe - Full TypeScript support with comprehensive type definitions</li>
                  <li>✅ Universal - Works in both Node.js (18+) and modern browsers</li>
                  <li>✅ Simple API - Clean, intuitive interface for actor state management</li>
                  <li>✅ Error handling - Comprehensive error types for different failure scenarios</li>
                  <li>✅ Production-ready - Built with best practices and proper error handling</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{`import { SLC } from '@slcrun/sdk';

// Initialize the client (defaults to production API)
const client = new SLC({
  projectId: 'my-project',
  apiKey: process.env.SLC_API_KEY!, // or provide directly
  endpoint: 'https://api.slc.run', // Optional: defaults to production
});

// Get an actor instance
const actor = client.actor('my-app', 'user-123');

// Get actor state
const state = await actor.get();
console.log(state); // {} if actor doesn't exist, or full state object

// Set state (merges with existing state)
await actor.set({ name: 'John Doe', age: 30 });

// Update state
await actor.set({ age: 31, preferences: { theme: 'dark', lang: 'en' } });

// Get updated state
const updatedState = await actor.get();
console.log(updatedState); // { name: 'John Doe', age: 31, preferences: {...} }

// Invoke the app handler
const result = await actor.invoke({ action: 'increment' });

// Delete actor state
await actor.clear();`}</code>
                  </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">API Reference</h2>

              <div className="space-y-8">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">SLC</h3>
                  <p className="text-zinc-300 mb-4">
                    Main client class for interacting with Durable Actors.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-zinc-400 mb-2">
                        Constructor:
                      </p>
                      <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                        <code>{`new SLC(config: SLCSDKConfig)`}</code>
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-400 mb-2">
                        Options:
                      </p>
                      <ul className="text-sm text-zinc-300 space-y-1 ml-4">
                        <li>
                          • <code className="text-zinc-400">endpoint?: string</code> - Base URL for the API (default: `"https://api.slc.run"`)
                        </li>
                        <li>
                          • <code className="text-zinc-400">projectId: string</code> - Your project ID (required)
                        </li>
                        <li>
                          • <code className="text-zinc-400">apiKey?: string</code> - API key for authentication (or set `SLC_API_KEY` env var)
                        </li>
                        <li>
                          • <code className="text-zinc-400">apiVersion?: string</code> - API version to use (default: `"v1"`)
                        </li>
                        <li>
                          • <code className="text-zinc-400">httpClient?: HTTPClient</code> - Custom HTTP client implementation (for testing or advanced use cases)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    actor(appName: string, actorId: string)
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Get an actor instance for a specific app and actor ID.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-zinc-400 mb-2">
                        Parameters:
                      </p>
                      <ul className="text-sm text-zinc-300 space-y-1 ml-4">
                        <li>
                          • <code className="text-zinc-400">appName</code>: The name of your deployed app
                        </li>
                        <li>
                          • <code className="text-zinc-400">actorId</code>: Unique identifier for the actor instance
                        </li>
                      </ul>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Returns an `Actor` instance with methods: `get()`, `set()`, `clear()`, `invoke()`
                    </p>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Actor Methods</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold mb-2">get(): Promise&lt;ActorState&gt;</h4>
                      <p className="text-sm text-zinc-300 mb-2">
                        Get the full state of the actor.
                      </p>
                      <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                        <li>• Returns the actor's state as a JSON object</li>
                        <li>• Returns empty object <code className="text-zinc-400">{`{}`}</code> if actor not found (404)</li>
                        <li>• Throws `NetworkError` if the network request fails</li>
                        <li>• Throws `APIError` if the API returns an error status code (other than 404)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">set(partial: ActorState): Promise&lt;void&gt;</h4>
                      <p className="text-sm text-zinc-300 mb-2">
                        Set or merge state in the actor.
                      </p>
                      <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                        <li>• `partial`: Partial state object to merge with existing state</li>
                        <li>• Throws `NetworkError` if the network request fails</li>
                        <li>• Throws `APIError` if the API returns an error status code</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">clear(): Promise&lt;APIResponse&gt;</h4>
                      <p className="text-sm text-zinc-300 mb-2">
                        Delete the actor's state completely.
                      </p>
                      <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                        <li>• Returns the API response: <code className="text-zinc-400">{`{ success: boolean, message?: string }`}</code></li>
                        <li>• Throws `NetworkError` if the network request fails</li>
                        <li>• Throws `APIError` if the API returns an error status code</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">invoke(body?: unknown, options?: InvokeOptions): Promise&lt;unknown&gt;</h4>
                      <p className="text-sm text-zinc-300 mb-2">
                        Invoke the app handler with a request body.
                      </p>
                      <ul className="text-sm text-zinc-400 space-y-1 ml-4">
                        <li>• `body`: Optional request body to send to the handler</li>
                        <li>• `options`: Optional invocation options (method, version, headers)</li>
                        <li>• Returns the handler's response</li>
                        <li>• Throws `NetworkError` if the network request fails</li>
                        <li>• Throws `APIError` if the API returns an error status code</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-zinc-300">
                  The SDK provides specific error types for different scenarios:
                </p>
                <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>{`import { SLC, NetworkError, APIError } from '@slcrun/sdk';

const client = new SLC({
  projectId: 'my-project',
  apiKey: process.env.SLC_API_KEY!,
});
const actor = client.actor('my-app', 'actor-id');

try {
  await actor.set({ key: 'value' });
} catch (error) {
  if (error instanceof NetworkError) {
    console.error('Network issue:', error.message);
  } else if (error instanceof APIError) {
    console.error('API error:', error.statusCode, error.message);
  } else {
    console.error('Unknown error:', error);
  }
}`}</code>
                  </pre>
                <div className="text-sm text-zinc-400 space-y-2 mt-4">
                  <p>
                    <strong>Error Types:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <code className="text-zinc-300">SLCSDKError</code> - Base error class for all SDK errors
                    </li>
                    <li>
                      <code className="text-zinc-300">NetworkError</code> - Thrown when a network request fails
                    </li>
                    <li>
                      <code className="text-zinc-300">APIError</code> - Thrown when the API returns an unexpected status code
                    </li>
                    <li>
                      <code className="text-zinc-300">ActorNotFoundError</code> - Thrown when an actor is not found (though <code className="text-zinc-400">getState</code> returns <code className="text-zinc-400">{`{}`}</code> instead)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Node.js</h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>{`import { SLC } from '@slcrun/sdk';

const client = new SLC({
  projectId: 'my-project',
  apiKey: process.env.SLC_API_KEY!,
  endpoint: 'https://api.slc.run',
});

async function example() {
  const actor = client.actor('session-app', 'session-abc');
  
  // Create or update actor state
  await actor.set({ userId: 'user-123', lastActivity: Date.now() });
  
  // Retrieve state
  const session = await actor.get();
  console.log('Session:', session);
  
  // Update specific fields
  await actor.set({ lastActivity: Date.now() });

  // Clean up session (delete entire actor)
  await actor.clear();
}`}</code>
                  </pre>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Browser</h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>{`import { SLC } from '@slcrun/sdk';

const client = new SLC({
  projectId: 'my-project',
  apiKey: process.env.SLC_API_KEY!,
});

// Use in your React/Vue/etc component
async function saveUserPreference(userId: string, preference: string, value: unknown) {
  const actor = client.actor('preferences-app', \`user-\${userId}\`);
  await actor.set({ [preference]: value });
}

async function getUserPreferences(userId: string) {
  const actor = client.actor('preferences-app', \`user-\${userId}\`);
  return await actor.get();
}`}</code>
                  </pre>
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

