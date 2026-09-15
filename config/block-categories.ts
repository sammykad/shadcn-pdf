export type BlockCategory = {
  name: string
  title: string
  description: string
}

export const blockCategories: BlockCategory[] = [
  {
    name: "finance",
    title: "Finance",
    description:
      "Invoices, salary slips, bank statements, expense summaries, and tax documents.",
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
