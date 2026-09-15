import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // Add Link headers for discovery (RFC 8288)
  const links: string[] = [
    `</sitemap.xml>; rel="sitemap"`,
    `</llms.txt>; rel="alternate"; type="text/plain"; title="llms.txt"`,
    `</llms-full.txt>; rel="alternate"; type="text/plain"; title="llms-full.txt"`,
    `</.well-known/ard.json>; rel="describedby"; type="application/json"`,
    `</.well-known/agent-card.json>; rel="describedby"; type="application/json"`,
  ];

  // Add markdown fallback link for content pages
  if (
    pathname.startsWith("/components") ||
    pathname.startsWith("/get-started") ||
    pathname.startsWith("/blocks")
  ) {
    links.push(`</${pathname}.md>; rel="alternate"; type="text/markdown"`);
  }

  response.headers.set("Link", links.join(", "));
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|preview/|.well-known/).*)",
  ],
};
