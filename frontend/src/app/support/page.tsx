import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CircleHelp, Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with your Housepot home search or ask about listing a property.",
};

const email = "ishivaoliver@gmail.com";

export default function SupportPage() {
  return (
    <div className="bg-[#f8f8f5] pb-20 pt-32 dark:bg-[#111a15] sm:pt-36">
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
              We’re here to help
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-[#202a24] dark:text-white sm:text-6xl">
              What can we help you with?
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#66736b] dark:text-[#aab5ad]">
              Whether you’re looking for a rental or want to list a property,
              reach out and tell us what you need.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <SupportCard
              icon={<Mail size={21} />}
              title="Email our team"
              description="Send us your question and we’ll get back to you."
              href={`mailto:${email}`}
              linkLabel="Send an email"
            />
            <SupportCard
              icon={<MessageCircle size={21} />}
              title="Property owners"
              description="Ask us about listing your home with Housepot."
              href={`mailto:${email}?subject=Property%20listing%20enquiry`}
              linkLabel="Ask about listing"
            />
            <SupportCard
              icon={<CircleHelp size={21} />}
              title="Common questions"
              description="Find quick answers about searching and renting."
              href="/#faqs"
              linkLabel="Browse FAQs"
            />
          </div>

          <div className="mt-12 flex flex-col gap-5 rounded-2xl bg-[#eaf1e9] p-7 dark:bg-[#1c2b21] sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <h2 className="text-xl font-semibold text-[#202a24] dark:text-white">
                Ready to find your next place?
              </h2>
              <p className="mt-2 text-sm text-[#66736b] dark:text-[#aab5ad]">
                Browse rental homes and start with the neighbourhood you love.
              </p>
            </div>
            <Link
              href="/listings"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#285c45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4635] dark:bg-[#9ac5a5] dark:text-[#17231b]"
            >
              Explore homes <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SupportCard({
  icon,
  title,
  description,
  href,
  linkLabel,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <article className="rounded-2xl border border-[#e4e9e4] bg-white p-7 dark:border-[#2b3a30] dark:bg-[#18231c]">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf4ed] text-[#285c45] dark:bg-[#26382b] dark:text-[#b6d8bd]">
        {icon}
      </span>
      <h2 className="mt-6 text-lg font-semibold text-[#202a24] dark:text-white">
        {title}
      </h2>
      <p className="mt-2 min-h-12 text-sm leading-6 text-[#66736b] dark:text-[#aab5ad]">
        {description}
      </p>
      <a
        href={href}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#285c45] hover:underline dark:text-[#b6d8bd]"
      >
        {linkLabel} <ArrowUpRight size={15} />
      </a>
    </article>
  );
}
