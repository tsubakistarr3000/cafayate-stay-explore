import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/data/media";

export type TourStop = { title: string; text: string; photo: Photo; tag?: string };

/** Pinned horizontal journey: vertical scroll moves panels sideways. */
export function Tour({ stops, heading }: { stops: TourStop[]; heading: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const w = wrap.current, tr = track.current;
    if (!w || !tr) return;
    let raf = 0;
    const tick = () => {
      const r = w.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const t = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      const max = tr.scrollWidth - window.innerWidth;
      tr.style.transform = `translate3d(${-t * max}px,0,0)`;
      setActive(Math.min(stops.length - 1, Math.round(t * (stops.length - 1))));
      tr.querySelectorAll<HTMLElement>("[data-par]").forEach((el) => {
        const b = el.parentElement!.getBoundingClientRect();
        const c = (b.left + b.width / 2 - window.innerWidth / 2) / window.innerWidth;
        el.style.transform = `translate3d(${c * -60}px,0,0) scale(1.15)`;
      });
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [stops.length]);

  return (
    <section ref={wrap} className="relative bg-charcoal text-on-dark" style={{ height: `${stops.length * 70 + 60}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-24">
        <div className="container-editorial flex items-end justify-between gap-6 pb-6">
          <div className="min-w-0">
            <p className="label-meta opacity-60">El recorrido</p>
            <h2 className="display-serif mt-2 text-3xl md:text-5xl">{heading}</h2>
          </div>
          <div className="shrink-0 text-right">
            <p className="display-serif text-4xl md:text-6xl">{String(active + 1).padStart(2, "0")}<span className="text-lg opacity-40"> / {String(stops.length).padStart(2, "0")}</span></p>
          </div>
        </div>
        <div className="container-editorial pb-6">
          <div className="flex gap-1">
            {stops.map((_, i) => <span key={i} className={`h-px flex-1 transition-colors duration-500 ${i <= active ? "bg-clay" : "bg-on-dark/20"}`} />)}
          </div>
        </div>
        <div ref={track} className="flex flex-1 items-stretch gap-6 pb-10 pl-5 pr-[20vw] will-change-transform md:gap-10 md:pl-20">
          {stops.map((s, i) => (
            <figure key={s.title} className={`relative flex w-[78vw] shrink-0 flex-col transition-opacity duration-700 md:w-[46vw] ${i === active ? "opacity-100" : "opacity-50"}`}>
              <div className={`relative min-h-0 flex-1 overflow-hidden ${i % 3 === 1 ? "barrel-arch" : ""}`} data-cursor="Recorrer">
                <img data-par src={s.photo.src} alt={s.photo.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                {s.tag && <span className="label-meta absolute left-4 top-4 bg-paper px-3 py-2 text-[10px] text-charcoal">{s.tag}</span>}
              </div>
              <figcaption className="mt-5 grid grid-cols-[auto_1fr] gap-x-5">
                <span className="label-meta pt-1 text-clay">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-lg font-medium md:text-xl">{s.title}</span>
                  <span className="mt-1 block max-w-md text-sm opacity-65">{s.text}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
