"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { LanguageSwitcher } from "../LanguageSwitcher";

export function LegalLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const t = useTranslations("legal");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isRTL = locale === "ar";

  return (
    <div className="min-h-screen pt-7 lg:pt-20 pb-16 ">
      {/* Fixed controls, top-right (top-left when RTL) */}
      <div
        className="mb-6 sm:mb-0 sm:fixed sm:top-6 md:top-4 left-8 sm:right-4 md:right-6 z-50 flex items-center gap-2"
        dir="rtl"
      >
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text mb-8">
          {title}
        </h1>

        <div className="bg-light-surface dark:bg-dark-surface rounded-2xl border border-light-border dark:border-dark-border p-6 sm:p-10 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}