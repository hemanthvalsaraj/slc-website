import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Frequently asked questions about SLC - stateful serverless computing platform. Learn about persistent functions, durable objects, state management, pricing, use cases, and more.",
  keywords: [
    "SLC FAQ",
    "stateful serverless FAQ",
    "persistent functions questions",
    "durable objects FAQ",
    "serverless state management FAQ",
    "SLC pricing",
    "SLC use cases",
    "SLC vs Cloudflare",
    "SLC vs AWS Lambda",
    "stateful serverless questions"
  ],
  openGraph: {
    title: "SLC FAQ — Frequently Asked Questions",
    description:
      "Frequently asked questions about SLC stateful serverless computing platform. Learn about features, use cases, pricing, and technical details.",
    url: "https://slc.run/docs/faq",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "SLC FAQ",
    description: "Frequently asked questions about building stateful serverless apps with SLC."
  },
  alternates: {
    canonical: "https://slc.run/docs/faq"
  }
};

export default function FAQPage() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is SLC?",
          a: "SLC (Stateful Serverless Computing) is a platform that enables developers to build stateful applications without managing servers, databases, or caching layers. It provides persistent functions with durable state management, allowing your code to maintain memory between invocations."
        },
        {
          q: "What does 'stateful serverless' mean?",
          a: "Stateful serverless combines the benefits of serverless computing (no server management, automatic scaling) with the ability to maintain state between function invocations. Unlike traditional stateless serverless functions, SLC functions remember previous calls and can persist data automatically."
        },
        {
          q: "How is SLC different from traditional serverless platforms?",
          a: "Traditional serverless platforms like AWS Lambda are stateless—each invocation starts fresh with no memory of previous calls. SLC provides persistent state that survives between invocations, eliminating the need for external databases or caching layers for simple stateful operations."
        },
        {
          q: "What are persistent functions?",
          a: "Persistent functions are serverless functions that maintain state between invocations. Each function instance (actor) can store and retrieve data that persists across multiple calls, enabling stateful behavior without external storage."
        },
        {
          q: "What are durable objects?",
          a: "Durable objects are stateful instances that persist data and maintain their state across function invocations. Each object has a unique ID (actor ID) and can store arbitrary JSON data that survives between calls."
        }
      ]
    },
    {
      category: "Technical",
      questions: [
        {
          q: "How does state persistence work in SLC?",
          a: "SLC automatically manages state for each actor (function instance). When you call `ctx.state.set()`, the state is persisted and will be available on subsequent invocations. State is stored per actor ID, allowing you to maintain separate state for different users, sessions, or entities."
        },
        {
          q: "What programming languages does SLC support?",
          a: "SLC currently supports JavaScript and TypeScript. Your worker code is written in TypeScript/JavaScript and deployed as a bundled JavaScript file."
        },
        {
          q: "What is an actor in SLC?",
          a: "An actor is a stateful instance of your deployed application. Each actor has a unique ID (actorId) and maintains its own isolated state. Actors are created on-demand when first invoked and persist until explicitly deleted."
        },
        {
          q: "How do I deploy an application to SLC?",
          a: "Use the SLC CLI: `slc deploy`. This bundles your worker.ts file and uploads it to the platform. You can also use the API endpoint `POST /v1/_control/deploy-app` with your bundled code."
        },
        {
          q: "How do I invoke a function?",
          a: "You can invoke functions using the CLI (`slc invoke app-name actor-id`), the SDK (`actor.invoke(data)`), or directly via the API (`POST /v1/invoke/:projectId/:appName/:actorId`)."
        },
        {
          q: "What is the maximum state size per actor?",
          a: "State size limits depend on your plan. For early access, reasonable limits apply. Contact support for specific limits based on your use case."
        },
        {
          q: "How long does actor state persist?",
          a: "Actor state persists until explicitly deleted using the DELETE endpoint or `actor.clear()` method. State survives deployments and platform restarts."
        },
        {
          q: "Can I use SLC with existing databases?",
          a: "Yes, SLC can work alongside existing databases. You can use SLC for fast, in-memory stateful operations while maintaining your existing database for long-term storage or complex queries."
        }
      ]
    },
    {
      category: "Use Cases",
      questions: [
        {
          q: "What are common use cases for SLC?",
          a: "Common use cases include: real-time counters, chat rooms with message history, multiplayer game state, per-user sessions, shopping carts, long-lived workflows, dashboards with live values, rate limiting, and any application requiring fast stateful operations."
        },
        {
          q: "Can I build a chat application with SLC?",
          a: "Yes, SLC is ideal for chat applications. Each chat room can be an actor that stores messages, participants, and typing indicators. Messages persist between invocations without requiring a separate database."
        },
        {
          q: "Is SLC suitable for e-commerce applications?",
          a: "Yes, SLC can handle shopping cart state, user sessions, and real-time inventory updates. However, for final order processing and payment, you may want to persist to a traditional database."
        },
        {
          q: "Can I use SLC for real-time multiplayer games?",
          a: "Yes, SLC is excellent for maintaining game state, player positions, scores, and game room data. Each game room or player can be an actor with persistent state."
        },
        {
          q: "Is SLC good for API rate limiting?",
          a: "Yes, SLC is perfect for rate limiting. Each API key or user can be an actor that tracks request counts and timestamps, automatically resetting based on your rate limit logic."
        }
      ]
    },
    {
      category: "Comparison",
      questions: [
        {
          q: "How does SLC compare to Cloudflare Durable Objects?",
          a: "SLC provides similar functionality to Cloudflare Durable Objects but with a simpler developer experience and no vendor lock-in to Cloudflare's ecosystem. SLC focuses on ease of use and zero-configuration state management."
        },
        {
          q: "How does SLC compare to AWS Lambda with DynamoDB?",
          a: "SLC eliminates the need for a separate database for simple stateful operations. While DynamoDB is powerful, it requires setup, configuration, and additional costs. SLC provides state management built into the function execution environment."
        },
        {
          q: "Can I replace Redis with SLC?",
          a: "SLC can replace Redis for many use cases like session storage, counters, and simple key-value operations. However, Redis offers more advanced features like pub/sub, complex data structures, and clustering that SLC doesn't provide."
        },
        {
          q: "How does SLC compare to traditional serverless with databases?",
          a: "SLC reduces complexity by eliminating the need for database setup, connection pooling, and query optimization for simple stateful operations. It's faster for single-actor operations but may not replace complex relational databases for all use cases."
        }
      ]
    },
    {
      category: "Pricing & Availability",
      questions: [
        {
          q: "Is SLC free?",
          a: "SLC is currently in early access. Pricing details will be announced before general availability. Join the waitlist to get early access and stay updated on pricing."
        },
        {
          q: "When will SLC be generally available?",
          a: "SLC is currently in early access. General availability timeline will be announced to waitlist members. Join the waitlist at https://slc.run#waitlist to stay informed."
        },
        {
          q: "What regions does SLC support?",
          a: "SLC currently supports deployment to regional nodes. The Mumbai region is available, with more regions planned. Check the documentation for the latest region availability."
        },
        {
          q: "What are the rate limits?",
          a: "Rate limits depend on your plan and are designed to prevent abuse while allowing normal usage. Contact support or check your dashboard for specific rate limits."
        }
      ]
    },
    {
      category: "Security & Compliance",
      questions: [
        {
          q: "How secure is SLC?",
          a: "SLC uses API key authentication for all requests. Each request must include a valid API key in the `x-slc-api-key` header. Actor state is isolated per project and actor ID, ensuring data separation."
        },
        {
          q: "Is my data encrypted?",
          a: "All API communication uses HTTPS/TLS encryption. State data is stored securely and isolated per project. Contact support for specific encryption details."
        },
        {
          q: "Does SLC comply with data protection regulations?",
          a: "SLC complies with India's Digital Personal Data Protection Act, 2023 (DPDP Act) and offers data localization options for Indian users. See our Privacy Policy for details."
        },
        {
          q: "Can I self-host SLC?",
          a: "SLC is currently a managed service. Self-hosting options may be available in the future. Contact support for enterprise deployment options."
        },
        {
          q: "How is actor state isolated?",
          a: "Actor state is isolated by project ID and actor ID. Each project has its own namespace, and actors within a project are isolated by their unique actor IDs. There is no cross-actor or cross-project data access."
        }
      ]
    },
    {
      category: "Performance",
      questions: [
        {
          q: "How fast are SLC function invocations?",
          a: "SLC functions are designed for low latency. Cold starts are minimal, and warm invocations are typically sub-100ms depending on your function complexity and region."
        },
        {
          q: "Does SLC auto-scale?",
          a: "Yes, SLC automatically scales to handle your traffic. Each actor can handle concurrent requests, and the platform scales infrastructure as needed."
        },
        {
          q: "What is the concurrency limit per actor?",
          a: "Concurrency limits depend on your plan. SLC handles concurrent requests to the same actor safely, with state updates being atomic per request."
        },
        {
          q: "How does SLC handle high traffic?",
          a: "SLC is built on serverless infrastructure that automatically scales. The platform handles traffic spikes by scaling underlying resources, and each actor can process multiple concurrent requests."
        }
      ]
    },
    {
      category: "Development",
      questions: [
        {
          q: "How do I get started with SLC?",
          a: "1. Install the CLI: `npm install -g @slcrun/cli` 2. Install the SDK: `npm install @slcrun/sdk` 3. Create a project and get your API key 4. Deploy your first worker with `slc deploy` 5. Invoke it with `slc invoke` or the SDK. See the Quick Start guide for detailed instructions."
        },
        {
          q: "Do you have a local development environment?",
          a: "The `slc dev` command is available but currently connects to the remote node. Full local development with hot reload is planned for future releases."
        },
        {
          q: "What debugging tools are available?",
          a: "You can use console.log statements in your worker code, which will appear in the platform logs. Check the CLI and dashboard for log access. More debugging tools are planned."
        },
        {
          q: "Can I use environment variables?",
          a: "Environment variables can be configured at the project level. Check the CLI documentation for setting environment variables: `slc config set`."
        },
        {
          q: "How do I update a deployed application?",
          a: "Run `slc deploy` again. This creates a new version of your application. Existing actors will use the new version on their next invocation. Old versions are retained for rollback."
        },
        {
          q: "Can I rollback to a previous version?",
          a: "Version history is maintained. Contact support or check the CLI documentation for version management and rollback procedures."
        },
        {
          q: "Do you have TypeScript support?",
          a: "Yes, SLC has full TypeScript support. The CLI bundles TypeScript files, and the SDK is written in TypeScript with comprehensive type definitions."
        }
      ]
    },
    {
      category: "Integration",
      questions: [
        {
          q: "Can I use SLC with Next.js?",
          a: "Yes, SLC works great with Next.js. You can use the SDK in API routes, server components, or client components (with proper API key handling). See the examples for Next.js integration patterns."
        },
        {
          q: "Can I use SLC with React?",
          a: "Yes, you can use the SLC SDK in React applications. Make sure to handle API keys securely—never expose them in client-side code. Use API routes or environment variables for secure access."
        },
        {
          q: "Does SLC work with Node.js?",
          a: "Yes, the SLC SDK works in Node.js 18+. You can use it in Express.js, Fastify, or any Node.js application."
        },
        {
          q: "Can I call SLC from Python or other languages?",
          a: "While the SDK is currently TypeScript/JavaScript, you can use the REST API directly from any language that can make HTTP requests. The API uses standard JSON over HTTPS."
        },
        {
          q: "How do I handle errors in SLC?",
          a: "The SDK provides comprehensive error types (SLCError, NetworkError, AuthenticationError, etc.). Handle errors in your worker code with try-catch, and the platform will return appropriate HTTP status codes."
        }
      ]
    },
    {
      category: "Migration",
      questions: [
        {
          q: "Can I migrate from AWS Lambda to SLC?",
          a: "Yes, if your Lambda functions maintain state in DynamoDB or other databases, you can migrate that state logic into SLC actors. The handler pattern is similar, making migration straightforward."
        },
        {
          q: "Can I migrate from Cloudflare Workers to SLC?",
          a: "Yes, SLC's actor model is similar to Cloudflare Durable Objects. You can adapt your Durable Object code to work with SLC's handler pattern."
        },
        {
          q: "How do I migrate state from my existing database?",
          a: "You can write a migration script that reads from your existing database and creates actors with the corresponding state using the SLC SDK or API. Each record can become an actor with the same ID."
        }
      ]
    }
  ];

  // Generate FAQPage structured data for SEO
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((category) =>
      category.questions.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a
        }
      }))
    )
  };

  return (
    <div className="min-h-screen flex flex-col font-geist">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      <header className="relative w-full px-6 py-6 sm:px-10 flex justify-between items-center">
        <Link
          href="/"
          className="uppercase tracking-[0.3em] text-xs text-zinc-400 hover:text-white transition"
        >
          SLC.RUN
        </Link>
        <div className="flex gap-6 items-center">
          <Link
            href="/docs"
            className="text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition"
          >
            Docs
          </Link>
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="relative flex-1 px-6 sm:px-10 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <p className="text-sm tracking-[0.4em] uppercase text-zinc-500 mb-6">
              FAQ
            </p>
            <h1 className="text-4xl sm:text-6xl font-semibold leading-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-zinc-300 max-w-2xl">
              Everything you need to know about SLC, stateful serverless computing, and building applications with persistent functions.
            </p>
          </div>

          <div className="space-y-16">
            {faqs.map((category) => (
              <div key={category.category}>
                <h2 className="text-2xl font-semibold mb-8 text-zinc-100">
                  {category.category}
                </h2>
                <div className="space-y-8">
                  {category.questions.map((faq, idx) => (
                    <div key={idx} className="glass rounded-2xl p-6">
                      <h3 className="text-lg font-semibold mb-3 text-zinc-100">
                        {faq.q}
                      </h3>
                      <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 glass rounded-2xl p-8 text-center">
            <p className="text-zinc-300 mb-4">
              Still have questions? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@slc.run"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black text-sm font-semibold tracking-wide uppercase hover:bg-zinc-200 transition"
              >
                Contact Support
              </a>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-zinc-700 text-white text-sm font-semibold tracking-wide uppercase hover:border-white transition"
              >
                View Documentation
              </Link>
            </div>
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
