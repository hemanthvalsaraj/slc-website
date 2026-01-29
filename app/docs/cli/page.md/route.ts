import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const markdown = `# CLI Documentation

Command-line tool for deploying and developing Durable Actor applications on the SLC platform.

## Overview

SLC CLI enables you to:
- Deploy your Durable Actor workers to regional nodes
- Develop applications locally with remote node support
- Bundle TypeScript/JavaScript workers into optimized bundles

Each deployed application becomes available as an invokable actor service on the regional node.

## Commands

### slc deploy

Deploys your application to the regional node specified in \`slc.config.json\`.

**Usage:**
\`\`\`bash
slc deploy
\`\`\`

**What it does:**
1. Reads \`slc.config.json\` from the current directory
2. Bundles your worker using esbuild
3. Uploads the bundle to the regional node via \`/_control/deploy-app\`
4. Makes your app available at \`/invoke/<app-name>/:actorId\`

**Output:**
\`\`\`
Bundling worker...
Uploading to https://api.slc.run...
✓ Deployed app 'my-app'
  Invoke via: POST https://api.slc.run/v1/invoke/my-project/my-app/:actorId
\`\`\`

### slc dev

Starts development mode (currently informational).

**Usage:**
\`\`\`bash
slc dev
\`\`\`

**Note:** Local development server coming soon. For now, deploy and test directly against the remote node.

### slc config

Manage CLI configuration stored in \`~/.slcrc\`.

**View all config:**
\`\`\`bash
slc config get
\`\`\`

**Set a config value:**
\`\`\`bash
slc config set endpoint https://api.slc.run
slc config set apiVersion v1
slc config set projectId my-project
\`\`\`

**Get a specific config value:**
\`\`\`bash
slc config get apiVersion
\`\`\`

### slc login

Store your credentials for authentication.

**Usage:**
\`\`\`bash
slc login
\`\`\`

Follow prompts to enter API key and endpoint. Or set manually:

\`\`\`bash
slc config set apiKey sk_your_api_key
slc config set projectId my-project
\`\`\`

## Configuration File

Create \`slc.config.json\` in your project root:

\`\`\`json
{
  "name": "my-app",
  "entry": "./worker.ts"
}
\`\`\`

**Fields:**
- \`name\` (required): Your app name. Used in the invocation URL: \`/v1/invoke/<projectId>/<name>/:actorId\`
- \`entry\` (required): Path to your worker file (relative to config file location)
- \`apiBaseUrl\` (optional): Base URL of the SLC API. If not specified, uses the endpoint from \`~/.slcrc\` (defaults to \`https://api.slc.run\`)

## Worker Handler

Your worker file must export a default async function with this signature:

\`\`\`typescript
export default async function handler(ctx: {
  actorId: string;
  state: {
    get(): Promise<any>;
    set(partial: any): Promise<void>;
  };
  request: Request | { method: string; body?: any };
}): Promise<Response | any>
\`\`\`

**Context Properties:**
- \`actorId\`: Unique identifier for the actor instance (from URL: \`/invoke/:app/:actorId\`)
- \`state\`: Persistent state management
  - \`get()\`: Retrieves the current state for this actor
  - \`set(partial)\`: Updates the state (merges with existing state)
- \`request\`: Request object with \`method\` and optionally \`body\`

## How It Works

### Deployment Flow

1. **Bundle:** Your TypeScript/JavaScript worker is bundled using esbuild
   - Format: ESM (ES modules)
   - Platform: Node.js
   - Target: Node 20+
   - All dependencies are bundled (no external deps)

2. **Upload:** The bundle is sent to the regional node via HTTP POST to \`/v1/_control/deploy-app\`

3. **Registration:** The node stores the bundle and makes it available at \`/v1/invoke/<projectId>/<app-name>/:actorId\`

### Invocation Flow

When you invoke an actor:

1. Request: \`POST /v1/invoke/<projectId>/<app-name>/:actorId\`
2. Node looks up the app bundle
3. Node uses DOSupervisor to get/create actor by \`actorId\`
4. Node provides handler with: \`actorId\`, \`state\` wrapper (get/set), \`request\` (method/body)
5. Handler executes and returns response
6. Node returns handler's response as HTTP response

## Troubleshooting

### "slc.config.json not found"
- Make sure you're running \`slc deploy\` from the directory containing \`slc.config.json\`
- Check that the file is named exactly \`slc.config.json\`

### "Entry file not found"
- Verify the \`entry\` path in \`slc.config.json\` is correct
- Path is relative to the \`slc.config.json\` file location

### "Failed to connect to <url>"
- Ensure the regional node is running
- Check that \`apiBaseUrl\` in \`slc.config.json\` is correct
- Verify network connectivity to the node

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
