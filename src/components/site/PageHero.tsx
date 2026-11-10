import type { ReactNode } from "react";
import { VideoFrame } from "./VideoFrame";

export function PageHero({ eyebrow, title, subtitle, image, video, alt }: { eyebrow: string; title: ReactNode; subtitle?: string; image: string; video?: string; alt: string }) {
  return (
    <section className="relative h-[86svh] min-h-[540px] overflow-hidden bg-charcoal text-on-dark">
      {video ? <VideoFrame src={video} poster={image} label={alt} /> : <img src={image} alt={alt} className="h-full w-full object-cover animate-kenburns" />}
      <div className="hero-shade absolute inset-0" />
      <div className="container-editorial absolute inset-x-0 bottom-0 pb-14 md:pb-20">
        <p className="label-meta opacity-85">{eyebrow}</p>
        <h1 className="display-serif mt-5 text-[clamp(56px,9vw,140px)]">{title}</h1>
        {subtitle && <p className="mt-5 max-w-lg text-lg opacity-90">{subtitle}</p>}
      </div>
    </section>
  );
}
