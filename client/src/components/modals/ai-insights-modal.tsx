"use client";

import { useModal } from "@/hooks/use-modal";
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";
import { useState } from "react";

interface InsightData {
  title: string;
  description: string;
  type: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  value?: string;
  change?: string;
  recommendation?: string;
}

export default function AIInsightsModal() {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === "ai_insights";
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  
  const insights: InsightData[] = [
    {
      title: "Overtime Trend",
      description:
        "Engineering department overtime has increased by 15% this month",
      type: "negative",
      icon: Clock,
      value: "32 hours",
      change: "+15%",
      recommendation:
        "Consider reviewing workload distribution in the Engineering team",
    },
    {
      title: "Tax Optimization",
      description: "Potential tax savings identified in benefits structure",
      type: "positive",
      icon: DollarSign,
      value: "$24,500",
      change: "-8%",
      recommendation:
        "Adjust healthcare pre-tax allocations for optimal tax benefits",
    },
    {
      title: "Payroll Efficiency",
      description: "Processing time reduced due to automated approvals",
      type: "positive",
      icon: TrendingUp,
      value: "2.3 hrs",
      change: "-45%",
      recommendation: "Expand automated approval workflow to other departments",
    },
    {
      title: "Compliance Alert",
      description: "California state tax rates updated for next quarter",
      type: "neutral",
      icon: AlertTriangle,
      recommendation:
        "Update payroll system with new California tax tables by Nov 30",
    },
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case "positive":
        return "text-green-500 bg-green-500/10";
      case "negative":
        return "text-red-500 bg-red-500/10";
      case "neutral":
      default:
        return "text-yellow-500 bg-yellow-500/10";
    }
  };

  const handleGenerateReport = () => {
    setIsGeneratingReport(true);

    
    toast.info("Generating comprehensive payroll report...", {
      duration: 2000,
    });

    
    setTimeout(() => {
      
      toast.info("Analyzing payroll data and trends...", {
        duration: 2000,
      });

      setTimeout(() => {
        
        toast.success("Payroll report generated successfully!", {
          description:
            "Your comprehensive payroll report is ready for download.",
          action: {
            label: "Download PDF",
            onClick: () => handleDownloadReport(),
          },
          duration: 5000,
        });

        setIsGeneratingReport(false);
      }, 3000);
    }, 2000);
  };

  const handleDownloadReport = () => {
    
    
    toast.success("Report downloaded successfully", {
      description: "The report has been saved to your downloads folder.",
    });

    
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8,");
    element.setAttribute(
      "download",
      `PayrollInsightsReport_${new Date().toISOString().split("T")[0]}.pdf`,
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {}
        <div className="relative w-full bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-lg bg-primary/20">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">
                AI Insights Dashboard
              </DialogTitle>
              <DialogDescription className="text-sm mt-1">
                Intelligent analysis of your payroll data and trends
              </DialogDescription>
            </div>
          </div>
        </div>

        {}
        <ScrollArea className="flex-grow h-[calc(100vh-250px)] max-h-[600px]">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Key Insights</h3>
              <p className="text-sm text-muted-foreground">
                Our AI has analyzed your payroll data and identified these key
                insights and recommendations:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <Card
                    key={index}
                    className="overflow-hidden border border-border/50"
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">
                          {insight.title}
                        </CardTitle>
                        <div
                          className={`p-2 rounded-full ${getInsightColor(insight.type)}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <CardDescription className="text-xs mt-1">
                        {insight.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      {insight.value && (
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl font-bold">
                            {insight.value}
                          </span>
                          {insight.change && (
                            <Badge
                              variant={
                                insight.type === "positive"
                                  ? "default"
                                  : "destructive"
                              }
                              className="text-xs"
                            >
                              {insight.change}
                            </Badge>
                          )}
                        </div>
                      )}
                      {insight.recommendation && (
                        <div className="mt-2 p-2 bg-muted rounded-md">
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5">
                              <CheckCircle className="h-4 w-4 text-primary" />
                            </div>
                            <p className="text-xs">
                              <span className="font-medium">
                                Recommendation:
                              </span>{" "}
                              {insight.recommendation}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Payroll Health Score
              </h3>
              <div className="p-4 border border-border/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Score</span>
                  <span className="text-sm font-bold text-green-500">
                    92/100
                  </span>
                </div>
                <Progress value={92} className="h-2 mb-4" />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Accuracy</span>
                      <span className="font-medium">98%</span>
                    </div>
                    <Progress value={98} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Efficiency</span>
                      <span className="font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Compliance</span>
                      <span className="font-medium">90%</span>
                    </div>
                    <Progress value={90} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Employee Satisfaction</span>
                      <span className="font-medium">86%</span>
                    </div>
                    <Progress value={86} className="h-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-4 bg-muted/30">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            className="gap-1"
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
          >
            <span>
              {isGeneratingReport ? "Generating..." : "Generate Full Report"}
            </span>
            {isGeneratingReport ? (
              <FileText className="h-4 w-4 animate-pulse" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
