import * as React from "react";
import type { DocumentProps } from "@react-pdf/types";

import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "@/registry/pdf/components/document";
import { Card, CardAction, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/registry/pdf/components/card";
import { Section, Field } from "@/registry/pdf/components/section";
import { Stack, Row, Grid } from "@/registry/pdf/components/layout";
import { Heading, TextBlock } from "@/registry/pdf/components/typography";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/registry/pdf/components/table";
import { Badge } from "@/registry/pdf/components/badge";
import { Divider } from "@/registry/pdf/components/divider";

/**
 * Minimal PDF documents that showcase each registry component.
 * These are rendered server-side into preview PNGs (see scripts/generate-previews.ts).
 */
export const componentPreviews: Record<string, React.ReactElement<DocumentProps>> = {
  theme: (
    <PDFDocument title="Theme Preview" author="shadcn-pdf">
      <PDFPage>
        <Heading level={1}>Theme tokens</Heading>
        <TextBlock variant="body">
          Colors, typography, spacing, radius, fonts, and page are shared across
          every PDF component through PDFProvider.
        </TextBlock>
      </PDFPage>
    </PDFDocument>
  ),
  fonts: (
    <PDFDocument title="Fonts Preview" author="shadcn-pdf">
      <PDFPage>
        <Heading level={2}>Geist Sans</Heading>
        <TextBlock variant="body">
          Font registration with a Helvetica fallback. Weights map to upright
          glyphs and never throw at render time.
        </TextBlock>
      </PDFPage>
    </PDFDocument>
  ),
  layout: (
    <PDFDocument title="Layout Preview" author="shadcn-pdf">
      <PDFPage>
        <Stack gap={3}>
          <Row justify="space-between">
            <TextBlock>Left</TextBlock>
            <TextBlock>Right</TextBlock>
          </Row>
          <Grid cols={3} gap={3}>
            <TextBlock>Cell 1</TextBlock>
            <TextBlock>Cell 2</TextBlock>
            <TextBlock>Cell 3</TextBlock>
          </Grid>
        </Stack>
      </PDFPage>
    </PDFDocument>
  ),
  document: (
    <PDFDocument title="Document Preview" author="shadcn-pdf">
      <PDFPage>
        <PDFHeader>
          <Stack gap={1}>
            <Heading level={2}>Header</Heading>
            <TextBlock variant="small" color="#737373">
              Auto-applies theme and fonts.
            </TextBlock>
          </Stack>
        </PDFHeader>
        <TextBlock>Body content on a themed page.</TextBlock>
        <PDFFooter page={1} right="shadcn-pdf" />
      </PDFPage>
    </PDFDocument>
  ),
  section: (
    <PDFDocument title="Section Preview" author="shadcn-pdf">
      <PDFPage>
        <Section title="Key Dates" description="Important term dates">
          <Row>
            <Field label="Results" value="3 April 2026" />
            <Field label="Next Term" value="10 June 2026" />
          </Row>
        </Section>
      </PDFPage>
    </PDFDocument>
  ),
  card: (
    <PDFDocument title="Card Preview" author="shadcn-pdf">
      <PDFPage>
        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description</CardDescription>
            <CardAction>
              <Badge variant="outline">Action</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <TextBlock variant="small">
              Card content — place any PDF content here: text, tables, badges,
              or nested layouts.
            </TextBlock>
          </CardContent>
          <CardFooter>
            <TextBlock variant="small" color="#737373">
              Card footer
            </TextBlock>
          </CardFooter>
        </Card>
      </PDFPage>
    </PDFDocument>
  ),
  typography: (
    <PDFDocument title="Typography Preview" author="shadcn-pdf">
      <PDFPage>
        <Stack gap={2}>
          <Heading level={1}>Heading 1</Heading>
          <Heading level={2}>Heading 2</Heading>
          <Heading level={3}>Heading 3</Heading>
          <TextBlock variant="body">Body text with the shared type scale.</TextBlock>
          <TextBlock variant="small" color="#737373">
            Small muted text.
          </TextBlock>
        </Stack>
      </PDFPage>
    </PDFDocument>
  ),
  table: (
    <PDFDocument title="Table Preview" author="shadcn-pdf">
      <PDFPage>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead align="right">Qty</TableHead>
              <TableHead align="right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Widget</TableCell>
              <TableCell align="right">2</TableCell>
              <TableCell align="right">$19.00</TableCell>
            </TableRow>
            <TableRow isLast>
              <TableCell>Gadget</TableCell>
              <TableCell align="right">1</TableCell>
              <TableCell align="right">$9.50</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </PDFPage>
    </PDFDocument>
  ),
  badge: (
    <PDFDocument title="Badge Preview" author="shadcn-pdf">
      <PDFPage>
        <Stack gap={2}>
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </Stack>
      </PDFPage>
    </PDFDocument>
  ),
  divider: (
    <PDFDocument title="Divider Preview" author="shadcn-pdf">
      <PDFPage>
        <Stack gap={3}>
          <TextBlock>Above the divider</TextBlock>
          <Divider />
          <TextBlock>Below the divider</TextBlock>
        </Stack>
      </PDFPage>
    </PDFDocument>
  ),
};