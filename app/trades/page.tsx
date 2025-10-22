"use client";
import axios from "axios";
import Image from "next/image";
import { cn } from "../lib/utils";
import { GiMountaintop } from "react-icons/gi";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { CryptoData } from "../lib/zustand";

function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["finished_trades"],
    queryFn: async () => {
      const res = await axios.get(`https://api.alpstein.tech/api/v1/exec-cryptos?limit=30`, {
        withCredentials: true,
      });
      return res.data.data;
    },
  });
  console.log(data?.length);
  return (
    <div
      className={cn(
        "relative flex h-screen items-center justify-center bg-[var(--background)]",
        "bg-gradient-to-tl from-transparent from-20% via-slate-600/20 via-50% to-transparent to-80%"
      )}
    >
      <GiMountaintop size={700} className="absolute text-[var(--secondarytext)] opacity-1" />
      <div className="h-3/4 w-3/4 overflow-scroll rounded-xl border border-[var(--cardborder)] p-3">
        <div className="mb-5 grid h-10 w-full grid-cols-8 gap-2 rounded-md bg-indigo-500 text-white">
          <div className="flex items-center justify-center">Symbol</div>
          <div className="flex items-center justify-center">Source</div>
          <div className="flex items-center justify-center">Status</div>
          <div className="flex items-center justify-center">Position</div>
          <div className="flex items-center justify-center">Price</div>
          <div className="flex items-center justify-center">Target</div>
          <div className="flex items-center justify-center">Trigger Time</div>
          <div className="flex items-center justify-center">Closure Time</div>
        </div>
        <div className="grid w-full grid-cols-8 gap-7 text-xs text-[var(--secondarytext)]">
          {!isLoading &&
            data?.map((d: CryptoData) => (
              <Comp
                key={d.id}
                symbol={d.symbol}
                source={d.sourceurl}
                status={d.status}
                position={d.triggeredposition}
                price="112450"
                target="114750"
                trigTime={d.triggeredat}
                closeTime={d.closureat}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function Comp({
  symbol,
  source,
  status,
  position,
  price,
  target,
  trigTime,
  closeTime,
}: {
  symbol: string;
  source: string;
  status: string;
  position: string;
  price: string;
  target: string;
  trigTime: number;
  closeTime: number;
}) {
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
    <>
      <div className="flex items-center justify-center gap-2">
        <Image height={20} width={20} src={`/${symbol}.png`} alt="crypto-image" />
        <span>{symbol}</span>
      </div>
      <Link
        className="flex items-center justify-center text-indigo-400 underline"
        href={source}
        target="_blank"
      >
        {source.split(".co")[0].includes("cointelegraph")
          ? source.split(".co")[0].split("https://")[1]
          : source.split(".co")[0].split("www.")[1]}
      </Link>
      <div
        className={`flex items-center justify-center ${status === "sl_hit" ? "text-red-600" : "text-green-600"}`}
      >
        {status}
      </div>
      <div className="flex items-center justify-center">{position}</div>
      <div className="flex items-center justify-center">{price}</div>
      <div className="flex items-center justify-center">{target}</div>
      <div className="flex items-center justify-center">{`${timeFormat(trigTime)} | ${dateFormatter(trigTime)}`}</div>
      <div className="flex items-center justify-center">{`${timeFormat(closeTime)} | ${dateFormatter(closeTime)}`}</div>
    </>
  );
}

export default Page;
