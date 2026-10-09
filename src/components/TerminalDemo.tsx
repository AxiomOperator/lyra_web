import { useEffect, useState } from "react";
import { Window } from "./ui";

// A scripted conversation, typed out: a question, the tools lyra uses, the
// answer, and the approval it waits for before anything others would see.
type Line =
  | { kind: "you"; text: string }
  | { kind: "tool"; name: string; detail: string }
  | { kind: "lyra"; text: string }
  | { kind: "ask"; text: string };

const SCRIPT: Line[] = [
  { kind: "you", text: "find 30 minutes with the network team this week and send the invite" },
  { kind: "tool", name: "calendar_free", detail: "4 people · Mon–Fri · working hours" },
  { kind: "tool", name: "memory_recall", detail: "“network team” → 3 people" },
  { kind: "lyra", text: "Everyone is free Wednesday 10:30–11:00 or Thursday 14:00–14:30. I've drafted the invite for Wednesday." },
  { kind: "ask", text: "calendar_invite · 3 attendees will see this" },
];

const STEP_MS = 900;
const QUESTION = (SCRIPT[0] as { text: string }).text;

export function TerminalDemo() {
  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [shown, setShown] = useState(reduce ? SCRIPT.length : 0);
  const [typed, setTyped] = useState(reduce ? QUESTION.length : 0);

  // Type the question, then bring the rest in one by one, then start over.
  useEffect(() => {
    if (reduce) return;
    if (shown === 0) {
      if (typed < QUESTION.length) {
        const t = setTimeout(() => setTyped(typed + 1), 28);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setShown(1), 350);
      return () => clearTimeout(t);
    }
    if (shown < SCRIPT.length) {
      const t = setTimeout(() => setShown(shown + 1), STEP_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setShown(0);
      setTyped(0);
    }, 6000);
    return () => clearTimeout(t);
  }, [shown, typed, reduce]);

  return (
    <Window title="lyra — chat" className="text-left">
      <div className="min-h-[22rem] space-y-3 p-4 font-mono text-[13px] leading-relaxed sm:p-5">
        <div className="flex gap-2">
          <span className="text-accent">❯</span>
          <span className="text-text">
            {QUESTION.slice(0, shown > 0 ? undefined : typed)}
            {shown === 0 && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" />}
          </span>
        </div>
        {SCRIPT.slice(1, shown).map((l, i) => (
          <div key={i} className="animate-rise">
            {l.kind === "tool" && (
              <div className="flex flex-wrap items-center gap-2 rounded-md border border-line bg-panel-2 px-3 py-1.5 text-xs">
                <span className="text-accent">✓</span>
                <span className="text-text">{l.name}</span>
                <span className="text-dim">{l.detail}</span>
              </div>
            )}
            {l.kind === "lyra" && <p className="text-text/90 font-sans text-sm">{l.text}</p>}
            {l.kind === "ask" && (
              <div className="rounded-md border border-warn/40 bg-warn/5 px-3 py-2 text-xs">
                <div className="text-warn">⚠ waits for your yes</div>
                <div className="mt-1 text-dim">{l.text}</div>
                <div className="mt-2 flex gap-2">
                  <span className="rounded border border-accent/50 px-2 py-0.5 text-accent">Allow</span>
                  <span className="rounded border border-line px-2 py-0.5 text-dim">Deny</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Window>
  );
}
