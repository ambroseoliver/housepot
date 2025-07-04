"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Bed, Bath, CarFront, MapPin, Star } from "lucide-react"; // Added Star icon for the new highlight

const newestHomes = [
  {
    img: "/homes/3.jpg",
    title: "Bedsitter - Westlands",
    location: "Westlands, Nairobi",
    price: "KSh 15,000/mo",
    costToMoveIn: "KSh 30,000", // Assuming 1 month deposit + 1 month rent
    beds: 1,
    baths: 1,
    sqft: 300,
    status: "Available",
    paymentTerms: "Deposit + 1 Month",
    availability: "Immediate",
    highlight: "Modern & Cozy Living", // New attractive highlight
  },
  {
    img: "/homes/4.jpg",
    title: "1 Bedroom - Mountain View",
    location: "Mountain View, Nairobi",
    price: "KSh 22,000/mo",
    costToMoveIn: "KSh 44,000", // Assuming 1 month deposit + 1 month rent
    beds: 1,
    baths: 1,
    sqft: 550,
    status: "Available",
    paymentTerms: "Deposit + 1 Month",
    availability: "From 1st August",
    highlight: "Spacious & Bright", // New attractive highlight
  },
  {
    img: "/homes/5.jpg",
    title: "2 Bedroom - Kinoo",
    location: "Kinoo, Nairobi",
    price: "KSh 28,000/mo",
    costToMoveIn: "KSh 84,000", // Assuming 1 month deposit + 2 months rent
    beds: 2,
    baths: 1,
    sqft: 800,
    status: "Available",
    paymentTerms: "Deposit + 2 Months",
    availability: "Immediate",
    highlight: "Ideal for Families", // New attractive highlight
  },
  {
    img: "/homes/1.jpg",
    title: "3 Bedroom - Kikuyu",
    location: "Kikuyu, Nairobi",
    price: "KSh 38,000/mo",
    costToMoveIn: "KSh 76,000", // Assuming 1 month deposit + 1 month rent
    beds: 3,
    baths: 2,
    sqft: 1200,
    status: "Available",
    paymentTerms: "Deposit + 1 Month",
    availability: "From 15th July",
    highlight: "Expansive Garden Access", // New attractive highlight
  },
  {
    img: "/homes/6.jpg",
    title: "Studio - Kileleshwa",
    location: "Kileleshwa, Nairobi",
    price: "KSh 20,000/mo",
    costToMoveIn: "KSh 40,000",
    beds: 1,
    baths: 1,
    sqft: 400,
    status: "Available",
    paymentTerms: "Deposit + 1 Month",
    availability: "Immediate",
    highlight: "Urban Oasis", // New attractive highlight
  },
  {
    img: "/homes/7.jpg",
    title: "Bedsitter - Uthiru",
    location: "Uthiru, Nairobi",
    price: "KSh 12,000/mo",
    costToMoveIn: "KSh 24,000",
    beds: 1,
    baths: 1,
    sqft: 250,
    status: "Available",
    paymentTerms: "Deposit + 1 Month",
    availability: "Immediate",
    highlight: "Budget-Friendly Comfort", // New attractive highlight
  },
  {
    img: "/homes/8.jpg",
    title: "1 Bedroom - Ruaka",
    location: "Ruaka, Nairobi",
    price: "KSh 25,000/mo",
    costToMoveIn: "KSh 50,000",
    beds: 1,
    baths: 1,
    sqft: 600,
    status: "Available",
    paymentTerms: "Deposit + 1 Month",
    availability: "From 1st August",
    highlight: "Strategic Location", // New attractive highlight
  },
  {
    img: "/homes/2.jpg", // Using a new image or repurpose one if needed
    title: "2 Bedroom - Embakasi",
    location: "Embakasi, Nairobi",
    price: "KSh 30,000/mo",
    costToMoveIn: "KSh 60,000", // Assuming 1 month deposit + 1 month rent
    beds: 2,
    baths: 1,
    sqft: 750,
    status: "Available",
    paymentTerms: "Deposit + 1 Month",
    availability: "Immediate",
    highlight: "Convenient Commute", // New attractive highlight
  },
];

export default function NewestListings() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Background blobs for consistent futuristic feel */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-400 opacity-5 rounded-full mix-blend-multiply filter blur-3xl animate-blob -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-400 opacity-5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 -z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 block">
            Freshly Added
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Our Newest Listings
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Be the first to discover the latest homes, curated for convenience
            and comfort in prime Nairobi locations.
          </p>
        </motion.div>

        {/* Listings Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {newestHomes.map((home, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 group"
            >
              {/* Status Tag */}
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold z-10 shadow-md ${
                  home.status === "Available"
                    ? "bg-green-500 text-white dark:bg-green-700" // Stronger green for available
                    : "bg-yellow-500 text-white dark:bg-yellow-700" // Stronger yellow for other status
                }`}
              >
                {home.status}
              </span>
              {/* New Listing Badge */}
              <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md animate-pulse">
                NEW!
              </span>

              {/* Image */}
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={home.img}
                  alt={home.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-1">
                    {home.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4 text-indigo-500" />{" "}
                    {/* Using MapPin from lucide-react */}
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
                    <span>
                      {home.beds} Bed{home.beds > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>
                      {home.baths} Bath{home.baths > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CarFront className="w-4 h-4" />
                    <span>{home.sqft} sqft</span>
                  </div>
                </div>

                {/* Kenyanized Info Section */}
                <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                  {/* Changed from Monthly Rent to Highlighted Feature */}
                  <div className="flex flex-col items-center p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                    <span className="text-gray-500 dark:text-gray-400 text-center mb-1">
                      Key Feature
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm text-center flex items-center gap-1">
                      <Star className="w-3 h-3" /> {home.highlight}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                    <span className="text-gray-500 dark:text-gray-400 text-center mb-1">
                      Cost to Move In
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm text-center">
                      {home.costToMoveIn}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                    <span className="text-gray-500 dark:text-gray-400 text-center mb-1">
                      Availability
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm text-center">
                      {home.availability}
                    </span>
                  </div>
                </div>

                {/* CTA */}
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
