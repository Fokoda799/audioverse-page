export function LegalCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface shadow-sm hover:shadow-md transition-shadow p-6 sm:p-8">
      {children}
    </div>
  );
}
