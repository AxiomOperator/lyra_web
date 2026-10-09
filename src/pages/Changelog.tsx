import { useState } from "react";
import { usePage } from "../components/title";
import { Chip, Section } from "../components/ui";
import changelog from "../data/changelog.json";

type Release = { version: string; date: string; title: string; new?: string[]; improved?: string[]; fixed?: string[] };
type Kind = "new" | "improved" | "fixed";
const KINDS: Kind[] = ["new", "improved", "fixed"];
const TONE = { new: "accent", improved: "dim", fixed: "warn" } as const;

export default function Changelog() {
  usePage("Changelog", "Every lyra release: what's new, improved and fixed.");
  const [only, setOnly] = useState<Kind | null>(null);
  const releases = (changelog as Release[]).filter((r) => !only || (r[only]?.length ?? 0) > 0);
  return (
    <Section eyebrow="changelog" title="Every release." intro="Versions are major.minor.fix.build: a feature moves the minor number, a fix the third, and every build counts.">
      <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs">
        <button type="button" onClick={() => setOnly(null)} className={`rounded-md border px-2.5 py-1 ${only === null ? "border-accent/50 text-accent" : "border-line text-dim"}`}>
          all · {changelog.length}
        </button>
        {KINDS.map((k) => (
          <button key={k} type="button" onClick={() => setOnly(only === k ? null : k)} className={`rounded-md border px-2.5 py-1 ${only === k ? "border-accent/50 text-accent" : "border-line text-dim"}`}>
            {k}
          </button>
        ))}
      </div>
      <ol className="relative space-y-8 border-line border-l pl-6">
        {releases.map((r) => (
          <li key={r.version} className="relative">
            <span className="absolute top-1.5 -left-[29px] size-2.5 rounded-full border border-accent/60 bg-ink" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-sm">
              <span className="text-accent">v{r.version}</span>
              <span className="text-dim text-xs">{r.date}</span>
              <h3 className="font-medium font-sans text-text">{r.title}</h3>
            </div>
            <ul className="mt-3 space-y-2">
              {KINDS.filter((k) => !only || only === k).flatMap((k) =>
                (r[k] ?? []).map((line, i) => (
                  <li key={`${k}-${i}`} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 shrink-0">
                      <Chip tone={TONE[k]}>{k}</Chip>
                    </span>
                    <span className="text-dim">{line}</span>
                  </li>
                )),
              )}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
