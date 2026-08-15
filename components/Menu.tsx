"use client";

import { useState } from "react";
import Link from "next/link";
import type { MenuCategory } from "@/lib/api";

export default function Menu({
  menu,
  locale,
}: {
  menu: MenuCategory[];
  locale: string;
}) {
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");

  const visibleCategories =
    activeCategory === "all"
      ? menu
      : menu.filter((c) => c.id === activeCategory);

  return (
    <section id="menu" className="bg-stone-warm-light px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block h-px w-12 bg-terracotta" />
          <h2 className="font-serif text-3xl font-semibold text-espresso">
            Menu
          </h2>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              activeCategory === "all"
                ? "bg-terracotta text-cream"
                : "bg-cream text-espresso/70 hover:text-espresso"
            }`}
          >
            All
          </button>
          {menu.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                activeCategory === category.id
                  ? "bg-terracotta text-cream"
                  : "bg-cream text-espresso/70 hover:text-espresso"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {visibleCategories.map((category) => (
          <div key={category.id} className="mb-14">
            <h3 className="mb-6 font-serif text-2xl font-medium text-espresso">
              {category.name}
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.items.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/menu/${item.id}`}
                  className="group overflow-hidden rounded-xl bg-cream shadow-sm transition hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-stone-warm">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-espresso/30">
                        Photo soon
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-medium text-espresso">
                        {item.name}
                      </h4>
                      <span className="whitespace-nowrap font-serif text-terracotta">
                        {item.price.toFixed(2)} ₼
                      </span>
                    </div>
                    {item.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-espresso/60">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}