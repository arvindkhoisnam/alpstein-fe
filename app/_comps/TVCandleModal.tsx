import { createPortal } from "react-dom";
import TVCandleStick from "./TVCandleStick";
import { cn } from "../lib/utils";
// import LIveStats from "./LIveStats";

function TVCandleModal() {
  return createPortal(
    <div className="absolute top-0 left-0 h-full w-full p-2">
      <div className={cn("absolute inset-0 h-full w-full rounded-lg", "bg-neutral-900")}></div>
      <div className="absolute top-3 left-5 z-10 rounded-lg bg-neutral-900">
        {/* <LIveStats includeHeading={true} /> */}
      </div>
      <TVCandleStick />
    </div>,
    document.getElementById("crypto-dash-parent")!
  );
}

export default TVCandleModal;
