"use client";

import { motion } from "framer-motion";
import { Search, Home } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-indigo-50 to-slate-100 py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">
          What brings you to Housepot?
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Choose your path and get started in seconds.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-8 max-w-5xl mx-auto">
        {/* Tenant Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-md p-8 flex-1 text-center"
        >
          <div className="flex justify-center mb-4">
            <Search className="w-10 h-10 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-gray-900">I&#39;m Looking for a Home</h3>
          <p className="text-gray-600 mb-4 text-sm">
            Find and explore top listings tailored to your lifestyle and budget.
          </p>
          <Link href="/explore">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition">
              Start Exploring
            </button>
          </Link>
        </motion.div>

        {/* Landlord Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-md p-8 flex-1 text-center"
        >
          <div className="flex justify-center mb-4">
            <Home className="w-10 h-10 text-indigo-600" />
          </div>
          <h3
            className="text-2xl font-semibold mb-2 text-gray-900">I&#39;m a Landlord</h3>
          <p className="text-gray-600 mb-4 text-sm">
            List your property and connect with quality tenants in no time. 
          </p>
          <Link href="/landlord">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"> 
              List My Property
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
