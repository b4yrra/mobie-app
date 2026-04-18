"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Montserrat } from "next/font/google";
import React, { useRef, useState, useEffect } from "react";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

interface CardItem {
  title: string;
  image: string;
}

const cards: CardItem[] = [
  {
    title: "Цэргийн алба",
    image:
      "https://cdn.gov.mn/public/fffaf096-f600-446c-9b6f-28793b9d3eff_BadgeSolider.png",
  },
  {
    title: "Бичиг баримт",
    image:
      "https://cdn.gov.mn/public/3cda7940-1fe2-4945-acbd-b570126c8d2d_digital-key 1.png",
  },
  {
    title: "Хүүхэд",
    image:
      "https://cdn.gov.mn/public/1fcafd36-5c88-46f6-a526-13e3c3fe4a15_puzzle (1) 1.png",
  },
  {
    title: "Гадаад явах",
    image:
      "https://cdn.gov.mn/public/46b6ecfb-b9c2-4cf6-9af2-a3d337fc4364_Airplane.png",
  },
  {
    title: "Эрүүл мэнддээ анхаарах",
    image:
      "https://cdn.gov.mn/public/c02f082d-abd5-4ba6-967e-3b723b1301ea_Frame 1984081670.png",
  },
  {
    title: "Зээлийн мэдээлэл",
    image:
      "https://cdn.gov.mn/public/80c3feb8-ec28-4016-9394-a55fc3f87d9e_cash 1.png",
  },
];

export const GuideMenu = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section is 10% visible, trigger the animation
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Stop observing after it becomes visible once
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.1 }, // 0.1 means 10% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  return (
    <div ref={sectionRef} className={`${montserrat.className} px-3 mb-10`}>
      <div className="flex justify-between mb-5">
        <div className="flex flex-col gap-2">
          <h4 className="font-extrabold text-xl">Хөтөч</h4>
          <p className="text-xs tracking-[0.28px]">
            Амьдралынхаа аль ч үед хэрэгтэй бүхнийг хийх, мэдэх хувийн хөтөчтэй
            байгаарай.
          </p>
        </div>
        <Button
          className={`rounded-full transition-all duration-300 text-xs font-semibold p-4 ${
            theme === "light"
              ? "bg-[#e6f0ff] text-black"
              : "bg-[#233552] text-white"
          }`}
        >
          Бүгдийг үзэх
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
            }}
            className={`
              relative flex items-center justify-between px-5 min-h-[85px] overflow-hidden rounded-lg border 
              transition-all duration-700 ease-out
              ${theme === "light" ? "bg-white border-[#e6ebf3]" : "bg-[#1e2a40] border-[#2a3b55]"}
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }
            `}
          >
            <div className="z-10 flex flex-col justify-center gap-3 flex-1 py-5 pr-3">
              <h2 className="dark:text-white text-black text-sm font-semibold leading-snug tracking-tight">
                {card.title}
              </h2>
            </div>

            <div className="relative flex-shrink-0 self-stretch flex items-center">
              <img
                src={card.image}
                alt={card.title}
                className="w-[48px] h-[48px] object-cover object-center"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
