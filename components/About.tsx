"use client";

import { useTranslations } from "next-intl";
import type { BusinessInfo } from "@/lib/api";

export default function About({ business }: { business: BusinessInfo }) {
  const t = useTranslations("about");

  if (!business.about_text) return null;

  return (
    <section className="mx-auto max-w-2xl px-6 py-20 text-center">
      <span className="mb-3 inline-block h-px w-12 bg-terracotta" />
      <h2 className="mb-6 font-serif text-3xl font-semibold text-espresso">
        {t("title")}
      </h2>
      <p className="text-lg leading-relaxed text-espresso/80">
        {business.about_text}
      </p>
    </section>
  );
}