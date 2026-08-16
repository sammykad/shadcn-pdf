export const data = {
  number: "INV-2024-0042",
  issueDate: "Aug 12, 2024",
  dueDate: "Sep 12, 2024",
  status: "Paid",
  from: {
    name: "Acme Studio",
    email: "billing@acme.studio",
    address: "100 Market St, San Francisco, CA 94105",
  },
  to: {
    name: "Globex Corp",
    email: "accounts@globex.com",
    address: "200 W 5th Ave, New York, NY 10001",
  },
  taxRate: 8.5,
  currency: "USD",
  notes: "Payment is due within 30 days. Please reference the invoice number on your transfer.",
  items: [
    { id: "01", description: "Product design — discovery & research", qty: 1, rate: 3500 },
    { id: "02", description: "UI/UX design — 3 screens", qty: 3, rate: 900 },
    { id: "03", description: "Frontend development — 4 pages", qty: 4, rate: 1200 },
    { id: "04", description: "QA & bug fixing", qty: 2, rate: 500 },
  ],
};