import { PDFStudentReportData } from "../registry/pdf/blocks/report/student-report";

export const reportData: PDFStudentReportData = {
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
    contact: "+1 (555) 010-2400 · office@lincolnhigh.edu",
  },
  period: "Term 2 · Spring Semester",
  attendance: { present: 42, absent: 3, late: 5 },
  average: 86.4,
  rank: "12 / 86",
  conduct: "Excellent",
  comments:
    "Emma is a diligent and curious student who consistently contributes thoughtful ideas in class discussions. She demonstrates strong analytical skills in the sciences and shows real initiative in group projects. Encouraging her to seek out advanced reading will help sustain her momentum.",
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
};