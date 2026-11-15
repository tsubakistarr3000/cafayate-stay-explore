import { useEffect, useRef, useState, type ReactNode } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div ref={ref} className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left scale-x-0 bg-terracotta" />;
}

/** Desktop cursor: small dot that grows into a label over elements with data-cursor. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setOn(true);
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(t ? t.dataset.cursor ?? "" : null);
    };
    const loop = () => {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  if (!on) return null;
  const big = label !== null;
  return (
    <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block">
      <div className={`flex items-center justify-center rounded-full transition-all duration-500 ${big ? "h-24 w-24 bg-paper/90 text-charcoal backdrop-blur-sm" : "h-2 w-2 bg-terracotta"}`}>
        {big && <span className="label-meta text-[10px]">{label}</span>}
      </div>
    </div>
  );
}

export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y border-border py-6 ${className}`} aria-hidden>
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="display-serif flex items-center gap-12 text-4xl md:text-6xl">
            {t}<span className="inline-block h-3 w-3 rounded-t-full bg-terracotta" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Splits text into words that slide up when the parent .reveal gets .is-in */
export function Split({ children, step = 60 }: { children: string; step?: number }) {
  return (
    <>
      {children.split(/(\n| )/).map((w, i) =>
        w === "\n" ? <br key={i} /> : w === " " ? " " : (
          <span key={i} className="split-word"><span style={{ transitionDelay: `${i * step / 2}ms` }}>{w}</span></span>
        ),
      )}
    </>
  );
}

/** Element that follows the mouse slightly (magnetic). */
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-500 ${className}`}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      }}
      onMouseLeave={() => { ref.current!.style.transform = ""; }}
    >
      {children}
    </span>
  );
}
