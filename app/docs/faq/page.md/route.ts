import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const markdown = `# SLC Frequently Asked Questions

Everything you need to know about SLC, stateful serverless computing, and building applications with persistent functions.

## General

### What is SLC?

SLC (Stateful Serverless Computing) is a platform that enables developers to build stateful applications without managing servers, databases, or caching layers. It provides persistent functions with durable state management, allowing your code to maintain memory between invocations.

### What does 'stateful serverless' mean?

Stateful serverless combines the benefits of serverless computing (no server management, automatic scaling) with the ability to maintain state between function invocations. Unlike traditional stateless serverless functions, SLC functions remember previous calls and can persist data automatically.

### How is SLC different from traditional serverless platforms?

Traditional serverless platforms like AWS Lambda are stateless—each invocation starts fresh with no memory of previous calls. SLC provides persistent state that survives between invocations, eliminating the need for external databases or caching layers for simple stateful operations.

### What are persistent functions?

Persistent functions are serverless functions that maintain state between invocations. Each function instance (actor) can store and retrieve data that persists across multiple calls, enabling stateful behavior without external storage.

### What are durable objects?

Durable objects are stateful instances that persist data and maintain their state across function invocations. Each object has a unique ID (actor ID) and can store arbitrary JSON data that survives between calls.

## Technical

### How does state persistence work in SLC?

SLC automatically manages state for each actor (function instance). When you call \`ctx.state.set()\`, the state is persisted and will be available on subsequent invocations. State is stored per actor ID, allowing you to maintain separate state for different users, sessions, or entities.

### What programming languages does SLC support?

SLC currently supports JavaScript and TypeScript. Your worker code is written in TypeScript/JavaScript and deployed as a bundled JavaScript file.

### What is an actor in SLC?

An actor is a stateful instance of your deployed application. Each actor has a unique ID (actorId) and maintains its own isolated state. Actors are created on-demand when first invoked and persist until explicitly deleted.

### How do I deploy an application to SLC?

Use the SLC CLI: \`slc deploy\`. This bundles your worker.ts file and uploads it to the platform. You can also use the API endpoint \`POST /v1/_control/deploy-app\` with your bundled code.

### How do I invoke a function?

You can invoke functions using the CLI (\`slc invoke app-name actor-id\`), the SDK (\`actor.invoke(data)\`), or directly via the API (\`POST /v1/invoke/:projectId/:appName/:actorId\`).

### What is the maximum state size per actor?

State size limits depend on your plan. For early access, reasonable limits apply. Contact support for specific limits based on your use case.

### How long does actor state persist?

Actor state persists until explicitly deleted using the DELETE endpoint or \`actor.clear()\` method. State survives deployments and platform restarts.

### Can I use SLC with existing databases?

Yes, SLC can work alongside existing databases. You can use SLC for fast, in-memory stateful operations while maintaining your existing database for long-term storage or complex queries.

## Use Cases

### What are common use cases for SLC?

Common use cases include: real-time counters, chat rooms with message history, multiplayer game state, per-user sessions, shopping carts, long-lived workflows, dashboards with live values, rate limiting, and any application requiring fast stateful operations.

### Can I build a chat application with SLC?

Yes, SLC is ideal for chat applications. Each chat room can be an actor that stores messages, participants, and typing indicators. Messages persist between invocations without requiring a separate database.

### Is SLC suitable for e-commerce applications?

Yes, SLC can handle shopping cart state, user sessions, and real-time inventory updates. However, for final order processing and payment, you may want to persist to a traditional database.

### Can I use SLC for real-time multiplayer games?

Yes, SLC is excellent for maintaining game state, player positions, scores, and game room data. Each game room or player can be an actor with persistent state.

### Is SLC good for API rate limiting?

Yes, SLC is perfect for rate limiting. Each API key or user can be an actor that tracks request counts and timestamps, automatically resetting based on your rate limit logic.

## Comparison

### How does SLC compare to Cloudflare Durable Objects?

SLC provides similar functionality to Cloudflare Durable Objects but with a simpler developer experience and no vendor lock-in to Cloudflare's ecosystem. SLC focuses on ease of use and zero-configuration state management.

### How does SLC compare to AWS Lambda with DynamoDB?

SLC eliminates the need for a separate database for simple stateful operations. While DynamoDB is powerful, it requires setup, configuration, and additional costs. SLC provides state management built into the function execution environment.

### Can I replace Redis with SLC?

SLC can replace Redis for many use cases like session storage, counters, and simple key-value operations. However, Redis offers more advanced features like pub/sub, complex data structures, and clustering that SLC doesn't provide.

### How does SLC compare to traditional serverless with databases?

SLC reduces complexity by eliminating the need for database setup, connection pooling, and query optimization for simple stateful operations. It's faster for single-actor operations but may not replace complex relational databases for all use cases.

## Pricing & Availability

### Is SLC free?

SLC is currently in early access. Pricing details will be announced before general availability. Join the waitlist to get early access and stay updated on pricing.

### When will SLC be generally available?

SLC is currently in early access. General availability timeline will be announced to waitlist members. Join the waitlist at https://slc.run#waitlist to stay informed.

### What regions does SLC support?

SLC currently supports deployment to regional nodes. The Mumbai region is available, with more regions planned. Check the documentation for the latest region availability.

### What are the rate limits?

Rate limits depend on your plan and are designed to prevent abuse while allowing normal usage. Contact support or check your dashboard for specific rate limits.

## Security & Compliance

### How secure is SLC?

SLC uses API key authentication for all requests. Each request must include a valid API key in the \`x-slc-api-key\` header. Actor state is isolated per project and actor ID, ensuring data separation.

### Is my data encrypted?

All API communication uses HTTPS/TLS encryption. State data is stored securely and isolated per project. Contact support for specific encryption details.

### Does SLC comply with data protection regulations?

SLC complies with India's Digital Personal Data Protection Act, 2023 (DPDP Act) and offers data localization options for Indian users. See our Privacy Policy for details.

### Can I self-host SLC?

SLC is currently a managed service. Self-hosting options may be available in the future. Contact support for enterprise deployment options.

### How is actor state isolated?

Actor state is isolated by project ID and actor ID. Each project has its own namespace, and actors within a project are isolated by their unique actor IDs. There is no cross-actor or cross-project data access.

## Performance

### How fast are SLC function invocations?

SLC functions are designed for low latency. Cold starts are minimal, and warm invocations are typically sub-100ms depending on your function complexity and region.

### Does SLC auto-scale?

Yes, SLC automatically scales to handle your traffic. Each actor can handle concurrent requests, and the platform scales infrastructure as needed.

### What is the concurrency limit per actor?

Concurrency limits depend on your plan. SLC handles concurrent requests to the same actor safely, with state updates being atomic per request.

### How does SLC handle high traffic?

SLC is built on serverless infrastructure that automatically scales. The platform handles traffic spikes by scaling underlying resources, and each actor can process multiple concurrent requests.

## Development

### How do I get started with SLC?

1. Install the CLI: \`npm install -g @slcrun/cli\`
2. Install the SDK: \`npm install @slcrun/sdk\`
3. Create a project and get your API key
4. Deploy your first worker with \`slc deploy\`
5. Invoke it with \`slc invoke\` or the SDK

See the [Quick Start guide](https://slc.run/docs/quick-start) for detailed instructions.

### Do you have a local development environment?

The \`slc dev\` command is available but currently connects to the remote node. Full local development with hot reload is planned for future releases.

### What debugging tools are available?

You can use console.log statements in your worker code, which will appear in the platform logs. Check the CLI and dashboard for log access. More debugging tools are planned.

### Can I use environment variables?

Environment variables can be configured at the project level. Check the CLI documentation for setting environment variables: \`slc config set\`.

### How do I update a deployed application?

Run \`slc deploy\` again. This creates a new version of your application. Existing actors will use the new version on their next invocation. Old versions are retained for rollback.

### Can I rollback to a previous version?

Version history is maintained. Contact support or check the CLI documentation for version management and rollback procedures.

### Do you have TypeScript support?

Yes, SLC has full TypeScript support. The CLI bundles TypeScript files, and the SDK is written in TypeScript with comprehensive type definitions.

## Integration

### Can I use SLC with Next.js?

Yes, SLC works great with Next.js. You can use the SDK in API routes, server components, or client components (with proper API key handling). See the examples for Next.js integration patterns.

### Can I use SLC with React?

Yes, you can use the SLC SDK in React applications. Make sure to handle API keys securely—never expose them in client-side code. Use API routes or environment variables for secure access.

### Does SLC work with Node.js?

Yes, the SLC SDK works in Node.js 18+. You can use it in Express.js, Fastify, or any Node.js application.

### Can I call SLC from Python or other languages?

While the SDK is currently TypeScript/JavaScript, you can use the REST API directly from any language that can make HTTP requests. The API uses standard JSON over HTTPS.

### How do I handle errors in SLC?

The SDK provides comprehensive error types (SLCError, NetworkError, AuthenticationError, etc.). Handle errors in your worker code with try-catch, and the platform will return appropriate HTTP status codes.

## Migration

### Can I migrate from AWS Lambda to SLC?

Yes, if your Lambda functions maintain state in DynamoDB or other databases, you can migrate that state logic into SLC actors. The handler pattern is similar, making migration straightforward.

### Can I migrate from Cloudflare Workers to SLC?

Yes, SLC's actor model is similar to Cloudflare Durable Objects. You can adapt your Durable Object code to work with SLC's handler pattern.

### How do I migrate state from my existing database?

You can write a migration script that reads from your existing database and creates actors with the corresponding state using the SLC SDK or API. Each record can become an actor with the same ID.

---

## Still Have Questions?

- Contact Support: support@slc.run
- View Documentation: https://slc.run/docs
- Join Waitlist: https://slc.run#waitlist

*Last updated: ${new Date().toISOString().split('T')[0]}*
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}
