import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { accommodations, site } from "@/data/site";
import { img } from "@/data/media";
import { InquiryForm } from "@/components/site/InquiryForm";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y consultas — Barricas de Cafayate" },
      { name: "description", content: "Consultá disponibilidad y tarifas para tu estadía en Barricas de Cafayate, Salta." },
      { property: "og:title", content: "Contacto — Barricas de Cafayate" },
      { property: "og:description", content: "Consultá disponibilidad y tarifas para tu estadía en Cafayate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <section className="grid min-h-svh md:grid-cols-2">
      <div className="relative hidden md:block">
        <img src={img.exteriorNoche.src} alt={img.exteriorNoche.alt} className="sticky top-0 h-svh w-full object-cover" />
      </div>
      <div className="container-editorial pb-24 pt-36 md:max-w-none md:px-16 lg:px-24">
        <p className="label-meta text-muted-foreground">Contacto · Consultas</p>
        <h1 className="display-serif mt-5 text-6xl md:text-7xl">Consultá tu estadía.</h1>
        <p className="mt-6 max-w-md text-muted-foreground">Contanos tus fechas y te respondemos con disponibilidad y tarifa.</p>
        <div className="mt-10 max-w-lg border-y border-border py-6">
          <p className="label-meta text-muted-foreground">¿Ya elegiste tu barrica?</p>
          <a href="/reservas" className="link-line label-meta mt-3">Reservar en Airbnb o Booking <ArrowUpRight className="h-3.5 w-3.5" /></a>
        </div>
        <div className="mt-14 max-w-lg"><InquiryForm /></div>

        <div className="mt-20 grid max-w-lg gap-10 border-t border-border pt-10 sm:grid-cols-2">
          <div>
            <p className="label-meta mb-3 text-muted-foreground">Ubicación</p>
            <p className="text-sm">{site.businessName}<br />{site.location}</p>
            {site.whatsappNumber && <p className="mt-3 text-sm">WhatsApp: +{site.whatsappNumber}</p>}
            {site.email && <p className="text-sm">{site.email}</p>}
          </div>
          <div>
            <p className="label-meta mb-3 text-muted-foreground">Reservar en Airbnb</p>
            <ul className="space-y-2 text-sm">
              {accommodations.filter((a) => a.airbnbUrl).map((a) => (
                <li key={a.id}><a href={a.airbnbUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-terracotta">{a.name} <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.25} /></a></li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">Abre una plataforma externa.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
