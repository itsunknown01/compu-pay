"use client";

import { ArrowRight, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsAuthenticated } from "@/lib/auth-store";

export default function HeaderActions() {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="hidden lg:flex items-center gap-3">
      {isAuthenticated ? (
        <button
          onClick={() => router.push("/overview")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--lp-accent)] text-white text-sm font-semibold transition-all duration-300 hover:bg-[var(--lp-accent-bright)] hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>
      ) : (
        <>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.04]"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/register")}
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--lp-accent)] text-white text-sm font-semibold transition-all duration-300 hover:bg-[var(--lp-accent-bright)] hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </>
      )}
    </div>
  );
}
