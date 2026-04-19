"use client";

import { CalendarRange } from "lucide-react";
import React, { useEffect, useState } from "react";

export const CurrCalendar: React.FC = () => {
  const [date, setDate] = useState<{ month: number; day: number } | null>(null);

  useEffect(() => {
    const today = new Date();
    setDate({ month: today.getMonth() + 1, day: today.getDate() });
  }, []);

  return (
    <div className="flex items-center">
      <div className="flex gap-2">
        <div className="flex items-center">
          <CalendarRange color="blue" size={15} />
        </div>
        <div className="text-[13px] text-black font-medium dark:text-white">
          {date ? `${date.month} сарын ${date.day}` : "—"}
        </div>
      </div>
    </div>
  );
};
