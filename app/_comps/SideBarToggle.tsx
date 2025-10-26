import { useToggleSidebar } from "../lib/zustand";
import { VscListSelection } from "react-icons/vsc";
function SideBarToggle() {
  const { toggleShow } = useToggleSidebar();
  return (
    <button
      className="text-2xl text-[var(--secondarytext)] md:hidden"
      onClick={() => {
        toggleShow(true);
      }}
    >
      <VscListSelection />
    </button>
  );
}

export default SideBarToggle;
