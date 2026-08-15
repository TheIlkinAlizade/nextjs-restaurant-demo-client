import Link from "next/link";
import { notFound } from "next/navigation";
import { getMenuItem } from "@/lib/api";
import { getTranslations } from "next-intl/server";

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const result = await getMenuItem(id, locale);
  const t = await getTranslations("menuItem");

  if (!result) notFound();

  const { item, categoryName } = result;

  return (
    <main className="flex flex-1 flex-col bg-cream">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <Link
          href={`/${locale}/menu`}
          className="mb-8 inline-flex items-center gap-1 text-sm text-espresso/60 transition hover:text-espresso"
        >
          ← {t("backToMenu")}
        </Link>

        <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
          <div className="aspect-square overflow-hidden rounded-2xl bg-stone-warm sm:aspect-[4/5]">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-espresso/30">
                Photo coming soon
              </div>
            )}
          </div>

          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-espresso/40">
              {categoryName}
            </span>
            <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight text-espresso">
              {item.name}
            </h1>
            <p className="mt-4 font-serif text-2xl text-terracotta">
              {item.price.toFixed(2)} ₼
            </p>

            {item.description && (
              <p className="mt-6 text-base leading-relaxed text-espresso/70">
                {item.description}
              </p>
            )}

            {!item.is_available && (
              <p className="mt-6 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
                {t("unavailable")}
              </p>
            )}

            <div className="mt-8 border-t border-espresso/10 pt-6">
              <Link
                href={`/${locale}/menu`}
                className="inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-cream transition hover:bg-terracotta-dark"
              >
                {t("exploreMore")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}