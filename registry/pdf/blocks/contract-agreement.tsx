import * as React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter, PDFText, PDFContainer } from "@/components/pdf";
import { PDFSection, PDFField } from "@/components/pdf/section";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/components/pdf/table";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFDivider } from "@/components/pdf/divider";

export type ContractParty = {
  name: string;
  title: string;
  address: string;
  email: string;
};

export type ContractClause = {
  title: string;
  content: string;
};

export type ContractSignature = {
  name: string;
  title: string;
  date: string;
};

export type ContractAgreementData = {
  title: string;
  referenceNumber: string;
  effectiveDate: string;
  parties: {
    first: ContractParty;
    second: ContractParty;
  };
  clauses: ContractClause[];
  signatures: {
    first: ContractSignature;
    second: ContractSignature;
  };
  governingLaw?: string;
  status?: string;
};

export function PDFContractAgreement({ data }: { data: ContractAgreementData }) {
  return (
    <PDFDocument title={data.title} author={data.parties.first.name} subject={`Contract Agreement ${data.referenceNumber}`}>
      <PDFPage>
        {/* Header */}
        <PDFHeader>
          <PDFContainer className="flex flex-col gap-1">
            <PDFText variant="h2">{data.title}</PDFText>
            <PDFText variant="small" className="text-muted-foreground">Reference: {data.referenceNumber}</PDFText>
          </PDFContainer>
          <PDFContainer className="flex flex-col items-end gap-2">
            {data.status && <PDFBadge variant="success">{data.status}</PDFBadge>}
            <PDFText variant="small" className="text-muted-foreground">Effective Date: {data.effectiveDate}</PDFText>
          </PDFContainer>
        </PDFHeader>

        {/* Parties */}
        <PDFSection as="plain">
          <PDFText variant="small" className="text-accent-foreground uppercase tracking-wide mb-3">Parties to this Agreement</PDFText>
          <PDFContainer className="flex flex-row gap-8">
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFText variant="small" className="text-muted-foreground uppercase tracking-wide">First Party</PDFText>
              <PDFText>{data.parties.first.name}</PDFText>
              <PDFText variant="small" className="text-muted">{data.parties.first.title}</PDFText>
              <PDFText variant="small" className="text-muted">{data.parties.first.address}</PDFText>
              <PDFText variant="small" className="text-muted">{data.parties.first.email}</PDFText>
            </PDFContainer>
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFText variant="small" className="text-muted-foreground uppercase tracking-wide">Second Party</PDFText>
              <PDFText>{data.parties.second.name}</PDFText>
              <PDFText variant="small" className="text-muted">{data.parties.second.title}</PDFText>
              <PDFText variant="small" className="text-muted">{data.parties.second.address}</PDFText>
              <PDFText variant="small" className="text-muted">{data.parties.second.email}</PDFText>
            </PDFContainer>
          </PDFContainer>
        </PDFSection>

        <PDFDivider className="my-4" />

        {/* Clauses */}
        <PDFSection title="Terms and Conditions" as="plain">
          {data.clauses.map((clause, idx) => (
            <PDFContainer key={idx} className="mb-4">
              <PDFText variant="h4" className="mb-2">{idx + 1}. {clause.title}</PDFText>
              <PDFText variant="small" className="text-muted-foreground leading-relaxed">{clause.content}</PDFText>
            </PDFContainer>
          ))}
        </PDFSection>

        {/* Governing Law */}
        {data.governingLaw && (
          <PDFSection as="plain">
            <PDFText variant="small" className="text-muted-foreground uppercase tracking-wide mb-2">Governing Law</PDFText>
            <PDFText variant="small" className="text-muted">{data.governingLaw}</PDFText>
          </PDFSection>
        )}

        <PDFDivider className="my-4" />

        {/* Signatures */}
        <PDFSection title="Signatures" as="card" className="p-2">
          <PDFContainer className="flex flex-row gap-8">
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFText variant="small" className="text-muted-foreground uppercase tracking-wide">First Party</PDFText>
              <PDFDivider className="my-3" />
              <PDFText>{data.signatures.first.name}</PDFText>
              <PDFText variant="small" className="text-muted">{data.signatures.first.title}</PDFText>
              <PDFField label="Date" value={data.signatures.first.date} noFlex />
            </PDFContainer>
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFText variant="small" className="text-muted-foreground uppercase tracking-wide">Second Party</PDFText>
              <PDFDivider className="my-3" />
              <PDFText>{data.signatures.second.name}</PDFText>
              <PDFText variant="small" className="text-muted">{data.signatures.second.title}</PDFText>
              <PDFField label="Date" value={data.signatures.second.date} noFlex />
            </PDFContainer>
          </PDFContainer>
        </PDFSection>

        <PDFFooter page={1} left={data.referenceNumber} right={data.title} className="text-muted-foreground text-xs" />

      </PDFPage>
    </PDFDocument >
  );
}
