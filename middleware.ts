import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Detects if a request is from an AI agent/bot
 */
function isAgentRequest(request: NextRequest): boolean {
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  const acceptHeader = request.headers.get("accept") || "";
  
  // Check for explicit agent indicators
  const agentPatterns = [
    "gpt",
    "claude",
    "anthropic",
    "openai",
    "chatgpt",
    "googlebot",
    "bingbot",
    "crawler",
    "spider",
    "bot",
    "agent",
    "llm",
    "ai-assistant",
    "perplexity",
    "scraper"
  ];
  
  // Check User-Agent
  const isAgentUA = agentPatterns.some(pattern => userAgent.includes(pattern));
  
  // Check for Accept header preferring text/plain or markdown
  const prefersText = acceptHeader.includes("text/plain") || 
                      acceptHeader.includes("text/markdown");
  
  // Check for explicit ?format=markdown query param
  const formatParam = request.nextUrl.searchParams.get("format");
  const wantsMarkdown = formatParam === "markdown" || formatParam === "md";
  
  return isAgentUA || (prefersText && wantsMarkdown);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip if already requesting a markdown route or API route
  if (pathname.includes(".md") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  
  // Check if this is an agent request
  const isAgent = isAgentRequest(request);
  
  if (!isAgent) {
    return NextResponse.next();
  }
  
  // Map paths to their markdown equivalents
  const markdownRoutes: Record<string, string> = {
    "/": "/page.md",
    "/docs": "/docs/page.md",
    "/docs/installation": "/docs/installation/page.md",
    "/docs/quick-start": "/docs/quick-start/page.md",
    "/docs/cli": "/docs/cli/page.md",
    "/docs/sdk": "/docs/sdk/page.md",
    "/docs/api": "/docs/api/page.md",
    "/docs/examples": "/docs/examples/page.md"
  };
  
  const markdownPath = markdownRoutes[pathname];
  
  if (markdownPath) {
    // Rewrite to markdown route
    const url = request.nextUrl.clone();
    url.pathname = markdownPath;
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (SEO files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt).*)"
  ]
};
