import { ContractAgreementData } from "../registry/pdf/blocks/contract-agreement";

export const contractAgreementData: ContractAgreementData = {
  title: "SERVICE AGREEMENT",
  referenceNumber: "CTR-2026-0042",
  effectiveDate: "September 1, 2026",
  parties: {
    first: {
      name: "Acme Technologies Pvt. Ltd.",
      title: "Service Provider",
      address: "123 Business Ave, San Francisco, CA 94102",
      email: "contracts@acme.tech",
    },
    second: {
      name: "Globex Corporation",
      title: "Client",
      address: "200 W 5th Ave, New York, NY 10001",
      email: "legal@globex.com",
    },
  },
  clauses: [
    {
      title: "Scope of Services",
      content:
        "The Service Provider agrees to deliver software development services including UI/UX design, frontend development, and quality assurance as outlined in Exhibit A attached hereto.",
    },
    {
      title: "Term and Termination",
      content:
        "This Agreement shall commence on the Effective Date and continue for a period of twelve (12) months. Either party may terminate this Agreement with thirty (30) days written notice.",
    },
    {
      title: "Compensation",
      content:
        "The Client agrees to pay the Service Provider a total fee of $150,000 USD, payable in monthly installments of $12,500 USD. Payment is due within fifteen (15) days of invoice receipt.",
    },
    {
      title: "Confidentiality",
      content:
        "Both parties agree to maintain strict confidentiality of all proprietary information exchanged during the term of this Agreement and for a period of two (2) years following termination.",
    },
    {
      title: "Intellectual Property",
      content:
        "All work product created under this Agreement shall be the sole property of the Client upon full payment. The Service Provider retains no rights to the deliverables.",
    },
  ],
  governingLaw:
    "This Agreement shall be governed by and construed in accordance with the laws of the State of California, United States.",
  signatures: {
    first: {
      name: "Sarah Mitchell",
      title: "Chief Executive Officer",
      date: "August 28, 2026",
    },
    second: {
      name: "James Carter",
      title: "VP of Engineering",
      date: "August 29, 2026",
    },
  },
  status: "Active",
};
