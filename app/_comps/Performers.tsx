import { useQuery } from "@tanstack/react-query";
import { cn } from "../lib/utils";
import Gainers from "./Gainers";
import Losers from "./Losers";
import axios from "axios";
import { useState } from "react";
import PerformersSkeleton from "../_skeletons/PerformersSkeleton";

type TickerStats = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
};

export type Performer = {
  symbol: string;
  p: string;
  pcp: string;
};

function Performers() {
  const [gainers, setGainers] = useState<Performer[] | []>([]);
  const [losers, setLosers] = useState<Performer[] | []>([]);

  const { isLoading } = useQuery({
    queryKey: ["gainers"],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.binance.com/api/v3/ticker/24hr?symbolStatus=TRADING"
      );

      const usdtPairs = res.data.filter((item: TickerStats) => item.symbol.endsWith("USDT"));
      const sorted = usdtPairs.sort(
        (a: TickerStats, b: TickerStats) =>
          Number(b.priceChangePercent) - Number(a.priceChangePercent)
      );

      const gainers: Performer[] = sorted
        .slice(0, 5)
        .map((c: TickerStats) => ({ symbol: c.symbol, p: c.lastPrice, pcp: c.priceChangePercent }));

      const losers: Performer[] = sorted
        .slice(sorted.length - 5, sorted.length)
        .sort(
          (a: TickerStats, b: TickerStats) =>
            Number(a.priceChangePercent) - Number(b.priceChangePercent)
        )
        .map((c: TickerStats) => ({ symbol: c.symbol, p: c.lastPrice, pcp: c.priceChangePercent }));

      setGainers(gainers);
      setLosers(losers);

      return res.data;
    },
  });
  if (isLoading) {
    return <PerformersSkeleton />;
  }
  return (
    <div
      className={cn(
        "max-h-full max-w-full rounded-2xl",
        "border border-[var(--stats-comp-bg)]/90 bg-[var(--stats-comp-bg)]/30 backdrop-blur-xl",
        "bg-radial-[at_80%_20%] from-transparent from-60% via-indigo-300/20 via-80% to-indigo-400/20 to-100%",
        "l:grid-rows-2 l:grid-cols-1 grid grid-rows-2 gap-2 p-2 md:grid-cols-2 md:grid-rows-1"
      )}
    >
      {!isLoading && (
        <>
          <Gainers gainers={gainers} />
          <Losers losers={losers} />
        </>
      )}
    </div>
  );
}

export default Performers;
