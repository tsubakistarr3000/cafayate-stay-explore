import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { accommodations, site } from "@/data/site";
import { img } from "@/data/media";
import { Magnetic, Split } from "@/components/site/Fx";

const bookingHref = site.bookingUrl || site.bookingSearchUrl;
const hasDirectBookingLink = Boolean(site.bookingUrl);

export const Route = createFileRoute("/reservas")({
  head: () => ({
    meta: [
      { title: "Reservas en Airbnb y Booking — Barricas de Cafayate" },
      { name: "description", content: "Elegí Malbec, Cabernet o Rosado y continuá tu reserva en Airbnb o Booking." },
      { property: "og:title", content: "Elegí tu próxima historia — Barricas de Cafayate" },
      { property: "og:description", content: "Elegí tu barrica y continuá la reserva en Airbnb o Booking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reservas,
});

function Reservas() {
  const units = accommodations.filter((a) => a.airbnbUrl);
  const [selectedSlug, setSelectedSlug] = useState(units[0]!.slug);
  const selected = units.find((a) => a.slug === selectedSlug) ?? units[0]!;

  return (
    <>
      <section className="relative min-h-svh overflow-hidden bg-charcoal text-on-dark">
        <div className="absolute inset-0">
          {units.map((unit) => (
            <img
              key={unit.id}
              src={unit.heroImage.src}
              alt={unit.slug === selected.slug ? unit.heroImage.alt : ""}
              aria-hidden={unit.slug !== selected.slug}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${unit.slug === selected.slug ? "opacity-100 animate-kenburns" : "opacity-0"}`}
            />
          ))}
        </div>
        <div className="hero-shade absolute inset-0" />
        <div className="absolute inset-0 bg-charcoal/15 bg-linear-to-r from-charcoal/45 via-charcoal/5 to-transparent" />
        <p aria-hidden="true" className="display-sans pointer-events-none absolute -right-[0.04em] top-[12%] text-[38vw] leading-none text-on-dark/5 md:text-[28vw]">{selected.displayNumber}</p>

        <div className="container-editorial relative flex min-h-svh flex-col pb-8 pt-28 md:pb-12 md:pt-36">
          <p className="label-meta animate-in fade-in slide-in-from-bottom-3 duration-1000">Reservas · Barricas de Cafayate</p>
          <h1 className="display-serif is-in mt-6 max-w-5xl text-[clamp(52px,8vw,128px)]">
            <Split>{"Elegí tu próxima\nhistoria."}</Split>
          </h1>

          <div className="mt-auto grid items-end gap-10 pt-16 md:grid-cols-12">
            <div className="md:col-span-5" aria-live="polite">
              <p className="label-meta opacity-60">Tu barrica · {selected.displayNumber}</p>
              <p key={selected.id} className="display-serif mt-2 animate-in fade-in slide-in-from-bottom-2 text-5xl duration-700 md:text-7xl">{selected.name}</p>
              <p className="mt-3 max-w-sm text-sm opacity-75">{selected.subtitle}</p>
              <Magnetic>
                <a href="#plataformas" className="btn-light mt-7">Continuar con {selected.name} <ArrowDown className="h-4 w-4" strokeWidth={1.25} /></a>
              </Magnetic>
            </div>

            <div className="grid grid-cols-3 gap-3 md:col-span-6 md:col-start-7 md:gap-5" role="group" aria-label="Elegí una barrica">
              {units.map((unit) => {
                const active = unit.slug === selected.slug;
                return (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => setSelectedSlug(unit.slug)}
                    aria-pressed={active}
                    className="group relative min-w-0 border-t border-on-dark/30 pb-1 pt-4 text-left"
                  >
                    <span className={`absolute left-0 top-0 h-px bg-on-dark transition-all duration-700 ${active ? "w-full" : "w-0 group-hover:w-1/2"}`} />
                    <span className="label-meta block text-[9px] opacity-55">{unit.displayNumber}</span>
                    <span className={`mt-2 block truncate text-sm transition-opacity md:text-base ${active ? "opacity-100" : "opacity-55 group-hover:opacity-100"}`}>{unit.name}</span>
                    <span className={`mt-3 flex h-5 w-5 items-center justify-center rounded-full border border-on-dark/40 transition-all ${active ? "bg-on-dark text-charcoal opacity-100" : "opacity-0"}`}>
                      <Check className="h-3 w-3" strokeWidth={1.5} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="plataformas" className="scroll-mt-16 bg-paper">
        <div className="container-editorial pb-14 pt-24 md:pb-20 md:pt-36">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="label-meta text-terracotta">Una barrica elegida. Dos caminos.</p>
              <h2 className="display-serif mt-5 text-[clamp(42px,6vw,88px)]">¿Dónde querés reservar<br /><span className="text-terracotta">{selected.name}?</span></h2>
            </div>
            <div className="md:col-span-3 md:col-start-10">
              <p className="text-sm text-muted-foreground">Te llevamos a la plataforma elegida. Allí vas a ver fechas, tarifas y condiciones actualizadas.</p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-6">
            <span className="label-meta mr-2 text-muted-foreground">Cambiar barrica</span>
            {units.map((unit) => (
              <button key={unit.id} type="button" onClick={() => setSelectedSlug(unit.slug)} aria-pressed={unit.slug === selected.slug} className={`link-line text-sm transition-colors ${unit.slug === selected.slug ? "text-terracotta" : "text-muted-foreground hover:text-foreground"}`}>
                {unit.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          <a
            href={selected.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[560px] overflow-hidden bg-sand p-7 text-charcoal md:min-h-[720px] md:p-12"
            data-cursor="Abrir Airbnb"
            aria-label={`Reservar ${selected.name} en Airbnb (se abre en una pestaña nueva)`}
          >
            <img key={`airbnb-${selected.id}`} src={selected.heroImage.src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-multiply transition-all duration-1000 group-hover:scale-105 group-hover:opacity-40" />
            <div className="absolute inset-0 bg-linear-to-t from-sand via-sand/35 to-transparent" />
            <div className="relative flex w-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="label-meta">01 · Reserva directa</span>
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-charcoal/30 transition-all duration-500 group-hover:rotate-45 group-hover:bg-charcoal group-hover:text-paper"><ArrowUpRight className="h-5 w-5" strokeWidth={1.25} /></span>
              </div>
              <div>
                <p className="display-sans text-[clamp(54px,7vw,112px)] lowercase tracking-[-0.07em]">airbnb</p>
                <div className="mt-8 flex items-end justify-between gap-6 border-t border-charcoal/25 pt-6">
                  <div>
                    <p className="label-meta text-charcoal/60">Tu selección</p>
                    <p className="display-serif mt-2 text-4xl">{selected.name}</p>
                  </div>
                  <span className="label-meta whitespace-nowrap">Reservar ahora</span>
                </div>
              </div>
            </div>
          </a>

          <a
            href={bookingHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[560px] overflow-hidden bg-wine p-7 text-on-dark md:min-h-[720px] md:p-12"
            data-cursor="Abrir Booking"
            aria-label={`${hasDirectBookingLink ? "Reservar" : "Buscar"} Barricas de Cafayate en Booking (se abre en una pestaña nueva)`}
          >
            <img src={img.exteriorNoche.src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-50" />
            <div className="absolute inset-0 bg-linear-to-t from-wine via-wine/35 to-charcoal/20" />
            <div className="relative flex w-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="label-meta">02 · Otra forma de llegar</span>
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-on-dark/40 transition-all duration-500 group-hover:rotate-45 group-hover:bg-paper group-hover:text-charcoal"><ArrowUpRight className="h-5 w-5" strokeWidth={1.25} /></span>
              </div>
              <div>
                <p className="display-serif text-[clamp(54px,6vw,100px)] tracking-[-0.06em]">Booking.com</p>
                <div className="mt-8 flex items-end justify-between gap-6 border-t border-on-dark/25 pt-6">
                  <div>
                    <p className="label-meta opacity-60">Barricas de Cafayate</p>
                    <p className="mt-3 max-w-xs text-sm opacity-75">{hasDirectBookingLink ? "Abrí la ficha del alojamiento." : "Abrí una búsqueda y verificá el nombre del alojamiento."}</p>
                  </div>
                  <span className="label-meta whitespace-nowrap">{hasDirectBookingLink ? "Reservar" : "Buscar"}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <div className="container-editorial grid gap-10 md:grid-cols-12 md:items-center">
          <p className="display-serif text-4xl md:col-span-6 md:text-5xl">El descanso empieza<br />antes de llegar.</p>
          <div className="md:col-span-5 md:col-start-8">
            <p className="text-sm text-muted-foreground">Este sitio no procesa reservas ni pagos. Revisá fechas, tarifas y condiciones en la plataforma antes de confirmar.</p>
            <Link to="/contacto" className="link-line label-meta mt-7"><ArrowLeft className="h-3.5 w-3.5" /> ¿Necesitás ayuda? Consultanos</Link>
          </div>
        </div>
      </section>
    </>
  );
}
