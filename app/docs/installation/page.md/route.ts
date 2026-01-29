import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const markdown = `# Installation

Get started with SLC by installing the CLI and SDK.

## Prerequisites

- Node.js 20 or higher
- npm or yarn

## Install CLI

### Install from npm (Recommended)

\`\`\`bash
npm install -g @slcrun/cli
\`\`\`

After installation, you can use the \`slc\` command from anywhere.

### Install from Source

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd cli

# Install dependencies
npm install

# Build the CLI
npm run build

# Link globally (optional)
npm link
\`\`\`

After linking, you can use \`slc\` from anywhere.

## Install SDK

\`\`\`bash
npm install @slcrun/sdk
\`\`\`

The SDK works in both Node.js (18+) and modern browsers.

## Verify Installation

Verify that the CLI is installed correctly:

\`\`\`bash
slc --version
\`\`\`

## Next Steps

Now that you have the CLI and SDK installed, you're ready to get started:

- [Quick Start Guide](https://slc.run/docs/quick-start) - Deploy your first stateful serverless function

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
