import * as React from "react";
import { View, Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { usePDFTheme } from "@/registry/pdf/lib/provider";
import { tw } from "@/registry/pdf/lib/tw";

type TW = string | undefined | null | false;

function useStyles() {
  const t = usePDFTheme();
  return {
    border: t.colors.border,
    muted: t.colors.muted,
    mutedForeground: t.colors.mutedForeground,
    foreground: t.colors.foreground,
    body: t.typography.body.fontSize,
    small: t.typography.small.fontSize,
  };
}

/**
 * A data-slot style table that mirrors shadcn/ui's `<Table />` API.
 * Each part accepts a `className` (Tailwind-style, via `tw()`) plus `style`.
 */
export type TableProps = {
  children: React.ReactNode;
  className?: TW;
  style?: Style;
};

export function PDFTable({ children, className, style }: TableProps) {
  return (
    <View style={[{ width: "100%", flexDirection: "column" }, tw(className), style]}>
      {children}
    </View>
  );
}

PDFTable.displayName = "PDFTable";

export type TableHeaderProps = {
  children: React.ReactNode;
  className?: TW;
  style?: Style;
};

export function PDFTableHeader({ children, className, style }: TableHeaderProps) {
  const s = useStyles();
  return (
    <View
      style={[
        {
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: s.border,
          borderBottomStyle: "solid",
        },
        tw(className),
        style,
      ]}
    >
      {children}
    </View>
  );
}

PDFTableHeader.displayName = "PDFTableHeader";

export type TableBodyProps = {
  children: React.ReactNode;
  className?: TW;
  style?: Style;
};

export function PDFTableBody({ children, className, style }: TableBodyProps) {
  return <View style={[{ flexDirection: "column" }, tw(className), style]}>{children}</View>;
}

PDFTableBody.displayName = "PDFTableBody";

export type TableFooterProps = {
  children: React.ReactNode;
  className?: TW;
  style?: Style;
};

export function PDFTableFooter({ children, className, style }: TableFooterProps) {
  const s = useStyles();
  return (
    <View
      style={[
        {
          flexDirection: "column",
          borderTopWidth: 1,
          borderTopColor: s.border,
          borderTopStyle: "solid",
          backgroundColor: s.muted,
        },
        tw(className),
        style,
      ]}
    >
      {children}
    </View>
  );
}

PDFTableFooter.displayName = "PDFTableFooter";

export type TableRowProps = {
  children: React.ReactNode;
  className?: TW;
  style?: Style;
};

export function PDFTableRow({ children, className, style }: TableRowProps) {
  const s = useStyles();
  return (
    <View
      style={[
        {
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: s.border,
          borderBottomStyle: "solid",
        },
        tw(className),
        style,
      ]}
    >
      {children}
    </View>
  );
}

PDFTableRow.displayName = "PDFTableRow";

export type TableHeadProps = {
  children?: React.ReactNode;
  className?: TW;
  style?: Style;
};

export function PDFTableHead({ children, className, style }: TableHeadProps) {
  const s = useStyles();
  const cls = tw(className);
  const hasWidth = cls.width !== undefined || cls.flexBasis !== undefined || cls.flex !== undefined;
  return (
    <View
      style={[
        {
          flex: hasWidth ? 0 : 1,
          flexGrow: hasWidth ? 0 : 1,
          flexBasis: hasWidth ? 0 : 0,
          width: hasWidth ? cls.width : undefined,
          height: 40,
          paddingHorizontal: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        },
        cls,
        style,
      ]}
    >
      <Text style={[{ fontSize: s.body, fontWeight: 500, color: s.foreground }, tw(className), style]}>
        {children}
      </Text>
    </View>
  );
}

PDFTableHead.displayName = "PDFTableHead";

export type TableCellProps = {
  children?: React.ReactNode;
  className?: TW;
  style?: Style;
};

export function PDFTableCell({ children, className, style }: TableCellProps) {
  const s = useStyles();
  const cls = tw(className);
  const hasWidth = cls.width !== undefined || cls.flexBasis !== undefined || cls.flex !== undefined;
  return (
    <View
      style={[
        {
          flex: hasWidth ? 0 : 1,
          flexGrow: hasWidth ? 0 : 1,
          flexBasis: hasWidth ? 0 : 0,
          width: hasWidth ? cls.width : undefined,
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        },
        cls,
        style,
      ]}
    >
      <Text style={[{ fontSize: s.body, color: s.foreground }, tw(className), style]}>
        {children}
      </Text>
    </View>
  );
}

PDFTableCell.displayName = "PDFTableCell";

export type TableCaptionProps = {
  children?: React.ReactNode;
  className?: TW;
  style?: Style;
};

export function PDFTableCaption({ children, className, style }: TableCaptionProps) {
  const s = useStyles();
  return (
    <View style={[{ marginTop: 16, flexDirection: "row" }, tw(className), style]}>
      <Text style={[{ fontSize: s.small, color: s.mutedForeground }, tw(className), style]}>
        {children}
      </Text>
    </View>
  );
}

PDFTableCaption.displayName = "PDFTableCaption";