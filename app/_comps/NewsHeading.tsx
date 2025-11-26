import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { LuExternalLink } from "react-icons/lu";
import { useCurrentCryptoId } from "../lib/zustand";

function NewsHeading() {
  const { cryptoData } = useCurrentCryptoId();
  return (
    <motion.h1
      key={cryptoData?.id}
      className={cn(
        "flex w-full flex-col items-start justify-center gap-2 rounded-lg p-2 text-[10px] text-[var(--secondarytext)] md:p-1 xl:p-1.5 2xl:p-2",
        "border border-[var(--cardborder)]"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-sm font-semibold">News</span>
        <a
          className="flex cursor-pointer items-center gap-1 text-[10px] font-medium text-blue-500 hover:text-blue-600"
          href={cryptoData?.sourceurl}
          target="_blank"
        >
          <LuExternalLink />
          <span>Visit Article</span>
        </a>
      </div>
      <p className="text-[10px] font-medium text-[var(--primarytext)] 2xl:text-[12px]">
        {cryptoData?.heading}
      </p>
    </motion.h1>
  );
}

export default NewsHeading;
