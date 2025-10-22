import { cn } from "../lib/utils";

function GaugeSkeleton() {
  return (
    <div
      className={cn(
        "h-full w-full text-black flex justify-center items-center rounded-2xl",
        // "shadow-[0px_0px_8px_0px_rgba(255,255,255,0.1)_inset,0px_0px_8px_0px_rgba(255,255,255,0.1)_inset]"
        "shadow-[0px_0px_8px_0px_rgba(0,0,0,0.1)_inset,0px_0px_8px_0px_rgba(0,0,0,0.1)_inset]"
      )}
    ></div>
  );
}

export default GaugeSkeleton;
