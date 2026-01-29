import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const markdown = `# SLC Documentation

Learn how to deploy and manage stateful serverless functions with persistent state and memory.

## Getting Started

### Installation
[Installation Guide](https://slc.run/docs/installation)

Install the CLI and SDK to get started with SLC.

### Quick Start
[Quick Start Guide](https://slc.run/docs/quick-start)

Deploy your first stateful serverless function in minutes.

## Core Concepts

### CLI
[CLI Documentation](https://slc.run/docs/cli)

Command-line tool for deploying and managing your apps.

**Key Commands:**
- \`slc deploy\` - Deploy your application
- \`slc dev\` - Start development mode
- \`slc config\` - Manage CLI configuration
- \`slc login\` - Store credentials

### SDK
[SDK Documentation](https://slc.run/docs/sdk)

TypeScript/JavaScript SDK for interacting with actors.

**Features:**
- Type-safe with full TypeScript support
- Works in Node.js (18+) and modern browsers
- Simple API for actor state management
- Comprehensive error handling

**Installation:**
\`\`\`bash
npm install @slcrun/sdk
\`\`\`

**Quick Example:**
\`\`\`typescript
import { SLC } from '@slcrun/sdk';

const client = new SLC({
  projectId: 'my-project',
  apiKey: process.env.SLC_API_KEY!,
});

const actor = client.actor('my-app', 'user-123');
const state = await actor.get();
await actor.set({ name: 'John Doe' });
\`\`\`

### API Reference
[API Reference](https://slc.run/docs/api)

Complete API documentation for all endpoints.

**Key Endpoints:**
- \`POST /v1/invoke/:projectId/:appName/:actorId\` - Invoke app handler
- \`GET /v1/invoke/:projectId/:appName/:actorId\` - Get actor state
- \`DELETE /v1/invoke/:projectId/:appName/:actorId\` - Delete actor state
- \`POST /v1/_control/deploy-app\` - Deploy application

## Examples

[Examples](https://slc.run/docs/examples)

Ready-to-use examples and code samples.

**Available Examples:**
- Hello World App - Basic state management
- Counter App - Simple counter that increments
- Chat Room App - Per-room message storage

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

## FAQ

[FAQ](https://slc.run/docs/faq)

Frequently asked questions about SLC, stateful serverless computing, persistent functions, use cases, pricing, security, and more.

## Resources

- Main Website: https://slc.run
- Privacy Policy: https://slc.run/privacy
- Terms of Service: https://slc.run/terms

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
