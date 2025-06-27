import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Housepot</h3>
          <p className="text-sm text-gray-400">
            Making house hunting simple, beautiful, and stress-free across
            Kenya.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/listings">Listings</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Resources</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="#">FAQs</Link>
            </li>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Terms of Service</Link>
            </li>
            <li>
              <Link href="#">Support</Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Connect with Us</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="hover:text-white" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="hover:text-white" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="hover:text-white" />
            </a>
            <a href="#" aria-label="Email">
              <Mail className="hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Housepot. All rights reserved.
      </div>
    </footer>
  );
}
