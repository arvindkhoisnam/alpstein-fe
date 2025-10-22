import { GoChevronRight } from "react-icons/go";
import { useToggleSidebar } from "../lib/zustand";

function SideBarToggle() {
  const { toggleShow } = useToggleSidebar();
  return (
    <div className="absolute top-16 left-0 z-30 w-full pl-2">
      <button
        className="flex cursor-pointer items-center gap-2 rounded-lg bg-violet-300 px-2 py-1 text-xs font-extralight text-zinc-600"
        onClick={() => {
          toggleShow(true);
        }}
      >
        <span>Live cryptos</span>
        <GoChevronRight size={15} />
      </button>
    </div>
  );
}

export default SideBarToggle;
