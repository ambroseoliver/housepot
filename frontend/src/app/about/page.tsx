import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  House,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Housepot",
  description:
    "Learn about Housepot’s mission to make finding and renting a home in Kenya clearer and more welcoming.",
};

const values = [
  {
    icon: HeartHandshake,
    title: "People first",
    description:
      "A home search is personal. We aim to make the experience feel useful, clear, and human.",
  },
  {
    icon: Compass,
    title: "Local insight",
    description:
      "Neighbourhoods matter. We bring the search closer to the places and communities around you.",
  },
  {
    icon: ShieldCheck,
    title: "Clarity at every step",
    description:
      "We put the details you need in view, so you can make more informed decisions as you search.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#f8f8f5] pb-20 pt-32 dark:bg-[#111a15] sm:pt-36">
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
              A little about us
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#202a24] dark:text-white sm:text-6xl">
              A better way to find the place you’ll call home.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#66736b] dark:text-[#aab5ad]">
              Housepot is a home-hunting platform built around the needs of
              renters and property owners in Kenya. We bring listings,
              neighbourhood discovery, and helpful next steps together in one
              place.
            </p>
            <Link
              href="/listings"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#285c45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4635] dark:bg-[#9ac5a5] dark:text-[#17231b]"
            >
              Explore homes <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-20 bg-white px-5 py-16 dark:bg-[#18231c] sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4ed] text-[#285c45] dark:bg-[#26382b] dark:text-[#b6d8bd]">
              <House size={23} />
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white">
              What we’re here to do
            </h2>
          </div>
          <p className="text-lg leading-8 text-[#66736b] dark:text-[#aab5ad]">
            We believe finding a home should start with possibility, not
            frustration. Housepot helps renters explore options in the places
            they care about, and gives property owners a simpler way to connect
            with people looking for a home. We’re building a more thoughtful
            rental experience, one useful detail at a time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
            What guides us
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white sm:text-4xl">
            Built around the people who make a place home
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <article
                key={value.title}
                className="rounded-2xl border border-[#e4e9e4] bg-white p-7 dark:border-[#2b3a30] dark:bg-[#18231c]"
              >
                <Icon size={23} className="text-[#52765b] dark:text-[#b6d8bd]" />
                <h3 className="mt-6 text-lg font-semibold text-[#202a24] dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#66736b] dark:text-[#aab5ad]">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
