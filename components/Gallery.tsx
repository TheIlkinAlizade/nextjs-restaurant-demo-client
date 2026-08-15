"use client";

import { useTranslations } from "next-intl";
import type { GalleryImage } from "@/lib/api";

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const t = useTranslations("gallery");

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block h-px w-12 bg-terracotta" />
          <h2 className="font-serif text-3xl font-semibold text-espresso">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg bg-stone-warm">
              {img.image_url && (
                <img src={img.image_url} alt={img.caption ?? ""} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              )}
              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/70 to-transparent p-3">
                  <p className="text-xs text-cream">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}