import { PDFDocument, PDFPage, PDFText } from "@/components/pdf";
import { View } from "@react-pdf/renderer";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFDivider } from "@/components/pdf/divider";
import { renderToBuffer } from "@react-pdf/renderer";
import fs from "node:fs";

const doc = (
  <PDFDocument title="Badge Test" author="Test">
    <PDFPage>
      <View style={{ flexDirection: "column", gap: 16 }}>
        <PDFText variant="h2">Badge Variants</PDFText>
        <PDFDivider />
        
        <View style={{ flexDirection: "column", gap: 8 }}>
          <PDFText variant="small">Default Badge</PDFText>
          <PDFBadge variant="default">Default</PDFBadge>
        </View>

        <View style={{ flexDirection: "column", gap: 8 }}>
          <PDFText variant="small">Success Badge</PDFText>
          <PDFBadge variant="success">Paid</PDFBadge>
        </View>

        <View style={{ flexDirection: "column", gap: 8 }}>
          <PDFText variant="small">Destructive Badge</PDFText>
          <PDFBadge variant="destructive">Overdue</PDFBadge>
        </View>

        <View style={{ flexDirection: "column", gap: 8 }}>
          <PDFText variant="small">Outline Badge</PDFText>
          <PDFBadge variant="outline">Pending</PDFBadge>
        </View>
      </View>
    </PDFPage>
  </PDFDocument>
);

const buffer = await renderToBuffer(doc);
fs.writeFileSync("badge-test.pdf", buffer);
console.log("Generated badge-test.pdf");
