"use client";

import { AlertTriangle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface SessionExpiredNoticeProps {
  reason?: "expired" | "unauthenticated" | "unauthorized";
}

const messages = {
  expired: {
    title: "Session Expired",
    description:
      "Your session has expired for security reasons. Please log in again to continue.",
  },
  unauthenticated: {
    title: "Authentication Required",
    description: "You need to log in to access this page.",
  },
  unauthorized: {
    title: "Access Denied",
    description: "You don't have permission to access this resource.",
  },
};


export function SessionExpiredNotice({
  reason = "unauthenticated",
}: SessionExpiredNoticeProps) {
  const { title, description } = messages[reason];

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
            <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
