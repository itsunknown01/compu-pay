import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { NewPayrunForm } from "@/components/payroll/new-payrun-form";
import { Button } from "@/components/ui/button";

export default function NewPayrunPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/payruns">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Create New Payrun
          </h2>
          <p className="text-muted-foreground">
            Select the pay period for this run.
          </p>
        </div>
      </div>

      <NewPayrunForm />
    </div>
  );
}
