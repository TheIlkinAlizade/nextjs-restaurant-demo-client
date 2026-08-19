"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { submitContact } from "@/lib/api";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3">
      <input
        type="text"
        required
        placeholder={t("name")}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="rounded-lg border border-cream/20 bg-transparent px-4 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-cream/50 focus:outline-none"
      />
      <input
        type="email"
        required
        placeholder={t("email")}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="rounded-lg border border-cream/20 bg-transparent px-4 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-cream/50 focus:outline-none"
      />
      <input
        type="tel"
        placeholder={t("phone")}
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="rounded-lg border border-cream/20 bg-transparent px-4 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-cream/50 focus:outline-none"
      />
      <textarea
        required
        rows={4}
        placeholder={t("message")}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="rounded-lg border border-cream/20 bg-transparent px-4 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-cream/50 focus:outline-none"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 rounded-full bg-cream px-6 py-3 text-sm font-medium text-espresso transition hover:bg-cream/90 disabled:opacity-50"
      >
        {status === "sending" ? t("sending") : t("send")}
      </button>

      {status === "success" && (
        <p className="text-sm text-green-400">{t("success")}</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">{t("error")}</p>
      )}
    </form>
  );
}