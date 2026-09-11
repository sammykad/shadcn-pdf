import type { Style } from "@react-pdf/types";
import { theme } from "@/components/pdf/lib/theme";
import { paletteColors } from "@/components/pdf/lib/palette";

/**
 * Tailwind-style className -> react-pdf Style resolver.
 * Supports a pragmatic subset: colors, spacing, typography, layout, borders,
 * radii, opacity, and flex utilities, all wired to the project theme tokens.
 *
 * Usage:
 *   <View style={tw("flex flex-col gap-2 rounded-lg border bg-muted/10 p-3")} />
 */

const { colors: C, spacing: S, radius: R, typography: T } = theme;

type StyleValue = string | number | undefined;

const COLOR_MAP: Record<string, string> = {
  ...C,
  ...paletteColors,
  white: "#ffffff",
  black: C.foreground,
  transparent: "transparent",
};

const SPACING_SCALE: Record<string, number> = {
  "0": 0, "0.5": 2, "1": 4, "1.5": 6, "2": 8, "3": 12, "4": 16,
  "5": 20, "6": 24, "8": 32, "10": 40, "12": 48, "14": 56, "16": 64,
  ...Object.fromEntries(Object.entries(S).map(([k, v]) => [k, v])),
};

const FONT_SIZE_MAP: Record<string, number> = {
  xs: 7, sm: 8, base: 10, lg: 12, xl: 14, "2xl": 16, "3xl": 20,
  "4xl": 24, "5xl": 28, "6xl": 32, "7xl": 40, "8xl": 48, "9xl": 56,
};

const RADIUS_MAP: Record<string, number> = {
  none: R.none, sm: R.sm, md: R.md, lg: R.lg, xl: 12, "2xl": 16, full: R.full,
};

const LEADING_MAP: Record<string, number> = {
  none: 1, tight: 1.25, snug: 1.375, normal: 1.5, relaxed: 1.625, loose: 2,
};

const TRACKING_MAP: Record<string, number> = {
  tighter: -0.6, tight: -0.3, normal: 0, wide: 0.3, wider: 0.6, widest: 1.2,
};

const WEIGHTS: Record<string, number> = {
  thin: 100, extralight: 200, light: 300, normal: 400, medium: 500,
  semibold: 600, bold: 700, extrabold: 800, black: 900,
};

const OPACITY_STEPS = [
  "0", "5", "10", "20", "25", "30", "40", "50", "60", "70", "75",
  "80", "90", "95", "100",
];

function getSpacing(n: string): number | undefined {
  if (n in SPACING_SCALE) return SPACING_SCALE[n];
  const parsed = parseFloat(n);
  if (!Number.isNaN(parsed)) return parsed * 4;
  return undefined;
}

/** Splits `name/10` into [name, opacity] or [name, undefined]. */
function splitSlash(value: string): [string, number | undefined] {
  const idx = value.lastIndexOf("/");
  if (idx > 0 && OPACITY_STEPS.includes(value.slice(idx + 1))) {
    return [value.slice(0, idx), Number(value.slice(idx + 1)) / 100];
  }
  return [value, undefined];
}

function resolveColor(raw: string): string | undefined {
  const [base] = splitSlash(raw);
  if (base in COLOR_MAP) return COLOR_MAP[base];
  if (base.startsWith("#") || base.startsWith("rgb") || base.startsWith("hsl")) return base;
  return undefined;
}

function withOpacity(color: string | undefined, opacity?: number): string | undefined {
  if (!color) return undefined;
  if (opacity === undefined) return color;
  if (color.startsWith("#") && color.length >= 7) {
    const a = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0");
    return `${color}${a}`;
  }
  return color;
}

function paddingValue(dir: string | undefined, val: string, negate: boolean): Style {
  const s = getSpacing(val);
  if (s === undefined) return {};
  const d = negate ? -s : s;
  switch (dir) {
    case "x": return { paddingLeft: d, paddingRight: d };
    case "y": return { paddingTop: d, paddingBottom: d };
    case "t": return { paddingTop: d };
    case "r": return { paddingRight: d };
    case "b": return { paddingBottom: d };
    case "l": return { paddingLeft: d };
    default: return { padding: d };
  }
}

function marginValue(dir: string | undefined, val: string, negate: boolean): Style {
  const s = getSpacing(val);
  if (s === undefined) return {};
  const d = negate ? -s : s;
  switch (dir) {
    case "x": return { marginLeft: d, marginRight: d };
    case "y": return { marginTop: d, marginBottom: d };
    case "t": return { marginTop: d };
    case "r": return { marginRight: d };
    case "b": return { marginBottom: d };
    case "l": return { marginLeft: d };
    default: return { margin: d };
  }
}

function borderDir(dir: string, width: number | string, color: string): Style {
  const SIDES: Record<string, string> = {
    t: "Top",
    r: "Right",
    b: "Bottom",
    l: "Left",
    x: "Left",
    y: "Top",
  };
  const dirs =
    dir === "x" ? ["Left", "Right"] : dir === "y" ? ["Top", "Bottom"] : [SIDES[dir]];
  const props: Record<string, StyleValue> = {};
  for (const side of dirs) {
    props[`border${side}Width`] = width;
    props[`border${side}Color`] = color;
  }
  return props as Style;
}

function borderRadiusValue(side: string, val: string): Style {
  const r = RADIUS_MAP[val];
  if (r === undefined) return {};
  const corners: Record<string, string[]> = {
    t: ["TopLeft", "TopRight"],
    r: ["TopRight", "BottomRight"],
    b: ["BottomRight", "BottomLeft"],
    l: ["BottomLeft", "TopLeft"],
    tl: ["TopLeft"], tr: ["TopRight"], br: ["BottomRight"], bl: ["BottomLeft"],
  };
  const pair = corners[side];
  if (!pair) return { borderRadius: r };
  const result: Style = {};
  for (const corner of pair) (result as any)[`border${corner}Radius`] = r;
  return result;
}

const EXACT: Record<string, Style> = {
  flex: { display: "flex" },
  hidden: { display: "none" },
  "flex-row": { flexDirection: "row" },
  "flex-col": { flexDirection: "column" },
  "flex-row-reverse": { flexDirection: "row-reverse" },
  "flex-col-reverse": { flexDirection: "column-reverse" },
  "flex-wrap": { flexWrap: "nowrap" },
  "flex-nowrap": { flexWrap: "nowrap" },
  "flex-1": { flex: "1 1 0%" },
  "flex-auto": { flex: "1 1 auto" },
  "flex-none": { flex: "none" },
  grow: { flexGrow: 1 },
  "grow-0": { flexGrow: 0 },
  shrink: { flexShrink: 1 },
  "shrink-0": { flexShrink: 0 },
  "items-start": { alignItems: "flex-start" },
  "items-end": { alignItems: "flex-end" },
  "items-center": { alignItems: "center" },
  "items-baseline": { alignItems: "baseline" },
  "items-stretch": { alignItems: "stretch" },
  "justify-start": { justifyContent: "flex-start" },
  "justify-end": { justifyContent: "flex-end" },
  "justify-center": { justifyContent: "center" },
  "justify-between": { justifyContent: "space-between" },
  "justify-around": { justifyContent: "space-around" },
  "justify-evenly": { justifyContent: "space-evenly" },
  "self-start": { alignSelf: "flex-start" },
  "self-end": { alignSelf: "flex-end" },
  "self-center": { alignSelf: "center" },
  "self-stretch": { alignSelf: "stretch" },
  "text-left": { textAlign: "left" },
  "text-center": { textAlign: "center" },
  "text-right": { textAlign: "right" },
  "text-justify": { textAlign: "justify" },
  italic: { fontStyle: "italic" },
  "not-italic": { fontStyle: "normal" },
  underline: { textDecoration: "underline" },
  "line-through": { textDecoration: "line-through" },
  uppercase: { textTransform: "uppercase" },
  lowercase: { textTransform: "lowercase" },
  capitalize: { textTransform: "capitalize" },
  absolute: { position: "absolute" },
  "overflow-hidden": { overflow: "hidden" },
  truncate: { overflow: "hidden", textOverflow: "ellipsis" },
  "border-solid": { borderStyle: "solid" },
  border: { borderWidth: 1 },
};

function parseClass(cls: string): Style {
  if (cls in EXACT) return EXACT[cls];

  // font-{weight|family}
  if (cls.startsWith("font-")) {
    const val = cls.slice(5);
    if (val in WEIGHTS) return { fontWeight: WEIGHTS[val] };
    if (val === "sans") return { fontFamily: theme.fonts.sans };
    if (val === "mono") return { fontFamily: "Courier" };
  }

  // tracking-*, leading-*
  if (cls.startsWith("tracking-")) {
    const val = cls.slice(9);
    if (val in TRACKING_MAP) return { letterSpacing: TRACKING_MAP[val] };
    const num = parseFloat(val);
    if (!Number.isNaN(num)) return { letterSpacing: num };
  }
  if (cls.startsWith("leading-")) {
    const val = cls.slice(8);
    if (val in LEADING_MAP) return { lineHeight: LEADING_MAP[val] };
    const num = parseFloat(val);
    if (!Number.isNaN(num)) return { lineHeight: num };
  }

  // w-*, h-* (full | auto | number)
  if (cls.startsWith("w-") || cls.startsWith("h-")) {
    const prop = cls[0] === "w" ? "width" : "height";
    const val = cls.slice(2);
    if (val === "full") return { [prop]: "100%" } as Style;
    if (val === "auto") return { [prop]: "auto" } as Style;
    if (val.startsWith("[")) {
      const raw = val.slice(1, val.endsWith("]") ? -1 : undefined);
      if (raw.endsWith("%")) return { [prop]: raw } as Style;
      const num = Number(raw);
      if (!Number.isNaN(num)) return { [prop]: num } as Style;
      return { [prop]: raw } as Style;
    }
    if (val.includes("/")) {
      const [n, d] = val.split("/");
      return { [prop]: `${(Number(n) / Number(d)) * 100}%` } as Style;
    }
    const s = getSpacing(val);
    if (s !== undefined) return { [prop]: s } as Style;
  }
  if (cls.startsWith("bg-")) {
    const val = cls.slice(3);
    const [base, opacity] = splitSlash(val);
    const c = withOpacity(resolveColor(base), opacity);
    if (c) return { backgroundColor: c };
  }

  // text-{color|size} (excluding text-align handled in EXACT)
  if (cls.startsWith("text-") && !["left", "center", "right", "justify"].some((d) => cls === `text-${d}`)) {
    const val = cls.slice(5);
    const [base, opacity] = splitSlash(val);
    const c = withOpacity(resolveColor(base), opacity);
    if (c) return { color: c };
    if (base in FONT_SIZE_MAP) return { fontSize: FONT_SIZE_MAP[base] };
    if (base.startsWith("[")) {
      const raw = base.slice(1, base.endsWith("]") ? -1 : undefined);
      const num = Number(raw);
      if (!Number.isNaN(num)) return { fontSize: num } as Style;
      return { fontSize: raw } as Style;
    }
  }

  // padding
  const pad = cls.match(/^(-?)p([xytrbl])?-([.\d]+)$/);
  if (pad) return paddingValue(pad[2], pad[3], !!pad[1]);

  // margin
  const mar = cls.match(/^(-?)m([xytrbl])?-([.\d]+|auto)$/);
  if (mar) {
    const [, neg, dir, val] = mar;
    if (val === "auto") return { margin: "auto" };
    return marginValue(dir, val, !!neg);
  }

  // gap
  const gap = cls.match(/^gap(-([xy]))?-([.\d]+)$/);
  if (gap) {
    const s = getSpacing(gap[3]);
    if (s === undefined) return {};
    if (gap[2] === "x") return { columnGap: s };
    if (gap[2] === "y") return { rowGap: s };
    return { gap: s };
  }

  // rounded
  const round = cls.match(/^rounded(-([trbl]{1,2}))?-(.+)$/);
  if (round) return borderRadiusValue(round[2] ?? "", round[3]);

  // border-{dir} bare directional border (defaults to 1px)
  const borderBare = cls.match(/^border-([trblxy])$/);
  if (borderBare) return borderDir(borderBare[1], 1, C.border);

  // border-{dir}?-[<value>] arbitrary width
  const borderArbitrary = cls.match(/^border(-([trblxy]))?-\[(.+)\]$/);
  if (borderArbitrary) {
    const dir = borderArbitrary[2] ?? "";
    const raw = borderArbitrary[3];
    const num = Number(raw);
    const w = Number.isNaN(num) ? raw : num;
    return dir ? borderDir(dir, w, C.border) : { borderWidth: w };
  }

  // border-{dir}?-<number> width
  const borderNum = cls.match(/^border(-([trblxy]))?-([.\d]+)$/);
  if (borderNum) {
    const dir = borderNum[2] ?? "";
    const w = Number(borderNum[3]);
    return dir ? borderDir(dir, w, C.border) : { borderWidth: w };
  }

  // border-* (color)
  const border = cls.match(/^border(-([trblxy]))?-(.+)$/);
  if (border) {
    const dir = border[2] ?? "";
    const val = border[3];
    const [base, opacity] = splitSlash(val);
    const c = withOpacity(resolveColor(base), opacity);
    if (c) return dir ? borderDir(dir, 1, c) : { borderColor: c };
  }

  // opacity-*
  if (cls.startsWith("opacity-")) {
    const val = cls.slice(8);
    if (OPACITY_STEPS.includes(val)) return { opacity: Number(val) / 100 };
  }

  return {};
}

/** Resolve Tailwind-style class names to a react-pdf Style. */
export function tw(...classes: (string | undefined | null | false)[]): Style {
  const tokens = classes
    .filter(Boolean)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (tokens.length === 0) return {};
  return tokens.reduce<Style>((acc, cls) => ({ ...acc, ...parseClass(cls) }), {});
}