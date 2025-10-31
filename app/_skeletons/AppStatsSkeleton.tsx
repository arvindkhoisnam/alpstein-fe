import { cn } from "../lib/utils";

function AppStatsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-[var(--primarytext)] md:text-lg">Statistics</h2>
      </div>
      <div className="mx-auto flex max-w-[95%] gap-3 overflow-x-auto mask-x-from-95% md:grid md:max-w-full md:grid-cols-3 md:gap-5 md:mask-x-from-100%">
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                // "relative flex h-1/2 h-[136px] flex-col gap-2 overflow-hidden rounded-2xl p-4",
                "flex h-56 w-full flex-col gap-1 rounded-lg p-2 md:h-44 md:w-44 md:gap-2 md:rounded-xl md:p-4 xl:h-68 xl:w-90 2xl:h-80 2xl:w-96",
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
