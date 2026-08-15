import { getMenu } from "@/lib/api";
import Menu from "@/components/Menu";

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const menu = await getMenu(locale);

  return (
    <main className="flex flex-1 flex-col bg-cream">
      <Menu menu={menu} locale={locale} />
    </main>
  );
}