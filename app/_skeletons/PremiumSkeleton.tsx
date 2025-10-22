import { cn } from "../lib/utils";

function PremiumSkeleton() {
  return (
    <div
      className={cn(
        "h-full rounded-2xl p-10",
        "shadow-[var(--shadow)] transition-shadow duration-500"
      )}
    ></div>
  );
}

export default PremiumSkeleton;
