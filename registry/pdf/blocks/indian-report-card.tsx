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

export type IndianSubject = {
  subject: string;
  maxMarks: number;
  theory: number;
  internal: number;
  total: number;
};

export type PDFIndianReportCardData = {
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

function ReportHeader({ data }: { data: PDFIndianReportCardData }) {
  const t = usePDFTheme();
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.brand}>
          <PDFHeading level={2} align="center">{data.school.name}</PDFHeading>
          <PDFText variant="small" color={t.colors.muted} align="center">{data.school.motto}</PDFText>
        </View>
      </View>
      <View style={styles.boardBadge}>
        <PDFBadge variant="default">{data.school.board}</PDFBadge>
        <PDFText variant="small" color={t.colors.muted} align="center">
          Affil. No. {data.school.affiliationNo}
        </PDFText>
      </View>
      <View style={styles.headerMeta}>
        <PDFText variant="small" color={t.colors.muted} align="center">{data.school.address}</PDFText>
        <PDFText variant="small" color={t.colors.muted} align="center">{data.school.contact}</PDFText>
      </View>
      <View style={styles.titleBar}>
        <PDFHeading level={3} align="center">{data.examName}</PDFHeading>
        <PDFText variant="small" color={t.colors.muted} align="center">Session {data.session}</PDFText>
      </View>
      <PDFDivider style={styles.headerDivider} />
    </View>
  );
}

function Profile({ data }: { data: PDFIndianReportCardData }) {
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
        <PDFCardTitle>Student Details</PDFCardTitle>
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

function Marksheet({ data }: { data: PDFIndianReportCardData }) {
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
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Statement of Marks</PDFCardTitle>
        <PDFCardDescription>Grade points are awarded on the CBSE 10-point scale</PDFCardDescription>
      </PDFCardHeader>
      <PDFCardContent>
        <PDFTable>
          <PDFTableHeader>
            <PDFTableHead className="w-[32%]">Subject</PDFTableHead>
            <PDFTableHead className="w-[16%] justify-center text-center">Max Marks</PDFTableHead>
            <PDFTableHead className="w-[18%] justify-center text-center">Theory</PDFTableHead>
            <PDFTableHead className="w-[18%] justify-center text-center">Internal</PDFTableHead>
            <PDFTableHead className="w-[16%] justify-center text-center">Total</PDFTableHead>
          </PDFTableHeader>
          <PDFTableBody>
            {data.subjects.map((s, i) => {
              const pct = pctOf(s.total, s.maxMarks);
              const g = cbseGrade(pct);
              return (
                <PDFTableRow key={s.subject} className={i === data.subjects.length - 1 ? "border-b-0" : undefined}>
                  <PDFTableCell className="w-[32%]">{s.subject}</PDFTableCell>
                  <PDFTableCell className="w-[16%] justify-center text-center">
                    <PDFText color={t.colors.muted}>{s.maxMarks}</PDFText>
                  </PDFTableCell>
                  <PDFTableCell className="w-[18%] justify-center text-center">{s.theory}</PDFTableCell>
                  <PDFTableCell className="w-[18%] justify-center text-center">{s.internal}</PDFTableCell>
                  <PDFTableCell className="w-[16%] justify-center text-center">
                    <View style={styles.marksCell}>
                      <Text>{s.total}</Text>
                      <PDFBadge variant={g.variant}>{g.grade} · {g.points}</PDFBadge>
                    </View>
                  </PDFTableCell>
                </PDFTableRow>
              );
            })}
          </PDFTableBody>
        </PDFTable>

        <View style={styles.totalRow}>
          <View>
            <PDFText variant="small" color={t.colors.mutedForeground}>Grand Total</PDFText>
            <PDFHeading level={3}>{totalObtained} / {totalMax}</PDFHeading>
            <PDFText variant="small" color={t.colors.muted}>
              Percentage: {overallPct.toFixed(2)}%
            </PDFText>
          </View>
          <View style={styles.totalRight}>
            <PDFText variant="small" color={t.colors.mutedForeground}>CGPA</PDFText>
            <PDFHeading level={2}>{cgpa.toFixed(2)}</PDFHeading>
            <PDFText variant="small" color={t.colors.muted}>out of 10</PDFText>
          </View>
        </View>
      </PDFCardContent>
    </PDFCard>
  );
}

function ResultCard({ data, cgpa }: { data: PDFIndianReportCardData; cgpa: number }) {
  const t = usePDFTheme();
  const result = data.result ?? (cgpa >= 4 ? "PASS" : "FAIL");
  const passed = result.toUpperCase() === "PASS";
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Result Declaration</PDFCardTitle>
      </PDFCardHeader>
      <PDFCardContent>
        <View style={styles.resultRow}>
          <View style={styles.resultItem}>
            <PDFText variant="small" color={t.colors.mutedForeground}>Overall Grade</PDFText>
            <PDFHeading level={3}>{data.overallGrade ?? (passed ? "A2" : "E")}</PDFHeading>
          </View>
          <View style={styles.resultItem}>
            <PDFText variant="small" color={t.colors.mutedForeground}>CGPA</PDFText>
            <PDFHeading level={3}>{cgpa.toFixed(2)}</PDFHeading>
          </View>
          <View style={styles.resultItem}>
            <PDFText variant="small" color={t.colors.mutedForeground}>Attendance</PDFText>
            <PDFHeading level={3}>
              {Math.round((data.attendance.present / Math.max(data.attendance.total, 1)) * 100)}%
            </PDFHeading>
          </View>
          <View style={styles.resultItem}>
            <PDFText variant="small" color={t.colors.mutedForeground}>Result</PDFText>
            <PDFBadge variant={passed ? "success" : "destructive"}>{result}</PDFBadge>
          </View>
        </View>
      </PDFCardContent>
    </PDFCard>
  );
}

function Activities({ data }: { data: PDFIndianReportCardData }) {
  if (!data.activities?.length) return null;
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Co-Curricular Activities</PDFCardTitle>
      </PDFCardHeader>
      <PDFCardContent>
        <View style={styles.achList}>
          {data.activities.map((a, i) => (
            <View key={i} style={styles.achRow}>
              <PDFBadge variant="secondary" style={styles.achBullet}>{i + 1}</PDFBadge>
              <PDFText variant="small">{a}</PDFText>
            </View>
          ))}
        </View>
      </PDFCardContent>
    </PDFCard>
  );
}

function TeacherRemarks({ data }: { data: PDFIndianReportCardData }) {
  return (
    <PDFCard style={styles.section}>
      <PDFCardHeader>
        <PDFCardTitle>Class Teacher's Remarks</PDFCardTitle>
      </PDFCardHeader>
      <PDFCardContent>
        <PDFText>{data.teacherRemarks ?? "—"}</PDFText>
      </PDFCardContent>
    </PDFCard>
  );
}

function Signatures({ data }: { data: PDFIndianReportCardData }) {
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
          <PDFDivider />
          <PDFText variant="small" color={t.colors.muted}>{label}</PDFText>
          <PDFText variant="small">{name}</PDFText>
        </View>
      ))}
    </View>
  );
}

function PageFooter({ data, page }: { data: PDFIndianReportCardData; page: number }) {
  const t = usePDFTheme();
  return (
    <View style={styles.pageFooter} fixed>
      <PDFText variant="small" color={t.colors.muted}>
        {data.student.name} · Roll No. {data.student.rollNo} · Page {page}
      </PDFText>
      <PDFText variant="small" color={t.colors.muted}>{data.school.board}</PDFText>
    </View>
  );
}

function ReportContent({ data, fontFamily }: { data: PDFIndianReportCardData; fontFamily: string }) {
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

export function PDFIndianReportCard({
  data,
  theme: customTheme,
  fontFamily,
}: {
  data: PDFIndianReportCardData;
  theme?: Partial<typeof theme>;
  fontFamily?: string;
}) {
  return (
    <PDFProvider value={customTheme}>
      <Document
        title={`Report PDFCard — ${data.student.name}`}
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