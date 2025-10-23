"use client";

import Link from "next/link";
import DarkModelToggle from "./DarkModelToggle";
import { usePathname } from "next/navigation";
import { GiMountaintop } from "react-icons/gi";
import { useShowSigninModal, useUser, useWindowWidth } from "../lib/zustand";
import Search from "./Search";
import AuthenticatedNav from "./AuthenticatedNav";
import Hamburger from "./Hamburger";
import { cn } from "../lib/utils";

function Navbar() {
  const path = usePathname();
  const { currUser } = useUser();
  const { toggleShowModal } = useShowSigninModal();
  const { windowWidth } = useWindowWidth();
  return (
    <div
      id="navbar"
      className={cn(
        `${windowWidth > 768 ? "top-2 w-[90%] bg-transparent px-6 py-2" : "top-0 w-full bg-[var(--background)] p-3"}`,
        "fixed left-1/2 z-50 -translate-x-1/2",
        "flex justify-between text-base md:text-xl"
      )}
    >
      <Link
        className="flex cursor-pointer items-center gap-2 text-sm text-[var(--primarytext)] opacity-90 transition-colors duration-700 md:text-lg lg:text-xl"
        href="/"
      >
        <GiMountaintop size={35} />
        <span>Alpstein</span>
      </Link>
      {windowWidth >= 768 ? (
        <>
          {path !== "/" && <Search />}
          <div className="flex h-10 items-center gap-6 text-sm text-[var(--secondarytext)] opacity-90 transition-colors duration-700">
            <DarkModelToggle />
            {path !== "/" && <AuthenticatedNav />}
            {path === "/" && currUser === null && (
              <button onClick={() => toggleShowModal(true)} className="text-[var(--secondarytext)]">
                Sign In
              </button>
            )}
          </div>
        </>
      ) : (
        <Hamburger />
      )}
    </div>
  );
}

export default Navbar;
