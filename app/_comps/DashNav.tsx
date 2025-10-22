import { useDashNav } from "../lib/zustand";

function DashNav() {
  return (
    <div className="mt-24 flex w-full items-center justify-between py-3 text-xs font-extralight text-zinc-600">
      <Nav label="Opinion / Indicators" ind={0} />
      <Nav label="Charts / Rationale" ind={1} />
      <Nav label="Votes / Sentiment" ind={2} />
    </div>
  );
}

function Nav({ label, ind }: { label: string; ind: number }) {
  const { currTab, setCurrTab } = useDashNav();
  return (
    <span
      className={`rounded-lg ${currTab === ind ? "bg-neutral-300" : ""} cursor-pointer px-2 py-1`}
      onClick={() => setCurrTab(ind)}
    >
      {label}
    </span>
  );
}
export default DashNav;
