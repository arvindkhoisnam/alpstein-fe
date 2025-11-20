import Image from "next/image";
import { useUser, useUserModal } from "../lib/zustand";
import React from "react";

function UserLogo() {
  const { currUser } = useUser();
  const { showUserModal, setShowUserModal } = useUserModal();

  return (
    <div className="flex items-center gap-1 md:gap-4">
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
