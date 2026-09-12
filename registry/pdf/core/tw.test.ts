import { describe, it, expect } from "vitest";
import { tw } from "./tw";
import { theme } from "./theme";

const { colors: C, spacing: S, radius: R } = theme;

describe("tw() — layout & flex", () => {
  it("resolves bare display/flex classes", () => {
    expect(tw("flex")).toEqual({ display: "flex" });
    expect(tw("hidden")).toEqual({ display: "none" });
    expect(tw("flex-row")).toEqual({ flexDirection: "row" });
    expect(tw("flex-col")).toEqual({ flexDirection: "column" });
    expect(tw("flex-row-reverse")).toEqual({ flexDirection: "row-reverse" });
    expect(tw("flex-col-reverse")).toEqual({ flexDirection: "column-reverse" });
    expect(tw("flex-wrap")).toEqual({ flexWrap: "wrap" });
    expect(tw("flex-nowrap")).toEqual({ flexWrap: "nowrap" });
  });

  it("resolves flex shorthand", () => {
    expect(tw("flex-1")).toEqual({ flex: "1 1 0%" });
    expect(tw("flex-auto")).toEqual({ flex: "1 1 auto" });
    expect(tw("flex-none")).toEqual({ flex: "none" });
    expect(tw("grow")).toEqual({ flexGrow: 1 });
    expect(tw("grow-0")).toEqual({ flexGrow: 0 });
    expect(tw("shrink")).toEqual({ flexShrink: 1 });
    expect(tw("shrink-0")).toEqual({ flexShrink: 0 });
  });

  it("resolves alignment classes", () => {
    expect(tw("items-start")).toEqual({ alignItems: "flex-start" });
    expect(tw("items-end")).toEqual({ alignItems: "flex-end" });
    expect(tw("items-center")).toEqual({ alignItems: "center" });
    expect(tw("items-stretch")).toEqual({ alignItems: "stretch" });
    expect(tw("justify-start")).toEqual({ justifyContent: "flex-start" });
    expect(tw("justify-end")).toEqual({ justifyContent: "flex-end" });
    expect(tw("justify-between")).toEqual({ justifyContent: "space-between" });
    expect(tw("self-center")).toEqual({ alignSelf: "center" });
  });

  it("resolves text alignment", () => {
    expect(tw("text-left")).toEqual({ textAlign: "left" });
    expect(tw("text-center")).toEqual({ textAlign: "center" });
    expect(tw("text-right")).toEqual({ textAlign: "right" });
    expect(tw("text-justify")).toEqual({ textAlign: "justify" });
  });

  it("resolves position & overflow", () => {
    expect(tw("absolute")).toEqual({ position: "absolute" });
    expect(tw("relative")).toEqual({});
    expect(tw("overflow-hidden")).toEqual({ overflow: "hidden" });
    expect(tw("truncate")).toEqual({ overflow: "hidden", textOverflow: "ellipsis" });
  });
});

describe("tw() — colors", () => {
  it("resolves theme colors and specials", () => {
    expect(tw("bg-muted")).toEqual({ backgroundColor: C.muted });
    expect(tw("bg-primary")).toEqual({ backgroundColor: C.primary });
    expect(tw("bg-white")).toEqual({ backgroundColor: "#ffffff" });
    expect(tw("bg-black")).toEqual({ backgroundColor: C.foreground });
    expect(tw("bg-transparent")).toEqual({ backgroundColor: "transparent" });
    expect(tw("text-primary")).toEqual({ color: C.primary });
  });

  it("resolves hex / rgb / hsl literals", () => {
    expect(tw("bg-#ff8800")).toEqual({ backgroundColor: "#ff8800" });
    expect(tw("text-rgb(1,2,3)")).toEqual({ color: "rgb(1,2,3)" });
    expect(tw("bg-hsl(200,100%,50%)")).toEqual({ backgroundColor: "hsl(200,100%,50%)" });
  });

  it("applies opacity to hex colors", () => {
    expect(tw("bg-muted/50")).toEqual({ backgroundColor: `${C.muted}80` });
    expect(tw("bg-muted/10")).toEqual({ backgroundColor: `${C.muted}1a` });
    expect(tw("bg-primary/100")).toEqual({ backgroundColor: `${C.primary}ff` });
    expect(tw("bg-#123456/20")).toEqual({ backgroundColor: "#12345633" });
  });

  it("resolves full Tailwind palette steps", () => {
    expect(tw("bg-sky-500")).toEqual({ backgroundColor: "#0ea5e9" });
    expect(tw("bg-sky-50")).toEqual({ backgroundColor: "#f0f9ff" });
    expect(tw("text-gray-950")).toEqual({ color: "#030712" });
    expect(tw("text-zinc-900")).toEqual({ color: "#18181b" });
    expect(tw("border-pink-300")).toEqual({ borderColor: "#f9a8d4" });
    expect(tw("bg-red-500")).toEqual({ backgroundColor: "#ef4444" });
    expect(tw("text-emerald-600")).toEqual({ color: "#059669" });
    expect(tw("bg-sky-500/50")).toEqual({ backgroundColor: "#0ea5e980" });
  });
});

describe("tw() — typography", () => {
  it("resolves font weights", () => {
    expect(tw("font-normal")).toEqual({ fontWeight: 400 });
    expect(tw("font-medium")).toEqual({ fontWeight: 500 });
    expect(tw("font-semibold")).toEqual({ fontWeight: 600 });
    expect(tw("font-bold")).toEqual({ fontWeight: 700 });
    expect(tw("font-black")).toEqual({ fontWeight: 900 });
  });

  it("resolves font families", () => {
    expect(tw("font-sans")).toEqual({ fontFamily: theme.fonts.sans });
    expect(tw("font-mono")).toEqual({ fontFamily: "Courier" });
  });

  it("resolves font sizes from map", () => {
    expect(tw("text-xs")).toEqual({ fontSize: 7 });
    expect(tw("text-sm")).toEqual({ fontSize: 8 });
    expect(tw("text-base")).toEqual({ fontSize: 10 });
    expect(tw("text-lg")).toEqual({ fontSize: 12 });
    expect(tw("text-3xl")).toEqual({ fontSize: 20 });
  });

  it("resolves arbitrary font sizes", () => {
    expect(tw("text-[14]")).toEqual({ fontSize: 14 });
    expect(tw("text-[12px]")).toEqual({ fontSize: "12px" });
  });

  it("resolves letter-spacing", () => {
    expect(tw("tracking-tighter")).toEqual({ letterSpacing: -0.6 });
    expect(tw("tracking-widest")).toEqual({ letterSpacing: 1.2 });
    expect(tw("tracking-3")).toEqual({ letterSpacing: 3 });
  });

  it("resolves line-height", () => {
    expect(tw("leading-none")).toEqual({ lineHeight: 1 });
    expect(tw("leading-normal")).toEqual({ lineHeight: 1.5 });
    expect(tw("leading-loose")).toEqual({ lineHeight: 2 });
    expect(tw("leading-2.5")).toEqual({ lineHeight: 2.5 });
  });

  it("resolves text transforms & decoration", () => {
    expect(tw("uppercase")).toEqual({ textTransform: "uppercase" });
    expect(tw("lowercase")).toEqual({ textTransform: "lowercase" });
    expect(tw("capitalize")).toEqual({ textTransform: "capitalize" });
    expect(tw("italic")).toEqual({ fontStyle: "italic" });
    expect(tw("underline")).toEqual({ textDecoration: "underline" });
  });
});

describe("tw() — spacing (padding / margin)", () => {
  it("resolves full padding", () => {
    expect(tw("p-0")).toEqual({ padding: 0 });
    expect(tw("p-2")).toEqual({ padding: S[2] });
    expect(tw("p-4")).toEqual({ padding: S[4] });
  });

  it("resolves directional padding", () => {
    expect(tw("px-2")).toEqual({ paddingLeft: S[2], paddingRight: S[2] });
    expect(tw("py-3")).toEqual({ paddingTop: S[3], paddingBottom: S[3] });
    expect(tw("pt-1")).toEqual({ paddingTop: S[1] });
    expect(tw("pr-1.5")).toEqual({ paddingRight: 6 });
    expect(tw("pb-0.5")).toEqual({ paddingBottom: 2 });
    expect(tw("pl-5")).toEqual({ paddingLeft: S[5] });
  });

  it("resolves negative padding", () => {
    expect(tw("-p-2")).toEqual({ padding: -S[2] });
    expect(tw("-mt-3")).toEqual({ marginTop: -S[3] });
  });

  it("resolves full & directional margin", () => {
    expect(tw("m-4")).toEqual({ margin: S[4] });
    expect(tw("mx-2")).toEqual({ marginLeft: S[2], marginRight: S[2] });
    expect(tw("my-1")).toEqual({ marginTop: S[1], marginBottom: S[1] });
    expect(tw("mt-2")).toEqual({ marginTop: S[2] });
    expect(tw("mb-0")).toEqual({ marginBottom: 0 });
    expect(tw("m-auto")).toEqual({ margin: "auto" });
  });

  it("multiplies arbitrary numeric spacing by 4", () => {
    expect(tw("p-7")).toEqual({ padding: 28 });
    expect(tw("p-11")).toEqual({ padding: 44 });
  });

  it("resolves gap", () => {
    expect(tw("gap-2")).toEqual({ gap: S[2] });
    expect(tw("gap-4")).toEqual({ gap: S[4] });
    expect(tw("gap-x-3")).toEqual({ columnGap: S[3] });
    expect(tw("gap-y-1")).toEqual({ rowGap: S[1] });
    expect(tw("gap-6")).toEqual({ gap: S[6] });
  });
});

describe("tw() — width / height", () => {
  it("resolves full / auto / numeric", () => {
    expect(tw("w-full")).toEqual({ width: "100%" });
    expect(tw("h-full")).toEqual({ height: "100%" });
    expect(tw("w-auto")).toEqual({ width: "auto" });
    expect(tw("w-4")).toEqual({ width: S[4] });
    expect(tw("h-10")).toEqual({ height: S[10] });
  });

  it("resolves arbitrary widths", () => {
    expect(tw("w-[40%]")).toEqual({ width: "40%" });
    expect(tw("w-[120px]")).toEqual({ width: "120px" });
    expect(tw("h-[50%]")).toEqual({ height: "50%" });
  });

  it("resolves fractional widths", () => {
    expect(tw("w-1/2")).toEqual({ width: "50%" });
    expect(tw("w-1/3")).toEqual({ width: "33.33333333333333%" });
    expect(tw("w-2/5")).toEqual({ width: "40%" });
  });
});

describe("tw() — borders & radius", () => {
  it("resolves default border", () => {
    expect(tw("border")).toEqual({ borderWidth: 1 });
  });

  it("resolves border widths", () => {
    expect(tw("border")).toEqual({ borderWidth: 1 });
    expect(tw("border-0")).toEqual({ borderWidth: 0 });
    expect(tw("border-1")).toEqual({ borderWidth: 1 });
    expect(tw("border-2")).toEqual({ borderWidth: 2 });
    expect(tw("border-3")).toEqual({ borderWidth: 3 });
    expect(tw("border-4")).toEqual({ borderWidth: 4 });
    expect(tw("border-8")).toEqual({ borderWidth: 8 });
  });

  it("resolves arbitrary border widths", () => {
    expect(tw("border-[5]")).toEqual({ borderWidth: 5 });
    expect(tw("border-[3px]")).toEqual({ borderWidth: "3px" });
  });

  it("resolves border colors", () => {
    expect(tw("border-primary")).toEqual({ borderColor: C.primary });
    expect(tw("border-muted/50")).toEqual({ borderColor: `${C.muted}80` });
    expect(tw("border-destructive")).toEqual({ borderColor: C.destructive });
  });

  it("resolves directional borders", () => {
    expect(tw("border-b-0")).toEqual({
      borderBottomWidth: 0,
      borderBottomColor: C.border,
    });
    expect(tw("border-t-2")).toEqual({
      borderTopWidth: 2,
      borderTopColor: C.border,
    });
    expect(tw("border-x")).toEqual({
      borderLeftWidth: 1,
      borderLeftColor: C.border,
      borderRightWidth: 1,
      borderRightColor: C.border,
    });
    expect(tw("border-b")).toEqual({
      borderBottomWidth: 1,
      borderBottomColor: C.border,
    });
    expect(tw("border-t-4")).toEqual({
      borderTopWidth: 4,
      borderTopColor: C.border,
    });
    expect(tw("border-l-3")).toEqual({
      borderLeftWidth: 3,
      borderLeftColor: C.border,
    });
    expect(tw("border-r-[2px]")).toEqual({
      borderRightWidth: "2px",
      borderRightColor: C.border,
    });
    expect(tw("border-b-primary")).toEqual({
      borderBottomWidth: 1,
      borderBottomColor: C.primary,
    });
  });

  it("resolves border styles (react-pdf only supports solid)", () => {
    expect(tw("border-solid")).toEqual({ borderStyle: "solid" });
    expect(tw("border-dashed")).toEqual({});
    expect(tw("border-dotted")).toEqual({});
  });

  it("resolves radius", () => {
    expect(tw("rounded-none")).toEqual({ borderRadius: R.none });
    expect(tw("rounded-sm")).toEqual({ borderRadius: R.sm });
    expect(tw("rounded-md")).toEqual({ borderRadius: R.md });
    expect(tw("rounded-lg")).toEqual({ borderRadius: R.lg });
    expect(tw("rounded-full")).toEqual({ borderRadius: R.full });
  });

  it("resolves directional radius", () => {
    expect(tw("rounded-t-md")).toEqual({
      borderTopLeftRadius: R.md,
      borderTopRightRadius: R.md,
    });
    expect(tw("rounded-tl-sm")).toEqual({ borderTopLeftRadius: R.sm });
    expect(tw("rounded-br-lg")).toEqual({ borderBottomRightRadius: R.lg });
    expect(tw("rounded-l-2xl")).toEqual({
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
    });
  });
});

describe("tw() — opacity & misc", () => {
  it("resolves opacity", () => {
    expect(tw("opacity-0")).toEqual({ opacity: 0 });
    expect(tw("opacity-50")).toEqual({ opacity: 0.5 });
    expect(tw("opacity-100")).toEqual({ opacity: 1 });
  });
});

describe("tw() — argument handling", () => {
  it("returns empty object for no classes", () => {
    expect(tw()).toEqual({});
    expect(tw(undefined, null, false)).toEqual({});
    expect(tw("", "  ")).toEqual({});
  });

  it("filters falsy values and trims whitespace", () => {
    expect(tw("p-2", undefined, "mt-1", false)).toEqual({
      padding: S[2],
      marginTop: S[1],
    });
  });

  it("merges multiple classes (later wins)", () => {
    expect(tw("p-2 p-4")).toEqual({ padding: S[4] });
    expect(tw("bg-muted bg-primary")).toEqual({ backgroundColor: C.primary });
  });

  it("combines distinct properties into one style", () => {
    const style = tw("flex flex-col gap-2 rounded-lg border bg-muted/10 p-3");
    expect(style).toMatchObject({
      display: "flex",
      flexDirection: "column",
      gap: S[2],
      borderRadius: R.lg,
      borderWidth: 1,
      backgroundColor: `${C.muted}1a`,
      padding: S[3],
    });
  });
});

describe("tw() — unknown classes are ignored", () => {
  it("returns empty object for unknown utilities", () => {
    expect(tw("not-a-class")).toEqual({});
    expect(tw("foo-1")).toEqual({});
  });
});
