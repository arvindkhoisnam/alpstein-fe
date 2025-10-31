// import dynamic from "next/dynamic";
// import { useChart, useCurrentCryptoId, useTVAreaModal, useTVCandleModal } from "../lib/zustand";
// import CoinHeading from "./CoinHeading";
// import NewsHeading from "./NewsHeading";
// import Signals from "./Signals";
// import { motion } from "motion/react";
// import TVLineModal from "./TVModal";
// import TVCandleStick from "./TVCandleStick";
// import TVCandleModal from "./TVCandleModal";
// import LIveStats from "./LIveStats";

function TradeReview() {
  // const TradingView = dynamic(() => import("./TradingView"), { ssr: false });
  // const { currChart } = useChart();
  // const { showCandleModal } = useTVCandleModal();
  // const { showAreaModal } = useTVAreaModal();
  // const { cryptoData } = useCurrentCryptoId();
  return (
    <div className="flex h-full w-full items-center justify-center p-2">
      {/* <div className="mx-auto mt-10 flex grid h-[calc(100vh-120px)] w-full grid-cols-[2fr_4fr] flex-col gap-2 md:mt-24 md:w-full">
        <div className="h-full w-full rounded-lg bg-gradient-to-tr from-transparent from-85% via-emerald-400/50 via-90% to-emerald-300/50 to-100% p-1">
          <div className="before-inset-0 before:broder-white/20 h-full w-full rounded-lg border border-black/20 bg-black/10 p-4 shadow-lg backdrop-blur-[2px] before:absolute before:rounded-lg before:border before:content-['']"></div>
        </div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.99,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            ease: "easeIn",
            delay: 0.3,
          }}
          className="h-full"
        >
          {currChart === "area" ? (
            <>
              <TradingView />
              {showAreaModal && <TVLineModal />}
            </>
          ) : (
            <>
              <TVCandleStick />
              {showCandleModal && <TVCandleModal />}
            </>
          )}
        </motion.div>
      </div> */}
      <span className="text-[var(--secondarytext)]">Coming soon...</span>
    </div>
  );
}

export default TradeReview;
