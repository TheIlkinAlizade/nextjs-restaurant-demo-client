const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type BusinessInfo = {
  name: string;
  tagline: string | null;
  about_text: string | null;
  phone: string | null;
  whatsapp: string | null;
  instagram_url: string | null;
  address_line: string | null;
  city: string | null;
  map_lat: number | null;
  map_lng: number | null;
  hours: Record<string, string> | null;
  hero_image_url: string | null;
};

export type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
};

export type MenuCategory = {
  id: number;
  name: string;
  sort_order: number;
  items: MenuItem[];
};

export type GalleryImage = {
  id: number;
  image_url: string | null;
  caption: string | null;
  category: "food" | "interior" | "people";
  sort_order: number;
};

async function apiFetch<T>(path: string, locale: string): Promise<T> {
  const separator = path.includes("?") ? "&" : "?";
  const res = await fetch(`${API_URL}${path}${separator}locale=${locale}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API request failed: ${path} (${res.status})`);
  }

  const json = await res.json();
  return json.data as T;
}

export function getBusinessInfo(locale: string) {
  return apiFetch<BusinessInfo>("/business-info", locale);
}

export function getMenu(locale: string) {
  return apiFetch<MenuCategory[]>("/menu", locale);
}

export async function getMenuItem(id: string, locale: string) {
  const categories = await getMenu(locale);
  for (const category of categories) {
    const item = category.items.find((i) => String(i.id) === id);
    if (item) return { item, categoryName: category.name };
  }
  return null;
}

export function getGallery(locale: string) {
  return apiFetch<GalleryImage[]>("/gallery", locale);
}

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export async function submitContact(payload: ContactPayload) {
  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message ?? "Failed to send message");
  }

  return res.json();
}
