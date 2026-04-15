"use client";

import { useState, useEffect } from "react";

const CURRENCIES = [{ code: "USD", symbol: "$", label: "US Dollar" }];

export const CurrencyRate = () => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/MNT")
      .then((r) => r.json())
      .then((data) => {
        if (data?.rates) {
          const mntPer: Record<string, number> = {};
          CURRENCIES.forEach(({ code }) => {
            if (data.rates[code]) {
              mntPer[code] = Math.round(1 / data.rates[code]);
            }
          });
          setRates(mntPer);
        } else {
          throw new Error("No rates");
        }
      })
      .catch(() => {
        setRates({ USD: 3450 });
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex items-center">
      {CURRENCIES.map(({ code, symbol, label }) => (
        <div key={code} className="flex items-center gap-2">
          {/* Circle icon */}
          <div className="w-[15px] h-[15px] rounded-full border border-emerald-500 flex items-center justify-center">
            <span className="text-emerald-500 text-xs font-medium leading-none">
              {symbol}
            </span>
          </div>

          {/* Rate */}
          <span className="text-[13px] text-black font-medium dark:text-white">
            {loading ? (
              <span className="text-gray-300">—</span>
            ) : rates[code] ? (
              <>
                {rates[code].toLocaleString()}
                <span className="text-black dark:text-white"> ₮</span>
              </>
            ) : (
              "—"
            )}
          </span>
        </div>
      ))}
    </div>
  );
};
