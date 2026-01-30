"use client";

import { Button } from "@/components/ui/button";
import { useIsAuthenticated } from "@/lib/auth-store";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GetStartedButton() {
  const isAuthenticated = useIsAuthenticated();

  
  const targetUrl = isAuthenticated ? "/dashboard" : "/login";

  return (
    <Link href={targetUrl} passHref>
      <Button
        size="lg"
        className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25"
        aria-label="Get started with PayrollAI"
      >
        <span className="relative z-10">Get Started</span>
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </Button>
    </Link>
  );
}
