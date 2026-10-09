import { useState } from "react";

/** A screenshot of the app (public/shots/<name>.webp), framed; hidden if it isn't there. */
export function Shot({ name, alt, phone = false, className = "" }: { name: string; alt: string; phone?: boolean; className?: string }) {
  const [gone, setGone] = useState(false);
  if (gone) return null;
  return (
    <figure className={`overflow-hidden border border-line bg-panel ${phone ? "rounded-[1.6rem] p-1.5" : ""} ${className}`}>
      <img
        src={`/shots/${name}.webp`}
        alt={alt}
        loading="lazy"
        decoding="async"
        // Their real size: the page doesn't jump while they load.
        width={phone ? 780 : 1600}
        height={phone ? 1688 : 1000}
        onError={() => setGone(true)}
        className={`block h-auto w-full ${phone ? "rounded-[1.2rem]" : ""}`}
      />
    </figure>
  );
}
