import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Examples",
  description:
    "Ready-to-use examples and code samples for SLC. Learn from counter apps, chat rooms, and common patterns for stateful serverless functions.",
  keywords: [
    "SLC examples",
    "stateful serverless examples",
    "persistent functions examples",
    "durable objects examples",
    "SLC code samples",
    "SLC tutorials"
  ],
  openGraph: {
    title: "SLC Examples and Code Samples",
    description: "Ready-to-use examples and code samples for building stateful serverless applications.",
    url: "https://slc.run/docs/examples"
  },
  alternates: {
    canonical: "https://slc.run/docs/examples"
  }
};

export default function ExamplesPage() {
  const examples = [
    {
      title: "Hello World App",
      description:
        "Basic example demonstrating state management and request handling",
      code: `export default async function handler(ctx: {
  actorId: string;
  state: {
    get(): Promise<any>;
    set(partial: any): Promise<void>;
  };
  request: Request;
}): Promise<Response | any> {
  const state = await ctx.state.get() || { count: 0, messages: [] };
  
  if (ctx.request.method === "POST") {
    const body = await ctx.request.json();
    state.count += 1;
    state.messages.push({
      timestamp: new Date().toISOString(),
      actorId: ctx.actorId,
      method: ctx.request.method,
      data: body
    });
    await ctx.state.set(state);
  }
  
  return {
    message: "Hello from actor!",
    state: state
  };
}`,
      deploy: "cd examples/hello-world-app && slc deploy",
    },
    {
      title: "Counter App",
      description: "Simple counter that increments on each request",
      code: `export default async function handler(ctx: {
  actorId: string;
  state: {
    get(): Promise<any>;
    set(partial: any): Promise<void>;
  };
  request: Request;
}): Promise<Response | any> {
  const state = await ctx.state.get() || { count: 0 };
  const newCount = state.count + 1;
  await ctx.state.set({ count: newCount });
  
  return new Response(
    JSON.stringify({ actorId: ctx.actorId, count: newCount }),
    { headers: { "Content-Type": "application/json" } }
  );
}`,
      deploy: "cd examples/counter-app && slc deploy",
    },
    {
      title: "Chat Room App",
      description: "Per-room message storage with GET/POST endpoints",
      code: `export default async function handler(ctx: {
  actorId: string;
  state: {
    get(): Promise<any>;
    set(partial: any): Promise<void>;
  };
  request: Request;
}): Promise<Response | any> {
  const state = await ctx.state.get() || { messages: [] };
  
  if (ctx.request.method === "POST") {
    const body = await ctx.request.json();
    const newMessage = {
      id: Date.now().toString(),
      text: body.text,
      author: body.author || "anonymous",
      timestamp: new Date().toISOString()
    };
    state.messages.push(newMessage);
    await ctx.state.set(state);
    return { success: true, message: newMessage };
  }
  
  return { messages: state.messages };
}`,
      deploy: "cd examples/chat-room-app && slc deploy",
    },
  ];

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
            <span>Examples</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-semibold mb-6">
            Examples
          </h1>
          <p className="text-lg text-zinc-300 mb-12">
            Ready-to-use examples and code samples to get you started.
          </p>

          <div className="space-y-12">
            {examples.map((example, index) => (
              <section key={index} className="glass rounded-2xl p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {example.title}
                  </h2>
                  <p className="text-zinc-300">{example.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Code</h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>{example.code}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Deploy</h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>{example.deploy}</code>
                  </pre>
                </div>
              </section>
            ))}

            <section className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">More Examples</h2>
              <p className="text-zinc-300 mb-4">
                The CLI includes several example applications in the `examples/`
                directory:
              </p>
              <ul className="space-y-2 text-zinc-300 ml-4">
                <li>• Counter App - Simple counter that increments on each request</li>
                <li>
                  • Chat Room App - Per-room message storage with GET/POST
                  endpoints
                </li>
                <li>
                  • Hello World App - Basic example demonstrating state
                  management and request handling
                </li>
              </ul>
              <p className="text-sm text-zinc-400 mt-4">
                Each example includes a complete `worker.ts` file and
                `slc.config.json` configuration. Navigate to the example
                directory and run `slc deploy` to get started.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-4">Common Patterns</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Stateful Counter
                  </h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>{`const state = await ctx.state.get() || { count: 0 };
state.count += 1;
await ctx.state.set(state);
return { count: state.count };`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Key-Value Storage
                  </h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>{`const state = await ctx.state.get() || {};
if (ctx.request.method === "POST") {
  const body = await ctx.request.json();
  await ctx.state.set({ ...state, ...body });
}
return state;`}</code>
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Message Queue</h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>{`const state = await ctx.state.get() || { queue: [] };
if (ctx.request.method === "POST") {
  const body = await ctx.request.json();
  state.queue.push(body);
  await ctx.state.set(state);
}
return { queue: state.queue };`}</code>
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

