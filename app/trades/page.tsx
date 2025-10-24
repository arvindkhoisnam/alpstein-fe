"use client";
import axios from "axios";
import Image from "next/image";
import { cn } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { CryptoData } from "../lib/zustand";
import Spinner from "../_comps/Spinner";
import { useRouter } from "next/navigation";

function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["finished_trades"],
    queryFn: async () => {
      const res = await axios.get(`https://api.alpstein.tech/api/v1/exec-cryptos?limit=9`, {
        withCredentials: true,
      });
      return res.data.data;
    },
  });
  console.log(data?.length);
  return (
    <div
      className={cn(
        "flex h-screen w-full flex-col items-center bg-[var(--background)] px-2",
        "bg-gradient-to-tl from-transparent from-20% via-slate-600/20 via-50% to-transparent to-80%"
      )}
    >
      <div className="mt-24 grid h-8 grid-cols-6 gap-6 rounded-md bg-indigo-500 px-2 text-[10px] font-extralight text-white md:w-3/4 md:text-base">
        <div className="flex items-center justify-center">Symbol</div>
        <div className="flex items-center justify-center">Source</div>
        <div className="flex items-center justify-center">Status</div>
        <div className="flex items-center justify-center">Position</div>
        {/* <div className="flex items-center justify-center">Price</div>
        <div className="flex items-center justify-center">Target</div> */}
        <div className="flex items-center justify-center">Triggered</div>
        <div className="flex items-center justify-center">Closure</div>
      </div>
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center md:w-3/4">
          <Spinner showPrice={true} />
        </div>
      )}

      {data && (
        <div className="flex h-3/4 w-full flex-col gap-10 overflow-scroll px-1 pt-4 md:w-3/4">
          {data.map((d: CryptoData) => (
            <Comp
              key={d.id}
              id={d.id}
              symbol={d.symbol}
              source={d.sourceurl}
              status={d.status}
              position={d.triggeredposition}
              trigTime={d.triggeredat}
              closeTime={d.closureat}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Comp({
  id,
  symbol,
  source,
  status,
  position,
  trigTime,
  closeTime,
}: {
  id: string;
  symbol: string;
  source: string;
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
    <div className="grid grid-cols-6 text-[8px] font-extralight text-[var(--secondarytext)] md:gap-4 md:text-sm">
      <div className="flex items-center justify-center gap-1">
        <Image height={20} width={20} src={`/${symbol}.png`} alt="crypto-image" />
        <span>{symbol}</span>
      </div>
      <button
        className="flex cursor-pointer items-center justify-center font-semibold text-indigo-400 underline hover:text-indigo-600"
        onClick={() => router.replace(`/trades/${id}`)}
      >
        {source.split(".co")[0].includes("cointelegraph")
          ? source.split(".co")[0].split("https://")[1]
          : source.split(".co")[0].split("www.")[1]}
      </button>
      <div
        className={`flex items-center justify-center ${status === "sl_hit" ? "text-red-600" : "text-green-600"}`}
      >
        {status}
      </div>
      <div className="flex items-center justify-center">{position}</div>
      <div className="flex items-center justify-center text-[7px] md:text-sm">{`${timeFormat(trigTime)} | ${dateFormatter(trigTime)}`}</div>
      <div className="flex items-center justify-center text-[7px] md:text-sm">{`${timeFormat(closeTime)} | ${dateFormatter(closeTime)}`}</div>
    </div>
  );
}

export default Page;
