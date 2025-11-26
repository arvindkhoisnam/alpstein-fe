import Hero from "./_comps/Hero";
import SigninModal from "./_comps/SigninModal";

export default function Home() {
  return (
    <div
      className="mx-auto max-w-7xl border-x-[0.5px] border-[var(--cardborder)]/50"
      style={{
        userSelect: "none",
      }}
    >
      <Hero />
      <SigninModal />
      <div className="flex h-screen items-center justify-center bg-[var(--background)]">
        <h1 className="text-4xl text-black dark:text-white">Test</h1>
      </div>
    </div>
  );
}
