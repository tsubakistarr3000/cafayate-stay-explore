import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { accommodations } from "@/data/site";
import { img } from "@/data/media";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/barricas/")({
  head: () => ({
    meta: [
      { title: "Las Barricas — Barricas de Cafayate" },
      { name: "description", content: "Malbec, Cabernet, Rosado y una cuarta barrica: habitaciones privadas con baño propio en Cafayate." },
      { property: "og:title", content: "Las Barricas — Barricas de Cafayate" },
      { property: "og:description", content: "Cuatro espacios para descubrir Cafayate de otra manera." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Collection,
});

function Collection() {
  return (
    <>
      <PageHero eyebrow="Alojamiento · 04 unidades" title="Las Barricas" subtitle="Cuatro espacios para descubrir Cafayate de otra manera." image={img.exteriorBarrica.src} alt={img.exteriorBarrica.alt} />
      <div className="container-editorial py-28 md:py-40">
        {accommodations.map((a, k) => {
          const flip = k % 2 === 1;
          return (
            <Reveal key={a.id} as="article" className="grid gap-10 border-t border-border py-20 md:grid-cols-12 md:py-28">
              <Link to="/barricas/$slug" params={{ slug: a.slug }} className={`img-zoom relative block aspect-[4/5] md:col-span-6 ${flip ? "md:order-2 md:col-start-7" : ""}`}>
                <img src={a.heroImage.src} alt={a.heroImage.alt} className="h-full w-full object-cover" loading="lazy" />
                {a.provisional && <span className="label-meta absolute left-4 top-4 bg-paper px-3 py-2 text-[10px]">Provisorio</span>}
              </Link>
              <div className={`flex flex-col justify-end md:col-span-5 ${flip ? "md:col-start-1" : "md:col-start-8"}`}>
                <p className="label-meta text-muted-foreground">{a.displayNumber} / 04</p>
                <h2 className={`display-serif mt-3 text-6xl md:text-8xl ${a.provisional ? "text-muted-foreground" : ""}`}>{a.name}</h2>
                <p className="mt-6 max-w-md text-muted-foreground">{a.description}</p>
                <dl className="mt-8 grid grid-cols-2 gap-y-3 border-t border-border pt-6 text-sm">
                  <dt className="label-meta text-muted-foreground">Huéspedes</dt><dd>Hasta {a.maxGuests}{a.capacityConfirmed ? "" : " · a confirmar"}</dd>
                  <dt className="label-meta text-muted-foreground">Incluye</dt><dd>{a.privateAmenities.slice(0, 3).join(" · ")}</dd>
                </dl>
                <div className="mt-10 flex flex-wrap gap-6">
                  <Link to="/barricas/$slug" params={{ slug: a.slug }} className="link-line label-meta">Explorar barrica <ArrowRight className="h-3.5 w-3.5" /></Link>
                  <Link to="/contacto" className="link-line label-meta text-terracotta">Consultar disponibilidad</Link>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
