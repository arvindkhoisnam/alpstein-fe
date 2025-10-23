import { cn } from "../lib/utils";
import { PiNewspaperClippingLight } from "react-icons/pi";
import { GiOnTarget } from "react-icons/gi";
import { PiSealPercentLight } from "react-icons/pi";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionTemplate,
  MotionValue,
} from "motion/react";
import { useEffect } from "react";
import { IconType } from "react-icons";
function AppStats() {
  const totalArt = useMotionValue(0);
  const rounded = useTransform(totalArt, latest => Math.floor(latest));
  const totalTarget = useMotionValue(0);
  const roundedTarget = useTransform(totalTarget, latest => Math.floor(latest));
  const hitRate = useMotionValue(0);
  const roundedRate = useTransform(hitRate, latest => Math.floor(latest));
  const rateText = useMotionTemplate`${roundedRate}%`;

  useEffect(() => {
    const controls = animate(totalArt, 87, {
      duration: 1.5,
      ease: "easeInOut",
    });
    const control1 = animate(totalTarget, 79, {
      duration: 1.5,
      ease: "easeInOut",
    });
    const control2 = animate(hitRate, 90, {
      duration: 1.5,
      ease: "easeInOut",
    });
    return () => {
      controls.stop();
      control1.stop();
      control2.stop();
    };
  }, [totalArt, totalTarget, hitRate]);
  return (
    <div className="mt-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-[var(--primarytext)] md:text-xl">Statistics</h2>
      </div>
      <div className="grid h-full grid-cols-2 gap-3 md:grid-cols-3">
        <Comp Icon={PiNewspaperClippingLight} label="Top Articles" val={rounded} />
        <Comp Icon={GiOnTarget} label="Total Target Hit" val={roundedTarget} />
        <Comp Icon={GiOnTarget} label="Total Target Hit" val={roundedTarget} />
        <Comp Icon={PiSealPercentLight} label="Total Stop Loss Hit" val={rateText} />
      </div>
    </div>
  );
}

export default AppStats;

function Comp({
  Icon,
  label,
  val,
}: {
  Icon: IconType;
  label: string;
  val: MotionValue<number> | MotionValue<string>;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-lg p-2 md:h-[136px] md:gap-2 md:rounded-2xl md:p-4",
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
        className="flex items-center gap-1 text-[10px] font-extralight text-[var(--secondarytext)] md:gap-2 md:text-lg"
      >
        <span className="text-lg md:text-2xl">
          <Icon />
        </span>
        {label}
      </motion.h2>
      <motion.span className="text-xl font-extralight text-violet-400 md:text-3xl md:text-6xl">
        {val}
      </motion.span>
    </div>
  );
}
