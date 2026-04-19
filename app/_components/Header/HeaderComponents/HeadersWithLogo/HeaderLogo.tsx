"use client";

import { ModeToggle } from "@/components/ui/Theme";
import { CircleUser, LayoutGrid, PersonStanding } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type DBUser = {
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  dateOfBirth: string | null;
};

export const HeaderWithLogo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [dbUser, setDbUser] = useState<DBUser | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch user from your DB once signed in
  useEffect(() => {
    if (!isSignedIn) return;
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setDbUser(data))
      .catch(console.error);
  }, [isSignedIn]);

  const isDark = mounted && theme === "dark";

  const handleUserClick = () => {
    if (!isSignedIn) {
      openSignIn({ fallbackRedirectUrl: "/onboarding" });
    } else if (!dbUser) {
      // Signed in but no profile yet → go to onboarding
      router.push("/onboarding");
    } else {
      // Has profile → go to profile page
      router.push("/profile");
    }
  };

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
        {/* User button */}
        <button
          onClick={handleUserClick}
          className="flex items-center gap-2 p-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
        >
          {dbUser?.imageUrl ? (
            <img
              src={dbUser.imageUrl}
              alt="profile"
              className="w-[34px] h-[34px] rounded-full object-cover"
            />
          ) : (
            <CircleUser
              size={34}
              strokeWidth={1.2}
              className="text-white bg-blue-500 p-[2px] rounded-full"
            />
          )}

          {/* Show name if profile exists */}
          {dbUser && (
            <span className="text-sm font-medium hidden sm:block">
              {dbUser.lastName} {dbUser.firstName}
            </span>
          )}
        </button>

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
