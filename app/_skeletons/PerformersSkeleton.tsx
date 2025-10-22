import { cn } from "../lib/utils";

function PerformersSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-[var(--primarytext)]">Top Performing Coins</h2>
      </div>
      <div className="grid h-32 grid-cols-3 gap-3">
        <div
          className={cn(
            "flex h-1/2 h-[136px] flex-col gap-2 rounded-2xl p-4",
            "shadow-[var(--shadow)] transition-shadow duration-500"
          )}
        ></div>
        <div
          className={cn(
            "flex h-1/2 h-[136px] flex-col gap-2 rounded-2xl p-4",
            "shadow-[var(--shadow)] transition-shadow duration-500"
          )}
        ></div>
        <div
          className={cn(
            "flex h-1/2 h-[136px] flex-col gap-2 rounded-2xl p-4",
            "shadow-[var(--shadow)] transition-shadow duration-500"
          )}
        ></div>
      </div>
    </div>
  );
}

export default PerformersSkeleton;
