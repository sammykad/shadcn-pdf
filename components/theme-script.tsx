// Server-rendered head script that applies the theme before hydration.
// Rendering this in <head> avoids next-themes' client-side <script>,
// which React 19 flags with a console warning.
export function ThemeScript() {
  return (
    <script
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(function(){
          try {
            var key = "theme";
            var stored = localStorage.getItem(key) || "system";
            var dark = stored === "dark";
            if (stored === "system") {
              dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            }
            var el = document.documentElement;
            el.classList.toggle("dark", dark);
            el.style.colorScheme = dark ? "dark" : "light";
          } catch (e) {}
        })();`,
      }}
    />
  );
}