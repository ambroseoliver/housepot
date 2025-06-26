"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const featured = [
  { img: "/homes/1.jpg", title: "Luxury City View", price: "KSh 250,000/mo" },
  { img: "/homes/2.jpg", title: "Modern Apartment", price: "KSh 120,000/mo" },
  { img: "/homes/3.jpg", title: "Cozy Suburb", price: "KSh 75,000/mo" },
  { img: "/homes/4.jpg", title: "Smart Home", price: "KSh 300,000/mo" },
];

export default function FeaturedListings() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-900">Featured Listings</h2>
        <p className="mt-2 text-gray-600">Hand-picked homes curated for you</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {featured.map((item, idx) => (
          <motion.div
            key={idx}
            className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <Image
              src={item.img}
              alt={item.title}
              width={400}
              height={260}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-1">{item.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
