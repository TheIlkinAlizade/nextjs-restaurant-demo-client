"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar({
  locale,
  businessName,
}: {
  locale: string;
  businessName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href={`/${locale}`}
          className="font-serif text-lg font-semibold text-espresso"
        >
          {businessName}
        </Link>

        <nav className="hidden gap-6 text-sm text-espresso/70 sm:flex">
          <Link href={`/${locale}/menu`} className="hover:text-espresso">
            Menu
          </Link>
          <Link href={`/${locale}#location`} className="hover:text-espresso">
            Visit
          </Link>
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-espresso/15 text-espresso sm:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-espresso/10 bg-cream px-6 py-4 sm:hidden">
          <nav className="flex flex-col gap-4 text-sm text-espresso/80">
            <Link href={`/${locale}/menu`} onClick={() => setOpen(false)}>
              Menu
            </Link>
            <Link href={`/${locale}#location`} onClick={() => setOpen(false)}>
              Visit
            </Link>
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}