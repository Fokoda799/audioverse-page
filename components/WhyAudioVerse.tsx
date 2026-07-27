"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { useParams } from "next/navigation";

const comparisons = [
  { key: "handsFree" },
  { key: "anywhere" },
  { key: "speedControl" },
  { key: "offline" },
  { key: "sync" },
  { key: "bookmarks" },
  { key: "multitask" },
  { key: "eyeStrain" },
];

export function WhyAudioVerse() {
  const t = useTranslations("whyAudioVerse");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isRTL = locale === "ar";

  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-3 sm:mb-4">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto px-2">
            {t("subtitle")}
          </p>
        </SectionReveal>

        <SectionReveal>
          <div className="overflow-hidden rounded-2xl border border-light-border dark:border-dark-border shadow-lg" dir={isRTL ? 'ltr' : 'rtl'}>
            {/* Header */}
            <div className="grid grid-cols-3 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border">
              <div className="p-3 sm:p-4 md:p-6 font-semibold text-light-secondary dark:text-dark-secondary text-xs text-center sm:text-sm md:text-base">
                {t("traditional")}
              </div>
              <div className="p-3 sm:p-4 md:p-6 font-bold text-primary text-xs sm:text-sm md:text-base text-center bg-primary/5 dark:bg-primary/10">
                {t("audioVerse")}
              </div>
              <div className="p-3 sm:p-4 md:p-6 font-semibold text-light-secondary dark:text-dark-secondary text-xs sm:text-sm md:text-base text-center">
               {t("features")}
              </div>
            </div>

            {/* Rows */}
            {comparisons.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`grid grid-cols-3 border-b border-light-border dark:border-dark-border last:border-b-0 ${
                  index % 2 === 0
                    ? "bg-light-bg/50 dark:bg-dark-bg/50"
                    : "bg-light-surface dark:bg-dark-surface"
                }`}
              >
                <div className="p-3 sm:p-4 md:p-6 flex items-center justify-center">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-error" />
                </div>
                <div className="p-3 sm:p-4 md:p-6 flex items-center justify-center bg-primary/5 dark:bg-primary/10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + index * 0.05,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </motion.div>
                </div>
                <div className="p-3 sm:p-4 md:p-6 flex items-center justify-end text-xs sm:text-sm md:text-base font-medium text-light-text dark:text-dark-text">
                  {t(item.key)}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
