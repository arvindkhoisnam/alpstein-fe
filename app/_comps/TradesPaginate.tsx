import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useAllTrades, useTradePaginate } from "../lib/zustand";
import axios from "axios";

function TradesPaginate() {
  const { setAllTrades } = useAllTrades();
  const {
    Limit,
    HasPrevPage,
    HasNextPage,
    LastSeenId,
    LastSeenTimeStamp,
    setCursor,
    FirstSeenTimeStamp,
    FirstSeenId,
  } = useTradePaginate();
  return (
    <div className="absolute inset-x-0 -bottom-10 flex h-10 w-full items-center justify-center gap-4 md:bottom-5">
      {HasPrevPage && (
        <button
          className="flex cursor-pointer items-center justify-center rounded-full p-1 text-[var(--primarytext)] hover:border hover:border-[var(--secondarytext)]"
          onClick={async () => {
            const res = await axios.get(
              `https://api.alpstein.tech/api/v1/exec-cryptos?action=prev&limit=${Limit}&last_seen=${FirstSeenTimeStamp}|${FirstSeenId}`,
              {
                withCredentials: true,
              }
            );
            setAllTrades(res.data.data);
            setCursor(
              res.data.metadata.hasPrevPage,
              res.data.metadata.hasNextPage,
              res.data.metadata.lastSeenId,
              res.data.metadata.lastSeenTime,
              res.data.metadata.firstSeenId,
              res.data.metadata.firstSeenTime
            );
            console.log(res.data.metadata);
          }}
        >
          <GoChevronLeft size={25} className="" />
        </button>
      )}
      {HasNextPage && (
        <button
          className="flex cursor-pointer items-center justify-center rounded-full p-1 text-[var(--primarytext)] hover:border hover:border-[var(--secondarytext)]"
          onClick={async () => {
            const res = await axios.get(
              `https://api.alpstein.tech/api/v1/exec-cryptos?action=next&limit=${Limit}&last_seen=${LastSeenTimeStamp}|${LastSeenId}`,
              {
                withCredentials: true,
              }
            );
            setAllTrades(res.data.data);
            setCursor(
              res.data.metadata.hasPrevPage,
              res.data.metadata.hasNextPage,
              res.data.metadata.lastSeenId,
              res.data.metadata.lastSeenTime,
              res.data.metadata.firstSeenId,
              res.data.metadata.firstSeenTime
            );
            console.log(res.data.metadata);
          }}
        >
          <GoChevronRight size={25} className="" />
        </button>
      )}
    </div>
  );
}

export default TradesPaginate;
