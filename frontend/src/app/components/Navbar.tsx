"use client";

import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <div className="bg-black w-6 h-6 rounded-full grid place-content-center text-white">
            +
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-black">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/discover">Discover</Link>
          </li>
          <li>
            <Link href="/listings">Listings</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/support">Support</Link>
          </li>
          <li>
            <Link href="/search">
              <Search className="w-5 h-5" />
            </Link>
          </li>
          <li>
            <Link href="/signin">
              <button className="bg-black text-white px-4 py-1.5 rounded-full">
                Sign In
              </button>
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-2">
          <Link href="/">Home</Link>
          <Link href="/discover">Discover</Link>
          <Link href="/listings">Listings</Link>
          <Link href="/about">About</Link>
          <Link href="/support">Support</Link>
          <Link href="/signin">
            <button className="mt-2 bg-black text-white px-4 py-1.5 rounded-full">
              Sign In
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
