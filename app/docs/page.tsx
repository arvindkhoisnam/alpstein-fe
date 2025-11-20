import { cn } from "../lib/utils";
function page() {
  return (
    <div
      className={cn(
        "flex h-full items-center justify-center md:h-screen",
        "mx-auto max-w-[1440px] p-2 lg:flex lg:items-center lg:gap-0 lg:p-0",
        // "bg-gradient-to-tl from-transparent from-20% via-slate-600/20 via-50% to-transparent to-80%"
        "bg-[var(--background)]"
      )}
    >
      <div className="h-full w-full px-2 lg:px-10">
        <div className="my-14 flex flex-col md:my-24">
          <div className="mb-4 flex w-full gap-4 text-sm text-[var(--secondarytext)]">
            <span className="cursor-pointer font-extralight hover:text-[var(--secondarytext)]/50">
              Guide
            </span>
            <span className="cursor-pointer font-extralight hover:text-[var(--secondarytext)]/50">
              References
            </span>
          </div>
          <div className="h-[0.5px] w-full bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% 2xl:top-18"></div>
          <div className="grid h-[calc(100vh-131px)] grid-cols-1 gap-2 xl:grid-cols-[1fr_0.1fr_4fr_0.1fr]">
            <div className="hidden h-full w-full p-10 xl:block">
              <ul className="flex flex-col gap-10 text-sm font-extralight text-[var(--secondarytext)]">
                <li className="cursor-pointer hover:text-[var(--secondarytext)]/50">
                  Introduction
                </li>
                <li className="cursor-pointer hover:text-[var(--secondarytext)]/50">
                  Inner workings
                </li>
              </ul>
            </div>
            <div
              className="hidden min-w-10 border-x border-[var(--cardborder)]/50 bg-fixed lg:block"
              style={{
                backgroundImage: `repeating-linear-gradient(315deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
                backgroundSize: "10px 10px",
              }}
            ></div>
            <div className="md:pt-10">
              <div
                className="relative hidden h-20 w-full rounded-lg border border-[var(--cardborder)] md:block md:h-32 lg:h-44"
                style={{
                  backgroundImage: "url(/alps-range.jpg)",
                  backgroundPosition: "top", // centers the image
                  backgroundSize: "cover", // ensures it fills the div nicely
                }}
              >
                <div className="absolute inset-0 rounded-md bg-neutral-700/30" />
                <div className="absolute bottom-5 left-0 pl-10 text-neutral-700 lg:w-2/5">
                  <h2 className="text-2xl font-medium">Welcome to Alpstein</h2>
                  <p className="text-[10px] leading-[15px] font-extralight text-wrap md:text-xs lg:text-sm">
                    Alpstein empowers you to make smart crypto decisions. Giving you an extra edge
                    with assisted AI insights.
                  </p>
                </div>
              </div>
              <div className="w-full tracking-wide text-[var(--primarytext)] md:mt-7 md:px-10 lg:mt-14 xl:px-20">
                <h3 className="text-2xl font-medium">About</h3>
                <div className="my-5 text-xs font-light text-[var(--secondarytext)] md:text-sm">
                  <p>
                    Alpstein is your smart companion for understanding what&apos;s really happening
                    in the crypto market — without the noise.
                  </p>
                  <p className="mt-4">
                    Every day, hundreds of news stories and opinions flood the internet, and prices
                    swing wildly. Alpstein helps you make sense of all that by reading the news for
                    you, analyzing what&apos;s important, and showing what the market might be
                    thinking — all in one clean, easy-to-use dashboard.
                  </p>
                  <p className="my-5">
                    Alpstein constantly gathers news from trusted crypto sites like CoinTelegraph,
                    The Block, and NewsBTC.
                  </p>
                  <p>It then uses OpenAI&apos;s gpt-4 model to:</p>
                  <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
                    <li>
                      Summarize the articles so you don&apos;t have to read through pages of text.
                    </li>
                    <li>Judge the market mood — is the story bullish, bearish, or unclear?</li>
                    <li>
                      Suggest what to watch — like possible buy or sell levels, take-profit zones,
                      and stop-loss points.
                    </li>
                  </ul>
                  <p className="mt-4">
                    So instead of juggling ten tabs, you get one screen that shows what&apos;s
                    happening, what people are saying, and what the numbers are telling you — all
                    updated live.
                  </p>
                  <p className="mt-4">
                    Alpstein is a solo project — started with a simple idea: to make market data
                    feel alive.
                  </p>
                  <p className="mt-4">
                    Every line of code, every animation, and every graph in Alpstein has been
                    designed to make trading data clear, intuitive, and human-friendly. It&apos;s
                    still growing, but the goal remains the same: turn complexity into clarity.
                  </p>
                  <p className="mt-4">
                    What began as a small side experiment slowly grew into a complete platform that
                    tracks news, order books, depth, and sentiment — all in one clean, responsive
                    interface.
                  </p>
                </div>
              </div>
              {/* <div className="my-14 w-full px-20 tracking-wide text-[var(--primarytext)]">
                <h3 className="text-2xl font-medium">What Alpstein does</h3>
                <p className="my-5 text-sm font-extralight">
                  Alpstein constantly gathers news from trusted crypto sites like CoinTelegraph, The
                  Block, and NewsBTC.
                  <p>It then uses AI to:</p>
                  <ul className="my-2 flex flex-col gap-2 pl-4">
                    <li>
                      Summarize the articles so you don&apos;t have to read through pages of text.
                    </li>
                    <li>Judge the market mood — is the story bullish, bearish, or unclear?</li>
                    <li>
                      Suggest what to watch — like possible buy or sell levels, take-profit zones,
                      and stop-loss points.
                    </li>
                  </ul>
                  <p className="">
                    So instead of juggling ten tabs, you get one screen that shows what&apos;s
                    happening, what people are saying, and what the numbers are telling you — all
                    updated live.
                  </p>
                </p>
              </div> */}
            </div>
            <div
              className="hidden min-w-10 border-x border-[var(--cardborder)]/50 bg-fixed lg:block"
              style={{
                backgroundImage: `repeating-linear-gradient(315deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
                backgroundSize: "10px 10px",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
