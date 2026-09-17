import * as React from "react";
import {
  PDFDocument,
  PDFPage,
  PDFHeader,
  PDFFooter,
  PDFText,
  PDFContainer,
} from "@/components/pdf";
import { PDFSection, PDFField } from "@/components/pdf/section";
import {
  PDFTable,
  PDFTableHeader,
  PDFTableBody,
  PDFTableRow,
  PDFTableHead,
  PDFTableCell,
} from "@/components/pdf/table";
import { PDFBadge } from "@/components/pdf/badge";

export type AuditAction = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "EXPORT" | "DOWNLOAD";
export type AuditStatus = "SUCCESS" | "FAILED";
export type AuditSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";

export type AuditChange = { field: string; before: string; after: string };

export type AuditEvent = {
  id: string;
  ts: string;
  fullTs: string;
  actor: string;
  email?: string;
  action: AuditAction;
  resource: string;
  resourceId: string;
  status: AuditStatus;
  severity: AuditSeverity;
  ip: string;
  userAgent?: string;
  changes?: AuditChange[];
};

export type AuditLogReportData = {
  organization: {
    name: string;
    brand: string;
    reportTitle: string;
    reportId: string;
  };
  metadata: {
    org: string;
    periodLabel: string;
    generated: string;
    generatedBy: string;
  };
  filters: { label: string; value: string }[];
  events: AuditEvent[];
};

const ROWS_PER_PAGE = 14;
const DETAIL_EVENTS_PER_PAGE = 1;

const severityVariant: Record<AuditSeverity, "destructive" | "default" | "secondary" | "outline" | "ghost"> = {
  CRITICAL: "destructive",
  HIGH: "default",
  MEDIUM: "secondary",
  LOW: "outline",
  INFO: "ghost",
};

const ACTION_COLORS: Record<AuditAction, string> = {
  LOGIN: "bg-zinc-400",
  CREATE: "bg-blue-500",
  UPDATE: "bg-zinc-800",
  DELETE: "bg-red-500",
  EXPORT: "bg-sky-500",
  DOWNLOAD: "bg-violet-500",
};

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function deriveMetrics(events: AuditEvent[]) {
  const total = events.length;
  const success = events.filter((e) => e.status === "SUCCESS").length;
  const failed = events.filter((e) => e.status === "FAILED").length;
  const users = new Set(events.map((e) => e.actor)).size;
  const ips = new Set(events.map((e) => e.ip)).size;
  const critical = events.filter((e) => e.severity === "CRITICAL").length;
  return { total, success, failed, users, ips, critical };
}

function deriveActionCounts(events: AuditEvent[]) {
  const counts: Partial<Record<AuditAction, number>> = {};
  for (const e of events) counts[e.action] = (counts[e.action] ?? 0) + 1;
  return ACTIONS.filter((a) => (counts[a] ?? 0) > 0).sort((a, b) => (counts[b] ?? 0) - (counts[a] ?? 0));
}

const ACTIONS: AuditAction[] = ["UPDATE", "CREATE", "LOGIN", "EXPORT", "DOWNLOAD", "DELETE"];

function Bar({ label, count, max, color }: { label: string; count: number; max: number; color: string }) {
  const pct = max ? Math.round((count / max) * 100) : 0;
  return (
    <PDFContainer className="flex flex-row items-center gap-2">
      <PDFText variant="small" className="text-muted" style={{ minWidth: 68 }}>{label}</PDFText>
      <PDFContainer className="flex-1 flex flex-col rounded-full bg-zinc-100" style={{ height: 6 }}>
        <PDFContainer className={`rounded-full ${color}`} style={{ width: `${pct}%`, height: 6 }} />
      </PDFContainer>
      <PDFText variant="small" className="text-muted-foreground" style={{ minWidth: 28, textAlign: "right" }}>{count.toLocaleString()}</PDFText>
    </PDFContainer>
  );
}

function LogoMark() {
  return (
    <PDFContainer
      className="items-center justify-center rounded bg-zinc-900"
      style={{ width: 32, height: 32 }}
    >
      <PDFText variant="small" className="text-zinc-50" style={{ fontSize: 14, fontWeight: 700 }}>A</PDFText>
    </PDFContainer>
  );
}

function SummaryPage({ data, totalPages }: { data: AuditLogReportData; totalPages: number }) {
  const events = data.events;
  const metrics = deriveMetrics(events);
  const orderedActions = deriveActionCounts(events);
  const maxAction = Math.max(...orderedActions.map((a) => events.filter((e) => e.action === a).length));
  const successCount = metrics.success;
  const failedCount = metrics.failed;

  return (
    <PDFPage className="pb-16">
      <PDFHeader>
        <PDFContainer className="flex flex-row items-center gap-2">
          <LogoMark />
          <PDFText variant="h3">{data.organization.brand}</PDFText>
        </PDFContainer>
        <PDFBadge variant="outline">AUDIT REPORT</PDFBadge>
      </PDFHeader>

      <PDFSection as="plain" className="mb-2">
        <PDFText variant="h1">{data.organization.reportTitle}</PDFText>
        <PDFText variant="small" className="text-muted mt-0.5">
          {data.organization.reportId}
        </PDFText>
      </PDFSection>

      <PDFSection as="plain" className="mb-3">
        <PDFContainer className="flex flex-row flex-wrap gap-x-6 gap-y-0.5">
          {[
            ["Organization", data.metadata.org],
            ["Report Period", data.metadata.periodLabel],
            ["Generated", data.metadata.generated],
            ["Generated By", data.metadata.generatedBy],
            ["Report ID", data.organization.reportId],
          ].map(([l, v]) => (
            <PDFField key={l} label={l} value={v} />
          ))}
        </PDFContainer>
      </PDFSection>

      <PDFSection title="Summary" as="card" className="mb-3">
        <PDFContainer className="flex flex-row gap-2">
          <Kpi label="Total Events" value={metrics.total.toLocaleString()} pct={100} barColor="bg-zinc-800" />
          <Kpi label="Successful" value={metrics.success.toLocaleString()} pct={metrics.total ? Math.round((metrics.success / metrics.total) * 100) : 0} barColor="bg-green-500" />
          <Kpi label="Failed" value={metrics.failed.toLocaleString()} pct={metrics.total ? Math.round((metrics.failed / metrics.total) * 100) : 0} barColor="bg-red-500" />
        </PDFContainer>
        <PDFContainer className="flex flex-row gap-2 mt-2">
          <Kpi label="Unique Users" value={String(metrics.users)} pct={100} barColor="bg-blue-500" />
          <Kpi label="Unique IPs" value={String(metrics.ips)} pct={100} barColor="bg-violet-500" />
          <Kpi label="Critical" value={String(metrics.critical)} pct={metrics.total ? Math.round((metrics.critical / metrics.total) * 100) : 0} barColor="bg-red-600" />
        </PDFContainer>
      </PDFSection>

      <PDFSection title="Filters Applied" as="card" className="mb-3">
        <PDFContainer className="flex flex-row flex-wrap gap-x-8 gap-y-1">
          {data.filters.map((f) => (
            <PDFContainer key={f.label} className="flex flex-col gap-0.5" style={{ minWidth: 120 }}>
              <PDFText variant="small" className="text-muted-foreground">{f.label}</PDFText>
              <PDFText className="text-foreground">{f.value}</PDFText>
            </PDFContainer>
          ))}
        </PDFContainer>
      </PDFSection>

      <PDFSection title="Activity Breakdown" as="card">
        <PDFContainer className="flex flex-row gap-8">
          <PDFContainer className="flex flex-col gap-1.5 flex-1">
            <PDFText variant="small" className="text-muted-foreground uppercase tracking-wide mb-0.5">Activity by Action</PDFText>
            {orderedActions.map((a) => (
              <Bar
                key={a}
                label={a}
                count={events.filter((e) => e.action === a).length}
                max={maxAction}
                color={ACTION_COLORS[a]}
              />
            ))}
          </PDFContainer>
          <PDFContainer className="flex flex-col gap-1.5" style={{ minWidth: 140 }}>
            <PDFText variant="small" className="text-muted-foreground uppercase tracking-wide mb-0.5">Activity by Status</PDFText>
            <Bar label="SUCCESS" count={successCount} max={metrics.total} color="bg-green-500" />
            <Bar label="FAILED" count={failedCount} max={metrics.total} color="bg-red-500" />
          </PDFContainer>
        </PDFContainer>
      </PDFSection>

      <PDFFooter
        pageNumber={false}
        left={`${data.metadata.org} · Confidential — Internal Use Only`}
        right={`Page 1 of ${totalPages} · Generated by ${data.metadata.generatedBy}`}
      />
    </PDFPage>
  );
}

function Kpi({ label, value, pct, barColor }: { label: string; value: string; pct: number; barColor: string }) {
  return (
    <PDFContainer className="flex-1 flex flex-col gap-1 rounded-lg border border-muted p-2">
      <PDFText variant="small" className="text-muted-foreground">{label}</PDFText>
      <PDFText variant="h3" className="text-foreground">{value}</PDFText>
      <PDFContainer className="rounded-full bg-zinc-100" style={{ height: 4 }}>
        <PDFContainer className={`rounded-full ${barColor}`} style={{ width: `${pct}%`, height: 4 }} />
      </PDFContainer>
    </PDFContainer>
  );
}

function EventTablePage({
  rows,
  pageNumber,
  totalPages,
  data,
}: {
  rows: AuditEvent[];
  pageNumber: number;
  totalPages: number;
  data: AuditLogReportData;
}) {
  return (
    <PDFPage className="pb-16">
      <PDFSection title="Audit Events" as="card">
        <PDFTable>
          <PDFTableHeader>
            <PDFTableHead flex={1.6}>Time</PDFTableHead>
            <PDFTableHead flex={1.4}>Actor</PDFTableHead>
            <PDFTableHead flex={1.2}>Action</PDFTableHead>
            <PDFTableHead flex={1.3}>Resource</PDFTableHead>
            <PDFTableHead flex={1.3}>ID</PDFTableHead>
            <PDFTableHead flex={1.2}>Status</PDFTableHead>
            <PDFTableHead flex={1}>IP Address</PDFTableHead>
          </PDFTableHeader>
          <PDFTableBody>
            {rows.map((e, i) => (
              <PDFTableRow key={e.id} className={i === rows.length - 1 ? "border-b-0" : undefined}>
                <PDFTableCell flex={1.6}>
                  <PDFText variant="small">{e.ts}</PDFText>
                </PDFTableCell>
                <PDFTableCell flex={1.4}>
                  <PDFText>{e.actor}</PDFText>
                </PDFTableCell>
                <PDFTableCell flex={1.2}>
                  <PDFBadge variant={e.action === "DELETE" ? "destructive" : e.action === "LOGIN" && e.status === "FAILED" ? "default" : "outline"}>
                    {e.action}
                  </PDFBadge>
                </PDFTableCell>
                <PDFTableCell flex={1.3}>
                  <PDFText>{e.resource}</PDFText>
                </PDFTableCell>
                <PDFTableCell flex={1.3}>
                  <PDFText variant="small" className="text-muted">{e.resourceId}</PDFText>
                </PDFTableCell>
                <PDFTableCell flex={1.2}>
                  <PDFBadge variant={e.status === "SUCCESS" ? "success" : "destructive"}>
                    {e.status}
                  </PDFBadge>
                </PDFTableCell>
                <PDFTableCell flex={1}>
                  <PDFText variant="small" className="text-muted">{e.ip}</PDFText>
                </PDFTableCell>
              </PDFTableRow>
            ))}
          </PDFTableBody>
        </PDFTable>
      </PDFSection>

      <PDFFooter
        pageNumber={false}
        left={`${data.metadata.org} · Confidential — Internal Use Only`}
        right={`Page ${pageNumber} of ${totalPages} · Generated by ${data.metadata.generatedBy}`}
      />
    </PDFPage>
  );
}

function DetailEventCard({ event }: { event: AuditEvent }) {
  const fields: [string, React.ReactNode][] = [
    ["Actor", event.actor],
    ["Action", <PDFBadge variant={severityVariant[event.severity]}>{event.action}</PDFBadge>],
    ["Resource", event.resource],
    ["Resource ID", event.resourceId],
    ["Timestamp", event.fullTs],
    ["IP Address", event.ip],
    ["User Agent", event.userAgent ?? "—"],
    [
      "Status",
      <PDFBadge variant={event.status === "SUCCESS" ? "success" : "destructive"}>{event.status}</PDFBadge>,
    ],
  ];

  return (
    <PDFSection as="card" title={event.id} description={event.fullTs}>
      <PDFContainer className="flex flex-row flex-wrap gap-x-6 gap-y-2 mb-3">
        {fields.map(([label, value]) => (
          <PDFField key={label} label={label} value={value} />
        ))}
      </PDFContainer>

      {event.changes && event.changes.length > 0 && (
        <PDFContainer className="mt-2 pt-3 border-t">
          <PDFText variant="small" className="text-muted-foreground uppercase tracking-wide mb-2">Changes</PDFText>
          <PDFTable>
            <PDFTableHeader>
              <PDFTableHead className="w-[30%]">Field</PDFTableHead>
              <PDFTableHead className="w-[35%]">Before</PDFTableHead>
              <PDFTableHead className="w-[35%]">After</PDFTableHead>
            </PDFTableHeader>
            <PDFTableBody>
              {event.changes.map((c, i) => (
                <PDFTableRow key={c.field} className={i === event.changes!.length - 1 ? "border-b-0" : undefined}>
                  <PDFTableCell className="w-[30%]">{c.field}</PDFTableCell>
                  <PDFTableCell className="w-[35%]">
                    <PDFText variant="small" className="text-muted">{c.before}</PDFText>
                  </PDFTableCell>
                  <PDFTableCell className="w-[35%]">
                    <PDFText>{c.after}</PDFText>
                  </PDFTableCell>
                </PDFTableRow>
              ))}
            </PDFTableBody>
          </PDFTable>
        </PDFContainer>
      )}
    </PDFSection>
  );
}

function DetailPage({
  events,
  pageNumber,
  totalPages,
  data,
}: {
  events: AuditEvent[];
  pageNumber: number;
  totalPages: number;
  data: AuditLogReportData;
}) {
  return (
    <PDFPage className="pb-16">
      <PDFSection title="Event Details" description="Detailed view of critical audit events" as="plain" className="mb-2">
        <PDFContainer className="flex flex-col gap-3">
          {events.map((e) => (
            <DetailEventCard key={e.id} event={e} />
          ))}
        </PDFContainer>
      </PDFSection>

      <PDFFooter
        pageNumber={false}
        left={`${data.metadata.org} · Confidential — Internal Use Only`}
        right={`Page ${pageNumber} of ${totalPages} · Generated by ${data.metadata.generatedBy}`}
      />
    </PDFPage>
  );
}

export function PDFAuditLogReport({ data }: { data: AuditLogReportData }) {
  const tableChunks = chunk(data.events, ROWS_PER_PAGE);
  const tablePageCount = tableChunks.length;

  const criticalWithChanges = data.events.filter((e) => e.severity === "CRITICAL" && e.changes && e.changes.length > 0);
  const detailChunks = chunk(criticalWithChanges.length > 0 ? criticalWithChanges.slice(0, 9) : [], DETAIL_EVENTS_PER_PAGE);
  const detailPageCount = detailChunks.length > 0 ? detailChunks.length : 1;

  const totalPages = 1 + tablePageCount + detailPageCount;

  return (
    <PDFDocument
      title={`${data.organization.reportTitle} — ${data.metadata.periodLabel}`}
      author={data.metadata.org}
      subject={data.organization.reportId}
    >
      <SummaryPage data={data} totalPages={totalPages} />

      {tableChunks.map((rows, i) => (
        <EventTablePage
          key={i}
          rows={rows}
          pageNumber={2 + i}
          totalPages={totalPages}
          data={data}
        />
      ))}

      {detailChunks.map((events, i) => (
        <DetailPage
          key={events.map((e) => e.id).join("-") || i}
          events={events}
          pageNumber={1 + tablePageCount + i + 1}
          totalPages={totalPages}
          data={data}
        />
      ))}
    </PDFDocument>
  );
}