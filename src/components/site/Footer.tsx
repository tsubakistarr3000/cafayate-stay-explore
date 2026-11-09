import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-charcoal text-on-dark">
      <div className="container-editorial grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="display-serif text-6xl md:text-7xl">Barricas</p>
          <p className="label-meta mt-3 opacity-70">de Cafayate</p>
          <p className="mt-10 max-w-sm text-sm opacity-70">Una forma diferente de quedarse en Cafayate.</p>
        </div>
        <div className="md:col-span-3">
          <p className="label-meta mb-5 opacity-50">Explorar</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/barricas" className="opacity-80 hover:opacity-100">Las Barricas</Link></li>
            <li><Link to="/experiencia" className="opacity-80 hover:opacity-100">La Experiencia</Link></li>
            <li><Link to="/cafayate" className="opacity-80 hover:opacity-100">Cafayate</Link></li>
            <li><Link to="/contacto" className="opacity-80 hover:opacity-100">Contacto</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="label-meta mb-5 opacity-50">Ubicación</p>
          <p className="text-sm opacity-80">{site.location}</p>
          <p className="mt-1 text-sm opacity-50">{site.coordinates}</p>
          {site.email && <p className="mt-4 text-sm">{site.email}</p>}
          {site.instagramUrl && (
            <a href={site.instagramUrl} target="_blank" rel="noreferrer" className="mt-2 block text-sm">Instagram</a>
          )}
        </div>
      </div>
      <div className="container-editorial flex flex-col gap-2 border-t border-on-dark/10 py-6 text-xs opacity-50 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Barricas de Cafayate</span>
        <span>Videos de paisaje: Sergey Guk / Pexels</span>
      </div>
    </footer>
  );
}
