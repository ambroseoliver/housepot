"use client";

import { motion } from "framer-motion";
import { Search, Home, UploadCloud } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Effortlessly browse curated homes based on your lifestyle, preferences, and budget.",
  },
  {
    icon: Home,
    title: "Book",
    description:
      "Easily schedule viewings, request media, or connect with our team for insights.",
  },
  {
    icon: UploadCloud,
    title: "List Your Property",
    description:
      "Landlords can request professional photos & videos and go live with high-impact listings.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight text-gray-900 dark:text-white"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
