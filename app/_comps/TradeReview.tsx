import dynamic from "next/dynamic";
import { useChart, useTVAreaModal, useTVCandleModal } from "../lib/zustand";
import CoinHeading from "./CoinHeading";
import NewsHeading from "./NewsHeading";
import Signals from "./Signals";
import { motion } from "motion/react";
import TVLineModal from "./TVModal";
import TVCandleStick from "./TVCandleStick";
import TVCandleModal from "./TVCandleModal";
import Accordion from "./Accordion";
import LIveStats from "./LIveStats";
import LLMQuestions from "./LLMQuestions";

function TradeReview() {
  const TradingView = dynamic(() => import("./TradingView"), { ssr: false });
  const { currChart } = useChart();
  const { showCandleModal } = useTVCandleModal();
  const { showAreaModal } = useTVAreaModal();
  return (
    <div className="h-full w-full p-2">
      <div className="mx-auto mt-10 flex w-full flex-col gap-2 pb-2 md:mt-24 md:w-2/3">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <CoinHeading />
          <NewsHeading />
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <Signals includeHeading={false} />
          <LIveStats includeHeading={false} />
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
          className="md:h-80"
          // className="grid h-full grid-rows-[1fr_1fr] items-center gap-2"
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
        <LLMQuestions />
      </div>
    </div>
  );
}

export default TradeReview;
