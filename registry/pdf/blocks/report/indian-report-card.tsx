import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDFProvider, usePDFTheme } from "../../lib/provider";
import { theme } from "../../lib/theme";
import { FALLBACK_FAMILY } from "../../lib/fonts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../components/table";
import { Badge } from "../../components/badge";
import { Divider } from "../../components/divider";
import { Heading, TextBlock } from "../../components/typography";

export type IndianSubject = {
  subject: string;
  maxMarks: number;
  theory: number;
  internal: number;
  total: number;
};

export type IndianReportCardData = {
  student: {
    name: string;
    fatherName: string;
    motherName: string;
    rollNo: string;
    admissionNo: string;
    dob: string;
    aadhar?: string;
    class: string;
    section: string;
    year: string;
  };
  school: {
    name: string;
    board: string;
    affiliationNo: string;
    address: string;
    contact: string;
    motto?: string;
  };
  examName: string;
  session: string;
  subjects: IndianSubject[];
  attendance: { present: number; total: number };
  overallGrade?: string;
  result?: string;
  activities?: string[];
  teacherRemarks?: string;
  classTeacher?: string;
  principal?: string;
  controller?: string;
};

const cbseGrade = (pct: number): { grade: string; points: number; variant: "default" | "success" | "secondary" | "outline" | "destructive" } => {
  if (pct >= 91) return { grade: "A1", points: 10, variant: "success" };
  if (pct >= 81) return { grade: "A2", points: 9, variant: "success" };
  if (pct >= 71) return { grade: "B1", points: 8, variant: "default" };
  if (pct >= 61) return { grade: "B2", points: 7, variant: "default" };
  if (pct >= 51) return { grade: "C1", points: 6, variant: "secondary" };
  if (pct >= 41) return { grade: "C2", points: 5, variant: "secondary" };
  if (pct >= 33) return { grade: "D", points: 4, variant: "outline" };
  return { grade: "E", points: 0, variant: "destructive" };
};

const pctOf = (total: number, max: number) => (max ? (total / max) * 100 : 0);

function ReportHeader({ data }: { data: IndianReportCardData }) {
  const t = usePDFTheme();
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.brand}>
          <Heading level={2} align="center">{data.school.name}</Heading>
          <TextBlock variant="small" color={t.colors.muted} align="center">{data.school.motto}</TextBlock>
        </View>
      </View>
      <View style={styles.boardBadge}>
        <Badge variant="default">{data.school.board}</Badge>
        <TextBlock variant="small" color={t.colors.muted} align="center">
          Affil. No. {data.school.affiliationNo}
        </TextBlock>
      </View>
      <View style={styles.headerMeta}>
        <TextBlock variant="small" color={t.colors.muted} align="center">{data.school.address}</TextBlock>
        <TextBlock variant="small" color={t.colors.muted} align="center">{data.school.contact}</TextBlock>
      </View>
      <View style={styles.titleBar}>
        <Heading level={3} align="center">{data.examName}</Heading>
        <TextBlock variant="small" color={t.colors.muted} align="center">Session {data.session}</TextBlock>
      </View>
      <Divider style={styles.headerDivider} />
    </View>
  );
}

function Profile({ data }: { data: IndianReportCardData }) {
  const t = usePDFTheme();
  const fields: [string, string][] = [
    ["Student Name", data.student.name],
    ["Father's Name", data.student.fatherName],
    ["Mother's Name", data.student.motherName],
    ["Roll No.", data.student.rollNo],
    ["Admission No.", data.student.admissionNo],
    ["Date of Birth", data.student.dob],
    ["Class", `${data.student.class} – ${data.student.section}`],
    ["Academic Year", data.student.year],
    ...(data.student.aadhar ? [["Aadhaar (Last 4)", data.student.aadhar] as [string, string]] : []),
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
        <CardTitle>Student Details</CardTitle>
      </CardHeader>
      <CardContent>
        <View style={styles.infoGrid}>
          {fields.map(([label, value]) => (
            <Field key={label} label={label} value={value} />
          ))}
        </View>
      </CardContent>
    </Card>
  );
}

function Marksheet({ data }: { data: IndianReportCardData }) {
  const t = usePDFTheme();
  let totalMax = 0;
  let totalObtained = 0;
  data.subjects.forEach((s) => {
    totalMax += s.maxMarks;
    totalObtained += s.total;
  });
  const overallPct = pctOf(totalObtained, totalMax);
  const overall = cbseGrade(overallPct);
  const cgpa = overall.points;

  return (
    <Card style={styles.section}>
      <CardHeader>
        <CardTitle>Statement of Marks</CardTitle>
        <CardDescription>Grade points are awarded on the CBSE 10-point scale</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableHead width="32%">Subject</TableHead>
            <TableHead align="center" width="16%">Max Marks</TableHead>
            <TableHead align="center" width="18%">Theory</TableHead>
            <TableHead align="center" width="18%">Internal</TableHead>
            <TableHead align="center" width="16%">Total</TableHead>
          </TableHeader>
          <TableBody>
            {data.subjects.map((s, i) => {
              const pct = pctOf(s.total, s.maxMarks);
              const g = cbseGrade(pct);
              return (
                <TableRow key={s.subject} isLast={i === data.subjects.length - 1}>
                  <TableCell width="32%">{s.subject}</TableCell>
                  <TableCell align="center" width="16%">
                    <TextBlock color={t.colors.muted}>{s.maxMarks}</TextBlock>
                  </TableCell>
                  <TableCell align="center" width="18%">{s.theory}</TableCell>
                  <TableCell align="center" width="18%">{s.internal}</TableCell>
                  <TableCell align="center" width="16%">
                    <View style={styles.marksCell}>
                      <Text>{s.total}</Text>
                      <Badge variant={g.variant}>{g.grade} · {g.points}</Badge>
                    </View>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <View style={styles.totalRow}>
          <View>
            <TextBlock variant="small" color={t.colors.mutedForeground}>Grand Total</TextBlock>
            <Heading level={3}>{totalObtained} / {totalMax}</Heading>
            <TextBlock variant="small" color={t.colors.muted}>
              Percentage: {overallPct.toFixed(2)}%
            </TextBlock>
          </View>
          <View style={styles.totalRight}>
            <TextBlock variant="small" color={t.colors.mutedForeground}>CGPA</TextBlock>
            <Heading level={2}>{cgpa.toFixed(2)}</Heading>
            <TextBlock variant="small" color={t.colors.muted}>out of 10</TextBlock>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}

function ResultCard({ data, cgpa }: { data: IndianReportCardData; cgpa: number }) {
  const t = usePDFTheme();
  const result = data.result ?? (cgpa >= 4 ? "PASS" : "FAIL");
  const passed = result.toUpperCase() === "PASS";
  return (
    <Card style={styles.section}>
      <CardHeader>
        <CardTitle>Result Declaration</CardTitle>
      </CardHeader>
      <CardContent>
        <View style={styles.resultRow}>
          <View style={styles.resultItem}>
            <TextBlock variant="small" color={t.colors.mutedForeground}>Overall Grade</TextBlock>
            <Heading level={3}>{data.overallGrade ?? (passed ? "A2" : "E")}</Heading>
          </View>
          <View style={styles.resultItem}>
            <TextBlock variant="small" color={t.colors.mutedForeground}>CGPA</TextBlock>
            <Heading level={3}>{cgpa.toFixed(2)}</Heading>
          </View>
          <View style={styles.resultItem}>
            <TextBlock variant="small" color={t.colors.mutedForeground}>Attendance</TextBlock>
            <Heading level={3}>
              {Math.round((data.attendance.present / Math.max(data.attendance.total, 1)) * 100)}%
            </Heading>
          </View>
          <View style={styles.resultItem}>
            <TextBlock variant="small" color={t.colors.mutedForeground}>Result</TextBlock>
            <Badge variant={passed ? "success" : "destructive"}>{result}</Badge>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}

function Activities({ data }: { data: IndianReportCardData }) {
  if (!data.activities?.length) return null;
  return (
    <Card style={styles.section}>
      <CardHeader>
        <CardTitle>Co-Curricular Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <View style={styles.achList}>
          {data.activities.map((a, i) => (
            <View key={i} style={styles.achRow}>
              <Badge variant="secondary" style={styles.achBullet}>{i + 1}</Badge>
              <TextBlock variant="small">{a}</TextBlock>
            </View>
          ))}
        </View>
      </CardContent>
    </Card>
  );
}

function TeacherRemarks({ data }: { data: IndianReportCardData }) {
  return (
    <Card style={styles.section}>
      <CardHeader>
        <CardTitle>Class Teacher's Remarks</CardTitle>
      </CardHeader>
      <CardContent>
        <TextBlock>{data.teacherRemarks ?? "—"}</TextBlock>
      </CardContent>
    </Card>
  );
}

function Signatures({ data }: { data: IndianReportCardData }) {
  const t = usePDFTheme();
  const sigs: [string, string][] = [
    ["Class Teacher", data.classTeacher ?? ""],
    ["Principal", data.principal ?? ""],
    ["Controller of Examinations", data.controller ?? ""],
  ];
  return (
    <View style={styles.signatureRow}>
      {sigs.map(([label, name]) => (
        <View key={label} style={styles.signatureCell}>
          <Divider />
          <TextBlock variant="small" color={t.colors.muted}>{label}</TextBlock>
          <TextBlock variant="small">{name}</TextBlock>
        </View>
      ))}
    </View>
  );
}

function PageFooter({ data, page }: { data: IndianReportCardData; page: number }) {
  const t = usePDFTheme();
  return (
    <View style={styles.pageFooter} fixed>
      <TextBlock variant="small" color={t.colors.muted}>
        {data.student.name} · Roll No. {data.student.rollNo} · Page {page}
      </TextBlock>
      <TextBlock variant="small" color={t.colors.muted}>{data.school.board}</TextBlock>
    </View>
  );
}

function ReportContent({ data, fontFamily }: { data: IndianReportCardData; fontFamily: string }) {
  let totalMax = 0;
  let totalObtained = 0;
  data.subjects.forEach((s) => {
    totalMax += s.maxMarks;
    totalObtained += s.total;
  });
  const cgpa = cbseGrade(pctOf(totalObtained, totalMax)).points;

  return (
    <>
      <Page size="A4" style={[styles.page, { fontFamily }]}>
        <ReportHeader data={data} />
        <Profile data={data} />
        <PageFooter data={data} page={1} />
      </Page>

      <Page size="A4" style={[styles.page, { fontFamily }]}>
        <ReportHeader data={data} />
        <Marksheet data={data} />
        <ResultCard data={data} cgpa={cgpa} />
        <PageFooter data={data} page={2} />
      </Page>

      <Page size="A4" style={[styles.page, { fontFamily }]}>
        <ReportHeader data={data} />
        <Activities data={data} />
        <TeacherRemarks data={data} />
        <Signatures data={data} />
        <PageFooter data={data} page={3} />
      </Page>
    </>
  );
}

export function IndianReportCard({
  data,
  theme: customTheme,
  fontFamily,
}: {
  data: IndianReportCardData;
  theme?: Partial<typeof theme>;
  fontFamily?: string;
}) {
  return (
    <PDFProvider value={customTheme}>
      <Document
        title={`Report Card — ${data.student.name}`}
        author={data.school.name}
        subject={`${data.examName} · ${data.session}`}
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
  header: {
    marginBottom: theme.spacing[4],
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "center",
  },
  brand: {
    flexDirection: "column",
    alignItems: "center",
  },
  boardBadge: {
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing[1],
    marginTop: theme.spacing[2],
  },
  headerMeta: {
    marginTop: theme.spacing[2],
    gap: 1,
  },
  titleBar: {
    marginTop: theme.spacing[2],
    gap: 2,
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
    width: "33.33%",
    paddingVertical: theme.spacing[1],
    paddingRight: theme.spacing[3],
  },
  infoLabel: { marginBottom: 2 },
  infoValue: { fontWeight: 600 },
  marksCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[2],
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing[4],
    paddingTop: theme.spacing[3],
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    borderTopStyle: "solid",
  },
  totalRight: {
    alignItems: "flex-end",
  },
  resultRow: {
    flexDirection: "row",
    gap: theme.spacing[3],
  },
  resultItem: {
    flex: 1,
    flexDirection: "column",
    gap: theme.spacing[1],
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