"use client";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import React, { useEffect } from "react";
import StatsBarGraph from "./StatsBarGraph";
import StatsDoughnutGraph from "./StatsDoughnutGraph";
import StatsPoleAreaGraph from "./StatsPoleAreaGraph";

function AppStats() {
  useEffect(() => {
    console.log(window.innerWidth);
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-[var(--primarytext)] md:text-lg">Statistics</h2>
      </div>
      <div className="mx-auto flex max-w-[95%] gap-3 overflow-x-auto mask-x-from-95% md:grid md:max-w-full md:grid-cols-3 md:gap-5 md:mask-x-from-100%">
        <Comp1 label={"Week's articles"} graph={<StatsBarGraph />} />
        <Comp1 label={"Positions generated "} graph={<StatsDoughnutGraph />} />
        <Comp1 label={"Weekly performance"} graph={<StatsPoleAreaGraph />} />
      </div>
    </div>
  );
}

export default AppStats;

function Comp1({ label, graph }: { label: string; graph: React.ReactElement }) {
  return (
    <div
      className={cn(
        // "flex h-56 w-full flex-col gap-1 rounded-lg p-2 md:h-80 md:w-96 md:gap-2 md:rounded-xl md:p-4",
        "flex h-56 w-full flex-col gap-1 rounded-lg p-2 md:h-44 md:w-44 md:gap-2 md:rounded-xl md:p-4 xl:h-68 xl:w-90 2xl:h-80 2xl:w-96",
        "shadow-[var(--shadow)] transition-shadow duration-500"
      )}
    >
      <motion.h2
        initial={{
          opacity: 0,
          scale: 0.9,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.2,
          ease: "easeIn",
          delay: 0.1,
        }}
        className="flex items-center gap-1 text-xs font-extralight text-[var(--secondarytext)] md:gap-2 md:text-lg"
      >
        {label}
      </motion.h2>
      {graph}
    </div>
  );
}
