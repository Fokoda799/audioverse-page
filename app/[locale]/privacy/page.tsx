import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalSection } from "@/components/legal/LegalSection";
import { locales, type Locale } from "@/lib/i18n";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function PrivacyPage({
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

  const t = await getTranslations({ locale: appLocale, namespace: "privacy" });
  const lm = await getTranslations({ locale: appLocale, namespace: "legalMeta" });

  const sections = [
    "accountInfo",
    "listeningInfo",
    "contentInfo",
    "usage",
    "authentication",
    "thirdParty",
    "analytics",
    "crash",
    "cookies",
    "security",
    "retention",
    "children",
    "rights",
    "changes",
    "contact",
  ] as const;

  return (
    <LegalLayout title={t("privacyTitle")}>
      <p className="text-light-secondary dark:text-dark-secondary mb-6">
        {lm("lastUpdated")}
      </p>

      <div className="space-y-4 sm:space-y-6">
        {sections.map((key) => (
          <LegalSection
            key={key}
            title={t(`privacy.${key}.title`)}
            body={t.has(`privacy.${key}.body`) ? t(`privacy.${key}.body`) : undefined}
            intro={t.has(`privacy.${key}.intro`) ? t(`privacy.${key}.intro`) : undefined}
            subtitle={t.has(`privacy.${key}.subtitle`) ? t(`privacy.${key}.subtitle`) : undefined}
            subIntro={t.has(`privacy.${key}.subIntro`) ? t(`privacy.${key}.subIntro`) : undefined}
            items={
              t.has(`privacy.${key}.items`)
                ? (t.raw(`privacy.${key}.items`) as string[])
                : undefined
            }
            google={t.has(`privacy.${key}.google`) ? t(`privacy.${key}.google`) : undefined}
            outro={t.has(`privacy.${key}.outro`) ? t(`privacy.${key}.outro`) : undefined}
            email={t.has(`privacy.${key}.email`) ? t(`privacy.${key}.email`) : undefined}
          />
        ))}
      </div>
    </LegalLayout>
  );
}
