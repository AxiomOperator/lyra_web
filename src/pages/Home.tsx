import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { Shot } from "../components/Shot";
import { TerminalDemo } from "../components/TerminalDemo";
import { usePage } from "../components/title";
import { Chip, Section } from "../components/ui";
import { FEATURES, PRINCIPLES } from "../content";
import release from "../data/latest.json";

const RUNS_ON = ["llama.cpp", "vLLM", "Ollama", "LM Studio", "any OpenAI-compatible endpoint"];

export default function Home() {
  usePage("lyra", "lyra is a self-hosted AI assistant on local models: memory, skills, plans, agents, your Microsoft 365 and machines.");
  const latest = release as { version: string; date: string; title: string; new?: string[]; improved?: string[]; fixed?: string[] };
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-12 sm:pt-24 lg:grid-cols-[1.05fr_1fr]">
        <div className="animate-rise">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-3 py-1 font-mono text-dim text-xs">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_8px] shadow-accent" />
            v{latest.version} · {latest.title}
          </p>
          <h1 className="font-semibold text-4xl leading-[1.08] tracking-tight sm:text-6xl">
            Your own AI assistant,
            <br />
            <span className="text-gradient">on your own hardware.</span>
          </h1>
          <p className="mt-6 max-w-xl text-dim text-lg leading-relaxed">
            lyra runs on your server and your local models. It remembers, learns your procedures, plans, works your calendar and mail, and watches your machines.{" "}
            <span className="text-text">The model proposes; Rust decides.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/self-host" className="glow inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-medium font-mono text-ink text-sm hover:bg-accent-2">
              $ self-host lyra <ArrowRight className="size-4" />
            </Link>
            <Link to="/features" className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-2.5 font-mono text-sm hover:border-accent/50 hover:text-accent">
              see what it does
            </Link>
          </div>
        </div>
        <div className="animate-rise [animation-delay:150ms]">
          <TerminalDemo />
        </div>
      </section>

      {/* Runs on */}
      <div className="border-line border-y bg-panel/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-2 px-4 py-4 font-mono text-dim text-sm">
          <span className="text-accent">runs on</span>
          {RUNS_ON.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
      </div>

      {/* Features */}
      <Section eyebrow="what it does" title="An assistant that actually operates." intro="Not just a chat window: lyra keeps what it learns, runs plans with checks, reads your day, and keeps an eye on your servers at 3 a.m.">
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.slice(0, 6).map((f) => (
            <Link key={f.id} to={`/features#${f.id}`} className="group bg-ink p-6 transition-colors hover:bg-panel">
              <f.icon className="size-5 text-accent" />
              <h3 className="mt-4 font-medium">{f.title}</h3>
              <p className="mt-2 text-dim text-sm leading-relaxed">{f.short}</p>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-dim text-xs group-hover:text-accent">
                more <ChevronRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* The model proposes; Rust decides */}
      <Section eyebrow="the safety model" title={<>The model proposes. <span className="text-gradient">Rust decides.</span></>} intro="Models are fallible: they hallucinate, misuse tools, and sound sure about the wrong thing. So every action that matters passes a check in compiled code that no prompt can talk its way around.">
        <div className="grid items-stretch gap-3 font-mono text-sm md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="rounded-xl border border-line bg-panel p-5">
            <Chip>model</Chip>
            <p className="mt-3 text-text">"send the follow-up to all four attendees"</p>
            <p className="mt-2 text-dim text-xs">mail_send · 4 recipients</p>
          </div>
          <div className="hidden items-center text-dim md:flex">→</div>
          <div className="glow rounded-xl bg-panel p-5">
            <Chip tone="accent">rust policy</Chip>
            <ul className="mt-3 space-y-1 text-xs">
              <li><span className="text-accent">✓</span> tool allowed for this person</li>
              <li><span className="text-accent">✓</span> within the turn's budget</li>
              <li><span className="text-warn">!</span> others will see it: ask first</li>
            </ul>
          </div>
          <div className="hidden items-center text-dim md:flex">→</div>
          <div className="rounded-xl border border-warn/40 bg-warn/5 p-5">
            <Chip tone="warn">waits for you</Chip>
            <p className="mt-3 text-text">Allow · Deny</p>
            <p className="mt-2 text-dim text-xs">on your phone, with exactly what will be sent</p>
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.slice(1).map((p) => (
            <div key={p.title}>
              <p.icon className="size-4 text-accent" />
              <h3 className="mt-3 font-medium text-sm">{p.title}</h3>
              <p className="mt-1.5 text-dim text-sm leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The app */}
      <Section eyebrow="the app" title="On your desktop and in your pocket." intro="lyra serves an installable app: chat, approvals, your day, your machines. Push notifications you can answer in place, and a queue that keeps your messages on a bad connection.">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_17rem]">
          <Shot name="desktop" alt="lyra's app on a desktop: a conversation with tool calls" />
          <Shot name="phone" alt="lyra's app on a phone" phone className="mx-auto w-64 lg:w-full" />
        </div>
      </Section>

      {/* Latest release */}
      <Section eyebrow="latest release">
        <Link to="/changelog" className="block rounded-xl border border-line bg-panel p-6 font-mono transition-colors hover:border-accent/40">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-accent">v{latest.version}</span>
            <span className="text-dim">{latest.date}</span>
            <span className="font-sans font-medium text-text">{latest.title}</span>
          </div>
          <p className="mt-3 font-sans text-dim text-sm leading-relaxed">{(latest.new ?? latest.improved ?? latest.fixed ?? [])[0]}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-dim text-xs">every release <ChevronRight className="size-3" /></span>
        </Link>
      </Section>

      {/* Call to action */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="glow relative overflow-hidden rounded-2xl bg-panel px-6 py-12 text-center sm:px-12">
          <div className="grid-bg absolute inset-0 -z-0 opacity-60" aria-hidden />
          <div className="relative">
            <h2 className="font-semibold text-3xl tracking-tight">Run it yourself.</h2>
            <p className="mx-auto mt-3 max-w-lg text-dim">One Linux server, a model you trust, and an afternoon. Everything lyra keeps stays in one folder you control.</p>
            <Link to="/self-host" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-medium font-mono text-ink text-sm hover:bg-accent-2">
              $ get started <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
