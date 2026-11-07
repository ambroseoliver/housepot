import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-[#1d4635] px-5 py-20 text-white dark:bg-[#203a2b] sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c5dfbf]">
            Your next chapter
          </p>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Whether you’re looking or letting, we’re here to help.
          </h2>
          <p className="mt-4 max-w-lg leading-7 text-white/75">
            Find a place to call home, or talk to us about sharing your property
            with people looking for theirs.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/listings"
            className="group rounded-2xl border border-white/15 bg-white/10 p-6 transition hover:bg-white/15"
          >
            <Search size={22} className="mb-8 text-[#c5dfbf]" />
            <h3 className="text-lg font-semibold">I’m looking for a home</h3>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Explore available rentals and find your fit.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#c5dfbf]">
              Browse homes
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
          <Link
            href="/account?role=landlord"
            className="group rounded-2xl border border-white/15 bg-white/10 p-6 transition hover:bg-white/15"
          >
            <Home size={22} className="mb-8 text-[#c5dfbf]" />
            <h3 className="text-lg font-semibold">I have a property</h3>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Create a landlord account and share your home with renters.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#c5dfbf]">
              Continue as a landlord
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
