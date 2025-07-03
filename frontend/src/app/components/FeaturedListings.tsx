"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Bed, Bath, CarFront, MapPin } from "lucide-react"; // Added more icons for amenities and location

const featured = [
  {
    img: "/homes/1.jpg",
    title: "Luxury City View Penthouse",
    location: "USA, New York City",
    price: "KSh 250,000/mo",
    description:
      "Experience unparalleled urban living with breathtaking cityscapes from this exquisite penthouse.",
    beds: 4,
    baths: 3,
    sqft: 2800,
  },
  {
    img: "/homes/2.jpg",
    title: "Modern Lakeside Apartment",
    location: "Canada, Vancouver",
    price: "KSh 120,000/mo",
    description:
      "A sleek and contemporary apartment offering serene lake views and smart home integration.",
    beds: 2,
    baths: 2,
    sqft: 1400,
  },
  {
    img: "/homes/3.jpg",
    title: "Cozy Suburban Family Home",
    location: "Kenya, Nairobi", // Changed location to Kenya
    price: "KSh 75,000/mo",
    description:
      "Perfect for families, this charming home in a quiet suburb boasts a large garden and modern interiors.",
    beds: 3,
    baths: 2,
    sqft: 1800,
  },
  {
    img: "/homes/4.jpg",
    title: "Eco-Friendly Smart Villa",
    location: "Australia, Sydney",
    price: "KSh 300,000/mo",
    description:
      "Embrace sustainable luxury in this cutting-edge smart villa, designed for comfort and efficiency.",
    beds: 5,
    baths: 4,
    sqft: 3500,
  },
  {
    img: "/homes/5.jpg",
    title: "Chic Downtown Studio",
    location: "UK, London",
    price: "KSh 95,000/mo",
    description:
      "A compact yet stylish studio apartment, ideal for urban professionals seeking convenience and design.",
    beds: 1,
    baths: 1,
    sqft: 600,
  },
  {
    img: "/homes/6.jpg",
    title: "Riverside Loft with Balcony",
    location: "Germany, Berlin",
    price: "KSh 180,000/mo",
    description:
      "Enjoy vibrant city life from this spacious loft, featuring a private balcony overlooking the river.",
    beds: 2,
    baths: 2,
    sqft: 1600,
  },
  {
    img: "/homes/7.jpg",
    title: "Seaside Retreat with Pool",
    location: "Spain, Costa del Sol",
    price: "KSh 400,000/mo",
    description:
      "An exclusive villa offering stunning sea views, a private infinity pool, and direct beach access.",
    beds: 4,
    baths: 4,
    sqft: 3200,
  },
  {
    img: "/homes/8.jpg",
    title: "Mountain View Cabin",
    location: "Switzerland, Alps",
    price: "KSh 200,000/mo",
    description:
      "A cozy, modern cabin nestled in the mountains, perfect for a serene escape with panoramic views.",
    beds: 3,
    baths: 2,
    sqft: 1900,
  },
];

export default function FeaturedListings() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Optional: Subtle background pattern or texture for depth */}
      <div className="absolute inset-0 bg-[url('/path/to/subtle-pattern.png')] opacity-5 dark:opacity-10 z-0"></div>{" "}
      {/* Replace with your subtle pattern */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 block">
            Exclusive Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Our Handpicked Featured Listings
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover exceptional properties chosen for their unique charm,
            premium features, and desirable locations.
          </p>
        </motion.div>

        {/* Listings Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 group"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                FEATURED
              </div>

              {/* Image */}
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info Block */}
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    {item.location}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-base mb-3 line-clamp-2">
                    {" "}
                    {/* Limit description to 2 lines */}
                    {item.description}
                  </p>
                </div>

                {/* Price & Amenities */}
                <div className="flex items-end justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                  <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {item.price}
                  </div>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{item.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>{item.baths}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CarFront className="w-4 h-4" />{" "}
                      {/* Using CarFront for garage/parking/general area */}
                      <span>{item.sqft} sqft</span>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <button className="w-full mt-4 flex items-center justify-center gap-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl shadow-md transition-all duration-300 group-hover:bg-indigo-700">
                  View Details
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="/featured-listings"
            className="inline-flex items-center gap-2 text-white bg-gray-900 hover:bg-gray-700 transition-all duration-300 px-8 py-4 rounded-full text-lg font-semibold shadow-xl dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
          >
            Explore All Featured
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
