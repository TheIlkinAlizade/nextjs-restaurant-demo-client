"use client";

import { useTranslations } from "next-intl";
import type { BusinessInfo } from "@/lib/api";
import ContactForm from "./ContactForm";

export default function Footer({ business }: { business: BusinessInfo }) {
  const t = useTranslations("contact");
  
  return (
    <footer className="bg-espresso px-6 py-12 text-cream">
      <div className="mx-auto max-w-5xl text-center">
        <h3 className="font-serif text-2xl font-semibold">{business.name}</h3>
        <div className="mt-4 flex justify-center gap-6 text-sm text-cream/70">
          {business.phone && <span>{business.phone}</span>}
          {business.whatsapp && <span>WhatsApp: {business.whatsapp}</span>}
          {business.instagram_url && (
            <a href={business.instagram_url} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
              Instagram
            </a>
          )}
        </div>
        
        <div className="mt-12 border-t border-cream/10 pt-10">
          <h4 className="font-serif text-xl font-medium">{t("title")}</h4>
          <ContactForm />
        </div>

        <p className="mt-8 text-xs text-cream/40">
          © 2026 {business.name}. Demo site.
        </p>
      </div>
    </footer>
  );
}