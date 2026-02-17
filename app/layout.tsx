import type { Metadata } from "next";
import Script from "next/script";
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon-precomposed.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "manifest", url: "/manifest.json" },
      { rel: "apple-touch-icon-precomposed", url: "/apple-icon-precomposed.png" }
    ]
  },
  manifest: "/manifest.json",
  other: {
    "application-name": "SLC",
    "apple-mobile-web-app-title": "SLC",
    "apple-mobile-web-app-capable": "yes",
    "theme-color": "#020202",
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/ms-icon-144x144.png",
    "msapplication-config": "/browserconfig.xml"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#020202] text-white antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YJ5B075X93"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YJ5B075X93');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

