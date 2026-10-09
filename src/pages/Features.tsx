import { Check } from "lucide-react";
import { Shot } from "../components/Shot";
import { usePage } from "../components/title";
import { CodeBlock, Section } from "../components/ui";
import { FEATURES } from "../content";

export default function Features() {
  usePage("Features", "What lyra does: chat and agents, memory and skills, plans and goals, your calendar and mail, machines, the app, and teams.");
  return (
    <>
      <Section eyebrow="features" title="Everything an assistant needs around the model." intro="A raw model endpoint is only a component. lyra is the system around it: memory, procedures, planning, tools, permissions, scheduling, a phone app, and a way to get better over time." />
      {/* Jump to a section (sticky on wide screens). */}
      <div className="sticky top-14 z-30 border-line border-y bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 font-mono text-xs [scrollbar-width:none]">
          {FEATURES.map((f) => (
            <a key={f.id} href={`#${f.id}`} className="shrink-0 rounded-md px-2.5 py-1 text-dim hover:bg-panel hover:text-accent">
              {f.title}
            </a>
          ))}
        </div>
      </div>
      {FEATURES.map((f, i) => (
        <Section key={f.id} id={f.id} className="border-line border-b last:border-0">
          <div className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg border border-accent/30 bg-accent/5">
                  <f.icon className="size-4.5 text-accent" />
                </span>
                <span className="font-mono text-dim text-xs">0{i + 1}</span>
              </div>
              <h2 className="mt-5 font-semibold text-2xl tracking-tight sm:text-3xl">{f.title}</h2>
              <p className="mt-3 text-dim leading-relaxed">{f.pitch}</p>
              <ul className="mt-6 space-y-2.5">
                {f.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>{f.snippet ? <CodeBlock title={f.snippet.title} code={f.snippet.code} /> : f.shot ? <Shot name={f.shot} alt={`${f.title} in lyra's app`} phone={f.shot === "phone"} className={f.shot === "phone" ? "mx-auto w-64" : ""} /> : null}</div>
          </div>
        </Section>
      ))}
    </>
  );
}
