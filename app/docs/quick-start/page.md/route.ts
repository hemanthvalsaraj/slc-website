import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const markdown = `# Quick Start Guide

Deploy your first stateful serverless function in minutes.

## 1. Create a Worker

Create a new file called \`worker.ts\`:

\`\`\`typescript
export default async function handler(ctx: {
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
}
\`\`\`

## 2. Configure Your App

Create \`slc.config.json\` in your project root:

\`\`\`json
{
  "name": "hello-world-app",
  "entry": "./worker.ts"
}
\`\`\`

**Configuration Fields:**
- \`name\` (required): Your app name (used in the invoke URL)
- \`entry\` (required): Path to your worker file (relative to config file)
- \`apiBaseUrl\` (optional): API endpoint URL (defaults to production API)

## 3. Deploy Your App

\`\`\`bash
slc deploy
\`\`\`

This will:
- Bundle your \`worker.ts\` into a single JavaScript file
- Upload it to the regional node
- Register it as a deployable app

**Output:**
\`\`\`
Bundling worker.ts...
Uploading to https://api.slc.run...
✓ App 'hello-world-app' deployed successfully
  Version: 1
  Created: 12/1/2024, 10:30:00 AM

Invoke via: slc invoke hello-world-app <actorId>
\`\`\`

## 4. Invoke Your App

### Using the CLI (Recommended)

\`\`\`bash
slc invoke hello-world-app user-123 --data '{"message":"hi there"}'
\`\`\`

### Using curl with versioned API

\`\`\`bash
curl -X POST https://api.slc.run/v1/invoke/my-project/hello-world-app/user-123 \\
  -H "Content-Type: application/json" \\
  -H "x-slc-api-key: sk_your_api_key" \\
  -d '{"message":"hi there"}'
\`\`\`

The handler will:
- Load or create the actor with ID \`user-123\`
- Pass the request body to your handler
- Update the actor's state
- Return a JSON response with version metadata

## Handler Context

Your handler receives a context object with:

- **\`actorId\`**: The unique identifier of the actor instance
- **\`state.get()\`**: Returns the current state as a JSON object
- **\`state.set(partial)\`**: Merges \`partial\` into the current state
- **\`request\`**: The incoming HTTP request (method, body, headers)

## Return Value

Your handler can return:
- A JSON-serializable object (sent as JSON with 200 status)
- A \`Response\` object (for full control over status and headers)

## Next Steps

- Learn more about the [CLI](https://slc.run/docs/cli)
- Explore the [SDK](https://slc.run/docs/sdk)
- Check out [Examples](https://slc.run/docs/examples)

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
