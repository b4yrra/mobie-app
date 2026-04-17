import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

interface CardItem {
  title: string;
  buttonText: string;
  image: string;
  bg: string;
}

const cards: CardItem[] = [
  {
    title: "Төрийн байгууллагууд",
    buttonText: "Дэлгэрэнгүй",
    image:
      "https://cache.e-mongolia.mn/files/portal-v5/images/home/gov-button.svg",
    bg: "#003087",
  },
  {
    title: "Үйлчилгээ авах",
    buttonText: "Дэлгэрэнгүй",
    image:
      "https://cache.e-mongolia.mn/files/portal-v5/images/home/service-button.svg",
    bg: "#004dd9",
  },
  {
    title: "Цахим сургалт",
    buttonText: "Дэлгэрэнгүй",
    image:
      "https://cache.e-mongolia.mn/files/portal-v5/images/home/course-button.svg",
    bg: "#067aff",
  },
];

export const MainSection: React.FC = () => {
  return (
    <div className={`flex flex-col w-full px-3 gap-2 ${montserrat.className}`}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={`relative flex items-stretch justify-between pl-5 min-h-[120px] overflow-hidden rounded-lg`}
          style={{ backgroundColor: card.bg }}
        >
          {/* Left content */}
          <div className="z-10 flex flex-col justify-center gap-3 flex-1 py-5 pr-3">
            <h2 className="text-white text-lg font-extrabold leading-snug tracking-tighter">
              {card.title}
            </h2>
            <button className="w-fit text-white text-sm border border-white/60 bg-black/60 hover:bg-white/25 active:bg-white/30 transition-colors rounded-full px-5 py-1.5">
              {card.buttonText}
            </button>
          </div>

          {/* Right image — full height, flush to right edge */}
          <div className="relative w-36 flex-shrink-0 self-stretch">
            {/* left fade overlay matching card bg start color */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background: `linear-gradient(to right, ${card.bg} 5%, transparent 100%)`,
              }}
            />
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
