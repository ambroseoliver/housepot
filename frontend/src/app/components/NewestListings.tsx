"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const newestHomes = [
  { img: "/homes/3.jpg", title: "Skyline Suite", price: "KSh 180,000/mo" },
  { img: "/homes/4.jpg", title: "Beachside Villa", price: "KSh 320,000/mo" },
  { img: "/homes/5.jpg", title: "Studio Loft", price: "KSh 90,000/mo" },
  { img: "/homes/1.jpg", title: "Eco-Friendly Nest", price: "KSh 150,000/mo" },
];

export default function NewestListings() {
  return (
    <section className="py-20 bg-slate-50 px-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">
          Our Newest Listings
        </h2>
        <p className="mt-2 text-gray-600">Freshly added homes you’ll love</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {newestHomes.map((home, idx) => (
          <motion.div
            key={idx}
            className="rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
          >
            <Image
              src={home.img}
              alt={home.title}
              width={400}
              height={250}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {home.title}
              </h3>
              <p className="text-gray-600 mt-1">{home.price}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="/listings"
          className="inline-block text-white bg-black hover:bg-gray-800 transition px-6 py-3 rounded-full text-sm font-medium"
        >
          View All Listings
        </a>
      </div>
    </section>
  );
}
