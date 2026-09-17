import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /.well-known/agent-card.json to API route
  if (pathname === "/.well-known/agent-card.json") {
    return NextResponse.rewrite(new URL("/api/agent-card", request.url));
  }

  // Rewrite {path}.md to /md/{path} for markdown fallback
  if (pathname.endsWith(".md")) {
    const mdPath = pathname.slice(0, -3);
    return NextResponse.rewrite(new URL(`/md${mdPath}`, request.url));
  }

  const response = NextResponse.next();

  // Add Link headers for discovery (RFC 8288)
  const links: string[] = [
    `</sitemap.xml>; rel="sitemap"`,
    `</llms.txt>; rel="alternate"; type="text/plain"; title="llms.txt"`,
    `</llms-full.txt>; rel="alternate"; type="text/plain"; title="llms-full.txt"`,
    `</.well-known/agent-card.json>; rel="describedby"; type="application/json"`,
    `</.well-known/mcp/server-card.json>; rel="describedby"; type="application/json"`,
    `</api/mcp>; rel="service-desc"; type="application/json"`,
    `</about>; rel="author"`,
    `</privacy>; rel="privacy-policy"`,
  ];

  // Add markdown fallback link for content pages
  const mdPages = [
    "/components",
    "/get-started",
    "/blocks",
    "/about",
    "/privacy",
  ];
  if (mdPages.some((p) => pathname.startsWith(p))) {
    links.push(`</${pathname.slice(1)}.md>; rel="alternate"; type="text/markdown"`);
  }

  response.headers.set("Link", links.join(", "));
  return response;
}

export function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|preview/).*)",
  ],
};
