"use client";

import { ModeToggle } from "@/components/ui/Theme";
import { CircleUser, LayoutGrid, PersonStanding } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileDropDown } from "./ProfileDropDown";

type User = {
  firstName: string;
  lastName: string;
  imageUrl: string | null;
};

export const HeaderWithLogo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setUser(data))
      .catch(() => {});
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
        <ProfileDropDown />

        <button
          className={`p-2 rounded-full transition-colors ${
            isDark
              ? "bg-[#1a314d] hover:bg-blue-900"
              : "bg-[#e6f0ff] hover:bg-blue-100"
          }`}
        >
          <LayoutGrid size={20} strokeWidth={1} className="text-blue-500" />
        </button>

        <button
          className={`p-2 rounded-full transition-colors ${
            isDark
              ? "bg-[#1a314d] hover:bg-blue-900"
              : "bg-[#e6f0ff] hover:bg-blue-100"
          }`}
        >
          <PersonStanding size={20} strokeWidth={1} className="text-blue-500" />
        </button>
      </div>
    </div>
  );
};

// <button
//   onClick={() => router.push("/profile")}
//   className="flex items-center gap-2 p-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
// >
//   {user?.imageUrl ? (
//     <img
//       src={user.imageUrl}
//       alt="profile"
//       className="w-[34px] h-[34px] rounded-full object-cover"
//     />
//   ) : (
//     <CircleUser
//       size={34}
//       strokeWidth={1.2}
//       className="text-white bg-blue-500 p-[2px] rounded-full"
//     />
//   )}
//   {user && (
//     <span className="text-sm font-medium hidden sm:block">
//       {user.lastName} {user.firstName}
//     </span>
//   )}
// </button>
