import { cn } from "../lib/utils";
import { GridBackgroundDemo } from "./backround";

function Hero() {
  return (
    <div
      className={cn(
        // "relative flex h-screen w-full items-center justify-center bg-[var(--background)]"
        "relative flex h-screen w-full items-center justify-center bg-lime-400"
      )}
    >
      <GridBackgroundDemo />
    </div>
  );
}

export default Hero;
