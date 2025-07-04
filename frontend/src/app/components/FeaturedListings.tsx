"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Bed, Bath, CarFront, MapPin, Star } from "lucide-react"; // Added Star icon

const featured = [
  {
    img: "/homes/1.jpg",
    title: "Executive 3BR Apartment - Kileleshwa",
    location: "Kileleshwa, Nairobi",
    price: "KSh 120,000/mo",
    beds: 3,
    baths: 3,
    sqft: 2000,
    status: "Available",
    costToMoveIn: "KSh 240,000", // Assuming 1 month deposit + 1 month rent
    paymentTerms: "Deposit + 1 Month",
    availability: "Immediate",
    highlight: "Premium Urban Living",
  },
  {
    img: "/homes/2.jpg",
    title: "Luxury Villa - Karen",
    location: "Karen, Nairobi",
    price: "KSh 300,000/mo",
    beds: 5,
    baths: 4,
    sqft: 4500,
    status: "Available",
    costToMoveIn: "KSh 600,000", // Assuming 1 month deposit + 1 month rent
    paymentTerms: "Deposit + 1 Month",
    availability: "From 1st September",
    highlight: "Spacious & Private",
  },
  {
    img: "/homes/3.jpg",
    title: "Furnished 2BR Apartment - Kilimani",
    location: "Kilimani, Nairobi",
    price: "KSh 95,000/mo",
    beds: 2,
    baths: 2,
    sqft: 1300,
    status: "Available",
    costToMoveIn: "KSh 190,000", // Assuming 1 month deposit + 1 month rent
    paymentTerms: "Deposit + 1 Month",
    availability: "Immediate",
    highlight: "Fully Furnished Comfort",
  },
  {
    img: "/homes/4.jpg",
    title: "Penthouse with Skyline View",
    location: "Westlands, Nairobi",
    price: "KSh 250,000/mo",
    beds: 4,
    baths: 3,
    sqft: 2800,
    status: "Available",
    costToMoveIn: "KSh 500,000", // Assuming 1 month deposit + 1 month rent
    paymentTerms: "Deposit + 1 Month",
    availability: "Immediate",
    highlight: "Panoramic City Views",
  },
];

export default function FeaturedListings() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Our Handpicked Featured Listings
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover top-tier homes picked for elegance, privacy, and modern
            comfort in prime Nairobi neighborhoods.
          </p>
        </motion.div>

        {/* 4-Card Grid */}
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
              {/* Status Tag (like in Newest Listings) */}
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold z-10 shadow-md ${
                  item.status === "Available"
                    ? "bg-green-500 text-white dark:bg-green-700" // Stronger green for available
                    : "bg-yellow-500 text-white dark:bg-yellow-700" // Stronger yellow for other status
                }`}
              >
                {item.status}
              </span>
              {/* Featured Badge (kept from original featured section) */}
              <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md animate-pulse">
                FEATURED
              </span>

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

              {/* Info */}
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    {item.location}
                  </p>
                  <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {item.price}
                  </p>
                </div>

                {/* Amenities (copied from Newest Listings) */}
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-sm border-t border-b border-gray-100 dark:border-gray-700 py-3">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>
                      {item.beds} Bed{item.beds > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>
                      {item.baths} Bath{item.baths > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CarFront className="w-4 h-4" />
                    <span>{item.sqft} sqft</span>
                  </div>
                </div>

                {/* Kenyanized Info Section (copied from Newest Listings) */}
                <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                  <div className="flex flex-col items-center p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                    <span className="text-gray-500 dark:text-gray-400 text-center mb-1">
                      Key Feature
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm text-center flex items-center gap-1">
                      <Star className="w-3 h-3" /> {item.highlight}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                    <span className="text-gray-500 dark:text-gray-400 text-center mb-1">
                      Cost to Move In
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm text-center">
                      {item.costToMoveIn}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                    <span className="text-gray-500 dark:text-gray-400 text-center mb-1">
                      Availability
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm text-center">
                      {item.availability}
                    </span>
                  </div>
                </div>

                {/* CTA (copied from Newest Listings) */}
                <button className="w-full mt-4 flex items-center justify-center gap-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl shadow-md transition-all duration-300 group">
                  View House
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
