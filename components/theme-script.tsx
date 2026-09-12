import Script from "next/script";

export function ThemeScript() {
  return (
    <Script
      id="theme-script"
      src="/theme-script.js"
      strategy="beforeInteractive"
    />
  );
}
