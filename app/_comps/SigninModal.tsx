"use client";
import { createPortal } from "react-dom";
import { cn, getGoogleOAuthURL } from "../lib/utils";
import { useShowSigninModal } from "../lib/zustand";
import { useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { GiMountaintop } from "react-icons/gi";
import Link from "next/link";
function SigninModal() {
  const { showModal, toggleShowModal } = useShowSigninModal();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    document.addEventListener("click", e => {
      if (e.target === overlayRef.current) {
        toggleShowModal(false);
      }
    });
  }, [toggleShowModal]);
  {
    return (
      showModal &&
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
              <h2 className="mx-auto text-xl">Sign in to Alpstein</h2>
            </div>
            <div className="mx-auto flex w-[95%] items-center justify-start gap-3 rounded-md border border-[var(--cardborder)] bg-[var(--background)] px-6 py-3">
              <FcGoogle className="text-xl" />
              <Link
                className="text-xs font-thin text-[var(--primarytext)] md:text-base"
                href={getGoogleOAuthURL()}
                target="_"
              >
                Continue with Google
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )
    );
  }
}

export default SigninModal;
