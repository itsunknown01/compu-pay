"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <SwitchPrimitive.Root
      checked={theme === "dark"}
      onCheckedChange={toggleTheme}
      className={cn(
        "peer inline-flex h-8 w-18 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        theme === "dark" ? "bg-primary" : "bg-input"
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform",
          theme === "dark" ? "translate-x-10" : "translate-x-0"
        )}
      >
        {theme === "light" ? (
          <Sun className="h-4 w-4 text-yellow-500" />
        ) : (
          <Moon className="h-4 w-4 text-blue-400" />
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}
