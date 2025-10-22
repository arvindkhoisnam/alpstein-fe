"use client";
import { useEffect, useRef } from "react";
import { useTickerTapeDisplay } from "../lib/zustand";
import Ticker from "./Ticker";
import { motion } from "motion/react";

function InfiniteSlide() {
  const coins = [
    "btc",
    "sol",
    "eth",
    "xrp",
    "doge",
    "ada",
    "btc",
    "sol",
    "eth",
    "xrp",
    "doge",
    "ada",
  ];
  const { displayTickerTape } = useTickerTapeDisplay();

  const parentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const scroller = parentRef.current;
    if (!window.matchMedia("prefers-reduced-motion:reduced").matches) {
      scroller?.setAttribute("data-animated", "true");
    }
  });

  return (
    <motion.div className="scroller" ref={parentRef}>
      <ul className="flex gap-10 scroller-inner">
        {coins.map((coin, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${index === 6 ? "" : ""}`}
          >
            {displayTickerTape && (
              <>
                <span className="text-[10px] text-[var(--primarytext)]">
                  {coin.toUpperCase()}
                </span>
              </>
            )}
            <Ticker symbol={coin} />
          </div>
        ))}
      </ul>
    </motion.div>
  );
}

export default InfiniteSlide;
