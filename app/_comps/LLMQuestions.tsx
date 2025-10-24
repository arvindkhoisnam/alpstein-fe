"use client";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { useCurrentCryptoId } from "../lib/zustand";
// import { MdQuestionMark } from "react-icons/md";
// import { IoTimerOutline } from "react-icons/io5";
// import { PiNewspaperClipping } from "react-icons/pi";
// import { BsGraphDownArrow } from "react-icons/bs";
function LLMQuestions() {
  const { cryptoData } = useCurrentCryptoId();
  return (
    <motion.div
      key={cryptoData?.id}
      className={cn(
        "w-full flex-auto rounded-md p-px",
        "animate-[var(--animate-rotate-border)] bg-conic/[from_var(--border-angle)] from-[var(--btnbg)] from-0% via-slate-500 via-15% to-[var(--btnbg)] to-0%"
      )}
    >
      <div className={cn("rounded-md bg-[var(--background)]")}>
        <div
          className={cn(
            "flex h-full w-full flex-col gap-2 rounded-md p-2 text-[10px] text-[var(--secondarytext)]",
            "bg-gradient-to-tr from-slate-600/10 from-[20%] via-violet-400/20 via-[80%] to-indigo-700/30 to-[100%]"
          )}
        >
          <span className="text-sm font-semibold">About {cryptoData?.symbol}</span>
          <div className="overflow-y-auto">{cryptoData?.about}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default LLMQuestions;
