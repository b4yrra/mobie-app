"use client";

import { useState, useEffect } from "react";

export const CurrWeather = () => {
  const [temp, setTemp] = useState<string | null>(null);

  useEffect(() => {
    const fahrenheit = 26.8;
    const celsius = ((fahrenheit - 32) * 5) / 9;
    setTemp(celsius.toFixed(1));

    const prompt = `Ulaanbaatar, Mongolia: ${celsius.toFixed(1)}°C, mostly cloudy. One sentence, max 12 words, factual weather summary.`;

    fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 40,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        console.log("Groq:", d.choices?.[0]?.message?.content);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="">
      <div className="flex items-center gap-1">
        {/* Cloudy icon — amber tones matching screenshot */}
        <svg
          width="20"
          height="44"
          viewBox="0 0 52 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back sun */}
          <circle cx="20" cy="15" r="8" fill="#FBBF24" />
          {/* Back cloud shape */}
          <ellipse cx="30" cy="24" rx="12" ry="9" fill="#FBBF24" />
          <ellipse cx="18" cy="27" rx="9" ry="8" fill="#FBBF24" />
          <rect x="9" y="24" width="33" height="13" rx="6.5" fill="#FBBF24" />
          {/* Front lighter cloud */}
          <ellipse cx="30" cy="26" rx="11" ry="8" fill="#FDE68A" />
          <ellipse cx="18" cy="29" rx="8" ry="7" fill="#FDE68A" />
          <rect x="10" y="26" width="30" height="11" rx="5.5" fill="#FDE68A" />
        </svg>

        {/* Temperature text */}
        <span className="text-[13px] text-black font-medium">
          {temp !== null ? `${temp}°C` : "—"}
        </span>
      </div>
    </div>
  );
};
