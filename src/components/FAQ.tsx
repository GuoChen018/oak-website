"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ReactNode } from "react";

interface FAQItem {
  question: string;
  answer: ReactNode;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Can I try Oak for free?",
    answer: <>Yes! You can download Oak and try it out for 72 hours. After that you would need to <a href="https://buy.polar.sh/polar_cl_RPTLq5WQIhGjV8cIa2JqdD0PuiYdYeLcA5K0n0MIYJr" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400 underline-offset-2">purchase a license</a> to continue using.</>,
  },
  {
    question: "Do I have to pay for updates?",
    answer: "No. Oak is a one-time $4.99 purchase with all future updates included.",
  },
  {
    question: "How many devices per license?",
    answer: "You can use your license on up to 3 devices. You can also deactivate a specific device at any time through settings.",
  },
  {
    question: "May I request a refund?",
    answer: "Yes. You can request a refund within 14 days of your original purchase. No reason required.",
  },
  {
    question: "Will Oak improve?",
    answer: "Yes! I have lots of ideas on how to improve Oak, and I can't wait to build them out.",
  },
  {
    question: "Can I hide the animal & timer?",
    answer: "Yes. You can hide both or either in Settings.",
  },
  {
    question: "How can I give feedback or report a bug?",
    answer: <>You can share any feedback or bug via <a href="https://tally.so/r/eqRqBl" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400 underline-offset-2">this form</a>.</>,
  },
  {
    question: "Does Oak collect any data?",
    answer: "Task text stays on your device only. We use anonymous analytics to track usage metrics (like sessions started) to improve the app — no personal data is collected.",
  },
  {
    question: "Where do you find the music?",
    answer: "I manually curated them from Epidemic Sounds.",
  },
  {
    question: "What Macs are supported?",
    answer: "Oak requires macOS 12.0 or later. It works best on MacBooks with a notch, but also works beautifully on external displays.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
        FAQ
      </h2>
      <div className="flex flex-col gap-2">
        {FAQ_ITEMS.map((item, index) => (
          <FAQAccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </section>
  );
}

interface FAQAccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQAccordionItem({ item, isOpen, onToggle }: FAQAccordionItemProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
      >
        <span className="text-lg font-medium text-gray-900">{item.question}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-gray-500 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-4">
              <p className="text-base text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
