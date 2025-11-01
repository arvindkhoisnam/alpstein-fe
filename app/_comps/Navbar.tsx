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
        "md:bg-transparent lg:top-2 lg:w-[90%] lg:px-6 lg:py-0",
        "fixed left-1/2 z-50 -translate-x-1/2",
        "flex justify-between",
        "2xl:py-3",
        "mx-auto max-w-[1512px]"
      )}
    >
      {currUser && showUserModal && (
        <UserModal fName={currUser.firstName} lName={currUser.lastName} />
      )}
      <Link
        className="flex cursor-pointer items-center gap-1 text-sm text-[var(--primarytext)] opacity-90 transition-colors duration-700 md:gap-2 md:text-base 2xl:text-xl"
        href="/"
      >
        <GiMountaintop size={30} />
        <span>Alpstein</span>
      </Link>
      {path.startsWith("/dashboard") && <SideBarToggle />}
      <div className="flex items-center gap-4">
        <div className="hidden h-10 items-center gap-6 text-[12px] text-[var(--secondarytext)] opacity-90 transition-colors duration-700 lg:flex 2xl:text-sm">
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
