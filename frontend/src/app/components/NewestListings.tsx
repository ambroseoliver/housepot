"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const newestHomes = [
  { img: "/homes/3.jpg", title: "Skyline Suite", price: "KSh 180,000/mo" },
  { img: "/homes/4.jpg", title: "Beachside Villa", price: "KSh 320,000/mo" },
  { img: "/homes/5.jpg", title: "Studio Loft", price: "KSh 90,000/mo" },
  { img: "/homes/1.jpg", title: "Eco-Friendly Nest", price: "KSh 150,000/mo" },
];

export default function NewestListings() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Our Newest Listings
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
            Freshly added homes curated for you.
          </p>
        </motion.div>

        {/* Listings Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {newestHomes.map((home, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <Image
                  src={home.img}
                  alt={home.title}
                  width={400}
                  height={250}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {home.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  {home.price}
                </p>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* View CTA */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button className="flex items-center gap-1 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full shadow-lg">
                  View
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="/listings"
            className="inline-flex items-center gap-2 text-white bg-black hover:bg-gray-800 transition px-6 py-3 rounded-full text-sm font-medium shadow-xl"
          >
            View All Listings
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
