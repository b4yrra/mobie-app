"use client";

import React, { useRef, useState, useEffect } from "react";
import { GuideMenu } from "./_components/HeroSection/GuideMenu";
import { HeroInputSection } from "./_components/HeroSection/HeroInput";
import { MainSection } from "./_components/MenuCards/MainSection";
import { ServiceSelection } from "./_components/MenuCards/ServiceSelections";
import { NewsDashboard } from "./_components/NewsSection/NewsSection";
import { SlideNews } from "./_components/NewsSection/SlideNews";
import { MongolianStatsDashboard } from "./_components/Footer/BottomInformation";
import { FooterSection } from "./_components/Footer/FooterSection";

const ScrollSection = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

export const PageContainer = () => {
  return (
    <div>
      <div className="flex flex-col gap-10">
        <ScrollSection>
          <HeroInputSection />
        </ScrollSection>

        <ScrollSection>
          <MainSection />
        </ScrollSection>

        <ScrollSection>
          <ServiceSelection />
        </ScrollSection>

        <ScrollSection>
          <GuideMenu />
        </ScrollSection>

        <ScrollSection>
          <NewsDashboard />
        </ScrollSection>
      </div>

      <div className="px-3 mt-20">
        <ScrollSection>
          <SlideNews />
        </ScrollSection>

        <ScrollSection>
          <MongolianStatsDashboard />
        </ScrollSection>
      </div>
    </div>
  );
};
