import { createFileRoute, Link } from "@tanstack/react-router";
import { img } from "@/data/media";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionIndex } from "@/components/site/SectionIndex";

export const Route = createFileRoute("/experiencia")({
  head: () => ({
    meta: [
      { title: "La Experiencia — Barricas de Cafayate" },
      { name: "description", content: "Arquitectura de barrica, habitaciones privadas y espacios compartidos: cómo es quedarse en Barricas de Cafayate." },
      { property: "og:title", content: "La Experiencia — Barricas de Cafayate" },
      { property: "og:description", content: "Arquitectura de barrica, habitaciones privadas y espacios compartidos en Cafayate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Experiencia,
});

const chapters = [
  { n: "01", label: "Concepto", title: "La forma de una barrica.", text: "Bóvedas curvas, frentes de madera y una escala íntima. La arquitectura toma la silueta del objeto que define la cultura del vino en Cafayate.", photos: [img.exteriorBarricas, img.sendero] },
  { n: "02", label: "Habitaciones", title: "Privadas, recogidas, cálidas.", text: "Cada barrica es una habitación privada con baño propio, aire acondicionado, frigobar y Wi-Fi. Un muro de color distingue a cada una.", photos: [img.malbec2, img.cabernet3] },
  { n: "03", label: "Espacios al aire libre", title: "Un patio para el final del día.", text: "Senderos de piedra, lavandas, cardones y suculentas acompañan el recorrido entre las barricas.", photos: [img.exteriorCactus, img.exteriorLavanda] },
  { n: "04", label: "Cocina y parrilla", title: "Para compartir.", text: "Una cocina y una parrilla compartidas, bajo una galería de ladrillo, para cocinar algo simple o compartir un asado.", photos: [img.cocinaExterior, img.parrilla] },
];

function Experiencia() {
  return (
    <>
      <PageHero eyebrow="Barricas de Cafayate" title={<>La <em>experiencia</em></>} subtitle="Una forma diferente de quedarse." image={img.exteriorLavanda.src} alt={img.exteriorLavanda.alt} />
      {chapters.map((c, k) => (
        <section key={c.n} className={`py-28 md:py-40 ${k % 2 ? "bg-ivory" : ""}`}>
          <div className="container-editorial grid gap-12 md:grid-cols-12">
            <div className={`md:col-span-4 ${k % 2 ? "md:order-2 md:col-start-9" : ""}`}>
              <SectionIndex n={c.n} label={c.label} className="text-muted-foreground" />
              <Reveal as="h2" className="display-serif mt-8 text-5xl md:text-6xl">{c.title}</Reveal>
              <Reveal as="p" delay={120} className="mt-6 max-w-sm text-muted-foreground">{c.text}</Reveal>
            </div>
            <div className={`grid grid-cols-5 gap-6 md:col-span-7 ${k % 2 ? "md:col-start-1" : "md:col-start-6"}`}>
              <Reveal variant="img" className="col-span-3 aspect-[3/4] overflow-hidden"><img src={c.photos[0].src} alt={c.photos[0].alt} className="h-full w-full object-cover" loading="lazy" /></Reveal>
              <Reveal variant="img" delay={200} className="col-span-2 mt-28 aspect-[3/4] overflow-hidden"><img src={c.photos[1].src} alt={c.photos[1].alt} className="h-full w-full object-cover" loading="lazy" /></Reveal>
            </div>
          </div>
        </section>
      ))}
      <section className="bg-charcoal py-28 text-on-dark">
        <div className="container-editorial grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4"><SectionIndex n="05" label="Información práctica" className="opacity-60" /></div>
          <ul className="divide-y divide-on-dark/15 border-y border-on-dark/15 md:col-span-7 md:col-start-6">
            {[["Ubicación", "Cerca del centro de Cafayate"], ["Ingreso / salida", "A confirmar"], ["Estacionamiento", "Disponible"], ["Para recorrer", "Bodegas, gastronomía regional y excursiones se coordinan por cuenta propia"]].map(([k, v]) => (
              <li key={k} className="grid grid-cols-[160px_1fr] gap-6 py-5 text-sm"><span className="label-meta opacity-60">{k}</span><span>{v}</span></li>
            ))}
          </ul>
          <div className="md:col-span-7 md:col-start-6"><Link to="/contacto" className="btn-light">Consultar disponibilidad</Link></div>
        </div>
      </section>
    </>
  );
}
