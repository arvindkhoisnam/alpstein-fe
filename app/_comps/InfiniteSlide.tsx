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
    <motion.div
      className="scroller max-w-[300px] md:max-w-[600px] lg:max-w-[900px]"
      ref={parentRef}
    >
      <ul className="scroller-inner flex gap-10">
        {coins.map((coin, index) => (
          <div key={index} className={`flex items-center gap-2 ${index === 6 ? "" : ""}`}>
            {displayTickerTape && (
              <>
                <span className="text-[8px] text-[var(--primarytext)]/70 md:text-[10px]">
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
