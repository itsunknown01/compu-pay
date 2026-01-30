"use client";

import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { useAuditStore } from "@/stores/audit-store";

/**
 * AuditFilter - Filter controls for Audit Log
 * Uses reusable Zustand store for state management
 */
export function AuditFilter() {
  const { filters, setFilters, reset } = useAuditStore();

  // Local state for UI inputs before applying (optional, but typical for apply buttons)
  // For simplicity and reactivity, we can also update store directly on apply.
  // Here we keep local state to allow batching changes before "Apply".
  const [localDate, setLocalDate] = useState<Date | undefined>(
    filters.startDate ? new Date(filters.startDate) : undefined,
  );
  const [action, setAction] = useState<string>(filters.action || "ALL");
  const [resource, setResource] = useState<string>(
    filters.resourceType || "ALL",
  );

  const handleApply = () => {
    setFilters({
      startDate: localDate ? localDate.toISOString() : undefined,
      action: action === "ALL" ? undefined : action,
      resourceType: resource === "ALL" ? undefined : resource,
    });
  };

  const handleClear = () => {
    setLocalDate(undefined);
    setAction("ALL");
    setResource("ALL");
    reset();
  };

  const hasFilters = localDate || action !== "ALL" || resource !== "ALL";

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4">
      {/* Date Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size="sm"
            className={cn(
              "justify-start text-left font-normal",
              !localDate && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {localDate ? format(localDate, "PPP") : "Filter by date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={localDate}
            onSelect={setLocalDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Action Filter */}
      <Select value={action} onValueChange={setAction}>
        <SelectTrigger className="w-[140px] h-9">
          <SelectValue placeholder="Action" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Actions</SelectItem>
          <SelectItem value="CREATE">Create</SelectItem>
          <SelectItem value="UPDATE">Update</SelectItem>
          <SelectItem value="DELETE">Delete</SelectItem>
          <SelectItem value="APPROVE">Approve</SelectItem>
        </SelectContent>
      </Select>

      {/* Resource Filter */}
      <Select value={resource} onValueChange={setResource}>
        <SelectTrigger className="w-[140px] h-9">
          <SelectValue placeholder="Resource" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Resources</SelectItem>
          <SelectItem value="PayRun">PayRun</SelectItem>
          <SelectItem value="Employee">Employee</SelectItem>
          <SelectItem value="Rule">Rule</SelectItem>
        </SelectContent>
      </Select>

      <Button size="sm" onClick={handleApply}>
        Apply
      </Button>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="px-2"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
