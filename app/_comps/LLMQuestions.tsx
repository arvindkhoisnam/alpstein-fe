"use client";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { useCurrentCryptoId } from "../lib/zustand";
import { useEffect, useRef, useState } from "react";
function LLMQuestions() {
  const { cryptoData } = useCurrentCryptoId();
  const ref = useRef<HTMLDivElement | null>(null);
  const [mask, setMask] = useState("mask-b-from-80%");
  // const [containerHeight, setContainerHeight] = useState(window.innerHeight);
  const [containerHeight, setContainerHeight] = useState(
    window?.visualViewport?.height || window?.innerHeight
  );

  useEffect(() => {
    function updateHeight() {
      setContainerHeight(window.visualViewport?.height || window.innerHeight);
    }
    window.visualViewport?.addEventListener("resize", updateHeight);
    window.addEventListener("resize", updateHeight);
    return () => {
      window.visualViewport?.removeEventListener("resize", updateHeight);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const maxScroll = ref.current.scrollHeight - ref.current.clientHeight;
    const parent = ref.current;
    console.log(maxScroll);
    function handleScroll() {
      if (ref.current?.scrollTop === 0) {
        setMask("mask-b-from-80%");
      }
      if (ref.current!.scrollTop > 0 && ref.current!.scrollTop < maxScroll) {
        setMask("mask-t-from-90% mask-b-from-90%");
      }
      if (ref.current?.scrollTop == maxScroll) {
        setMask("mask-t-from-90%");
      }
    }
    parent.addEventListener("scroll", handleScroll);
    return () => parent.removeEventListener("scroll", handleScroll);
  }, []);
  // useEffect(() => {});
  console.log(containerHeight);
  return (
    <motion.div
      key={cryptoData?.id}
      className={cn(
        "max-h-full min-h-full w-full rounded-md bg-rose-500 bg-white p-px",
        // "max-w-full min-w-full rounded-md bg-white p-px md:max-h-full 2xl:max-h-full",
        // `max-w-full min-w-full rounded-md bg-white p-px md:max-h-80 2xl:max-h-[calc(100vh-${containerHeight})]`,
        "animate-[var(--animate-rotate-border)] bg-conic/[from_var(--border-angle)] from-[var(--btnbg)] from-0% via-indigo-500/80 via-15% to-[var(--btnbg)] to-0%"
      )}
    >
      <div className="h-full w-full rounded-md bg-[var(--background)]">
        <div
          ref={ref}
          className={cn(
            "max-h-full min-h-full max-w-full min-w-full overflow-y-auto rounded-md p-2 text-[10px] font-medium text-[var(--secondarytext)]",
            "bg-gradient-to-tr from-slate-600/10 from-[20%] via-violet-400/20 via-[80%] to-indigo-700/30 to-[100%]",
            `${mask}`
          )}
        >
          {cryptoData?.about}
        </div>
      </div>
    </motion.div>
  );
}

export default LLMQuestions;
