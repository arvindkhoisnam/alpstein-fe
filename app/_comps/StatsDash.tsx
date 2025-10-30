"use client";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import AppStatsSkeleton from "../_skeletons/AppStatsSkeleton";
import PremiumSkeleton from "../_skeletons/PremiumSkeleton";
import { cn } from "../lib/utils";
// import PerformersSkeleton from "../_skeletons/PerformersSkeleton";

const AppStats = dynamic(() => import("./AppStats"), {
  ssr: false,
  loading: () => <AppStatsSkeleton />,
});
const PremiumCard = dynamic(() => import("./PremiumCard"), {
  ssr: false,
  loading: () => <PremiumSkeleton />,
});
const TopPerformers = dynamic(() => import("./TopPerformers"), {
  ssr: false,
  // loading: () => <PerformersSkeleton />,
});
function StatsDash() {
  return (
    <motion.div
      // className={cn("relative mt-10 flex w-full flex-1 flex-col gap-2 p-2 md:mt-20 md:gap-0")}
      className={cn(
        "relative mt-10 flex w-full flex-1 flex-col gap-2 md:mt-16 md:gap-0 2xl:mt-24"
        // "bg-blue-300"
      )}
    >
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
        <TopPerformers />
        <PremiumCard />
      </div>
      <div className="my-5 hidden h-[0.5px] bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% md:block"></div>
      <div className="grid w-full grid-cols-1">
        <AppStats />
      </div>
    </motion.div>
  );
}

export default StatsDash;
