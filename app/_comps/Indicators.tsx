import axios from "axios";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { TbSum } from "react-icons/tb";
import { IconType } from "react-icons";
import { IoStatsChartSharp } from "react-icons/io5";
import { SiChartmogul } from "react-icons/si";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { useCurrentCryptoId } from "../lib/zustand";
type BinanceKline = [
  number, // Open time (ms since epoch)
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Close time (ms since epoch)
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Unused field
];

function Indicators() {
  const { cryptoData } = useCurrentCryptoId();
  const [rsi, setRsi] = useState("");
  const [fiftyFiveEMA, setFiftyFiveEma] = useState("");
  const [hundredSMA, setHundredSma] = useState("");
  const [volume, setVolume] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["indicators"],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${cryptoData?.symbol.toUpperCase()}USDT&interval=1h&limit=200`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      setVolume(data.at(-1)[5]);
      const closePrices = data.map((d: BinanceKline) => parseFloat(d[4]));

      const changes = [];
      for (let i = 1; i < closePrices.length; i++) {
        changes.push(closePrices[i] - closePrices[i - 1]);
      }

      const gains = changes.map(change => (change > 0 ? change : 0));
      const losses = changes.map(change => (change < 0 ? Math.abs(change) : 0));

      const period = 14;

      // Initial average
      let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
      let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;

      let rs = avgGain / avgLoss;
      let rsi = 100 - 100 / (1 + rs);

      // Smooth RSI over remaining candles
      for (let i = period; i < gains.length; i++) {
        const gain = gains[i];
        const loss = losses[i];

        avgGain = (avgGain * (period - 1) + gain) / period;
        avgLoss = (avgLoss * (period - 1) + loss) / period;

        rs = avgGain / avgLoss;
        rsi = 100 - 100 / (1 + rs);
      }

      setRsi(rsi.toFixed(2));

      const emaPeriod = 55;
      const k = 2 / (emaPeriod + 1); // smoothing factor
      let ema = closePrices[0];
      for (let i = 1; i < closePrices.length; i++) {
        ema = closePrices[i] * k + ema * (1 - k);
      }

      setFiftyFiveEma(ema.toFixed(2));
      const smaPeriod100 = 100;
      const latest100 = closePrices.slice(-smaPeriod100); // last 55 closes
      const sma100 = latest100.reduce((a: number, b: number) => a + b, 0) / smaPeriod100;
      setHundredSma(sma100.toFixed(2));
    }
  }, [data, isLoading]);

  function CalcVolume() {
    const vol = Number(volume) / 1000;
    if (vol > 999) {
      return `${(vol / 1000).toFixed(2)}M`;
    }
    return `${vol.toFixed(2)}K`;
  }

  return (
    <motion.div className={cn("flex w-full flex-col gap-1 rounded-lg")}>
      <span className="font:medium text-sm text-[var(--secondarytext)] md:text-xs md:font-semibold 2xl:text-sm">
        Indicators
      </span>
      {isLoading ? (
        <div className="flex h-36 w-full items-center justify-center rounded-lg border border-[var(--cardborder)]">
          <Spinner showPrice={true} />
        </div>
      ) : (
        <div className="grid w-full grid-cols-2 gap-1 rounded-md">
          <Indicator label={"RSI"} val={rsi} Logo={SiChartmogul} />
          <Indicator label={"EMA"} val={fiftyFiveEMA} Logo={TbSum} />
          <Indicator label={"SMA"} val={hundredSMA} Logo={TbSum} />
          <Indicator label={"Volume"} val={CalcVolume()} Logo={IoStatsChartSharp} />
        </div>
      )}
    </motion.div>
  );
}

function Indicator({ label, val, Logo }: { label: string; val: string; Logo: IconType }) {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-start justify-center rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 xl:p-1.5 2xl:p-1",
        "border border-[var(--cardborder)]"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center gap-1">
          <Logo size={15} />
          {label}
        </span>
        {label === "EMA" || label === "SMA" ? (
          <div>
            <select className="w-12 outline-none">
              <option className="bg-rose-500 text-green-500">21 d</option>
              <option className="bg-rose-500 text-green-500">55 d</option>
              <option className="bg-rose-500 text-green-500">100 d</option>
              <option className="bg-rose-500 text-green-500">200 d</option>
            </select>
          </div>
        ) : (
          ""
        )}
      </div>
      <span className="text-base font-medium text-[var(--primarytext)] 2xl:text-lg">{val}</span>
    </motion.div>
  );
}

export default Indicators;
