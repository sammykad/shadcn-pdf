import * as React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDFProvider, usePDFTheme } from "@/components/pdf/core/provider";
import { theme } from "@/components/pdf/core/theme";
import { FALLBACK_FAMILY } from "@/components/pdf/core/fonts";
import { PDFCard, PDFCardHeader, PDFCardTitle, PDFCardDescription, PDFCardContent } from "@/components/pdf/card";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/components/pdf/table";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFDivider } from "@/components/pdf/divider";
import { PDFHeading, PDFTextBlock } from "@/components/pdf/typography";

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
    photo?: string;
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

function Header({ data, fontFamily }: { data: PDFStudentReportData; fontFamily: string }) {
  const t = usePDFTheme();
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <View>
          <PDFHeading level={2}>{data.school.name}</PDFHeading>
          <PDFTextBlock variant="small" color={t.colors.muted}>
            {data.school.address}
          </PDFTextBlock>
          <PDFTextBlock variant="small" color={t.colors.muted}>
            {data.school.contact}
          </PDFTextBlock>
        </View>
        <View style={styles.headerRight}>
          <PDFBadge variant="outline">ACADEMIC REPORT</PDFBadge>
          <PDFTextBlock variant="small" color={t.colors.muted}>
            {data.period}
          </PDFTextBlock>
        </View>
      </View>
      <PDFDivider style={styles.headerDivider} />
    </View>
  );
}

function StudentInfo({ data }: { data: PDFStudentReportData }) {
  const t = usePDFTheme();
  const fields: [string, string][] = [
    ["Student Name", data.student.name],
    ["Student ID", data.student.id],
    ["Grade / PDFSection", `${data.student.grade} – ${data.student.section}`],
    ["Academic Year", data.student.year],
  ];
  const PDFField = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoCell}>
      <PDFTextBlock variant="small" color={t.colors.mutedForeground} style={styles.infoLabel}>
        {label}
      </PDFTextBlock>
      <PDFTextBlock style={styles.infoValue}>{value}</PDFTextBlock>
    </View>
  );
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Student Information</PDFCardTitle>
      </PDFCardHeader>
      <PDFCardContent>
        <View style={styles.infoGrid}>
          <PDFField label={fields[0][0]} value={fields[0][1]} />
          <PDFField label={fields[1][0]} value={fields[1][1]} />
          <PDFField label={fields[2][0]} value={fields[2][1]} />
          <PDFField label={fields[3][0]} value={fields[3][1]} />
        </View>
      </PDFCardContent>
    </PDFCard>
  );
}

function Summary({ data }: { data: PDFStudentReportData }) {
  const t = usePDFTheme();
  const attendanceRate = Math.round(
    (data.attendance.present / (data.attendance.present + data.attendance.absent + data.attendance.late)) * 100
  );
  const stats: { label: string; value: string; sub: string }[] = [
    { label: "Average", value: data.average.toFixed(1), sub: "out of 100" },
    { label: "Rank", value: data.rank ?? "—", sub: "in class" },
    { label: "Attendance", value: `${attendanceRate}%`, sub: `${data.attendance.late} late` },
    { label: "Conduct", value: data.conduct ?? "—", sub: "grade" },
  ];
  return (
    <View style={styles.summaryRow}>
      {stats.map((s) => (
        <View key={s.label} style={styles.summaryCell}>
          <PDFTextBlock variant="small" color={t.colors.mutedForeground} style={styles.statLabel}>
            {s.label}
          </PDFTextBlock>
          <PDFHeading level={2} style={styles.statValue}>{s.value}</PDFHeading>
          <PDFTextBlock variant="small" color={t.colors.muted}>{s.sub}</PDFTextBlock>
        </View>
      ))}
    </View>
  );
}

function Grades({ data }: { data: PDFStudentReportData }) {
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Subject Grades</PDFCardTitle>
        <PDFCardDescription>Performance for {data.period}</PDFCardDescription>
      </PDFCardHeader>
      <PDFCardContent>
        <PDFTable>
          <PDFTableHeader>
            <PDFTableHead className="w-[40%]">Subject</PDFTableHead>
            <PDFTableHead className="w-[18%] justify-end text-right">Score</PDFTableHead>
            <PDFTableHead className="w-[15%] justify-center text-center">Grade</PDFTableHead>
            <PDFTableHead>Remarks</PDFTableHead>
          </PDFTableHeader>
          <PDFTableBody>
            {data.subjects.map((subj, i) => {
              const { grade, variant } = letterGrade(subj.score);
              return (
                <PDFTableRow key={subj.subject} className={i === data.subjects.length - 1 ? "border-b-0" : undefined}>
                  <PDFTableCell className="w-[40%]">{subj.subject}</PDFTableCell>
                  <PDFTableCell className="w-[18%] justify-end text-right">{subj.score}</PDFTableCell>
                  <PDFTableCell className="w-[15%] justify-center text-center">
                    <PDFBadge variant={variant}>{grade}</PDFBadge>
                  </PDFTableCell>
                  <PDFTableCell>
                    <PDFTextBlock variant="small" color={theme.colors.muted}>{subj.remarks}</PDFTextBlock>
                  </PDFTableCell>
                </PDFTableRow>
              );
            })}
          </PDFTableBody>
        </PDFTable>
      </PDFCardContent>
    </PDFCard>
  );
}

function Attendance({ data }: { data: PDFStudentReportData }) {
  const t = usePDFTheme();
  const items: { label: string; value: number }[] = [
    { label: "Present", value: data.attendance.present },
    { label: "Absent", value: data.attendance.absent },
    { label: "Late", value: data.attendance.late },
  ];
  const total = items.reduce((s, i) => s + i.value, 0);
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Attendance</PDFCardTitle>
      </PDFCardHeader>
      <PDFCardContent>
        <View style={styles.attendanceRow}>
          {items.map((i) => {
            const pct = Math.round((i.value / total) * 100);
            return (
              <View key={i.label} style={styles.attendanceCell}>
                <View style={styles.barTrack}>
                  <View
                    style={[styles.barFill, { width: `${Math.max((i.value / max) * 100, 4)}%`, backgroundColor: i.label === "Present" ? theme.colors.success : i.label === "Absent" ? theme.colors.destructive : theme.colors.accent }]}
                  />
                </View>
                <View style={styles.barLabelRow}>
                  <PDFTextBlock variant="small">{i.label}</PDFTextBlock>
                  <PDFTextBlock variant="small" color={t.colors.muted}>{i.value} · {pct}%</PDFTextBlock>
                </View>
              </View>
            );
          })}
        </View>
      </PDFCardContent>
    </PDFCard>
  );
}

function TeacherComments({ data }: { data: PDFStudentReportData }) {
  const t = usePDFTheme();
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Teacher's Comments</PDFCardTitle>
      </PDFCardHeader>
      <PDFCardContent>
        <PDFTextBlock>{data.comments ?? "—"}</PDFTextBlock>
      </PDFCardContent>
    </PDFCard>
  );
}

function Signatures({ data }: { data: PDFStudentReportData }) {
  const t = usePDFTheme();
  return (
    <View style={styles.signatureRow}>
      <View style={styles.signatureCell}>
        <PDFDivider />
        <PDFTextBlock variant="small" color={t.colors.muted}>Class Teacher</PDFTextBlock>
        <PDFTextBlock variant="small">{data.teacher?.name ?? ""}</PDFTextBlock>
      </View>
      <View style={styles.signatureCell}>
        <PDFDivider />
        <PDFTextBlock variant="small" color={t.colors.muted}>Principal</PDFTextBlock>
        <PDFTextBlock variant="small">{data.principal ?? ""}</PDFTextBlock>
      </View>
      <View style={styles.signatureCell}>
        <PDFDivider />
        <PDFTextBlock variant="small" color={t.colors.muted}>Parent / Guardian</PDFTextBlock>
        <PDFTextBlock variant="small">____________</PDFTextBlock>
      </View>
    </View>
  );
}

function PageFooter({ data, page }: { data: PDFStudentReportData; page: number }) {
  const t = usePDFTheme();
  return (
    <View style={styles.pageFooter} fixed>
      <PDFTextBlock variant="small" color={t.colors.muted}>
        {data.student.name} · {data.student.id} · Page {page}
      </PDFTextBlock>
      <PDFTextBlock variant="small" color={t.colors.muted}>{data.school.name}</PDFTextBlock>
    </View>
  );
}

function ReportContent({ data, fontFamily }: { data: PDFStudentReportData; fontFamily: string }) {
  return (
    <>
      <Page size="A4" style={[styles.page, { fontFamily }]}>
        <Header data={data} fontFamily={fontFamily} />
        <StudentInfo data={data} />
        <Summary data={data} />
        <Grades data={data} />
        <PageFooter data={data} page={1} />
      </Page>

      <Page size="A4" style={[styles.page, { fontFamily }]}>
        <Header data={data} fontFamily={fontFamily} />
        <Attendance data={data} />
        <TeacherComments data={data} />
        <Signatures data={data} />
        <PageFooter data={data} page={2} />
      </Page>
    </>
  );
}

export function PDFStudentReport({
  data,
  theme: customTheme,
  fontFamily,
}: {
  data: PDFStudentReportData;
  theme?: Partial<typeof theme>;
  fontFamily?: string;
}) {
  return (
    <PDFProvider value={customTheme}>
      <Document
        title={`Report PDFCard — ${data.student.name}`}
        author={data.school.name}
        subject={`Academic Report · ${data.period}`}
      >
        <ReportContent data={data} fontFamily={fontFamily ?? FALLBACK_FAMILY} />
      </Document>
    </PDFProvider>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing[10],
    paddingBottom: theme.spacing[16],
  },
  header: { marginBottom: theme.spacing[5] },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerRight: {
    alignItems: "flex-end",
    gap: theme.spacing[2],
  },
  headerDivider: {
    marginTop: theme.spacing[3],
  },
  section: {
    marginBottom: theme.spacing[4],
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoCell: {
    width: "50%",
    paddingVertical: theme.spacing[2],
    paddingRight: theme.spacing[4],
  },
  infoLabel: {
    marginBottom: 2,
  },
  infoValue: {
    fontWeight: 600,
  },
  summaryRow: {
    flexDirection: "row",
    gap: theme.spacing[3],
    marginBottom: theme.spacing[4],
  },
  summaryCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: "solid",
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
  },
  statLabel: {
    marginBottom: 2,
  },
  statValue: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: 700,
    color: theme.colors.foreground,
    marginVertical: 2,
  },
  attendanceRow: {
    flexDirection: "column",
    gap: theme.spacing[3],
  },
  attendanceCell: {
    flexDirection: "column",
    gap: theme.spacing[1],
  },
  barTrack: {
    height: 8,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.accent,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: theme.radius.full,
  },
  barLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureRow: {
    flexDirection: "row",
    gap: theme.spacing[6],
    marginTop: theme.spacing[8],
  },
  signatureCell: {
    flex: 1,
    gap: theme.spacing[1],
  },
  pageFooter: {
    position: "absolute",
    left: theme.spacing[10],
    right: theme.spacing[10],
    bottom: theme.spacing[5],
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    borderTopStyle: "solid",
    paddingTop: theme.spacing[2],
  },
});