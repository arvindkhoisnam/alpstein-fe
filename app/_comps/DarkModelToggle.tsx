"use client";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { IoSunnyOutline } from "react-icons/io5";
import { BsMoonStars } from "react-icons/bs";

function DarkModelToggle() {
  const [isDark, setDark] = useState(true);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  function toggle() {
    console.log("clicked");
    setDark(dark => !dark);
  }
  return (
    <div>
      <button
        className={cn(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2 text-[var(--primarytext)]",
          // "shadow-[var(--secondaryshadow)] transition-shadow duration-500"
          "hover:border hover:border-[var(--secondarytext)]"
        )}
        onClick={() => toggle()}
      >
        {isDark ? <IoSunnyOutline size={18} /> : <BsMoonStars size={15} />}
      </button>
    </div>
  );
}

export default DarkModelToggle;
