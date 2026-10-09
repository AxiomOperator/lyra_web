import { Link } from "react-router";
import { usePage } from "../components/title";
import { Window } from "../components/ui";

export default function NotFound() {
  usePage("Not found", "That page isn't here.");
  return (
    <div className="mx-auto max-w-xl px-4 py-24">
      <Window title="lyra — 404">
        <div className="space-y-2 p-5 font-mono text-sm">
          <p>
            <span className="text-accent">❯</span> open {typeof window !== "undefined" ? window.location.pathname : ""}
          </p>
          <p className="text-red-300">error: no such page</p>
          <p className="text-dim">
            try <Link to="/" className="text-accent underline">home</Link> or <Link to="/features" className="text-accent underline">features</Link>
          </p>
        </div>
      </Window>
    </div>
  );
}
