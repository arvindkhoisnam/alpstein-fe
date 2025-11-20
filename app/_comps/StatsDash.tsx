"use client";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import AppStatsSkeleton from "../_skeletons/AppStatsSkeleton";
import { cn } from "../lib/utils";
import PerformersSkeleton from "../_skeletons/PerformersSkeleton";
import PremiumCard from "./PremiumCard";
import Performers from "./Performers";

const AppStats = dynamic(() => import("./AppStats"), {
  ssr: false,
  loading: () => <AppStatsSkeleton />,
});
const TopPerformers = dynamic(() => import("./TopPerformers"), {
  ssr: false,
  loading: () => <PerformersSkeleton />,
});
function StatsDash() {
  return (
    <motion.div
      className={cn(
        // "relative mt-14 grid h-[calc(100vh-96px)] grid-cols-[5fr_2fr] md:gap-0 2xl:mt-20"
        // "l:grid-cols-[5fr_2fr] l:grid-rows-1 l:gap-3 l:mb-0 relative mt-14 mb-14 flex h-full flex-col gap-3 md:grid md:max-h-[calc(100vh-56px)] md:grid-rows-[1.5fr_1fr] md:gap-3 2xl:mt-16 2xl:max-h-[calc(100vh-64px)]"
        "l:grid-cols-[5fr_2fr] l:grid-rows-1 l:gap-3 l:mb-0 relative mt-14 mb-14 flex h-full flex-col gap-3 md:grid md:max-h-[calc(100vh-56px)] md:grid-rows-[1.5fr_1fr] md:gap-3 2xl:mt-0 2xl:max-h-screen"
      )}
    >
      <div className="l:grid-rows-[1fr_2fr] l:grid-cols-1 l:gap-3 flex max-h-full w-full flex-col gap-3 md:grid md:grid-cols-[1fr_2.5fr]">
        <TopPerformers />
        {/* <div className="my-3 hidden h-[0.5px] bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% md:block"></div> */}
        <AppStats />
      </div>
      <div className="l:grid-cols-1 l:grid-rows-[1.8fr_1.2fr] grid max-h-full grid-rows-[1.5fr_1fr] gap-2 md:grid-cols-[2fr_1fr] md:grid-rows-1">
        <Performers />
        <PremiumCard />
      </div>
    </motion.div>
  );
}

export default StatsDash;
