import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Learn how to deploy and manage stateful serverless functions with persistent state and memory. Complete documentation for SLC CLI, SDK, API, and examples.",
  keywords: [
    "SLC documentation",
    "stateful serverless docs",
    "persistent functions guide",
    "durable objects documentation",
    "serverless state management docs",
    "SLC CLI documentation",
    "SLC SDK documentation",
    "SLC API reference"
  ],
  openGraph: {
    title: "SLC Documentation — Build Stateful Apps Without Servers",
    description:
      "Complete documentation for SLC. Learn how to deploy and manage stateful serverless functions with persistent state and memory.",
    url: "https://slc.run/docs",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "SLC Documentation",
    description: "Complete documentation for building stateful serverless apps with SLC."
  },
  alternates: {
    canonical: "https://slc.run/docs"
  }
};

export default function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      items: [
        {
          title: "Installation",
          description: "Install the CLI and SDK to get started with SLC",
          href: "/docs/installation",
        },
        {
          title: "Quick Start",
          description: "Deploy your first stateful serverless function in minutes",
          href: "/docs/quick-start",
        },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        {
          title: "CLI",
          description: "Command-line tool for deploying and managing your apps",
          href: "/docs/cli",
        },
        {
          title: "SDK",
          description: "TypeScript/JavaScript SDK for interacting with actors",
          href: "/docs/sdk",
        },
        {
          title: "API Reference",
          description: "Complete API documentation for all endpoints",
          href: "/docs/api",
        },
      ],
    },
    {
      title: "Examples",
      items: [
        {
          title: "Examples",
          description: "Ready-to-use examples and code samples",
          href: "/docs/examples",
        },
      ],
    },
    {
      title: "Resources",
      items: [
        {
          title: "FAQ",
          description: "Frequently asked questions about SLC and stateful serverless",
          href: "/docs/faq",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-geist">
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      <header className="relative w-full px-6 py-6 sm:px-10 flex justify-between items-center">
        <Link
          href="/"
          className="uppercase tracking-[0.3em] text-xs text-zinc-400 hover:text-white transition"
        >
          SLC.RUN
        </Link>
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition"
        >
          Home
        </Link>
      </header>

      <main className="relative flex-1 px-6 sm:px-10 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl mb-16">
            <p className="text-sm tracking-[0.4em] uppercase text-zinc-500 mb-6">
              Documentation
            </p>
            <h1 className="text-4xl sm:text-6xl font-semibold leading-tight mb-6">
              Build stateful apps without servers
            </h1>
            <p className="text-lg text-zinc-300 max-w-2xl">
              Learn how to deploy and manage stateful serverless functions with
              persistent state and memory.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h2 className="text-sm tracking-[0.4em] uppercase text-zinc-500">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block glass rounded-2xl p-6 hover:bg-white/6 transition group"
                    >
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-400">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
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

