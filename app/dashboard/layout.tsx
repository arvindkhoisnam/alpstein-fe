"use client";
import axios from "axios";
import { cn } from "../lib/utils";
import React, { useEffect } from "react";
// import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import AllCryptosSkeleton from "../_skeletons/AllCryptosSkeleton";
import { useAllCryptos, usePaginate, useToggleSidebar, useWindowWidth } from "../lib/zustand";
// import Paginate from "../_comps/Paginate";
import Sidebar from "../_comps/Sidebar";
import AllCryptos from "../_comps/AllCryptos";
import Paginate from "../_comps/Paginate";
import SideBarToggle from "../_comps/SideBarToggle";
function Layout({ children }: { children: React.ReactNode }) {
  // const AllCryptos = dynamic(() => import("../_comps/AllCryptos"), {
  //   ssr: false,
  // });
  const { Limit, setCursor, setLimit } = usePaginate();
  const { setAllCryptos } = useAllCryptos();
  const { windowWidth } = useWindowWidth();
  const { showSidebar } = useToggleSidebar();
  const { isLoading } = useQuery({
    queryKey: ["cryptos"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/live-cryptos?limit=${Limit}`,
        {
          withCredentials: true,
        }
      );
      setAllCryptos(res.data.data);
      setCursor(
        res.data.metadata.hasPrevPage,
        res.data.metadata.hasNextPage,
        res.data.metadata.lastSeenId,
        res.data.metadata.lastSeenTime,
        res.data.metadata.firstSeenId,
        res.data.metadata.firstSeenTime
      );
      return res.data.data;
    },
  });
  useEffect(() => {
    // function handleResize() {
    //   setWindowWidth(window.innerWidth);
    // }
    // window.addEventListener("resize", handleResize);
    // handleResize();
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
    if (windowWidth <= 768) {
      setLimit(6);
    }
  }, [windowWidth, setLimit]);
  console.log(Limit);
  return (
    <div
      id="dashboard-root"
      className={cn(
        "relative grid h-screen gap-2.5 md:grid-cols-[1fr_4.5fr]",
        // `${windowWidth > 768 ? "bg-gradient-to-tl from-transparent from-20% via-slate-600/20 via-50% to-transparent to-80%" : "bg-[var(--background)]"}`,
        "bg-gradient-to-tl from-transparent from-20% via-slate-600/20 via-50% to-transparent to-80%"
      )}
      style={{
        userSelect: "none",
      }}
    >
      {showSidebar && <Sidebar />}
      <div className="absolute top-20 left-0 hidden h-[0.5px] w-full bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% md:block"></div>
      {windowWidth > 768 && (
        <div className="relative flex w-full justify-center p-2">
          {isLoading ? (
            <AllCryptosSkeleton />
          ) : (
            <div className="mt-24">
              <AllCryptos />
              <Paginate />
            </div>
          )}
          <div className="absolute top-0 right-0 z-10 hidden h-full w-[0.5px] bg-gradient-to-t from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% md:block"></div>
        </div>
      )}
      {windowWidth <= 768 && !showSidebar && <SideBarToggle />}
      <main className={cn("h-full w-full p-2")}>{children}</main>
    </div>
  );
}

export default Layout;
