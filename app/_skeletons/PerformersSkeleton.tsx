"use client";
// import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

function PerformersSkeleton() {
  // const [width, setWidth] = useState(window?.innerWidth);
  // const [width, setWidth] = useState(0);
  // const [numSkel, setNumSkel] = useState(() => (window?.innerWidth >= 1024 ? 5 : 4));
  // const [numSkel, setNumSkel] = useState(4);

  // useEffect(() => {
  //   function handleResize() {
  //     setWidth(window.innerWidth);
  //     if (window.innerWidth >= 1024) {
  //       setNumSkel(5);
  //     } else {
  //       setNumSkel(4);
  //     }
  //   }

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  // useEffect(() => {
  //   function update() {
  //     const w = window.innerWidth;
  //     setWidth(w);
  //     setNumSkel(w >= 1024 ? 5 : 4);
  //   }

  //   update(); // run once on mount
  //   window.addEventListener("resize", update);

  //   return () => window.removeEventListener("resize", update);
  // }, []);
  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <div className="flex flex-col gap-2">
        {/* <div className="flex items-center justify-between">
          <h2 className="text-sm text-[var(--primarytext)] md:text-lg">
            {width < 1024 ? "Top Four" : "Top Five"}
          </h2>
        </div> */}
        {/* <div className="mx-auto flex h-full w-[95%] grid-cols-2 gap-2 overflow-x-auto mask-x-from-95% py-2 md:grid md:w-full md:grid-cols-5 md:mask-x-from-100% md:p-0"> */}
        <div className="l:grid-cols-5 mx-auto grid h-full w-[95%] grid-cols-2 gap-2 py-2 md:grid-cols-2 xl:grid xl:w-full xl:mask-x-from-100% xl:p-0">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                // "relative flex h-[130px] w-56 flex-col justify-between rounded-lg p-3 md:w-52 md:rounded-2xl 2xl:w-56",
                // "shadow-[var(--shadow)] transition-shadow duration-500"
                "relative flex h-full flex-col justify-between rounded-md p-3 md:rounded-2xl",
                "l:h-32 h-26 w-full shadow-[var(--shadow)] transition-shadow duration-500"
              )}
            >
              <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {/* <div className="flex items-center justify-between">
          <h2 className="text-sm text-[var(--primarytext)] md:text-lg">
            {width < 1024 ? "Bottom Four" : "Bottom Five"}
          </h2>
        </div> */}
        {/* <div className="mx-auto flex h-full w-[95%] grid-cols-2 gap-2 overflow-x-auto mask-x-from-95% py-2 md:grid md:w-full md:grid-cols-5 md:mask-x-from-100% md:p-0"> */}
        <div className="l:grid-cols-5 mx-auto grid h-full w-[95%] grid-cols-2 gap-2 py-2 md:grid-cols-2 xl:grid xl:w-full xl:mask-x-from-100% xl:p-0">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                // "relative flex h-[130px] w-56 flex-col justify-between rounded-lg p-3 md:w-52 md:rounded-2xl 2xl:w-56",
                // "shadow-[var(--shadow)] transition-shadow duration-500"
                "relative flex h-full flex-col justify-between rounded-md p-3 md:rounded-2xl",
                "l:h-32 h-26 w-full shadow-[var(--shadow)] transition-shadow duration-500"
              )}
            >
              <span className="absolute top-0 left-0 h-[100%] w-30 animate-[skeleton-shimmer_1s_linear_infinite] bg-gradient-to-r from-transparent via-[var(--skeleton)] to-transparent"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PerformersSkeleton;
