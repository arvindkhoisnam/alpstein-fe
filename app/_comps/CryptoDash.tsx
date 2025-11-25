"use client";
import { cn } from "../lib/utils";
import {
  useChart,
  useCurrentCryptoId,
  useDashNav,
  useTVAreaModal,
  useTVCandleModal,
} from "../lib/zustand";
import dynamic from "next/dynamic";
import GaugeSkeleton from "../_skeletons/GaugeSkeleton";
import { motion } from "motion/react";
import CoinHeading from "./CoinHeading";
import AccordionSkeleton from "../_skeletons/AccordionSkeleton";
import LIveStats from "./LIveStats";
// import TVCandleStick from "./TVCandleStick";
import TVCandleModal from "./TVCandleModal";
import TVLineModal from "./TVModal";
import NewsHeading from "./NewsHeading";
import DashNav from "./DashNav";

const SentimentGauge = dynamic(() => import("./SentimentGauge"), {
  ssr: false,
  loading: () => <GaugeSkeleton />,
});
const Signals = dynamic(() => import("./Signals"), {
  ssr: false,
});
const Indicators = dynamic(() => import("./Indicators"), { ssr: false });
const Stats = dynamic(() => import("./Stats"), { ssr: false });
const PubOpinion = dynamic(() => import("./PubOpinion"), { ssr: false });
const TradingView = dynamic(() => import("./TradingView"), { ssr: false });
const TVCandleStick = dynamic(() => import("./TVCandleStick"), { ssr: false });
const Accordion = dynamic(() => import("./Accordion"), {
  ssr: false,
  loading: () => <AccordionSkeleton />,
});
const LLMQuestions = dynamic(() => import("./LLMQuestions"), { ssr: false });

function CryptoDash() {
  const { currentCryptoId } = useCurrentCryptoId();
  const { showCandleModal } = useTVCandleModal();
  const { showAreaModal } = useTVAreaModal();
  const { currChart } = useChart();
  const { currTab } = useDashNav();

  return (
    <div className={cn("lg:mt-14", "2xl:mt-20")}>
      <div className="my-12 lg:hidden">
        <DashNav />
        {currTab === 0 && (
          <motion.div
            key={currentCryptoId}
            initial={{
              opacity: 0,
              scale: 0.99,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeIn",
              delay: 0.3,
            }}
            className="flex flex-col gap-4 pb-4"
          >
            <CoinHeading />
            <Signals includeHeading={true} />
            <Indicators />
            <Stats />
            <LIveStats includeHeading={true} />
          </motion.div>
        )}
        {currTab === 1 && (
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
            className="grid h-[calc(100vh-150px)] grid-rows-2 gap-2"
          >
            {currChart === "area" ? <TradingView /> : <TVCandleStick />}
            <Accordion />
          </motion.div>
        )}
        {currTab === 2 && (
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
            className="flex h-full flex-col items-center gap-2 pb-2"
          >
            <NewsHeading />
            <PubOpinion />
            <SentimentGauge />
            <LLMQuestions />
          </motion.div>
        )}
      </div>
      <div
        id="crypto-dash-parent"
        className={cn(
          // "relative hidden h-[calc(100vh-110px)] gap-2 md:grid md:w-full md:grid-cols-[1fr_2fr_1fr]"
          "relative hidden h-full gap-2 lg:grid lg:w-full lg:grid-cols-[1fr_2fr_1fr]"
        )}
      >
        <motion.div
          key={currentCryptoId}
          initial={{
            opacity: 0,
            scale: 0.99,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeIn",
            delay: 0.3,
          }}
          // className="flex h-[calc(100vh-90px)] flex-col gap-4 bg-rose-500"
          // className="grid h-[calc(100vh-100px)] grid-rows-[0.5fr_2fr_1.5fr_1.5fr_1.5fr]"
          className="grid h-[calc(100vh-100px)] max-h-[calc(1000px-100px)] grid-rows-[0.1fr_0.7fr_0.5fr_0.5fr_0.5fr] gap-4"
        >
          <CoinHeading />
          <Signals includeHeading={true} />
          <Indicators />
          <Stats />
          <LIveStats includeHeading={true} />
        </motion.div>
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
          className="grid h-[calc(100vh-100px)] max-h-[calc(1000px-100px)] grid-rows-[1fr_1fr] items-start gap-2"
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
          <Accordion />
        </motion.div>
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
          // className="flex max-h-full flex-col items-center gap-1"
          className="grid h-[calc(100vh-100px)] max-h-[calc(1000px-100px)] grid-rows-[0.5fr_0.5fr_1.5fr_2.5fr] gap-1"
        >
          <NewsHeading />
          <PubOpinion />
          <SentimentGauge />
          <LLMQuestions />
        </motion.div>
      </div>
    </div>
  );
}

export default CryptoDash;
