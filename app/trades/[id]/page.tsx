"use client";
import CryptoDash from "@/app/_comps/CryptoDash";
import Spinner from "@/app/_comps/Spinner";
import { cn } from "@/app/lib/utils";
import { CryptoData, useCurrentCryptoId } from "@/app/lib/zustand";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
// import { ToastContainer } from "react-toastify";

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
        <div
          className={cn(
            "mx-auto mt-5 max-w-[1440px] grid-cols-[auto_1fr_auto] gap-4 md:mt-0 md:grid",
            "flex items-center justify-center"
            // "bg-gradient-to-tl from-transparent from-20% via-slate-600/20 via-50% to-transparent to-80%"
          )}
        >
          <div
            className="hidden h-screen w-10 border-x border-[var(--cardborder)]/40 bg-fixed lg:block"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
              backgroundSize: "10px 10px",
            }}
          ></div>
          <CryptoDash />
          {/* <ToastContainer
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
          /> */}
          <div
            className="hidden h-screen w-10 border-x border-[var(--cardborder)]/40 bg-fixed lg:block"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
              backgroundSize: "10px 10px",
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Page;

{
}
