"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiMountaintop } from "react-icons/gi";
import { useShowSigninModal, useUser, useUserModal } from "../lib/zustand";
// import Search from "./Search";
import AuthenticatedNav from "./AuthenticatedNav";

import { cn } from "../lib/utils";
import { UserModal } from "./UserModal";
import UserLogo from "./UserLogo";
import SideBarToggle from "./SideBarToggle";

function Navbar() {
  const path = usePathname();
  const { currUser } = useUser();
  const { toggleShowModal } = useShowSigninModal();
  const { showUserModal } = useUserModal();
  return (
    <div
      id="navbar"
      className={cn(
        "top-0 w-full bg-[var(--background)] p-3",
        "md:top-2 md:w-[90%] md:bg-transparent md:px-6 md:py-1",
        "fixed left-1/2 z-50 -translate-x-1/2",
        "flex justify-between text-base md:text-base",
        "2xl:py-3"
        // "md:bg-rose-500"
      )}
    >
      {currUser && showUserModal && (
        <UserModal fName={currUser.firstName} lName={currUser.lastName} />
      )}
      <Link
        className="flex cursor-pointer items-center gap-1 text-sm text-[var(--primarytext)] opacity-90 transition-colors duration-700 md:gap-2 md:text-lg lg:text-xl"
        href="/"
      >
        <GiMountaintop size={30} />
        <span>Alpstein</span>
      </Link>
      {path.startsWith("/dashboard") && <SideBarToggle />}
      <div className="flex items-center gap-4">
        <div className="hidden h-10 items-center gap-6 text-sm text-[var(--secondarytext)] opacity-90 transition-colors duration-700 md:flex">
          {path !== "/" && <AuthenticatedNav />}
          {path === "/" && currUser === null && (
            <button onClick={() => toggleShowModal(true)} className="text-[var(--secondarytext)]">
              Sign In
            </button>
          )}
        </div>
        <UserLogo />
      </div>
    </div>
  );
}

export default Navbar;
