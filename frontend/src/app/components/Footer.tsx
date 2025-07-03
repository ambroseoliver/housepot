import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"; // Added LinkedIn, Phone, and MapPin icons
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-16 px-6 relative overflow-hidden">
      {/* Subtle Background Elements for depth/futuristic feel */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-indigo-500 opacity-5 rounded-full mix-blend-multiply filter blur-3xl animate-blob -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500 opacity-5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
        {/* Company Info / Brand */}
        <div className="lg:col-span-2 flex flex-col items-start">
          <Link href="/" className="flex items-center mb-4 group">
            {/* Optional: Add your logo here */}
            {/* <Image src="/logo.svg" alt="Housepot Logo" width={40} height={40} className="mr-3" /> */}
            <h3 className="text-3xl font-extrabold text-white transition-colors duration-300 group-hover:text-indigo-400">
              Housepot
            </h3>
          </Link>
          <p className="text-base text-gray-400 leading-relaxed mb-6 max-w-sm">
            Your trusted partner in finding the perfect home, making house
            hunting simple, beautiful, and stress-free across Kenya.
          </p>
          <div className="flex space-x-5">
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/company/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-3 text-base">
            <li>
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/listings"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Listings
              </Link>
            </li>
            <li>
              <Link
                href="/how-it-works"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Resources</h4>
          <ul className="space-y-3 text-base">
            <li>
              <Link
                href="/faq"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-of-service"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/support"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info / Newsletter */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">
            Get In Touch
          </h4>
          <address className="not-italic text-base text-gray-400 space-y-3">
            <p className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0" />
              123 Main Street, <br /> Nairobi, Kenya
            </p>
            <p className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0" />
              <a
                href="tel:+254712345678"
                className="hover:text-white transition-colors duration-300"
              >
                +254 712 345 678
              </a>
            </p>
            <p className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-indigo-400 flex-shrink-0" />
              <a
                href="mailto:info@housepot.com"
                className="hover:text-white transition-colors duration-300"
              >
                info@housepot.com
              </a>
            </p>
          </address>
          {/* Optional: Newsletter Subscription */}
          {/*
          <h4 className="text-xl font-semibold text-white mt-8 mb-4">Stay Updated</h4>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow p-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-3 rounded-r-lg hover:bg-indigo-700 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
          */}
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-800 pt-8 mt-16 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Housepot. All rights reserved.</p>
        <p className="mt-1">Designed with passion in Kenya.</p>
      </div>
    </footer>
  );
}
