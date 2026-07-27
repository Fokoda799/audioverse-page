"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const faqItems = [
  "q1",
  "q2",
  "q3",
  "q4",
  "q5",
  "q6",
];

function FAQItem({ questionKey, answerKey, index }: { questionKey: string; answerKey: string; index: number }) {
  const t = useTranslations("faq");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-light-border dark:border-dark-border last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 sm:py-5 md:py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base md:text-lg font-medium text-light-text dark:text-dark-text pr-4 group-hover:text-primary transition-colors">
          {t(questionKey)}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-light-secondary dark:text-dark-secondary" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 sm:pb-5 md:pb-6 text-sm sm:text-base text-light-secondary dark:text-dark-secondary leading-relaxed pr-8">
              {t(answerKey)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const t = useTranslations("faq");

  return (
    <section id="faq" className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-3 sm:mb-4">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto px-2">
            {t("subtitle")}
          </p>
        </SectionReveal>

        <SectionReveal>
          <div className="bg-light-surface dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border p-4 sm:p-6 md:p-8 shadow-sm">
            {faqItems.map((key, index) => (
              <FAQItem
                key={key}
                questionKey={key}
                answerKey={key.replace("q", "a")}
                index={index}
              />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
