"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        size="icon"
        variant="ghost"
        className="relative rounded-full bg-transparent"
        disabled
      >
        <div className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`relative rounded-full transition-all duration-300 ${
        theme === "light"
          ? "bg-blue-100 hover:bg-blue-200"
          : "bg-blue-900 hover:bg-blue-800"
      }`}
    >
      <Moon
        className="h-10 w-10 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-black"
        fill="currentColor"
      />
      <Sun
        className="absolute h-10 w-10 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-white"
        fill="currentColor"
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
