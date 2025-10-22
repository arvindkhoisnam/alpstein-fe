"use client";
import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { useCurrentCryptoId } from "../lib/zustand";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
const parentVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const childVariant = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
function Accordion() {
  // const { windowWidth } = useWindowWidth();
  const { cryptoData } = useCurrentCryptoId();
  const [activeIndex, setIndex] = useState<number | null>(null);

  useEffect(() => {
    setIndex(null);
  }, [cryptoData?.id]);
  return (
    <motion.div
      key={cryptoData?.id}
      variants={parentVariant}
      initial="hidden"
      animate="show"
      className={cn("flex h-full w-full flex-col gap-3 rounded-lg p-1", "bg-slate-500/10")}
    >
      {/* <span className="ml-3 text-sm font-semibold text-[var(--secondarytext)]">Rationale</span> */}
      {cryptoData?.buy !== "" && (
        <Comp
          index={0}
          heading="Why should you consider buying"
          content={cryptoData!.buy}
          activeIndex={activeIndex}
          setActiveIndex={setIndex}
        />
      )}
      {cryptoData?.sell !== "" && (
        <Comp
          index={1}
          heading="Why should you consider selling"
          content={cryptoData!.sell}
          activeIndex={activeIndex}
          setActiveIndex={setIndex}
        />
      )}
      <Comp
        index={2}
        heading="Levels to monitor"
        content={cryptoData!.monitor}
        activeIndex={activeIndex}
        setActiveIndex={setIndex}
      />
      {cryptoData?.waitout !== "" && (
        <Comp
          index={3}
          heading="Why should you consider waiting out."
          content={cryptoData!.waitout}
          activeIndex={activeIndex}
          setActiveIndex={setIndex}
        />
      )}
      <Comp
        index={4}
        heading="Synopsis of the article"
        content={cryptoData!.synopsis}
        activeIndex={activeIndex}
        setActiveIndex={setIndex}
      />
    </motion.div>
  );
}

function Comp({
  index,
  heading,
  content,
  activeIndex,
  setActiveIndex,
}: {
  index: number;
  heading: string;
  content: string;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const show = activeIndex === index;
  return (
    <div className={`relative w-full ${!show ? "h-12" : "h-30"} p-3 transition-all duration-500`}>
      <motion.div
        variants={childVariant}
        className="flex cursor-pointer items-center justify-between text-[var(--secondarytext)]"
        onClick={() => setActiveIndex(show ? null : index)}
      >
        <p className="text-[12px]">{heading}</p>
        <button className="cursor-pointer text-[--primarytext]">
          {!show ? <IoChevronDown /> : <IoChevronUp />}
        </button>
      </motion.div>

      <motion.p
        className={`my-2 ml-4 text-[12px] text-[var(--secondarytext)] transition-all ${show ? "max-h-22 max-w-full overflow-y-auto opacity-100" : "opacity-0"} transition-all duration-300`}
      >
        {content}
      </motion.p>
      {index !== 4 && (
        <motion.div
          variants={childVariant}
          className={`absolute bottom-0 left-0 h-[0.5px] w-full bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110%`}
        ></motion.div>
      )}
    </div>
  );
}

export default Accordion;
