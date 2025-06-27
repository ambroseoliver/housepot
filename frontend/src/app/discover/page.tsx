"use client";

import { motion } from "framer-motion";
import { Home, MapPin, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    icon: <Home className="w-6 h-6" />,
    title: "Apartments",
    description: "Comfortable city living with modern amenities.",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Townhouses",
    description: "Spacious family homes in secure neighborhoods.",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Short-Term Rentals",
    description: "Flexible stays for vacations or temporary housing.",
  },
];

const featured = [
  {
    img: "/homes/1.jpg",
    title: "Urban Loft",
    location: "Nairobi",
    price: "KSh 120,000/mo",
  },
  {
    img: "/homes/2.jpg",
    title: "Serene Villa",
    location: "Karen",
    price: "KSh 300,000/mo",
  },
  {
    img: "/homes/3.jpg",
    title: "Modern Studio",
    location: "Westlands",
    price: "KSh 85,000/mo",
  },
];

export default function DiscoverPage() {
  return (
    <div className="py-24 px-6 bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Discover Your Ideal Space
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore by category, location, or lifestyle. Find homes that match
          your rhythm.
        </p>
      </motion.div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
        {categories.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl text-center shadow hover:shadow-xl transition"
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Featured Homes */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Handpicked Just for You
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((home, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-900 border dark:border-gray-800 hover:shadow-lg transition"
            >
              <Image
                src={home.img}
                alt={home.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{home.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {home.location}
                </p>
                <p className="mt-1 text-indigo-600 dark:text-indigo-400 font-medium">
                  {home.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/listings"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg transition"
        >
          Browse All Listings →
        </Link>
      </motion.div>
    </div>
  );
}
