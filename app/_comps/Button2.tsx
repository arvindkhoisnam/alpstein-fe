import React from "react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
function Button2({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <motion.button
      initial={{
        opacity: 0,
        scale: 0.85,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        delay: 0.1,
      }}
      onClick={onClick}
      className={cn(
        "group relative h-10 w-24 cursor-pointer overflow-hidden rounded-lg p-[1px] md:w-32"
        // "animate-[var(--animate-rotate-border)] bg-conic/[from_var(--border-angle)] from-[var(--btnbg)] from-30% via-fuchsia-500 via-50% to-[var(--btnbg)] to-70%"
      )}
    >
      <span
        className={cn(
          "absolute -top-[50%] -left-10 h-[170%] w-6 -rotate-15 bg-gradient-to-r from-transparent via-zinc-50/50 to-transparent dark:via-zinc-500/40",
          // "transition-all duration-1000 group-hover:left-45"
          "transition-all ease-in group-hover:animate-[shimmer_0.5s_linear]"
        )}
      ></span>
      <span className="flex h-full w-full items-center justify-center rounded-lg border border-[var(--btnborder)] bg-[var(--btnbg)] text-[10px] text-[var(--secondarytext)] md:text-xs">
        {text}
      </span>
    </motion.button>
  );
}

export default Button2;
