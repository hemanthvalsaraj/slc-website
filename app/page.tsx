import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { SolutionSection } from "@/components/solution-section";
import { UseCasesSection } from "@/components/use-cases-section";
import { ComparisonSection } from "@/components/comparison-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { ZohoEarlyAccessForm } from "@/components/zoho-early-access-form";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "SLC — Build Backend Features Without the Backend Setup",
  description:
    "Stop waiting, start building. Create real-time chat apps, shopping carts, and multiplayer games in minutes—not weeks. No servers, no databases, just your code with memory.",
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
    title: "SLC — Build Backend Features Without the Backend Setup",
    description:
      "Stop waiting, start building. Create real-time chat apps, shopping carts, and multiplayer games in minutes—not weeks.",
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
    title: "SLC — Build Backend Features Without the Backend Setup",
    description:
      "Stop waiting, start building. Create real-time chat apps, shopping carts, and multiplayer games in minutes—not weeks.",
    images: ["https://slc.run/og-image.png"]
  },
  alternates: {
    canonical: "https://slc.run"
  }
};

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
      <header className="relative w-full px-6 py-6 sm:px-10 flex justify-between items-center z-10">
        <span className="uppercase tracking-[0.15em] text-xs text-zinc-400 font-medium">
          SLC.RUN
        </span>
        <div className="flex gap-6 items-center">
          <a
            href="/demo"
            className="text-xs uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition font-medium"
          >
            Try Demo
          </a>
          <a
            href="/docs"
            className="text-xs uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition font-medium"
          >
            Docs
          </a>
          <a
            href="#waitlist"
            className="text-xs uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition font-medium"
          >
            Early Access
          </a>
        </div>
      </header>

      <main className="relative flex-1">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <UseCasesSection />
        <ComparisonSection />
        <HowItWorksSection />

        <section id="waitlist" className="px-6 sm:px-10 py-20 border-t border-white/5">
          <div className="max-w-3xl mx-auto glass p-10">
            <p className="text-xs tracking-[0.1em] uppercase text-zinc-500 mb-4 font-medium">
              Early Access
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold mb-6 leading-tight tracking-tight">
              Ready to build without the backend hassle?
            </h2>
            <p className="text-base text-zinc-400 mb-8 leading-relaxed">
              Join the early access list via our Zoho form. Build real-time features in minutes,
              not weeks. No servers, no databases, just your code with memory.
            </p>
            <div className="mt-6">
              <ZohoEarlyAccessForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="relative px-6 sm:px-10 py-10 border-t border-white/5 text-sm text-zinc-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span className="text-zinc-400">© SLC.RUN — Backend logic that remembers</span>
        <div className="flex gap-6">
          <a href="/privacy" className="text-zinc-400 hover:text-white transition">
            Privacy
          </a>
          <a href="/terms" className="text-zinc-400 hover:text-white transition">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
}
