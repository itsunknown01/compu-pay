import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComplianceRuleList } from "@/components/compliance";

export default function CompliancePage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Compliance Rules
          </h2>
          <p className="text-muted-foreground">
            Manage tax rules and run simulations before applying changes.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/compliance/new">
            <Plus className="mr-2 h-4 w-4" />
            New Rule
          </Link>
        </Button>
      </div>

      {}
      <ComplianceRuleList />
    </div>
  );
}
