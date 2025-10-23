"use client";
import { useToggleSidebar } from "../lib/zustand";
import AllCryptos from "./AllCryptos";
import Paginate from "./Paginate";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from "motion/react";

function Sidebar() {
  const { toggleShow } = useToggleSidebar();
  return createPortal(
    // <div className="h-full w-full">
    //   <AllCryptos />
    //   <Paginate />
    // </div>,
    <motion.div
      initial={{
        left: "-100%",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      animate={{ left: 1 }}
      className="fixed inset-0 z-60 h-screen w-full bg-[var(--background)]/70"
    >
      <div className="relative h-full w-3/4 bg-[var(--background)] p-2">
        <div className="my-2 flex w-full justify-end">
          <button
            className="cursor-pointer text-[var(--primarytext)]"
            onClick={() => toggleShow(false)}
          >
            <IoCloseOutline size={25} />
          </button>
        </div>
        <AllCryptos />
        <Paginate />
      </div>
    </motion.div>,
    document.getElementById("dashboard-root")!
  );
}

export default Sidebar;
