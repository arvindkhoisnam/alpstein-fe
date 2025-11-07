import { cn } from "../lib/utils";
function page() {
  return (
    <div
      className={cn(
        "flex h-screen items-center justify-center bg-[var(--background)]",
        "mx-auto max-w-[1440px] p-2 lg:flex lg:items-center lg:gap-0 lg:p-0",
        "bg-gradient-to-tl from-transparent from-20% via-slate-600/20 via-50% to-transparent to-80%",
        "flex justify-between"
      )}
    >
      <div
        className="hidden h-screen min-w-10 border-x border-[var(--cardborder)]/50 bg-fixed lg:block"
        style={{
          backgroundImage: `repeating-linear-gradient(315deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
          backgroundSize: "10px 10px",
        }}
      ></div>
      <div className="h-full w-full px-10">
        <div className="mt-24 flex flex-col gap-2">
          <div className="flex w-full gap-4 text-sm text-[var(--secondarytext)]">
            <span className="cursor-pointer font-extralight hover:text-[var(--secondarytext)]/50">
              Guide
            </span>
            <span className="cursor-pointer font-extralight hover:text-[var(--secondarytext)]/50">
              References
            </span>
          </div>
          <div className="hidden h-[0.5px] w-full bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% lg:block 2xl:top-18"></div>
          <div className="grid grid-cols-[1fr_4fr]">
            <div className="h-full w-full"></div>
            <div>
              <div
                className="relative h-20 w-full rounded-lg border border-[var(--cardborder)] bg-rose-500 md:h-32 lg:h-44"
                style={{
                  backgroundImage: "url(/alps-range.jpg)",
                  backgroundPosition: "top", // centers the image
                  backgroundSize: "cover", // ensures it fills the div nicely
                }}
              >
                <div className="absolute inset-0 rounded-md bg-neutral-700/30" />
                <div className="absolute bottom-5 left-0 pl-10 text-neutral-700 lg:w-1/2">
                  <h2 className="text-2xl font-medium">Welcome to Alpstein</h2>
                  <p className="text-[10px] leading-[15px] font-extralight text-wrap md:text-xs lg:text-sm">
                    Alpstein empowers you to make smart crypto decisions. Giving you an extra edge
                    with assisted AI insights.
                  </p>
                </div>
              </div>
              <div className="my-14 h-full w-full pl-10 text-[var(--secondarytext)]">
                <h3 className="text-2xl font-medium">About</h3>
                <p className="my-10 text-sm font-extralight">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat voluptate
                  quisquam minus. Quos aspernatur similique suscipit corporis placeat voluptas illum
                  officia atque aut, numquam eveniet quisquam sint fuga, rerum dolores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hidden h-screen min-w-10 border-x border-[var(--cardborder)]/50 bg-fixed lg:block"
        style={{
          backgroundImage: `repeating-linear-gradient(315deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
          backgroundSize: "10px 10px",
        }}
      ></div>
    </div>
  );
}

export default page;
