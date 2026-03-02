import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryProvider } from "@/providers";
import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "CompuPay - AI-Powered Payroll Intelligence",
    template: "%s | CompuPay",
  },
  description:
    "AI-powered payroll intelligence platform. Detect payroll risks and compliance issues before they happen. Enterprise-grade accuracy, real-time analytics.",
  keywords: [
    "payroll",
    "enterprise",
    "compliance",
    "risk management",
    "audit",
    "AI payroll",
    "payroll intelligence",
  ],
  authors: [{ name: "CompuPay" }],
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syne.variable} font-sans antialiased`}
      >
        <QueryProvider>
          <ThemeProvider defaultTheme="dark" storageKey="compupay-theme">
            {children}
            <Toaster position="top-right" richColors closeButton />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
