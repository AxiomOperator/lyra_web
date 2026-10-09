import { Link } from "react-router";
import latest from "../data/latest.json";

export function Footer() {
  return (
    <footer className="mt-24 border-line border-t">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-[1fr_auto_auto]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono font-semibold">
            <img src="/logo.png" alt="" className="size-6 rounded" width={24} height={24} />
            lyra
          </div>
          <p className="max-w-sm text-dim">A self-hosted AI assistant on local models. The model proposes; Rust decides.</p>
          <p className="font-mono text-dim text-xs">v{latest.version}</p>
        </div>
        <div className="space-y-2">
          <div className="font-mono text-dim text-xs uppercase tracking-wider">Product</div>
          <Link className="block hover:text-accent" to="/features">Features</Link>
          <Link className="block hover:text-accent" to="/security">Security & privacy</Link>
          <Link className="block hover:text-accent" to="/changelog">Changelog</Link>
        </div>
        <div className="space-y-2">
          <div className="font-mono text-dim text-xs uppercase tracking-wider">Run it</div>
          <Link className="block hover:text-accent" to="/self-host">Self-host</Link>
          <span className="block text-dim">Source: coming soon</span>
        </div>
      </div>
    </footer>
  );
}
