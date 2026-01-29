import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const markdown = `# Examples

Ready-to-use examples and code samples to get you started.

## Hello World App

Basic example demonstrating state management and request handling.

**Code:**
\`\`\`typescript
export default async function handler(ctx: {
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
}
\`\`\`

**Deploy:**
\`\`\`bash
cd examples/hello-world-app && slc deploy
\`\`\`

## Counter App

Simple counter that increments on each request.

**Code:**
\`\`\`typescript
export default async function handler(ctx: {
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
}
\`\`\`

**Deploy:**
\`\`\`bash
cd examples/counter-app && slc deploy
\`\`\`

## Chat Room App

Per-room message storage with GET/POST endpoints.

**Code:**
\`\`\`typescript
export default async function handler(ctx: {
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
}
\`\`\`

**Deploy:**
\`\`\`bash
cd examples/chat-room-app && slc deploy
\`\`\`

## More Examples

The CLI includes several example applications in the \`examples/\` directory:
- Counter App - Simple counter that increments on each request
- Chat Room App - Per-room message storage with GET/POST endpoints
- Hello World App - Basic example demonstrating state management and request handling

Each example includes a complete \`worker.ts\` file and \`slc.config.json\` configuration. Navigate to the example directory and run \`slc deploy\` to get started.

## Common Patterns

### Stateful Counter

\`\`\`typescript
const state = await ctx.state.get() || { count: 0 };
state.count += 1;
await ctx.state.set(state);
return { count: state.count };
\`\`\`

### Key-Value Storage

\`\`\`typescript
const state = await ctx.state.get() || {};
if (ctx.request.method === "POST") {
  const body = await ctx.request.json();
  await ctx.state.set({ ...state, ...body });
}
return state;
\`\`\`

### Message Queue

\`\`\`typescript
const state = await ctx.state.get() || { queue: [] };
if (ctx.request.method === "POST") {
  const body = await ctx.request.json();
  state.queue.push(body);
  await ctx.state.set(state);
}
return { queue: state.queue };
\`\`\`

---

*Last updated: ${new Date().toISOString().split('T')[0]}*
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}
