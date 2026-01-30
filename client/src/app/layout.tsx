import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryProvider } from "@/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CompuPay - Enterprise Payroll Management",
    template: "%s | CompuPay",
  },
  description:
    "Production-grade payroll management system with risk detection, compliance simulation, and audit tracking.",
  keywords: ["payroll", "enterprise", "compliance", "risk management", "audit"],
  authors: [{ name: "CompuPay" }],
  robots: "noindex, nofollow", // Internal enterprise app
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <ThemeProvider defaultTheme="system" storageKey="compupay-theme">
            {children}
            <Toaster position="top-right" richColors closeButton />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
