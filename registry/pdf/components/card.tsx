import * as React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";
import { tw } from "@/components/pdf/tw";
import { colors, spacing, radius } from "@/components/pdf/theme";

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const int = parseInt(full, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const CARD_SPACING = { default: 4, sm: 3 } as const;

export type CardProps = {
  children: React.ReactNode;
  size?: "default" | "sm";
  className?: string;
  style?: Style;
};

export function PDFCard({ children, size = "default", className, style }: CardProps) {
  const sp = spacing[CARD_SPACING[size]];
  const styles = StyleSheet.create({
    root: {
      flexDirection: "column",
      gap: 0,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: hexToRgba(colors.foreground, 0.1),
      borderStyle: "solid",
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

export function PDFCardHeader({ children, className, style }: CardHeaderProps) {
  const sp = spacing[CARD_SPACING.default];
  const styles = StyleSheet.create({
    root: {
      flexDirection: "column",
      gap: spacing[1],
      paddingHorizontal: sp,
      paddingVertical: sp,
    },
    row: {
      flexDirection: "row",
      gap: sp,
    },
    column: {
      flexDirection: "column",
      gap: spacing[1],
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
  const styles = StyleSheet.create({
    root: {
      fontSize: 12,
      fontWeight: 500,
      color: colors.foreground,
    },
  });
  return <Text style={[styles.root, tw(className), style]}>{children}</Text>;
}

PDFCardTitle.displayName = "PDFCardTitle";

export type CardDescriptionProps = { children: React.ReactNode; className?: string; style?: Style };

export function PDFCardDescription({ children, className, style }: CardDescriptionProps) {
  const styles = StyleSheet.create({
    root: {
      fontSize: 9,
      color: colors.mutedForeground,
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
  const sp = spacing[CARD_SPACING.default];
  const styles = StyleSheet.create({
    root: {
      paddingHorizontal: sp,
      paddingVertical: sp,
    },
  });
  return (
    <View style={[styles.root, tw(className), style]}>{children}</View>
  );
}

PDFCardContent.displayName = "PDFCardContent";

export type CardFooterProps = { children: React.ReactNode; className?: string; style?: Style };

export function PDFCardFooter({ children, className, style }: CardFooterProps) {
  const sp = spacing[CARD_SPACING.default];
  const styles = StyleSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: colors.border,
      borderTopStyle: "solid",
      backgroundColor: hexToRgba(colors.accent, 0.5),
      paddingHorizontal: sp,
      paddingVertical: 8,
    },
  });
  return (
    <View style={[styles.root, tw(className), style]}>{children}</View>
  );
}

PDFCardFooter.displayName = "PDFCardFooter";
