import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const markdown = `# SLC — Stateful Serverless for Backend Logic That Remembers

Build stateful apps without servers. Deploy and your logic stays alive with persistent functions, durable objects, and serverless state management. Your code with memory.

## What is SLC?

SLC is a stateful serverless computing platform that enables developers to build stateful applications without managing servers, databases, or caching layers.

## Key Features

- **Persistent Functions**: Functions that remember every invocation
- **Durable Objects**: Stateful objects that persist data across function calls
- **Serverless State Management**: Zero-setup state management
- **No Infrastructure**: No servers, databases, or caching layers required
- **Instant State Recall**: State persists between function calls
- **Zero Setup**: Ready out of the box

## How It Works

\`\`\`javascript
export default async function handler(state, event) {
  state.count = (state.count || 0) + 1;
  return { count: state.count };
}
\`\`\`

This function maintains state between invocations. Each call increments the counter, and the state persists automatically.

## Use Cases

- Real-time counters without databases
- Chat rooms that remember participants
- Multiplayer state sync
- Per-user sessions that persist
- Shopping carts that never reset
- Long-lived workflows
- Dashboards with live values

## Why SLC?

- **Stateful Serverless**: Holds context for you
- **No Servers**: Write persistent functions that remember every invocation
- **No Databases**: No databases or caching layers needed
- **Zero Ceremony**: Serverless state management with zero setup
- **Stays Alive**: Your logic stays alive the moment you deploy

## Developer Experience

- **Zero Setup**: Ready out of the box
- **Deploy Instantly**: Seconds, not days
- **Fully Managed State**: No manual layers
- **Your Code, With Memory**: Logic stays alive

## Getting Started

1. Install the CLI: \`npm install -g @slcrun/cli\`
2. Install the SDK: \`npm install @slcrun/sdk\`
3. Deploy your first function: See [Quick Start Guide](https://slc.run/docs/quick-start)

## Documentation

- [Installation](https://slc.run/docs/installation)
- [Quick Start](https://slc.run/docs/quick-start)
- [CLI Documentation](https://slc.run/docs/cli)
- [SDK Documentation](https://slc.run/docs/sdk)
- [API Reference](https://slc.run/docs/api)
- [Examples](https://slc.run/docs/examples)

## Company

**Slick Enterprises LLP**

- Website: https://slc.run
- Privacy: privacy@slc.run
- Legal: legal@slc.run

## Status

Currently in early access. Join the waitlist at https://slc.run#waitlist

## Compliance

Complies with India's Digital Personal Data Protection Act, 2023 (DPDP Act). Data localization options available for Indian users.

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
