import { IconType } from "react-icons";
import { cn } from "../lib/utils";
import { TbWorld } from "react-icons/tb";
import { BsTwitterX } from "react-icons/bs";
import { FaRedditAlien } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
function CoinSocials() {
  return (
    <div className={cn("flex w-full flex-col gap-1 rounded-lg bg-rose-500")}>
      <span className="text-sm font-semibold text-[var(--secondarytext)]">Socials</span>
      <div className="grid w-full grid-cols-2 gap-1 rounded-md">
        <Socials icon={TbWorld} label={"website"} />
        <Socials icon={BsTwitterX} label={"Twitter"} />
        <Socials icon={FaRedditAlien} label={"Reddit"} />
        <Socials icon={FaTelegramPlane} label={"Telegram"} />
      </div>
    </div>
  );
}

function Socials({ icon: Icon, label }: { icon: IconType; label: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded p-2 text-[10px] text-[var(--secondarytext)]",
        "group cursor-pointer shadow-[var(--shadow)] transition-shadow duration-500"
      )}
    >
      <Icon size={20} className="group-hover:text-cyan-500" />
      <span className="text-[10px] font-light text-[var(--primarytext)] group-hover:text-cyan-500">
        {label}
      </span>
    </div>
  );
}
export default CoinSocials;
