"use client";
import axios from "axios";
import Image from "next/image";
import { cn } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CryptoData, useAllTrades, useTradePaginate } from "../lib/zustand";
import Spinner from "../_comps/Spinner";
import { useRouter } from "next/navigation";
import TradesPaginate from "../_comps/TradesPaginate";

function Page() {
  const { setCursor } = useTradePaginate();
  const { allTrades, setAllTrades } = useAllTrades();
  const { data, isLoading } = useQuery({
    queryKey: ["finished_trades"],
    queryFn: async () => {
      const res = await axios.get(`https://api.alpstein.tech/api/v1/exec-cryptos?limit=12`, {
        withCredentials: true,
      });

      setAllTrades(res.data.data);
      setCursor(
        res.data.metadata.hasPrevPage,
        res.data.metadata.hasNextPage,
        res.data.metadata.lastSeenId,
        res.data.metadata.lastSeenTime,
        res.data.metadata.firstSeenId,
        res.data.metadata.firstSeenTime
      );
      return res.data.data;
    },
  });
  return (
    <div
      className={cn(
        "mx-auto max-w-[1440px] p-2 lg:flex lg:items-center lg:gap-4 lg:p-0"
        // "bg-gradient-to-tl from-transparent from-20% via-slate-600/20 via-50% to-transparent to-80%"
      )}
    >
      <div
        className="hidden h-screen min-w-10 border-x border-[var(--cardborder)]/50 bg-fixed lg:block"
        style={{
          backgroundImage: `repeating-linear-gradient(315deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
          backgroundSize: "10px 10px",
        }}
      ></div>
      {isLoading && (
        <div className="flex h-screen w-full items-center justify-center lg:mt-0">
          <Spinner showPrice={true} />
        </div>
      )}

      {data && (
        <div className="mt-20 flex w-full flex-col overflow-scroll rounded-xl border border-neutral-700/50 bg-neutral-700/10 lg:mt-0">
          {allTrades.map((d: CryptoData, index: number) => (
            <Comp
              dataLength={allTrades.length}
              index={index}
              key={d.id}
              id={d.id}
              symbol={d.symbol}
              status={d.status}
              position={d.triggeredposition}
              trigTime={d.triggeredat}
              closeTime={d.closureat}
            />
          ))}
          <TradesPaginate />
        </div>
      )}
      <div
        className="hidden h-screen min-w-10 border-x border-[var(--cardborder)]/50 bg-fixed lg:block"
        style={{
          backgroundImage: `repeating-linear-gradient(315deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
          backgroundSize: "10px 10px",
        }}
      ></div>
    </div>
  );
}

function Comp({
  dataLength,
  index,
  id,
  symbol,
  status,
  position,
  trigTime,
  closeTime,
}: {
  dataLength: number;
  index: number;
  id: string;
  symbol: string;
  status: string;
  position: string;
  trigTime: number;
  closeTime: number;
}) {
  const router = useRouter();
  function timeFormat(time: number) {
    const t = new Date(time).toLocaleString().split(",");
    const formattedTime = `${t[1].split(":")[0]}:${t[1].split(":")[1]}`;
    return formattedTime;
  }
  function dateFormatter(time: number) {
    const date = new Date(time).toLocaleString().split(",");
    const formattedDate = `${date[0].split("/")[0]}/${date[0].split("/")[1]}`;
    return formattedDate;
  }
  return (
    <div
      className={`grid grid-cols-6 p-3 text-[8px] font-extralight text-[var(--secondarytext)] md:gap-4 md:p-3 md:text-xs 2xl:p-5 ${dataLength - 1 !== index ? "border-b border-neutral-700/50" : ""} `}
    >
      <div className="flex items-center justify-start gap-1">
        <Image height={20} width={20} src={`/${symbol}.png`} alt="crypto-image" />
        <span>{symbol}</span>
      </div>
      <button
        className="flex w-fit cursor-pointer items-center justify-start rounded-full bg-sky-700/20 px-2 text-sky-600 hover:text-indigo-600 lg:font-medium"
        onClick={() => router.replace(`/trades/${id}`)}
      >
        review
      </button>
      <div className={`flex items-center justify-start gap-1 lg:gap-2`}>
        <span
          className={`size-1 rounded-full md:size-2 ${status === "sl_hit" ? "bg-red-500" : "bg-green-500"}`}
        ></span>
        {status}
      </div>
      <div className="flex items-center justify-start">{position}</div>
      <div className="flex items-center justify-start text-[7px] md:text-sm">{`${timeFormat(trigTime)} | ${dateFormatter(trigTime)}`}</div>
      <div className="flex items-center justify-start text-[7px] md:text-sm">{`${timeFormat(closeTime)} | ${dateFormatter(closeTime)}`}</div>
    </div>
  );
}

export default Page;
