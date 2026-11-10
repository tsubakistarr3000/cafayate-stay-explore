import { createFileRoute, Link } from "@tanstack/react-router";
import { img, video } from "@/data/media";
import { site } from "@/data/site";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionIndex } from "@/components/site/SectionIndex";
import { VideoFrame } from "@/components/site/VideoFrame";

export const Route = createFileRoute("/cafayate")({
  head: () => ({
    meta: [
      { title: "Cafayate — Valles Calchaquíes, Salta" },
      { name: "description", content: "Quebradas rojas, viñedos, gastronomía regional y caminos de los Valles Calchaquíes en Cafayate, Salta." },
      { property: "og:title", content: "Cafayate — Valles Calchaquíes, Salta" },
      { property: "og:description", content: "Un lugar que merece ser recorrido: paisajes, vino y gastronomía en Cafayate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Cafayate,
});

function Cafayate() {
  return (
    <>
      <PageHero eyebrow={`Salta, Argentina · ${site.coordinates}`} title="Cafayate" subtitle="Un lugar que merece ser recorrido." image={img.quebradaConchas.src} video={video.quebradaAereo} alt="Vista aérea de la Quebrada de Cafayate" />

      <section className="container-editorial grid gap-12 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-4"><SectionIndex n="01" label="Descubrir" className="text-muted-foreground" /></div>
        <Reveal as="p" className="display-serif text-4xl leading-tight md:col-span-7 md:text-5xl">A 1.680 metros sobre el nivel del mar, Cafayate es la puerta de los Valles Calchaquíes: un pueblo de viñedos rodeado de cerros, quebradas y luz de altura.</Reveal>
      </section>

      <section className="relative">
        <div className="h-[80svh] min-h-[480px] overflow-hidden"><VideoFrame src={video.quebradaPaisaje} poster={img.quebradaConchas.src} label="Formaciones de roca en la Quebrada de las Conchas" /></div>
        <div className="container-editorial -mt-24 relative grid md:grid-cols-12">
          <div className="bg-paper p-10 md:col-span-5 md:col-start-7 md:p-14">
            <SectionIndex n="02" label="Paisajes" className="text-muted-foreground" />
            <h2 className="display-serif mt-6 text-5xl">Quebrada de las Conchas</h2>
            <p className="mt-6 text-muted-foreground">Sobre la ruta 68, formaciones de arenisca roja esculpidas por el viento: la Garganta del Diablo, el Anfiteatro y Los Castillos.</p>
          </div>
        </div>
      </section>

      <section className="container-editorial grid gap-10 py-28 md:grid-cols-12 md:py-40">
        <Reveal variant="img" className="aspect-[4/5] overflow-hidden md:col-span-6"><img src={img.cafayateVinedos.src} alt={img.cafayateVinedos.alt} className="h-full w-full object-cover" loading="lazy" /></Reveal>
        <div className="flex flex-col justify-end md:col-span-5 md:col-start-8">
          <SectionIndex n="03" label="Cultura del vino" className="text-muted-foreground" />
          <Reveal as="h2" className="display-sans mt-8 text-[clamp(40px,5vw,72px)]">Tierra de <span className="display-serif italic text-terracotta">torrontés.</span></Reveal>
          <Reveal as="p" delay={120} className="mt-6 max-w-md text-muted-foreground">Bodegas familiares y de altura rodean el pueblo. Muchas abren sus puertas para visitas y degustaciones, que se coordinan directamente con cada una.</Reveal>
        </div>
      </section>

      <section className="bg-wine py-28 text-on-dark md:py-36">
        <div className="container-editorial grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionIndex n="04" label="Gastronomía" className="opacity-60" />
            <h2 className="display-serif mt-8 text-5xl md:text-6xl">Sabores del valle.</h2>
            <p className="mt-6 max-w-md opacity-75">Empanadas salteñas, humita, tamales, locro y quesos de cabra. La plaza principal concentra peñas y restaurantes regionales.</p>
          </div>
          <div className="aspect-[16/10] overflow-hidden md:col-span-6 md:col-start-7"><VideoFrame src={video.aereoRocas} label="Vista aérea de cerros rojizos" /></div>
        </div>
      </section>

      <section className="container-editorial grid gap-12 py-28 md:grid-cols-12">
        <div className="md:col-span-4"><SectionIndex n="05" label="Cómo llegar" className="text-muted-foreground" /></div>
        <ul className="divide-y divide-border border-y border-border md:col-span-7 md:col-start-6">
          {[["Desde Salta capital", "Aprox. 190 km por la ruta 68, a través de la Quebrada de las Conchas"], ["Desde Tucumán", "Por Tafí del Valle y la ruta 40"], ["Para moverse", "Auto propio o remis local recomendado (dato a verificar)"]].map(([k, v]) => (
            <li key={k} className="grid grid-cols-[170px_1fr] gap-6 py-5 text-sm"><span className="label-meta text-muted-foreground">{k}</span><span>{v}</span></li>
          ))}
        </ul>
        <div className="md:col-span-7 md:col-start-6">
          <p className="mb-8 text-xs text-muted-foreground">Imágenes y videos del destino; no corresponden a vistas desde el alojamiento. Videos: Sergey Guk / Pexels.</p>
          <Link to="/contacto" className="btn-solid">Consultar estadía</Link>
        </div>
      </section>
    </>
  );
}
