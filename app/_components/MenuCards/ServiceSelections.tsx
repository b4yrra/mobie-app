"use client";

import { useTheme } from "next-themes";
import { Montserrat } from "next/font/google";
import { useEffect, useState, useRef } from "react";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const services = [
  "Апостиль гэрчилгээ",
  "Төлбөр төлөх",
  "Гэр бүл",
  "Үл хөдлөх хөрөнгө",
  "Нийслэлийн цэцэрлэгийн үр дүн",
  "Зээлийн мэдээлэл",
  "Нийгмийн даатгалын лавлагаа",
  "Тээврийн хэрэгслийн торгууль",
  "Шинжилгээний хариу",
  "Эмнэлгийн цаг захиалах",
  "Дипломын тодорхойлолт",
  "Лавлагаа, тодорхойлолт шалгах",
  "Нийтийн тээврийн тасалбар захиалга",
];

export const ServiceSelection = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it has animated in, we can stop observing to save resources
          if (containerRef.current) observer.unobserve(containerRef.current);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: "0px 0px -50px 0px", // Slight offset so it triggers just before it hits the view
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col gap-6 px-3 ${montserrat.className} mb-5`}
    >
      <div className="flex flex-col gap-2">
        <h4 className="font-extrabold text-xl">Хялбар хандалт</h4>
        <p className="text-xs tracking-[0.28px]">
          Хэрэгтэй мэдээлэлдээ хурдан, хялбар замаар хүрээрэй.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {services.map((text, index) => (
          <button
            key={index}
            style={{
              // Increase the multiplier (e.g., 50ms) to make the sequence slower/faster
              transitionDelay: isVisible ? `${index * 40}ms` : "0ms",
            }}
            className={`
              text-[13px] font-medium tracking-[0.32px] px-4 py-3 rounded-full border 
              transition-all duration-500 ease-out
              ${theme === "light" ? "bg-white border-[#e6ebf3]" : "bg-[#1e2a40] border-[#2a3b55]"}
              ${
                isVisible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-95"
              }
            `}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};
