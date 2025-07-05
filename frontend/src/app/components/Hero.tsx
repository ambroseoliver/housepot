"use client";

import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { FiArrowRightCircle } from "react-icons/fi";

const images = [
  "/homes/1.jpg",
  "/homes/2.jpg",
  "/homes/3.jpg",
  "/homes/4.jpg",
  "/homes/5.jpg",
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-36 px-4 sm:px-6 md:px-12 xl:px-24 bg-gradient-to-br from-white via-slate-100 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      {/* 🔹 Background Image Stack */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0 flex justify-center items-end gap-2 sm:gap-4 md:gap-6 xl:gap-8 pointer-events-none"
      >
        {images.map((src, index) => {
          const isCenter = index === 2;
          const baseSize = {
            width: isCenter ? 220 : 160,
            height: isCenter ? 330 : 240,
          };

          return (
            <div
              key={index}
              className={`relative rounded-3xl overflow-hidden border border-white/30 dark:border-white/10 shadow-2xl backdrop-blur-md transition-transform duration-500 ${
                isCenter ? "scale-100 z-30" : "scale-[0.85] z-10"
              }`}
              style={{
                ...baseSize,
                transform: `translateY(${Math.abs(index - 2) * 12}px)`,
              }}
            >
              <Image
                src={src}
                alt={`Home ${index + 1}`}
                fill
                className="object-cover brightness-95 saturate-110 blur-[0.4px] sm:blur-[0.2px]"
                sizes="(max-width: 768px) 60vw, (max-width: 1200px) 20vw, 15vw"
              />
            </div>
          );
        })}
      </motion.div>

      {/* 🔹 Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Heading */}
        <motion.h1
          className="text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Your Future Home,
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Unlocked.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Experience the next generation of effortless rental discovery across
          Waiyaki Way, Nairobi.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="mt-10 w-full max-w-4xl px-2 sm:px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SearchBar />
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          className="mt-12 w-full max-w-md px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="relative rounded-xl border border-indigo-100 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-900/30 p-5 shadow-sm backdrop-blur-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300">
            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
              <span className="font-semibold">Are you a landlord?</span>{" "}
              <a
                href="/list-property"
                className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-4 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
              >
                List your property now <FiArrowRightCircle className="inline" />
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
