"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import Image from "next/image";

export function Screenshots() {
  const t = useTranslations("screenshots");
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 640);
    checkWidth(); // set initial value on mount
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const screenshotsData = [
    {
      title: t("homeTitle"),
      desc: t("homeDesc"),
      image: "/images/screen_1.png",
    },
    {
      title: t("playerTitle"),
      desc: t("playerDesc"),
      image: "/images/screen_2.png",
    },
    {
      title: t("libraryTitle"),
      desc: t("libraryDesc"),
      image: "/images/screen_3.png",
    },
    {
      title: t("searchTitle"),
      desc: t("searchDesc"),
      image: "/images/screen_4.jpg",
    },
    {
      title: t("detailsTitle"),
      desc: t("detailsDesc"),
      image: "/images/screen_5.jpg",
    },
  ];

  const colors = [
    "#60A5FA",
  "#34D399",
  "#A78BFA",
  "#F472B6",
  "#FBBF24",
  ];

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % screenshotsData.length);
  }, [screenshotsData.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + screenshotsData.length) % screenshotsData.length);
  }, [screenshotsData.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  return (
    <section id="screenshots" className="relative py-16 sm:py-16 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-28 sm:mb-16 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-3 sm:mb-4">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto px-2">
            {t("subtitle")}
          </p>
        </SectionReveal>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Desktop Side Arrows */}
          <button
            onClick={prev}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border items-center justify-center text-light-text dark:text-dark-text hover:bg-light-border dark:hover:bg-dark-border hover:scale-110 transition-all shadow-lg"
            aria-label={t("prev")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={next}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border items-center justify-center text-light-text dark:text-dark-text hover:bg-light-border dark:hover:bg-dark-border hover:scale-110 transition-all shadow-lg"
            aria-label={t("next")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* 3D Carousel */}
          <div className="relative mx-auto max-w-[300px] sm:max-w-none">
            <div className="relative h-[280px] sm:h-[440px] md:h-[520px] lg:h-[600px] flex items-center justify-center perspective-[1000px]">
              {screenshotsData.map((screenshot, index) => {
                const offset = index - current;
                const isActive = index === current;
                return (
                  <motion.div
                    key={index}
                    className="absolute w-[200px] sm:w-[240px] md:w-[280px] lg:w-[300px]"
                    animate={{
                      x: offset * (isMobile ? 140 : 220),
                      scale: isActive ? 1 : 0.85,
                      rotateY: offset * -15,
                      zIndex: isActive ? 10 : 5 - Math.abs(offset),
                      opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Phone frame with real screenshot */}
                    <div
                      className="relative rounded-[1.5rem] sm:rounded-[2rem] p-1.5 sm:p-2 shadow-2xl shadow-black/40 border border-dark-border/50"
                      style={{
                        backgroundColor: colors[index],
                      }}
                    >
                      <div className="rounded-[1.2rem] sm:rounded-[1.7rem] overflow-hidden aspect-[9/19] bg-dark-bg relative">
                        <Image
                          src={screenshot.image}
                          alt={screenshot.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1024px) 280px, 300px"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                    {/* Label */}
                    <motion.div
                      className="text-center mt-3 sm:mt-4"
                      animate={{ opacity: isActive ? 1 : 0.5 }}
                    >
                      <p className="text-sm sm:text-base font-medium text-light-text dark:text-dark-text">
                        {screenshot.title}
                      </p>
                      <p className="text-xs sm:text-sm text-light-secondary dark:text-dark-secondary">
                        {screenshot.desc}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile Bottom Navigation (arrows + dots) */}
          <div className="flex lg:hidden items-center justify-center gap-3 sm:gap-4 mt-24" dir="ltr">
            <button
              onClick={prev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border flex items-center justify-center text-light-text dark:text-dark-text hover:bg-light-border dark:hover:bg-dark-border transition-colors"
              aria-label={t("prev")}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="flex gap-2">
              {screenshotsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? "w-6 sm:w-8 bg-primary"
                      : "w-2 bg-light-border dark:bg-dark-border hover:bg-light-secondary dark:hover:bg-dark-secondary"
                  }`}
                  aria-label={`${t("goTo")} ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border flex items-center justify-center text-light-text dark:text-dark-text hover:bg-light-border dark:hover:bg-dark-border transition-colors"
              aria-label={t("next")}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Desktop Bottom Dots only (no arrows — arrows are on sides) */}
          <div className="hidden lg:flex items-center justify-center gap-2 mt-14">
            {screenshotsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-8 bg-primary"
                    : "w-2 bg-light-border dark:bg-dark-border hover:bg-light-secondary dark:hover:bg-dark-secondary"
                }`}
                aria-label={`${t("goTo")} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
