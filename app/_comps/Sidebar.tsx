"use client";
import { useToggleSidebar } from "../lib/zustand";
import AllCryptos from "./AllCryptos";
import Paginate from "./Paginate";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

function Sidebar() {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement | null>(null);
  const { toggleShow } = useToggleSidebar();
  useEffect(() => {
    if (!overlayRef.current && !childRef.current) return;
    const parent = overlayRef.current;
    function handleCloseSidebar(e: Event) {
      if (childRef.current && !childRef.current.contains(e.target as Node)) {
        toggleShow(false);
      }
    }
    if (overlayRef.current && childRef.current) {
      parent?.addEventListener("click", e => handleCloseSidebar(e));
    }

    return () => parent?.removeEventListener("click", e => handleCloseSidebar(e));
  }, [toggleShow]);

  return createPortal(
    <motion.div
      ref={overlayRef}
      initial={{
        left: "-100%",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      animate={{ left: 1 }}
      className="fixed inset-0 z-60 h-screen w-full bg-[var(--background)]/70"
    >
      <div ref={childRef} className="relative h-full w-2/3 bg-[var(--background)] px-2 py-4">
        <AllCryptos />
        <Paginate />
      </div>
    </motion.div>,
    document.getElementById("dashboard-root")!
  );
}

export default Sidebar;
