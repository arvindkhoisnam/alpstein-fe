"use client";
import { cn } from "../lib/utils";

function PopularSkeleton() {
  return (
    <div
      className={cn(
        "flex max-h-full flex-col",
        "rounded-2xl",
        "border border-[var(--stats-comp-bg)]/90 bg-[var(--stats-comp-bg)]/30 backdrop-blur-xl",
        "bg-radial-[at_80%_20%] from-transparent from-60% via-blue-300/20 via-80% to-blue-400/20 to-100%",
        "gap-2 p-2"
      )}
    >
      <div className="l:grid-cols-4 l:grid grid h-full w-full grid-cols-2 gap-2 md:flex md:flex-col">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "l:h-32 md2:h-18 relative flex h-14 flex-col justify-between overflow-hidden rounded-2xl p-3 md:h-16",
              "w-full",
              "border border-[var(--stats-comp-inner-border)]/50 bg-[var(--stats-comp-inner)]/60"
            )}
          >
            <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
          </div>
        ))}
      </div>

      <div className="l:grid-cols-4 l:grid grid h-full w-full grid-cols-2 gap-2 md:flex md:flex-col">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "l:h-32 md2:h-18 relative flex h-14 flex-col justify-between overflow-hidden rounded-2xl p-3 md:h-16",
              "w-full",
              "border border-[var(--stats-comp-inner-border)]/50 bg-[var(--stats-comp-inner)]/60"
            )}
          >
            <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularSkeleton;
