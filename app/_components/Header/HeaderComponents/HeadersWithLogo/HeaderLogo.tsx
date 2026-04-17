"use client";

import { ModeToggle } from "@/components/ui/Theme";
import { CircleUser, LayoutGrid, PersonStanding } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const HeaderWithLogo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        {isDark ? (
          <img src="./emon-logo-dark.svg" alt="emon-logo-dark" />
        ) : (
          <img src="./emon-logo.svg" alt="emon-logo" />
        )}

        <ModeToggle />
      </div>
      <div className="flex items-center gap-3">
        <button className="p-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
          <CircleUser
            size={34}
            strokeWidth={1.2}
            className="text-white bg-blue-500 p-[2px] rounded-full"
          />
        </button>

        <button
          className={`p-2 rounded-full transition-colors ${isDark ? "bg-[#1a314d] hover:bg-blue-900" : "bg-[#e6f0ff] hover:bg-blue-100"}`}
        >
          <LayoutGrid size={20} strokeWidth={1} className="text-blue-500" />
        </button>

        <button
          className={`p-2 rounded-full transition-colors ${isDark ? "bg-[#1a314d] hover:bg-blue-900" : "bg-[#e6f0ff] hover:bg-blue-100"}`}
        >
          <PersonStanding size={20} strokeWidth={1} className="text-blue-500" />
        </button>
      </div>
    </div>
  );
};
