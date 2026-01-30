"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { AuditLog } from "@/lib/types";
import { AITraceDrawer } from "./ai-trace-drawer";
import { Button } from "@/components/ui/button";
import { Search, Brain } from "lucide-react";

interface AuditTableProps {
  logs: AuditLog[];
}

export function AuditTable({ logs }: AuditTableProps) {
  if (!logs || logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border rounded-lg bg-muted/5 border-dashed">
        <div className="p-4 bg-background rounded-full mb-4">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-foreground">
          No audit logs found
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Actor</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => {
            // Check if this log has an associated AI trace
            const traceId = log.details?.traceId as string | undefined;

            return (
              <TableRow key={log.id}>
                <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                  {format(new Date(log.createdAt), "MMM d, HH:mm:ss")}
                </TableCell>
                <TableCell>
                  {log.userId ? (
                    <span className="font-medium">{log.userId}</span>
                  ) : (
                    <Badge variant="outline" className="font-mono text-[10px]">
                      SYSTEM
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{log.action}</span>
                    {traceId && <Brain className="h-3 w-3 text-primary" />}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px]">
                    {log.resourceType}
                  </Badge>
                  <span className="ml-2 text-xs font-mono text-muted-foreground">
                    {log.resourceId.slice(0, 8)}...
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {traceId ? (
                      <AITraceDrawer
                        traceId={traceId}
                        trigger={
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs gap-1 text-primary"
                          >
                            <Search className="h-3 w-3" />
                            View Trace
                          </Button>
                        }
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {JSON.stringify(log.details)}
                      </span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
