import * as React from "react";
import { PDFDocument, PDFPage, PDFHeader, PDFFooter, PDFText, PDFContainer } from "@/components/pdf";
import { PDFSection } from "@/components/pdf/section";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/components/pdf/table";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFDivider } from "@/components/pdf/divider";
import { PDFCard, PDFCardHeader, PDFCardTitle, PDFCardContent } from "@/components/pdf/card";

export type ProgressData = {
  student: {
    name: string;
    id: string;
    grade: string;
    term: string;
  };
  school: { name: string; motto?: string };
  subjects: {
    name: string;
    ca: number;
    exam: number;
    total: number;
    grade: string;
    remark: string;
  }[];
  attendance: { total: number; present: number };
  teacherComment: string;
  principalComment: string;
  signature: { teacher: string; principal: string };
};

const gradeColor = (g: string): "success" | "default" | "secondary" | "destructive" => {
  if (g === "A" || g === "A+") return "success";
  if (g === "B" || g === "B+") return "default";
  if (g === "C") return "secondary";
  return "destructive";
};

function TopBar({ data }: { data: ProgressData }) {
  return (
    <PDFHeader>
      <PDFContainer className="flex flex-col gap-1 flex-1">
        <PDFText variant="h1">{data.school.name}</PDFText>
        {data.school.motto && (
          <PDFText variant="small" className="text-zinc-500">{data.school.motto}</PDFText>
        )}
      </PDFContainer>
      <PDFContainer className="flex flex-col items-end gap-2">
        <PDFBadge variant="default">PROGRESS REPORT</PDFBadge>
        <PDFText variant="small" className="text-zinc-500">{data.student.term}</PDFText>
      </PDFContainer>
    </PDFHeader>
  );
}

function StudentBar({ data }: { data: ProgressData }) {
  const fields: { label: string; value: string }[] = [
    { label: "Name", value: data.student.name },
    { label: "ID", value: data.student.id },
    { label: "Grade", value: data.student.grade },
    {
      label: "Attendance",
      value: `${data.attendance.present}/${data.attendance.total} (${Math.round((data.attendance.present / Math.max(data.attendance.total, 1)) * 100)}%)`,
    },
  ];
  return (
    <PDFContainer className="flex flex-row gap-6 rounded-lg bg-accent py-3 px-4">
      {fields.map((f) => (
        <PDFContainer key={f.label} className="flex flex-col flex-1 gap-1">
          <PDFText variant="small" className="text-zinc-400">{f.label}</PDFText>
          <PDFText className="font-semibold" style={{ fontSize: 10 }}>{f.value}</PDFText>
        </PDFContainer>
      ))}
    </PDFContainer>
  );
}

function GradeTable({ data }: { data: ProgressData }) {
  return (
    <PDFSection title="Academic Performance" as="card">
      <PDFTable>
        <PDFTableHeader>
          <PDFTableHead className="w-[30%]">Subject</PDFTableHead>
          <PDFTableHead className="w-[15%] justify-center">CA (40)</PDFTableHead>
          <PDFTableHead className="w-[15%] justify-center">Exam (60)</PDFTableHead>
          <PDFTableHead className="w-[15%] justify-center">Total</PDFTableHead>
          <PDFTableHead className="w-[12%] justify-center">Grade</PDFTableHead>
          <PDFTableHead>Remark</PDFTableHead>
        </PDFTableHeader>
        <PDFTableBody>
          {data.subjects.map((s, i) => (
            <PDFTableRow key={s.name} className={i === data.subjects.length - 1 ? "border-b-0" : undefined}>
              <PDFTableCell className="w-[30%]">{s.name}</PDFTableCell>
              <PDFTableCell className="w-[15%] justify-center">{s.ca}</PDFTableCell>
              <PDFTableCell className="w-[15%] justify-center">{s.exam}</PDFTableCell>
              <PDFTableCell className="w-[15%] justify-center" style={{ fontWeight: 600 }}>{s.total}</PDFTableCell>
              <PDFTableCell className="w-[12%] justify-center">
                <PDFBadge variant={gradeColor(s.grade)}>{s.grade}</PDFBadge>
              </PDFTableCell>
              <PDFTableCell>
                <PDFText variant="small" className="text-zinc-400">{s.remark}</PDFText>
              </PDFTableCell>
            </PDFTableRow>
          ))}
        </PDFTableBody>
      </PDFTable>
    </PDFSection>
  );
}

function Comments({ data }: { data: ProgressData }) {
  return (
    <PDFContainer className="flex flex-row gap-3">
      <PDFCard className="flex-1">
        <PDFCardHeader>
          <PDFCardTitle>Class Teacher</PDFCardTitle>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFText>{data.teacherComment}</PDFText>
          <PDFContainer className="flex flex-col gap-1 mt-4">
            <PDFDivider />
            <PDFText variant="small" className="text-zinc-500">{data.signature.teacher}</PDFText>
          </PDFContainer>
        </PDFCardContent>
      </PDFCard>
      <PDFCard className="flex-1">
        <PDFCardHeader>
          <PDFCardTitle>Principal</PDFCardTitle>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFText>{data.principalComment}</PDFText>
          <PDFContainer className="flex flex-col gap-1 mt-4">
            <PDFDivider />
            <PDFText variant="small" className="text-zinc-500">{data.signature.principal}</PDFText>
          </PDFContainer>
        </PDFCardContent>
      </PDFCard>
    </PDFContainer>
  );
}

export function PDFProgressReport({ data }: { data: ProgressData }) {
  return (
    <PDFDocument
      title={`Progress Report — ${data.student.name}`}
      author={data.school.name}
      subject={data.student.term}
    >
      <PDFPage className="pb-16">
        <TopBar data={data} />
        <StudentBar data={data} />
        <PDFDivider className="mb-4" />
        <GradeTable data={data} />
        <Comments data={data} />
        <PDFFooter left={`${data.school.name} · ${data.student.name} · ${data.student.id}`} pageNumber={false} />
      </PDFPage>
    </PDFDocument>
  );
}