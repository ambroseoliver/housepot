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
    <section className="relative py-24 px-6 bg-gradient-to-br from-gray-950 via-purple-950 to-black dark:from-gray-950 dark:via-purple-950 dark:to-black overflow-hidden">
      {/* Futuristic Grid/Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold mb-16 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 drop-shadow-lg"
        >
          Your Future Home Journey Starts Here
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="bg-gray-800/60 backdrop-blur-md border border-gray-700/50 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-[1.02] text-center relative overflow-hidden group"
              >
                {/* Animated Border/Glow on Hover */}
                <div className="absolute inset-0 rounded-3xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 blur-md"></div>
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-xl transform group-hover:scale-110 transition-transform duration-500 ease-in-out">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
