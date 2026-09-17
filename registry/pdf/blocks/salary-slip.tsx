import * as React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter, PDFText, PDFContainer } from "@/components/pdf";
import { PDFSection, PDFField } from "@/components/pdf/section";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell, PDFTableFooter } from "@/components/pdf/table";
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
            <PDFText variant="small" className="text-muted">{data.company.address}</PDFText>
            <PDFText variant="small" className="text-muted">{data.company.email}</PDFText>
          </PDFContainer>
          <PDFContainer className="flex flex-col items-end gap-2">
            <PDFBadge variant="success">Paid</PDFBadge>
            <PDFText variant="h3">{formatMoney(netPay, currency)}</PDFText>
            <PDFText variant="small" className="text-muted">Net Pay</PDFText>
          </PDFContainer>
        </PDFHeader>

        {/* <PDFDivider className="my-4" /> */}

        {/* Employee Details */}
        <PDFSection as="plain">
          <PDFText variant="small" className="text-muted uppercase tracking-wide mb-3">Employee Details</PDFText>
          <PDFContainer className="flex flex-row gap-8">
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFContainer className="flex flex-row justify-between">
                <PDFText variant="small" className="text-accent-muted">Name</PDFText>
                <PDFText variant="small">{data.employee.name}</PDFText>
              </PDFContainer>
              <PDFContainer className="flex flex-row justify-between">
                <PDFText variant="small" className="text-accent-muted">Employee ID</PDFText>
                <PDFText variant="small">{data.employee.id}</PDFText>
              </PDFContainer>
              <PDFContainer className="flex flex-row justify-between">
                <PDFText variant="small" className="text-accent-muted">Department</PDFText>
                <PDFText variant="small">{data.employee.department}</PDFText>
              </PDFContainer>
            </PDFContainer>
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFContainer className="flex flex-row justify-between">
                <PDFText variant="small" className="text-accent-muted">Designation</PDFText>
                <PDFText variant="small">{data.employee.designation}</PDFText>
              </PDFContainer>
              <PDFContainer className="flex flex-row justify-between">
                <PDFText variant="small" className="text-accent-muted">Join Date</PDFText>
                <PDFText variant="small">{data.employee.joinDate}</PDFText>
              </PDFContainer>
              <PDFContainer className="flex flex-row justify-between">
                <PDFText variant="small" className="text-accent-muted">Payment Date</PDFText>
                <PDFText variant="small">{data.paymentDate}</PDFText>
              </PDFContainer>
            </PDFContainer>
          </PDFContainer>
        </PDFSection>

        <PDFDivider className="my-4" />

        {/* Pay Period */}
        <PDFSection as="plain">
          <PDFText variant="small" className="text-muted uppercase tracking-wide mb-3">Pay Period</PDFText>
          <PDFContainer className="flex flex-row gap-8">
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFContainer className="flex flex-row justify-between">
                <PDFText variant="small" className="text-muted">Month</PDFText>
                <PDFText variant="small">{data.payPeriod.month}</PDFText>
              </PDFContainer>
              <PDFContainer className="flex flex-row justify-between">
                <PDFText variant="small" className="text-muted">Year</PDFText>
                <PDFText variant="small">{String(data.payPeriod.year)}</PDFText>
              </PDFContainer>
            </PDFContainer>
            <PDFContainer className="flex flex-col gap-2 flex-1">
              <PDFContainer className="flex flex-row justify-between">
                <PDFText variant="small" className="text-accent-muted">Payment Method</PDFText>
                <PDFText variant="small">{data.paymentMethod}</PDFText>
              </PDFContainer>
              {data.bankAccount && (
                <PDFContainer className="flex flex-row justify-between">
                  <PDFText variant="small" className="text-accent-muted">Bank Account</PDFText>
                  <PDFText variant="small">{data.bankAccount}</PDFText>
                </PDFContainer>
              )}
            </PDFContainer>
          </PDFContainer>
        </PDFSection>

        <PDFDivider className="my-4" />

        {/* Earnings */}
        <PDFText variant="h4" className="mb-1">Earnings</PDFText>
        <PDFText variant="small" className="text-muted mb-3">Salary components and allowances</PDFText>
        <PDFTable className="border border-muted-foreground rounded-sm">
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
          <PDFTableFooter>
            <PDFTableCell flex={3} className="font-semibold">{"Total Earnings"}</PDFTableCell>
            <PDFTableCell flex={1} className="items-end font-semibold">{formatMoney(totalEarnings, currency)}</PDFTableCell>
          </PDFTableFooter>
        </PDFTable>


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
                <PDFText variant="small" className="text-muted uppercase tracking-wide">Net Pay</PDFText>
                <PDFText variant="h2">{formatMoney(netPay, currency)}</PDFText>
              </PDFContainer>
              <PDFContainer className="flex flex-col items-end gap-2">
                <PDFContainer className="flex flex-row gap-2">
                  <PDFText variant="small" className="text-muted">Payment Method</PDFText>
                  <PDFText variant="small">{data.paymentMethod}</PDFText>
                </PDFContainer>
                {data.bankAccount && (
                  <PDFContainer className="flex flex-row gap-2">
                    <PDFText variant="small" className="text-muted">Bank Account</PDFText>
                    <PDFText variant="small">{data.bankAccount}</PDFText>
                  </PDFContainer>
                )}
              </PDFContainer>
            </PDFContainer>
          </PDFCardContent>
          <PDFCardFooter>
            <PDFText variant="small" className="text-muted">
              This is a computer-generated salary slip and does not require a signature.
            </PDFText>
          </PDFCardFooter>
        </PDFCard>

        <PDFFooter page={1} left={data.company.name} right={`${data.payPeriod.month} ${data.payPeriod.year}`} />
      </PDFPage>
    </PDFDocument>
  );
}
