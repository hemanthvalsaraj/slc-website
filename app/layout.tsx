import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SLC — Stateful Serverless for Backend Logic That Remembers",
    template: "%s | SLC"
  },
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
    "cloud functions with persistence",
    "stateless to stateful serverless",
    "serverless state persistence",
    "edge computing with state",
    "serverless backend with memory"
  ],
  authors: [{ name: "Slick Enterprises LLP" }],
  creator: "Slick Enterprises LLP",
  publisher: "Slick Enterprises LLP",
  metadataBase: new URL("https://slc.run"),
  alternates: {
    canonical: "https://slc.run"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://slc.run",
    siteName: "SLC",
    title: "SLC — Stateful Serverless for Backend Logic That Remembers",
    description:
      "Your code, with memory. Ship stateful apps without servers and keep every function alive after deploy. Build with persistent functions, durable objects, and zero-setup state management.",
    images: [
      {
        url: "https://slc.run/og-image.png",
        width: 1200,
        height: 630,
        alt: "SLC — Stateful Serverless Computing Platform",
        type: "image/png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SLC — Stateful Serverless for Backend Logic That Remembers",
    description:
      "Build stateful apps without servers. Deploy and your logic stays alive with persistent functions, durable objects, and serverless state management.",
    images: ["https://slc.run/og-image.png"],
    creator: "@slcrun"
  },
  category: "Technology",
  classification: "Cloud Computing Platform",
  other: {
    "application-name": "SLC",
    "apple-mobile-web-app-title": "SLC",
    "apple-mobile-web-app-capable": "yes",
    "theme-color": "#020202"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#020202] text-white antialiased">{children}</body>
    </html>
  );
}

