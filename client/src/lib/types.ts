


export interface User {
  id: string;
  email: string;
}

export interface Membership {
  tenantId: string;
  role: "ADMIN" | "MEMBER" | "VIEWER";
}

export interface AuthSession {
  user: User;
  memberships: Membership[];
  activeTenantId: string;
}

export interface LoginResponse {
  token: string;
  memberships: Membership[];
}

export interface RegisterResponse {
  message: string;
  tenantId: string;
  userId: string;
}


export type PayRunStatus =
  | "DRAFT"
  | "QUEUED"
  | "PREVIEWED"
  | "REVIEWED"
  | "APPROVED";

export interface PayRun {
  id: string;
  tenantId: string;
  periodStart: string;
  periodEnd: string;
  status: PayRunStatus;
}

export interface PayRunItem {
  payRunId: string;
  employeeId: string;
  grossPay: string;
  taxDeductions: string;
  netPay: string;
}


export type TaxStatus = "STANDARD" | "EXEMPT";

export interface Employee {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  salaryAmount: string;
  taxStatus: TaxStatus;
}


export type RiskSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Risk {
  id: string;
  tenantId: string;
  payRunId: string;
  type: string; 
  severity: RiskSeverity;
  explanation: string;
  suggestedAction: string | null;
  confidence: number; 
  metadata?: Record<string, unknown>; 
  createdAt: string;
}


export type ComplianceRuleStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export interface ComplianceRule {
  id: string;
  tenantId: string;
  name: string;
  description: string | null;
  changes: Record<string, unknown>;
  effectiveDate: string;
  status: ComplianceRuleStatus;
  createdAt: string;
}

export interface Simulation {
  id: string;
  ruleId: string;
  payRunId: string;
  results: {
    totalCostDelta?: number;
    impactedCount?: number;
    [key: string]: unknown;
  };
  explanation?: string;
  confidence?: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
}


export interface AuditLog {
  id: string;
  tenantId: string;
  userId: string | null;
  action: string;
  resourceType: string;
  resourceId: string;
  details: Record<string, unknown> | null;
  ipAddress: string | null;
  createdAt: string;
}


export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}


export type JobStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";

export interface Job {
  id: string;
  status: JobStatus;
  progress?: number;
  result?: unknown;
  error?: string;
}

export interface AISummaryResponse {
  systemHealth: number;
  activeRisks: number;
  insights: {
    id: string;
    type: "risk" | "compliance" | "optimization";
    message: string;
    confidence: number;
    link: string;
    time: string;
  }[];
}
