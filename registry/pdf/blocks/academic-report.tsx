import * as React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDFProvider, usePDFTheme } from "@/components/pdf/provider";
import { theme } from "@/components/pdf/theme";
import { FALLBACK_FAMILY } from "@/components/pdf/fonts";
import { PDFCard, PDFCardHeader, PDFCardTitle, PDFCardDescription, PDFCardContent } from "@/components/pdf/card";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/components/pdf/table";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFDivider } from "@/components/pdf/divider";
import { PDFHeading, PDFText } from "@/components/pdf";

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

const gradeMeta = (score: number): { grade: string; color: string; variant: "default" | "success" | "secondary" | "destructive" | "outline" } => {
  if (score >= 90) return { grade: "A", color: theme.colors.success, variant: "success" };
  if (score >= 80) return { grade: "B", color: theme.colors.primary, variant: "default" };
  if (score >= 70) return { grade: "C", color: theme.colors.muted, variant: "secondary" };
  if (score >= 60) return { grade: "D", color: theme.colors.destructive, variant: "outline" };
  return { grade: "F", color: theme.colors.destructive, variant: "destructive" };
};

function ReportHeader({ data }: { data: PDFAcademicReportData }) {
  const t = usePDFTheme();
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <PDFHeading level={2}>{data.school.name}</PDFHeading>
          <PDFText variant="small" color={t.colors.muted}>{data.school.address}</PDFText>
          <PDFText variant="small" color={t.colors.muted}>{data.school.contact}</PDFText>
        </View>
        <View style={styles.headerRight}>
          <PDFBadge variant="outline">{data.reportTitle}</PDFBadge>
          <PDFText variant="small" color={t.colors.muted}>{data.period}</PDFText>
        </View>
      </View>
      <PDFDivider style={styles.headerDivider} />
    </View>
  );
}

function Profile({ data }: { data: PDFAcademicReportData }) {
  const t = usePDFTheme();
  const fields: [string, string][] = [
    ["Full Name", data.student.name],
    ["Student ID", data.student.id],
    ["Grade / PDFSection", `${data.student.grade} – ${data.student.section}`],
    ["Academic Year", data.student.year],
    ["Date of Birth", data.student.dob],
    ["Guardian", data.student.guardian],
    ["Email", data.student.email],
    ["Address", data.student.address],
  ];
  const PDFField = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoCell}>
      <PDFText variant="small" color={t.colors.mutedForeground} style={styles.infoLabel}>
        {label}
      </PDFText>
      <PDFText style={styles.infoValue}>{value}</PDFText>
    </View>
  );
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Student Profile</PDFCardTitle>
      </PDFCardHeader>
      <PDFCardContent>
        <View style={styles.infoGrid}>
          {fields.map(([label, value]) => (
            <PDFField key={label} label={label} value={value} />
          ))}
        </View>
      </PDFCardContent>
    </PDFCard>
  );
}

function Summary({ data }: { data: PDFAcademicReportData }) {
  const t = usePDFTheme();
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
    <View style={styles.summaryRow}>
      {stats.map((s) => (
        <View key={s.label} style={styles.summaryCell}>
          <PDFText variant="small" color={t.colors.mutedForeground} style={styles.statLabel}>
            {s.label}
          </PDFText>
          <PDFHeading level={2} style={styles.statValue}>{s.value}</PDFHeading>
          <PDFText variant="small" color={t.colors.muted}>{s.sub}</PDFText>
        </View>
      ))}
    </View>
  );
}

function Subjects({ data }: { data: PDFAcademicReportData }) {
  const t = usePDFTheme();
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Subject Performance</PDFCardTitle>
        <PDFCardDescription>Final scores and grade across all subjects</PDFCardDescription>
      </PDFCardHeader>
      <PDFCardContent>
        <PDFTable>
          <PDFTableHeader>
            <PDFTableHead className="w-[34%]">Subject</PDFTableHead>
            <PDFTableHead className="w-[14%] justify-center text-center">Credits</PDFTableHead>
            <PDFTableHead className="w-[14%] justify-end text-right">Score</PDFTableHead>
            <PDFTableHead className="w-[12%] justify-center text-center">Grade</PDFTableHead>
            <PDFTableHead>Remarks</PDFTableHead>
          </PDFTableHeader>
          <PDFTableBody>
            {data.subjects.map((subj, i) => {
              const { variant } = gradeMeta(subj.score);
              return (
                <PDFTableRow key={subj.subject} className={i === data.subjects.length - 1 ? "border-b-0" : undefined}>
                  <PDFTableCell className="w-[34%]">{subj.subject}</PDFTableCell>
                  <PDFTableCell className="w-[14%] justify-center text-center">
                    <PDFText color={t.colors.muted}>{subj.credits}</PDFText>
                  </PDFTableCell>
                  <PDFTableCell className="w-[14%] justify-end text-right">{subj.score}</PDFTableCell>
                  <PDFTableCell className="w-[12%] justify-center text-center">
                    <PDFBadge variant={variant}>{gradeMeta(subj.score).grade}</PDFBadge>
                  </PDFTableCell>
                  <PDFTableCell>
                    <PDFText variant="small" color={t.colors.muted}>{subj.remarks}</PDFText>
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

function Progress({ data }: { data: PDFAcademicReportData }) {
  const t = usePDFTheme();
  const subjectsWithProgress = data.subjects.filter((s) => s.progress && s.progress.length);
  if (!subjectsWithProgress.length) return null;
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Termly Progress</PDFCardTitle>
        <PDFCardDescription>Score trend across assessment periods</PDFCardDescription>
      </PDFCardHeader>
      <PDFCardContent>
        <View style={styles.progressList}>
          {subjectsWithProgress.map((subj) => {
            const barColor = gradeMeta(subj.score).color;
            return (
              <View key={subj.subject} style={styles.progressItem}>
                <View style={styles.progressHead}>
                  <PDFText>{subj.subject}</PDFText>
                  <PDFText variant="small" color={t.colors.muted}>{subj.score}%</PDFText>
                </View>
                <View style={styles.termBars}>
                  {subj.progress!.map((term) => (
                    <View key={term.term} style={styles.termBarCol}>
                      <View style={styles.barTrack}>
                        <View
                          style={[
                            styles.barFill,
                            {
                              width: `${Math.max(term.score, 4)}%`,
                              backgroundColor: barColor,
                            },
                          ]}
                        />
                      </View>
                      <PDFText variant="small" color={t.colors.muted} style={styles.termLabel}>
                        {term.term} · {term.score}
                      </PDFText>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </PDFCardContent>
    </PDFCard>
  );
}

function Competencies({ data }: { data: PDFAcademicReportData }) {
  const t = usePDFTheme();
  if (!data.competencies.length) return null;
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Competencies</PDFCardTitle>
        <PDFCardDescription>Soft-skills and learner attributes (1–5 scale)</PDFCardDescription>
      </PDFCardHeader>
      <PDFCardContent>
        <View style={styles.compList}>
          {data.competencies.map((c) => (
            <View key={c.skill} style={styles.compRow}>
              <PDFText variant="small" style={styles.compName}>{c.skill}</PDFText>
              <View style={styles.dots}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <View
                    key={n}
                    style={[
                      styles.dot,
                      {
                        backgroundColor:
                          n <= c.rating ? theme.colors.primary : theme.colors.accent,
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </PDFCardContent>
    </PDFCard>
  );
}

function Achievements({ data }: { data: PDFAcademicReportData }) {
  const t = usePDFTheme();
  if (!data.achievements?.length) return null;
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Achievements</PDFCardTitle>
      </PDFCardHeader>
      <PDFCardContent>
        <View style={styles.achList}>
          {data.achievements.map((a, i) => (
            <View key={i} style={styles.achRow}>
              <PDFBadge variant="success" style={styles.achBullet}>{i + 1}</PDFBadge>
              <PDFText variant="small">{a}</PDFText>
            </View>
          ))}
        </View>
      </PDFCardContent>
    </PDFCard>
  );
}

function Attendance({ data }: { data: PDFAcademicReportData }) {
  const t = usePDFTheme();
  const items: { label: string; value: number; color: string }[] = [
    { label: "Present", value: data.attendance.present, color: theme.colors.success },
    { label: "Absent", value: data.attendance.absent, color: theme.colors.destructive },
    { label: "Late", value: data.attendance.late, color: theme.colors.muted },
  ];
  const total = items.reduce((s, i) => s + i.value, 0);
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Attendance</PDFCardTitle>
        <PDFCardDescription>Records for {data.period}</PDFCardDescription>
      </PDFCardHeader>
      <PDFCardContent>
        <View style={styles.attendanceRow}>
          {items.map((i) => {
            const pct = Math.round((i.value / Math.max(total, 1)) * 100);
            return (
              <View key={i.label} style={styles.attendanceCell}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${Math.max((i.value / max) * 100, 4)}%`,
                        backgroundColor: i.color,
                      },
                    ]}
                  />
                </View>
                <View style={styles.barLabelRow}>
                  <PDFText variant="small">{i.label}</PDFText>
                  <PDFText variant="small" color={t.colors.muted}>{i.value} · {pct}%</PDFText>
                </View>
              </View>
            );
          })}
        </View>
      </PDFCardContent>
    </PDFCard>
  );
}

function Comments({ data }: { data: PDFAcademicReportData }) {
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Teacher's Comments</PDFCardTitle>
      </PDFCardHeader>
      <PDFCardContent>
        <PDFText>{data.comments ?? "—"}</PDFText>
      </PDFCardContent>
    </PDFCard>
  );
}

function Signatures({ data }: { data: PDFAcademicReportData }) {
  const t = usePDFTheme();
  return (
    <View style={styles.signatureRow}>
      <View style={styles.signatureCell}>
        <PDFDivider />
        <PDFText variant="small" color={t.colors.muted}>Class Teacher</PDFText>
        <PDFText variant="small">{data.teacher?.name ?? ""}</PDFText>
      </View>
      <View style={styles.signatureCell}>
        <PDFDivider />
        <PDFText variant="small" color={t.colors.muted}>Principal</PDFText>
        <PDFText variant="small">{data.principal ?? ""}</PDFText>
      </View>
      <View style={styles.signatureCell}>
        <PDFDivider />
        <PDFText variant="small" color={t.colors.muted}>Parent / Guardian</PDFText>
        <PDFText variant="small">____________</PDFText>
      </View>
    </View>
  );
}

function PageFooter({ data, page }: { data: PDFAcademicReportData; page: number }) {
  const t = usePDFTheme();
  return (
    <View style={styles.pageFooter} fixed>
      <PDFText variant="small" color={t.colors.muted}>
        {data.student.name} · {data.student.id} · Page {page}
      </PDFText>
      <PDFText variant="small" color={t.colors.muted}>{data.school.name}</PDFText>
    </View>
  );
}

function ReportContent({ data, fontFamily }: { data: PDFAcademicReportData; fontFamily: string }) {
  return (
    <>
      <Page size="A4" style={[styles.page, { fontFamily }]}>
        <ReportHeader data={data} />
        <Profile data={data} />
        <Subjects data={data} />
        <PageFooter data={data} page={1} />
      </Page>

      <Page size="A4" style={[styles.page, { fontFamily }]}>
        <ReportHeader data={data} />
        <Summary data={data} />
        <Progress data={data} />
        <PageFooter data={data} page={2} />
      </Page>

      <Page size="A4" style={[styles.page, { fontFamily }]}>
        <ReportHeader data={data} />
        <Competencies data={data} />
        <Achievements data={data} />
        <Attendance data={data} />
        <PageFooter data={data} page={3} />
      </Page>

      <Page size="A4" style={[styles.page, { fontFamily }]}>
        <ReportHeader data={data} />
        <Comments data={data} />
        <Signatures data={data} />
        <PageFooter data={data} page={4} />
      </Page>
    </>
  );
}

export function PDFAcademicReport({
  data,
  theme: customTheme,
  fontFamily,
}: {
  data: PDFAcademicReportData;
  theme?: Partial<typeof theme>;
  fontFamily?: string;
}) {
  return (
    <PDFProvider value={customTheme}>
      <Document
        title={`Academic Report — ${data.student.name}`}
        author={data.school.name}
        subject={data.reportTitle}
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
  headerTop: {
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
    marginBottom: theme.spacing[3],
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoCell: {
    width: "50%",
    paddingVertical: theme.spacing[1],
    paddingRight: theme.spacing[4],
  },
  infoLabel: { marginBottom: 2 },
  infoValue: { fontWeight: 600 },
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
  statLabel: { marginBottom: 2 },
  statValue: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: 700,
    color: theme.colors.foreground,
    marginVertical: 2,
  },
  progressList: {
    flexDirection: "column",
    gap: theme.spacing[4],
  },
  progressItem: {
    flexDirection: "column",
    gap: theme.spacing[2],
  },
  progressHead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  termBars: {
    flexDirection: "row",
    gap: theme.spacing[4],
  },
  termBarCol: {
    flex: 1,
    flexDirection: "column",
    gap: 2,
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
  termLabel: { textAlign: "center" },
  compList: {
    flexDirection: "column",
    gap: theme.spacing[3],
  },
  compRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  compName: { flex: 1 },
  dots: {
    flexDirection: "row",
    gap: theme.spacing[1],
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: theme.radius.full,
  },
  achList: {
    flexDirection: "column",
    gap: theme.spacing[2],
  },
  achRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[3],
  },
  achBullet: {
    minWidth: 18,
    height: 18,
    alignItems: "center",
  },
  attendanceRow: {
    flexDirection: "column",
    gap: theme.spacing[3],
  },
  attendanceCell: {
    flexDirection: "column",
    gap: theme.spacing[1],
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