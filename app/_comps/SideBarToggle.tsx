import { GoChevronRight } from "react-icons/go";
import { useToggleSidebar } from "../lib/zustand";

function SideBarToggle() {
  const { toggleShow } = useToggleSidebar();
  return (
    <div className="absolute top-16 left-0 z-30 w-full pl-2">
      <button
        className="flex cursor-pointer items-center rounded-lg px-2 py-1 text-xs font-extralight text-[var(--secondarytext)]"
        onClick={() => {
          toggleShow(true);
        }}
      >
        <span>Live Cryptos</span>
        <GoChevronRight size={15} />
      </button>
    </div>
  );
}

export default SideBarToggle;
