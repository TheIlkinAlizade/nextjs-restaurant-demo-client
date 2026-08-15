import { getBusinessInfo, getMenu, getGallery } from "@/lib/api";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

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
    <main className="flex flex-1 flex-col bg-cream">
      <Hero business={business} />
      <About business={business} />
      <Menu menu={menu} />
      <Gallery images={gallery} />
      <Location business={business} />
      <Footer business={business} />
    </main>
  );
}
