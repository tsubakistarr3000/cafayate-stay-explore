import { useEffect, useRef } from "react";

/** Muted looping video that only plays while visible. */
export function VideoFrame({ src, poster, label, className = "" }: { src: string; poster?: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.15 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} className={`h-full w-full object-cover ${className}`} />
  );
}
