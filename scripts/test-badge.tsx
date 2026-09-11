import { PDFDocument, PDFPage } from "@/components/pdf/document";
import { View } from "@react-pdf/renderer";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFHeading, PDFTextBlock } from "@/components/pdf/typography";
import { PDFDivider } from "@/components/pdf/divider";
import { renderToBuffer } from "@react-pdf/renderer";
import fs from "node:fs";

const doc = (
  <PDFDocument title="Badge Test" author="Test">
    <PDFPage>
      <View style={{ flexDirection: "column", gap: 16 }}>
        <PDFHeading level={2}>Badge Variants</PDFHeading>
        <PDFDivider />
        
        <View style={{ flexDirection: "column", gap: 8 }}>
          <PDFTextBlock variant="small">Default Badge</PDFTextBlock>
          <PDFBadge variant="default">Default</PDFBadge>
        </View>

        <View style={{ flexDirection: "column", gap: 8 }}>
          <PDFTextBlock variant="small">Success Badge</PDFTextBlock>
          <PDFBadge variant="success">Paid</PDFBadge>
        </View>

        <View style={{ flexDirection: "column", gap: 8 }}>
          <PDFTextBlock variant="small">Destructive Badge</PDFTextBlock>
          <PDFBadge variant="destructive">Overdue</PDFBadge>
        </View>

        <View style={{ flexDirection: "column", gap: 8 }}>
          <PDFTextBlock variant="small">Outline Badge</PDFTextBlock>
          <PDFBadge variant="outline">Pending</PDFBadge>
        </View>
      </View>
    </PDFPage>
  </PDFDocument>
);

const buffer = await renderToBuffer(doc);
fs.writeFileSync("badge-test.pdf", buffer);
console.log("Generated badge-test.pdf");
