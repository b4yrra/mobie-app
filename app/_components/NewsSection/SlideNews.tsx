"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const SlideNew = [
  { id: 1, img: "pic1.jpg" },
  { id: 2, img: "pic2.png" },
  { id: 3, img: "pic3.jpg" },
  { id: 4, img: "pic4.jpg" },
  { id: 5, img: "pic5.png" },
  { id: 6, img: "pic6.png" },
  { id: 7, img: "pic7.png" },
];

export const SlideNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum distance required to trigger a slide (in pixels)
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === SlideNew.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? SlideNew.length - 1 : prev - 1));
  }, []);

  // Drag/Swipe Handlers
  const onTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setTouchEnd(null); // Reset
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setTouchStart(clientX);
  };

  const onTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setTouchEnd(clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div
      className={`relative w-[409px] h-[400px] overflow-hidden rounded-2xl select-none cursor-grab active:cursor-grabbing ${montserrat.className}`}
      onMouseDown={onTouchStart}
      onMouseMove={onTouchMove}
      onMouseUp={onTouchEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Counter */}
      <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-md text-white px-3 py-2 rounded-full text-xs font-medium pointer-events-none">
        {currentIndex + 1} / {SlideNew.length}
      </div>

      {/* Slider Track */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full pointer-events-none"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {SlideNew.map((elNew) => (
          <div key={elNew.id} className="w-full h-full flex-shrink-0">
            <img
              src={elNew.img}
              alt="News Banner"
              className="w-full h-full object-cover"
              draggable={false} // Prevents default ghost image drag
            />
          </div>
        ))}
      </div>
    </div>
  );
};
