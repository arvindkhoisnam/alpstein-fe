import { cn } from "../lib/utils";

function TradeSkeleton() {
  return (
    <div
      className={cn(
        "[perspective::1000px] [transform-style:preserve-3d]",
        "h-full w-full rounded-4xl",
        "bg-[var(--background)] mask-b-from-90% mask-t-from-90% mask-r-from-95% mask-l-from-95%",
        "grid grid-cols-[2fr_3fr] gap-4 p-10",
        "[background-image:radial-gradient(circle_at_0.5px_0.5px,_var(--dots)_0.5px,_transparent_0)]"
      )}
      style={{
        backgroundSize: "10px 10px",
        backgroundRepeat: "repeat",
      }}
    ></div>
  );
}

export default TradeSkeleton;
