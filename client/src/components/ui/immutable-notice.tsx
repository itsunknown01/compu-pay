import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide-react";

interface ImmutableNoticeProps {
  message?: string;
}


export function ImmutableNotice({
  message = "This record is locked and cannot be modified.",
}: ImmutableNoticeProps) {
  return (
    <Alert className="bg-muted/50 border-muted">
      <Lock className="h-4 w-4 text-muted-foreground" />
      <AlertTitle className="text-muted-foreground">Read Only</AlertTitle>
      <AlertDescription className="text-muted-foreground">
        {message}
      </AlertDescription>
    </Alert>
  );
}
