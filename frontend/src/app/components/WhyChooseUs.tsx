"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Compass,
  HeartHandshake,
  Image,
  SearchCheck,
  Wallet,
} from "lucide-react";

const reasons = [
  {
    icon: SearchCheck,
    title: "Search that makes sense",
    description:
      "Narrow your search by area, type of home, and the budget you have in mind.",
  },
  {
    icon: BadgeCheck,
    title: "Clear listing details",
    description:
      "See the essentials up front so you can compare homes with more confidence.",
  },
  {
    icon: Wallet,
    title: "Built around your budget",
    description:
      "Explore rental options across a range of budgets, all in one place.",
  },
  {
    icon: Compass,
    title: "Neighbourhood-first",
    description:
      "Get to know popular areas and find a community that suits your day-to-day.",
  },
  {
    icon: Image,
    title: "A closer look",
    description:
      "Browse listing photos and details before deciding which homes to explore further.",
  },
  {
    icon: HeartHandshake,
    title: "Real support",
    description:
      "Have a question? Our support page makes it simple to reach the Housepot team.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white px-5 py-20 dark:bg-[#18231c] sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
            The Housepot difference
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white sm:text-4xl">
            Home hunting, with more clarity
          </h2>
          <p className="mt-4 leading-7 text-[#66736b] dark:text-[#aab5ad]">
            Less noise, useful details, and a simple way to move from browsing
            to your next step.
          </p>
        </div>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.article
                key={reason.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf4ed] text-[#285c45] dark:bg-[#26382b] dark:text-[#b6d8bd]">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="font-semibold text-[#202a24] dark:text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#66736b] dark:text-[#aab5ad]">
                    {reason.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
