import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { useCurrentCryptoId } from "../lib/zustand";
function LLMQuestions() {
  const { cryptoData } = useCurrentCryptoId();
  return (
    <motion.div
      key={cryptoData?.id}
      className={cn(
        "max-h-90 max-w-full min-w-full rounded-md bg-white p-px",
        "animate-[var(--animate-rotate-border)] bg-conic/[from_var(--border-angle)] from-[var(--btnbg)] from-0% via-indigo-500/80 via-15% to-[var(--btnbg)] to-0%"
      )}
    >
      <div className="h-full w-full rounded-md bg-[var(--background)]">
        <div
          className={cn(
            "flex max-h-full min-h-full max-w-full min-w-full flex-col overflow-y-auto rounded-md p-2 text-[10px] font-medium text-[var(--secondarytext)]",
            "bg-gradient-to-tr from-slate-600/10 from-[20%] via-violet-400/20 via-[80%] to-indigo-700/30 to-[100%]",
            "mask-b-90%"
          )}
        >
          <span className="text-sm text-[var(--secondarytext)]">About {cryptoData?.symbol}</span>
          {cryptoData?.about}
        </div>
      </div>
    </motion.div>
  );
}

export default LLMQuestions;
