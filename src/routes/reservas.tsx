import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { accommodations, site } from "@/data/site";
import { img } from "@/data/media";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

const bookingHref = site.bookingUrl || site.bookingSearchUrl;
const hasDirectBookingLink = Boolean(site.bookingUrl);

export const Route = createFileRoute("/reservas")({
  head: () => ({
    meta: [
      { title: "Reservas en Airbnb y Booking — Barricas de Cafayate" },
      { name: "description", content: "Reservá Malbec, Cabernet o Rosado en Airbnb, o buscá Barricas de Cafayate en Booking. La reserva se completa en la plataforma elegida." },
      { property: "og:title", content: "Reservá tu estadía — Barricas de Cafayate" },
      { property: "og:description", content: "Elegí tu barrica y continuá la reserva en Airbnb o Booking." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reservas,
});

function Reservas() {
  const airbnbUnits = accommodations.filter((a) => a.airbnbUrl);

  return (
    <>
      <PageHero
        eyebrow="Reservas · Plataformas externas"
        title="Elegí cómo reservar."
        subtitle="Tu estadía empieza acá y se confirma en la plataforma que prefieras."
        image={img.exteriorNoche.src}
        alt={img.exteriorNoche.alt}
      />

      <section className="container-editorial py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="label-meta text-terracotta md:col-span-3">01 · Booking</p>
          <Reveal className="md:col-span-9">
            <a
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-8 border-y border-border py-10 md:grid-cols-[1fr_auto] md:items-center md:py-14"
              data-cursor="Reservar"
            >
              <div>
                <p className="display-serif text-5xl md:text-7xl">Booking.com</p>
                <p className="mt-5 max-w-xl text-muted-foreground">
                  {hasDirectBookingLink
                    ? "Consultá fechas, tarifas y condiciones en la ficha de Barricas de Cafayate."
                    : "Abrí una búsqueda de Barricas de Cafayate en Booking y verificá el nombre del alojamiento antes de reservar."}
                </p>
              </div>
              <span className="btn-ghost w-fit group-hover:bg-charcoal group-hover:text-paper">
                {hasDirectBookingLink ? "Reservar en Booking" : "Buscar en Booking"}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
              </span>
            </a>
          </Reveal>
        </div>

        <div id="airbnb" className="grid scroll-mt-28 gap-10 pt-24 md:grid-cols-12 md:pt-36">
          <div className="md:col-span-3">
            <p className="label-meta text-terracotta">02 · Airbnb</p>
            <p className="mt-5 max-w-xs text-sm text-muted-foreground">Elegí una barrica para abrir su publicación en Airbnb.</p>
          </div>
          <div className="grid gap-10 md:col-span-9 md:grid-cols-3">
            {airbnbUnits.map((a, index) => (
              <Reveal key={a.id} delay={index * 100}>
                <a
                  href={a.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  data-cursor="Reservar"
                  aria-label={`Reservar ${a.name} en Airbnb (se abre en una pestaña nueva)`}
                >
                  <div className="img-zoom aspect-[4/5]">
                    <img src={a.heroImage.src} alt={a.heroImage.alt} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4 border-t border-border pt-5">
                    <div>
                      <p className="label-meta text-muted-foreground">{a.displayNumber} · Airbnb</p>
                      <h2 className="display-serif mt-2 text-4xl">{a.name}</h2>
                    </div>
                    <ArrowUpRight className="mt-2 h-5 w-5 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.25} />
                  </div>
                  <span className="link-line label-meta mt-5">Reservar en Airbnb</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-24">
        <div className="container-editorial grid gap-12 md:grid-cols-12">
          <p className="label-meta text-muted-foreground md:col-span-3">Antes de continuar</p>
          <div className="md:col-span-8">
            <h2 className="display-serif text-4xl md:text-5xl">La reserva se completa fuera de este sitio.</h2>
            <p className="mt-6 max-w-2xl text-muted-foreground">Las fechas, tarifas, condiciones y pagos se gestionan en la plataforma elegida. Revisá allí todos los detalles antes de confirmar.</p>
            <Link to="/contacto" className="link-line label-meta mt-10"><ArrowLeft className="h-3.5 w-3.5" /> ¿Tenés una duda? Consultanos</Link>
          </div>
        </div>
      </section>
    </>
  );
}
