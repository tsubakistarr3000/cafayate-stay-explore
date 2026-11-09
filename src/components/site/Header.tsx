import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/barricas", label: "Las Barricas" },
  { to: "/experiencia", label: "La Experiencia" },
  { to: "/cafayate", label: "Cafayate" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || open;
  const tone = solid ? "text-charcoal" : "text-on-dark";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          solid ? "border-b border-border bg-paper/95 backdrop-blur-sm" : "border-b border-transparent"
        }`}
      >
        <div className={`container-editorial flex h-20 items-center justify-between gap-6 ${tone} transition-colors duration-700`}>
          <Link to="/" className="flex min-w-0 flex-col leading-none">
            <span className="display-serif truncate text-2xl">Barricas</span>
            <span className="label-meta mt-1 text-[9px] opacity-80">de Cafayate</span>
          </Link>
          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="text-[13px] tracking-wide opacity-80 transition-opacity hover:opacity-100 data-[status=active]:opacity-100 data-[status=active]:underline data-[status=active]:underline-offset-8"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-5">
            <Link to="/contacto" className="label-meta hidden border-b border-current pb-1 sm:inline-block">
              Consultar
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              <span className={`h-px w-6 bg-current transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-6 bg-current transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-40 bg-paper transition-opacity duration-500 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <nav className="container-editorial flex h-full flex-col justify-center gap-4 pt-20">
          {nav.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              className="display-serif flex items-baseline gap-4 text-5xl text-charcoal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="label-meta text-muted-foreground">0{i + 1}</span>
              {n.label}
            </Link>
          ))}
          <p className="label-meta mt-10 text-muted-foreground">Cafayate · Salta · Argentina</p>
        </nav>
      </div>
    </>
  );
}
