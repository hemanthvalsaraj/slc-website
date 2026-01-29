import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install the SLC CLI and SDK to get started with stateful serverless computing. Step-by-step installation guide for Node.js and npm.",
  keywords: [
    "SLC installation",
    "install SLC CLI",
    "install SLC SDK",
    "stateful serverless setup",
    "SLC npm install",
    "SLC CLI installation guide"
  ],
  openGraph: {
    title: "SLC Installation Guide",
    description: "Install the SLC CLI and SDK to get started with stateful serverless computing.",
    url: "https://slc.run/docs/installation"
  },
  alternates: {
    canonical: "https://slc.run/docs/installation"
  }
};

export default function InstallationPage() {
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
          href="/docs"
          className="text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition"
        >
          Docs
        </Link>
      </header>

      <main className="relative flex-1 px-6 sm:px-10 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          <nav className="mb-8 text-sm text-zinc-400">
            <Link href="/docs" className="hover:text-white transition">
              Docs
            </Link>
            <span className="mx-2">/</span>
            <span>Installation</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-semibold mb-6">
            Installation
          </h1>
          <p className="text-lg text-zinc-300 mb-12">
            Get started with SLC by installing the CLI and SDK.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <ul className="space-y-2 text-zinc-300">
                  <li>• Node.js 20 or higher</li>
                  <li>• npm or yarn</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Install CLI</h2>
              <div className="glass rounded-2xl p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Install from npm (Recommended)
                  </h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>npm install -g @slcrun/cli</code>
                  </pre>
                  <p className="text-sm text-zinc-400 mt-3">
                    After installation, you can use the `slc` command from
                    anywhere.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Install from Source
                  </h3>
                  <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code>{`# Clone the repository
git clone <repository-url>
cd cli

# Install dependencies
npm install

# Build the CLI
npm run build

# Link globally (optional)
npm link`}</code>
                  </pre>
                  <p className="text-sm text-zinc-400 mt-3">
                    After linking, you can use `slc` from anywhere.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Install SDK</h2>
              <div className="glass rounded-2xl p-6">
                <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>npm install @slcrun/sdk</code>
                </pre>
                <p className="text-sm text-zinc-400 mt-3">
                  The SDK works in both Node.js (18+) and modern browsers.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Verify Installation</h2>
              <div className="glass rounded-2xl p-6 space-y-4">
                <p className="text-zinc-300">
                  Verify that the CLI is installed correctly:
                </p>
                <pre className="bg-black/50 rounded-lg p-4 overflow-x-auto text-sm">
                  <code>slc --version</code>
                </pre>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
              <div className="glass rounded-2xl p-6">
                <p className="text-zinc-300 mb-4">
                  Now that you have the CLI and SDK installed, you're ready to
                  get started:
                </p>
                <Link
                  href="/docs/quick-start"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black text-sm font-semibold tracking-wide uppercase hover:bg-zinc-100 transition"
                >
                  Quick Start Guide →
                </Link>
              </div>
            </section>
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

