import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PayrunList } from "@/components/payroll";


export default function PayrunsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payruns</h2>
          <p className="text-muted-foreground">
            View and manage all payroll runs.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/payruns/new">
            <Plus className="mr-2 h-4 w-4" />
            New Payrun
          </Link>
        </Button>
      </div>

      {}
      <PayrunList />
    </div>
  );
}
