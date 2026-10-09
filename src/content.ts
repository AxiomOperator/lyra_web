// The site's words, in one place: what lyra does, why it's safe, how it runs.
// Kept true to lyra as it is (see lyra's whitepaper.md and status.md).

import { Activity, Bot, Brain, CalendarDays, Cpu, FileText, GitBranch, Lock, Server, ShieldCheck, Smartphone, Undo2, Users, Workflow, type LucideIcon } from "lucide-react";

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  /** One line for the home page grid. */
  short: string;
  /** The pitch on the Features page. */
  pitch: string;
  points: string[];
  /** A screenshot (public/shots) or a snippet, shown beside it. */
  shot?: string;
  snippet?: { title: string; code: string };
}

export const FEATURES: Feature[] = [
  {
    id: "chat",
    icon: Bot,
    title: "Chat and agents",
    short: "A chat that uses tools, hands work to specialist agents, and keeps going on long jobs.",
    pitch: "Ask in plain words. lyra picks the tools, or hands the job to a specialist agent with its own skills, model and permissions, and checks the result before it answers.",
    points: [
      "Subagents you define as small TOML files: an Operator for machines, a Project Manager, a Researcher…",
      "Routing by rules, meaning or a model, with every delegation logged",
      "Long jobs keep their work: reach the tool-call limit and press Continue",
      "Saved prompts, attachments (PDFs, scans and pictures read by a vision model) and voice dictation",
    ],
    shot: "chat",
  },
  {
    id: "memory",
    icon: Brain,
    title: "Memory and skills",
    short: "Remembers what matters, learns how you work, and shows you all of it.",
    pitch: "lyra keeps facts, episodes and working notes in an embedded vector database, and learns procedures (\"skills\") from corrections. Both can be inspected, corrected and rolled back.",
    points: [
      "Hybrid recall: keywords and vectors, reranked, compiled into each prompt",
      "A changed fact supersedes the old one, which is kept and linked",
      "Skills are Markdown files with versions, usage and a measured success rate",
      "Personal memories and skills stay their owner's alone",
    ],
    snippet: {
      title: "~/.lyra/skills/weekly-status.md",
      code: "# weekly-status\nWhen: the user asks for their weekly status\n\n1. Read this week's done and open tasks\n2. Group by project; blockers first\n3. Keep it under 150 words, in their style\n\n<!-- v3 · used 14× · 93% success -->",
    },
  },
  {
    id: "plans",
    icon: Workflow,
    title: "Plans and goals",
    short: "Turns a goal into a checked plan, runs it with checkpoints, and replans when a step fails.",
    pitch: "Bigger asks become a plan: a graph of steps with verification, retries, budgets and checkpoints. Long-lived goals track progress and blockers, inside the autonomy you allow.",
    points: [
      "Every step verified (by rule or by the model) before the next starts",
      "Budgets for model calls, tools and tokens, enforced in code",
      "Approval steps for anything that changes what others see",
      "Recovery points: pick up after a crash or a failed step",
    ],
    snippet: {
      title: "plan 065e8f69 · check the servers and write a report",
      code: "✓ s1  gather disk usage on every machine      verified\n✓ s2  spot anything above 80%                 verified\n▸ s3  write the report                         running\n○ s4  send it to the team                      waits for your yes\n\nbudget  model 4/40 · tools 9/100 · tokens 21k/300k\nchecks  2 recovery points",
    },
  },
  {
    id: "office",
    icon: CalendarDays,
    title: "Your calendar, mail and work",
    short: "Your own Microsoft 365 and project tool: briefing, triage, meetings, documents.",
    pitch: "Each person connects their own Microsoft 365 account (calendar, mail, Teams and files) and their project-management tool. lyra works as them, never as anyone else.",
    points: [
      "A morning briefing and an end-of-day recap, pushed to your phone",
      "Mail triage: tasks from emails that ask something, flags, and draft replies in your writing style",
      "Meetings: prep before, notes during, the follow-up after (with your action items as tasks)",
      "Documents: draft letters and memos with lyra, then save them to OneDrive as Word",
      "Plan my day: focus blocks for your tasks, around your meetings and lunch",
    ],
    shot: "meetings",
  },
  {
    id: "machines",
    icon: Server,
    title: "Machines and operations",
    short: "Watches your servers, runs routines, and tells you only what's wrong.",
    pitch: "A small node on each Linux or Windows machine lends lyra its system tools through an outbound connection. Every command is classified in Rust: automatic, ask first, or forbidden.",
    points: [
      "Health on every machine: disks, memory, load, failed services, updates",
      "A Status page for everything lyra depends on, with uptime and history",
      "Routines on a schedule (\"every weekday at 8: check the backups\") that speak up only when needed",
      "Problems researched read-only, with a write-up ready when you look",
    ],
    shot: "status",
  },
  {
    id: "app",
    icon: Smartphone,
    title: "An app for your phone",
    short: "An installable app with push, offline drafts and a queue that never loses a message.",
    pitch: "lyra serves a web app you install on your phone or desktop. It's fast on a poor connection and answers notifications in place.",
    points: [
      "Push notifications with Allow / Deny and Done / Later right on them",
      "Messages queue offline and send in order; drafts survive a closed app",
      "Home-screen shortcuts: New chat, Add task, Quick note",
      "A terminal client too, and terminals on your machines from the app",
    ],
    shot: "phone",
  },
  {
    id: "team",
    icon: Users,
    title: "For a team",
    short: "Admins and members, each with their own data, accounts and limits.",
    pitch: "One lyra serves a small team. Sign-in with Microsoft, roles for admins and members, and everything personal kept per person: memories, skills, mail, tasks, folders, documents.",
    points: [
      "Members get their own assistant; machines and system tools stay with admins",
      "AI usage and cost per person and per model",
      "Feedback, bug reports and a team Q&A, with drafts written by lyra",
      "A fallback model takes over when the main one is down",
    ],
    shot: "usage",
  },
];

export interface Principle {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const PRINCIPLES: Principle[] = [
  { icon: ShieldCheck, title: "The model proposes; Rust decides", text: "Every action that matters passes a deterministic check in compiled code: command classification, path deny-lists, permissions, approval gates and budgets. The model can't talk its way around them." },
  { icon: Undo2, title: "Nothing is lost silently", text: "Memories keep their history, skills their versions, plans their checkpoints, and changes to lyra itself are generations with snapshots and rollback." },
  { icon: Activity, title: "Evidence over intuition", text: "Skills are promoted or retired by their measured success. Tools are ranked by reliability. A change to lyra's own behavior must beat the current one on a benchmark." },
  { icon: Cpu, title: "Local and self-contained", text: "Any OpenAI-compatible model you run. Everything lyra keeps lives in one folder; the databases are embedded and the app is built into the binary." },
  { icon: GitBranch, title: "Progressive autonomy", text: "Learning, goals and self-improvement each have a mode (off, propose, auto) that starts at the careful end, and runs inside hard limits." },
  { icon: Lock, title: "Private things happen; shared things ask", text: "lyra acts at once on what only you see. Anything other people would see (mail, invites, project updates, a machine change) waits for your Allow." },
];

export const SECURITY: Principle[] = [
  { icon: Cpu, title: "Local models", text: "lyra talks to models you run (llama.cpp, vLLM, Ollama, LM Studio, or anything OpenAI-compatible). Your conversations never go to a model provider." },
  { icon: Server, title: "One folder, on your server", text: "Memories, skills, conversations, plans and settings live in ~/.lyra on the machine you choose. No external database, no cloud account." },
  { icon: ShieldCheck, title: "Approvals in code", text: "Sending mail, inviting people, changing a machine: lyra asks, shows exactly what will change, and only proceeds on your yes. The gate is in Rust, not in a prompt." },
  { icon: Users, title: "Each person's own", text: "Every person's memories, skills, mail, tasks, documents and folders are theirs. lyra works as the person it's helping, and never reaches into someone else's." },
  { icon: Lock, title: "Secrets apart", text: "Tokens live in their own private file (readable only by lyra's user), are never shown or logged, and are left out of backups." },
  { icon: FileText, title: "See what it knows", text: "\"What lyra knows about me\" shows your memories, writing style, accounts and every action lyra took, each with its Why?. Correct, delete or export any of it." },
];

/** What never leaves the server lyra runs on. */
export const STAYS_LOCAL = [
  "Your conversations, and what lyra remembers from them",
  "Your mail, calendar and files once read (lyra reads them through your own Microsoft 365 connection)",
  "Skills, plans, goals and the record of what lyra did",
  "Your writing style and your documents",
  "Secrets and tokens (not even in backups)",
];

/** Safety guarantees, adapted from the whitepaper's summary. */
export const GUARANTEES: [string, string][] = [
  ["Shell commands", "Classified by a Rust parser before they run: read-only ones run, changes ask, dangerous ones are refused on every machine"],
  ["Files", "Deny-listed paths are never touched; project folders on your PC only through your own open browser, writes after your yes"],
  ["Mail and calendar", "Drafts and your own events at once; sending, invites and answers to meetings with others wait for your Allow"],
  ["Memory", "Every write is scanned (secrets, injections), versioned, and can be corrected or forgotten"],
  ["Autonomy", "Goals and plans run inside budgets for calls, tools and tokens; a stop button works at any time"],
  ["Self-improvement", "Changes to lyra's own behavior are benchmarked, approved, and can be rolled back; code changes only ever become a local branch"],
  ["People", "Members can't use machines, system tools or coding agents; nobody sees another person's data"],
];
