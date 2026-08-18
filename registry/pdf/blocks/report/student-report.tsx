import * as React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDFProvider, usePDFTheme } from "../../lib/provider";
import { theme } from "../../lib/theme";
import { FALLBACK_FAMILY } from "../../lib/fonts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/table";
import { Badge } from "../../components/badge";
import { Divider } from "../../components/divider";
import { Heading, TextBlock } from "../../components/typography";

export type SubjectGrade = {
  subject: string;
  score: number;
  grade: string;
  remarks: string;
};

export type StudentReportData = {
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

function Header({ data, fontFamily }: { data: StudentReportData; fontFamily: string }) {
  const t = usePDFTheme();
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <View>
          <Heading level={2}>{data.school.name}</Heading>
          <TextBlock variant="small" color={t.colors.muted}>
            {data.school.address}
          </TextBlock>
          <TextBlock variant="small" color={t.colors.muted}>
            {data.school.contact}
          </TextBlock>
        </View>
        <View style={styles.headerRight}>
          <Badge variant="outline">ACADEMIC REPORT</Badge>
          <TextBlock variant="small" color={t.colors.muted}>
            {data.period}
          </TextBlock>
        </View>
      </View>
      <Divider style={styles.headerDivider} />
    </View>
  );
}

function StudentInfo({ data }: { data: StudentReportData }) {
  const t = usePDFTheme();
  const fields: [string, string][] = [
    ["Student Name", data.student.name],
    ["Student ID", data.student.id],
    ["Grade / Section", `${data.student.grade} – ${data.student.section}`],
    ["Academic Year", data.student.year],
  ];
  const Field = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoCell}>
      <TextBlock variant="small" color={t.colors.mutedForeground} style={styles.infoLabel}>
        {label}
      </TextBlock>
      <TextBlock style={styles.infoValue}>{value}</TextBlock>
    </View>
  );
  return (
    <Card style={styles.section}>
      <CardHeader>
        <CardTitle>Student Information</CardTitle>
      </CardHeader>
      <CardContent>
        <View style={styles.infoGrid}>
          <Field label={fields[0][0]} value={fields[0][1]} />
          <Field label={fields[1][0]} value={fields[1][1]} />
          <Field label={fields[2][0]} value={fields[2][1]} />
          <Field label={fields[3][0]} value={fields[3][1]} />
        </View>
      </CardContent>
    </Card>
  );
}

function Summary({ data }: { data: StudentReportData }) {
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
          <TextBlock variant="small" color={t.colors.mutedForeground} style={styles.statLabel}>
            {s.label}
          </TextBlock>
          <Heading level={2} style={styles.statValue}>{s.value}</Heading>
          <TextBlock variant="small" color={t.colors.muted}>{s.sub}</TextBlock>
        </View>
      ))}
    </View>
  );
}

function Grades({ data }: { data: StudentReportData }) {
  return (
    <Card style={styles.section}>
      <CardHeader>
        <CardTitle>Subject Grades</CardTitle>
        <CardDescription>Performance for {data.period}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableHead width="40%">Subject</TableHead>
            <TableHead align="right" width="18%">Score</TableHead>
            <TableHead align="center" width="15%">Grade</TableHead>
            <TableHead>Remarks</TableHead>
          </TableHeader>
          <TableBody>
            {data.subjects.map((subj, i) => {
              const { grade, variant } = letterGrade(subj.score);
              return (
                <TableRow key={subj.subject} isLast={i === data.subjects.length - 1}>
                  <TableCell width="40%">{subj.subject}</TableCell>
                  <TableCell align="right" width="18%">{subj.score}</TableCell>
                  <TableCell align="center" width="15%">
                    <Badge variant={variant}>{grade}</Badge>
                  </TableCell>
                  <TableCell>
                    <TextBlock variant="small" color={theme.colors.muted}>{subj.remarks}</TextBlock>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function Attendance({ data }: { data: StudentReportData }) {
  const t = usePDFTheme();
  const items: { label: string; value: number }[] = [
    { label: "Present", value: data.attendance.present },
    { label: "Absent", value: data.attendance.absent },
    { label: "Late", value: data.attendance.late },
  ];
  const total = items.reduce((s, i) => s + i.value, 0);
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <Card style={styles.section}>
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
      </CardHeader>
      <CardContent>
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
                  <TextBlock variant="small">{i.label}</TextBlock>
                  <TextBlock variant="small" color={t.colors.muted}>{i.value} · {pct}%</TextBlock>
                </View>
              </View>
            );
          })}
        </View>
      </CardContent>
    </Card>
  );
}

function TeacherComments({ data }: { data: StudentReportData }) {
  const t = usePDFTheme();
  return (
    <Card style={styles.section}>
      <CardHeader>
        <CardTitle>Teacher's Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <TextBlock>{data.comments ?? "—"}</TextBlock>
      </CardContent>
    </Card>
  );
}

function Signatures({ data }: { data: StudentReportData }) {
  const t = usePDFTheme();
  return (
    <View style={styles.signatureRow}>
      <View style={styles.signatureCell}>
        <Divider />
        <TextBlock variant="small" color={t.colors.muted}>Class Teacher</TextBlock>
        <TextBlock variant="small">{data.teacher?.name ?? ""}</TextBlock>
      </View>
      <View style={styles.signatureCell}>
        <Divider />
        <TextBlock variant="small" color={t.colors.muted}>Principal</TextBlock>
        <TextBlock variant="small">{data.principal ?? ""}</TextBlock>
      </View>
      <View style={styles.signatureCell}>
        <Divider />
        <TextBlock variant="small" color={t.colors.muted}>Parent / Guardian</TextBlock>
        <TextBlock variant="small">____________</TextBlock>
      </View>
    </View>
  );
}

function PageFooter({ data, page }: { data: StudentReportData; page: number }) {
  const t = usePDFTheme();
  return (
    <View style={styles.pageFooter} fixed>
      <TextBlock variant="small" color={t.colors.muted}>
        {data.student.name} · {data.student.id} · Page {page}
      </TextBlock>
      <TextBlock variant="small" color={t.colors.muted}>{data.school.name}</TextBlock>
    </View>
  );
}

function ReportContent({ data, fontFamily }: { data: StudentReportData; fontFamily: string }) {
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

export function StudentReport({
  data,
  theme: customTheme,
  fontFamily,
}: {
  data: StudentReportData;
  theme?: Partial<typeof theme>;
  fontFamily?: string;
}) {
  return (
    <PDFProvider value={customTheme}>
      <Document
        title={`Report Card — ${data.student.name}`}
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