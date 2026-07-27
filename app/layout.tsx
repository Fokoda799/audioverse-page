import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://audioverse.abdellahnaithadid.dev"),
  title: "AudioVerse — Listen. Learn. Imagine.",
  description:
    "Thousands of stories. One beautiful listening experience. Discover audiobooks, podcasts, and more with AudioVerse.",
  keywords: [
    "audiobooks",
    "audio books",
    "listen",
    "stories",
    "podcasts",
    "reading",
    "app",
    "podcasts"
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
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    url: "https://audioverse.abdellahnaithadid.dev",
    siteName: "AudioVerse",
    title: "AudioVerse — Listen. Learn. Imagine.",
    description:
      "Thousands of stories. One beautiful listening experience. Discover audiobooks, podcasts, and more with AudioVerse.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AudioVerse — The Ultimate Audiobook Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AudioVerse — Listen. Learn. Imagine.",
    description:
      "Thousands of stories. One beautiful listening experience. Discover audiobooks, podcasts, and more with AudioVerse.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexSansArabic.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
