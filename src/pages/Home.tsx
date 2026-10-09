import { ArrowRight, Boxes, Cloud, Cpu, FileText, GitBranch, HardDrive, KeyRound, Mail, MessagesSquare, Monitor, Plug, Server, Smartphone, Terminal, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { AsciiField } from "../components/AsciiField";
import { Shot } from "../components/Shot";
import { TerminalDemo } from "../components/TerminalDemo";
import { usePage } from "../components/title";
import { Button, Cell, Cells, Chip, CodeBlock, Section } from "../components/ui";
import { FEATURES } from "../content";
import release from "../data/latest.json";

const QUICK: Record<string, { label: string; title: string; text: string; code: string; where: string }> = {
  server: { label: "Server", title: "On your server", text: "One Rust binary: the server, the app and the terminal client. Point it at your model and run it.", code: "cargo install --path . --locked\nlyra serve --install\n# the app is at your public URL; pair a phone next", where: "your server" },
  phone: { label: "Phone", title: "On your phone", text: "Pair a phone or browser with a one-time code, install the app from the browser, and turn on notifications.", code: "lyra pair\n# open the link (or scan the QR) on your phone", where: "your server" },
  machines: { label: "Your machines", title: "On every machine", text: "A small node lends lyra a machine's system tools over an outbound connection. Linux and Windows.", code: "curl -fsSL https://lyra.example.org/install.sh | sh\n# pairs itself; changes still wait for your yes", where: "each machine" },
};

const WORKS_WITH = [
  { icon: Cpu, name: "llama.cpp" },
  { icon: Boxes, name: "vLLM" },
  { icon: HardDrive, name: "Ollama" },
  { icon: Monitor, name: "LM Studio" },
  { icon: Mail, name: "Outlook" },
  { icon: MessagesSquare, name: "Teams" },
  { icon: Cloud, name: "OneDrive" },
  { icon: Server, name: "Linux" },
  { icon: Monitor, name: "Windows" },
  { icon: Plug, name: "MCP" },
  { icon: FileText, name: "OpenAPI" },
  { icon: GitBranch, name: "Git" },
];

const DAY = [
  { kind: "briefing", title: "Your day, before your coffee", text: "Meetings, tasks due, mail that needs you and anything wrong on your machines, pushed to your phone at 7:30.", tags: ["calendar", "tasks", "machines"] },
  { kind: "triage", title: "An inbox that sorts itself", text: "Mail that asks something becomes a task with its due date, gets flagged, and gets a draft reply in your own voice. Nothing is sent.", tags: ["mail", "tasks", "your style"] },
  { kind: "operations", title: "A failed backup, already researched", text: "A routine notices last night's backup failed, looks into it read-only, and has the write-up waiting when you open the app.", tags: ["routines", "health", "diagnosis"] },
  { kind: "meetings", title: "Follow-ups written for you", text: "After a meeting: the summary, the decisions, your action items as tasks, and a mail to everyone who was there, ready to send.", tags: ["meetings", "teams", "drafts"] },
];

export default function Home() {
  usePage("lyra", "lyra is a self-hosted AI assistant on local models: memory, skills, plans, agents, your Microsoft 365 and machines.");
  const latest = release as { version: string; date: string; title: string; new?: string[]; improved?: string[]; fixed?: string[] };
  const [tab, setTab] = useState<keyof typeof QUICK>("server");
  const q = QUICK[tab];
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-line border-b">
        <AsciiField rows={24} />
        <div className="relative mx-auto max-w-[76rem] px-4 pt-28 pb-16 text-center sm:px-12 sm:pt-40 sm:pb-20">
          <img src="/logo.png" alt="" width={72} height={72} className="mx-auto size-16 rounded-2xl shadow-[0_0_60px] shadow-accent/40 sm:size-[72px]" />
          <p className="label mt-8 text-[11px] sm:text-[13px]">self-hosted · runs on your models · the model proposes, rust decides</p>
          <h1 className="mt-5 font-semibold text-[2.6rem] leading-[1.02] tracking-[-0.035em] sm:text-[4.4rem]">
            The assistant that&apos;s <span className="serif-accent pr-1 text-[1.12em]">truly</span> yours.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] text-dim leading-relaxed">
            Plans your day, sorts your inbox, follows up your meetings and watches your servers.
            <br className="hidden sm:block" /> It remembers what matters and learns how you work.
            <br className="hidden sm:block" /> Running on your hardware, for you and your team.
          </p>
          <p className="mt-5 text-dim italic">No cloud account. No data leaving the building. No model provider reading along.</p>
          <p className="mt-2 font-mono text-[13px] text-accent tracking-wide">Your server. Your models. Your memory. Your rules.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/self-host" solid>
              Get started
            </Button>
            <Button to="/features">See the features</Button>
            <Button to="/security">How it stays safe</Button>
          </div>
        </div>
      </section>

      {/* Quick start */}
      <Section label="quick start" link={{ to: "/self-host", text: "Full install" }}>
        <div className="border border-line">
          <div className="flex items-center gap-1 overflow-x-auto border-line border-b px-4 font-mono text-[13px]">
            <span className="mr-4 py-3 text-dim uppercase tracking-[0.14em]">install</span>
            {Object.entries(QUICK).map(([k, v]) => (
              <button key={k} type="button" onClick={() => setTab(k as keyof typeof QUICK)} className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-3 ${tab === k ? "border-accent text-accent" : "border-transparent text-dim hover:text-text"}`}>
                {v.label}
              </button>
            ))}
          </div>
          <div className="grid gap-6 p-6 sm:p-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
            <div>
              <h3 className="font-semibold text-xl">{q.title}</h3>
              <p className="mt-2 text-dim leading-relaxed">{q.text}</p>
            </div>
            <CodeBlock title={q.where} code={q.code} prompt />
          </div>
        </div>
        <p className="mt-6 text-center text-dim text-sm">
          Needs a Linux server and an OpenAI-compatible model: <span className="font-mono text-text">llama.cpp</span>, <span className="font-mono text-text">vLLM</span>, <span className="font-mono text-text">Ollama</span> or <span className="font-mono text-text">LM Studio</span>.
        </p>
      </Section>

      {/* See it work */}
      <Section label="see it work" link={{ to: "/features#chat", text: "Chat and agents" }}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div>
            <h2 className="font-semibold text-3xl leading-tight tracking-tight">
              Ask in plain words. <span className="text-dim">lyra does the rest, and asks before anything others will see.</span>
            </h2>
            <ul className="mt-6 space-y-2 font-mono text-[13px] text-dim">
              <li><span className="text-accent">→</span> picks the tools, or hands it to a specialist agent</li>
              <li><span className="text-accent">→</span> reads your calendar, mail and memory as you</li>
              <li><span className="text-accent">→</span> stops at the approval for an invite or a send</li>
            </ul>
          </div>
          <TerminalDemo />
        </div>
      </Section>

      {/* What it does */}
      <Section label="what it does" link={{ to: "/features", text: "All features" }}>
        <Cells>
          {FEATURES.slice(0, 6).map((f) => (
            <Cell key={f.id} icon={f.icon} title={f.title} to={`/features#${f.id}`}>
              {f.short}
            </Cell>
          ))}
        </Cells>
      </Section>

      {/* Works with */}
      <Section label="works with" link={{ to: "/self-host", text: "How it fits" }} dots>
        <div className="grid grid-cols-3 border-line border-t border-l bg-ink sm:grid-cols-4 lg:grid-cols-6 [&>*]:border-line [&>*]:border-r [&>*]:border-b">
          {WORKS_WITH.map((w) => (
            <div key={w.name} className="flex flex-col items-center gap-3 px-2 py-8 text-dim transition-colors hover:text-text">
              <w.icon className="size-5" />
              <span className="font-medium text-[15px]">{w.name}</span>
            </div>
          ))}
        </div>
        <div className="grid border-line border-x border-b bg-ink font-mono text-[13px] sm:grid-cols-2">
          <Link to="/features" className="flex items-center gap-1 px-6 py-4 text-dim hover:text-text sm:border-line sm:border-r">
            Everything it connects to <ArrowRight className="size-3.5" />
          </Link>
          <Link to="/security" className="flex items-center gap-1 px-6 py-4 text-dim hover:text-text">
            What stays on your server <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </Section>

      {/* A day with lyra */}
      <Section>
        <div className="grid border-line border-t border-l lg:grid-cols-[1fr_2fr] [&>*]:border-line [&>*]:border-r [&>*]:border-b">
          <div className="dots flex flex-col p-8">
            <h2 className="font-semibold text-[2.6rem] text-accent leading-[1.05] tracking-tight">A day with lyra.</h2>
            <p className="mt-5 text-dim leading-relaxed">What it does for you while you get on with your work.</p>
            <div className="mt-auto pt-10">
              <Link to="/features" className="inline-flex bg-text px-5 py-2.5 font-medium font-mono text-ink text-sm hover:bg-white">
                See the features
              </Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-2">
            {DAY.map((d, i) => (
              <div key={d.title} className={`flex flex-col border-line p-7 ${i % 2 === 0 ? "sm:border-r" : ""} ${i < 2 ? "border-b" : i === 2 ? "max-sm:border-b" : ""}`}>
                <p className="flex items-center gap-2 font-mono text-[11px] text-dim uppercase tracking-[0.14em]">
                  <Terminal className="size-3.5" /> {d.kind}
                </p>
                <h3 className="mt-4 font-semibold text-lg leading-snug">{d.title}</h3>
                <p className="mt-3 text-[15px] text-dim leading-relaxed">{d.text}</p>
                <p className="mt-auto flex flex-wrap gap-x-3 pt-6 font-mono text-[12px] text-faint">
                  {d.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* The safety model */}
      <Section label="the safety model" link={{ to: "/security", text: "Security & privacy" }} title={<>The model proposes. <span className="serif-accent text-[1.1em]">Rust</span> decides.</>} intro="Models are fallible: they hallucinate, misuse tools, and sound sure about the wrong thing. So every action that matters passes a check in compiled code that no prompt can talk its way around.">
        <div className="mb-10 grid border-line border-t border-l font-mono text-sm md:grid-cols-3 [&>*]:border-line [&>*]:border-r [&>*]:border-b">
          <div className="p-6">
            <Chip>1 · the model</Chip>
            <p className="mt-4 text-text">"send the follow-up to all four attendees"</p>
            <p className="mt-2 text-faint text-xs">mail_send · 4 recipients</p>
          </div>
          <div className="bg-accent/[0.04] p-6">
            <Chip tone="accent">2 · rust policy</Chip>
            <ul className="mt-4 space-y-1.5 text-xs">
              <li><span className="text-accent">✓</span> tool allowed for this person</li>
              <li><span className="text-accent">✓</span> within the turn's budget</li>
              <li><span className="text-warn">!</span> others will see it: ask first</li>
            </ul>
          </div>
          <div className="p-6">
            <Chip tone="warn">3 · waits for you</Chip>
            <p className="mt-4 text-text">Allow · Deny</p>
            <p className="mt-2 text-faint text-xs">on your phone, with exactly what will be sent</p>
          </div>
        </div>
        <Cells>
          {[
            { icon: KeyRound, title: "Secrets apart", text: "Tokens in their own private file, never shown, never in backups." },
            { icon: Users, title: "Each person's own", text: "Memories, mail, tasks and files stay their owner's. lyra works as the person it's helping." },
            { icon: Smartphone, title: "See what it knows", text: "Every memory and every action, each with its Why?. Correct, delete or export any of it." },
          ].map((c) => (
            <Cell key={c.title} icon={c.icon} title={c.title}>
              {c.text}
            </Cell>
          ))}
        </Cells>
      </Section>

      {/* The app */}
      <Section label="the app" title={<>On your desktop. <span className="text-dim">And in your pocket.</span></>} intro="An installable app: chat, approvals, your day, your machines. Push notifications you can answer in place, and a queue that keeps your messages on a bad connection.">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_15rem]">
          <Shot name="desktop" alt="lyra's app on a desktop: a conversation with tool calls" />
          <Shot name="phone" alt="lyra's app on a phone" phone className="mx-auto w-56 lg:w-full" />
        </div>
      </Section>

      {/* Latest */}
      <Section label="latest release" link={{ to: "/changelog", text: "View all" }}>
        <Link to="/changelog" className="block border border-line p-6 transition-colors hover:bg-panel">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className="label text-[12px]">v{latest.version}</span>
            <span className="font-mono text-dim text-xs">{latest.date}</span>
          </div>
          <h3 className="mt-3 font-semibold text-lg">{latest.title}</h3>
          <p className="mt-2 text-[15px] text-dim leading-relaxed">{(latest.new ?? latest.improved ?? latest.fixed ?? [])[0]}</p>
        </Link>
      </Section>

      {/* Call to action */}
      <Section label="get started">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="font-semibold text-[2.2rem] leading-[1.1] tracking-tight sm:text-5xl">
            Run it yourself. <span className="text-dim">One server, a model you trust, and an afternoon.</span>
          </h2>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button to="/self-host" solid>
              Self-host lyra <ArrowRight className="size-4" />
            </Button>
            <Button to="/changelog">What&apos;s new</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
