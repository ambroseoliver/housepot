"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

const locations = [
  { name: "Westlands", note: "City living, connected", image: "/homes/2.jpg" },
  { name: "Kilimani", note: "A little bit of everything", image: "/homes/6.jpg" },
  { name: "Kileleshwa", note: "A quieter side of town", image: "/homes/4.jpg" },
  { name: "Karen", note: "Room to slow down", image: "/homes/3.jpg" },
];

export default function ExploreByLocation() {
  return (
    <section className="bg-white px-5 py-20 dark:bg-[#18231c] sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
              Neighbourhood guide
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white sm:text-4xl">
              Start with a place you love
            </h2>
            <p className="mt-3 leading-7 text-[#66736b] dark:text-[#aab5ad]">
              Explore popular Nairobi neighbourhoods and see what feels like
              your kind of place.
            </p>
          </div>
          <Link
            href="/listings?location=Nairobi"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#285c45] hover:text-[#1d4635] dark:text-[#b6d8bd]"
          >
            Browse all Nairobi homes <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <Link
                href={`/listings?location=${encodeURIComponent(location.name)}`}
                className="group relative block aspect-[0.92] overflow-hidden rounded-2xl bg-[#253329]"
              >
                <Image
                  src={location.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-white/80">
                    <MapPin size={14} /> Nairobi, Kenya
                  </p>
                  <h3 className="text-xl font-semibold">{location.name}</h3>
                  <p className="mt-1 text-sm text-white/75">{location.note}</p>
                </div>
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#285c45] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight size={17} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
