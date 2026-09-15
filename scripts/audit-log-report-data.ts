import {
  type AuditLogReportData,
  type AuditEvent,
  type AuditSeverity,
  type AuditAction,
  type AuditStatus,
} from "../registry/pdf/blocks/audit-log-report";

const ACTORS: { name: string; email: string }[] = [
  { name: "Sameer Kad", email: "sameer@acme.co" },
  { name: "Admin", email: "admin@acme.co" },
  { name: "Rahul Verma", email: "rahul@acme.co" },
  { name: "Priya Singh", email: "priya@acme.co" },
  { name: "Ankit Mehta", email: "ankit@acme.co" },
  { name: "Neha Gupta", email: "neha@acme.co" },
  { name: "Arjun Rao", email: "arjun@acme.co" },
  { name: "Sara Khan", email: "sara@acme.co" },
  { name: "Vikram Joshi", email: "vikram@acme.co" },
  { name: "Divya Nair", email: "divya@acme.co" },
  { name: "Karan Patel", email: "karan@acme.co" },
  { name: "Isha Kapoor", email: "isha@acme.co" },
];

const RESOURCES = [
  "Student",
  "Invoice",
  "User",
  "Role",
  "Permission",
  "Payment",
  "Settings",
  "API Key",
  "Account",
  "Support Ticket",
];

const IPS = [
  "103.83.xxx.xxx",
  "49.44.xxx.xxx",
  "117.206.xxx.xxx",
  "192.168.xxx.xxx",
  "10.20.xxx.xxx",
  "45.113.xxx.xxx",
  "203.112.xxx.xxx",
];

const USER_AGENTS = [
  "Chrome 140 / Windows 11",
  "Firefox 138 / macOS",
  "Edge 140 / Windows 11",
  "Chrome 141 / Android 15",
  "Safari 18 / iOS 18",
  "API Service / gateway",
];

const ACTIONS: AuditAction[] = [
  "LOGIN",
  "CREATE",
  "UPDATE",
  "DELETE",
  "EXPORT",
  "DOWNLOAD",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function fmtShort(d: Date) {
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fmtFull(d: Date) {
  const h = d.getHours() % 12 || 12;
  const ampm = d.getHours() >= 12 ? "PM" : "AM";
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${pad(h)}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${ampm}`;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260915);
const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];

function actionSeverity(action: AuditAction, status: AuditStatus): AuditSeverity {
  if (action === "DELETE") return "CRITICAL";
  if (action === "LOGIN") return status === "FAILED" ? "HIGH" : "INFO";
  if (action === "UPDATE") return "MEDIUM";
  if (action === "CREATE") return "MEDIUM";
  return rand() > 0.85 ? "HIGH" : "LOW";
}

function buildEvents(): AuditEvent[] {
  const count = 82;
  const events: AuditEvent[] = [];

  const now = new Date(2026, 8, 15, 17, 10, 8);

  for (let i = 0; i < count; i++) {
    const id = `AUD-2026-${String(1283 - i).padStart(6, "0")}`;
    const actorRoll = rand();
    const actor = ACTORS[Math.min(ACTORS.length - 1, Math.floor(actorRoll * ACTORS.length))];
    const action = pick(ACTIONS);
    const status: AuditStatus = rand() > 0.88 ? "FAILED" : "SUCCESS";
    const severity = actionSeverity(action, status);
    const resource = pick(RESOURCES);
    const prefix = resource === "Invoice" ? "INV" : resource === "Student" ? "STU" : resource === "User" ? "USR" : resource.slice(0, 3).toUpperCase();
    const resourceId = `${prefix}-${Math.floor(1000 + rand() * 9000)}`;

    events.push({
      id,
      ts: fmtShort(now),
      fullTs: fmtFull(now),
      actor: actor.name,
      email: actor.email,
      action,
      resource,
      resourceId,
      status,
      severity,
      ip: pick(IPS),
      userAgent: pick(USER_AGENTS),
    });

    now.setMinutes(now.getMinutes() - Math.floor(3 + rand() * 45));
    now.setSeconds(Math.floor(rand() * 60));
  }

  events.unshift({
    id: "AUD-2026-001284",
    ts: fmtShort(now),
    fullTs: fmtFull(now),
    actor: "Sameer Kad",
    email: "sameer@acme.co",
    action: "UPDATE",
    resource: "Student",
    resourceId: "STU-10294",
    status: "SUCCESS",
    severity: "CRITICAL",
    ip: "103.83.xxx.xxx",
    userAgent: "Chrome 140 / Windows 11",
    changes: [
      { field: "Phone", before: "98xxxxxx12", after: "98xxxxxx45" },
      { field: "Class", before: "9-A", after: "10-A" },
      { field: "Updated By", before: "Admin", after: "Sameer Kad" },
    ],
  });

  const withChanges: AuditEvent = {
    ...events[events.length - 1],
    id: undefined as unknown as string,
  };
  events.push({
    id: "AUD-2026-001183",
    ts: fmtShort(now),
    fullTs: fmtFull(now),
    actor: "Priya Singh",
    email: "priya@acme.co",
    action: "UPDATE",
    resource: "Permission",
    resourceId: "PERM-2210",
    status: "SUCCESS",
    severity: "CRITICAL",
    ip: "49.44.xxx.xxx",
    userAgent: "Chrome 140 / Windows 11",
    changes: [
      { field: "Role", before: "Viewer", after: "Editor" },
      { field: "Scopes", before: "read, export", after: "read, write, export" },
      { field: "Reason", before: "—", after: "Grant to support team" },
    ],
  });

  void withChanges;
  return events;
}

export const auditLogData: AuditLogReportData = {
  organization: {
    name: "Acme Technologies Pvt. Ltd.",
    brand: "ACME SOFTWARE",
    reportTitle: "Audit Log Report",
    reportId: "AUD-RPT-2026-1284",
  },
  metadata: {
    org: "Acme Technologies Pvt. Ltd.",
    periodLabel: "01 Sep 2026 – 15 Sep 2026",
    generated: "15 Sep 2026, 05:42 PM",
    generatedBy: "Admin",
  },
  filters: [
    { label: "Date", value: "01 Sep 2026 – 15 Sep 2026" },
    { label: "Users", value: "All" },
    { label: "Action", value: "All" },
    { label: "Resource", value: "All" },
    { label: "Status", value: "All" },
    { label: "Severity", value: "Critical · High · Medium · Low · Info" },
  ],
  events: buildEvents(),
};