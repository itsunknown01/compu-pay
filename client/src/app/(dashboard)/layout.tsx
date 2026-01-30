import { Suspense } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "./_components/header";
import DashboardSidebar from "./_components/sidebar";
import { Footer } from "@/components/layout";
import { AuthGuard } from "@/components/auth";
import DashboardLoading from "./loading";

export const metadata = {
  title: "Dashboard",
  description: "CompuPay Dashboard - Manage payroll, compliance, and audits",
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <DashboardSidebar />
          <SidebarInset className="flex flex-col">
            <DashboardHeader />
            {}
            <Suspense fallback={<DashboardLoading />}>
              <main
                className="flex-1 p-4 sm:p-6 lg:p-8"
                id="main-content"
                role="main"
                aria-label="Main content"
              >
                {children}
              </main>
            </Suspense>
            <Footer />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
}
