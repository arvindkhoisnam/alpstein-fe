"use client";
import CryptoDash from "@/app/_comps/CryptoDash";
import Spinner from "@/app/_comps/Spinner";
import { cn } from "@/app/lib/utils";
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
        <div
          className={cn(
            "mx-auto max-w-[1440px] p-2 lg:flex lg:gap-4 lg:p-0"
            // "bg-gradient-to-tl from-transparent from-20% via-slate-600/20 via-50% to-transparent to-80%"
          )}
        >
          {/* <div className="h-screen w-8 border-x border-[var(--cardborder)]/40 bg-[repeating-linear-gradient(-45deg,_[var(--cardborder)]_0,_[var(--cardborder)]_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div> */}
          <div
            className="hidden h-screen w-10 border-x border-[var(--cardborder)]/40 bg-fixed lg:block"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
              backgroundSize: "10px 10px",
            }}
          ></div>
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
  /* <div className="col-start-2 row-span-5 row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 max-lg:hidden dark:[--pattern-fg:var(--color-white)]/10"></div>; */
}
