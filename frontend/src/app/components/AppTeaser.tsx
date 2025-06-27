"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AppTeaser() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-slate-100 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Renting made easier — anywhere, anytime.
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Get the Housepot mobile app and explore verified listings, book
            viewings, and connect with landlords — all on the go.
          </p>
          <div className="flex gap-4">
            <a href="#">
              <Image
                src="/assets/google-play-badge.png"
                alt="Get it on Google Play"
                width={150}
                height={50}
              />
            </a>
            <a href="#">
              <Image
                src="/assets/app-store-badge.png"
                alt="Download on the App Store"
                width={140}
                height={50}
              />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Mock Phone Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <Image
            src="/assets/mock-app.png"
            alt="Mobile App Preview"
            width={400}
            height={800}
            className="rounded-xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
