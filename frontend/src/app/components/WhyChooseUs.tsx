"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Users2, Timer } from "lucide-react";

const reasons = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
    title: "Verified Listings",
    desc: "Every home is personally vetted and verified by our team — no scams, just peace of mind.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
    title: "Professional Media",
    desc: "We send pros to capture each home. You see only high-quality photos and videos.",
  },
  {
    icon: <Users2 className="w-8 h-8 text-indigo-600" />,
    title: "Human Support",
    desc: "Talk to real people, 24/7. We’re here to guide you — not bots.",
  },
  {
    icon: <Timer className="w-8 h-8 text-indigo-600" />,
    title: "Lightning Fast",
    desc: "Find your home, schedule a visit, and move in — all within 72 hours.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">
          Why Choose Housepot?
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Discover what makes us the most trusted rental platform in Kenya.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {reasons.map((reason, idx) => (
          <motion.div
            key={idx}
            className="bg-slate-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-4">{reason.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {reason.title}
            </h3>
            <p className="text-gray-600 text-sm">{reason.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
