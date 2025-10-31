import { cn } from "../lib/utils";

function PerformersSkeleton() {
  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-[var(--primarytext)] md:text-lg">Top Five</h2>
        </div>
        <div className="mx-auto flex h-full w-[95%] grid-cols-2 gap-2 overflow-x-auto mask-x-from-95% py-2 md:grid md:w-full md:grid-cols-5 md:mask-x-from-100% md:p-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "relative flex h-[130px] w-56 flex-col justify-between rounded-lg p-3 md:rounded-2xl",
                "shadow-[var(--shadow)] transition-shadow duration-500"
              )}
            >
              <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-[var(--primarytext)] md:text-lg">Bottom Five</h2>
        </div>
        <div className="mx-auto flex h-full w-[95%] grid-cols-2 gap-2 overflow-x-auto mask-x-from-95% py-2 md:grid md:w-full md:grid-cols-5 md:mask-x-from-100% md:p-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "relative flex h-[130px] w-56 flex-col justify-between rounded-lg p-3 md:rounded-2xl",
                "shadow-[var(--shadow)] transition-shadow duration-500"
              )}
            >
              <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PerformersSkeleton;
