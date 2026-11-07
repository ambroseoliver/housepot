"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Discover", href: "/discover" },
  { label: "Homes", href: "/listings" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/90 text-[#202a24] shadow-sm shadow-black/[0.03] backdrop-blur-xl dark:border-white/10 dark:bg-[#111a15]/90 dark:text-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label="Housepot home">
          <Image
            src="/logo/Company Logo.jpg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl object-cover"
            priority
          />
          <span className="text-xl font-bold tracking-tight">housepot</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-[#285c45] dark:hover:text-[#b6d8bd] ${
                  active
                    ? "text-[#285c45] dark:text-[#b6d8bd]"
                    : "text-[#66736b] dark:text-gray-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
          <Link
            href="/account"
            className="text-sm font-semibold text-[#285c45] transition-colors hover:text-[#1d4635] dark:text-[#b6d8bd] dark:hover:text-white"
          >
            Sign in / Sign up
          </Link>
          <Link
            href="/listings"
            className="rounded-full bg-[#285c45] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d4635] dark:bg-[#9ac5a5] dark:text-[#17231b] dark:hover:bg-[#b6d8bd]"
          >
            Find a home
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="rounded-xl p-2 text-[#202a24] hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
          >
            {isOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#e4e9e4] bg-white px-5 py-4 dark:border-[#2b3a30] dark:bg-[#18231c] md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-medium text-[#354239] hover:bg-[#f3f6f2] dark:text-gray-100 dark:hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/account"
              className="rounded-lg px-3 py-3 text-sm font-semibold text-[#285c45] hover:bg-[#f3f6f2] dark:text-[#b6d8bd] dark:hover:bg-white/5"
            >
              Sign in / Sign up
            </Link>
            <Link
              href="/listings"
              className="mt-2 rounded-full bg-[#285c45] px-5 py-3 text-center text-sm font-semibold text-white dark:bg-[#9ac5a5] dark:text-[#17231b]"
            >
              Find a home
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
