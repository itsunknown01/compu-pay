import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center bg-gray-50/50">
      <div className="mb-4 rounded-full bg-muted p-4">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Page Not Found</h1>
      <p className="mb-8 text-muted-foreground max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
