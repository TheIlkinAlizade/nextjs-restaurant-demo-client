import type { BusinessInfo } from "@/lib/api";

export default function Hero({ business }: { business: BusinessInfo }) {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-espresso">
      {business.hero_image_url && (
        <img
          src={business.hero_image_url}
          alt={business.name}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <h1 className="font-serif text-5xl font-semibold text-cream sm:text-6xl">
          {business.name}
        </h1>

        {business.tagline && (
          <p className="mt-4 max-w-md text-lg text-stone-warm-light">
            {business.tagline}
          </p>
        )}

        <div className="mt-8 flex gap-4">
          <a href="#menu" className="rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-cream transition hover:bg-terracotta-dark">
            View Menu
          </a>
          <a href="#location" className="rounded-full border border-cream/40 px-6 py-3 text-sm font-medium text-cream transition hover:bg-cream/10">
            Visit Us
          </a>
        </div>
      </div>
    </section>
  );
}