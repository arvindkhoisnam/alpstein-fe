import { cn } from "../lib/utils";

function CryptoDashSkeleton() {
  return (
    <div
      className={cn(
        "relative mt-24 flex grid max-h-screen w-full grid-cols-[1fr_2fr] gap-2 bg-rose-500 lg:grid-cols-[1fr_2fr_1fr]"
      )}
    ></div>
  );
}

export default CryptoDashSkeleton;
