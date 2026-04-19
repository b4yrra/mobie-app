"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const FooterSection = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";
  const today = new Date();
  const currentYear = today.getFullYear();

  return (
    <footer
      className={`bg-[#0c192e] text-xs text-[#cbd5e1] pt-8 px-3 ${montserrat.className}`}
    >
      <div className="max-w-7xl mx-auto border-b border-[#1f293a] pb-5">
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold flex items-center">
              {isDark ? (
                <img src="./emon-logo-dark.svg" alt="emon-logo-dark" />
              ) : (
                <img src="./emon-logo.svg" alt="emon-logo" />
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-9"
            />

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-9"
            />
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-10">
          {/* Column 1: Тусламж */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold">Тусламж</h4>
            <ul className="flex flex-col gap-3 font-medium text-xs text-[#cbd5e1]">
              <li>Knowledge Graph</li>
              <li>Түгээмэл асуулт, хариулт</li>
            </ul>
          </div>

          {/* Column 2: Бусад */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold">Бусад</h4>
            <ul className="flex flex-col gap-3 font-medium text-xs text-[#cbd5e1]">
              <li>Чингис хааны иш хөрөг</li>
              <li>Төрийн албан хаагч цэс</li>
              <li>Лавлагаа шалгах</li>
              <li>АТГ-д хандах</li>
            </ul>
          </div>

          {/* Column 3: Бидний тухай */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold">Бидний тухай</h4>
            <ul className="flex flex-col gap-3 font-medium text-xs text-[#cbd5e1]">
              <li>И-Монгол Академи</li>
              <li>ЦХИХХЯ-ний тухай</li>
              <li>Системийн тухай</li>
              <li>Үйлчилгээний нөхцөл</li>
            </ul>
          </div>

          {/* Column 4: Хандалтын тоо */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold">Хандалтын тоо</h4>
            <div className="flex flex-col gap-2 font-medium text-xs text-[#cbd5e1]">
              <div className="flex justify-between">
                <span>Сүүлийн 24 цаг:</span>
                <span className="text-xs text-[#cbd5e1]">31,548</span>
              </div>
              <div className="flex justify-between">
                <span>Сүүлийн 7 хоног:</span>
                <span className="text-xs text-[#cbd5e1]">650,421</span>
              </div>
              <div className="flex justify-between">
                <span>Сүүлийн сар:</span>
                <span className="text-xs text-[#cbd5e1]">2,928,303</span>
              </div>
              <div className="flex justify-between">
                <span>Нийт:</span>
                <span className="text-xs text-[#cbd5e1]">14,762,475</span>
              </div>
            </div>

            {/* Google Analytics Logo */}
            <div className="mt-4 opacity-70 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-orange-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V9h2v7zm4 0h-2V7h2v9z" />
              </svg>
              <span className="font-semibold">Google Analytics</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-15 text-xs font-bold">
        © Бүх эрх хуулиар хамгаалагдаагүй {currentYear} он.
      </div>
    </footer>
  );
};
