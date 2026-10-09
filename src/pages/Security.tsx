import { HardDrive } from "lucide-react";
import { usePage } from "../components/title";
import { Section } from "../components/ui";
import { GUARANTEES, SECURITY, STAYS_LOCAL } from "../content";

export default function Security() {
  usePage("Security & privacy", "How lyra keeps your data on your server and every important action behind a check in code: local models, approvals, per-person isolation, secrets apart.");
  return (
    <>
      <Section eyebrow="security & privacy" title={<>Your data stays home. <span className="text-gradient">Your yes is required.</span></>} intro="lyra assumes the model will sometimes be wrong. So the guardrails live in compiled code that runs on every call, and the data lives on a machine you control.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY.map((s) => (
            <div key={s.title} className="rounded-xl border border-line bg-panel p-6">
              <s.icon className="size-5 text-accent" />
              <h3 className="mt-4 font-medium">{s.title}</h3>
              <p className="mt-2 text-dim text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="stays on your server" title="What never leaves the building.">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-xl border border-line bg-panel p-6 font-mono text-sm">
            <div className="flex items-center gap-2 text-accent">
              <HardDrive className="size-4" /> ~/.lyra
            </div>
            <ul className="mt-4 space-y-2 text-dim">
              {["config/   settings · secrets (private, not backed up)", "memory/   memories and their history", "skills/   one Markdown file per skill", "sessions/ your conversations", "users/    each person's own files", "actions/  what lyra did, and why"].map((l) => (
                <li key={l} className="whitespace-pre">{l}</li>
              ))}
            </ul>
          </div>
          <ul className="space-y-3">
            {STAYS_LOCAL.map((s) => (
              <li key={s} className="flex gap-3 rounded-lg border border-line px-4 py-3 text-sm">
                <span className="font-mono text-accent">●</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section eyebrow="guarantees" title="Checked in Rust, on every call.">
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-left text-sm">
            <tbody>
              {GUARANTEES.map(([what, how]) => (
                <tr key={what} className="border-line border-b last:border-0">
                  <th className="w-40 bg-panel px-4 py-3 align-top font-medium font-mono text-accent text-xs sm:w-52 sm:text-sm">{what}</th>
                  <td className="px-4 py-3 text-dim leading-relaxed">{how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
