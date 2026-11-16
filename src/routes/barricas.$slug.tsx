import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { accommodations, getAccommodation, site } from "@/data/site";
import { Lightbox } from "@/components/site/Lightbox";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/barricas/$slug")({
  loader: ({ params }) => {
    const a = getAccommodation(params.slug);
    if (!a) throw notFound();
    return { slug: a.slug };
  },
  head: ({ loaderData }) => {
    const a = loaderData ? getAccommodation(loaderData.slug) : undefined;
    if (!a) return { meta: [{ title: "Barrica no encontrada" }, { name: "robots", content: "noindex" }] };
    const t = `${a.name} — Barricas de Cafayate`;
    return {
      meta: [
        { title: t },
        { name: "description", content: a.description },
        { property: "og:title", content: t },
        { property: "og:description", content: a.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial py-48 text-center">
      <h1 className="display-serif text-6xl">Barrica no encontrada</h1>
      <Link to="/barricas" className="link-line label-meta mt-10">Ver todas las barricas</Link>
    </div>
  ),
  component: Unit,
});

function Unit() {
  const { slug } = Route.useLoaderData();
  const a = getAccommodation(slug)!;
  const [open, setOpen] = useState<number | null>(null);
  const others = accommodations.filter((o) => o.slug !== a.slug);
  const g = a.gallery;

  return (
    <>
      <section className="relative h-[88svh] min-h-[560px] overflow-hidden bg-charcoal text-on-dark">
        <img src={a.heroImage.src} alt={a.heroImage.alt} className="h-full w-full object-cover animate-kenburns" />
        <div className="hero-shade absolute inset-0" />
        <div className="container-editorial absolute inset-x-0 bottom-0 pb-14">
          <nav aria-label="Ruta" className="label-meta mb-8 flex gap-3 text-[10px] opacity-75">
            <Link to="/">Inicio</Link><span>/</span><Link to="/barricas">Las Barricas</Link><span>/</span><span>{a.name}</span>
          </nav>
          <p className="label-meta">{a.displayNumber} / 04</p>
          <h1 className="display-sans mt-3 text-[clamp(64px,12vw,200px)] uppercase leading-[0.82]">{a.name}</h1>
          {a.provisional && <p className="label-meta mt-4 inline-block bg-paper px-3 py-2 text-charcoal">Nombre e imágenes provisorios</p>}
        </div>
      </section>

      <section className="container-editorial grid gap-12 py-24 md:grid-cols-12">
        <p className="label-meta text-muted-foreground md:col-span-3">{a.subtitle}</p>
        <Reveal as="p" className="text-2xl leading-snug md:col-span-7 md:text-3xl">{a.description}</Reveal>
      </section>

      <section className="container-editorial grid gap-4 md:grid-cols-12 md:gap-6">
        {g.map((ph, k) => {
          const span = ["md:col-span-7 aspect-[4/3]", "md:col-span-5 aspect-[4/5] md:mt-24", "md:col-span-4 aspect-[3/4]", "md:col-span-4 aspect-[3/4] md:mt-16", "md:col-span-4 aspect-[3/4]", "md:col-span-6 md:col-start-4 aspect-[4/3]"][k % 6];
          return (
            <button key={ph.src} onClick={() => setOpen(k)} className={`img-zoom relative block ${span}`} data-cursor="Ampliar" aria-label={`Ampliar: ${ph.alt}`}>
              <img src={ph.src} alt={ph.alt} className="h-full w-full object-cover" loading="lazy" />
            </button>
          );
        })}
      </section>
      <Lightbox photos={g} index={open} onClose={() => setOpen(null)} />

      <section className="container-editorial grid gap-16 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-6">
          <p className="label-meta text-terracotta">Información práctica</p>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            {[
              ["Huéspedes", `Hasta ${a.maxGuests}${a.capacityConfirmed ? "" : " (a confirmar)"}`],
              ["Camas", a.bedConfiguration],
              ["En la barrica", a.privateAmenities.join(" · ")],
              ["Compartido", a.sharedAmenities.join(" · ")],
              ...(site.checkInTime ? [["Ingreso / salida", `${site.checkInTime} / ${site.checkOutTime}`]] : []),
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_1fr] gap-6 py-5 text-sm"><dt className="label-meta text-muted-foreground">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">Las comodidades pueden variar. Confirmá los detalles al consultar.</p>
        </div>
        <aside className="bg-ivory p-8 md:col-span-5 md:col-start-8 md:p-12">
          <p className="label-meta text-muted-foreground">Consulta directa</p>
          <h2 className="display-serif mb-8 mt-3 text-4xl">Reservar {a.name}</h2>
          <InquiryForm defaultUnit={a.name} compact />
          {a.airbnbUrl && (
            <div className="mt-8 border-t border-border pt-6">
              <p className="mb-3 text-xs text-muted-foreground">También podés reservar a través de una plataforma externa:</p>
              <a href={a.airbnbUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">Ver en Airbnb <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} /></a>
            </div>
          )}
        </aside>
      </section>

      <section className="border-t border-border bg-paper py-24">
        <div className="container-editorial">
          <p className="label-meta text-muted-foreground">Otras barricas</p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.id} to="/barricas/$slug" params={{ slug: o.slug }} className="group block">
                <div className="img-zoom aspect-[4/3]"><img src={o.heroImage.src} alt={o.heroImage.alt} className="h-full w-full object-cover" loading="lazy" /></div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className={`display-serif text-4xl ${o.provisional ? "text-muted-foreground" : ""}`}>{o.name}</h3>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.25} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
