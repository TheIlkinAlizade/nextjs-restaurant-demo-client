"use client";

import { useTranslations } from "next-intl";
import type { BusinessInfo } from "@/lib/api";

const DAY_LABELS: Record<string, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export default function Location({ business }: { business: BusinessInfo }) {
  const t = useTranslations("location");

  const mapSrc =
    business.map_lat && business.map_lng
      ? "https://www.google.com/maps?q=" + business.map_lat + "," + business.map_lng + "&z=16&output=embed"
      : null;

  return (
    <section id="location" className="bg-stone-warm-light px-6 py-20">
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2">
        <div>
          <span className="mb-3 inline-block h-px w-12 bg-terracotta" />
          <h2 className="mb-6 font-serif text-3xl font-semibold text-espresso">
            {t("title")}
          </h2>

          <div className="space-y-1 text-espresso/80">
            {business.address_line && <p>{business.address_line}</p>}
            {business.city && <p>{business.city}</p>}
            {business.phone && <p className="mt-3">{business.phone}</p>}
          </div>

          {business.hours && (
            <div className="mt-6">
              <h3 className="mb-2 font-medium text-espresso">{t("hours")}</h3>
              <ul className="space-y-1 text-sm text-espresso/70">
                {Object.entries(business.hours).map(([day, hours]) => (
                  <li key={day} className="flex justify-between gap-6">
                    <span>{DAY_LABELS[day] ?? day}</span>
                    <span>{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="h-72 overflow-hidden rounded-xl bg-stone-warm sm:h-auto">
          {mapSrc ? (
            <iframe src={mapSrc} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-espresso/40">
              {t("mapUnavailable")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}