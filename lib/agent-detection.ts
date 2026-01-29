/**
 * Detects if a request is from an AI agent/bot
 * Based on common patterns in User-Agent strings
 */
export function isAgentRequest(request: Request): boolean {
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
    "crawler",
    "scraper"
  ];
  
  // Check User-Agent
  const isAgentUA = agentPatterns.some(pattern => userAgent.includes(pattern));
  
  // Check for Accept header preferring text/plain or markdown
  const prefersText = acceptHeader.includes("text/plain") || 
                      acceptHeader.includes("text/markdown") ||
                      acceptHeader.includes("*/*");
  
  // Check for explicit ?format=markdown query param
  const url = new URL(request.url);
  const formatParam = url.searchParams.get("format");
  const wantsMarkdown = formatParam === "markdown" || formatParam === "md";
  
  return isAgentUA || (prefersText && wantsMarkdown);
}

/**
 * Gets the markdown format preference from request
 */
export function shouldServeMarkdown(request: Request): boolean {
  const url = new URL(request.url);
  const formatParam = url.searchParams.get("format");
  
  // Explicit format parameter takes precedence
  if (formatParam === "markdown" || formatParam === "md") {
    return true;
  }
  if (formatParam === "html") {
    return false;
  }
  
  // Otherwise check if it's an agent request
  return isAgentRequest(request);
}
