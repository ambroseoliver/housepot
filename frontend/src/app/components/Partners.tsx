"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "Nation Media", logo: "/partners/nation.png" },
  { name: "K24", logo: "/partners/k24.png" },
  { name: "Citizen TV", logo: "/partners/citizen.png" },
  { name: "Business Daily", logo: "/partners/bd.png" },
  { name: "Standard Media", logo: "/partners/standard.png" }, // Added more partners for a fuller section
  { name: "The Star", logo: "/partners/the-star.png" },
];

export default function Partners() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Subtle Background Elements for depth/futuristic feel */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500 opacity-3 rounded-full mix-blend-multiply filter blur-3xl animate-blob -translate-x-1/2 -translate-y-1/2 -z-0"></div>
      <div className="absolute bottom-1/2 right-0 w-64 h-64 bg-blue-500 opacity-3 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 translate-x-1/2 translate-y-1/2 -z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 block">
            Our Trust Signals
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            As Seen On Leading Media Outlets
          </h2>
        </motion.div>

        {/* Partners Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 items-center justify-center">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              className="relative group flex items-center justify-center p-4 h-24 sm:h-28 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={150} // Increased size for better visibility
                height={80} // Increased size for better visibility
                className="object-contain w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out transform group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
