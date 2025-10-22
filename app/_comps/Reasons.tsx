"use client";
import { useState } from "react";
import { cn } from "../lib/utils";
import { GiBearHead } from "react-icons/gi";
import { SiRedbull } from "react-icons/si";
function Reasons() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="perspective">
      <div
        className={cn(
          "relative h-[300px] w-[300px] transition-all duration-700 ease-in-out [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl bg-[var(--background)] p-6 opacity-80 shadow-[var(--shadow)] [backface-visibility:hidden]">
          <button
            className="mt-4 flex cursor-pointer items-center gap-2 rounded bg-red-300 px-2 py-1 text-[10px] font-extralight text-zinc-800"
            onClick={() => setFlipped(true)}
          >
            View <GiBearHead size={15} />
          </button>
        </div>

        {/* Back */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] rounded-2xl bg-[var(--background)] p-6 opacity-80 shadow-[var(--shadow)] [backface-visibility:hidden]">
          <button
            className="mt-4 flex cursor-pointer items-center gap-2 rounded bg-green-300 px-2 py-1 text-[10px] font-extralight text-zinc-800"
            onClick={() => setFlipped(false)}
          >
            View <SiRedbull size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reasons;
