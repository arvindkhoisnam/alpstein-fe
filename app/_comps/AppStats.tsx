"use client";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import React from "react";
import StatsBarGraph from "./StatsBarGraph";
import StatsDoughnutGraph from "./StatsDoughnutGraph";
import StatsPoleAreaGraph from "./StatsPoleAreaGraph";

function AppStats() {
  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-[var(--primarytext)] md:text-lg">Statistics</h2>
        </div>
        <div className="l:grid-cols-3 l:grid l:max-w-full l:gap-5 l:mask-x-from-100% mx-auto flex max-w-[95%] gap-3 overflow-x-auto mask-x-from-95%">
          {/* <div className="mx-auto flex max-w-[95%] gap-3 overflow-x-auto md:grid md:max-w-full md:grid-cols-3 md:gap-5"> */}
          <Comp1 label={"Week's articles"} graph={<StatsBarGraph />} />
          <Comp1 label={"Positions generated "} graph={<StatsDoughnutGraph />} />
          <Comp1 label={"Weekly performance"} graph={<StatsPoleAreaGraph />} />
        </div>
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
        "l:h-64 flex h-52 w-80 flex-col gap-1 rounded-md p-2 md:gap-2 md:rounded-xl md:p-4 xl:h-68 xl:w-90 2xl:h-80 2xl:w-94",
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
        className="l:text-sm flex items-center gap-1 text-xs font-extralight text-[var(--secondarytext)] md:gap-2"
      >
        {label}
      </motion.h2>
      {graph}
    </div>
  );
}
