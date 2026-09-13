import * as React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter, PDFText, PDFContainer } from "@/components/pdf";
import { PDFSection, PDFField } from "@/components/pdf/section";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/components/pdf/table";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFDivider } from "@/components/pdf/divider";
import { PDFCard, PDFCardContent, PDFCardFooter } from "@/components/pdf/card";

export type SalaryEarning = {
  label: string;
  amount: number;
};

export type SalaryDeduction = {
  label: string;
  amount: number;
};

export type SalarySlipData = {
  company: {
    name: string;
    address: string;
    email: string;
  };
  employee: {
    name: string;
    id: string;
    department: string;
    designation: string;
    joinDate: string;
  };
  payPeriod: {
    month: string;
    year: number;
  };
  earnings: SalaryEarning[];
  deductions: SalaryDeduction[];
  paymentDate: string;
  paymentMethod: string;
  bankAccount?: string;
  currency?: string;
};

const formatMoney = (amount: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

export function PDFSalarySlip({ data }: { data: SalarySlipData }) {
  const currency = data.currency ?? "USD";
  const totalEarnings = data.earnings.reduce((sum, e) => sum + e.amount, 0);
  const totalDeductions = data.deductions.reduce((sum, d) => sum + d.amount, 0);
  const netPay = totalEarnings - totalDeductions;

  return (
    <PDFDocument title={`Salary Slip - ${data.employee.name}`} author={data.company.name} subject={`Salary Slip for ${data.payPeriod.month} ${data.payPeriod.year}`}>
      <PDFPage>
        {/* Header */}
        <PDFHeader>
          <PDFContainer className="flex flex-col gap-1">
            <PDFText variant="h2">{data.company.name}</PDFText>
            <PDFText variant="small" className="text-zinc-500">{data.company.address}</PDFText>
            <PDFText variant="small" className="text-zinc-500">{data.company.email}</PDFText>
          </PDFContainer>
          <PDFContainer className="flex flex-col items-end gap-2">
            <PDFBadge variant="success">Paid</PDFBadge>
            <PDFText variant="h3">{formatMoney(netPay, currency)}</PDFText>
            <PDFText variant="small" className="text-zinc-500">Net Pay</PDFText>
          </PDFContainer>
        </PDFHeader>

        {/* <PDFDivider className="my-4" /> */}

        {/* Employee Details - 2 Column Grid */}
        <PDFSection as="plain">
          <PDFText variant="small" className="text-zinc-400 uppercase tracking-wide mb-3">Employee Details</PDFText>
          <PDFContainer className="flex flex-row gap-4">
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFField label="Name" value={data.employee.name} />
              <PDFField label="Employee ID" value={data.employee.id} />
              <PDFField label="Department" value={data.employee.department} />
            </PDFContainer>
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFField label="Designation" value={data.employee.designation} />
              <PDFField label="Join Date" value={data.employee.joinDate} />
              <PDFField label="Payment Date" value={data.paymentDate} />
            </PDFContainer>
          </PDFContainer>
        </PDFSection>

        <PDFDivider className="my-4" />

        {/* Pay Period */}
        <PDFSection as="plain">
          <PDFText variant="small" className="text-zinc-400 uppercase tracking-wide mb-3">Pay Period</PDFText>
          <PDFContainer className="flex flex-row gap-4">
            <PDFField label="Month" value={data.payPeriod.month} />
            <PDFField label="Year" value={String(data.payPeriod.year)} />
            <PDFField label="Payment Method" value={data.paymentMethod} />
            {data.bankAccount && <PDFField label="Bank Account" value={data.bankAccount} />}
          </PDFContainer>
        </PDFSection>

        <PDFDivider className="my-4" />

        {/* Earnings */}
        <PDFSection title="Earnings" as="card">
          <PDFTable>
            <PDFTableHeader>
              <PDFTableHead flex={3}>Description</PDFTableHead>
              <PDFTableHead flex={1} className="items-end">Amount</PDFTableHead>
            </PDFTableHeader>
            <PDFTableBody>
              {data.earnings.map((earning, idx) => (
                <PDFTableRow key={idx}>
                  <PDFTableCell flex={3}>{earning.label}</PDFTableCell>
                  <PDFTableCell flex={1} className="items-end">{formatMoney(earning.amount, currency)}</PDFTableCell>
                </PDFTableRow>
              ))}
            </PDFTableBody>
          </PDFTable>
          <PDFContainer className="flex flex-row justify-between mt-3 px-2 py-2 bg-zinc-50 rounded">
            <PDFText variant="h4">Total Earnings</PDFText>
            <PDFText variant="h4">{formatMoney(totalEarnings, currency)}</PDFText>
          </PDFContainer>
        </PDFSection>

        {/* Deductions */}
        <PDFSection title="Deductions" as="card">
          <PDFTable>
            <PDFTableHeader>
              <PDFTableHead flex={3}>Description</PDFTableHead>
              <PDFTableHead flex={1} className="items-end">Amount</PDFTableHead>
            </PDFTableHeader>
            <PDFTableBody>
              {data.deductions.map((deduction, idx) => (
                <PDFTableRow key={idx}>
                  <PDFTableCell flex={3}>{deduction.label}</PDFTableCell>
                  <PDFTableCell flex={1} className="items-end">
                    <PDFText className="text-destructive">-{formatMoney(deduction.amount, currency)}</PDFText>
                  </PDFTableCell>
                </PDFTableRow>
              ))}
            </PDFTableBody>
          </PDFTable>
          <PDFContainer className="flex flex-row justify-between mt-3 px-2 py-2 bg-zinc-50 rounded">
            <PDFText variant="h4">Total Deductions</PDFText>
            <PDFText variant="h4" className="text-destructive">-{formatMoney(totalDeductions, currency)}</PDFText>
          </PDFContainer>
        </PDFSection>

        <PDFDivider className="my-4" />

        {/* Net Pay Summary */}
        <PDFCard>
          <PDFCardContent>
            <PDFContainer className="flex flex-row justify-between items-center">
              <PDFContainer className="flex flex-col gap-1">
                <PDFText variant="small" className="text-zinc-400 uppercase tracking-wide">Net Pay</PDFText>
                <PDFText variant="h2">{formatMoney(netPay, currency)}</PDFText>
              </PDFContainer>
              <PDFContainer className="flex flex-col items-end gap-1">
                <PDFField label="Payment Method" value={data.paymentMethod} />
                {data.bankAccount && (
                  <PDFField label="Bank Account" value={data.bankAccount} />
                )}
              </PDFContainer>
            </PDFContainer>
          </PDFCardContent>
          <PDFCardFooter>
            <PDFText variant="small" className="text-zinc-500">
              This is a computer-generated salary slip and does not require a signature.
            </PDFText>
          </PDFCardFooter>
        </PDFCard>

        <PDFFooter page={1} left={data.company.name} right={`${data.payPeriod.month} ${data.payPeriod.year}`} />
      </PDFPage>
    </PDFDocument>
  );
}
