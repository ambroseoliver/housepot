"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Users2,
  Timer,
  Award,
  MessageCircleHeart,
} from "lucide-react"; // Added more icons

const reasons = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: "Verified Listings & Security",
    desc: "Every home is personally vetted and verified by our team, ensuring authenticity and peace of mind. Your safety is our priority.",
    iconBgClass: "bg-indigo-600",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-white" />,
    title: "Professional Media Showcase",
    desc: "We provide high-quality photos and immersive video tours for every listing, helping you visualize your future home with stunning clarity.",
    iconBgClass: "bg-blue-600",
  },
  {
    icon: <MessageCircleHeart className="w-8 h-8 text-white" />, // Changed from Users2 for a more empathetic feel
    title: "Dedicated Human Support",
    desc: "Our friendly experts are available 24/7 to guide you through every step of your home-finding journey. No bots, just real help.",
    iconBgClass: "bg-purple-600",
  },
  {
    icon: <Timer className="w-8 h-8 text-white" />,
    title: "Lightning-Fast Process",
    desc: "From discovery to move-in, our streamlined platform helps you secure your dream home swiftly, often within 72 hours.",
    iconBgClass: "bg-cyan-600",
  },
  {
    icon: <Award className="w-8 h-8 text-white" />, // New reason
    title: "Transparent & Fair Deals",
    desc: "We ensure full transparency in all transactions, with no hidden fees and fair pricing, building trust in every deal.",
    iconBgClass: "bg-red-600",
  },
  {
    icon: <Users2 className="w-8 h-8 text-white" />, // New reason, reusing Users2 for community
    title: "Community & Local Insights",
    desc: "Gain access to valuable local insights and community information, helping you choose not just a house, but a perfect neighborhood.",
    iconBgClass: "bg-green-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Background elements for futuristic feel, similar to other sections */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-500 opacity-5 rounded-full mix-blend-multiply filter blur-3xl animate-blob -z-0"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-indigo-500 opacity-5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 -z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 block">
            Your Trusted Partner
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            Why Choose Housepot?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover what makes us the preferred and most reliable platform for
            finding your next home in Kenya.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group flex flex-col items-center text-center border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 ${reason.iconBgClass}`}
              >
                {reason.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
