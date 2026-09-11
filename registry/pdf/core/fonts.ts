import { Font } from "@react-pdf/renderer";
import path from "node:path";
import fs from "node:fs";

export const FONT_FAMILY = "Geist Sans";
export const FALLBACK_FAMILY = "Helvetica";

type WeightSource = {
  weight: number;
  /** Absolute path or URL to a .ttf/.woff file for this weight. */
  src: string;
};

export type FontConfig = {
  /** Font family name registered with @react-pdf/renderer. */
  family?: string;
  /** Absolute path to a directory containing Geist-<Weight>.ttf files. */
  fontDir?: string;
  /** Full control: map of font-weight -> file path/URL. Overrides `fontDir`. */
  weights?: Partial<Record<number, string>>;
  /** Defaults to `src`-provided files; falls back to the built-in family. */
  fallback?: string;
};

const BUILT_IN_WEIGHTS: Record<number, string> = {
  100: "Geist-Thin.ttf",
  200: "Geist-UltraLight.ttf",
  300: "Geist-Light.ttf",
  400: "Geist-Regular.ttf",
  500: "Geist-Medium.ttf",
  600: "Geist-SemiBold.ttf",
  700: "Geist-Bold.ttf",
  800: "Geist-Black.ttf",
  900: "Geist-UltraBlack.ttf",
};

function findGeistFontDir(): string {
  // Try multiple locations
  const candidates = [
    path.resolve(process.cwd(), "assets", "fonts"),
    path.resolve(process.cwd(), "node_modules", "geist", "dist", "fonts", "geist-sans"),
    path.resolve(process.cwd(), "node_modules", "geist", "dist", "fonts"),
  ];
  
  for (const dir of candidates) {
    if (fs.existsSync(dir) && fs.existsSync(path.join(dir, "Geist-Regular.ttf"))) {
      return dir;
    }
  }
  
  return candidates[0]; // Fallback
}

function toWeight(key: string | number): number | null {
  const num = typeof key === "number" ? key : Number(key);
  return Number.isFinite(num) ? num : null;
}

/**
 * Registers a Geist Sans family (multiple static weights) with react-pdf.
 * Safe to call multiple times; only registers families that are present.
 * If no font files are available it leaves `Font` untouched so the built-in
 * fallback family is used instead of throwing at render time.
 */
export function registerPDFFonts(config: FontConfig = {}): string {
  const family = config.family ?? FONT_FAMILY;
  const fontDir = config.fontDir ?? findGeistFontDir();

  // Resolve weight -> file path (weights map wins over fontDir).
  const entries: WeightSource[] = [];

  if (config.weights) {
    for (const [key, src] of Object.entries(config.weights)) {
      const weight = toWeight(key);
      if (weight !== null && src) entries.push({ weight, src });
    }
  } else {
    for (const [weight, file] of Object.entries(BUILT_IN_WEIGHTS)) {
      const abs = path.resolve(fontDir, file);
      if (fs.existsSync(abs)) {
        entries.push({ weight: Number(weight), src: abs });
      }
    }
  }

  if (entries.length === 0) {
    // No usable font files -> keep built-in fallback.
    return config.fallback ?? FALLBACK_FAMILY;
  }

  const fonts = entries.map((e) => ({
    src: e.src,
    fontWeight: e.weight,
    // Geist has no italics; map italic requests to the upright glyphs to
    // avoid a hard failure when a style asks for `italic`.
    fontStyle: "normal" as const,
  }));

  Font.register({ family, fonts });

  // Alias the "italic" flavor of each weight to the upright file.
  Font.register({
    family,
    fonts: entries.map((e) => ({
      src: e.src,
      fontWeight: e.weight,
      fontStyle: "italic" as const,
    })),
  });

  return family;
}

/** Family name to set on a Page/Text when Geist is active. */
export function useFontFamily(family = FONT_FAMILY, fallback = FALLBACK_FAMILY): string {
  const registered = Font.getRegisteredFontFamilies?.() ?? [];
  const has = Array.isArray(registered) ? registered.includes(family) : false;
  return has ? family : fallback;
}