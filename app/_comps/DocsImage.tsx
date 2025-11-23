import Image from "next/image";

export default function DocsImage() {
  return (
    <div className="relative hidden h-20 w-full rounded-lg border border-[var(--cardborder)] md:block md:h-32 lg:h-44">
      <Image
        loading="lazy"
        src="/alps-range.jpg"
        alt="Alpstein"
        fill
        priority={false}
        className="rounded-lg object-cover"
      />

      <div className="absolute inset-0 rounded-md bg-neutral-700/30" />
      <div className="absolute bottom-5 left-0 pl-10 text-neutral-700 lg:w-2/5">
        <h2 className="text-2xl font-medium">Welcome to Alpstein</h2>
        <p className="text-[10px] leading-[15px] font-extralight text-wrap md:text-xs lg:text-sm">
          Alpstein empowers you to make smart crypto decisions. Giving you an extra edge with
          assisted AI insights.
        </p>
      </div>
    </div>
  );
}
