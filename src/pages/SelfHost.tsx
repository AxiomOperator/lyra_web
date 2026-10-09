import { Lock } from "lucide-react";
import { usePage } from "../components/title";
import { CodeBlock, Section } from "../components/ui";

const NEEDS = [
  ["A Linux server", "Any machine you control. lyra is one Rust binary; its databases are embedded."],
  ["A model endpoint", "llama.cpp, vLLM, Ollama, LM Studio or anything OpenAI-compatible. A 20–30B model does real work."],
  ["Optional helper models", "Embedding and reranker (memory search), a small decision model (routing), a vision model (pictures and scans), a fallback."],
  ["A reverse proxy", "For HTTPS to the app (Caddy, nginx, Traefik…). lyra leaves TLS to the proxy you already run."],
];

const STEPS: { title: string; code: string; note: string }[] = [
  { title: "1 · install", code: "# build from source (Rust 1.9x)\ncargo install --path . --locked", note: "One binary: the server, the app and the terminal client." },
  { title: "2 · ~/.lyra/config/config.toml", code: 'url = "http://gpu:8080/v1"\nmodel = "qwen3-30b"\n\n[fallback_model]\nurl = "http://gpu2:8080/v1"\nmodel = "gemma-4"\n\n[web]\nlisten = "0.0.0.0:8484"\npublic_url = "https://lyra.example.org"', note: "Point it at your model. Everything else has sensible defaults." },
  { title: "3 · run it", code: "lyra serve\n# or as a service:\nlyra serve --install", note: "The app is served at your public URL; the terminal client works too (lyra)." },
  { title: "4 · pair your phone", code: "lyra pair\n# shows a code and a QR: open it on your phone", note: "Install the app from the browser; turn on notifications." },
];

/** The pieces and how they connect. */
function Diagram() {
  const box = "rounded-lg border border-line bg-panel px-3 py-2 text-center";
  return (
    <div className="grid gap-3 font-mono text-xs sm:grid-cols-[1fr_auto_1.3fr_auto_1fr] sm:items-center">
      <div className="space-y-2">
        <div className={box}>📱 the app (PWA)</div>
        <div className={box}>⌨ terminal client</div>
      </div>
      <div className="text-center text-dim">⇄ https</div>
      <div className="glow rounded-xl bg-panel p-4 text-center">
        <div className="text-accent">lyra serve</div>
        <div className="mt-2 text-dim">memory · skills · plans · agents</div>
        <div className="text-dim">policy in Rust · ~/.lyra</div>
      </div>
      <div className="text-center text-dim">⇄</div>
      <div className="space-y-2">
        <div className={box}>🧠 your models</div>
        <div className={box}>🖥 nodes on your machines</div>
        <div className={box}>✉ your Microsoft 365</div>
      </div>
    </div>
  );
}

export default function SelfHost() {
  usePage("Self-host", "Run lyra on your own server: what you need, how the pieces fit, and four steps to your first conversation.");
  return (
    <>
      <Section eyebrow="self-host" title="Run lyra on your own server." intro="lyra is built for one owner and their team on a single machine. No cloud account, no external database: a binary, a model, and a folder.">
        <div className="grid gap-4 sm:grid-cols-2">
          {NEEDS.map(([t, d]) => (
            <div key={t} className="rounded-xl border border-line bg-panel p-5">
              <h3 className="font-medium font-mono text-accent text-sm">{t}</h3>
              <p className="mt-2 text-dim text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section eyebrow="how it fits" title="One server in the middle.">
        <Diagram />
      </Section>
      <Section eyebrow="install" title="Four steps to your first conversation.">
        <div className="grid gap-6 lg:grid-cols-2">
          {STEPS.map((s) => (
            <div key={s.title} className="space-y-2">
              <CodeBlock title={s.title} code={s.code} prompt={!s.title.includes(".toml")} />
              <p className="px-1 text-dim text-sm">{s.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-xl border border-line bg-panel p-6">
          <Lock className="size-5 text-dim" />
          <div className="min-w-0 flex-1">
            <h3 className="font-medium">The source</h3>
            <p className="text-dim text-sm">lyra's code isn't public yet. The download and the repository link will be here.</p>
          </div>
          <button type="button" disabled className="cursor-not-allowed rounded-lg border border-line px-4 py-2 font-mono text-dim text-sm">
            get the code · coming soon
          </button>
        </div>
      </Section>
    </>
  );
}
