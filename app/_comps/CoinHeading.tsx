import Image from "next/image";
import WS from "./WS";
import { useCurrentCryptoId, useWindowWidth } from "../lib/zustand";

function CoinHeading() {
  const { cryptoData } = useCurrentCryptoId();
  const { windowWidth } = useWindowWidth();
  return (
    <div className="flex items-center gap-2 rounded-md p-1">
      <div className="relative">
        <Image
          height={`${windowWidth >= 768 ? 60 : 40}`}
          width={`${windowWidth >= 768 ? 60 : 40}`}
          src={`/${cryptoData?.symbol.toUpperCase()}.png`}
          alt="crypto-image"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-[var(--tertiarytext)] md:text-xl">
          {cryptoData?.symbol}/{cryptoData?.name}
        </p>
        <WS symbol={cryptoData?.symbol} key={cryptoData?.symbol} showPrice={true} />
      </div>
    </div>
  );
}

export default CoinHeading;
