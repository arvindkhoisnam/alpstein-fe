import { cn } from "../lib/utils";
// import VerticalAccordion from "./Accordion";
// import Reasons from "./Reasons";
// import Reasons from "./Reasons";
import Signals from "./Signals";
function Temp() {
  return (
    <div
      // className={cn(
      //   // "[perspective::1000px] [transform-style:preserve-3d]",
      //   "h-full w-full rounded-4xl",
      //   // "bg-[#01030c] mask-b-from-90% mask-t-from-90% mask-r-from-95% mask-l-from-95%",
      //   "bg-[var(--background)] mask-b-from-90% mask-t-from-90% mask-r-from-95% mask-l-from-95%",
      //   "grid grid-cols-[2fr_3fr] gap-4 p-10",
      //   "[background-image:radial-gradient(circle at 0.5px 0.5px, rgba(255, 255, 255, 0.18) 0.5px, transparent 0)]"
      // )}
      className={cn(
        // "[perspective::1000px] [transform-style:preserve-3d]",
        "h-full w-full"
        // "bg-[var(--background)] mask-t-from-90% mask-r-from-95% mask-b-from-90% mask-l-from-95%",
        // "grid grid-cols-[2fr_3fr] gap-4 p-7"
        // "[background-image:radial-gradient(circle_at_0.5px_0.5px,_var(--dots)_0.5px,_transparent_0)]"
      )}
      // style={{
      //   backgroundSize: "10px 10px",
      //   backgroundRepeat: "repeat",
      // }}
    >
      <Signals />
      {/* <Reasons /> */}
    </div>
  );
}
export default Temp;
