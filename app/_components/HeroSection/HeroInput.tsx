"use client";

import { useState, useEffect } from "react";
import { Radio } from "lucide-react";
import { SearchModal } from "./_components/HeroInputModal";
import { Montserrat } from "next/font/google";
import { useTheme } from "next-themes";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
});

export const HeroInputSection = () => {
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const isLight = resolvedTheme === "light";

  useEffect(() => {
    setMounted(true);

    const handleGlobalSearchShortcut = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleGlobalSearchShortcut);
    return () =>
      window.removeEventListener("keydown", handleGlobalSearchShortcut);
  }, []);

  return (
    <>
      <div
        className={`relative w-full min-h-[500px] overflow-hidden flex flex-col items-center rounded-b-2xl shadow-lg ${montserrat.className}`}
        style={{
          background: isLight
            ? "linear-gradient(180deg, #dce8fb 0%, #eef4ff 100%)"
            : "linear-gradient(180deg, #051139 0%, #0a1e5e 100%)",
        }}
      >
        {/* 1. Header Text */}
        <div
          className={`mt-24 z-20 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <h1
            className={`text-center font-extrabold text-[18px] md:text-3xl tracking-tight ${
              isLight ? "text-[#0a1e5e]" : "text-white"
            }`}
          >
            Төрийн үйлчилгээ, мэдээллийг нэг дороос...
          </h1>
        </div>

        {/* 2. The Search Bar */}
        <div className="w-full max-w-4xl px-6 mt-10 z-20">
          <div
            className="relative group cursor-pointer w-full"
            onClick={() => setIsSearchOpen(true)}
          >
            {/* Neon Glow Ring */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-[#4f75ff] to-[#a05bf5] rounded-full blur-[4px] opacity-80 group-hover:opacity-100 transition duration-300"></div>

            {/* Input Container */}
            <div
              className={`relative flex items-center rounded-full h-16 px-3 shadow-2xl pointer-events-none ${
                isLight ? "bg-white" : "bg-[#1b223c]"
              }`}
            >
              {/* Left Icon */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shrink-0 ${
                  isLight ? "bg-blue-100" : "bg-[#2a3556]"
                }`}
              >
                <Radio className="w-5 h-5 text-[#6c8cf2]" />
              </div>

              {/* Placeholder Text */}
              <span
                className={`flex-1 text-left bg-transparent border-none outline-none text-sm md:text-base truncate ${
                  isLight ? "text-gray-400" : "text-gray-400"
                }`}
              >
                Үйлчилгээ, хууль, яам, засгийн газрын нэгжүүдэр хайх...
              </span>
            </div>
          </div>
        </div>

        {/* 3. Bottom Skyline */}
        <div className="absolute bottom-0 left-0 right-0 h-64 z-10 pointer-events-none">
          <CitySkyline isLight={isLight} />
        </div>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

const CitySkyline = ({ isLight }: { isLight: boolean }) => (
  <svg
    viewBox="0 0 1400 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    preserveAspectRatio="xMidYMax slice"
  >
    <path
      d="M0 220V180L40 160V185L100 140V185L180 160V185H250V140L300 110L350 140V185H450V130H550V185H600V120L650 100L700 120V185H800V60H880V185H950V140H1050V185H1150V120L1250 120V185H1400V220H0Z"
      fill={isLight ? "#bdd4f5" : "#162c6b"}
    />
    <path
      d="M0 220V195L200 175L400 190L600 165L800 185L1100 170L1400 195V220H0Z"
      fill={isLight ? "#a8c4ef" : "#1e3a8a"}
      fillOpacity="0.4"
    />
  </svg>
);
