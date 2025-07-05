import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import your layout components
import { ThemeProvider } from "next-themes";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import ChatWidgetPlaceholder from "./components/ChatWidgetPlaceholder";

// Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Housepot – Your Future Home, Unlocked",
  description:
    "Discover and rent the perfect home with Housepot, a modern real estate platform for Kenya.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main>{children}</main>
          <BackToTop />
          <WhatsAppButton />
          <ChatWidgetPlaceholder />
        </ThemeProvider>
      </body>
    </html>
  );
}
export const dynamic = "force-dynamic"; // Ensure this layout is always fresh
export const revalidate = 0;
// This ensures the layout is always fresh and does not cache
// You can adjust this based on your caching strategy
// For example, if you want to cache for 60 seconds, use `revalidate = 60`

// Note: The `dynamic` and `revalidate` exports are specific to Next.js 13+ with the App Router.
// They control how often the layout is re-rendered and whether it should be cached.

// If you are using Next.js 12 or earlier, you can remove these exports.
// The layout will still work, but it won't have the dynamic re-rendering behavior.

// Ensure you have the necessary packages installed:
// npm install next-themes next@latest @next/font framer-motion lucide-react
// Adjust the package versions based on your Next.js version.

// This layout serves as the main structure for your application, providing a consistent header and theme management.
// You can add more components or sections as needed, such as footers or sidebars, to enhance the user experience.

// Remember to test the layout in both light and dark modes to ensure styles are applied correctly.
// You can also add more metadata or Open Graph tags for better SEO and social sharing capabilities.

// If you have any specific requirements or additional features you'd like to implement,
// feel free to ask for further assistance or examples.
// This layout is designed to be flexible and can be extended with more components as your application grows.

// This layout file is the entry point for your Next.js application, providing a consistent structure and styling.
// It includes global styles, Google Fonts, and a theme provider for dark mode support.
// The Navbar component is included to provide navigation across the site.
// You can add more components or sections as needed to enhance the user experience.

// Make sure to test the layout in both light and dark modes to ensure styles are applied correctly.
// You can also add more metadata or Open Graph tags for better SEO and social sharing capabilities.

// If you have any specific requirements or additional features you'd like to implement,
// feel free to ask for further assistance or examples.
// This layout is designed to be flexible and can be extended with more components as your application grows.
// This layout file is the entry point for your Next.js application, providing a consistent structure and styling.
// It includes global styles, Google Fonts, and a theme provider for dark mode support.
// The Navbar component is included to provide navigation across the site.
// You can add more components or sections as needed to enhance the user experience.

// Make sure to test the layout in both light and dark modes to ensure styles are applied correctly.
// You can also add more metadata or Open Graph tags for better SEO and social sharing capabilities.

// If you have any specific requirements or additional features you'd like to implement,
// feel free to ask for further assistance or examples.
// This layout is designed to be flexible and can be extended with more components as your application grows.

// This layout serves as the main structure for your application, providing a consistent header and theme management.
// You can add more components or sections as needed, such as footers or sidebars, to enhance the user experience.

// Remember to test the layout in both light and dark modes to ensure styles are applied correctly.
// You can also add more metadata or Open Graph tags for better SEO and social sharing capabilities.

// If you have any specific requirements or additional features you'd like to implement,
// feel free to ask for further assistance or examples.
// This layout is designed to be flexible and can be extended with more components as your application grows.

// This layout file is the entry point for your Next.js application, providing a consistent structure and styling.
// It includes global styles, Google Fonts, and a theme provider for dark mode support.
// The Navbar component is included to provide navigation across the site.
// You can add more components or sections as needed to enhance the user experience.
