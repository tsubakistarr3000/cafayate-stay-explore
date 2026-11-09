import { useEffect, useRef } from "react";

/** Image (or video) that starts inside a barrel-arch mask and expands with scroll. */
export function BarrelReveal({ src, video, alt }: { src?: string; video?: string; alt: string }) {
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
      const e = 1 - Math.pow(1 - t, 3);
      const mobile = window.innerWidth < 768;
      const sx = (mobile ? 14 : 34) * (1 - e);
      const sy = (mobile ? 10 : 12) * (1 - e);
      const rad = 50 * (1 - e);
      m.style.clipPath = `inset(${sy}% ${sx}% ${sy}% ${sx}% round ${rad}% ${rad}% ${rad * 0.1}% ${rad * 0.1}% / ${rad * 0.55}% ${rad * 0.55}% 0% 0%)`;
      m.style.setProperty("--t", e.toFixed(3));
    };
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={wrap} className="relative h-[220vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div ref={media} className="absolute inset-0 will-change-[clip-path]">
          {video ? (
            <video src={video} poster={src} autoPlay muted loop playsInline className="h-full w-full object-cover" aria-label={alt} />
          ) : (
            <img src={src} alt={alt} className="h-full w-full object-cover" />
          )}
        </div>
      </div>
    </div>
  );
}
