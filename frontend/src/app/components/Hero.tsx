import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { ArrowDown, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[720px] items-center overflow-hidden bg-[#18251c] pb-16 pt-32 text-white sm:min-h-[760px] sm:pb-20">
      <Image
        src="/img/hero-house.jpg"
        alt="A welcoming modern home surrounded by greenery"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#101a14]/90 via-[#142119]/70 to-[#142119]/15" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#f8f8f5] to-transparent dark:from-[#111a15]" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md">
            <CheckCircle2 size={16} className="text-[#b8d7b7]" />
            A more thoughtful way to find home in Kenya
          </div>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Come home to
            <span className="block text-[#c5dfbf]">somewhere new.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Explore places that fit your life, your neighbourhood, and your
            budget. Your next chapter starts with a better search.
          </p>
        </div>

        <div className="mt-10 max-w-5xl">
          <SearchBar />
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            <span className="font-medium text-white/90">Popular:</span>
            {["Westlands", "Kilimani", "Kileleshwa", "Karen"].map((area) => (
              <Link
                key={area}
                href={`/listings?location=${encodeURIComponent(area)}`}
                className="underline decoration-white/35 underline-offset-4 transition hover:text-white hover:decoration-white"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <a
        href="#available-homes"
        aria-label="Scroll to available homes"
        className="absolute bottom-8 right-8 hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70 transition hover:text-white lg:flex"
      >
        Explore homes <ArrowDown size={15} />
      </a>
    </section>
  );
}
