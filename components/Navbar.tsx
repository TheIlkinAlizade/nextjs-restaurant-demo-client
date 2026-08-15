import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar({ locale, businessName }: { locale: string; businessName: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="font-serif text-lg font-semibold text-espresso">
          {businessName}
        </Link>
        <nav className="hidden gap-6 text-sm text-espresso/70 sm:flex">
          <Link href={`/${locale}/menu`} className="hover:text-espresso">Menu</Link>
          <Link href={`/${locale}#location`} className="hover:text-espresso">Visit</Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}