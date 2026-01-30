import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Copy, Check } from "lucide-react";
import { useState } from "react";
import { ModelVersionBadge } from "./model-version-badge";
import { ConfidenceIndicator } from "@/components/ai/confidence-indicator";
import { Card } from "@/components/ui/card";

interface AITraceDrawerProps {
  trigger?: React.ReactNode;
  traceId: string;
  
  data?: {
    timestamp: string;
    model: string;
    prompt: string;
    response: string;
    confidence: number;
    latencyMs: number;
  };
}

export function AITraceDrawer({
  trigger,
  traceId,
  data: initialData,
}: AITraceDrawerProps) {
  const [copied, setCopied] = useState(false);

  
  const data = initialData || {
    timestamp: new Date().toISOString(),
    model: "gpt-4-turbo-preview",
    prompt:
      "Analyze payroll risk for employee ID 123 given the following time entries...",
    response:
      "Risk detected: High overtime anomaly. The employee has logged 40 hours...",
    confidence: 0.92,
    latencyMs: 1250,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            View AI Trace
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DrawerTitle>AI Reasoning Trace</DrawerTitle>
                  <DrawerDescription>
                    Trace ID:{" "}
                    <span className="font-mono text-xs">{traceId}</span>
                  </DrawerDescription>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ModelVersionBadge version={data.model} />
                <span className="text-xs text-muted-foreground">
                  {data.latencyMs}ms
                </span>
              </div>
            </div>
          </DrawerHeader>

          <ScrollArea className="h-[50vh] px-4">
            <div className="space-y-6 pb-6">
              {}
              <Card className="p-4 bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">Confidence Score</h4>
                  <span className="text-sm font-bold">
                    {(data.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <ConfidenceIndicator score={data.confidence} />
              </Card>

              {}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  System Prompt & Context
                </h4>
                <div className="rounded-md bg-muted p-4 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                  {data.prompt}
                </div>
              </div>

              {}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Model Output
                </h4>
                <div className="rounded-md bg-primary/5 border border-primary/20 p-4 font-mono text-xs overflow-x-auto whitespace-pre-wrap text-foreground">
                  {data.response}
                </div>
              </div>
            </div>
          </ScrollArea>

          <DrawerFooter>
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                onClick={copyToClipboard}
                className="gap-2"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied JSON" : "Copy Trace JSON"}
              </Button>
              <DrawerClose asChild>
                <Button>Close Trace</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
