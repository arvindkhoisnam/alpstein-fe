"use client";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { cn } from "../lib/utils";
import LineChart from "./LineChart";
import { motion } from "motion/react";
import { useWindowWidth } from "../lib/zustand";

type Ticker = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  lastPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
};

async function getTicker(coin: string) {
  const res = await axios(
    `https://api.binance.com/api/v3/ticker/tradingDay?symbol=${coin.toUpperCase()}USDT`
  );
  return res.data as Ticker;
}

type CoinConfig = {
  [coin: string]: {
    name: string;
    color: {
      light: string;
      dark: string;
    };
  };
};
const COIN_CONFIG: CoinConfig = {
  BTC: {
    name: "Bitcoin",
    color: {
      light: "#ff6900",
      dark: "#ffb86a",
    },
  },
  DOGE: {
    name: "Doge",
    color: {
      light: "#fe9a00",
      dark: "#ffd230",
    },
  },
  XRP: {
    name: "Ripple",
    color: {
      light: "#00d5be",
      dark: "#46ecd5",
    },
  },
  ETH: {
    name: "Ethereum",
    color: {
      light: "#74d4ff",
      dark: "#00bcff",
    },
  },
  BNB: {
    name: "Binance",
    color: {
      light: "#fe9a00",
      dark: "#ffd230",
    },
  },
  ADA: {
    name: "Cardano",
    color: {
      light: "#1447e6",
      dark: "#2b7fff",
    },
  },
  SOL: {
    name: "Solana",
    color: {
      light: "#00bba7",
      dark: "#00d5be",
    },
  },
  LINK: {
    name: "Link",
    color: {
      light: "#00bba7",
      dark: "#00d5be",
    },
  },
  DOT: {
    name: "Polkadot",
    color: {
      light: "#00bba7",
      dark: "#00d5be",
    },
  },
};

export default function TopPerformers() {
  const [topCoins, setTopCoins] = useState<Ticker[]>([]);
  const { windowWidth } = useWindowWidth();
  const [loading, setLoading] = useState(false);
  const [endTop, setEndTop] = useState(0);
  const [startBot, setStartBot] = useState(0);
  const [endBot, setEndBot] = useState(0);
  // const symbols1 = ["btc", "eth", "xrp", "bnb", "sol", "doge", "ada"];

  const symbols = useMemo(() => {
    const symbols1 = ["btc", "eth", "xrp", "bnb", "sol", "doge", "ada", "link", "dot"];
    return symbols1;
  }, []);
  useEffect(() => {
    async function getTopCoins() {
      setLoading(true);
      try {
        // const res = await axios(
        //   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10"
        // );

        // const symbols = res.data
        //   .filter(d => !["usdt", "usdc", "steth"].includes(d.symbol))
        //   .map(d => d.symbol);

        // console.log(symbols);
        console.log(symbols);
        const tickers = await Promise.all(symbols.map((c: string) => getTicker(c)));
        setTopCoins(tickers);
        setLoading(false);
        if (windowWidth >= 768) {
          setEndTop(3);
          setStartBot(6);
          setEndBot(9);
        } else {
          setEndTop(4);
          setStartBot(5);
          setEndBot(9);
        }
      } catch (err) {
        console.error("Error fetching tickers:", err);
      }
    }
    getTopCoins();
  }, [symbols, windowWidth]);

  console.log(windowWidth >= 768);
  const sortedCoins = [...topCoins].sort(
    (a, b) => Number(b.priceChangePercent) - Number(a.priceChangePercent)
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-[var(--primarytext)] md:text-xl">
            {windowWidth >= 786 ? "Top Three" : "Top Four"}
          </h2>
        </div>
        <div className="grid h-full grid-cols-2 gap-2 md:grid-cols-3">
          {!loading ? (
            sortedCoins.slice(0, endTop).map(coin => <TopCoin coin={coin} key={coin.symbol} />)
          ) : (
            <>
              {Array.from({ length: endTop }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative flex h-1/2 h-[136px] flex-col gap-2 overflow-hidden rounded-2xl p-4",
                    "shadow-[var(--shadow)] transition-shadow duration-500"
                  )}
                >
                  <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-[var(--primarytext)] md:text-xl">
            {windowWidth >= 786 ? "Bottom Three" : "Bottom Four"}
          </h2>
        </div>
        <div className="grid h-full grid-cols-2 gap-2 md:grid-cols-3">
          {!loading ? (
            sortedCoins
              .slice(startBot, endBot)
              .map(coin => <TopCoin coin={coin} key={coin.symbol} />)
          ) : (
            <>
              {Array.from({ length: endBot }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative flex h-1/2 h-[136px] flex-col gap-2 overflow-hidden rounded-2xl p-4",
                    "shadow-[var(--shadow)] transition-shadow duration-500"
                  )}
                >
                  <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TopCoin({
  coin,
}: {
  coin: {
    symbol: string;
    priceChange: string;
    priceChangePercent: string;
  };
}) {
  return (
    <motion.div
      draggable
      className={cn(
        "relative flex h-full flex-col justify-between rounded-2xl p-3",
        "shadow-[var(--shadow)] transition-shadow duration-500"
      )}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          filter: "blur(10px)",
          bottom: 0, // Start at bottom: 0
          // top: "auto", // Override top to 'auto'
          height: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          top: 4, // Animate to top: 0
          // bottom: "auto", // Remove bottom constraint
          height: 100,
        }}
        transition={{
          duration: 1,
          ease: "easeIn",
          delay: 0.3,
        }}
        className={`absolute -left-[0.5px] w-[2px]`}
        style={{
          backgroundImage: `linear-gradient(to top, transparent 40%, ${
            COIN_CONFIG[coin.symbol.split("U")[0]].color.light
          } 80%, transparent 90%)`,
        }}
      ></motion.div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.img
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.2,
              ease: "easeIn",
              delay: 0.3,
            }}
            src={`/${coin.symbol.split("U")[0]}.png`}
            alt="crypto-image"
            height={30}
            width={30}
          />
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.2,
              ease: "easeIn",
              delay: 0.3,
            }}
            className="flex flex-col"
          >
            <span className="md:text-md text-[10px] text-[var(--primarytext)]">
              {coin.symbol.split("U")[0]}
            </span>
            <span className="md:text-md text-[10px] text-zinc-600">
              {COIN_CONFIG[coin.symbol.split("U")[0]].name}
            </span>
          </motion.div>
        </div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.2,
            ease: "easeIn",
            delay: 0.3,
          }}
          className="flex flex-col"
        >
          <span className="md:text-md text-[10px] text-[var(--primarytext)]">
            {coin.priceChange.startsWith("-") ? "" : "+"}
            {Math.round(100 * Number(coin.priceChange)) / 100}
          </span>
          <span
            className={`md:text-md text-[10px] ${coin.priceChangePercent?.startsWith("-") ? "text-red-500" : "text-green-500"}`}
          >
            {coin.priceChangePercent?.startsWith("-") ? (
              <span>&#9660;{Math.round(100 * Number(coin.priceChangePercent)) / 100}%</span>
            ) : (
              <span>&#9650;{Math.round(100 * Number(coin.priceChangePercent)) / 100}%</span>
            )}
            %
          </span>
        </motion.div>
      </div>
      <LineChart
        coin={coin.symbol.split("U")[0]}
        direction={coin.priceChange.startsWith("-") ? "down" : "up"}
      />
    </motion.div>
  );
}
