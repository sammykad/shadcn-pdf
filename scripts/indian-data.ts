import { PDFIndianReportCardData } from "../registry/pdf/blocks/report/indian-report-card";

export const indianReportData: PDFIndianReportCardData = {
  student: {
    name: "Aditya Deshmukh",
    fatherName: "Mr. Suresh Deshmukh",
    motherName: "Mrs. Sunita Deshmukh",
    rollNo: "A-102",
    admissionNo: "ADM-2019-0451",
    dob: "15 August 2011",
    aadhar: "•••• 4521",
    class: "X",
    section: "A",
    year: "2025 – 2026",
  },
  school: {
    name: "Saraswati Vidyalaya & Junior College",
    board: "CBSE",
    affiliationNo: "1130042",
    address: "Survey No. 24, Baner Road, Pune, Maharashtra 411045, India",
    contact: "+91 20 6789 1122 · office@saraswatividyalaya.edu.in",
    motto: "Vidya Dadāti Vinayam",
  },
  examName: "ANNUAL EXAMINATION 2025 – 2026",
  session: "2025 – 2026",
  attendance: { present: 214, total: 220 },
  overallGrade: "A2",
  result: "PASS",
  activities: [
    "Represented school at the State-level Science Exhibition, Pune",
    "Member of the school Cricket team (Runner-up, District Tournament)",
    "Completed NCC 'A' Certificate",
  ],
  teacherRemarks:
    "Aditya is a sincere and hard-working student who shows consistent improvement across all subjects. He participates enthusiastically in both academics and co-curricular activities. With continued focus on Hindi and Social Science, he can achieve higher grades.",
  classTeacher: "Mrs. Vandana Kulkarni",
  principal: "Dr. Ramesh Joshi",
  controller: "Mr. Prakash Patil",
  subjects: [
    { subject: "English", maxMarks: 100, theory: 78, internal: 15, total: 93 },
    { subject: "Hindi", maxMarks: 100, theory: 72, internal: 12, total: 84 },
    { subject: "Mathematics", maxMarks: 100, theory: 81, internal: 16, total: 97 },
    { subject: "Science", maxMarks: 100, theory: 76, internal: 14, total: 90 },
    { subject: "Social Science", maxMarks: 100, theory: 68, internal: 13, total: 81 },
    { subject: "Computer Science", maxMarks: 100, theory: 82, internal: 16, total: 98 },
  ],
};