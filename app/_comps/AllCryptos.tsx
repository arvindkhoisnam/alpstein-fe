"use client";
import { useRef } from "react";
import { cn } from "../lib/utils";
import {
  CryptoData,
  useAllCryptos,
  useCurrentCryptoId,
  useDashNav,
  useTogglePosition,
  useToggleSidebar,
  useTVAreaModal,
  useTVCandleModal,
} from "../lib/zustand";
import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
function calc(unixMs: number) {
  const now = Date.now();
  const diffMs = now - unixMs;
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 1) return "just now";
  if (diffMins < 2) return `${diffMins} min ago`;
  if (diffMins < 60) return `${diffMins} mins ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 2) return `${diffDays} day ago`;
  return `${diffDays} days ago`;
}

const parentVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
const childVariant = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};
function AllCryptos() {
  const { allCryptos } = useAllCryptos();
  const refUL = useRef<HTMLUListElement | null>(null);
  // const [mask, setMask] = useState(() => (cryptos?.length > 8 ? "mask-b-from-80%" : ""));
  // useEffect(() => {
  //   const maxScroll = refUL.current!.scrollHeight - refUL.current!.clientHeight;
  //   refUL.current?.addEventListener("scroll", () => {
  //     if (refUL.current!.scrollTop === 0) {
  //       setMask("mask-b-from-80%");
  //     }
  //     if (refUL.current!.scrollTop > 0 && refUL.current!.scrollTop < maxScroll) {
  //       setMask("mask-t-from-95% mask-b-from-95%");
  //     }
  //     if (refUL.current!.scrollTop == maxScroll) {
  //       setMask("mask-t-from-90%");
  //     }
  //   });
  // }, [cryptos]);

  return (
    <motion.ul
      variants={parentVariant}
      initial="hidden"
      animate="show"
      ref={refUL}
      // className={`relative mt-24 flex flex-col gap-2 overflow-y-auto`}
      className={`relative mt-16 flex flex-col gap-2`}
    >
      {allCryptos?.length > 0 ? (
        allCryptos?.map((d: CryptoData) => <CryptoComp key={d.id} d={d} calc={calc} />)
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-zinc-500">
          Oops! No news at the moment
        </div>
      )}
    </motion.ul>
  );
}

function CryptoComp({ d, calc }: { d: CryptoData; calc: (num: number) => string }) {
  const router = useRouter();
  const { setCurrCryptoId, currentCryptoId } = useCurrentCryptoId();
  const { togglePosition } = useTogglePosition();
  const { toggleCandleShowModal } = useTVCandleModal();
  const { toggleAreaShowModal } = useTVAreaModal();
  const { toggleShow } = useToggleSidebar();
  const { setCurrTab } = useDashNav();
  return (
    <motion.li
      variants={childVariant}
      onClick={() => {
        if (d.position === "long" || d.position === "unclear") {
          togglePosition("long");
        } else {
          togglePosition("short");
        }
        setCurrCryptoId(d.id);
        toggleAreaShowModal(false);
        toggleCandleShowModal(false);
        toggleShow(false);
        setCurrTab(0);
        router.replace(`/dashboard/${d.id}`);
      }}
      key={d.id}
      className={cn(
        "cursor-pointer rounded-md p-2",
        "shadow-[var(--shadow)] transition-shadow duration-500 ease-in-out hover:bg-[var(--cardhover)]",
        `${currentCryptoId === d.id ? "bg-[var(--cardhover)]" : ""}`,
        "flex flex-col gap-1.5 md:gap-2"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={`/${d.symbol}.png`} alt="crypto-image" height={20} width={20} />
            <span className="text-[10px] font-bold text-[var(--primarytext)] 2xl:text-xs">
              {d.symbol}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-extralight text-[var(--secondarytext)] 2xl:text-[10px]">
              {calc(Number(d.scrappedat))}
            </span>
            {d.status === "triggered" && (
              <span className="relative flex size-1.5">
                <>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex size-1.5 rounded-full bg-blue-500"></span>
                </>
              </span>
            )}
          </div>
        </div>
      </div>
      <h1 className="text-[8px] text-[var(--secondarytext)] 2xl:text-[10px]">
        {d.heading.split(" ").length > 13
          ? `${d.heading.split(" ").slice(0, 13).join(" ")} ...`
          : d.heading}
      </h1>
    </motion.li>
  );
}

export default AllCryptos;
