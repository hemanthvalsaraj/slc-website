import { WaitlistForm } from "@/components/waitlist-form";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "SLC — Stateful Serverless for Backend Logic That Remembers",
  description:
    "Build stateful apps without servers. Deploy and your logic stays alive with persistent functions, durable objects, and serverless state management. Your code with memory.",
  keywords: [
    "stateful serverless",
    "backend logic that remembers",
    "persistent functions",
    "serverless state management",
    "durable objects",
    "stateful serverless computing",
    "serverless functions with state",
    "persistent serverless",
    "stateful edge computing",
    "serverless actors",
    "durable actors",
    "serverless with memory",
    "FaaS with state",
    "cloud functions with persistence"
  ],
  openGraph: {
    title: "SLC — Stateful Serverless for Backend Logic That Remembers",
    description:
      "Your code, with memory. Ship stateful apps without servers and keep every function alive after deploy. Build with persistent functions, durable objects, and zero-setup state management.",
    url: "https://slc.run",
    type: "website",
    images: [
      {
        url: "https://slc.run/og-image.png",
        width: 1200,
        height: 630,
        alt: "SLC — Stateful Serverless Computing Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SLC — Stateful Serverless for Backend Logic That Remembers",
    description:
      "Build stateful apps without servers. Deploy and your logic stays alive with persistent functions, durable objects, and serverless state management.",
    images: ["https://slc.run/og-image.png"]
  },
  alternates: {
    canonical: "https://slc.run"
  }
};

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
    logo: {
      "@type": "ImageObject",
      url: "https://slc.run/og-image.png",
      width: 1200,
      height: 630
    },
    description:
      "Slick Enterprises LLP provides SLC, a stateful serverless computing platform for backend logic that remembers. Build stateful apps without servers with persistent functions and durable objects.",
    foundingDate: "2024",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: "privacy@slc.run",
        availableLanguage: "English"
      },
      {
        "@type": "ContactPoint",
        contactType: "Technical Support",
        email: "support@slc.run",
        availableLanguage: "English"
      }
    ],
    sameAs: []
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SLC",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Cloud Computing Platform",
    operatingSystem: "Cloud",
    softwareVersion: "1.0",
    releaseNotes: "Early access - Stateful serverless computing platform",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      url: "https://slc.run"
    },
    description:
      "Stateful serverless computing platform. Build stateful apps without servers. Deploy and your logic stays alive with persistent functions, instant state recall, and serverless state management. Zero setup, fully managed state.",
    url: "https://slc.run",
    downloadUrl: "https://slc.run/docs/installation",
    screenshot: {
      "@type": "ImageObject",
      url: "https://slc.run/og-image.png",
      width: 1200,
      height: 630
    },
    publisher: {
      "@type": "Organization",
      name: "Slick Enterprises LLP",
      url: "https://slc.run"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
      bestRating: "5",
      worstRating: "1"
    },
    featureList: [
      "Persistent functions",
      "Durable objects",
      "Stateful serverless",
      "Serverless state management",
      "Zero setup deployment",
      "Instant state recall",
      "No servers required",
      "No databases required",
      "No caching layers",
      "Fully managed state"
    ],
    softwareRequirements: "Node.js 20+",
    browserRequirements: "Modern browsers or Node.js 18+"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SLC - Stateful Serverless Computing",
    url: "https://slc.run",
    description:
      "Stateful serverless, your code with memory. Build stateful apps without servers. Deploy and your logic stays alive with persistent functions, durable objects, and serverless state management.",
    publisher: {
      "@type": "Organization",
      name: "Slick Enterprises LLP",
      url: "https://slc.run"
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://slc.run/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SLC - Stateful Serverless Computing Platform",
    description:
      "Stateful serverless computing platform that enables persistent functions with durable state management. Build stateful apps without servers, databases, or caching layers. Your code with memory.",
    image: [
      {
        "@type": "ImageObject",
        url: "https://slc.run/og-image.png",
        width: 1200,
        height: 630
      }
    ],
    brand: {
      "@type": "Brand",
      name: "SLC"
    },
    manufacturer: {
      "@type": "Organization",
      name: "Slick Enterprises LLP",
      url: "https://slc.run"
    },
    category: "Cloud Computing Platform",
    productID: "slc-platform",
    sku: "slc-1",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      price: "0",
      priceCurrency: "USD",
      url: "https://slc.run",
      priceValidUntil: "2026-12-31",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn"
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD"
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US"
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY"
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY"
          }
        }
      }
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
      bestRating: "5",
      worstRating: "1"
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1"
        },
        author: {
          "@type": "Person",
          name: "Early Access User"
        },
        reviewBody: "SLC provides a revolutionary approach to stateful serverless computing. The platform makes it incredibly easy to build persistent functions without managing servers or databases.",
        datePublished: "2024-01-01"
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://slc.run"
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
        <span>© SLC.RUN — Backend logic that remembers</span>
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

