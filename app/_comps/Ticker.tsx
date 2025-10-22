"use client";
import { useEffect } from "react";
import { useTickerTapeDisplay } from "../lib/zustand";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Ticker({ symbol }: { symbol: string }) {
  const { setDisplay } = useTickerTapeDisplay();
  const { data, isLoading, isError } = useQuery({
    queryKey: [symbol],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.binance.com/api/v3/ticker?symbol=${symbol.toUpperCase()}USDT`
      );
      return res.data;
    },
  });
  useEffect(() => {
    if (isLoading || isError) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [isLoading, setDisplay, isError]);
  return (
    <div className="flex gap-1 text-[10px]">
      {!isLoading && !isError && (
        <span className="text-[var(--primarytext)]">
          {parseFloat(data?.lastPrice).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </span>
      )}
      {!isLoading && !isError && (
        <span>
          <span
            className={`${
              data?.priceChangePercent.startsWith("-")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {data?.priceChangePercent.startsWith("-") ? (
              <span>&#9660;{data?.priceChangePercent}</span>
            ) : (
              <span>&#9650;{data?.priceChangePercent}</span>
            )}
            %
          </span>
        </span>
      )}
    </div>
  );
}
export default Ticker;
