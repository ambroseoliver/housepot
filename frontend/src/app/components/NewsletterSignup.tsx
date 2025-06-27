"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);

    // TODO: Integrate with backend or 3rd party email service
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-20 px-6 bg-indigo-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Stay in the Loop
        </h2>
        <p className="text-gray-600 mb-8">
          Get notified when new listings go live, exclusive offers, and the
          latest updates from Housepot.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="px-5 py-3 rounded-lg w-full sm:w-auto flex-1 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
        ) : (
          <div className="text-green-600 text-lg font-semibold mt-4">
            ✅ You’ve been subscribed!
          </div>
        )}
      </motion.div>
    </section>
  );
}
