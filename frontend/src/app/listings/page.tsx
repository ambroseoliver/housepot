"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

const listings = [
  {
    title: "Skyline Penthouse",
    img: "/homes/1.jpg",
    location: "Nairobi CBD",
    price: "KSh 250,000/mo",
  },
  {
    title: "Coastal Breeze Villa",
    img: "/homes/2.jpg",
    location: "Diani Beach",
    price: "KSh 400,000/mo",
  },
  {
    title: "Urban Modern Loft",
    img: "/homes/3.jpg",
    location: "Westlands",
    price: "KSh 120,000/mo",
  },
  {
    title: "Gardenview Apartment",
    img: "/homes/4.jpg",
    location: "Runda",
    price: "KSh 95,000/mo",
  },
  {
    title: "Elegant Studio",
    img: "/homes/5.jpg",
    location: "Kilimani",
    price: "KSh 75,000/mo",
  },
  {
    title: "Luxury Beachfront House",
    img: "/homes/6.jpg",
    location: "Malindi",
    price: "KSh 500,000/mo",
  },
];

export default function ListingsPage() {
  return (
    <section className="min-h-screen py-24 px-6 bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Explore Available Listings
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Find your next home from our latest rental listings across Kenya.
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all"
            >
              <Image
                src={listing.img}
                alt={listing.title}
                width={600}
                height={300}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold">{listing.title}</h2>
                <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <MapPin className="w-4 h-4" />
                  {listing.location}
                </p>
                <p className="mt-2 text-indigo-600 dark:text-indigo-400 font-medium">
                  {listing.price}
                </p>
                <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
