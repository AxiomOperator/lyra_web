import { Link } from "react-router";
import latest from "../data/latest.json";

const COLS: [string, [string, string][]][] = [
  ["Product", [["/features", "Features"], ["/security", "Security & privacy"], ["/changelog", "Changelog"]]],
  ["Run it", [["/self-host", "Self-host"], ["/self-host#install", "Install"], ["/self-host#fits", "How it fits"]]],
];

export function Footer() {
  return (
    <footer className="relative z-20 border-line border-t bg-ink">
      <div className="mx-auto grid max-w-[60rem] gap-10 px-4 py-14 text-sm sm:grid-cols-[1.5fr_1fr_1fr] sm:px-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-semibold">
            <img src="/logo.png" alt="" className="size-6 rounded" width={24} height={24} />
            lyra
          </div>
          <p className="max-w-xs text-dim">A self-hosted AI assistant on local models. The model proposes; Rust decides.</p>
        </div>
        {COLS.map(([title, links]) => (
          <div key={title} className="space-y-2.5">
            <div className="font-mono text-faint text-xs uppercase tracking-[0.14em]">{title}</div>
            {links.map(([to, text]) => (
              <Link key={to} className="block text-dim hover:text-text" to={to}>
                {text}
              </Link>
            ))}
            {title === "Run it" && <span className="block text-faint">Source: coming soon</span>}
          </div>
        ))}
      </div>
      <div className="border-line border-t">
        <div className="mx-auto flex max-w-[60rem] flex-wrap justify-between gap-2 px-4 py-4 font-mono text-faint text-xs sm:px-12">
          <span>self-hosted · local models · your data</span>
          <span>v{latest.version}</span>
        </div>
      </div>
    </footer>
  );
}
