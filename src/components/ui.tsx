import { ArrowRight, Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router";

/** A page section in the frame: a label (with a link on the right), a title, an intro. */
export function Section({ id, label, link, title, intro, children, className = "", dots = false }: { id?: string; label?: string; link?: { to: string; text: string }; title?: ReactNode; intro?: ReactNode; children?: ReactNode; className?: string; dots?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-16 border-line border-b ${dots ? "dots" : ""} ${className}`}>
      <div className="mx-auto max-w-[60rem] px-4 py-16 sm:px-12 sm:py-20">
        {(label || link) && (
          <div className="mb-6 flex items-baseline justify-between gap-4">
            {label && <p className="label">{label}</p>}
            {link && (
              <Link to={link.to} className="inline-flex items-center gap-1 font-mono text-dim text-sm hover:text-text">
                {link.text} <ArrowRight className="size-3.5" />
              </Link>
            )}
          </div>
        )}
        {title && <h2 className="max-w-3xl font-semibold text-3xl leading-tight tracking-tight sm:text-[2.6rem]">{title}</h2>}
        {intro && <p className="mt-4 max-w-2xl text-dim text-lg leading-relaxed">{intro}</p>}
        {children && <div className={title || intro ? "mt-10" : ""}>{children}</div>}
      </div>
    </section>
  );
}

/** Square cells sharing thin rules (the grid every list sits in). */
export function Cells({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 }) {
  return <div className={`grid border-line border-t border-l ${cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"} [&>*]:border-line [&>*]:border-r [&>*]:border-b`}>{children}</div>;
}

/** One cell: an icon, an uppercase mono title in the accent, the text. */
export function Cell({ icon: Icon, title, children, to }: { icon?: React.ComponentType<{ className?: string }>; title: string; children: ReactNode; to?: string }) {
  const body = (
    <>
      {Icon && <Icon className="size-5 text-text/80" />}
      <h3 className="label mt-4 text-[12.5px]">{title}</h3>
      <div className="mt-3 text-[15px] text-dim leading-relaxed">{children}</div>
    </>
  );
  return to ? (
    <Link to={to} className="block p-6 transition-colors hover:bg-panel">
      {body}
    </Link>
  ) : (
    <div className="p-6">{body}</div>
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
  return <span className={`inline-flex items-center rounded-[3px] border px-1.5 py-0.5 font-mono text-[11px] leading-none ${TONES[tone]}`}>{children}</span>;
}

/** Buttons: the accent one, and the outlined ones, in mono. */
export function Button({ to, children, solid = false }: { to: string; children: ReactNode; solid?: boolean }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 rounded-[5px] px-6 py-3 font-medium font-mono text-sm transition-colors ${solid ? "bg-accent text-ink hover:bg-accent-2" : "border border-line text-text hover:border-text/40"}`}
    >
      {children}
    </Link>
  );
}

/** A terminal window: the frame every demo and command sits in. */
export function Window({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden border border-line bg-panel ${className}`}>
      <div className="flex items-center gap-2 border-line border-b bg-panel-2 px-3 py-2">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-2 truncate font-mono text-dim text-xs">{title}</span>
      </div>
      {children}
    </div>
  );
}

/** Commands or a file, with a copy button. */
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
            <span className={line.trim().startsWith("#") ? "text-faint" : "text-text"}>{line || " "}</span>
          </div>
        ))}
      </pre>
    </Window>
  );
}
