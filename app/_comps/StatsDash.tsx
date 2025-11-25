"use client";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import AppStatsSkeleton from "../_skeletons/AppStatsSkeleton";
import { cn } from "../lib/utils";
import PopularSkeleton from "../_skeletons/PopularSkeleton";
// import PerformersSkeleton from "../_skeletons/PerformersSkeleton";
// import PremiumSkeleton from "../_skeletons/PremiumSkeleton";
import { useFooterHeight, useNavBarHeight } from "../lib/zustand";
import { useEffect } from "react";

const AppStats = dynamic(() => import("./AppStats"), {
  ssr: false,
  loading: () => <AppStatsSkeleton />,
});
const PopularCoins = dynamic(() => import("./PopularCoins"), {
  ssr: false,
  loading: () => <PopularSkeleton />,
});

// const Performers = dynamic(() => import("./Performers"), {
//   ssr: false,
//   loading: () => <PerformersSkeleton />,
// });

// const PremiumCard = dynamic(() => import("./PremiumCard"), {
//   ssr: false,
//   loading: () => <PremiumSkeleton />,
// });

function StatsDash() {
  const { height: navbar } = useNavBarHeight();
  const { height: footer } = useFooterHeight();
  useEffect(() => {
    console.log(window.innerHeight, window.outerHeight);
  }, []);
  console.log(navbar, footer);
  return (
    <motion.div
      className={cn(
        `l:grid-cols-[5fr_2fr] l:grid-rows-1 l:gap-2 3xl:max-h-[calc(1000px-100px)] l:grid-rows-[1.5fr_1fr] md2:grid-rows-[1fr_1fr] l:mt-14 l:mb-14 l:max-h-[calc(100vh-114px)] md2:h-[calc(100vh-${navbar}px+${footer}px)] relative mt-14 mb-14 flex h-full flex-col gap-3 md:mt-14 md:mb-0 md:grid md:h-[calc(100vh-104px)] md:grid-rows-[1fr_1fr] md:gap-3 2xl:mt-16`,
        "lg:bg-transparent"
      )}
    >
      <div
        className={`l:grid-rows-[1fr_2fr] l:grid-cols-1 l:gap-3 l:h-[calc(100vh-114px)] l:bg-green-500 flex w-full flex-col gap-3 bg-rose-500 md:grid md:max-h-[calc(100vh-56px)] md:grid-cols-[1fr_2.5fr] 2xl:max-h-[calc(100vh-100px)]`}
      >
        <PopularCoins />
        {/* <div className="my-3 hidden h-[0.5px] bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% md:block"></div> */}
        <AppStats />
      </div>
      <div className="l:grid-cols-1 l:grid-rows-[1.5fr_1fr] l:h-[calc(100vh-114px)] grid grid-rows-[1.5fr_1fr] gap-2 bg-rose-500 md:max-h-[calc(100vh-56px)] md:grid-cols-[2fr_1fr] md:grid-rows-1 2xl:max-h-[calc(100vh-100px)]">
        {/* <Performers />
        <PremiumCard /> */}
      </div>
    </motion.div>
  );
}

export default StatsDash;
