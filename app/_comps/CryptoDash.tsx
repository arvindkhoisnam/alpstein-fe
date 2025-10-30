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
import TVCandleStick from "./TVCandleStick";
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
    <div id="parent-div" className={cn("md:mt-16")}>
      <div className="md:hidden">
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
            className="grid h-full grid-rows-2 gap-2"
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
        className={cn(
          // "relative hidden h-[calc(100vh-110px)] gap-2 md:grid md:w-full md:grid-cols-[1fr_2fr_1fr]"
          "relative hidden h-full gap-2 md:grid md:w-full md:grid-cols-[1fr_2fr_1fr]"
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
          className="flex flex-col gap-4"
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
          className="grid h-full grid-rows-[1fr_1fr] items-center gap-2"
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
          className="flex max-h-full flex-col items-center gap-1"
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
