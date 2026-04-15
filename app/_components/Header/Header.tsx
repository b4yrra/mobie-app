import { CurrencyRate } from "./HeaderComponents/CurrencyRate";
import { CurrCalendar } from "./HeaderComponents/CurrentCalendar";
import { CurrWeather } from "./HeaderComponents/CurrentTemp";
import { Montserrat } from "next/font/google";
import { LanguageSelection } from "./LanguageSelection/LanguageSelection";
import { HeaderWithLogo } from "./HeaderComponents/HeadersWithLogo/HeaderLogo";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
});

export const Header = () => {
  return (
    <div>
      <div className="flex flex-col gap-1 border-b border-[#e7e7e7] px-5 pt-2">
        <div>
          <LanguageSelection />
        </div>
        <div className={`flex gap-10 ${montserrat.className} tracking-tighter`}>
          <CurrWeather />
          <CurrencyRate />
          <CurrCalendar />
        </div>
      </div>
      <div className="px-2 py-3">
        <HeaderWithLogo />
      </div>
    </div>
  );
};
