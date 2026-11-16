import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { img, video } from "@/data/media";
import { accommodations, site } from "@/data/site";
import { Reveal, useParallax } from "@/components/site/Reveal";
import { BarrelReveal } from "@/components/site/BarrelReveal";
import { VideoFrame } from "@/components/site/VideoFrame";
import { SectionIndex } from "@/components/site/SectionIndex";
import { Marquee, Split, Magnetic } from "@/components/site/Fx";
import { Tour } from "@/components/site/Tour";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barricas de Cafayate — Dormí dentro de una barrica" },
      { name: "description", content: "Cuatro habitaciones privadas con arquitectura de barrica en Cafayate, Salta. Viví Cafayate de otra manera." },
      { property: "og:title", content: "Barricas de Cafayate — Dormí dentro de una barrica" },
      { property: "og:description", content: "Cuatro habitaciones privadas con arquitectura de barrica en Cafayate, Salta." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const heroSlides = [img.exteriorBarricas, img.exteriorLavanda, img.rosadoCamas];

function Hero() {
  const [i, setI] = useState(0);
  const [m, setM] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <section
      className="relative h-svh min-h-[620px] overflow-hidden bg-charcoal text-on-dark"
      onMouseMove={(e) => setM({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })}
    >
      <div className="absolute -inset-8 transition-transform duration-[1200ms] ease-out" style={{ transform: `translate3d(${m.x * -24}px, ${m.y * -16}px, 0)` }}>
        {heroSlides.map((s, k) => (
          <img key={s.src} src={s.src} alt={s.alt} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${k === i ? "opacity-100 animate-kenburns" : "opacity-0"}`} />
        ))}
      </div>
      <div className="hero-shade absolute inset-0" />
      <div className="container-editorial relative flex h-full flex-col justify-end pb-16 md:pb-20">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="label-meta animate-in fade-in slide-in-from-bottom-3 duration-1000">Cafayate · Salta · Argentina</p>
            <Reveal as="h1" className="display-serif mt-5 text-[clamp(40px,6vw,84px)]"><Split>{"Dormí dentro\nde una barrica."}</Split></Reveal>
            <p className="mt-5 max-w-md text-lg opacity-90">Viví Cafayate de otra manera.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Magnetic><Link to="/barricas" className="btn-light">Descubrí Barricas</Link></Magnetic>
              <Link to="/reservas" className="link-line label-meta self-center">Reservar estadía <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
          <div className="hidden flex-col items-end gap-3 md:col-span-5 md:flex">
            <div className="flex gap-2">
              {heroSlides.map((_, k) => (
                <button key={k} aria-label={`Imagen ${k + 1}`} onClick={() => setI(k)} className={`h-px w-10 transition-all ${k === i ? "bg-on-dark" : "bg-on-dark/35"}`} />
              ))}
            </div>
            <span className="label-meta opacity-70">0{i + 1} / 0{heroSlides.length}</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="h-12 w-px bg-on-dark/70 animate-scrollline" />
        <span className="label-meta text-[9px] opacity-70">Deslizá para explorar</span>
      </div>
    </section>
  );
}

function Manifesto() {
  const par = useParallax(80);
  return (
    <section className="bg-ivory py-32 md:py-44">
      <div className="container-editorial grid gap-14 md:grid-cols-12">
        <div className="md:col-span-2"><SectionIndex n="01" label="Una forma diferente" className="text-muted-foreground" /></div>
        <div className="md:col-span-5">
          <Reveal as="h2" className="display-sans text-[clamp(36px,5vw,72px)]"><Split>No todas las estadías se parecen.</Split></Reveal>
          <Reveal as="p" delay={150} className="mt-10 max-w-md text-muted-foreground">
            En Cafayate, donde el vino forma parte de la identidad del lugar, nuestras barricas ofrecen una manera diferente de descansar y descubrir el destino.
          </Reveal>
          <Reveal delay={250} className="mt-10"><Link to="/experiencia" className="link-line label-meta">La experiencia <ArrowRight className="h-3.5 w-3.5" /></Link></Reveal>
        </div>
        <div className="md:col-span-4 md:col-start-9 md:mt-32">
          <div ref={par}>
            <Reveal variant="img" className="aspect-[3/4] overflow-hidden barrel-arch" >
              <img src={img.exteriorBarrica.src} alt={img.exteriorBarrica.alt} className="h-full w-full object-cover" />
            </Reveal>
          </div>
          <p className="label-meta mt-4 text-muted-foreground">Ingreso a una barrica</p>
        </div>
      </div>
    </section>
  );
}

function Signature() {
  return (
    <section className="relative bg-wine text-on-dark">
      <BarrelReveal
        src={img.vistaConjunto.src}
        alt={img.vistaConjunto.alt}
        overlay={
          <>
            <div className="container-editorial pointer-events-none absolute inset-x-0 top-24 md:top-28" style={{ opacity: "calc(1 - var(--t) * 2.2)", transform: "translateY(calc(var(--t) * -120px))" }}>
              <p className="label-meta mb-4 opacity-70">Bóvedas · Madera · Luz</p>
              <h2 className="display-sans text-[clamp(44px,10vw,160px)] leading-[0.88]">Una arquitectura<br /><span className="font-light italic">para recordar.</span></h2>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/80 to-transparent pt-40" style={{ opacity: "calc((var(--t) - 0.55) * 3)" }}>
              <div className="container-editorial grid gap-6 pb-14 md:grid-cols-12">
                <p className="label-meta md:col-span-3">El conjunto · Cafayate</p>
                <p className="text-xl leading-snug md:col-span-7 md:text-3xl">Cada habitación toma la silueta curva de una barrica de vino: una bóveda blanca, un frente de madera y un interior recogido que invita a quedarse.</p>
              </div>
            </div>
          </>
        }
      />
    </section>
  );
}

const tourStops = [
  { title: "La llegada", text: "El conjunto de barricas aparece desde la calle, bajo el cielo abierto del valle.", photo: img.vistaConjunto },
  { title: "El sendero", text: "Un camino de piedra y canto rodado conecta cada unidad.", photo: img.sendero },
  { title: "La puerta", text: "Frentes de madera y un tonel de roble marcan cada entrada.", photo: img.exteriorBarrica },
  { title: "Adentro", text: "Bóveda encalada, muro de color y dos camas para descansar.", photo: img.rosadoCamas },
  { title: "El baño privado", text: "Cada barrica tiene su propio baño.", photo: img.rosadoBano },
  { title: "La galería", text: "Cocina y parrilla compartidas para el final del día.", photo: img.cocinaExterior },
  { title: "La noche", text: "El cielo se tiñe de rosa sobre los cerros.", photo: img.cieloNoche },
];

const layouts = [
  { wrap: "md:col-span-7", ratio: "aspect-[4/3]" },
  { wrap: "md:col-span-4 md:col-start-9 md:mt-48", ratio: "aspect-[3/4]" },
  { wrap: "md:col-span-5 md:col-start-2", ratio: "aspect-[3/4]" },
  { wrap: "md:col-span-5 md:col-start-8 md:mt-40", ratio: "aspect-[4/5]" },
];

function Units() {
  return (
    <section className="py-32 md:py-44">
      <div className="container-editorial">
        <div className="grid gap-10 md:grid-cols-12">
          <SectionIndex n="02" label="Las barricas" className="text-muted-foreground md:col-span-3" />
          <div className="md:col-span-8">
            <Reveal as="h2" className="display-sans text-[clamp(36px,5vw,72px)]"><Split>{"Cuatro espacios."}</Split><br /><span className="font-light italic text-terracotta"><Split>Una experiencia diferente.</Split></span></Reveal>
            <Reveal as="p" delay={120} className="mt-8 max-w-lg text-muted-foreground">Descubrí nuestras habitaciones privadas con una arquitectura inspirada en las barricas de vino.</Reveal>
          </div>
        </div>
        <div className="mt-24 grid gap-24 md:grid-cols-12 md:gap-y-32">
          {accommodations.map((a, k) => (
            <Reveal key={a.id} className={layouts[k]!.wrap}>
              <Link to="/barricas/$slug" params={{ slug: a.slug }} className="group block" data-cursor="Explorar">
                <div className={`img-zoom relative ${layouts[k]!.ratio}`}>
                  <img src={a.heroImage.src} alt={a.heroImage.alt} className="h-full w-full object-cover" loading="lazy" />
                  {a.provisional && <span className="label-meta absolute left-4 top-4 bg-paper px-3 py-2 text-[10px]">Imagen y nombre provisorios</span>}
                </div>
                <div className="mt-6 flex items-start justify-between gap-6 border-t border-border pt-5">
                  <div className="min-w-0">
                    <p className="label-meta text-muted-foreground">{a.displayNumber} / 04</p>
                    <h3 className={`display-serif mt-2 text-5xl md:text-6xl ${a.provisional ? "text-muted-foreground" : ""}`}>{a.name}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{a.subtitle}</p>
                  </div>
                  <span className="label-meta mt-3 flex shrink-0 items-center gap-2 transition-transform duration-500 group-hover:translate-x-1">Explorar <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="bg-ivory py-32 md:py-44">
      <div className="container-editorial grid gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 md:row-span-2">
          <Reveal variant="img" className="aspect-[3/4] overflow-hidden"><img src={img.rosadoBano.src} alt={img.rosadoBano.alt} className="h-full w-full object-cover" loading="lazy" /></Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <SectionIndex n="03" label="La experiencia" className="text-muted-foreground" />
          <Reveal as="h2" className="display-sans mt-8 text-[clamp(36px,4.4vw,64px)]">Pequeños detalles.<br />Una estadía diferente.</Reveal>
          <Reveal as="p" delay={120} className="mt-8 max-w-md text-muted-foreground">Bóvedas encaladas, maderas cálidas y colores que dialogan con el valle. Afuera, una galería, una cocina y una parrilla para compartir al final del día.</Reveal>
        </div>
        <div className="grid grid-cols-2 gap-6 md:col-span-6 md:col-start-7 md:gap-8">
          <Reveal variant="img" className="aspect-[4/3] overflow-hidden"><img src={img.parrilla.src} alt={img.parrilla.alt} className="h-full w-full object-cover" loading="lazy" /></Reveal>
          <Reveal variant="img" delay={150} className="aspect-[4/3] overflow-hidden"><img src={img.exteriorLavanda.src} alt={img.exteriorLavanda.alt} className="h-full w-full object-cover" loading="lazy" /></Reveal>
        </div>
        <div className="md:col-span-3 md:col-start-2 md:mt-16">
          <Reveal variant="img" className="aspect-square overflow-hidden"><img src={img.malbec4.src} alt={img.malbec4.alt} className="h-full w-full object-cover" loading="lazy" /></Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-6 md:mt-24">
          <div className="grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
            {[
              ["En cada barrica", ["Baño privado", "Aire acondicionado", "Frigobar", "Wi-Fi"]],
              ["Para compartir", ["Cocina", "Parrilla", "Galería y patio", "Estacionamiento"]],
              ["Cerca", ["Centro de Cafayate", "Bodegas", "Quebrada de las Conchas"]],
            ].map(([t, items]) => (
              <div key={t as string}>
                <p className="label-meta mb-4 text-terracotta">{t as string}</p>
                <ul className="space-y-2 text-sm">{(items as string[]).map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Algunas comodidades pueden variar según la unidad.</p>
        </div>
      </div>
    </section>
  );
}

function Destination() {
  return (
    <section className="bg-charcoal text-on-dark">
      <div className="relative h-[90svh] min-h-[520px] overflow-hidden">
        <VideoFrame src={video.aereoRocas} poster={img.quebradaConchas.src} label="Vista aérea de formaciones rojas cerca de Cafayate" />
        <div className="absolute inset-0 bg-charcoal/25" />
        <div className="container-editorial absolute inset-x-0 bottom-0">
          <p className="label-meta mb-4 opacity-80">Salta, Argentina · Destino</p>
          <h2 className="display-sans -mb-[0.12em] text-[clamp(72px,17vw,280px)] leading-[0.8]">CAFAYATE</h2>
        </div>
      </div>
      <div className="container-editorial grid gap-12 py-28 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionIndex n="04" label="Valles Calchaquíes" className="opacity-60" />
          <Reveal as="h3" className="display-serif mt-8 text-5xl md:text-6xl">Un lugar que merece ser recorrido.</Reveal>
          <Reveal as="p" delay={120} className="mt-8 max-w-md opacity-75">Paisajes únicos, bodegas, gastronomía regional y caminos que invitan a descubrir los Valles Calchaquíes.</Reveal>
          <Reveal delay={200} className="mt-10"><Link to="/cafayate" className="link-line label-meta">Descubrí Cafayate <ArrowRight className="h-3.5 w-3.5" /></Link></Reveal>
        </div>
        <div className="grid grid-cols-5 gap-6 md:col-span-6 md:col-start-7">
          <Reveal variant="img" className="col-span-3 aspect-[3/4] overflow-hidden"><img src={img.cafayateVinedos.src} alt={img.cafayateVinedos.alt} className="h-full w-full object-cover" loading="lazy" /></Reveal>
          <Reveal variant="img" delay={200} className="col-span-2 mt-24 aspect-[3/5] overflow-hidden"><VideoFrame src={video.quebradaPaisaje} label="Paisaje de la Quebrada de Cafayate" /></Reveal>
          <p className="col-span-5 text-xs opacity-50">Fotografías y videos del destino. No corresponden a vistas desde el alojamiento.</p>
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="bg-sand py-32 md:py-40">
      <div className="container-editorial text-center">
        <Reveal as="h2" className="display-serif mx-auto max-w-4xl text-[clamp(40px,6vw,96px)]"><Split>Tu próxima estadía puede ser diferente.</Split></Reveal>
        <Reveal as="p" delay={120} className="mx-auto mt-8 max-w-md text-muted-foreground">Reservá en tu plataforma habitual. La disponibilidad, las tarifas y el pago se gestionan allí.</Reveal>
        <Reveal delay={200} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Magnetic><Link to="/reservas" hash="airbnb" className="btn-solid">Reservar en Airbnb</Link></Magnetic>
          <Magnetic><a href={site.bookingUrl || site.bookingSearchUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">{site.bookingUrl ? "Reservar en Booking" : "Buscar en Booking"} <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} /></a></Magnetic>
          <Link to="/contacto" className="link-line label-meta ml-2">Hacer una consulta</Link>
        </Reveal>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Signature />
      <Tour heading="Caminá por las barricas." stops={tourStops} />
      <Units />
      <Marquee items={["Malbec", "Cabernet", "Rosado", "Cafayate", "Valles Calchaquíes"]} className="bg-paper" />
      <Experience />
      <Destination />
      <Cta />
    </>
  );
}
