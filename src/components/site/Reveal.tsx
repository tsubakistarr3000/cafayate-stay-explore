import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

export function Reveal({
  as: Tag = "div",
  className = "",
  children,
  delay = 0,
  variant = "fade",
  style,
}: {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  delay?: number;
  variant?: "fade" | "img";
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`${variant === "img" ? "reveal-img" : "reveal"} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

/** Small parallax offset (px) based on element position. */
export function useParallax(strength = 60) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const prog = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.transform = `translate3d(0, ${(-prog * strength).toFixed(1)}px, 0)`;
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}
