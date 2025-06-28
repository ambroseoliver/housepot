"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 shadow-md backdrop-blur-md dark:bg-black/80"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
        >
          <div className="bg-black w-7 h-7 rounded-full grid place-content-center text-white text-sm">
            H
          </div>
          HousesSpot
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-gray-800 dark:text-gray-100">
          {["Home", "Discover", "Listings", "About", "Support"].map((item) => (
            <li key={item}>
              <Link
                href={`/${
                  item.toLowerCase() === "home" ? "" : item.toLowerCase()
                }`}
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/search">
              <Search className="w-5 h-5" />
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <Link href="/signin">
              <button className="bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-900 transition">
                Sign In
              </button>
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-black px-6 pb-6 pt-2 space-y-4"
          >
            {["Home", "Discover", "Listings", "About", "Support"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${
                    item.toLowerCase() === "home" ? "" : item.toLowerCase()
                  }`}
                  className="block text-gray-800 dark:text-white hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              )
            )}
            <Link href="/signin">
              <button className="w-full bg-black text-white px-4 py-2 mt-2 rounded-full hover:bg-gray-900 transition">
                Sign In
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
