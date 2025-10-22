import { cn } from "../lib/utils";

function AppStatsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-[var(--primarytext)]">Statistics</h2>
      </div>
      <div className="grid h-full grid-cols-3 gap-3">
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "relative flex h-1/2 h-[136px] flex-col gap-2 overflow-hidden rounded-2xl p-4",
                "shadow-[var(--shadow)] transition-shadow duration-500"
              )}
            >
              <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}

export default AppStatsSkeleton;
