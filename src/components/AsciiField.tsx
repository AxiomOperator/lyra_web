import { useEffect, useRef, useState } from "react";

// The hero's backdrop: a field of characters forming slow rings and arcs
// around the logo, like a signal spreading out. Sized to its box; still for
// people who prefer less motion.
const RAMP = " .:-=+x*X#";

function frame(cols: number, rows: number, t: number): string {
  const cx = cols / 2;
  const cy = rows * 0.62;
  let out = "";
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // Characters are about twice as tall as wide.
      const dx = (x - cx) / cols;
      const dy = ((y - cy) * 2.1) / cols;
      const r = Math.hypot(dx, dy);
      const a = Math.atan2(dy, dx);
      // Rings moving outward, brighter in two wings, fading at the edges.
      const ring = 0.5 + 0.5 * Math.sin(r * 38 - t * 1.3);
      const wings = 0.35 + 0.65 * Math.pow(Math.abs(Math.cos(a + Math.sin(t * 0.25) * 0.3)), 1.5);
      const fade = Math.max(0, 1 - r * 1.9) * Math.min(1, r * 7);
      // A little shimmer, so the field never sits still.
      const shimmer = 0.85 + 0.15 * Math.sin(x * 0.37 + y * 0.53 + t * 2.1);
      const v = ring * ring * wings * fade * shimmer;
      out += RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))];
    }
    out += "\n";
  }
  return out;
}

export function AsciiField({ rows = 22 }: { rows?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(140);
  const [text, setText] = useState(() => frame(140, rows, 0));
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setCols(Math.max(40, Math.floor(el.clientWidth / 6.6)));
    fit();
    const seen = new ResizeObserver(fit);
    seen.observe(el);
    return () => seen.disconnect();
  }, []);
  useEffect(() => {
    const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      setText(frame(cols, rows, 2));
      return;
    }
    let raf = 0;
    let last = 0;
    const start = performance.now();
    const tick = (now: number) => {
      // About 14 frames a second is plenty for characters.
      if (now - last > 70) {
        last = now;
        setText(frame(cols, rows, (now - start) / 1000));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cols, rows]);
  return (
    <div ref={box} className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" aria-hidden>
      <pre className="mx-auto w-max select-none font-mono text-[11px] text-accent/35 leading-[13px]">{text}</pre>
    </div>
  );
}
