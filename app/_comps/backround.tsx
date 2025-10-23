"use client";
import { cn } from "../lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import InfiniteSlide from "./InfiniteSlide";
import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import Button2 from "./Button2";
import { useShowSigninModal, useUser, useWindowWidth } from "../lib/zustand";
export function GridBackgroundDemo() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [imageUrl, setImageUrl] = useState("/landing-light.png");
  // const rootStyles = getComputedStyle(document.documentElement);
  // const defaultUrl = rootStyles.getPropertyValue("--url").trim();
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const translateScale = useTransform(scrollYProgress, [0.4, 1], [1, 0.75]);
  const translateMarquee = useTransform(scrollYProgress, [0.4, 1], [1, 0.4]);
  const translateBlur = useTransform(scrollYProgress, [0.4, 1], [0, 3]);
  const { currUser } = useUser();
  const { toggleShowModal } = useShowSigninModal();
  const { setWindowWidth } = useWindowWidth();

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

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowWidth]);

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
          "[background-size:60px_60px]",
          "z-0 [background-image:linear-gradient(to_left,var(--herogrid)_1px,transparent_1px),linear-gradient(to_top,var(--herogrid)_1px,transparent_1px)] opacity-10"
        )}
      />
      {/* <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_0%,white_80%)]",
          "bg-[var(--background)]"
        )}
      ></div> */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center",
          "[mask-image:radial-gradient(ellipse_80%_80%_at_top,transparent_0%,black_80%)]",
          "bg-[var(--background)]"
        )}
      />
      <div className="z-10 mt-24 flex h-1/2 max-w-sm flex-col items-center justify-center md:max-w-xl lg:max-w-4xl">
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
          className="mt-5 mb-10 text-center text-xs leading-5 font-extralight text-[var(--secondarytext)] transition-colors duration-500 md:text-sm lg:text-base"
        >
          Make crypto articles make sense. Intense, data heavy blogs cleansed and made actionable.
        </motion.p>
        {/* <div className="absolute bottom-20 left-1/2 -translate-x-1/2"></div> */}
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
          className="my-10 flex items-center justify-center gap-4"
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
          style={{ scale: translateMarquee, filter: useMotionTemplate`blur(${translateBlur}px)` }}
        >
          <InfiniteSlide />
        </motion.div>
      </div>
      {/* <motion.div
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
        style={{
          scale: translateScale,
          filter: useMotionTemplate`blur(${translateBlur}px)`,
        }}
        ref={imageRef}
        className="absolute -bottom-30 left-1/2 h-[400px] w-[1000px] -translate-x-1/2"
      >
        <div className="absolute bottom-0 left-1/2 z-10 h-[400px] w-[1000px] -translate-x-1/2 rounded-t-xl bg-[var(--background)] opacity-10"></div>
        <Image
          src={imageUrl}
          height={400}
          width={1000}
          alt="temp"
          className="rounded-t-xl bg-[var(--background)]"
          style={{
            maskImage: "linear-gradient(to bottom, black 95%, transparent 100%)",
          }}
        />
      </motion.div> */}
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
          filter: useMotionTemplate`blur(${translateBlur}px)`,
        }}
        ref={imageRef}
        className="absolute -bottom-5 left-1/2 z-10 h-[400px] w-[1100px] -translate-x-1/2"
      >
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[1000px] -translate-x-1/2 rounded-t-xl bg-[var(--background)] opacity-10"></div>
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
    </div>
  );
}
