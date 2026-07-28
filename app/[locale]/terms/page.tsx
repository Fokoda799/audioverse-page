import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalSection } from "@/components/legal/LegalSection";
import { locales, type Locale } from "@/lib/i18n";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const appLocale = locale as Locale;
  setRequestLocale(appLocale);

  const t = await getTranslations({ locale: appLocale, namespace: "terms" });
  const lm = await getTranslations({ locale: appLocale, namespace: "legalMeta" });

  const sections = [
    "eligibility",
    "account",
    "using",
    "ownership",
    "userContent",
    "acceptableUse",
    "ip",
    "copyright",
    "availability",
    "suspension",
    "deletion",
    "disclaimer",
    "liability",
    "changes",
    "governingLaw",
    "contact",
  ] as const;

  return (
    <LegalLayout title={t("termsTitle")}>
      <p className="text-light-secondary dark:text-dark-secondary mb-6">
        {lm("lastUpdated")}
      </p>

      <div className="space-y-4 sm:space-y-6">
        {sections.map((key) => (
          <LegalSection
            key={key}
            title={t(`terms.${key}.title`)}
            body={t.has(`terms.${key}.body`) ? t(`terms.${key}.body`) : undefined}
            intro={t.has(`terms.${key}.intro`) ? t(`terms.${key}.intro`) : undefined}
            items={
              t.has(`terms.${key}.items`)
                ? (t.raw(`terms.${key}.items`) as string[])
                : undefined
            }
            subIntro={t.has(`terms.${key}.subIntro`) ? t(`terms.${key}.subIntro`) : undefined}
            subItems={
              t.has(`terms.${key}.subItems`)
                ? (t.raw(`terms.${key}.subItems`) as string[])
                : undefined
            }
            outro={t.has(`terms.${key}.outro`) ? t(`terms.${key}.outro`) : undefined}
            email={t.has(`terms.${key}.email`) ? t(`terms.${key}.email`) : undefined}
          />
        ))}
      </div>
    </LegalLayout>
  );
}
