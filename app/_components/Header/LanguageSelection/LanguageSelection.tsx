import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
});

export const LanguageSelection = () => {
  return (
    <div
      className={`${montserrat.className} text-black text-[13px] font-medium flex gap-5 tracking-tighter dark:text-white`}
    >
      <div>For Foreign</div>
      <div>Монгол бичгийн хувилбар</div>
    </div>
  );
};
