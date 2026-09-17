import { PDFText, PDFContainer } from "@/components/pdf";
import { PDFCard, PDFCardHeader, PDFCardTitle, PDFCardDescription, PDFCardContent } from "@/components/pdf/card";
import { PDFBadge } from "@/components/pdf/badge";

export default function PDFTwDemo() {
  return (
    <PDFContainer className="flex flex-col gap-3 p-4">
      <PDFCard className="rounded-lg border border-zinc-200">
        <PDFCardHeader>
          <PDFCardTitle className="text-lg font-semibold">tw() style reference</PDFCardTitle>
          <PDFCardDescription className="text-sm text-muted-foreground">
            Every utility resolved by the Tailwind-style helper, rendered live.
          </PDFCardDescription>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFContainer className="flex-row gap-2 flex-wrap">
            {["Layout", "Spacing", "Sizing", "Type", "Color", "Border", "Radius", "Opacity"].map((s) => (
              <PDFBadge key={s} variant="outline" className="px-3 py-1 text-xs font-medium">{s}</PDFBadge>
            ))}
          </PDFContainer>
        </PDFCardContent>
      </PDFCard>

      <PDFCard className="rounded-lg border border-zinc-200">
        <PDFCardHeader>
          <PDFCardTitle className="text-lg font-semibold">Layout & Flex</PDFCardTitle>
          <PDFCardDescription className="text-sm text-muted-foreground">flex, flexDirection, justifyContent, alignItems, gap</PDFCardDescription>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFContainer className="flex flex-col gap-2">
            <PDFContainer className="flex-row gap-2">
              {["flex-1", "flex-1", "flex-1"].map((c, i) => (
                <PDFContainer key={i} className={`bg-zinc-100 p-3 rounded-lg ${c}`}>
                  <PDFText className="text-xs text-center text-muted">{c}</PDFText>
                </PDFContainer>
              ))}
            </PDFContainer>
            <PDFContainer className="flex-row justify-between items-center bg-zinc-100 p-3 rounded-lg">
              <PDFText className="text-xs text-muted">justify-between</PDFText>
              <PDFText className="text-xs text-muted">justify-between</PDFText>
            </PDFContainer>
            <PDFContainer className="flex-row items-center bg-zinc-100 p-3 rounded-lg">
              <PDFContainer className="w-2 h-2 bg-zinc-400 rounded-full" />
              <PDFText className="text-xs text-muted mx-2">items-center</PDFText>
            </PDFContainer>
          </PDFContainer>
        </PDFCardContent>
      </PDFCard>

      <PDFCard className="rounded-lg border border-zinc-200">
        <PDFCardHeader>
          <PDFCardTitle className="text-lg font-semibold">Colors</PDFCardTitle>
          <PDFCardDescription className="text-sm text-muted-foreground">theme tokens, full Tailwind palette, opacity</PDFCardDescription>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFContainer className="flex flex-col gap-2">
            <PDFContainer className="flex-row gap-2">
              <PDFContainer className="flex-1 p-3 rounded-lg bg-zinc-900">
                <PDFText className="text-xs text-zinc-100 text-center">bg-zinc-900</PDFText>
              </PDFContainer>
              <PDFContainer className="flex-1 p-3 rounded-lg bg-zinc-700">
                <PDFText className="text-xs text-zinc-100 text-center">bg-zinc-700</PDFText>
              </PDFContainer>
              <PDFContainer className="flex-1 p-3 rounded-lg bg-zinc-500">
                <PDFText className="text-xs text-zinc-100 text-center">bg-zinc-500</PDFText>
              </PDFContainer>
            </PDFContainer>
            <PDFContainer className="flex-row gap-2">
              <PDFContainer className="flex-1 p-3 rounded-lg bg-zinc-300">
                <PDFText className="text-xs text-zinc-900 text-center">bg-zinc-300</PDFText>
              </PDFContainer>
              <PDFContainer className="flex-1 p-3 rounded-lg bg-zinc-100">
                <PDFText className="text-xs text-zinc-900 text-center">bg-zinc-100</PDFText>
              </PDFContainer>
              <PDFContainer className="flex-1 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
                <PDFText className="text-xs text-zinc-500 text-center">bg-zinc-50</PDFText>
              </PDFContainer>
            </PDFContainer>
            <PDFContainer className="flex-row gap-2">
              <PDFContainer className="flex-1 p-3 rounded-lg bg-zinc-900/25">
                <PDFText className="text-xs text-zinc-900 text-center">bg-zinc-900/25</PDFText>
              </PDFContainer>
              <PDFContainer className="flex-1 p-3 rounded-lg bg-zinc-500/50">
                <PDFText className="text-xs text-zinc-900 text-center">bg-zinc-500/50</PDFText>
              </PDFContainer>
            </PDFContainer>
          </PDFContainer>
        </PDFCardContent>
      </PDFCard>
    </PDFContainer>
  );
}
