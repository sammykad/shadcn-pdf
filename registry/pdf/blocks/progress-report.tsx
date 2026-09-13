import * as React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { PDFProvider, usePDFTheme } from "@/components/pdf/provider";
import { theme } from "@/components/pdf/theme";
import { FALLBACK_FAMILY } from "@/components/pdf/fonts";
import { PDFCard, PDFCardHeader, PDFCardTitle, PDFCardContent } from "@/components/pdf/card";
import { PDFTable, PDFTableHeader, PDFTableBody, PDFTableRow, PDFTableHead, PDFTableCell } from "@/components/pdf/table";
import { PDFBadge } from "@/components/pdf/badge";
import { PDFDivider } from "@/components/pdf/divider";
import { PDFText } from "@/components/pdf";

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
  const t = usePDFTheme();
  return (
    <View style={styles.topBar}>
      <View style={styles.topBarLeft}>
        <PDFText variant="h1" style={styles.schoolName}>{data.school.name}</PDFText>
        {data.school.motto && (
          <PDFText variant="small" color={t.colors.mutedForeground}>{data.school.motto}</PDFText>
        )}
      </View>
      <View style={styles.topBarRight}>
        <PDFBadge variant="default">PROGRESS REPORT</PDFBadge>
        <PDFText variant="small" color={t.colors.mutedForeground}>{data.student.term}</PDFText>
      </View>
    </View>
  );
}

function StudentBar({ data }: { data: ProgressData }) {
  const t = usePDFTheme();
  return (
    <View style={styles.studentBar}>
      <View style={styles.studentField}>
        <PDFText variant="small" color={t.colors.mutedForeground}>Name</PDFText>
        <PDFText style={styles.studentValue}>{data.student.name}</PDFText>
      </View>
      <View style={styles.studentField}>
        <PDFText variant="small" color={t.colors.mutedForeground}>ID</PDFText>
        <PDFText style={styles.studentValue}>{data.student.id}</PDFText>
      </View>
      <View style={styles.studentField}>
        <PDFText variant="small" color={t.colors.mutedForeground}>Grade</PDFText>
        <PDFText style={styles.studentValue}>{data.student.grade}</PDFText>
      </View>
      <View style={styles.studentField}>
        <PDFText variant="small" color={t.colors.mutedForeground}>Attendance</PDFText>
        <PDFText style={styles.studentValue}>
          {data.attendance.present}/{data.attendance.total} ({Math.round((data.attendance.present / data.attendance.total) * 100)}%)
        </PDFText>
      </View>
    </View>
  );
}

function GradeTable({ data }: { data: ProgressData }) {
  return (
    <PDFCard style={styles.tableCard}>
      <PDFCardHeader>
        <PDFCardTitle>Academic Performance</PDFCardTitle>
      </PDFCardHeader>
      <PDFCardContent>
        <PDFTable>
          <PDFTableHeader>
            <PDFTableHead className="w-[30%]">Subject</PDFTableHead>
            <PDFTableHead className="w-[15%] justify-center text-center">CA (40)</PDFTableHead>
            <PDFTableHead className="w-[15%] justify-center text-center">Exam (60)</PDFTableHead>
            <PDFTableHead className="w-[15%] justify-center text-center">Total</PDFTableHead>
            <PDFTableHead className="w-[12%] justify-center text-center">Grade</PDFTableHead>
            <PDFTableHead>Remark</PDFTableHead>
          </PDFTableHeader>
          <PDFTableBody>
            {data.subjects.map((s, i) => (
              <PDFTableRow key={s.name} className={i === data.subjects.length - 1 ? "border-b-0" : undefined}>
                <PDFTableCell className="w-[30%]">{s.name}</PDFTableCell>
                <PDFTableCell className="w-[15%] justify-center text-center">{s.ca}</PDFTableCell>
                <PDFTableCell className="w-[15%] justify-center text-center">{s.exam}</PDFTableCell>
                <PDFTableCell className="w-[15%] justify-center text-center" style={{ fontWeight: 600 }}>{s.total}</PDFTableCell>
                <PDFTableCell className="w-[12%] justify-center text-center">
                  <PDFBadge variant={gradeColor(s.grade)}>{s.grade}</PDFBadge>
                </PDFTableCell>
                <PDFTableCell>
                  <PDFText variant="small" color={theme.colors.muted}>{s.remark}</PDFText>
                </PDFTableCell>
              </PDFTableRow>
            ))}
          </PDFTableBody>
        </PDFTable>
      </PDFCardContent>
    </PDFCard>
  );
}

function Comments({ data }: { data: ProgressData }) {
  const t = usePDFTheme();
  return (
    <View style={styles.commentsRow}>
      <PDFCard style={styles.commentCard}>
        <PDFCardHeader>
          <PDFCardTitle>Class Teacher</PDFCardTitle>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFText>{data.teacherComment}</PDFText>
          <View style={styles.signatureLine}>
            <PDFDivider style={styles.divider} />
            <PDFText variant="small" color={t.colors.mutedForeground}>{data.signature.teacher}</PDFText>
          </View>
        </PDFCardContent>
      </PDFCard>
      <PDFCard style={styles.commentCard}>
        <PDFCardHeader>
          <PDFCardTitle>Principal</PDFCardTitle>
        </PDFCardHeader>
        <PDFCardContent>
          <PDFText>{data.principalComment}</PDFText>
          <View style={styles.signatureLine}>
            <PDFDivider style={styles.divider} />
            <PDFText variant="small" color={t.colors.mutedForeground}>{data.signature.principal}</PDFText>
          </View>
        </PDFCardContent>
      </PDFCard>
    </View>
  );
}

function Footer({ data }: { data: ProgressData }) {
  const t = usePDFTheme();
  return (
    <View style={styles.footer} fixed>
      <PDFText variant="small" color={t.colors.muted}>
        {data.school.name} · {data.student.name} · {data.student.id}
      </PDFText>
    </View>
  );
}

function ReportContent({ data, fontFamily }: { data: ProgressData; fontFamily: string }) {
  return (
    <Page size="A4" style={[styles.page, { fontFamily }]}>
      <TopBar data={data} />
      <StudentBar data={data} />
      <PDFDivider style={styles.sectionDivider} />
      <GradeTable data={data} />
      <Comments data={data} />
      <Footer data={data} />
    </Page>
  );
}

export function PDFProgressReport({
  data,
  theme: customTheme,
  fontFamily,
}: {
  data: ProgressData;
  theme?: Partial<typeof theme>;
  fontFamily?: string;
}) {
  return (
    <PDFProvider value={customTheme}>
      <Document
        title={`Progress Report — ${data.student.name}`}
        author={data.school.name}
        subject={data.student.term}
      >
        <ReportContent data={data} fontFamily={fontFamily ?? FALLBACK_FAMILY} />
      </Document>
    </PDFProvider>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing[8],
    paddingBottom: theme.spacing[12],
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing[4],
  },
  topBarLeft: { flex: 1 },
  topBarRight: {
    alignItems: "flex-end",
    gap: theme.spacing[2],
  },
  schoolName: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 2,
  },
  studentBar: {
    flexDirection: "row",
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[4],
    gap: theme.spacing[6],
  },
  studentField: {
    flex: 1,
    gap: 2,
  },
  studentValue: {
    fontWeight: 600,
    fontSize: 10,
  },
  tableCard: {
    marginBottom: theme.spacing[4],
  },
  commentsRow: {
    flexDirection: "row",
    gap: theme.spacing[3],
  },
  commentCard: {
    flex: 1,
  },
  signatureLine: {
    marginTop: theme.spacing[4],
    gap: theme.spacing[1],
  },
  divider: {
    marginBottom: theme.spacing[1],
  },
  sectionDivider: {
    marginBottom: theme.spacing[4],
  },
  footer: {
    position: "absolute",
    left: theme.spacing[8],
    right: theme.spacing[8],
    bottom: theme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    borderTopStyle: "solid",
    paddingTop: theme.spacing[2],
    flexDirection: "row",
    justifyContent: "center",
  },
});
