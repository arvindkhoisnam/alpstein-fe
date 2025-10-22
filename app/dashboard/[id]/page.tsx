"use client";
import CryptoDash from "@/app/_comps/CryptoDash";
import Spinner from "@/app/_comps/Spinner";
import { CryptoData, useCurrentCryptoId } from "@/app/lib/zustand";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { ToastContainer } from "react-toastify";

function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const { setCryptoData } = useCurrentCryptoId();
  const { isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/crypto/${id}`, {
        withCredentials: true,
      });

      setCryptoData(res.data.data[1].about as string, res.data.data[0] as CryptoData);
      return res.data.data;
    },
  });

  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center text-[var(--secondarytext)]">
          <Spinner showPrice={true} />
        </div>
      ) : (
        <>
          <CryptoDash />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName={() =>
              "bg-slate-200 text-slate-950 rounded-lg min-h-[60px] flex items-center w-60 text-sm pl-5"
            }
          />
        </>
      )}
    </div>
  );
}

export default Page;
