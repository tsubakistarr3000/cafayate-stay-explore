import { useEffect, useRef, type ReactNode } from "react";

/** Pinned image that starts inside a barrel-arch mask and expands with scroll. Overlay reads --t (0→1). */
export function BarrelReveal({ src, alt, overlay }: { src: string; alt: string; overlay?: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const w = wrap.current, m = media.current;
    if (!w || !m) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const tick = () => {
      const r = w.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const t = reduce ? 1 : Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      const e = 1 - Math.pow(1 - Math.min(1, t * 1.25), 3);
      const mobile = window.innerWidth < 768;
      const sx = (mobile ? 16 : 33) * (1 - e);
      const sy = (mobile ? 18 : 14) * (1 - e);
      const rad = 50 * (1 - e);
      m.style.clipPath = `inset(${sy}% ${sx}% ${sy}% ${sx}% round ${rad}% ${rad}% 2% 2% / ${rad * 0.6}% ${rad * 0.6}% 2% 2%)`;
      w.style.setProperty("--t", t.toFixed(3));
      const img = m.firstElementChild as HTMLElement | null;
      if (img) img.style.transform = `scale(${1.25 - 0.25 * e})`;
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={wrap} className="relative h-[260vh]" style={{ ["--t" as string]: 0 }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div ref={media} className="absolute inset-0 will-change-[clip-path]">
          <img src={src} alt={alt} className="h-full w-full object-cover" />
        </div>
        {overlay}
      </div>
    </div>
  );
}
