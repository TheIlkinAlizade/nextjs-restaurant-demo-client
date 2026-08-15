import { getBusinessInfo, getMenu, getGallery } from "@/lib/api";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [business, menu, gallery] = await Promise.all([
    getBusinessInfo(locale),
    getMenu(locale),
    getGallery(locale),
  ]);

  return (
    <main className="flex flex-1 flex-col bg-stone-50">
      <section className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="text-4xl font-semibold text-stone-800">
          {business.name}
        </h1>
        <p className="mt-2 text-lg text-stone-600">{business.tagline}</p>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-8 text-stone-700">
        <p>{business.about_text}</p>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-8">
        <h2 className="mb-4 text-2xl font-semibold text-stone-800">Menu</h2>
        {menu.map((category) => (
          <div key={category.id} className="mb-8">
            <h3 className="mb-2 text-xl font-medium text-stone-700">
              {category.name}
            </h3>
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.price} ₼</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-6 py-8">
        <h2 className="mb-4 text-2xl font-semibold text-stone-800">
          Gallery
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {gallery.map((img) => (
            <div key={img.id} className="aspect-square bg-stone-200">
              {img.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.image_url}
                  alt={img.caption ?? ""}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}