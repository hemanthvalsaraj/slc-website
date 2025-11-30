import { WaitlistForm } from "@/components/waitlist-form";

export const dynamic = "force-static";

const codeSnippet = `export default async function handler(state, event) {
  state.count = (state.count || 0) + 1;
  return { count: state.count };
}`;

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Slick Enterprises LLP",
    legalName: "Slick Enterprises LLP",
    url: "https://slc.run",
    logo: "https://slc.run/og-image.png",
    description:
      "Slick Enterprises LLP provides SLC, a stateful serverless computing platform for backend logic that remembers.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "privacy@slc.run"
    }
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SLC",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cloud",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder"
    },
    description:
      "Stateful serverless computing platform. Build stateful apps without servers. Deploy and your logic stays alive with persistent functions, instant state recall, and serverless state management.",
    url: "https://slc.run",
    publisher: {
      "@type": "Organization",
      name: "Slick Enterprises LLP"
    },
    featureList: [
      "Persistent functions",
      "Durable objects",
      "Stateful serverless",
      "Serverless state management",
      "Zero setup deployment",
      "Instant state recall"
    ],
    screenshot: "https://slc.run/og-image.png"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SLC",
    url: "https://slc.run",
    description:
      "Stateful serverless, your code with memory. Build stateful apps without servers.",
    publisher: {
      "@type": "Organization",
      name: "Slick Enterprises LLP"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://slc.run/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SLC - Stateful Serverless Computing",
    description:
      "Stateful serverless computing platform that enables persistent functions with durable state management.",
    brand: {
      "@type": "Brand",
      name: "SLC"
    },
    manufacturer: {
      "@type": "Organization",
      name: "Slick Enterprises LLP"
    },
    category: "Cloud Computing Platform",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      price: "0",
      priceCurrency: "USD"
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-geist">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      <header className="relative w-full px-6 py-6 sm:px-10 flex justify-between items-center">
        <span className="uppercase tracking-[0.3em] text-xs text-zinc-400">
          SLC.RUN
        </span>
        <div className="flex gap-6 items-center">
          <a
            href="/docs"
            className="text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition"
          >
            Docs
          </a>
          <a
            href="#waitlist"
            className="text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition"
          >
            Early Access
          </a>
        </div>
      </header>

      <main className="relative flex-1">
        <section className="px-6 sm:px-10 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl">
              <p className="text-sm tracking-[0.4em] uppercase text-zinc-500 mb-6">
                Backend logic that remembers
              </p>
              <h1 className="text-4xl sm:text-6xl font-semibold leading-tight mb-6">
                Stateful serverless, your code with memory.
              </h1>
              <p className="text-lg text-zinc-300 max-w-2xl mb-10">
                Build stateful apps without servers. Deploy and your logic stays alive with
                persistent functions, instant state recall, and serverless state management
                that simply works.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-black text-sm font-semibold tracking-wide uppercase"
                >
                  Join the Early Access
                </a>
                <span className="text-sm text-zinc-500">
                  Your code, with memory. Deploy and stay alive.
                </span>
              </div>
            </div>
            <div className="glass rounded-3xl p-8 max-w-2xl">
            <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
              <span>Persistent function</span>
              <span>State sticks between calls</span>
            </div>
            <pre className="text-sm text-zinc-100 overflow-x-auto">
              <code>{codeSnippet}</code>
            </pre>
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-10 py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm tracking-[0.4em] uppercase text-zinc-500 mb-4">
                Why SLC?
              </p>
              <h2 className="text-3xl font-semibold">
                Stateful serverless that holds context for you.
              </h2>
            </div>
            <ul className="space-y-4 text-lg text-zinc-300">
              <li>Write persistent functions that remember every invocation.</li>
              <li>No servers. No databases. No caching layers.</li>
              <li>Serverless state management with zero ceremony.</li>
              <li>Your logic stays alive the moment you deploy.</li>
            </ul>
          </div>
        </section>

        <section className="px-6 sm:px-10 py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <p className="text-sm tracking-[0.4em] uppercase text-zinc-500 mb-4">
                  Possibilities
                </p>
                <h2 className="text-3xl font-semibold">
                  Ship ideas that stay alive after deploy.
                </h2>
              </div>
              <p className="text-zinc-400 max-w-xl">
                SLC keeps context on your behalf. Build stateful experiences—counters,
                chat, multiplayer, and workflows—without exposing internals or managing any
                extra layers.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Real-time counters without databases",
                "Chat rooms that remember participants",
                "Multiplayer state sync",
                "Per-user sessions that persist",
                "Shopping carts that never reset",
                "Long-lived workflows",
                "Dashboards with live values"
              ].map((item) => (
                <div key={item} className="glass rounded-2xl p-6 text-zinc-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 sm:px-10 py-20 border-t border-white/5">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm tracking-[0.4em] uppercase text-zinc-500 mb-4">
                Developer Experience
              </p>
              <h2 className="text-3xl font-semibold mb-4">
                Minimal effort, maximum continuity.
              </h2>
              <p className="text-zinc-400">
                Drop in your code, deploy, and let SLC keep every value warm. Nothing to
                tune, nothing to babysit—just backend logic that remembers.
              </p>
            </div>
            <div className="glass rounded-3xl p-8 grid gap-6 text-lg text-zinc-100">
              <Row label="Zero setup" detail="ready out of the box" />
              <Row label="Deploy instantly" detail="seconds, not days" />
              <Row label="Fully managed state" detail="no manual layers" />
              <Row label="Your code, with memory" detail="logic stays alive" />
            </div>
          </div>
        </section>

        <section id="waitlist" className="px-6 sm:px-10 py-20 border-t border-white/5">
          <div className="max-w-3xl mx-auto glass rounded-3xl p-10">
            <p className="text-sm tracking-[0.4em] uppercase text-zinc-500 mb-4">
              Early Access
            </p>
            <h2 className="text-3xl font-semibold mb-6">
              Deploy once and your logic stays alive.
            </h2>
            <p className="text-zinc-400 mb-8">
              Join the waitlist to build serverless apps with memory. Tell us what you want
              to launch and we will bring persistent functions to your team.
            </p>
            <WaitlistForm />
          </div>
        </section>
      </main>

      <footer className="relative px-6 sm:px-10 py-10 border-t border-white/5 text-sm text-zinc-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span>© Slick Enterprises LLP — Backend logic that remembers</span>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-white transition">
            Privacy
          </a>
          <a href="/terms" className="hover:text-white transition">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
}

function Row({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="text-zinc-500">{detail}</span>
    </div>
  );
}

