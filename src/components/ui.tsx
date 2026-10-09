import { Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";

/** A page section: a small code-comment eyebrow, a title and an intro. */
export function Section({ id, eyebrow, title, intro, children, className = "" }: { id?: string; eyebrow?: string; title?: ReactNode; intro?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:py-20 ${className}`}>
      {eyebrow && <p className="mb-3 font-mono text-accent text-xs uppercase tracking-[0.2em]">// {eyebrow}</p>}
      {title && <h2 className="max-w-3xl font-semibold text-3xl tracking-tight sm:text-4xl">{title}</h2>}
      {intro && <p className="mt-4 max-w-2xl text-dim text-lg leading-relaxed">{intro}</p>}
      {children && <div className={title || intro ? "mt-10" : ""}>{children}</div>}
    </section>
  );
}

const TONES = {
  accent: "border-accent/40 text-accent bg-accent/5",
  warn: "border-warn/40 text-warn bg-warn/5",
  dim: "border-line text-dim",
  red: "border-red-400/40 text-red-300 bg-red-400/5",
};

/** A small label: `new`, `fixed`, `local`. */
export function Chip({ children, tone = "dim" }: { children: ReactNode; tone?: keyof typeof TONES }) {
  return <span className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[11px] leading-none ${TONES[tone]}`}>{children}</span>;
}

/** A terminal window: the frame every demo and command sits in. */
export function Window({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-black/50 ${className}`}>
      <div className="flex items-center gap-2 border-line border-b bg-panel-2 px-3 py-2">
        <span className="size-2.5 rounded-full bg-red-400/70" />
        <span className="size-2.5 rounded-full bg-warn/70" />
        <span className="size-2.5 rounded-full bg-accent/70" />
        <span className="ml-2 truncate font-mono text-dim text-xs">{title}</span>
      </div>
      {children}
    </div>
  );
}

/** Commands or a file, in a window, with a copy button. */
export function CodeBlock({ title, code, prompt = false }: { title: string; code: string; prompt?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <Window title={title} className="relative">
      <button type="button" onClick={copy} className="absolute top-1.5 right-2 rounded p-1 text-dim hover:text-text" aria-label="Copy">
        {copied ? <Check className="size-3.5 text-accent" /> : <Copy className="size-3.5" />}
      </button>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        {code.split("\n").map((line, i) => (
          <div key={i}>
            {prompt && !line.startsWith("#") && line.trim() ? <span className="select-none text-accent">$ </span> : null}
            <span className={line.trim().startsWith("#") ? "text-dim" : "text-text"}>{line || " "}</span>
          </div>
        ))}
      </pre>
    </Window>
  );
}
