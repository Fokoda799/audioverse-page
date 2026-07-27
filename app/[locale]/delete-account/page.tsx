import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalSection } from "@/components/legal/LegalSection";
import { getTranslations } from "next-intl/server";

export default async function DeleteAccountPage() {
  const t = await getTranslations("deleteAccount");
  const lm = await getTranslations("legalMeta");

  const sections = [
    "howTo",
    "afterRequest",
    "recovering",
    "permanentDeletion",
    "dataDeleted",
    "dataRetained",
    "help",
  ] as const;

  return (
    <LegalLayout title={t("deleteAccountTitle")}>
      <p className="text-light-secondary dark:text-dark-secondary mb-6">
        {lm("lastUpdated")}
      </p>

      <div className="space-y-4 sm:space-y-6">
        {sections.map((key) => (
          <LegalSection
            key={key}
            title={t(`deleteAccount.${key}.title`)}
            body={t.has(`deleteAccount.${key}.body`) ? t(`deleteAccount.${key}.body`) : undefined}
            intro={t.has(`deleteAccount.${key}.intro`) ? t(`deleteAccount.${key}.intro`) : undefined}
            steps={
              t.has(`deleteAccount.${key}.steps`)
                ? (t.raw(`deleteAccount.${key}.steps`) as string[])
                : undefined
            }
            items={
              t.has(`deleteAccount.${key}.items`)
                ? (t.raw(`deleteAccount.${key}.items`) as string[])
                : undefined
            }
            outro={t.has(`deleteAccount.${key}.outro`) ? t(`deleteAccount.${key}.outro`) : undefined}
            email={t.has(`deleteAccount.${key}.email`) ? t(`deleteAccount.${key}.email`) : undefined}
          />
        ))}
      </div>
    </LegalLayout>
  );
}
