"use client";
import { useMemo } from "react";
import axios from "axios";
import { cn } from "../lib/utils";
import LineChart from "./LineChart";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import PerformersSkeleton from "../_skeletons/PerformersSkeleton";

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
  AAVE: {
    name: "Polkadot",
    color: {
      light: "#00bba7",
      dark: "#00d5be",
    },
  },
};

export default function TopPerformers() {
  const symbols = useMemo(() => {
    const symbols1 = ["btc", "eth", "xrp", "bnb", "sol", "doge", "ada", "link", "dot", "aave"];
    return symbols1;
  }, []);

  // useEffect(() => {
  //   async function getTopCoins() {
  //     setLoading(true);
  //     try {
  //       // const res = await axios(
  //       //   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10"
  //       // );

  //       // const symbols = res.data
  //       //   .filter(d => !["usdt", "usdc", "steth"].includes(d.symbol))
  //       //   .map(d => d.symbol);

  //       // console.log(symbols);
  //       const tickers = await Promise.all(symbols.map((c: string) => getTicker(c)));
  //       setTopCoins(tickers);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error fetching tickers:", err);
  //     }
  //   }
  //   getTopCoins();
  // }, [symbols]);

  const { data, isLoading } = useQuery({
    queryKey: ["performers"],
    queryFn: async () => {
      const tickers = await Promise.all(symbols.map((c: string) => getTicker(c)));
      const sortedCoins = [...tickers].sort(
        (a, b) => Number(b.priceChangePercent) - Number(a.priceChangePercent)
      );
      return sortedCoins;
    },
  });

  // const sortedCoins = [...topCoins].sort(
  //   (a, b) => Number(b.priceChangePercent) - Number(a.priceChangePercent)
  // );

  if (isLoading) {
    return <PerformersSkeleton />;
  }

  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-[var(--primarytext)] md:text-lg">Top Five</h2>
        </div>
        <div className="mx-auto flex h-full w-[95%] grid-cols-2 gap-2 overflow-x-auto mask-x-from-95% py-2 md:grid md:w-full md:grid-cols-5 md:mask-x-from-100% md:p-0">
          {!isLoading && data?.slice(0, 5).map(coin => <Coin coin={coin} key={coin.symbol} />)}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-[var(--primarytext)] md:text-lg">Bottom Five</h2>
        </div>
        <div className="mx-auto flex h-full w-[95%] grid-cols-2 gap-2 overflow-x-auto mask-x-from-95% py-2 md:grid md:w-full md:grid-cols-5 md:mask-x-from-100% md:p-0">
          {!isLoading && data?.slice(5, 10).map(coin => <Coin coin={coin} key={coin.symbol} />)}
        </div>
      </div>
    </div>
  );
}

function Coin({
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
        "relative flex h-full flex-col justify-between rounded-md p-3 md:rounded-2xl",
        "w-56 shadow-[var(--shadow)] transition-shadow duration-500 md:w-48 2xl:w-56"
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
