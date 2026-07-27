"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Download, QrCode, Smartphone } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

export function DownloadCTA() {
  const t = useTranslations("download");

  return (
    <section
      id="download"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 dark:via-primary/10 dark:to-primary/20" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center">
          <motion.div
            className="bg-light-surface dark:bg-dark-surface rounded-2xl sm:rounded-3xl border border-light-border dark:border-dark-border p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-4 sm:mb-6"
              >
                <Download className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-3 sm:mb-4">
                {t("title")}
              </h2>
              <p className="text-base sm:text-lg text-light-secondary dark:text-dark-secondary max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
                {t("subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                {/* Google Play */}
                <motion.a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-4 rounded-2xl bg-light-text dark:bg-dark-text text-light-bg dark:text-dark-bg hover:opacity-90 transition-opacity shadow-lg w-full sm:w-auto justify-center"
                >
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider opacity-70">
                      GET IT ON
                    </div>
                    <div className="text-base sm:text-lg font-semibold leading-tight">
                      Google Play
                    </div>
                  </div>
                </motion.a>

                {/* App Store */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-4 rounded-2xl border-2 border-light-border dark:border-dark-border text-light-secondary dark:text-dark-secondary cursor-not-allowed opacity-60 w-full sm:w-auto justify-center"
                >
                  <Smartphone className="w-7 h-7 sm:w-8 sm:h-8" />
                  <div className="text-left">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider opacity-70">
                      Coming Soon
                    </div>
                    <div className="text-base sm:text-lg font-semibold leading-tight">
                      App Store
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* QR Code placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8 sm:mt-10 inline-flex flex-col items-center gap-2 sm:gap-3"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-light-border dark:bg-dark-border flex items-center justify-center">
                  <QrCode className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-light-secondary dark:text-dark-secondary" />
                </div>
                <span className="text-xs sm:text-sm text-light-secondary dark:text-dark-secondary">
                  {t("qrCode")}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}
