"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const testimonialData = [
  {
    name: "Sarah Mitchell",
    role: "Book Lover",
    avatar: "SM",
    content:
      "AudioVerse completely transformed my commute. I used to dread traffic, but now I look forward to it because I can dive into a new story every day. The offline feature is a game-changer for flights!",
    rating: 5,
  },
  {
    name: "Ahmed Hassan",
    role: "Student",
    avatar: "AH",
    content:
      "As a student, I don't have much time to sit down and read. AudioVerse lets me consume books while walking to class, working out, or doing chores. The speed control is perfect for getting through dense material.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Software Engineer",
    avatar: "EC",
    content:
      "The cross-device sync is flawless. I start listening on my phone during my morning run and seamlessly continue on my tablet at home. The interface is beautiful and intuitive. Highly recommended!",
    rating: 5,
  },
  {
    name: "Omar Khalid",
    role: "Business Owner",
    avatar: "OK",
    content:
      "I've tried many audiobook apps, but AudioVerse stands out with its clean design and smooth performance. The bookmark feature helps me save key insights from business books. Absolutely love it.",
    rating: 5,
  },
];

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonialData.length);
  }, []);

  const prev = () => {
    setCurrent(
      (prev) =>
        (prev - 1 + testimonialData.length) % testimonialData.length
    );
  };

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
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
          <div className="relative">
            {/* Quote icon */}
            <div className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center z-10">
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>

            {/* Testimonial card */}
            <div className="bg-light-surface dark:bg-dark-surface rounded-2xl sm:rounded-3xl border border-light-border dark:border-dark-border p-6 sm:p-8 md:p-12 shadow-xl">
              <div className="relative overflow-hidden min-h-[280px] sm:min-h-[220px] md:min-h-[200px]">
                {testimonialData.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      opacity: index === current ? 1 : 0,
                      x:
                        index === current
                          ? 0
                          : index < current
                          ? -50
                          : 50,
                      position: index === current ? "relative" : "absolute",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="inset-0"
                  >
                    <div className="text-center">
                      {/* Stars */}
                      <div className="flex items-center justify-center gap-1 mb-4 sm:mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: index === current ? 1 : 0,
                              scale: index === current ? 1 : 0,
                            }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                          </motion.div>
                        ))}
                      </div>

                      <p className="text-base sm:text-lg md:text-xl text-light-text dark:text-dark-text leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>

                      <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm sm:text-base">
                          {testimonial.avatar}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-light-text dark:text-dark-text text-sm sm:text-base">
                            {testimonial.name}
                          </p>
                          <p className="text-xs sm:text-sm text-light-secondary dark:text-dark-secondary">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                <button
                  onClick={prev}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-light-border dark:border-dark-border flex items-center justify-center text-light-text dark:text-dark-text hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="flex gap-2">
                  {testimonialData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === current
                          ? "w-6 sm:w-8 bg-primary"
                          : "w-2 bg-light-border dark:bg-dark-border"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-light-border dark:border-dark-border flex items-center justify-center text-light-text dark:text-dark-text hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
