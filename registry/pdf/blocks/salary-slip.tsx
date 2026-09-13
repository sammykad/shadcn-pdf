import * as React from "react";
import { View } from "@react-pdf/renderer";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter } from "@/components/pdf/document";
import { PDFSection, PDFField } from "@/components/pdf/section";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/components/pdf/table";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFDivider } from "@/components/pdf/divider";
import { PDFHeading, PDFText } from "@/components/pdf";
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
          <View style={{ flexDirection: "column", gap: 4 }}>
            <PDFHeading level={2}>{data.company.name}</PDFHeading>
            <PDFText variant="small" color="#737373">{data.company.address}</PDFText>
            <PDFText variant="small" color="#737373">{data.company.email}</PDFText>
          </View>
          <View style={{ flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
            <PDFBadge variant="success">Paid</PDFBadge>
            <PDFHeading level={3}>{formatMoney(netPay, currency)}</PDFHeading>
            <PDFText variant="small" color="#737373">Net Pay</PDFText>
          </View>
        </PDFHeader>

        {/* Employee Info + Pay Period */}
        <PDFSection as="plain">
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "stretch", gap: 32 }}>
            <View style={{ flexDirection: "column", gap: 8, flex: 1 }}>
              <PDFText variant="small" color="#a1a1aa">Employee Details</PDFText>
              <PDFField label="Name" value={data.employee.name} width="1/2" />
              <PDFField label="Employee ID" value={data.employee.id} width="1/2" />
            </View>
            <View style={{ flexDirection: "column", gap: 8, flex: 1 }}>
              <PDFText variant="small" color="#a1a1aa">&nbsp;</PDFText>
              <PDFField label="Department" value={data.employee.department} width="1/2" />
              <PDFField label="Designation" value={data.employee.designation} width="1/2" />
            </View>
            <View style={{ flexDirection: "column", gap: 8, flex: 1 }}>
              <PDFText variant="small" color="#a1a1aa">Pay Period</PDFText>
              <PDFField label="Month" value={data.payPeriod.month} width="1/2" />
              <PDFField label="Year" value={String(data.payPeriod.year)} width="1/2" />
            </View>
          </View>
        </PDFSection>

        {/* Earnings */}
        <PDFSection title="Earnings" as="card">
          <PDFTable>
            <PDFTableHeader>
              <PDFTableHead flex={3}>Description</PDFTableHead>
              <PDFTableHead flex={1} style={{ alignItems: "flex-end" }}>Amount</PDFTableHead>
            </PDFTableHeader>
            <PDFTableBody>
              {data.earnings.map((earning, idx) => (
                <PDFTableRow key={idx}>
                  <PDFTableCell flex={3}>{earning.label}</PDFTableCell>
                  <PDFTableCell flex={1} style={{ alignItems: "flex-end" }}>{formatMoney(earning.amount, currency)}</PDFTableCell>
                </PDFTableRow>
              ))}
            </PDFTableBody>
          </PDFTable>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8, paddingHorizontal: 8 }}>
            <PDFText>Total Earnings</PDFText>
            <PDFHeading level={4}>{formatMoney(totalEarnings, currency)}</PDFHeading>
          </View>
        </PDFSection>

        {/* Deductions */}
        <PDFSection title="Deductions" as="card">
          <PDFTable>
            <PDFTableHeader>
              <PDFTableHead flex={3}>Description</PDFTableHead>
              <PDFTableHead flex={1} style={{ alignItems: "flex-end" }}>Amount</PDFTableHead>
            </PDFTableHeader>
            <PDFTableBody>
              {data.deductions.map((deduction, idx) => (
                <PDFTableRow key={idx}>
                  <PDFTableCell flex={3}>{deduction.label}</PDFTableCell>
                  <PDFTableCell flex={1} style={{ alignItems: "flex-end" }}>
                    <PDFText>-{formatMoney(deduction.amount, currency)}</PDFText>
                  </PDFTableCell>
                </PDFTableRow>
              ))}
            </PDFTableBody>
          </PDFTable>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8, paddingHorizontal: 8 }}>
            <PDFText>Total Deductions</PDFText>
            <PDFHeading level={4} color="#dc2626">-{formatMoney(totalDeductions, currency)}</PDFHeading>
          </View>
        </PDFSection>

        {/* Net Pay Summary */}
        <PDFCard>
          <PDFCardContent>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "column", gap: 4 }}>
                <PDFText variant="small" color="#a1a1aa">Net Pay</PDFText>
                <PDFHeading level={2}>{formatMoney(netPay, currency)}</PDFHeading>
              </View>
              <View style={{ flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                <PDFField label="Payment Date" value={data.paymentDate} width="1/2" />
                <PDFField label="Payment Method" value={data.paymentMethod} width="1/2" />
                {data.bankAccount && (
                  <PDFField label="Bank Account" value={data.bankAccount} width="1/2" />
                )}
              </View>
            </View>
          </PDFCardContent>
          <PDFCardFooter>
            <PDFText variant="small" color="#737373">
              This is a computer-generated salary slip and does not require a signature.
            </PDFText>
          </PDFCardFooter>
        </PDFCard>

        <PDFFooter page={1} left={data.company.name} right={`${data.payPeriod.month} ${data.payPeriod.year}`} />
      </PDFPage>
    </PDFDocument>
  );
}
