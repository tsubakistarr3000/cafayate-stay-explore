import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, DoorOpen } from "lucide-react";
import type { Photo } from "@/data/media";

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (n: number) => 1 - Math.pow(1 - clamp(n), 3);

type Props = { exterior: Photo; interior: Photo; videoSrc?: string; interiorVideoSrc?: string };

/** Scroll-scrubbed threshold: exterior footage, a circular mask and the Rosado interior. */
export function ImmersiveEntry({ exterior, interior, videoSrc, interiorVideoSrc }: Props) {
  const wrap = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const interiorVideoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [interiorVideoFailed, setInteriorVideoFailed] = useState(false);
  const hasVideo = Boolean(videoSrc) && !videoFailed;
  const hasInteriorVideo = Boolean(interiorVideoSrc) && !interiorVideoFailed;

  useEffect(() => {
    const w = wrap.current;
    if (!w) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let lastActive = -1;

    const tick = () => {
      const r = w.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      const t = reduce ? 1 : clamp(-r.top / total);
      const open = ease((t - 0.06) / 0.28);
      const enter = ease((t - 0.3) / 0.58);
      const radius = (hasVideo ? 0 : 18) + enter * (hasVideo ? 188 : 170);
      const intro = 1 - clamp(t / 0.16);
      const middle = clamp((t - 0.18) / 0.08) * (1 - clamp((t - 0.43) / 0.1));
      const final = clamp((t - 0.72) / 0.18);
      const nextActive = t < 0.32 ? 0 : t < 0.68 ? 1 : 2;

      w.style.setProperty("--entry", t.toFixed(4));
      w.style.setProperty("--open", open.toFixed(4));
      w.style.setProperty("--enter", enter.toFixed(4));
      w.style.setProperty("--radius", `${radius.toFixed(2)}vmin`);
      w.style.setProperty("--intro", intro.toFixed(3));
      w.style.setProperty("--middle", middle.toFixed(3));
      w.style.setProperty("--final", final.toFixed(3));
      w.style.setProperty("--door-opacity", (1 - clamp((t - 0.36) / 0.1)).toFixed(3));

      if (nextActive !== lastActive) {
        lastActive = nextActive;
        setActive(nextActive);
      }

      const v = videoRef.current;
      if (v && v.readyState >= 1 && Number.isFinite(v.duration)) {
        const target = clamp(t / 0.46) * Math.max(0, v.duration - 0.04);
        if (Math.abs(v.currentTime - target) > 0.035) {
          try { v.currentTime = target; } catch { /* The photo remains as fallback. */ }
        }
      }
      const inner = interiorVideoRef.current;
      if (inner && inner.readyState >= 1 && Number.isFinite(inner.duration)) {
        const target = clamp((t - 0.32) / 0.62) * Math.max(0, inner.duration - 0.04);
        if (Math.abs(inner.currentTime - target) > 0.035) {
          try { inner.currentTime = target; } catch { /* The interior photo remains as fallback. */ }
        }
      }
    };

    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    const v = videoRef.current;
    const inner = interiorVideoRef.current;
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    v?.addEventListener("loadedmetadata", on);
    inner?.addEventListener("loadedmetadata", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      v?.removeEventListener("loadedmetadata", on);
      inner?.removeEventListener("loadedmetadata", on);
      cancelAnimationFrame(raf);
    };
  }, [hasVideo, hasInteriorVideo]);

  const goTo = (progress: number) => {
    const w = wrap.current;
    if (!w) return;
    const top = w.getBoundingClientRect().top + window.scrollY;
    const distance = Math.max(0, w.offsetHeight - window.innerHeight);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + distance * progress, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      ref={wrap}
      className="entry-scroll relative bg-charcoal text-on-dark"
      aria-label="Entrada inmersiva a una barrica"
      style={{
        "--entry": 0,
        "--open": 0,
        "--enter": 0,
        "--radius": hasVideo ? "0vmin" : "18vmin",
        "--intro": 1,
        "--middle": 0,
        "--final": 0,
        "--door-opacity": 1,
      } as CSSProperties}
    >
      <div className="sticky top-0 h-svh min-h-[560px] overflow-hidden">
        <div className="absolute inset-0" style={{ transform: "scale(calc(1 + var(--enter) * 0.22))", opacity: "calc(1 - var(--enter) * 0.72)" }}>
          <img src={exterior.src} alt={exterior.alt} className="absolute inset-0 h-full w-full object-cover" />
          {hasVideo && (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={exterior.src}
              muted
              playsInline
              preload="auto"
              aria-label="La puerta de madera se abre y la cámara avanza hacia la entrada"
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setVideoFailed(true)}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-charcoal/45" style={{ opacity: "calc(0.7 + var(--enter) * 0.3)" }} />

        <div className="absolute inset-0 will-change-[clip-path]" style={{ clipPath: "circle(var(--radius) at 50% 48%)" }}>
          <div className="absolute inset-0 will-change-transform" style={{ transform: "scale(calc(1.32 - var(--enter) * 0.32))" }}>
            <img src={interior.src} alt={interior.alt} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 54%" }} />
            {hasInteriorVideo && (
              <video
                ref={interiorVideoRef}
                src={interiorVideoSrc}
                poster={interior.src}
                muted
                playsInline
                preload="auto"
                aria-label="La cámara avanza dentro de la habitación Rosado"
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setInteriorVideoFailed(true)}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-charcoal/70 via-transparent to-charcoal/10" />
        </div>

        {!hasVideo && (
          <div
            className="entry-door absolute left-1/2 top-[48%] overflow-hidden rounded-full border border-paper/25 bg-wine will-change-transform"
            style={{
              width: "calc(var(--radius) * 2)",
              height: "calc(var(--radius) * 2)",
              backgroundImage: `url(${exterior.src})`,
              backgroundSize: "cover",
              backgroundPosition: "52% 43%",
              transform: "translate(-50%, -50%) perspective(1200px) rotateY(calc(var(--open) * -105deg))",
              transformOrigin: "left center",
              opacity: "var(--door-opacity)",
            }}
            aria-hidden
          >
            <span className="absolute right-[12%] top-1/2 h-2 w-2 rounded-full border border-paper/70 bg-charcoal/40" />
          </div>
        )}

        <div
          className="pointer-events-none absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/40"
          style={{ width: "calc(var(--radius) * 2)", height: "calc(var(--radius) * 2)", opacity: "calc(1 - var(--enter))" }}
          aria-hidden
        />

        <div
          className={`container-editorial absolute inset-x-0 top-0 flex h-full flex-col justify-between py-24 md:py-28 ${active === 0 ? "pointer-events-auto" : "pointer-events-none"}`}
          style={{ opacity: "var(--intro)", transform: "translateY(calc(var(--entry) * -80px))" }}
        >
          <p className="label-meta opacity-75">Video creado a partir de tus fotos</p>
          <div className="max-w-3xl">
            <p className="label-meta mb-5 text-clay">El umbral</p>
            <h2 className="display-serif text-[clamp(46px,8vw,116px)]">Del otro lado,<br /><span className="font-light italic">tu barrica.</span></h2>
            <button type="button" onClick={() => goTo(0.35)} className="btn-light mt-8" data-cursor="Abrir">
              <DoorOpen className="h-4 w-4" strokeWidth={1.25} /> Abrir la puerta
            </button>
          </div>
          <p className="label-meta text-[9px] opacity-65">Deslizá para atravesar el arco</p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[22%] text-center" style={{ opacity: "var(--middle)" }}>
          <p className="label-meta text-on-dark/75">La madera se abre</p>
          <p className="display-serif mt-3 text-4xl md:text-6xl">Cruzá el umbral.</p>
        </div>

        <div className={`container-editorial absolute inset-x-0 bottom-0 pb-16 md:pb-20 ${active === 2 ? "pointer-events-auto" : "pointer-events-none"}`} style={{ opacity: "var(--final)" }}>
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="label-meta mb-4 text-on-dark/75">Rosado · Interior</p>
              <h2 className="display-serif text-[clamp(48px,8vw,112px)]">Ya estás<br /><span className="font-light italic">adentro.</span></h2>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="max-w-sm text-sm opacity-80 md:text-base">La bóveda, los colores y la madera dejan de ser una fachada para convertirse en tu espacio.</p>
              <Link to="/barricas/$slug" params={{ slug: "rosado" }} className="link-line label-meta mt-7">Conocé Rosado <ArrowRight className="h-4 w-4" strokeWidth={1.25} /></Link>
            </div>
          </div>
        </div>

        <div className="absolute right-5 top-1/2 z-10 flex -translate-y-1/2 flex-col items-end gap-4 md:right-9">
          {["La puerta", "El umbral", "Adentro"].map((label, i) => (
            <button key={label} type="button" onClick={() => goTo([0.04, 0.5, 0.94][i]!)} className="group flex items-center gap-3" aria-label={`Ir a ${label}`}>
              <span className={`label-meta hidden text-[9px] transition-opacity md:inline ${active === i ? "opacity-80" : "opacity-0 group-hover:opacity-60"}`}>{label}</span>
              <span className={`h-px transition-all duration-500 ${active === i ? "w-8 bg-clay" : "w-3 bg-on-dark/40"}`} />
            </button>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-on-dark/15">
          <div className="h-full origin-left bg-clay" style={{ transform: "scaleX(var(--entry))" }} />
        </div>
      </div>
    </section>
  );
}
