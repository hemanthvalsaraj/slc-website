import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SLC — stateful serverless for backend logic that remembers",
  description:
    "Build stateful apps without servers. Deploy and your logic stays alive with persistent functions and memory-rich logic.",
  keywords: [
    "stateful serverless",
    "backend logic that remembers",
    "persistent functions",
    "serverless state management",
    "your code with memory"
  ],
  metadataBase: new URL("https://slc.run"),
  openGraph: {
    title: "SLC — backend logic that remembers",
    description:
      "Your code, with memory. Ship stateful apps without servers and keep every function alive after deploy.",
    url: "https://slc.run",
    siteName: "SLC",
    images: [
      {
        url: "https://slc.run/og-image.png",
        width: 1200,
        height: 630,
        alt: "SLC — backend logic that remembers"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SLC — backend logic that remembers",
    description:
      "Build stateful apps without servers. Deploy and your logic stays alive with persistent functions.",
    images: ["https://slc.run/og-image.png"]
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

