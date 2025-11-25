"use client";
import { useState } from "react";
import DocsImage from "../_comps/DocsImage";
import { cn } from "../lib/utils";

enum TABS {
  about,
  under_the_hood,
}

function Page() {
  const [currTab, setCurrTab] = useState(TABS[0]);

  function switchTab(tab: string) {
    setCurrTab(tab);
  }
  return (
    <div
      className={cn(
        "flex h-full items-center justify-center md:h-screen",
        "mx-auto max-w-[1440px] p-2 lg:flex lg:items-center lg:gap-0 lg:p-0",
        "bg-[var(--background)]"
      )}
    >
      <div className="h-full w-full px-2 lg:px-10">
        <div className="my-14 flex flex-col md:mt-24">
          <div className="mb-2 h-full w-full xl:hidden">
            <ul className="flex gap-10 text-base font-light text-[var(--secondarytext)]">
              <button
                onClick={() => switchTab(TABS[0])}
                className="relative cursor-pointer hover:text-[var(--secondarytext)]/50"
              >
                About
                {currTab === TABS[0] && (
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[var(--secondarytext)]" />
                )}
              </button>
              <button
                onClick={() => switchTab(TABS[1])}
                className="relative cursor-pointer hover:text-[var(--secondarytext)]/50"
              >
                Under the hood
                {currTab === TABS[1] && (
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[var(--secondarytext)]" />
                )}
              </button>
            </ul>
          </div>
          <div className="h-[0.5px] w-full bg-gradient-to-r from-transparent from-[-10%] via-zinc-700 via-50% to-transparent to-110% 2xl:top-18"></div>
          <div className="grid h-[calc(100vh-96px)] grid-cols-1 gap-2 xl:grid-cols-[1fr_0.1fr_4fr_0.1fr]">
            <div className="hidden h-full w-full xl:block xl:p-10">
              <ul className="font-meidium flex w-fit gap-10 text-base text-[var(--secondarytext)] xl:flex-col">
                <button
                  onClick={() => switchTab(TABS[0])}
                  className="relative w-fit cursor-pointer hover:text-[var(--secondarytext)]/50"
                >
                  About
                  {currTab === TABS[0] && (
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[var(--secondarytext)]" />
                  )}
                </button>
                <button
                  onClick={() => switchTab(TABS[1])}
                  className="relative cursor-pointer hover:text-[var(--secondarytext)]/50"
                >
                  Under the hood
                  {currTab === TABS[1] && (
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[var(--secondarytext)]" />
                  )}
                </button>
              </ul>
            </div>
            <div
              className="hidden min-w-10 border-x border-[var(--cardborder)]/50 bg-fixed lg:block"
              style={{
                backgroundImage: `repeating-linear-gradient(315deg, var(--stripes) 0, var(--stripes) 1px, transparent 0, transparent 50%)`,
                backgroundSize: "10px 10px",
              }}
            ></div>
            {currTab === TABS[0] ? <About /> : <UnderTheHood />}
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

export default Page;

function About() {
  return (
    <div className="relative max-h-full overflow-y-auto md:pt-10">
      <DocsImage />
      <div className="w-full tracking-wide text-[var(--primarytext)] md:mt-7 md:px-10 lg:mt-14 xl:px-20">
        <div className="my-5 text-xs font-medium text-[var(--secondarytext)] md:text-sm">
          <h3 className="text-lg font-semibold tracking-normal text-[var(--primarytext)]">
            Alpstein is your smart companion for understanding what&apos;s really happening in the
            crypto market — without the noise.
          </h3>
          <p className="mt-4">
            Every day, hundreds of news stories and opinions flood the internet, and prices swing
            wildly. Alpstein helps you make sense of all that by reading the news for you, analyzing
            what&apos;s important, and showing what the market might be thinking — all in one clean,
            easy-to-use dashboard.
          </p>
          <p className="my-5">
            Alpstein constantly gathers news from trusted crypto sites like CoinTelegraph, The
            Block, and NewsBTC.
          </p>
          <p>It then uses OpenAI&apos;s gpt-4 model to:</p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>Summarize the articles so you don&apos;t have to read through pages of text.</li>
            <li>Judge the market mood — is the story bullish, bearish, or unclear?</li>
            <li>
              Suggest what to watch — like possible buy or sell levels, take-profit zones, and
              stop-loss points.
            </li>
          </ul>
          <p className="mt-4">
            So instead of juggling ten tabs, you get one screen that shows what&apos;s happening,
            what people are saying, and what the numbers are telling you — all updated live.
          </p>
          <p className="mt-4">
            Alpstein is a solo project — started with a simple idea: to make market data feel alive.
          </p>
          <p className="mt-4">
            Every line of code, every animation, and every graph in Alpstein has been designed to
            make trading data clear, intuitive, and human-friendly. It&apos;s still growing, but the
            goal remains the same: turn complexity into clarity.
          </p>
          <p className="mt-4">
            What began as a small side experiment slowly grew into a complete platform that tracks
            news, order books, depth, and sentiment — all in one clean, responsive interface.
          </p>
        </div>
      </div>
      <div className="w-full tracking-wide md:mt-7 md:px-10 lg:mt-14 xl:px-20">
        <div className="my-5 text-xs font-medium text-[var(--secondarytext)] md:text-sm">
          <h3 className="text-lg font-semibold text-[var(--primarytext)]">
            Alpstein is your smart companion for understanding what&apos;s really happening in the
            crypto market — without the noise.
          </h3>
          <p className="mt-4">
            Every day, hundreds of news stories and opinions flood the internet, and prices swing
            wildly. Alpstein helps you make sense of all that by reading the news for you, analyzing
            what&apos;s important, and showing what the market might be thinking — all in one clean,
            easy-to-use dashboard.
          </p>
          <p className="my-5">
            Alpstein constantly gathers news from trusted crypto sites like CoinTelegraph, The
            Block, and NewsBTC.
          </p>
          <p>It then uses OpenAI&apos;s gpt-4 model to:</p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>Summarize the articles so you don&apos;t have to read through pages of text.</li>
            <li>Judge the market mood — is the story bullish, bearish, or unclear?</li>
            <li>
              Suggest what to watch — like possible buy or sell levels, take-profit zones, and
              stop-loss points.
            </li>
          </ul>
          <p className="mt-4">
            So instead of juggling ten tabs, you get one screen that shows what&apos;s happening,
            what people are saying, and what the numbers are telling you — all updated live.
          </p>
          <p className="mt-4">
            Alpstein is a solo project — started with a simple idea: to make market data feel alive.
          </p>
          <p className="mt-4">
            Every line of code, every animation, and every graph in Alpstein has been designed to
            make trading data clear, intuitive, and human-friendly. It&apos;s still growing, but the
            goal remains the same: turn complexity into clarity.
          </p>
          <p className="mt-4">
            What began as a small side experiment slowly grew into a complete platform that tracks
            news, order books, depth, and sentiment — all in one clean, responsive interface.
          </p>
        </div>
      </div>
      <div className="w-full tracking-wide text-[var(--primarytext)] md:mt-7 md:px-10 lg:mt-14 xl:px-20">
        <div className="my-5 text-xs font-medium text-[var(--secondarytext)] md:text-sm">
          <h3 className="text-lg font-semibold text-[var(--primarytext)]">
            Alpstein is your smart companion for understanding what&apos;s really happening in the
            crypto market — without the noise.
          </h3>
          <p className="mt-4">
            Every day, hundreds of news stories and opinions flood the internet, and prices swing
            wildly. Alpstein helps you make sense of all that by reading the news for you, analyzing
            what&apos;s important, and showing what the market might be thinking — all in one clean,
            easy-to-use dashboard.
          </p>
          <p className="my-5">
            Alpstein constantly gathers news from trusted crypto sites like CoinTelegraph, The
            Block, and NewsBTC.
          </p>
          <p>It then uses OpenAI&apos;s gpt-4 model to:</p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>Summarize the articles so you don&apos;t have to read through pages of text.</li>
            <li>Judge the market mood — is the story bullish, bearish, or unclear?</li>
            <li>
              Suggest what to watch — like possible buy or sell levels, take-profit zones, and
              stop-loss points.
            </li>
          </ul>
          <p className="mt-4">
            So instead of juggling ten tabs, you get one screen that shows what&apos;s happening,
            what people are saying, and what the numbers are telling you — all updated live.
          </p>
          <p className="mt-4">
            Alpstein is a solo project — started with a simple idea: to make market data feel alive.
          </p>
          <p className="mt-4">
            Every line of code, every animation, and every graph in Alpstein has been designed to
            make trading data clear, intuitive, and human-friendly. It&apos;s still growing, but the
            goal remains the same: turn complexity into clarity.
          </p>
          <p className="mt-4">
            What began as a small side experiment slowly grew into a complete platform that tracks
            news, order books, depth, and sentiment — all in one clean, responsive interface.
          </p>
        </div>
      </div>
    </div>
  );
}
function UnderTheHood() {
  return (
    <div className="relative max-h-full overflow-y-auto md:pt-0">
      <div className="w-full tracking-wide text-[var(--primarytext)] md:mt-7 md:px-10 lg:mt-14 xl:px-20">
        <div className="my-5 text-xs font-light text-[var(--secondarytext)] md:text-sm">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur magni quos atque
            blanditiis alias aliquid perspiciatis reprehenderit sit obcaecati accusamus explicabo
            vitae,
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis aperiam tenetur nulla
            facere omnis voluptatibus ab repellat, explicabo neque quaerat repellendus corrupti
            error doloremque blanditiis, quisquam nobis commodi perferendis ipsa!
          </p>
          <p className="my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo rem ea voluptate a,
          </p>
          <p>It then uses OpenAI&apos;s gpt-4 model to:</p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>Summarize the articles so you don&apos;t have to read through pages of text.</li>
            <li>Judge the market mood — is the story bullish, bearish, or unclear?</li>
            <li>
              Suggest what to watch — like possible buy or sell levels, take-profit zones, and
              stop-loss points.
            </li>
          </ul>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repudiandae modi,
            facilis aspernatur provident tempora, ipsam sit dolore corrupti eius cumque. Numquam
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia tempora vero error
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam facilis quos, tempora,
            necessitatibus quidem quam id pariatur laudantium hic, fugit architecto enim corrupti
            sed repellendus beatae aliquid velit nobis nisi.
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore error ad quidem rem
            nobis quas dignissimos quo voluptates distinctio cumque iste dicta commodi id,
          </p>
        </div>
        <div className="my-5 text-xs font-light text-[var(--secondarytext)] md:text-sm">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur magni quos atque
            blanditiis alias aliquid perspiciatis reprehenderit sit obcaecati accusamus explicabo
            vitae,
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis aperiam tenetur nulla
            facere omnis voluptatibus ab repellat, explicabo neque quaerat repellendus corrupti
            error doloremque blanditiis, quisquam nobis commodi perferendis ipsa!
          </p>
          <p className="my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo rem ea voluptate a,
          </p>
          <p>It then uses OpenAI&apos;s gpt-4 model to:</p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>Summarize the articles so you don&apos;t have to read through pages of text.</li>
            <li>Judge the market mood — is the story bullish, bearish, or unclear?</li>
            <li>
              Suggest what to watch — like possible buy or sell levels, take-profit zones, and
              stop-loss points.
            </li>
          </ul>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repudiandae modi,
            facilis aspernatur provident tempora, ipsam sit dolore corrupti eius cumque. Numquam
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia tempora vero error
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam facilis quos, tempora,
            necessitatibus quidem quam id pariatur laudantium hic, fugit architecto enim corrupti
            sed repellendus beatae aliquid velit nobis nisi.
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore error ad quidem rem
            nobis quas dignissimos quo voluptates distinctio cumque iste dicta commodi id,
          </p>
        </div>
        <div className="my-5 text-xs font-light text-[var(--secondarytext)] md:text-sm">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur magni quos atque
            blanditiis alias aliquid perspiciatis reprehenderit sit obcaecati accusamus explicabo
            vitae,
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis aperiam tenetur nulla
            facere omnis voluptatibus ab repellat, explicabo neque quaerat repellendus corrupti
            error doloremque blanditiis, quisquam nobis commodi perferendis ipsa!
          </p>
          <p className="my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo rem ea voluptate a,
          </p>
          <p>It then uses OpenAI&apos;s gpt-4 model to:</p>
          <ul className="my-2 flex list-disc flex-col gap-2 pl-6">
            <li>Summarize the articles so you don&apos;t have to read through pages of text.</li>
            <li>Judge the market mood — is the story bullish, bearish, or unclear?</li>
            <li>
              Suggest what to watch — like possible buy or sell levels, take-profit zones, and
              stop-loss points.
            </li>
          </ul>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repudiandae modi,
            facilis aspernatur provident tempora, ipsam sit dolore corrupti eius cumque. Numquam
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia tempora vero error
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam facilis quos, tempora,
            necessitatibus quidem quam id pariatur laudantium hic, fugit architecto enim corrupti
            sed repellendus beatae aliquid velit nobis nisi.
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore error ad quidem rem
            nobis quas dignissimos quo voluptates distinctio cumque iste dicta commodi id,
          </p>
        </div>
      </div>
    </div>
  );
}
