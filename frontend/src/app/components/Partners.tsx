"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "Nation Media", logo: "/partners/nation.png" },
  { name: "K24", logo: "/partners/k24.png" },
  { name: "Citizen TV", logo: "/partners/citizen.png" },
  { name: "Business Daily", logo: "/partners/bd.png" },
];

export default function Partners() {
  return (
    <section className="bg-white py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <p className="text-gray-500 uppercase tracking-widest text-sm mb-4">
          As Seen On
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              className="grayscale hover:grayscale-0 transition duration-300"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
