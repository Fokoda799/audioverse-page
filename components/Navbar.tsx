"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Kept outside the component and locale-independent (unlike navLinks, whose
// labels change with translation) so it's a stable reference for the
// scroll-spy effect below.
const NAV_SECTION_IDS = [
  "features",
  "how-it-works",
  "screenshots",
  "faq",
  "download",
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Scroll-spy: tracks whichever section is currently in the "active band"
  // of the viewport (top 20% to top 30%, via the rootMargin below) and
  // updates the nav highlight accordingly. Runs once on mount — section
  // elements don't get added/removed at runtime, so no deps needed.
  useEffect(() => {
    const sections = NAV_SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Multiple sections can be "intersecting" at once near boundaries;
        // pick whichever has the most visible area in the active band.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      {
        // Shrinks the observed viewport to a horizontal band near the top,
        // so a section counts "active" once it reaches that band rather
        // than as soon as any sliver of it appears at the bottom.
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const navLinks = NAV_SECTION_IDS.map((id) => ({
    href: `#${id}`,
    label: t(
      id === "how-it-works"
        ? "howItWorks"
        : (id as "features" | "screenshots" | "faq" | "download")
    ),
  }));

  const handleLinkClick = (href: string | null) => {
    setIsMobileMenuOpen(false);
    // Set immediately for snappy feedback; the observer will confirm/hold
    // this value once the smooth scroll settles on the target section.
    setActiveSection(href);
  };

  return (
    // dir="ltr" pins the whole nav's layout (logo left, actions right) so it
    // does NOT mirror when the page's dir flips to rtl for Arabic. Text
    // content inside (labels) still renders in Arabic script correctly —
    // only the flex ordering is frozen.
    <div dir="ltr">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass-strong shadow-lg shadow-black/5"
            : isMobileMenuOpen
              ? "dark:bg-dark-bg bg-light-bg"
              : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-14 lg:h-18">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              onClick={() => handleLinkClick(null)}
              className="group z-50 inline-flex items-center gap-2"
            >
              <Image
                src="/images/logo.png"
                alt="AudioVerse Logo"
                width={36}
                height={36}
              />

              <span className="text-2xl font-bold tracking-tight text-light-text transition-colors duration-300 dark:text-dark-text">
                AudioVerse
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "text-light-secondary dark:text-dark-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-border/50 dark:hover:bg-dark-border/50",
                    activeSection === link.href &&
                      "text-primary dark:text-primary hover:text-primary dark:hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 z-50">
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>

              <a
                href="#download"
                onClick={() => handleLinkClick("#download")}
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
              >
                <Download className="w-4 h-4" />
                {t("downloadApp")}
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-light-text dark:text-dark-text hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel — always slides in from the right, regardless of
                locale, since the nav chrome is pinned to LTR layout above */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 left-0 right-0 bg-light-bg dark:bg-dark-bg flex flex-col"
            >
              {/* Navigation Links */}
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <nav className="w-full max-w-sm">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className={cn(
                          "block py-4 text-2xl sm:text-3xl font-semibold text-center transition-colors border-b border-light-border dark:border-dark-border last:border-b-0",
                          activeSection === link.href
                            ? "text-primary"
                            : "text-light-text dark:text-dark-text hover:text-primary"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* CTA at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 pb-10"
              >
                <a
                  href="#download"
                  onClick={() => handleLinkClick("#download")}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-primary text-white text-lg font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
                >
                  <Download className="w-5 h-5" />
                  {t("downloadApp")}
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
