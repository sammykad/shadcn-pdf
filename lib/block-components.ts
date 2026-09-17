export type BlockComponentEntry = {
  component: () => Promise<Record<string, any>>
  componentName: string
  data: any
}

export const blockComponents: Record<string, BlockComponentEntry> = {
  invoice: {
    component: () => import("@/registry/pdf/blocks/invoice"),
    componentName: "PDFInvoice",
    data: {
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
      notes: "Payment is due within 30 days.",
      items: [
        { id: "01", description: "Product design — discovery & research", qty: 1, rate: 3500 },
        { id: "02", description: "UI/UX design — 3 screens", qty: 3, rate: 900 },
        { id: "03", description: "Frontend development — 4 pages", qty: 4, rate: 1200 },
        { id: "04", description: "QA & bug fixing", qty: 2, rate: 500 },
      ],
    },
  },
  "student-report": {
    component: () => import("@/registry/pdf/blocks/student-report"),
    componentName: "PDFStudentReport",
    data: {
      student: {
        name: "Emma Johnson",
        id: "STU-2026-1087",
        grade: "Grade 10",
        section: "A",
        year: "2025 – 2026",
      },
      school: {
        name: "Lincoln High School",
        address: "1200 Maple Avenue, Springfield",
        contact: "+1 (555) 010-2400",
      },
      period: "Term 2 · Spring Semester",
      attendance: { present: 42, absent: 3, late: 5 },
      average: 86.4,
      rank: "12 / 86",
      conduct: "Excellent",
      comments: "Emma is a diligent and curious student.",
      teacher: { name: "Mrs. Katherine Reid" },
      principal: "Mr. Daniel Whitfield",
      subjects: [
        { subject: "Mathematics", score: 94, grade: "A", remarks: "Excellent problem-solving" },
        { subject: "English Literature", score: 88, grade: "B+", remarks: "Strong writing" },
        { subject: "Physics", score: 91, grade: "A", remarks: "Great understanding" },
        { subject: "Chemistry", score: 84, grade: "B", remarks: "Good progress" },
        { subject: "History", score: 79, grade: "C+", remarks: "Needs revision" },
        { subject: "Computer Science", score: 96, grade: "A", remarks: "Outstanding" },
      ],
    },
  },
  "academic-report": {
    component: () => import("@/registry/pdf/blocks/academic-report"),
    componentName: "PDFAcademicReport",
    data: {
      student: {
        name: "Alex Rivera",
        id: "STU-2026-0591",
        grade: "Grade 11",
        section: "Science",
        year: "2025–2026",
        dob: "2010-03-15",
        guardian: "Maria Rivera",
        email: "alex.rivera@greenfield.edu",
        address: "45 Oak Boulevard, Portland",
      },
      school: {
        name: "Greenfield International School",
        address: "45 Oak Boulevard, Portland",
        contact: "+1 (555) 234-5678",
      },
      reportTitle: "ACADEMIC REPORT",
      period: "Annual Report",
      attendance: { present: 172, absent: 5, late: 3 },
      gpa: 3.8,
      totalCredits: 18,
      classRank: "5 / 120",
      subjects: [
        { subject: "Physics", score: 92, grade: "A", credits: 4, remarks: "Outstanding understanding" },
        { subject: "Chemistry", score: 88, grade: "A-", credits: 4, remarks: "Strong lab skills" },
        { subject: "Mathematics", score: 95, grade: "A+", credits: 4, remarks: "Excellent problem-solving" },
        { subject: "English", score: 82, grade: "B+", credits: 3, remarks: "Good writing skills" },
        { subject: "Computer Science", score: 97, grade: "A+", credits: 3, remarks: "Exceptional aptitude" },
      ],
      competencies: [
        { skill: "Critical Thinking", rating: 5 },
        { skill: "Communication", rating: 4 },
        { skill: "Collaboration", rating: 4 },
        { skill: "Time Management", rating: 3 },
        { skill: "Leadership", rating: 4 },
      ],
      achievements: ["Science Fair Winner — Regional Level", "Honor Roll — All Terms"],
      comments: "Alex is an outstanding student with a strong aptitude for STEM subjects.",
      teacher: { name: "Mr. James Bennett" },
      principal: "Dr. Sarah Mitchell",
    },
  },
  "salary-slip": {
    component: () => import("@/registry/pdf/blocks/salary-slip"),
    componentName: "PDFSalarySlip",
    data: {
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
    },
  },
  "card-demo": {
    component: () => import("@/registry/pdf/examples/card-demo"),
    componentName: "PDFCardDemo",
    data: {},
  },
  "contract-agreement": {
    component: () => import("@/registry/pdf/blocks/contract-agreement"),
    componentName: "PDFContractAgreement",
    data: {
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
    },
  },
  "audit-log-report": {
    component: () => import("@/registry/pdf/blocks/audit-log-report"),
    componentName: "PDFAuditLogReport",
    data: {
      organization: {
        name: "Acme Technologies Pvt. Ltd.",
        brand: "ACME SOFTWARE",
        reportTitle: "Audit Log Report",
        reportId: "AUD-RPT-2026-1284",
      },
      metadata: {
        org: "Acme Technologies Pvt. Ltd.",
        periodLabel: "01 Sep 2026 – 15 Sep 2026",
        generated: "15 Sep 2026, 05:42 PM",
        generatedBy: "Admin",
      },
      filters: [
        { label: "Date", value: "01 Sep 2026 – 15 Sep 2026" },
        { label: "Users", value: "All" },
        { label: "Action", value: "All" },
        { label: "Resource", value: "All" },
        { label: "Status", value: "All" },
        { label: "Severity", value: "Critical · High · Medium · Low · Info" },
      ],
      events: [
        { id: "sample-1", ts: "Sep 15, 17:32", fullTs: "15 Sep 2026, 05:32:14 PM", actor: "Sameer Kad", email: "sameer@acme.co", action: "UPDATE", resource: "Student", resourceId: "STU-10294", status: "SUCCESS", severity: "CRITICAL", ip: "103.83.xxx.xxx", userAgent: "Chrome 140 / Windows 11", changes: [{ field: "Phone", before: "98xxxxxx12", after: "98xxxxxx45" }, { field: "Class", before: "9-A", after: "10-A" }] },
        { id: "sample-2", ts: "Sep 15, 17:28", fullTs: "15 Sep 2026, 05:28:41 PM", actor: "Admin", action: "DELETE", resource: "User", resourceId: "USR-8872", status: "SUCCESS", severity: "CRITICAL", ip: "103.83.xxx.xxx" },
        { id: "sample-3", ts: "Sep 15, 17:21", fullTs: "15 Sep 2026, 05:21:09 PM", actor: "Rahul Verma", action: "LOGIN", resource: "Account", resourceId: "USR-5531", status: "FAILED", severity: "HIGH", ip: "49.44.xxx.xxx" },
        { id: "sample-4", ts: "Sep 15, 16:58", fullTs: "15 Sep 2026, 04:58:32 PM", actor: "Priya Singh", action: "CREATE", resource: "Invoice", resourceId: "INV-2201", status: "SUCCESS", severity: "MEDIUM", ip: "117.206.xxx.xxx" },
        { id: "sample-5", ts: "Sep 15, 16:44", fullTs: "15 Sep 2026, 04:44:27 PM", actor: "Ankit Mehta", action: "EXPORT", resource: "Settings", resourceId: "SET-0041", status: "SUCCESS", severity: "LOW", ip: "192.168.xxx.xxx" },
        { id: "sample-6", ts: "Sep 15, 16:12", fullTs: "15 Sep 2026, 04:12:50 PM", actor: "Sara Khan", action: "LOGIN", resource: "Account", resourceId: "USR-9917", status: "SUCCESS", severity: "INFO", ip: "45.113.xxx.xxx" },
        { id: "sample-7", ts: "Sep 15, 15:50", fullTs: "15 Sep 2026, 03:50:18 PM", actor: "Vikram Joshi", action: "UPDATE", resource: "Permission", resourceId: "PERM-2210", status: "SUCCESS", severity: "HIGH", ip: "10.20.xxx.xxx", changes: [{ field: "Role", before: "Viewer", after: "Editor" }] },
        { id: "sample-8", ts: "Sep 15, 15:31", fullTs: "15 Sep 2026, 03:31:55 PM", actor: "Neha Gupta", action: "DOWNLOAD", resource: "API Key", resourceId: "API-3308", status: "SUCCESS", severity: "LOW", ip: "203.112.xxx.xxx" },
        { id: "sample-9", ts: "Sep 15, 15:05", fullTs: "15 Sep 2026, 03:05:33 PM", actor: "Divya Nair", action: "DELETE", resource: "Permission", resourceId: "PERM-1182", status: "FAILED", severity: "CRITICAL", ip: "49.44.xxx.xxx" },
      ],
    },
  },
}
