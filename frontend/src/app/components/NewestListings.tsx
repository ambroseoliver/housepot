"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Bed, Bath, CarFront } from "lucide-react"; // Added icons for amenities

const newestHomes = [
  {
    img: "/homes/3.jpg",
    title: "Skyline Suite",
    location: "USA, New York City",
    price: "KSh 180,000/mo",
    beds: 3,
    baths: 2,
    sqft: 1500,
    status: "Upcoming", // Added status
    projectedApr: "12.3%", // Added projected APR
    tokenPrice: "$50", // Added token price
  },
  {
    img: "/homes/4.jpg",
    title: "Tranquil Home",
    location: "Canada, Toronto",
    price: "KSh 320,000/mo",
    beds: 3,
    baths: 2,
    sqft: 2250,
    status: "Active",
    projectedApr: "8.0%",
    tokenPrice: "$50",
  },
  {
    img: "/homes/5.jpg",
    title: "City Loft",
    location: "Indonesia, Bali",
    price: "KSh 90,000/mo",
    beds: 2,
    baths: 1,
    sqft: 1325,
    status: "Active",
    projectedApr: "28.5%",
    tokenPrice: "$50",
  },
  {
    img: "/homes/1.jpg",
    title: "Coastal Villa",
    location: "Spain, Barcelona",
    price: "KSh 290,000/mo",
    beds: 3,
    baths: 2,
    sqft: 1900,
    status: "Active",
    projectedApr: "26.3%",
    tokenPrice: "$50",
  },
  {
    img: "/homes/6.jpg", // New image for additional listings
    title: "Modern Townhouse",
    location: "UK, London",
    price: "KSh 250,000/mo",
    beds: 4,
    baths: 3,
    sqft: 2800,
    status: "Upcoming",
    projectedApr: "15.0%",
    tokenPrice: "$50",
  },
  {
    img: "/homes/7.jpg", // New image
    title: "Suburban Oasis",
    location: "Australia, Sydney",
    price: "KSh 210,000/mo",
    beds: 3,
    baths: 2,
    sqft: 1850,
    status: "Active",
    projectedApr: "10.5%",
    tokenPrice: "$50",
  },
  {
    img: "/homes/8.jpg", // New image
    title: "Riverside Cabin",
    location: "USA, Colorado",
    price: "KSh 120,000/mo",
    beds: 2,
    baths: 1,
    sqft: 1000,
    status: "Active",
    projectedApr: "9.2%",
    tokenPrice: "$50",
  },
  {
    img: "/homes/9.jpg", // New image
    title: "Urban Studio",
    location: "Germany, Berlin",
    price: "KSh 85,000/mo",
    beds: 1,
    baths: 1,
    sqft: 600,
    status: "Upcoming",
    projectedApr: "18.7%",
    tokenPrice: "$50",
  },
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
            Freshly added homes curated for you. Discover your next dream
            property.
          </p>
        </motion.div>

        {/* Listings Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {newestHomes.map((home, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }} // Reduced delay for faster animation
              className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 transform hover:-translate-y-2" // Enhanced shadow, border and hover effect
            >
              {/* Status Tag */}
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold z-10 ${
                  home.status === "Upcoming"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                }`}
              >
                {home.status}
              </span>

              {/* Image */}
              <div className="relative w-full h-60 overflow-hidden rounded-t-3xl">
                {" "}
                {/* Increased image height */}
                <Image
                  src={home.img}
                  alt={home.title}
                  layout="fill" // Use fill for better image fitting
                  objectFit="cover" // Cover ensures the image fills the space
                  className="hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-4">
                {" "}
                {/* Increased padding and gap */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {home.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    {home.location}
                  </p>
                  <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {home.price}
                  </p>
                </div>
                {/* Amenities */}
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-sm border-t border-b border-gray-100 dark:border-gray-700 py-3">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{home.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{home.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CarFront className="w-4 h-4" />{" "}
                    {/* Example icon, could be for garage/parking */}
                    <span>{home.sqft} sqft</span>
                  </div>
                </div>
                {/* Investment Details */}
                <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500 dark:text-gray-400">
                      Token price
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {home.tokenPrice}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500 dark:text-gray-400">
                      Projected APR
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {home.projectedApr}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500 dark:text-gray-400">
                      Projected RR
                    </span>{" "}
                    {/* Added Projected RR */}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      10.5%
                    </span>{" "}
                    {/* Example value */}
                  </div>
                </div>
                {/* CTA */}
                <button className="w-full mt-4 flex items-center justify-center gap-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl shadow-md transition-all duration-300 group">
                  View Property
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
          viewport={{ once: true }}
        >
          <a
            href="/listings"
            className="inline-flex items-center gap-2 text-white bg-gray-900 hover:bg-gray-700 transition-all duration-300 px-8 py-4 rounded-full text-lg font-semibold shadow-xl dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
          >
            Explore All Listings
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
