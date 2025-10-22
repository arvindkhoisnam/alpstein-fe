"use client";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import AppStatsSkeleton from "../_skeletons/AppStatsSkeleton";
import PremiumSkeleton from "../_skeletons/PremiumSkeleton";
import { cn } from "../lib/utils";
import PerformersSkeleton from "../_skeletons/PerformersSkeleton";
import { useWindowWidth } from "../lib/zustand";

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
  loading: () => <PerformersSkeleton />,
});
function StatsDash() {
  const { windowWidth } = useWindowWidth();
  return (
    <motion.div className={cn("relative mt-20 w-full flex-1 p-2")}>
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div> */}
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
        <TopPerformers />
        {windowWidth > 768 && <PremiumCard />}
      </div>
      <div className="my-5 hidden h-[0.5px] bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% md:block"></div>
      <AppStats />
    </motion.div>
  );
}

export default StatsDash;
