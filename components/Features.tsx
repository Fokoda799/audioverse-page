"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  BookOpen,
  WifiOff,
  PlayCircle,
  Bookmark,
  Heart,
  History,
  LayoutGrid,
  AudioLines,
  LogIn,
  Search,
  Moon,
  RefreshCw,
} from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const featuresList = [
  { key: "unlimited", icon: BookOpen },
  { key: "offline", icon: WifiOff },
  { key: "continue", icon: PlayCircle },
  { key: "bookmarks", icon: Bookmark },
  { key: "favorites", icon: Heart },
  { key: "history", icon: History },
  { key: "categories", icon: LayoutGrid },
  { key: "player", icon: AudioLines },
  { key: "googleSignIn", icon: LogIn },
  { key: "search", icon: Search },
  { key: "darkMode", icon: Moon },
  { key: "sync", icon: RefreshCw },
];

export function Features() {
  const t = useTranslations("features");

  return (
    <section id="features" className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-3 sm:mb-4">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto px-2">
            {t("subtitle")}
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {featuresList.map((feature, index) => (
            <SectionReveal key={feature.key} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="group relative h-full"
              >
                <div className="relative h-full p-5 sm:p-6 lg:p-8 rounded-2xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border hover:border-primary/30 dark:hover:border-primary/30 transition-colors shadow-sm hover:shadow-xl hover:shadow-primary/5">
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg font-semibold text-light-text dark:text-dark-text mb-1.5 sm:mb-2">
                    {t(`${feature.key}`)}
                  </h3>
                  <p className="text-sm sm:text-base text-light-secondary dark:text-dark-secondary leading-relaxed">
                    {t(`${feature.key}Desc`)}
                  </p>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
