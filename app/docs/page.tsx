import { cn } from "../lib/utils";
function page() {
  return (
    <div
      className={cn(
        "flex h-screen items-center justify-center bg-[var(--background)] text-2xl",
        "bg-gradient-to-tl from-transparent from-20% via-slate-600/20 via-50% to-transparent to-80%"
      )}
    >
      {/* Docs Page */}
    </div>
  );
}

export default page;
