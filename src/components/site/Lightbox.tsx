import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/data/media";

export function Lightbox({ photos, index, onClose }: { photos: Photo[]; index: number | null; onClose: () => void }) {
  const [i, setI] = useState(index ?? 0);
  const touch = useRef<number | null>(null);
  useEffect(() => { if (index !== null) setI(index); }, [index]);
  useEffect(() => {
    if (index === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => (v + 1) % photos.length);
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", on);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", on); document.body.style.overflow = ""; };
  }, [index, photos.length, onClose]);
  if (index === null) return null;
  const ph = photos[i];
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galería de fotos"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/95 text-on-dark animate-in fade-in duration-300"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 40) setI((v) => (v + (dx < 0 ? 1 : -1) + photos.length) % photos.length);
        touch.current = null;
      }}
    >
      <button onClick={onClose} aria-label="Cerrar" className="absolute right-5 top-5 p-2"><X className="h-6 w-6" strokeWidth={1} /></button>
      <button onClick={() => setI((v) => (v - 1 + photos.length) % photos.length)} aria-label="Anterior" className="absolute left-3 p-3 md:left-8"><ChevronLeft className="h-8 w-8" strokeWidth={1} /></button>
      <figure className="flex max-h-[86vh] max-w-[86vw] flex-col items-center">
        <img key={ph.src} src={ph.src} alt={ph.alt} className="max-h-[78vh] w-auto object-contain animate-in fade-in duration-500" />
        <figcaption className="mt-4 flex gap-6 text-xs opacity-70"><span className="label-meta">{String(i + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>{ph.alt}</figcaption>
      </figure>
      <button onClick={() => setI((v) => (v + 1) % photos.length)} aria-label="Siguiente" className="absolute right-3 p-3 md:right-8"><ChevronRight className="h-8 w-8" strokeWidth={1} /></button>
    </div>
  );
}
