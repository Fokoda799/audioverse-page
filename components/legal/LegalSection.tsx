import { LegalCard } from "./LegalCard";

interface LegalSectionProps {
  title: string;
  intro?: string;
  subtitle?: string;
  subIntro?: string;
  items?: string[];
  subItems?: string[];
  steps?: string[];
  outro?: string;
  google?: string;
  body?: string;
  email?: string;
}

export function LegalSection({
  title,
  intro,
  subtitle,
  subIntro,
  items,
  subItems,
  steps,
  outro,
  google,
  body,
  email,
}: LegalSectionProps) {
  return (
    <LegalCard>
      <h2 className="text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text mb-3">
        {title}
      </h2>

      {body && (
        <p className="text-sm sm:text-base leading-relaxed text-light-secondary dark:text-dark-secondary">
          {body}
        </p>
      )}

      {intro && (
        <p className="text-sm sm:text-base leading-relaxed text-light-secondary dark:text-dark-secondary mb-3">
          {intro}
        </p>
      )}

      {subtitle && (
        <h3 className="text-sm sm:text-base font-medium text-light-text dark:text-dark-text mt-4 mb-2">
          {subtitle}
        </h3>
      )}

      {subIntro && (
        <p className="text-sm sm:text-base text-light-secondary dark:text-dark-secondary mb-2">
          {subIntro}
        </p>
      )}

      {subItems && subItems.length > 0 && (
        <ul className="space-y-2 my-3">
          {subItems.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-sm sm:text-base text-light-secondary dark:text-dark-secondary"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {steps && steps.length > 0 && (
        <ol className="space-y-3 my-3">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-light-secondary dark:text-dark-secondary">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold shrink-0">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      )}

      {items && items.length > 0 && (
        <ul className="space-y-2 my-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-sm sm:text-base text-light-secondary dark:text-dark-secondary"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {google && (
        <p className="text-sm sm:text-base leading-relaxed text-light-secondary dark:text-dark-secondary mt-3">
          {google}
        </p>
      )}

      {outro && (
        <p className="text-sm sm:text-base leading-relaxed text-light-secondary dark:text-dark-secondary mt-3">
          {outro}
        </p>
      )}

      {email && (
        <p className="text-sm sm:text-base font-medium text-primary mt-3">
          {email}
        </p>
      )}
    </LegalCard>
  );
}
