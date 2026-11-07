import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

const links = [
  { label: "Discover", href: "/discover" },
  { label: "Rental homes", href: "/listings" },
  { label: "Sign in / Sign up", href: "/account" },
  { label: "About Housepot", href: "/about" },
  { label: "Support", href: "/support" },
];

export default function Footer() {
  return (
    <footer className="bg-[#14231a] px-5 pb-8 pt-14 text-white sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              housepot
            </Link>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Helping people across Kenya find a place that feels like home.
              A clearer, more considered way to search for your next rental.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Explore</h2>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold">Let’s talk</h2>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/65">
              <MapPin size={16} className="shrink-0 text-[#b6d8bd]" />
              Made for home seekers in Kenya
            </p>
            <a
              href="mailto:ishivaoliver@gmail.com"
              className="mt-3 inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
            >
              <Mail size={16} className="shrink-0 text-[#b6d8bd]" />
              Email Housepot
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Housepot. All rights reserved.</p>
          <p>Designed with care in Kenya.</p>
        </div>
      </div>
    </footer>
  );
}
