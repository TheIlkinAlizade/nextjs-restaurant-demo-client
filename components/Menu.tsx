import type { MenuCategory } from "@/lib/api";

export default function Menu({ menu }: { menu: MenuCategory[] }) {
  return (
    <section id="menu" className="bg-stone-warm-light px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block h-px w-12 bg-terracotta" />
          <h2 className="font-serif text-3xl font-semibold text-espresso">
            Menu
          </h2>
        </div>

        {menu.map((category) => (
          <div key={category.id} className="mb-14">
            <h3 className="mb-6 font-serif text-2xl font-medium text-espresso">
              {category.name}
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {category.items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-xl bg-cream p-4 shadow-sm">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-stone-warm">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-espresso/30">
                        Photo soon
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-medium text-espresso">{item.name}</h4>
                      <span className="whitespace-nowrap font-serif text-terracotta">
                        {item.price.toFixed(2)} ₼
                      </span>
                    </div>
                    {item.description && (
                      <p className="mt-1 text-sm text-espresso/60">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}