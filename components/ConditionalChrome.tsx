"use client";

import { usePathname } from "@/lib/navigation";
import { locales } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Add any route segments where you want to hide the navbar/footer.
// Match against the path AFTER the locale prefix (e.g. "/login", "/player/123").
const HIDDEN_CHROME_ROUTES = ["/privacy", "/terms", "/delete-account"];

function isChromeHidden(pathname: string) {
  const segments = pathname.split("/").filter(Boolean); // e.g. ["ar", "login"] or ["login"]
  const firstSegment = segments[0];

  const withoutLocale = locales.includes(firstSegment as any)
    ? "/" + segments.slice(1).join("/")
    : pathname;

  const normalized = withoutLocale || "/";

  return HIDDEN_CHROME_ROUTES.some(
    (route) => normalized === route || normalized.startsWith(`${route}/`)
  );
}

export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = isChromeHidden(pathname);

  return (
    <>
      {!hideChrome && <Navbar />}
      <main>{children}</main>
      {!hideChrome && <Footer />}
    </>
  );
}
