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
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 mt-2">
          Quick answers to the most common questions from tenants and landlords.
        </p>
      </div>

      <Accordion.Root type="multiple" className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="border border-slate-200 rounded-xl overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full justify-between items-center px-6 py-4 bg-white hover:bg-slate-100 text-left text-lg font-medium text-gray-800 transition">
                {faq.question}
                <ChevronDown className="h-5 w-5 text-indigo-600 transition-transform duration-200 AccordionChevron" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-6 pb-4 text-gray-600 text-sm bg-white">
              {faq.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
