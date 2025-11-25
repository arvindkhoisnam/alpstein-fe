import { cn } from "../lib/utils";

function AppStatsSkeleton() {
  const LABELS = [
    "Week's total articles",
    "Positions generated",
    "Weekly performance",
    "Week's sentiments",
  ];
  return (
    <div className="flex max-h-full max-w-full gap-3 overflow-x-auto md:grid md:grid-cols-2 md:gap-2 lg:gap-2">
      {LABELS.map((label, index) => (
        <div
          key={index}
          className={cn(
            "l:h-44 l2:h-50 md2:h-86 flex h-52 min-h-52 w-72 min-w-72 flex-col gap-5 rounded-2xl p-2 md:h-72 md:max-w-full md:min-w-full lg:h-67",
            "border border-[var(--stats-comp-bg)]/90 bg-[var(--stats-comp-bg)]/30 backdrop-blur-xl",
            "bg-radial-[at_20%_20%] from-transparent from-60% via-blue-300/20 via-80% to-blue-400/20 to-100%"
          )}
        >
          <h2 className="l:text-sm flex items-center gap-1 text-xs font-light text-[var(--secondarytext)] md:gap-2">
            {label}
          </h2>
          <div className="min-h-0 flex-1">
            <div className="relative max-h-[100%] min-h-[100%] max-w-full overflow-hidden rounded-xl border border-[var(--stats-comp-inner-border)]/50 bg-[var(--stats-comp-inner)]/60 p-2 shadow-lg shadow-gray-500/50">
              <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></span>
              <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppStatsSkeleton;
