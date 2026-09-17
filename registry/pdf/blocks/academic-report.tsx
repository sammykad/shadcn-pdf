import * as React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter, PDFText, PDFContainer } from "@/components/pdf";
import { PDFSection, PDFField } from "@/components/pdf/section";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/components/pdf/table";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFDivider } from "@/components/pdf/divider";

export type TermScore = { term: string; score: number };
export type SubjectReport = {
  subject: string;
  score: number;
  grade: string;
  credits: number;
  remarks: string;
  progress?: TermScore[];
};
export type Competency = { skill: string; rating: number };

export type PDFAcademicReportData = {
  student: {
    name: string;
    id: string;
    grade: string;
    section: string;
    year: string;
    dob: string;
    guardian: string;
    email: string;
    address: string;
  };
  school: { name: string; address: string; contact: string };
  reportTitle: string;
  period: string;
  gpa: number;
  totalCredits: number;
  classRank?: string;
  attendance: { present: number; absent: number; late: number };
  subjects: SubjectReport[];
  competencies: Competency[];
  conduct?: string;
  achievements?: string[];
  comments?: string;
  teacher?: { name: string };
  principal?: string;
};

const gradeMeta = (score: number): { grade: string; variant: "default" | "success" | "secondary" | "destructive" | "outline" } => {
  if (score >= 90) return { grade: "A", variant: "success" };
  if (score >= 80) return { grade: "B", variant: "default" };
  if (score >= 70) return { grade: "C", variant: "secondary" };
  if (score >= 60) return { grade: "D", variant: "outline" };
  return { grade: "F", variant: "destructive" };
};

const variantColor: Record<string, string> = {
  success: "#16a34a",
  default: "#18181b",
  secondary: "#737373",
  outline: "#a1a1aa",
  destructive: "#dc2626",
};

function ReportHeader({ data }: { data: PDFAcademicReportData }) {
  return (
    <PDFHeader>
      <PDFContainer className="flex flex-col gap-1">
        <PDFText variant="h2">{data.school.name}</PDFText>
        <PDFText variant="small" className="text-muted">{data.school.address}</PDFText>
        <PDFText variant="small" className="text-muted">{data.school.contact}</PDFText>
      </PDFContainer>
      <PDFContainer className="flex flex-col items-end gap-2">
        <PDFBadge variant="outline">{data.reportTitle}</PDFBadge>
        <PDFText variant="small" className="text-muted">{data.period}</PDFText>
      </PDFContainer>
    </PDFHeader>
  );
}

function Profile({ data }: { data: PDFAcademicReportData }) {
  const fields: [string, string][] = [
    ["Full Name", data.student.name],
    ["Student ID", data.student.id],
    ["Grade / Section", `${data.student.grade} – ${data.student.section}`],
    ["Academic Year", data.student.year],
    ["Date of Birth", data.student.dob],
    ["Guardian", data.student.guardian],
    ["Email", data.student.email],
    ["Address", data.student.address],
  ];
  const left = fields.slice(0, 4);
  const right = fields.slice(4);
  return (
    <PDFSection as="plain">
      <PDFText variant="small" className="text-muted-foreground uppercase tracking-wide mb-3">Student Profile</PDFText>
        <PDFContainer className="flex flex-row gap-4">
        <PDFContainer className="flex flex-col gap-2 flex-1">
          {left.map(([label, value]) => <PDFField key={label} label={label} value={value} noFlex />)}
        </PDFContainer>
        <PDFContainer className="flex flex-col gap-2 flex-1">
          {right.map(([label, value]) => <PDFField key={label} label={label} value={value} noFlex />)}
        </PDFContainer>
      </PDFContainer>
    </PDFSection>
  );
}

function Subjects({ data }: { data: PDFAcademicReportData }) {
  return (
    <PDFSection title="Subject Performance" description="Final scores and grade across all subjects" as="card">
      <PDFTable>
        <PDFTableHeader>
          <PDFTableHead className="w-[34%]">Subject</PDFTableHead>
          <PDFTableHead className="w-[14%] justify-center">Credits</PDFTableHead>
          <PDFTableHead className="w-[14%] justify-end">Score</PDFTableHead>
          <PDFTableHead className="w-[12%] justify-center">Grade</PDFTableHead>
          <PDFTableHead>Remarks</PDFTableHead>
        </PDFTableHeader>
        <PDFTableBody>
          {data.subjects.map((subj, i) => {
            const { grade, variant } = gradeMeta(subj.score);
            return (
              <PDFTableRow key={subj.subject} className={i === data.subjects.length - 1 ? "border-b-0" : undefined}>
                <PDFTableCell className="w-[34%]">{subj.subject}</PDFTableCell>
                <PDFTableCell className="w-[14%] justify-center">
                  <PDFText variant="small" className="text-muted-foreground">{subj.credits}</PDFText>
                </PDFTableCell>
                <PDFTableCell className="w-[14%] justify-end">{subj.score}</PDFTableCell>
                <PDFTableCell className="w-[12%] justify-center">
                  <PDFBadge variant={variant}>{grade}</PDFBadge>
                </PDFTableCell>
                <PDFTableCell>
                  <PDFText variant="small" className="text-muted-foreground">{subj.remarks}</PDFText>
                </PDFTableCell>
              </PDFTableRow>
            );
          })}
        </PDFTableBody>
      </PDFTable>
    </PDFSection>
  );
}

function Summary({ data }: { data: PDFAcademicReportData }) {
  const present = data.attendance.present;
  const totalDays = present + data.attendance.absent + data.attendance.late;
  const attRate = Math.round((present / Math.max(totalDays, 1)) * 100);
  const stats: { label: string; value: string; sub: string }[] = [
    { label: "GPA", value: data.gpa.toFixed(2), sub: "out of 4.00" },
    { label: "Class Rank", value: data.classRank ?? "—", sub: "in class" },
    { label: "Credits Earned", value: String(data.totalCredits), sub: "total" },
    { label: "Attendance", value: `${attRate}%`, sub: `${data.attendance.late} late` },
  ];
  return (
    <PDFSection as="plain">
      <PDFText variant="small" className="text-muted-foreground uppercase tracking-wide mb-3">Summary</PDFText>
      <PDFContainer className="flex flex-row gap-3">
        {stats.map((s) => (
          <PDFContainer key={s.label} className="flex-1 rounded-lg border border-zinc-200 py-3 px-4">
            <PDFText variant="small" className="text-muted">{s.label}</PDFText>
            <PDFText variant="h2">{s.value}</PDFText>
            <PDFText variant="small" className="text-muted-foreground">{s.sub}</PDFText>
          </PDFContainer>
        ))}
      </PDFContainer>
    </PDFSection>
  );
}

function Progress({ data }: { data: PDFAcademicReportData }) {
  const subjectsWithProgress = data.subjects.filter((s) => s.progress && s.progress.length);
  if (!subjectsWithProgress.length) return null;
  return (
    <PDFSection title="Termly Progress" description="Score trend across assessment periods" as="card">
      <PDFContainer className="flex flex-col gap-4">
        {subjectsWithProgress.map((subj) => {
          const color = variantColor[gradeMeta(subj.score).variant];
          return (
            <PDFContainer key={subj.subject} className="flex flex-col gap-2">
              <PDFContainer className="flex flex-row justify-between">
                <PDFText>{subj.subject}</PDFText>
                <PDFText variant="small" className="text-muted">{subj.score}%</PDFText>
              </PDFContainer>
              <PDFContainer className="flex flex-row gap-4">
                {subj.progress!.map((term) => (
                  <PDFContainer key={term.term} className="flex flex-col flex-1 gap-1">
                    <PDFContainer className="h-2 rounded-full bg-accent overflow-hidden">
                      <PDFContainer
                        className="h-full rounded-full"
                        style={{ width: `${Math.max(term.score, 4)}%`, backgroundColor: color }}
                      />
                    </PDFContainer>
                    <PDFText variant="small" className="text-muted text-center">{term.term} · {term.score}</PDFText>
                  </PDFContainer>
                ))}
              </PDFContainer>
            </PDFContainer>
          );
        })}
      </PDFContainer>
    </PDFSection>
  );
}

function Competencies({ data }: { data: PDFAcademicReportData }) {
  if (!data.competencies.length) return null;
  return (
    <PDFSection title="Competencies" description="Soft-skills and learner attributes (1–5 scale)" as="card">
      <PDFContainer className="flex flex-col gap-3">
        {data.competencies.map((c) => (
          <PDFContainer key={c.skill} className="flex flex-row justify-between items-center">
            <PDFText variant="small" className="flex-1">{c.skill}</PDFText>
            <PDFContainer className="flex flex-row gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <PDFContainer
                  key={n}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: n <= c.rating ? "#18181b" : "#f4f4f5" }}
                />
              ))}
            </PDFContainer>
          </PDFContainer>
        ))}
      </PDFContainer>
    </PDFSection>
  );
}

function Achievements({ data }: { data: PDFAcademicReportData }) {
  if (!data.achievements?.length) return null;
  return (
    <PDFSection title="Achievements" as="card">
      <PDFContainer className="flex flex-col gap-2">
        {data.achievements.map((a, i) => (
          <PDFContainer key={i} className="flex flex-row items-center gap-3">
            <PDFBadge variant="success" className="items-center justify-center" style={{ minWidth: 18, height: 18 }}>
              {i + 1}
            </PDFBadge>
            <PDFText variant="small">{a}</PDFText>
          </PDFContainer>
        ))}
      </PDFContainer>
    </PDFSection>
  );
}

function Attendance({ data }: { data: PDFAcademicReportData }) {
  const items: { label: string; value: number; color: string }[] = [
    { label: "Present", value: data.attendance.present, color: "#16a34a" },
    { label: "Absent", value: data.attendance.absent, color: "#dc2626" },
    { label: "Late", value: data.attendance.late, color: "#737373" },
  ];
  const total = items.reduce((s, i) => s + i.value, 0);
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <PDFSection title="Attendance" description={`Records for ${data.period}`} as="card">
      <PDFContainer className="flex flex-col gap-3">
        {items.map((i) => {
          const pct = Math.round((i.value / Math.max(total, 1)) * 100);
          return (
            <PDFContainer key={i.label} className="flex flex-col gap-1">
              <PDFContainer className="h-2 rounded-full bg-accent overflow-hidden">
                <PDFContainer
                  className="h-full rounded-full"
                  style={{ width: `${Math.max((i.value / max) * 100, 4)}%`, backgroundColor: i.color }}
                />
              </PDFContainer>
              <PDFContainer className="flex flex-row justify-between">
                <PDFText variant="small">{i.label}</PDFText>
                <PDFText variant="small" className="text-muted-foreground">{i.value} · {pct}%</PDFText>
              </PDFContainer>
            </PDFContainer>
          );
        })}
      </PDFContainer>
    </PDFSection>
  );
}

function Comments({ data }: { data: PDFAcademicReportData }) {
  return (
    <PDFSection title="Teacher's Comments" as="card">
      <PDFText>{data.comments ?? "—"}</PDFText>
    </PDFSection>
  );
}

function Signatures({ data }: { data: PDFAcademicReportData }) {
  return (
    <PDFSection as="plain">
      <PDFContainer className="flex flex-row gap-6 mt-6">
        <PDFContainer className="flex flex-col flex-1 gap-1">
          <PDFDivider />
          <PDFText variant="small" className="text-muted-foreground">Class Teacher</PDFText>
          <PDFText variant="small">{data.teacher?.name ?? ""}</PDFText>
        </PDFContainer>
        <PDFContainer className="flex flex-col flex-1 gap-1">
          <PDFDivider />
          <PDFText variant="small" className="text-muted-foreground">Principal</PDFText>
          <PDFText variant="small">{data.principal ?? ""}</PDFText>
        </PDFContainer>
        <PDFContainer className="flex flex-col flex-1 gap-1">
          <PDFDivider />
          <PDFText variant="small" className="text-muted-foreground">Parent / Guardian</PDFText>
          <PDFText variant="small">____________</PDFText>
        </PDFContainer>
      </PDFContainer>
    </PDFSection>
  );
}

export function PDFAcademicReport({ data }: { data: PDFAcademicReportData }) {
  return (
    <PDFDocument
      title={`Academic Report — ${data.student.name}`}
      author={data.school.name}
      subject={data.reportTitle}
    >
      <PDFPage className="pb-16">
        <ReportHeader data={data} />
        <Summary data={data} />
        <Profile data={data} />
        <Subjects data={data} />
        <PDFFooter page={1} left={`${data.student.name} · ${data.student.id}`} right={data.school.name} />
      </PDFPage>

      <PDFPage className="pb-16">
        <ReportHeader data={data} />
        <Progress data={data} />
        <Competencies data={data} />
        <Achievements data={data} />
        <Attendance data={data} />
        <Comments data={data} />
        <Signatures data={data} />
        <PDFFooter page={2} left={`${data.student.name} · ${data.student.id}`} right={data.school.name} />
      </PDFPage>
    </PDFDocument>
  );
}