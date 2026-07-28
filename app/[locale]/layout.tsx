import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GlowCursor } from "@/components/GlowCursor";
import { ConditionalChrome } from "@/components/ConditionalChrome";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

const baseMetadata: Metadata = {
  metadataBase: new URL("https://audioverse.abdellahnaithadid.dev"),
  keywords: [
    "audiobooks",
    "audio books",
    "listen",
    "stories",
    "podcasts",
    "reading",
    "app",
    "podcasts",
  ],
  authors: [{ name: "Fokoda" }],
  creator: "Fokoda",
  publisher: "Fokoda",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
    creator: "@audioverse",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
};

export async function generateMetadata({
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

  const t = await getTranslations({ locale: appLocale, namespace: "metadata" });

  return {
    ...baseMetadata,
    title: t("title"),
    description: t("description"),
    openGraph: {
      ...baseMetadata.openGraph,
      type: "website",
      locale: appLocale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: [appLocale === "ar" ? "en_US" : "ar_SA"],
      url: "https://audioverse.abdellahnaithadid.dev",
      siteName: "AudioVerse",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "AudioVerse - The Ultimate Audiobook Experience",
        },
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("title"),
      description: t("description"),
    },
  };
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const appLocale = locale as Locale;
  setRequestLocale(appLocale);

  const messages = await getMessages({ locale: appLocale });

  return (
    <html
      lang={appLocale}
      dir={appLocale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${ibmPlexSansArabic.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen font-sans"
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages} locale={appLocale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false}
          >
            <GlowCursor />
            <ConditionalChrome>{children}</ConditionalChrome>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
