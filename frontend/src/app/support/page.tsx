"use client";

import { Mail, Phone, MessageCircle, HelpCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <section className="min-h-screen py-24 px-6 bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold">Need Help?</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
            Our support team is here for you. Reach out anytime.
          </p>
        </div>

        {/* Support Options */}
        <div className="grid gap-8 md:grid-cols-2 mb-20">
          <SupportCard
            icon={<HelpCircle className="w-6 h-6 text-indigo-600" />}
            title="Browse FAQs"
            description="Find answers to the most common questions from users and landlords."
          />
          <SupportCard
            icon={<MessageCircle className="w-6 h-6 text-green-600" />}
            title="Live Chat"
            description="Talk with our support team directly for quick help during business hours."
          />
          <SupportCard
            icon={<Mail className="w-6 h-6 text-blue-600" />}
            title="Email Us"
            description="Send us an email and we’ll get back to you within 24 hours."
          />
          <SupportCard
            icon={<Phone className="w-6 h-6 text-red-500" />}
            title="Call Us"
            description="+254 712 345 678 — Mon–Fri: 9AM–5PM EAT"
          />
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-sm font-medium transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Reusable support card
function SupportCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}
