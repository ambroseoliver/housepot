"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const locations = [
  { name: "Nairobi", image: "/locations/nairobi.jpg" },
  { name: "Mombasa", image: "/locations/mombasa.jpg" },
  { name: "Kisumu", image: "/locations/kisumu.jpg" },
  { name: "Eldoret", image: "/locations/eldoret.jpg" },
];

export default function ExploreByLocation() {
  return (
    <section className="bg-slate-100 py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Explore by Location
        </h2>
        <p className="text-gray-600 mb-12">
          Browse listings tailored to your dream destination.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {locations.map((location, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
            >
              <Image
                src={location.image}
                alt={location.name}
                width={300}
                height={300}
                className="object-cover w-full h-64 transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300 flex items-center justify-center">
                <p className="text-white text-xl font-semibold">
                  {location.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
