"use client";
import { cn } from "../lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import InfiniteSlide from "./InfiniteSlide";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Button2 from "./Button2";
import { useShowSigninModal, useUser } from "../lib/zustand";
export function GridBackgroundDemo() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [imageUrl, setImageUrl] = useState("/landing-light.png");
  // const rootStyles = getComputedStyle(document.documentElement);
  // const defaultUrl = rootStyles.getPropertyValue("--url").trim();
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const translateScale = useTransform(scrollYProgress, [0.4, 1], [1, 0.75]);
  // const translateMarquee = useTransform(scrollYProgress, [0.4, 1], [1, 0.4]);
  // const translateBlur = useTransform(scrollYProgress, [0.4, 1], [0, 3]);
  const { currUser } = useUser();
  const { toggleShowModal } = useShowSigninModal();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        setImageUrl("/landing-dark.png");
      } else {
        setImageUrl("/landing-light.png");
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    if (document.documentElement.classList.contains("dark")) {
      setImageUrl("/landing-dark.png");
    }
    return () => observer.disconnect();
  }, []);

  const navigate = useRouter();

  return (
    // <div
    //   className={cn("relative flex h-[80%] w-[80%] flex-col items-center bg-[var(--background)]")}
    // >
    <div className="relative flex h-[100%] w-[100%] flex-col items-center bg-[var(--background)]">
      <div
        className={cn("absolute inset-0 z-10 h-full w-full opacity-30")}
        style={{
          backgroundImage: "radial-gradient(70% 50% at 50% 0%, #314158 45%, var(--background))",
        }}
      />
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "md:[background-size:60px_60px]",
          "z-0 [background-image:linear-gradient(to_left,var(--herogrid)_1px,transparent_1px),linear-gradient(to_top,var(--herogrid)_1px,transparent_1px)] opacity-10"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center",
          "[mask-image:radial-gradient(ellipse_80%_80%_at_top,transparent_0%,black_80%)]",
          "bg-[var(--background)]"
        )}
      />
      <div className="l:mt-24 z-10 mt-10 flex h-1/2 max-w-sm flex-col items-center justify-center md:mt-16 md:max-w-xl lg:max-w-4xl">
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
            duration: 0.5,
            ease: "easeIn",
            delay: 0.2,
          }}
          className="text-2xl font-medium text-[var(--primarytext)] transition-colors duration-700 md:text-3xl lg:text-6xl"
        >
          Actionable crypto decisions.
        </motion.h2>
        <motion.p
          initial={{
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
            // y: 100,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            // y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeIn",
            delay: 0.2,
          }}
          className="mt-5 mb-10 px-4 text-center text-[10px] leading-5 font-medium tracking-wide text-[var(--secondarytext)] transition-colors duration-500 md:px-0 md:text-sm lg:text-base"
        >
          Make crypto articles make sense. Intense, data heavy blogs cleansed and made actionable.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
            y: 100,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeIn",
            delay: 0.3,
          }}
          className="flex items-center justify-center gap-4 md:my-10"
        >
          <Button2
            text={"Try for free"}
            onClick={() => {
              if (currUser === null) {
                toggleShowModal(true);
                navigate.push("/");
              } else {
                navigate.push("/dashboard");
              }
            }}
          />
          <Button2 text={"Read docs"} onClick={() => navigate.push("/docs")} />
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
            y: 100,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeIn",
            delay: 0.5,
          }}
          // style={{ scale: translateMarquee, filter: useMotionTemplate`blur(${translateBlur}px)` }}
        >
          <InfiniteSlide />
        </motion.div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          filter: "blur(10px)",
          y: 100,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeIn",
          delay: 1,
        }}
        style={{
          scale: translateScale,
          // filter: useMotionTemplate`blur(${translateBlur}px)`,
        }}
        ref={imageRef}
        className="l:bottom-25 l:h-[200px] l:w-[850px] absolute left-1/2 z-10 hidden -translate-x-1/2 md:bottom-65 md:block md:w-[650px] lg:-bottom-5 lg:h-[400px] lg:w-[1100px]"
      >
        {/* <div className="absolute bottom-0 left-1/2 h-[400px] w-[1000px] -translate-x-1/2 rounded-t-xl bg-[var(--background)] bg-lime-500 opacity-10"></div> */}
        <Image
          src={imageUrl}
          height={400}
          width={1100}
          alt="temp"
          className="rounded-t-xl bg-[var(--background)]"
          style={{
            maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* <div className="z-10 h-96 w-full bg-lime-500">fasdf</div> */}
    </div>
  );
}
