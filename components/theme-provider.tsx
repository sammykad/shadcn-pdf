"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  systemTheme: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" || value === "system"
      ? value
      : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme, system: "light" | "dark") {
  const resolved = theme === "system" ? system : theme;
  const el = document.documentElement;
  el.classList.toggle("dark", resolved === "dark");
  el.style.colorScheme = resolved;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(
    () => getStoredTheme() ?? defaultTheme,
  );
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() =>
    getSystemTheme(),
  );

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    applyTheme(next, getSystemTheme());
  }, []);

  // Sync React state with the class already painted by <ThemeScript> once
  // we're mounted, so SSR-resolved state and DOM agree after hydration.
  useEffect(() => {
    applyTheme(theme, getSystemTheme());
  }, [theme]);

  // Listen for OS theme changes while in "system" mode.
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      setSystemTheme(mql.matches ? "dark" : "light");
      applyTheme(theme, mql.matches ? "dark" : "light");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, systemTheme }),
    [theme, resolvedTheme, setTheme, systemTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}