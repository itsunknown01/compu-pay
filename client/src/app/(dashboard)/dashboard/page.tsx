import { Metadata } from "next";
import { DashboardOverview } from "./_components/dashboard-overview";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "CompuPay Dashboard - Overview of payroll operations",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
