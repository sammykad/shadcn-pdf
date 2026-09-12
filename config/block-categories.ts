export type BlockCategory = {
  name: string
  title: string
  description: string
}

export const blockCategories: BlockCategory[] = [
  {
    name: "billing",
    title: "Billing",
    description:
      "Invoices, receipts, payment summaries, and subscription documents.",
  },
  {
    name: "finance",
    title: "Finance",
    description:
      "Bank statements, profit & loss reports, expense summaries, and tax documents.",
  },
  {
    name: "reports",
    title: "Reports",
    description:
      "Analytics dashboards, progress reports, performance summaries, and sales reports.",
  },
  {
    name: "education",
    title: "Education",
    description:
      "Report cards, transcripts, academic records, and student progress reports.",
  },
  {
    name: "healthcare",
    title: "Healthcare",
    description:
      "Patient summaries, lab reports, prescriptions, and appointment letters.",
  },
  {
    name: "documents",
    title: "Documents",
    description:
      "Proposals, contracts, cover pages, and professional letters.",
  },
]
