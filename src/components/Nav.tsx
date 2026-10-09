import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

const LINKS = [
  { to: "/features", label: "Features" },
  { to: "/security", label: "Security" },
  { to: "/self-host", label: "Self-host" },
  { to: "/changelog", label: "Changelog" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const link = ({ isActive }: { isActive: boolean }) => `px-3 py-1.5 font-mono text-[13.5px] transition-colors ${isActive ? "text-accent" : "text-text/80 hover:text-text"}`;
  return (
    <header className="sticky top-0 z-40 border-line border-b bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-[90rem] items-center gap-2 px-4 sm:px-6" aria-label="Main">
        <Link to="/" className="flex items-center gap-2 font-mono font-semibold text-text">
          <img src="/logo.png" alt="" className="size-7 rounded-md" width={28} height={28} />
          lyra
        </Link>
        <div className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={link}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/self-host" className="ml-3 rounded-[5px] bg-accent px-3.5 py-1.5 font-medium font-mono text-[13px] text-ink hover:bg-accent-2">
            Get started
          </Link>
        </div>
        <button type="button" className="ml-auto rounded-md p-2 text-dim hover:text-text md:hidden" aria-label={open ? "Close the menu" : "Open the menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-line border-t bg-ink px-4 py-2 md:hidden">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `block rounded-md px-2 py-2 font-mono text-sm ${isActive ? "text-accent" : "text-dim"}`}>
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
