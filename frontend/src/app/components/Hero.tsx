"use client";

import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 bg-gradient-to-br from-white via-slate-100 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Animated BG Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-[600px] h-[600px] bg-indigo-500/30 blur-[120px] rounded-full absolute -top-40 -left-40 dark:bg-cyan-500/20"
        />
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="w-[400px] h-[400px] bg-pink-400/30 blur-[100px] rounded-full absolute bottom-0 right-0 dark:bg-pink-500/20"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Your Future Home, <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Unlocked.
          </span>
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Experience the next generation of effortless rental discovery across
          Kenya.
        </motion.p>

        <motion.div
          className="mt-8 w-full flex justify-center px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-full max-w-4xl">
            <SearchBar />
          </div>
        </motion.div>
        <motion.div
          className="mt-10 w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="relative rounded-xl border border-indigo-100 dark:border-indigo-900 bg-indigo-50/60 dark:bg-indigo-900/30 p-4 text-center shadow-sm backdrop-blur-sm hover:shadow-md transition">
            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
              <span className="font-medium">Are you a landlord?</span>{" "}
              <a
                href="/list-property"
                className="text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-2 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
              >
                List your property with us →
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
