import { BiStats } from "react-icons/bi";
import { useLogoutModal, useUserModal } from "../lib/zustand";
import { SlDocs, SlLogout } from "react-icons/sl";
import { TbArrowsExchange2 } from "react-icons/tb";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import { IoCloseOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import Link from "next/link";

export function UserModal({ fName, lName }: { fName: string; lName: string }) {
  const { toggleLogoutModal } = useLogoutModal();
  const { setShowUserModal } = useUserModal();
  const LINKS = [
    { label: "Home", url: "/", logo: <IoHome size={18} /> },
    { label: "Stats", url: "/dashboard", logo: <BiStats size={18} /> },
    { label: "Docs", url: "/docs", logo: <SlDocs size={18} /> },
    { label: "Trades", url: "/trades", logo: <TbArrowsExchange2 size={18} /> },
  ];

  return createPortal(
    <div
      className={cn(
        "absolute top-0 right-0 z-[9999] md:top-12 md:right-0",
        "bg-[var(--background)]",
        "border border-[var(--cardborder)] text-[var(--secondarytext)]",
        "h-screen w-full md:h-20 md:w-44 md:rounded"
      )}
    >
      <ul className="flex flex-col border-b-[0.5px] border-[var(--cardborder)] md:hidden">
        <li
          className="flex w-full justify-end border-b-[0.5px] border-[var(--cardborder)] p-3"
          onClick={() => setShowUserModal(false)}
        >
          <IoCloseOutline size={20} />
        </li>
        {LINKS.map((l, i) => (
          <Link
            href={l.url}
            onClick={() => setShowUserModal(false)}
            className="flex w-full items-center gap-2 p-3 text-xs"
            key={i}
          >
            {l.logo} {l.label}
          </Link>
        ))}
      </ul>

      <button className="w-full p-2 text-sm font-extralight text-sky-600">{`${fName} ${lName}`}</button>
      <button
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-b border-b-[0.5px] border-[var(--cardborder)] p-2 text-xs hover:bg-[var(--cardhover)] md:border-0"
        onClick={() => {
          toggleLogoutModal(true);
          setShowUserModal(false);
        }}
      >
        <SlLogout size={15} />
        <span>Logout</span>
      </button>
    </div>,
    document.getElementById("navbar")!
  );
}
