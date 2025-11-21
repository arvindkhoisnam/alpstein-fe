"use client";
import { motion, useMotionTemplate, useMotionValue, animate } from "motion/react";
import { useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { cn } from "../lib/utils";
import { GiMountaintop } from "react-icons/gi";

function PremiumCard() {
  // const [background, setBackground] = useState("#e7e5e4");
  // const [background, setBackground] = useState("#09090b");
  const COLORS = useMemo(() => ["#1E67C6", "#CE84CF", "#715bff"], []);
  // const COLORS = ["#1E67C6", "#CE84CF", "#715bff"];
  const color = useMotionValue(COLORS[0]);
  // const backgroundImage = useMotionTemplate`radial-gradient(170% 170% at 50% 0%, ${background} 45%,${color})`;
  const backgroundImage = useMotionTemplate`radial-gradient(170% 170% at 50% 0%, transparent 45%,${color})`;
  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color, COLORS]);
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        // setBackground("#01030c");
        // setBackground("#09090b");
      } else {
        // setBackground("#f4f4f5");
        // setBackground("#e7e5e4");
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    if (document.documentElement.classList.contains("dark")) {
      // setBackground("#01030c");
      // setBackground("#09090b");
    }

    return () => observer.disconnect();
  }, []);
  return (
    <motion.div
      style={{
        backgroundImage,
      }}
      className={cn(
        "l:h-51 l2:h-64 md2:h-80 relative grid h-full w-full grid-rows-[3fr_1fr] rounded-2xl rounded-xl p-2 md:h-70 lg:h-full",
        // "shadow-[var(--shadow)] transition-shadow duration-500"
        "border border-[var(--stats-comp-bg)] bg-[var(--stats-comp-bg)]/20 backdrop-blur-xl"
      )}
    >
      <div className="l:p-0 l:gap-3 l2:gap-10 flex flex-col gap-10 p-8">
        <div className="flex cursor-pointer items-center gap-2 text-sm text-[var(--logostroke)] opacity-90 transition-colors duration-700 md:text-sm lg:text-sm">
          <span>
            <GiMountaintop size={30} />
          </span>
          <span>Alpstein</span>
        </div>
        <div className="flex w-full flex-col gap-3">
          <h2 className="text-sm font-extralight text-[var(--primarytext)] md:text-sm">
            Become a Premium Member
          </h2>
          <div>
            <p className="text-[10px] text-zinc-500 md:text-xs">Never miss an opportunity.</p>
            <p className="text-[10px] text-zinc-500 md:text-xs">
              Get instantly notified whenever a news is updated.
            </p>
          </div>
        </div>
      </div>
      <div className="z-10 flex w-full flex-col gap-2 px-0">
        <input
          type="text"
          className={cn(
            "w-full rounded-md p-2 text-xs text-[var(--secondarytext)]",
            "shadow-[var(--shadow)] transition-shadow duration-500",
            "focus:outline-none"
          )}
          placeholder="Enter your email address"
        />
        <button
          className={cn(
            "w-full cursor-pointer rounded-md bg-transparent px-4 py-2 text-xs text-[var(--secondarytext)]",
            "shadow-[var(--shadow)] transition-shadow duration-500"
          )}
          onClick={() => alert("fasd")}
        >
          Become a member
        </button>
      </div>
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={200} count={200} factor={10} fade speed={1} />
        </Canvas>
      </div>
    </motion.div>
  );
}

export default PremiumCard;
