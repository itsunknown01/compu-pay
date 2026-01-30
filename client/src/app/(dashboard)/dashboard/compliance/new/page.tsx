"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RuleBuilder } from "@/components/compliance/rule-builder";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NewComplianceRulePage() {
  const router = useRouter();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Create Compliance Rule
          </h1>
          <p className="text-muted-foreground">
            Define a new tax or compliance rule to apply to payruns.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rule Details</CardTitle>
          <CardDescription>
            Enter the rule metadata and definition below. Rules start in DRAFT
            status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RuleBuilder />
        </CardContent>
      </Card>
    </div>
  );
}
