"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActorBadgeProps {
  userId?: string | null;
  name?: string | null;
  email?: string | null;
  className?: string;
  isSystem?: boolean;
}

/**
 * ActorBadge - Displays the user or system actor for an audit log
 *
 * Features:
 * - Avatar with initials fallback
 * - System badge for automated actions
 * - Tooltip friendly structure (can be wrapped)
 */
export function ActorBadge({
  userId,
  name,
  email,
  className,
  isSystem,
}: ActorBadgeProps) {
  if (isSystem || !userId) {
    return (
      <Badge
        variant="outline"
        className={cn("gap-1 bg-muted/50 font-mono text-xs", className)}
      >
        <Shield className="h-3 w-3" />
        SYSTEM
      </Badge>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Avatar className="h-6 w-6">
        <AvatarImage src={`https://avatar.vercel.sh/${userId}`} />
        <AvatarFallback className="text-[10px]">
          {name?.slice(0, 2).toUpperCase() || <User className="h-3 w-3" />}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-xs font-medium leading-none">
          {name || "Unknown User"}
        </span>
        {email && (
          <span className="text-[10px] text-muted-foreground leading-none">
            {email}
          </span>
        )}
      </div>
    </div>
  );
}
