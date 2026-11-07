"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I find verified houses?",
    answer:
      "Every listing on Housepot is verified through in-person visits and professional media capture. Just use the search and filters to explore verified homes.",
  },
  {
    question: "Do I need to pay before viewing houses?",
    answer:
      "You can browse freely. To unlock contact details and premium listings, a one-time access fee applies, valid for 3 days.",
  },
  {
    question: "I'm a landlord. How do I list my house?",
    answer:
      "Sign up as a landlord and book a media session with our team. We handle the rest — from photos to listing management.",
  },
  {
    question: "Is there customer support available?",
    answer:
      "Yes! We offer 24/7 human support via WhatsApp, email, and live chat to guide you throughout your journey.",
  },
];

export default function FAQ() {
  return (
    <section id="faqs" className="bg-[#f8f8f5] px-5 py-20 dark:bg-[#111a15] sm:px-8 sm:py-24">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
          Need to know
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-3 text-[#66736b] dark:text-[#aab5ad]">
          Helpful answers for home seekers and property owners.
        </p>
      </div>

      <Accordion.Root type="multiple" className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="overflow-hidden rounded-xl border border-[#e4e9e4] bg-white dark:border-[#2b3a30] dark:bg-[#18231c]"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-[#202a24] transition hover:bg-[#f8faf7] dark:text-white dark:hover:bg-white/[0.03]">
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-[#52765b] transition-transform duration-200 data-[state=open]:rotate-180 dark:text-[#b6d8bd]" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-5 pb-5 text-sm leading-6 text-[#66736b] dark:text-[#aab5ad]">
              {faq.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
