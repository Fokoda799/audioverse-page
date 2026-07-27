"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, Headphones, Sparkles } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const steps = [
  { key: "step1", icon: Search, color: "from-primary to-primary-light" },
  { key: "step2", icon: Headphones, color: "from-accent to-emerald-400" },
  { key: "step3", icon: Sparkles, color: "from-amber-400 to-orange-400" },
];

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section id="how-it-works" className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-3 sm:mb-4">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto px-2">
            {t("subtitle")}
          </p>
        </SectionReveal>

        <div className="relative">
          {/* Connection line - hidden on mobile */}
          <div className="hidden lg:block absolute top-[80px] left-[20%] right-[20%] h-0.5">
            <div className="h-full bg-gradient-to-r from-primary/30 via-accent/30 to-amber-400/30 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-primary to-accent rounded-full"
              animate={{ x: ["0%", "200%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {steps.map((step, index) => (
              <SectionReveal key={step.key} delay={index * 0.2}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative text-center"
                >
                  {/* Step number */}
                  <div className="relative inline-flex mb-5 sm:mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-primary/20`}
                    >
                      <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </motion.div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-light-surface dark:bg-dark-surface border-2 border-light-border dark:border-dark-border flex items-center justify-center text-sm font-bold text-light-secondary dark:text-dark-secondary">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-light-text dark:text-dark-text mb-2 sm:mb-3">
                    {t(step.key)}
                  </h3>
                  <p className="text-sm sm:text-base text-light-secondary dark:text-dark-secondary leading-relaxed max-w-sm mx-auto px-4 sm:px-0">
                    {t(`${step.key}Desc`)}
                  </p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
