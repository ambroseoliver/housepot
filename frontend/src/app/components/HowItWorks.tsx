"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, KeyRound, Search } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Tell us what matters",
    description:
      "Choose a neighbourhood, home type, and monthly budget that feel right for you.",
  },
  {
    number: "02",
    icon: Heart,
    title: "Explore your options",
    description:
      "Compare available homes and save the ones you can picture yourself in.",
  },
  {
    number: "03",
    icon: KeyRound,
    title: "Take the next step",
    description:
      "Get in touch with the Housepot team to arrange a viewing and move forward.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#f8f8f5] px-5 py-20 dark:bg-[#111a15] sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
            A better way to rent
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white sm:text-4xl">
            From searching to settling in
          </h2>
          <p className="mt-4 leading-7 text-[#66736b] dark:text-[#aab5ad]">
            Finding your next place shouldn’t feel like a full-time job. We
            make the next step clearer.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border border-[#e4e9e4] bg-white p-7 dark:border-[#2b3a30] dark:bg-[#18231c] sm:p-8"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4ed] text-[#285c45] dark:bg-[#26382b] dark:text-[#b6d8bd]">
                    <Icon size={22} />
                  </span>
                  <span className="text-sm font-semibold tracking-widest text-[#9ba79d] dark:text-[#637267]">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#202a24] dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-[#66736b] dark:text-[#aab5ad]">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </div>
        <div className="mt-9 text-center">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#285c45] transition hover:gap-3 dark:text-[#b6d8bd]"
          >
            Start exploring <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
