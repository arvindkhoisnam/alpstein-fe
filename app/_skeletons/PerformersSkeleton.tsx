import { cn } from "../lib/utils";

function PerformersSkeleton() {
  return (
    <div
      className={cn(
        "max-h-full max-w-full rounded-2xl",
        "border border-[var(--stats-comp-bg)]/90 bg-[var(--stats-comp-bg)]/30 backdrop-blur-xl",
        "bg-radial-[at_80%_20%] from-transparent from-60% via-indigo-300/20 via-80% to-indigo-400/20 to-100%",
        "l:grid-rows-2 l:grid-cols-1 grid grid-rows-2 gap-2 p-2 md:grid-cols-2 md:grid-rows-1"
      )}
    >
      <div className="l:h-52 l:p-2 md2:h-76 h-64 rounded-xl border border-[var(--stats-comp-inner-border)]/50 bg-[var(--stats-comp-inner)]/60 p-3 lg:h-full lg:p-3">
        <h2 className="text-xs font-medium text-[var(--secondarytext)]">Top Gainers</h2>
        <ul className="l:mt-1 l:gap-2 mt-3 flex flex-col gap-3 lg:mt-3 lg:gap-3">
          <li className="grid grid-cols-3 items-center rounded bg-neutral-300/20 p-1 text-[10px] text-[var(--secondarytext)] lg:text-xs">
            <span className="flex items-center justify-center">Symbol</span>
            <span className="flex items-center justify-center">Price</span>
            <span className="flex items-center justify-center">24hChange</span>
          </li>
          {Array.from({ length: 5 }).map((_, index) => (
            <li className="relative h-5 overflow-hidden" key={index}>
              <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
            </li>
          ))}
        </ul>
      </div>
      <div className="l:h-52 l:p-2 md2:h-76 h-64 rounded-xl border border-[var(--stats-comp-inner-border)]/50 bg-[var(--stats-comp-inner)]/60 p-3 lg:h-full lg:p-3">
        <h2 className="text-xs font-medium text-[var(--secondarytext)]">Top Losers</h2>
        <ul className="l:mt-1 l:gap-2 mt-3 flex flex-col gap-3 lg:mt-3 lg:gap-3">
          <li className="grid grid-cols-3 items-center rounded bg-neutral-300/20 p-1 text-[10px] text-[var(--secondarytext)] lg:text-xs">
            <span className="flex items-center justify-center">Symbol</span>
            <span className="flex items-center justify-center">Price</span>
            <span className="flex items-center justify-center">24hChange</span>
          </li>
          {Array.from({ length: 5 }).map((_, index) => (
            <li className="relative h-5 overflow-hidden" key={index}>
              <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PerformersSkeleton;
