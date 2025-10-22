"use client";
import { useEffect, useRef } from "react";
import { useLogoutModal, useUser } from "../lib/zustand";
import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import { GiMountaintop } from "react-icons/gi";
import axios from "axios";
import { redirect } from "next/navigation";

function LogoutModal() {
  const { showLogoutModal, toggleLogoutModal } = useLogoutModal();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const { setUser } = useUser();
  async function Logout() {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {}, { withCredentials: true });
    setUser(false, null);
    localStorage.removeItem("crypto-store");
    localStorage.removeItem("user-store");
  }
  useEffect(() => {
    document.addEventListener("click", e => {
      if (e.target === overlayRef.current) {
        toggleLogoutModal(false);
      }
    });
  }, [toggleLogoutModal]);
  return (
    showLogoutModal &&
    createPortal(
      <div className="fixed inset-0 z-20 h-screen w-full">
        <div
          ref={overlayRef}
          className="absolute inset-0 h-full w-full bg-[var(--background)] opacity-90"
        ></div>
        <div
          className={cn(
            "absolute top-1/2 left-1/2 z-20 flex w-72 -translate-x-1/2 -translate-y-[85%] flex-col gap-6 rounded-xl p-4",
            "bg-gradient-to-tl from-transparent from-20% via-slate-600/20 via-50% to-transparent to-80%",
            "shadow-[var(--shadow)] transition-shadow duration-500 ease-in-out"
          )}
        >
          <div className="mt-3 flex w-full flex-col items-center text-[var(--secondarytext)]">
            <GiMountaintop size={35} />
            <h2 className="mx-auto text-xl">Logout from Alpstein?</h2>
          </div>

          <div className="mx-auto flex w-[95%] gap-2">
            <button
              className="flex w-[95%] cursor-pointer items-center justify-center rounded-md border border-[var(--cardborder)] bg-rose-400 px-6 py-2 text-neutral-700"
              onClick={() => {
                Logout();
                toggleLogoutModal(false);
                redirect("/");
              }}
            >
              Confirm
            </button>
            <button
              className="flex w-[95%] cursor-pointer items-center justify-center rounded-md border border-[var(--cardborder)] px-6 py-2 text-[var(--primarytext)]"
              onClick={() => toggleLogoutModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
  );
}

export default LogoutModal;
