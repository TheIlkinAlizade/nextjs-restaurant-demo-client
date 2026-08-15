import type { Metadata } from "next";
import { Inter, Geist_Mono, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getBusinessInfo } from "@/lib/api";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const business = await getBusinessInfo(locale);

  return {
    title: {
      default: business.name,
      template: `%s | ${business.name}`,
    },
    description: business.tagline ?? business.about_text ?? "Coffee, pastries, and a place to slow down.",
    openGraph: {
      title: business.name,
      description: business.tagline ?? "",
      images: business.hero_image_url ? [business.hero_image_url] : [],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: business.name,
      description: business.tagline ?? "",
      images: business.hero_image_url ? [business.hero_image_url] : [],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const business = await getBusinessInfo(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar locale={locale} businessName={business.name} />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}