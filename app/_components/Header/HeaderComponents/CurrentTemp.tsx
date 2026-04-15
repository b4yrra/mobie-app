"use client";

import { useState, useEffect } from "react";

export const CurrWeather = () => {
  const [temp, setTemp] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=47.8864&longitude=106.9057&current=temperature_2m",
    )
      .then((r) => r.json())
      .then((d) => setTemp(d.current?.temperature_2m?.toFixed(1) ?? null))
      .catch(() => {});
  }, []);

  return (
    <div className="">
      <div className="flex items-center gap-1">
        <svg
          width="20"
          height="44"
          viewBox="0 0 52 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="15" r="8" fill="#FBBF24" />
          <ellipse cx="30" cy="24" rx="12" ry="9" fill="#FBBF24" />
          <ellipse cx="18" cy="27" rx="9" ry="8" fill="#FBBF24" />
          <rect x="9" y="24" width="33" height="13" rx="6.5" fill="#FBBF24" />
          <ellipse cx="30" cy="26" rx="11" ry="8" fill="#FDE68A" />
          <ellipse cx="18" cy="29" rx="8" ry="7" fill="#FDE68A" />
          <rect x="10" y="26" width="30" height="11" rx="5.5" fill="#FDE68A" />
        </svg>

        <span className="text-[13px] text-black font-medium dark:text-white">
          {temp !== null ? `${temp}°C` : "—"}
        </span>
      </div>
    </div>
  );
};
