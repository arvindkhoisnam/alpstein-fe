import Image from "next/image";
import { useShowSigninModal, useUser, useUserModal } from "../lib/zustand";
import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
// import DarkModelToggle from "./DarkModelToggle";

function UserLogo() {
  const { currUser, setUser } = useUser();
  const { showUserModal, setShowUserModal } = useUserModal();
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
    <div className="flex items-center gap-1 md:gap-4">
      {/* <DarkModelToggle /> */}
      <button
        className="cursor-pointer"
        onClick={() => {
          setShowUserModal(!showUserModal);
        }}
      >
        {currUser && (
          <Image
            className="size-8 rounded-full"
            src={currUser.imageUrl}
            width={20}
            height={20}
            alt="user-logo"
          />
        )}
      </button>
    </div>
  );
}

export default UserLogo;
