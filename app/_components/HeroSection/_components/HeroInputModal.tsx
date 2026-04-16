"use client";

import { useEffect } from "react";
import { Search, X, Radio } from "lucide-react";
import { Montserrat } from "next/font/google";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_SEARCHES = [
  "Нийгмийн даатгалын шимтгэл төлөлтийн лавлагаа (гадаад хэлээр)",
  "Шүүхийн шийдвэрээр бусдад төлбөргүй эсэх тодорхойлолт (иргэн) (гадаад хэлээр)",
  "Цахим гадаад паспорт дахин захиалах (хаясан, гээсэн, үрэгдүүлсэн, алдсан)",
  "Шинжилгээний хариу авах",
  "Дархлаажуулалтын мэдээлэл (гадаад хэлээр)",
];

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
});

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  // Close the modal when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center pt-20 px-4 bg-[#373737]/50 backdrop-blur-xs transition-opacity duration-300 ${montserrat.className}`}
    >
      {/* Clickable backdrop to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Close Button (Top Right) */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-white/50 hover:text-white bg-white/5 rounded-full transition-colors z-20"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header Text */}
        <div className="flex flex-col gap-1">
          <h2 className="text-white text-3xl font-bold tracking-wide">
            Нэгдсэн хайлт
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Та Keyboard-ныхаа '/' товчийг даран вэбийн хаанаас ч шууд хайлт хийх
            боломжтой.
          </p>
        </div>

        {/* The Glowing Search Bar */}
        <div className="relative group w-full mt-2">
          {/* Neon Glow Ring */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-[#4f75ff] to-[#a05bf5] rounded-full blur-[4px] opacity-80"></div>

          <div className="relative flex items-center bg-[#1b223c] rounded-full h-16 px-3 shadow-2xl">
            {/* Left Icon */}
            <div className="w-10 h-10 rounded-full bg-[#2a3556] flex items-center justify-center mr-3 shrink-0">
              <Radio className="w-5 h-5 text-[#6c8cf2]" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              autoFocus
              placeholder="Үйлчилгээ, хууль, яам, засгийн газрын нэгжүүдэр хайх..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-400 text-base"
            />

            {/* Search Button */}
            <button className="bg-[#4d82f3] hover:bg-[#3a6edb] text-white font-medium rounded-full px-8 py-2.5 transition-colors ml-2 shrink-0">
              Хайх
            </button>
          </div>
        </div>

        {/* Suggested Searches List */}
        <div className="flex flex-col gap-3 mt-6">
          <h3 className="text-white font-semibold mb-2 text-lg">
            Санал болгож буй хайлтууд
          </h3>

          {SUGGESTED_SEARCHES.map((text, idx) => (
            <button
              key={idx}
              className="flex items-center w-full bg-white/10 hover:bg-white/20 transition-colors rounded-full p-2 pr-6 text-left group"
            >
              {/* White Circle with Search Icon */}
              <div className="w-11 h-11 shrink-0 rounded-full bg-white flex items-center justify-center mr-4">
                <Search className="w-5 h-5 text-gray-400" />
              </div>

              {/* Suggestion Text */}
              <span className="text-gray-200 text-sm md:text-base leading-snug group-hover:text-white transition-colors">
                {text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
