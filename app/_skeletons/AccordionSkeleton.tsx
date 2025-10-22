import { cn } from "../lib/utils";

function AccordionSkeleton() {
  return (
    <div
      className={cn("flex h-full w-full flex-col gap-3 rounded-lg p-1", "bg-slate-500/10")}
    ></div>
  );
}

export default AccordionSkeleton;
