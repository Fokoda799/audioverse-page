"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Download, ChevronDown, BookOpen, Music, Headphones } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("hero");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isRTL = locale === "ar";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[15%] left-[5%] w-14 h-14 sm:w-20 sm:h-20 text-primary/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <BookOpen className="w-full h-full" />
        </motion.div>
        <motion.div
          className="absolute top-[20%] right-[8%] w-12 h-12 sm:w-16 sm:h-16 text-accent/20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -15, 15, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Music className="w-full h-full" />
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] left-[10%] w-16 h-16 sm:w-24 sm:h-24 text-primary/15"
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Headphones className="w-full h-full" />
        </motion.div>

        {/* Sound wave lines - hidden on small phones */}
        <svg
          className="hidden sm:block absolute bottom-[10%] right-[5%] w-24 h-24 sm:w-32 sm:h-32 text-primary/10"
          viewBox="0 0 100 100"
        >
          {[...Array(5)].map((_, i) => (
            <motion.line
              key={i}
              x1={20 + i * 15}
              y1={50}
              x2={20 + i * 15}
              y2={50}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                y2: [50, 20 + ((i + 1) * 12), 50],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-accent/10 dark:bg-accent/20 text-accent text-xs sm:text-sm font-medium border border-accent/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              {t("notice")}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-light-text dark:text-dark-text leading-tight tracking-tight mb-4 sm:mb-6"
          >
            {t("headline")
              .split("\n")
              .map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="gradient-text">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="#download"
              className="group relative inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl bg-primary text-white font-semibold text-base sm:text-lg shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto justify-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <Download className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{t("ctaDownload")}</span>
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-2xl border-2 border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-semibold text-base sm:text-lg hover:bg-light-border/50 dark:hover:bg-dark-border/50 transition-all duration-300 w-full sm:w-auto"
            >
              {t("ctaLearnMore")}
            </a>
          </motion.div>

          {/* Phone mockup - scaled down on mobile */}
          <motion.div
            variants={itemVariants}
            className="mt-10 sm:mt-16 relative"
          >
            <div className="relative mx-auto w-[220px] sm:w-[260px] md:w-[300px]" dir="ltr">
              {/* Phone frame */}
              <div className="relative bg-dark-surface rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 shadow-2xl shadow-black/30 border border-dark-border/50">
                <div className="bg-dark-bg rounded-[1.7rem] sm:rounded-[2rem] overflow-hidden aspect-[9/19]">
                  {/* Screen content */}
                  <div className="p-3 sm:p-4 h-full flex flex-col">
                    {/* Status bar */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] sm:text-[10px] text-dark-secondary">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-dark-border" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-dark-border" />
                      </div>
                    </div>
                    {/* App header */}
                    <div className="flex items-center gap-2 mb-3">
                        <Image
                          src="/images/logo.png"
                          alt="AudioVerse Logo"
                          width={25}
                          height={25}
                        />
                      <span className="text-xs sm:text-sm font-semibold text-dark-text">AudioVerse</span>
                    </div>
                    {/* Search */}
                    <div className="bg-dark-surface rounded-xl px-3 py-2 mb-3">
                      <span className="text-[10px] sm:text-xs text-dark-secondary">Search contents...</span>
                    </div>
                    {/* Categories */}
                    <div className="flex gap-1.5 sm:gap-2 mb-3 overflow-hidden">
                      {["Novel", "Story", "Motivation"].map((cat) => (
                        <span
                          key={cat}
                          className="px-2.5 sm:px-3 py-1 rounded-full bg-primary/20 text-primary text-[9px] sm:text-[10px] font-medium whitespace-nowrap"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    {/* Book cards */}
                    <div className="space-y-2 sm:space-y-3 flex-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex gap-2 sm:gap-3 bg-dark-surface rounded-xl p-2"
                        >
                          <div className="w-8 h-11 sm:w-10 sm:h-14 rounded-lg bg-primary/30 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="h-2 sm:h-2.5 bg-dark-border rounded w-3/4 mb-1 sm:mb-1.5" />
                            <div className="h-1.5 sm:h-2 bg-dark-border/50 rounded w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Player bar */}
                    <div className="mt-auto bg-primary/20 rounded-xl p-2 sm:p-3">
                      <div className="h-0.5 sm:h-1 bg-primary/30 rounded-full mb-1.5 sm:mb-2">
                        <div className="h-full w-1/3 bg-primary rounded-full" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/30" />
                        <div className="flex gap-1.5 sm:gap-2">
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary/30" />
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary" />
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary/30" />
                        </div>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/30" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements around phone */}
              <motion.div
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center"
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Music className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </motion.div>
              <motion.div
                className="absolute -bottom-1 -left-4 sm:-bottom-2 sm:-left-6 w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 sm:mt-12"
          >
            <motion.a
              href="#features"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex flex-col items-center gap-2 text-light-secondary dark:text-dark-secondary hover:text-primary transition-colors"
            >
              <span className="text-xs font-medium">{isRTL ? "اسحب للأسفل" : "Scroll to explore"}</span>
              <ChevronDown className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
