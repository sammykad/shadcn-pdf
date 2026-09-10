import * as React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { usePDFTheme } from "@/registry/pdf/lib/provider";
import { tw } from "@/registry/pdf/lib/tw";

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const int = parseInt(full, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const CARD_SPACING = { default: 4, sm: 3 } as const;

export type CardProps = {
  children: React.ReactNode;
  /** Controls the internal spacing scale (like shadcn's `--card-spacing`). */
  size?: "default" | "sm";
  /** Tailwind-style utility classes applied to the card root. */
  className?: string;
  style?: Style;
};

export function PDFCard({ children, size = "default", className, style }: CardProps) {
  const t = usePDFTheme();
  const sp = t.spacing[CARD_SPACING[size]];
  const styles = StyleSheet.create({
    root: {
      flexDirection: "column",
      gap: sp,
      borderRadius: t.radius.lg,
      borderWidth: 1,
      borderColor: hexToRgba(t.colors.foreground, 0.1),
      borderStyle: "solid",
      paddingVertical: sp,
      width: "100%",
      overflow: "hidden",
    },
  });
  return (
    <View style={[styles.root, tw(className), style]}>{children}</View>
  );
}

PDFCard.displayName = "PDFCard";

export type CardHeaderProps = { children: React.ReactNode; className?: string; style?: Style };

/**
 * Header that stacks title + description on the left and, when a
 * <PDFCardAction> is present, pins it to the right — mirroring shadcn's
 * `grid-cols-[1fr_auto]` layout.
 */
export function PDFCardHeader({ children, className, style }: CardHeaderProps) {
  const t = usePDFTheme();
  const sp = t.spacing[CARD_SPACING.default];
  const styles = StyleSheet.create({
    root: {
      flexDirection: "column",
      gap: t.spacing[1],
      paddingHorizontal: sp,
      borderTopLeftRadius: t.radius.lg,
      borderTopRightRadius: t.radius.lg,
    },
    row: {
      flexDirection: "row",
      gap: sp,
    },
    column: {
      flexDirection: "column",
      gap: t.spacing[1],
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 0,
    },
  });

  const childrenArray = React.Children.toArray(children);
  const actionIndex = childrenArray.findIndex(
    (child) =>
      React.isValidElement(child) &&
      (child.type as any)?.displayName === "PDFCardAction",
  );

  if (actionIndex === -1) {
    return (
      <View style={[styles.root, tw(className), style]}>{children}</View>
    );
  }

  const action = childrenArray[actionIndex];
  const rest = childrenArray.filter((_, i) => i !== actionIndex);

  return (
    <View style={[styles.root, tw(className), style]}>
      <View style={styles.row}>
        <View style={styles.column}>{rest}</View>
        <View style={{ flexShrink: 0, alignSelf: "flex-start" }}>{action}</View>
      </View>
    </View>
  );
}

PDFCardHeader.displayName = "PDFCardHeader";

export type CardTitleProps = { children: React.ReactNode; className?: string; style?: Style };

export function PDFCardTitle({ children, className, style }: CardTitleProps) {
  const t = usePDFTheme();
  const styles = StyleSheet.create({
    root: {
      fontSize: t.typography.body.fontSize + 1,
      fontWeight: 500,
      color: t.colors.foreground,
    },
  });
  return <Text style={[styles.root, tw(className), style]}>{children}</Text>;
}

PDFCardTitle.displayName = "PDFCardTitle";

export type CardDescriptionProps = { children: React.ReactNode; className?: string; style?: Style };

export function PDFCardDescription({ children, className, style }: CardDescriptionProps) {
  const t = usePDFTheme();
  const styles = StyleSheet.create({
    root: {
      fontSize: t.typography.small.fontSize,
      color: t.colors.mutedForeground,
    },
  });
  return <Text style={[styles.root, tw(className), style]}>{children}</Text>;
}

PDFCardDescription.displayName = "PDFCardDescription";

export type CardActionProps = { children: React.ReactNode; className?: string; style?: Style };

export function PDFCardAction({ children, className, style }: CardActionProps) {
  return (
    <View style={[{ flexDirection: "row" }, tw(className), style]}>
      {children}
    </View>
  );
}

PDFCardAction.displayName = "PDFCardAction";

export type CardContentProps = { children: React.ReactNode; className?: string; style?: Style };

export function PDFCardContent({ children, className, style }: CardContentProps) {
  const t = usePDFTheme();
  const sp = t.spacing[CARD_SPACING.default];
  const styles = StyleSheet.create({
    root: {
      paddingHorizontal: sp,
    },
  });
  return (
    <View style={[styles.root, tw(className), style]}>{children}</View>
  );
}

PDFCardContent.displayName = "PDFCardContent";

export type CardFooterProps = { children: React.ReactNode; className?: string; style?: Style };

export function PDFCardFooter({ children, className, style }: CardFooterProps) {
  const t = usePDFTheme();
  const sp = t.spacing[CARD_SPACING.default];
  const styles = StyleSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: t.colors.border,
      borderTopStyle: "solid",
      backgroundColor: hexToRgba(t.colors.accent, 0.5),
      padding: sp,
    },
  });
  return (
    <View style={[styles.root, tw(className), style]}>{children}</View>
  );
}

PDFCardFooter.displayName = "PDFCardFooter";