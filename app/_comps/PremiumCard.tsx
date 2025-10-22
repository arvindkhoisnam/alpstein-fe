"use client";
import { motion, useMotionTemplate, useMotionValue, animate } from "motion/react";
import { useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { cn } from "../lib/utils";
import { GiMountaintop } from "react-icons/gi";
import { useWindowWidth } from "../lib/zustand";

function PremiumCard() {
  const { windowWidth } = useWindowWidth();
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
        `${windowWidth > 786 ? "h-full" : "h-86"}`,
        "relative rounded-2xl p-10",
        "shadow-[var(--shadow)] transition-shadow duration-500"
      )}
    >
      <div className="flex cursor-pointer items-center gap-2 text-sm text-[var(--logostroke)] opacity-90 transition-colors duration-700 md:text-lg lg:text-xl">
        <span>
          <GiMountaintop size={35} />
        </span>
        <span>Alpstein</span>
      </div>
      {/* <div className="absolute top-1/2 left-1/2  -translate-x-1/2  -translate-y-1/2  w-full px-10"> */}
      <div className="mt-16 w-full">
        <h2 className="text-xl font-extralight text-[var(--primarytext)]">
          Become a Premium Member
        </h2>
        <p className="text-xs text-zinc-500">Never miss an opportunity.</p>
        <p className="text-xs text-zinc-500">Get instantly notified whenever a news is updated.</p>
      </div>
      <div className="absolute bottom-5 left-1/2 z-10 flex w-full -translate-x-1/2 flex-col gap-2 px-6">
        <input
          type="text"
          className={cn(
            "w-full rounded-md p-2 text-sm text-[var(--secondarytext)]",
            "shadow-[var(--shadow)] transition-shadow duration-500",
            "focus:outline-none"
          )}
          placeholder="Enter your email address"
        />
        <button
          className={cn(
            "w-full cursor-pointer rounded-md bg-transparent px-4 py-2 text-sm text-[var(--secondarytext)]",
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
