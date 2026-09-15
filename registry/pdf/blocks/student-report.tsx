import * as React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter, PDFText, PDFContainer } from "@/components/pdf";
import { PDFSection, PDFField } from "@/components/pdf/section";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/components/pdf/table";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFDivider } from "@/components/pdf/divider";
import { PDFCard, PDFCardHeader, PDFCardTitle, PDFCardDescription, PDFCardContent } from "@/components/pdf/card";

export type SubjectGrade = {
  subject: string;
  score: number;
  grade: string;
  remarks: string;
};

export type PDFStudentReportData = {
  student: {
    name: string;
    id: string;
    grade: string;
    section: string;
    year: string;
  };
  school: { name: string; address: string; contact: string };
  period: string;
  attendance: { present: number; absent: number; late: number };
  subjects: SubjectGrade[];
  average: number;
  rank?: string;
  conduct?: string;
  comments?: string;
  teacher?: { name: string; signature?: string };
  principal?: string;
};

const letterGrade = (score: number): { grade: string; variant: "default" | "success" | "secondary" | "destructive" | "outline" } => {
  if (score >= 90) return { grade: "A", variant: "success" };
  if (score >= 80) return { grade: "B", variant: "default" };
  if (score >= 70) return { grade: "C", variant: "secondary" };
  if (score >= 60) return { grade: "D", variant: "outline" };
  return { grade: "F", variant: "destructive" };
};

function ReportHeader({ data }: { data: PDFStudentReportData }) {
  return (
    <PDFHeader>
      <PDFContainer className="flex flex-col gap-1">
        <PDFText variant="h2">{data.school.name}</PDFText>
        <PDFText variant="small" className="text-zinc-500">{data.school.address}</PDFText>
        <PDFText variant="small" className="text-zinc-500">{data.school.contact}</PDFText>
      </PDFContainer>
      <PDFContainer className="flex flex-col items-end gap-2">
        <PDFBadge variant="outline">ACADEMIC REPORT</PDFBadge>
        <PDFText variant="small" className="text-zinc-500">{data.period}</PDFText>
      </PDFContainer>
    </PDFHeader>
  );
}

function StudentInfo({ data }: { data: PDFStudentReportData }) {
  return (
    <PDFSection as="plain">
      <PDFText variant="small" className="text-zinc-400 uppercase tracking-wide mb-3">Student Information</PDFText>
      <PDFContainer className="flex flex-row gap-4">
        <PDFContainer className="flex flex-col gap-2 flex-1">
          <PDFField label="Student Name" value={data.student.name} />
          <PDFField label="Student ID" value={data.student.id} />
        </PDFContainer>
        <PDFContainer className="flex flex-col gap-2 flex-1">
          <PDFField label="Grade / Section" value={`${data.student.grade} – ${data.student.section}`} />
          <PDFField label="Academic Year" value={data.student.year} />
        </PDFContainer>
      </PDFContainer>
    </PDFSection>
  );
}

function Summary({ data }: { data: PDFStudentReportData }) {
  const total = data.attendance.present + data.attendance.absent + data.attendance.late;
  const attendanceRate = total > 0 ? Math.round((data.attendance.present / total) * 100) : 0;
  const stats: { label: string; value: string; sub: string }[] = [
    { label: "Average", value: data.average.toFixed(1), sub: "out of 100" },
    { label: "Rank", value: data.rank ?? "—", sub: "in class" },
    { label: "Attendance", value: `${attendanceRate}%`, sub: `${data.attendance.late} late` },
    { label: "Conduct", value: data.conduct ?? "—", sub: "grade" },
  ];
  return (
    <PDFSection as="plain">
      <PDFText variant="small" className="text-zinc-400 uppercase tracking-wide mb-3">Summary</PDFText>
      <PDFContainer className="flex flex-row gap-3">
        {stats.map((s) => (
          <PDFContainer key={s.label} className="flex-1 rounded-lg border border-zinc-200 py-3 px-4">
            <PDFText variant="small" className="text-zinc-400">{s.label}</PDFText>
            <PDFText variant="h2">{s.value}</PDFText>
            <PDFText variant="small" className="text-zinc-400">{s.sub}</PDFText>
          </PDFContainer>
        ))}
      </PDFContainer>
    </PDFSection>
  );
}

function Grades({ data }: { data: PDFStudentReportData }) {
  return (
    <PDFSection title="Subject Grades" description={`Performance for ${data.period}`} as="card">
      <PDFTable>
        <PDFTableHeader>
          <PDFTableHead className="w-[40%]">Subject</PDFTableHead>
          <PDFTableHead className="w-[18%] justify-end">Score</PDFTableHead>
          <PDFTableHead className="w-[15%] justify-center">Grade</PDFTableHead>
          <PDFTableHead flex={2}>Remarks</PDFTableHead>
        </PDFTableHeader>
        <PDFTableBody>
          {data.subjects.map((subj, i) => {
            const { grade, variant } = letterGrade(subj.score);
            return (
              <PDFTableRow key={subj.subject} className={i === data.subjects.length - 1 ? "border-b-0" : undefined}>
                <PDFTableCell className="w-[40%]">{subj.subject}</PDFTableCell>
                <PDFTableCell className="w-[18%] justify-end">{subj.score}</PDFTableCell>
                <PDFTableCell className="w-[15%] justify-center">
                  <PDFBadge variant={variant}>{grade}</PDFBadge>
                </PDFTableCell>
                <PDFTableCell flex={2}>
                  <PDFText variant="small" className="text-zinc-400">{subj.remarks}</PDFText>
                </PDFTableCell>
              </PDFTableRow>
            );
          })}
        </PDFTableBody>
      </PDFTable>
    </PDFSection>
  );
}

function Attendance({ data }: { data: PDFStudentReportData }) {
  const items: { label: string; value: number }[] = [
    { label: "Present", value: data.attendance.present },
    { label: "Absent", value: data.attendance.absent },
    { label: "Late", value: data.attendance.late },
  ];
  const total = items.reduce((sum, i) => sum + i.value, 0);
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <PDFSection title="Attendance" as="card">
      <PDFContainer className="flex flex-col gap-3">
        {items.map((i) => {
          const pct = total > 0 ? Math.round((i.value / total) * 100) : 0;
          const fillWidth = Math.max((i.value / max) * 100, 4);
          return (
            <PDFContainer key={i.label} className="flex flex-col gap-1">
              <PDFContainer className="h-2 rounded-full bg-accent overflow-hidden">
                <PDFContainer
                  className="h-full rounded-full"
                  style={{
                    width: `${fillWidth}%`,
                    backgroundColor:
                      i.label === "Present" ? "#16a34a" : i.label === "Absent" ? "#dc2626" : "#a1a1aa",
                  }}
                />
              </PDFContainer>
              <PDFContainer className="flex flex-row justify-between">
                <PDFText variant="small">{i.label}</PDFText>
                <PDFText variant="small" className="text-zinc-400">{i.value} · {pct}%</PDFText>
              </PDFContainer>
            </PDFContainer>
          );
        })}
      </PDFContainer>
    </PDFSection>
  );
}

function TeacherComments({ data }: { data: PDFStudentReportData }) {
  return (
    <PDFSection title="Teacher's Comments" as="card">
      <PDFText>{data.comments ?? "—"}</PDFText>
    </PDFSection>
  );
}

function Signatures({ data }: { data: PDFStudentReportData }) {
  return (
    <PDFSection as="plain">
      <PDFContainer className="flex flex-row gap-6 mt-6">
        <PDFContainer className="flex flex-col flex-1 gap-1">
          <PDFDivider />
          <PDFText variant="small" className="text-zinc-400">Class Teacher</PDFText>
          <PDFText variant="small">{data.teacher?.name ?? ""}</PDFText>
        </PDFContainer>
        <PDFContainer className="flex flex-col flex-1 gap-1">
          <PDFDivider />
          <PDFText variant="small" className="text-zinc-400">Principal</PDFText>
          <PDFText variant="small">{data.principal ?? ""}</PDFText>
        </PDFContainer>
        <PDFContainer className="flex flex-col flex-1 gap-1">
          <PDFDivider />
          <PDFText variant="small" className="text-zinc-400">Parent / Guardian</PDFText>
          <PDFText variant="small">____________</PDFText>
        </PDFContainer>
      </PDFContainer>
    </PDFSection>
  );
}

export function PDFStudentReport({ data }: { data: PDFStudentReportData }) {
  return (
    <PDFDocument
      title={`Report Card — ${data.student.name}`}
      author={data.school.name}
      subject={`Academic Report · ${data.period}`}
    >
      <PDFPage className="pb-16">
        <ReportHeader data={data} />
        <StudentInfo data={data} />
        <Summary data={data} />
        <Grades data={data} />
        <PDFFooter page={1} left={`${data.student.name} · ${data.student.id}`} right={data.school.name} />
      </PDFPage>

      <PDFPage className="pb-16">
        <ReportHeader data={data} />
        <Attendance data={data} />
        <TeacherComments data={data} />
        <Signatures data={data} />
        <PDFFooter page={2} left={`${data.student.name} · ${data.student.id}`} right={data.school.name} />
      </PDFPage>
    </PDFDocument>
  );
}