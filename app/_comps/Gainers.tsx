import Image from "next/image";
import { Performer } from "./Performers";

function Gainers({ gainers }: { gainers: Performer[] }) {
  return (
    <div className="rounded-xl border border-[var(--stats-comp-inner-border)]/50 bg-[var(--stats-comp-inner)]/60 p-3">
      <h2 className="text-xs font-medium text-[var(--secondarytext)]">Top Gainers</h2>
      <ul className="mt-3 flex flex-col gap-3">
        <li className="grid grid-cols-3 items-center rounded bg-neutral-300/20 p-1 text-[10px] text-[var(--secondarytext)] md:text-xs">
          <span className="flex items-center justify-center">Symbol</span>
          <span className="flex items-center justify-center">Price</span>
          <span className="flex items-center justify-center">24hChange</span>
        </li>
        {gainers.map((c, index) => (
          <li
            className="grid grid-cols-3 items-center text-[8px] text-[var(--primarytext)] md:text-xs"
            key={index}
          >
            <span className="flex items-center justify-center gap-1">
              <Image
                height={20}
                width={20}
                src={`https://bin.bnbstatic.com/static/assets/logos/${c.symbol.split("USDT")[0]}.png`}
                alt=""
              />
              <span>{c.symbol.split("USDT")[0].slice(0, 4)}</span>
            </span>
            <span className="flex items-center justify-center">{Number(c.p).toFixed(4)}</span>
            <span className="flex items-center justify-center text-green-400">{c.pcp}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gainers;
