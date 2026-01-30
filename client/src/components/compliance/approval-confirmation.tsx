"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApprovalConfirmationProps {
  title: string;
  description: string;
  confirmText?: string;
  onConfirm: () => void;
  loading?: boolean;
  children: React.ReactNode;
}

/**
 * ApprovalConfirmation - Admin confirmation dialog with typed confirmation
 *
 * Requires user to type "CONFIRM" to proceed with destructive/important actions.
 */
export function ApprovalConfirmation({
  title,
  description,
  confirmText = "CONFIRM",
  onConfirm,
  loading = false,
  children,
}: ApprovalConfirmationProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const isConfirmed = inputValue.toUpperCase() === confirmText;

  const handleConfirm = () => {
    if (isConfirmed) {
      onConfirm();
      setOpen(false);
      setInputValue("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="confirm-input">
              Type <span className="font-mono font-bold">{confirmText}</span> to
              confirm
            </Label>
            <Input
              id="confirm-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={confirmText}
              className="font-mono"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isConfirmed || loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
