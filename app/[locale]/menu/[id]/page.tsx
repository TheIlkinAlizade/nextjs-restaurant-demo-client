import Link from "next/link";
import { notFound } from "next/navigation";
import { getMenuItem } from "@/lib/api";

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const result = await getMenuItem(id, locale);

  if (!result) notFound();

  const { item, categoryName } = result;

  return (
    <main className="flex flex-1 flex-col bg-cream">
      <div className="mx-auto w-full max-w-3xl px-6 py-10">
        <Link
          href={`/${locale}/menu`}
          className="mb-6 inline-block text-sm text-espresso/60 hover:text-espresso"
        >
          ← Back to menu
        </Link>

        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone-warm">
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

        <div className="mt-6">
          <span className="text-sm uppercase tracking-wide text-terracotta">
            {categoryName}
          </span>
          <div className="mt-1 flex items-baseline justify-between gap-4">
            <h1 className="font-serif text-3xl font-semibold text-espresso">
              {item.name}
            </h1>
            <span className="whitespace-nowrap font-serif text-2xl text-terracotta">
              {item.price.toFixed(2)} ₼
            </span>
          </div>
          {item.description && (
            <p className="mt-4 text-lg leading-relaxed text-espresso/70">
              {item.description}
            </p>
          )}
          {!item.is_available && (
            <p className="mt-4 text-sm font-medium text-red-500">
              Currently unavailable
            </p>
          )}
        </div>
      </div>
    </main>
  );
}