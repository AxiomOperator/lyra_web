// A stand-in model for the screenshots: an OpenAI-compatible server with
// scripted, made-up answers (no real people, mail or servers). Port 8798.
import http from "node:http";

const PORT = Number(process.env.PORT ?? 8798);

const DAY = `Here's your day:

| Time | What |
|---|---|
| 09:00 | Standup (15 min) |
| 10:30 | **Focus:** finish the Q4 capacity report |
| 13:00 | Vendor call: storage renewal |
| 15:00 | Review last night's backup restore test |

Three tasks are due this week. The **capacity report** is the one at risk: it's due Thursday and needs about two hours.

Want me to block Thursday 8:00–10:00 for it?`;

function reply(body) {
  const msgs = body.messages ?? [];
  const lastUser = [...msgs].reverse().find((m) => m.role === "user");
  const text = typeof lastUser?.content === "string" ? lastUser.content.toLowerCase() : "";
  const afterTool = msgs.length && msgs[msgs.length - 1].role === "tool";
  const tools = new Set((body.tools ?? []).map((t) => t.function.name));
  const system = msgs.filter((m) => m.role === "system").map((m) => m.content).join(" ");
  if (!body.stream) {
    // lyra's own small jobs (titles, triage): short, harmless answers.
    if (/title/i.test(system)) return { content: "Plan my day" };
    return { content: "{}" };
  }
  if (text.includes("my day") && !afterTool) {
    const name = ["memory_recall", "notes_list", "watch_list"].find((n) => tools.has(n));
    if (name) return { call: { id: "call_day", type: "function", function: { name, arguments: JSON.stringify({ query: "this week's priorities" }) } } };
  }
  if (text.includes("my day")) return { content: DAY };
  return { content: "Done." };
}

http
  .createServer((req, res) => {
    if (req.method === "GET" && req.url.startsWith("/v1/models")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ object: "list", data: [{ id: "demo", object: "model" }] }));
    }
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      const body = JSON.parse(raw || "{}");
      const r = reply(body);
      const usage = { prompt_tokens: 5120, completion_tokens: 180, total_tokens: 5300, prompt_tokens_details: { cached_tokens: 4096 } };
      if (!body.stream) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ choices: [{ message: { role: "assistant", content: r.content }, finish_reason: "stop" }], usage }));
      }
      res.writeHead(200, { "Content-Type": "text/event-stream" });
      const ev = (d) => res.write(`data: ${JSON.stringify(d)}\n\n`);
      if (r.call) {
        ev({ choices: [{ index: 0, delta: { tool_calls: [{ index: 0, ...r.call }] } }] });
        ev({ choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }] });
        ev({ choices: [], usage });
        res.end("data: [DONE]\n\n");
        return;
      }
      const words = r.content.split(/(?<= )/);
      let i = 0;
      const tick = () => {
        if (i < words.length) {
          ev({ choices: [{ index: 0, delta: { content: words[i++] } }] });
          return setTimeout(tick, 8);
        }
        ev({ choices: [{ index: 0, delta: {}, finish_reason: "stop" }] });
        ev({ choices: [], usage });
        res.end("data: [DONE]\n\n");
      };
      tick();
    });
  })
  .listen(PORT, "127.0.0.1", () => console.log(`fake model on ${PORT}`));
