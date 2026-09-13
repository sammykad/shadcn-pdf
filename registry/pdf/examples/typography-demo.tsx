import { PDFContainer, PDFText } from "@/components/pdf";

export default function PDFTypographyDemo() {
  return (
    <PDFContainer className="flex-col gap-4 p-6">
      <PDFText variant="h1">Invoice #2026-001</PDFText>
      <PDFText variant="h2">Section Title</PDFText>
      <PDFText variant="h3">Subsection</PDFText>
      <PDFText variant="h4">Label</PDFText>
      <PDFText>Body text for paragraphs and descriptions.</PDFText>
      <PDFText variant="small" color="#71717a">Small muted supporting text</PDFText>
      <PDFText variant="muted">Fully muted text</PDFText>
    </PDFContainer>
  );
}
