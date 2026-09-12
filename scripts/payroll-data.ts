import { SalarySlipData } from "../registry/pdf/blocks/payroll/salary-slip";

export const salarySlipData: SalarySlipData = {
  company: {
    name: "Acme Corporation",
    address: "123 Business Ave, San Francisco, CA 94102",
    email: "hr@acmecorp.com",
  },
  employee: {
    name: "John Smith",
    id: "EMP-2024-001",
    department: "Engineering",
    designation: "Senior Software Engineer",
    joinDate: "2022-03-15",
  },
  payPeriod: {
    month: "September",
    year: 2026,
  },
  earnings: [
    { label: "Basic Salary", amount: 8500 },
    { label: "Housing Allowance", amount: 1500 },
    { label: "Transport Allowance", amount: 500 },
    { label: "Medical Allowance", amount: 300 },
    { label: "Performance Bonus", amount: 1000 },
  ],
  deductions: [
    { label: "Federal Tax", amount: 2100 },
    { label: "State Tax", amount: 650 },
    { label: "Social Security", amount: 527 },
    { label: "Medicare", amount: 123 },
    { label: "Health Insurance", amount: 200 },
    { label: "401(k) Contribution", amount: 425 },
  ],
  paymentDate: "2026-09-30",
  paymentMethod: "Bank Transfer",
  bankAccount: "**** **** **** 1234",
  currency: "USD",
};
