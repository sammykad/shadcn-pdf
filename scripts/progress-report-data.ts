import { ProgressData } from "../registry/pdf/blocks/progress-report";

export const progressReportData: ProgressData = {
  student: {
    name: "Amara Johnson",
    id: "STU-2026-0432",
    grade: "Grade 8",
    term: "Term 2 · 2025–2026",
  },
  school: { name: "Riverside Academy", motto: "Excellence through knowledge" },
  subjects: [
    { name: "Mathematics", ca: 32, exam: 54, total: 86, grade: "A", remark: "Outstanding" },
    { name: "English", ca: 28, exam: 48, total: 76, grade: "B+", remark: "Very good" },
    { name: "Science", ca: 30, exam: 50, total: 80, grade: "A-", remark: "Excellent" },
    { name: "Social Studies", ca: 24, exam: 42, total: 66, grade: "C+", remark: "Good effort" },
    { name: "French", ca: 20, exam: 38, total: 58, grade: "C", remark: "Needs improvement" },
    { name: "Computer Studies", ca: 34, exam: 56, total: 90, grade: "A+", remark: "Exceptional" },
    { name: "Physical Education", ca: 30, exam: 44, total: 74, grade: "B", remark: "Very good" },
  ],
  attendance: { total: 48, present: 45 },
  teacherComment:
    "Amara is a well-motivated and disciplined student. She consistently submits assignments on time and participates actively in class discussions. She should keep up the great work.",
  principalComment:
    "An excellent term overall. Keep pushing for greatness and continue to be a role model to your peers.",
  signature: { teacher: "Mrs. L. Adewale", principal: "Mr. K. Mensah" },
};
