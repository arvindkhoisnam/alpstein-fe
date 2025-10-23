import Image from "next/image";
import { useShowSigninModal, useUser, useUserModal } from "../lib/zustand";
import React, { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

function UserLogo() {
  const { currUser, setUser } = useUser();
  const { setShowUserModal } = useUserModal();
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
      <button
        className="cursor-pointer"
        onClick={() => {
          setShowUserModal(true);
        }}
      >
        {currUser && (
          <Image
            className="size-8 rounded-full"
            src={currUser.imageUrl}
            width={10}
            height={10}
            alt="user-logo"
          />
        )}
      </button>
    </>
  );
}

export default UserLogo;
