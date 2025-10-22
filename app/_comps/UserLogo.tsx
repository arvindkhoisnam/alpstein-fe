import Image from "next/image";
import { useLogoutModal, useShowSigninModal, useUser, useWindowWidth } from "../lib/zustand";
import React, { SetStateAction, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { cn } from "../lib/utils";
import Link from "next/link";
import DarkModelToggle from "./DarkModelToggle";

function UserLogo() {
  const { currUser, setUser } = useUser();
  const [showUserModal, setShowUserModal] = useState(false);
  const { toggleShowModal } = useShowSigninModal();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          withCredentials: true,
        });
        setUser(true, res.data.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          toggleShowModal(true);
          redirect("/");
        }
      }
    }
    getData();
  }, [setUser, toggleShowModal]);
  return (
    <>
      <button className="cursor-pointer" onClick={() => setShowUserModal(show => !show)}>
        {currUser && (
          <Image
            className="size-8 rounded-full"
            src={currUser.imageUrl}
            width={10}
            height={10}
            alt="user-img"
          />
        )}
      </button>
      {currUser && showUserModal && (
        <UserModal
          fName={currUser.firstName}
          lName={currUser.lastName}
          setShowUserModal={setShowUserModal}
        />
      )}
    </>
  );
}

export default UserLogo;

function UserModal({
  fName,
  lName,
  setShowUserModal,
}: {
  fName: string;
  lName: string;
  setShowUserModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { windowWidth } = useWindowWidth();
  const { toggleLogoutModal } = useLogoutModal();
  const LINKS = [
    { label: "Stats", url: "/dashboard" },
    { label: "Docs", url: "/docs" },
    { label: "Trades", url: "/trades" },
  ];

  return (
    <div
      className={cn(
        "absolute top-15 right-0 z-[9999] w-44 rounded md:w-44",
        "bg-[var(--background)]",
        "border border-[var(--cardborder)] text-[var(--secondarytext)]"
      )}
    >
      {windowWidth < 786 && (
        <ul className="flex flex-col gap-2">
          <li className="w-full p-0.5">
            <DarkModelToggle />
          </li>
          {LINKS.map((l, i) => (
            <li className="w-full p-2 text-xs" key={i}>
              <Link href={l.url} onClick={() => setShowUserModal(false)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <li className="w-full p-2 text-xs">{`${fName} ${lName}`}</li>
      <li
        className="w-full cursor-pointer rounded-b p-2 text-xs hover:bg-[var(--cardhover)]"
        onClick={() => {
          toggleLogoutModal(true);
          setShowUserModal(false);
        }}
      >
        Logout
      </li>
    </div>
  );
}
