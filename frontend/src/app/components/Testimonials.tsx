"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Grace M.",
    role: "Tenant - Nairobi",
    quote:
      "Housepot helped me find my dream apartment within 24 hours. I love how easy and stress-free the process was!",
    avatar: "/avatars/user1.jpg",
  },
  {
    name: "James K.",
    role: "Landlord - Westlands",
    quote:
      "The quality of listings and the media team blew me away. I had tenants calling me the same day my property went live!",
    avatar: "/avatars/user2.jpg",
  },
  {
    name: "Sharon O.",
    role: "Tenant - Mombasa",
    quote:
      "Finally a platform that understands what we need. The smart filters are life-saving!",
    avatar: "/avatars/user3.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-600 mb-12">Real stories from real clients.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl shadow-lg p-6 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">“{t.quote}”</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
