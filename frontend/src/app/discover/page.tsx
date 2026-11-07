import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, House, MoveRight } from "lucide-react";
import ListingGrid from "../components/ListingGrid";

export const metadata: Metadata = {
  title: "Discover homes",
  description:
    "Discover rental homes in Kenya by the kind of space you’re looking for.",
};

const homeTypes = [
  { title: "Bedsitters", type: "bedsitter", note: "A space of your own" },
  { title: "Studios", type: "studio", note: "Simple, open-plan living" },
  { title: "1 bedroom", type: "1-bedroom", note: "Room to settle in" },
  { title: "2 bedrooms", type: "2-bedroom", note: "A little more room" },
];

export default function DiscoverPage() {
  return (
    <div className="bg-[#f8f8f5] pb-20 pt-32 dark:bg-[#111a15] sm:pt-36">
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
              Discover your next home
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-[#202a24] dark:text-white sm:text-6xl">
              Find a space that feels like you.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#66736b] dark:text-[#aab5ad]">
              Start with the kind of home you have in mind, then explore
              available rentals to find your fit.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeTypes.map((home) => (
              <Link
                key={home.type}
                href={`/listings?type=${home.type}`}
                className="group rounded-2xl border border-[#e4e9e4] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#c0d0c2] hover:shadow-lg dark:border-[#2b3a30] dark:bg-[#18231c] dark:hover:border-[#405947]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ed] text-[#285c45] dark:bg-[#26382b] dark:text-[#b6d8bd]">
                  <House size={19} />
                </span>
                <h2 className="mt-5 font-semibold text-[#202a24] dark:text-white">
                  {home.title}
                </h2>
                <p className="mt-1 text-sm text-[#66736b] dark:text-[#aab5ad]">
                  {home.note}
                </p>
                <span className="mt-4 flex items-center justify-between text-xs font-semibold text-[#52765b] dark:text-[#b6d8bd]">
                  Explore homes
                  <ArrowUpRight
                    size={15}
                    className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 bg-white px-5 py-16 dark:bg-[#18231c] sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
                Available now
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white">
                Explore rental homes
              </h2>
            </div>
            <Link
              href="/listings"
              className="hidden items-center gap-2 text-sm font-semibold text-[#285c45] hover:underline dark:text-[#b6d8bd] sm:inline-flex"
            >
              View all <MoveRight size={16} />
            </Link>
          </div>
          <ListingGrid limit={3} />
        </div>
      </section>
    </div>
  );
}
