"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react"; // Added MapPin and ArrowRight for visual cues

const locations = [
  { name: "Westlands", url: "/listings?location=westlands" },
  { name: "Loresho", url: "/listings?location=loresho" },
  { name: "Mountain View", url: "/listings?location=mountain-view" },
  { name: "Kileleshwa", url: "/listings?location=kileleshwa" },
  { name: "Lavington", url: "/listings?location=lavington" },
  { name: "Gigiri", url: "/listings?location=gigiri" }, // Example: further areas in Nairobi
  { name: "Kilimani", url: "/listings?location=kilimani" }, // Example: further areas in Nairobi
  { name: "Muthaiga", url: "/listings?location=muthaiga" }, // Example: further areas in Nairobi
];

export default function ExploreByLocation() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-gray-50 via-blue-50 to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Background blobs for consistent futuristic feel */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 opacity-5 rounded-full mix-blend-multiply filter blur-3xl animate-blob -z-0"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400 opacity-5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 -z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 block">
            Discover Your Neighborhood
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Explore Popular Areas in Nairobi
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find homes in the most sought-after neighborhoods, tailored to your
            preferences, all within Nairobi.
          </p>
        </motion.div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {locations.map((location, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <Link href={location.url} className="block p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-200 dark:group-hover:bg-blue-800">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {location.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-1">
                  View Listings{" "}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Global CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            href="/listings?city=nairobi"
            className="inline-flex items-center gap-2 text-white bg-gray-900 hover:bg-gray-700 transition-all duration-300 px-8 py-4 rounded-full text-lg font-semibold shadow-xl dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
          >
            See All Nairobi Listings
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
