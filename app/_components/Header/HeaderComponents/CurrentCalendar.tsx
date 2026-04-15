import { CalendarRange } from "lucide-react";
import React from "react";

export const CurrCalendar: React.FC = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return (
    <div className="flex items-center">
      <div className="flex gap-2">
        <div className="flex items-center">
          <CalendarRange color="blue" size={15} />
        </div>
        <div className={`text-[13px] text-black font-medium dark:text-white`}>
          {month} сарын {day}
        </div>
      </div>
    </div>
  );
};
