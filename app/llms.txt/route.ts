import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const llmsContent = `# llms.txt for SLC (slc.run)

## About
SLC is a stateful serverless computing platform developed by Slick Enterprises LLP. It enables developers to build stateful applications without managing servers, databases, or caching layers.

## Product Information
- Product Name: SLC
- Company: Slick Enterprises LLP
- Website: https://slc.run
- Description: Stateful serverless computing platform that provides persistent functions with durable state management. Your code with memory.

## Key Features
- Persistent functions that remember every invocation
- Durable objects for stateful serverless computing
- Serverless state management with zero ceremony
- No servers, databases, or caching layers required
- Instant state recall between function calls
- Zero setup deployment

## Technology
- Serverless computing
- Stateful functions
- Durable objects (similar to Cloudflare Durable Objects)
- Persistent state management
- Function-as-a-Service (FaaS)

## Use Cases
- Real-time counters without databases
- Chat rooms that remember participants
- Multiplayer state sync
- Per-user sessions that persist
- Shopping carts that never reset
- Long-lived workflows
- Dashboards with live values

## Compliance
- Complies with India's Digital Personal Data Protection Act, 2023 (DPDP Act)
- Data localization options for Indian users
- Privacy policy: https://slc.run/privacy
- Terms of service: https://slc.run/terms

## Contact
- Privacy: privacy@slc.run
- Legal: legal@slc.run

## Documentation
- Main website: https://slc.run
- Privacy Policy: https://slc.run/privacy
- Terms of Service: https://slc.run/terms

## Agent-Friendly Markdown Routes

For efficient agent consumption, markdown versions are available:
- Homepage: https://slc.run/page.md or https://slc.run?format=markdown
- Documentation: https://slc.run/docs/page.md or https://slc.run/docs?format=markdown
- Installation: https://slc.run/docs/installation/page.md
- Quick Start: https://slc.run/docs/quick-start/page.md
- CLI Docs: https://slc.run/docs/cli/page.md
- SDK Docs: https://slc.run/docs/sdk/page.md
- API Reference: https://slc.run/docs/api/page.md
- Examples: https://slc.run/docs/examples/page.md
- FAQ: https://slc.run/docs/faq/page.md

Agents are automatically served markdown when detected via User-Agent or Accept headers. Add ?format=markdown to any page URL for explicit markdown rendering.

## Status
Currently in early access. Join the waitlist at https://slc.run#waitlist
`;

  return new NextResponse(llmsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}

