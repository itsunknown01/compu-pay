"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

export default function ScheduleDemoButton() {
  const { onOpen } = useModal();
  
  return (
    <Button
      variant="outline"
      size="lg"
      className="group transition-all duration-300 hover:scale-105 hover:bg-primary/5 hover:border-primary/50"
      aria-label="Schedule a demo"
      onClick={() => onOpen("schedule_demo")}
    >
      Schedule Demo
      <div className="ml-2 w-4 h-4 rounded-full bg-green-500 animate-pulse group-hover:animate-none" />
    </Button>
  );
}
