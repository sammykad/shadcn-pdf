import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <main className="mx-auto max-w-md text-center">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This page does not exist.
        </p>

        <nav className="mt-8 space-y-2 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Where to go next:</p>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="underline underline-offset-4 hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link href="/get-started" className="underline underline-offset-4 hover:text-foreground">
                Get Started
              </Link>
            </li>
            <li>
              <Link href="/components" className="underline underline-offset-4 hover:text-foreground">
                Components
              </Link>
            </li>
            <li>
              <Link href="/blocks" className="underline underline-offset-4 hover:text-foreground">
                Blocks
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8 space-y-1 text-xs text-muted-foreground/60">
          <p>
            <a href="/llms.txt" className="underline underline-offset-2">
              llms.txt
            </a>{" "}
            ·{" "}
            <a href="/sitemap.xml" className="underline underline-offset-2">
              sitemap.xml
            </a>{" "}
            ·{" "}
            <a href="/.well-known/ard.json" className="underline underline-offset-2">
              ARD catalog
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
