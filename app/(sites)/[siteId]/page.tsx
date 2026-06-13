import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function SitePage({ params }: { params: { siteId: string } }) {
  const { data: site } = await supabaseAdmin
    .from("sites")
    .select("*")
    .eq("id", params.siteId)
    .single();

  if (!site) {
    return <div className="min-h-screen flex items-center justify-center">Site introuvable</div>;
  }

  const content = site.content_json;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <header className="p-10 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h1 className="text-4xl font-bold">{content.title}</h1>
        <p className="mt-3 text-lg">{content.headline}</p>
        <a href={`https://wa.me/?text=${encodeURIComponent(content.whatsapp_message || content.cta)}`} className="inline-block mt-6 bg-green-500 px-6 py-3 rounded-xl">
          Contact WhatsApp
        </a>
      </header>
      <section className="p-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Avantages</h2>
        <div className="grid gap-3">
          {content.features?.map((f: string, i: number) => (
            <div key={i} className="p-4 bg-gray-100 rounded-lg">✔ {f}</div>
          ))}
        </div>
      </section>
      <section className="text-center p-10 bg-black text-white">
        <h2 className="text-xl mb-4">Prêt à commencer ?</h2>
        <a href={`https://wa.me/?text=${encodeURIComponent(content.cta || "Je veux en savoir plus")}`} className="bg-green-500 px-6 py-3 rounded-xl">
          Démarrer maintenant
        </a>
      </section>
      <footer className="text-center p-6 text-sm text-gray-500">
        Powered by <a href={process.env.NEXT_PUBLIC_APP_URL} className="text-blue-600">AutoClient AI</a>
      </footer>
    </div>
  );
}
