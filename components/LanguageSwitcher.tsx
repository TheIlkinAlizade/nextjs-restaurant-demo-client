"use client";

import { usePathname, useRouter } from "next/navigation";

const LOCALES = [
  { code: "az", label: "AZ" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(code: string) {
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex gap-1 rounded-full border border-espresso/15 p-1">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => switchTo(l.code)}
          className={`text-xs px-2 py-1 rounded-full transition ${
            locale === l.code
              ? "bg-terracotta text-cream"
              : "text-espresso/60 hover:text-espresso"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}