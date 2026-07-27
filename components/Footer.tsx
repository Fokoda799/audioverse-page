"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Headphones, Mail, Linkedin, Github, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isRTL = locale === "ar";
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: "#features", label: t("quickLinks") === "Quick Links" ? "Features" : "المميزات" },
    { href: "#how-it-works", label: t("quickLinks") === "Quick Links" ? "How It Works" : "كيف يعمل" },
    { href: "#screenshots", label: t("quickLinks") === "Quick Links" ? "Screenshots" : "لقطات الشاشة" },
    { href: "#faq", label: t("quickLinks") === "Quick Links" ? "FAQ" : "الأسئلة الشائعة" },
    { href: "#download", label: t("quickLinks") === "Quick Links" ? "Download" : "تحميل" },
  ];

  const legalLinks = [
    { href: `/${locale}/privacy`, label: t("privacy") },
    { href: `/${locale}/terms`, label: t("terms") },
    { href: `/${locale}/delete-account`, label: t("deleteAccount") },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://www.facebook.com/profile.php?id=61586348030094", label: "Facebook" },
    { icon: Github, href: "https://github.com/Fokoda799", label: "GitHub" },
    { icon: Facebook, href: "https://www.linkedin.com/in/abdellah-developer/", label: "Linkedin" },
  ];

  return (
    <footer className="relative border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2.5 mb-4"
            >
              <Image
                src="/images/logo.png"
                alt="AudioVerse Logo"
                width={36}
                height={36}
              />
              <span className="text-xl font-bold text-light-text dark:text-dark-text">
                AudioVerse
              </span>
            </Link>
            <p className="text-light-secondary dark:text-dark-secondary mb-4 text-sm sm:text-base">
              {t("tagline")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-light-border dark:bg-dark-border flex items-center justify-center text-light-secondary dark:text-dark-secondary hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-light-text dark:text-dark-text mb-4 text-sm sm:text-base">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-light-secondary dark:text-dark-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-light-text dark:text-dark-text mb-4 text-sm sm:text-base">
              {t("legal")}
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm sm:text-base text-light-secondary dark:text-dark-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-light-text dark:text-dark-text mb-4 text-sm sm:text-base">
              {t("contact")}
            </h3>
            <a
              href="mailto:audioverse@abdellahnaithadid.dev"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-light-secondary dark:text-dark-secondary hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              audioverse@abdellahnaithadid.dev
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-light-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-light-secondary dark:text-dark-secondary text-center sm:text-left">
            {t("copyright", { year })}
          </p>
          <p className="text-xs sm:text-sm text-light-secondary dark:text-dark-secondary text-center sm:text-right">
            Made with care for audiobook lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
