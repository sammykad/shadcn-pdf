import { PDFContainer, PDFText } from "@/components/pdf";
import { PDFCard, PDFCardHeader, PDFCardTitle, PDFCardDescription, PDFCardContent } from "@/components/pdf/card";
import { PDFBadge } from "@/components/pdf/badge";

export default function PDFTwDemo() {
  return (
    <PDFContainer className="flex flex-col gap-3">
      <PDFCard>
        <PDFCardHeader>
          <PDFCardTitle>tw() style reference</PDFCardTitle>
          <PDFCardDescription>
            Every utility resolved by the Tailwind-style helper, rendered live.
          </PDFCardDescription>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFContainer className="flex-row gap-1 flex-wrap">
            {["Layout", "Spacing", "Sizing", "Type", "Color", "Border", "Radius", "Opacity"].map((s) => (
              <PDFBadge key={s} variant="outline">{s}</PDFBadge>
            ))}
          </PDFContainer>
        </PDFCardContent>
      </PDFCard>

      <PDFCard>
        <PDFCardHeader>
          <PDFCardTitle>Layout & Flex</PDFCardTitle>
          <PDFCardDescription>flex, flexDirection, justifyContent, alignItems, gap</PDFCardDescription>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFContainer className="flex flex-col gap-2">
            <PDFContainer className="flex-row gap-2">
              {["flex-1", "flex-1", "flex-1"].map((c, i) => (
                <PDFContainer key={i} className={`bg-accent p-2 rounded-md ${c}`}>
                  <PDFText className="text-xs text-center">{c}</PDFText>
                </PDFContainer>
              ))}
            </PDFContainer>
            <PDFContainer className="flex-row justify-between bg-accent p-2 rounded-md">
              <PDFText className="text-xs">justify-between</PDFText>
              <PDFText className="text-xs">justify-between</PDFText>
            </PDFContainer>
            <PDFContainer className="flex-row items-center bg-accent p-2 rounded-md">
              <PDFContainer className="w-2 h-2 bg-primary rounded-full" />
              <PDFText className="text-xs mx-2">items-center</PDFText>
            </PDFContainer>
          </PDFContainer>
        </PDFCardContent>
      </PDFCard>

      <PDFCard>
        <PDFCardHeader>
          <PDFCardTitle>Colors</PDFCardTitle>
          <PDFCardDescription>theme tokens, full Tailwind palette, opacity</PDFCardDescription>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFContainer className="flex flex-col gap-2">
            <PDFContainer className="flex-row gap-2">
              <PDFContainer className="flex-1 p-2 rounded-md bg-primary">
                <PDFText className="text-xs text-primaryForeground text-center">bg-primary</PDFText>
              </PDFContainer>
              <PDFContainer className="flex-1 p-2 rounded-md bg-destructive">
                <PDFText className="text-xs text-white text-center">bg-destructive</PDFText>
              </PDFContainer>
              <PDFContainer className="flex-1 p-2 rounded-md bg-success">
                <PDFText className="text-xs text-white text-center">bg-success</PDFText>
              </PDFContainer>
            </PDFContainer>
            <PDFContainer className="flex-row gap-2">
              <PDFContainer className="flex-1 p-2 rounded-md bg-sky-500">
                <PDFText className="text-xs text-white text-center">bg-sky-500</PDFText>
              </PDFContainer>
              <PDFContainer className="flex-1 p-2 rounded-md bg-gray-950">
                <PDFText className="text-xs text-white text-center">bg-gray-950</PDFText>
              </PDFContainer>
              <PDFContainer className="flex-1 p-2 rounded-md bg-pink-300">
                <PDFText className="text-xs text-center">bg-pink-300</PDFText>
              </PDFContainer>
            </PDFContainer>
            <PDFContainer className="flex-row gap-2">
              <PDFContainer className="flex-1 p-2 rounded-md bg-primary/25">
                <PDFText className="text-xs text-center">bg-primary/25</PDFText>
              </PDFContainer>
              <PDFContainer className="flex-1 p-2 rounded-md bg-sky-500/50">
                <PDFText className="text-xs text-center">bg-sky-500/50</PDFText>
              </PDFContainer>
            </PDFContainer>
          </PDFContainer>
        </PDFCardContent>
      </PDFCard>
    </PDFContainer>
  );
}