"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react"; // Added Mail, CheckCircle2, and ArrowRight icons for visual feedback

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);

    // TODO: Integrate with backend or 3rd party email service
    console.log("Subscribing email:", email); // Placeholder for actual submission logic

    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
      // Optionally, show a more persistent success message and clear it only after user action
    }, 4000); // Increased timeout for better visibility of success message
  };

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-indigo-700 to-purple-800 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Background blobs for consistent futuristic feel */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-400 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-blob -z-0"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-pink-400 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 -z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center relative z-10 p-8 rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 dark:bg-gray-800/20 dark:border-gray-700/50"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-sm font-semibold text-blue-200 dark:text-blue-400 uppercase tracking-wider mb-2 block">
            Stay Connected
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 drop-shadow-lg">
            Never Miss Your Dream Home!
          </h2>
          <p className="text-lg text-blue-100 dark:text-gray-300 max-w-2xl mx-auto">
            Get instant updates on new listings, exclusive offers, market
            insights, and more directly to your inbox.
          </p>
        </motion.div>

        {/* Form or Success Message */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <div className="relative w-full sm:w-auto flex-1">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={20}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="px-5 py-3 pl-12 rounded-full w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-transparent focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 transition-all duration-300 shadow-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl flex items-center gap-2 transform hover:scale-105"
            >
              Subscribe Now <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 mt-8 shadow-xl"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400 animate-bounce-in" />
            <h3 className="text-2xl font-bold">You&#39;re Subscribed!</h3>
            <p className="text-lg">
              Thanks for joining Housepot! Get ready for exclusive updates.
            </p>
          </motion.div>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-300 dark:text-red-400 mt-4 text-sm"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
