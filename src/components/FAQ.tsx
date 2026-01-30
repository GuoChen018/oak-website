"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How can I give feedback or report a bug?",
    answer: "You can share any feedback or bug via this form.",
  },
  {
    question: "Does this app collect any data?",
    answer: "Task text stays on your device only. We use anonymous analytics to track usage metrics (like sessions started) to improve the app — no personal data is collected.",
  },
  {
    question: "What Macs are supported?",
    answer: "Oak requires macOS 12.0 or later. It works best on MacBooks with a notch, but also works beautifully on external displays.",
  },
  {
    question: "Can I add my own music?",
    answer: "Not currently, but this is on our roadmap! For now, enjoy our curated Piano, LoFi, and Ambient tracks.",
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
        Common Questions
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
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
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
