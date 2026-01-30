"use client";

import { AuditFilter } from "@/components/audit/audit-filter";
import { AuditTable } from "@/components/audit/audit-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuditLogs } from "@/hooks/use-audit-logs";
import { useAuditStore } from "@/stores/audit-store";
import { ShieldAlert } from "lucide-react";

/**
 * AuditPage - Displays system audit logs
 *
 * Client Component that manages filter state and data fetching via hook.
 * Uses real backend API via useAuditLogs.
 */
export default function AuditPage() {
  const { page, setPage } = useAuditStore();
  // Hook now uses store internally, so no args needed
  const { data, isLoading, error } = useAuditLogs();

  // Filter change is now handled by AuditFilter component directly updating the store

  return (
    <div className="container max-w-6xl py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <ShieldAlert className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Audit Log & AI Traceability
          </h1>
          <p className="text-muted-foreground mt-1">
            Immutable record of all system actions and AI reasoning traces.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <AuditFilter />

        {error ? (
          <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10 text-destructive text-sm">
            Error loading audit logs: {error.message}
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <AuditTable logs={data?.data || []} />
        )}

        {/* Pagination Controls could be added here or integrated into AuditTable/PaginatedTable */}
        {/* For now, simplified view matching original specificiation, but ready for pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-muted"
            >
              Previous
            </button>
            <span className="text-sm py-1">
              Page {page} of {data.totalPages}
            </span>
            <button
              disabled={page === data.totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-muted"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
