// The app screenshots on the site (public/shots), from a fresh, throw-away
// lyra with made-up data: a stand-in model (fake-model.mjs), a new LYRA_HOME,
// and Playwright. Needs a built lyra (LYRA_BIN, default ../lyra/target/debug/lyra)
// and Chromium (CHROMIUM, default /usr/bin/chromium-browser).
//   npm run shots
import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright-core";

const BIN = path.resolve(process.env.LYRA_BIN ?? "../lyra/target/debug/lyra");
const OUT = path.resolve("public/shots");
const HOME = fs.mkdtempSync(path.join(os.tmpdir(), "lyra-shots-"));
fs.mkdirSync(path.join(HOME, "config"), { recursive: true });
fs.writeFileSync(
  path.join(HOME, "config", "config.toml"),
  'url = "http://127.0.0.1:8798/v1"\nmodel = "demo"\ncurrency = "$"\ninput_cost_per_mtok = 0.15\noutput_cost_per_mtok = 0.6\n\n[web]\nlisten = "127.0.0.1:8799"\n\n# Nothing about the machine taking the shots: no health alerts, diagnoses or web search.\n[health]\nenabled = false\n\n[diagnose]\nenabled = false\nauto = false\n\n[search]\nenabled = false\n',
);
const env = { ...process.env, LYRA_HOME: HOME };
const model = spawn("node", ["scripts/fake-model.mjs"], { stdio: "ignore" });
const server = spawn(BIN, ["serve"], { env, stdio: "ignore" });
const stop = () => {
  server.kill();
  model.kill();
  fs.rmSync(HOME, { recursive: true, force: true });
};
process.on("exit", stop);
await new Promise((r) => setTimeout(r, 4000));

const code = () => execSync(`${BIN} pair 2>&1`, { env }).toString().match(/Pairing code: (\S+)/)[1].replace("-", "");
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? "/usr/bin/chromium-browser" });
fs.mkdirSync(OUT, { recursive: true });

async function signedIn(viewport, scale = 2) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: scale, colorScheme: "dark", isMobile: viewport.width < 500, hasTouch: viewport.width < 500 });
  const p = await ctx.newPage();
  await p.goto(`http://127.0.0.1:8799/?pair=${code()}`);
  await p.waitForTimeout(1500);
  await p.getByRole("button", { name: /^pair$/i }).first().click();
  await p.waitForTimeout(3000);
  return { ctx, p };
}

// Desktop: a conversation (a tool, then the answer).
{
  const { ctx, p } = await signedIn({ width: 1440, height: 900 });
  await p.getByRole("button", { name: "New conversation" }).click();
  await p.waitForTimeout(1200);
  await p.locator("textarea").fill("Plan my day");
  await p.keyboard.press("Enter");
  await p.getByText("capacity report").first().waitFor({ timeout: 30000 });
  await p.waitForTimeout(1500);
  await p.mouse.move(0, 0);
  await p.screenshot({ path: path.join(OUT, "desktop.png") });
  await p.screenshot({ path: path.join(OUT, "chat.png"), clip: { x: 352, y: 0, width: 1088, height: 900 } });
  // Status and Usage.
  await p.getByRole("button", { name: "Status" }).first().click();
  await p.waitForTimeout(8000);
  await p.screenshot({ path: path.join(OUT, "status.png") });
  await p.getByRole("button", { name: "Usage" }).first().click();
  await p.waitForTimeout(2000);
  await p.screenshot({ path: path.join(OUT, "usage.png") });
  await ctx.close();
}

// Phone: the same conversation.
{
  const { ctx, p } = await signedIn({ width: 390, height: 844 }, 3);
  await p.locator("textarea").fill("Plan my day");
  await p.keyboard.press("Enter");
  await p.getByText("capacity report").first().waitFor({ timeout: 30000 });
  await p.waitForTimeout(1500);
  await p.evaluate(() => document.querySelector("textarea")?.blur());
  await p.screenshot({ path: path.join(OUT, "phone.png") });
  await ctx.close();
}

// Meetings: made-up meetings and people, fed to the page (no Microsoft account here).
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "dark" });
  const p = await ctx.newPage();
  const at = (m) => new Date(Date.now() + m * 60000).toISOString();
  const fake = {
    meetings: { connected: true, meetings: [
      { id: "m1", subject: "Storage renewal", start: at(-150), end: at(-90), when: "Today 10:00", people: 4, teams: true, state: "after", notes: true, followup: true },
      { id: "m2", subject: "Network refresh", start: at(30), end: at(90), when: "Today 14:00", people: 3, teams: false, state: "before", notes: false, followup: false },
      { id: "m3", subject: "Backup restore test", start: at(1440), end: at(1500), when: "Tomorrow 09:00", people: 2, teams: true, state: "before", notes: false, followup: false },
    ] },
    meeting: { id: "m1", subject: "Storage renewal", when: "Today 10:00", until: "Today 11:00", state: "after", location: "Room 2", join: null, organizer: "Sam Rivera",
      agenda: "Renewal quote, capacity for next year", attendees: [{ name: "Sam Rivera", email: "sam@example.org" }, { name: "Alex Kim", email: "alex@example.org" }, { name: "Jo Patel", email: "jo@example.org" }],
      prep: ["With Sam, Alex, Jo", "Last from Sam: the renewal quote (yesterday)", "Open: compare the two quotes"],
      notes: "Sam: renewal quote 8% up. Alex wants 20% more capacity. Me: compare quotes by Friday.", transcripts: false,
      followup: { summary: "We reviewed the storage renewal: the quote is 8% higher, and next year needs about 20% more capacity.", decisions: ["Renew for one year, not three", "Ask for a second quote"], mine: [{ task: "Compare the two quotes", due: "friday" }], others: [{ who: "Alex", task: "Size next year's capacity" }], email: { subject: "Storage renewal: follow-up", body: "Thanks all. **Decided:** a one-year renewal, and a second quote.\n\n- Me: compare the quotes by Friday\n- Alex: size next year's capacity" }, from: "notes" } },
  };
  await p.routeWebSocket(/\/ws/, (ws) => {
    const srv = ws.connectToServer();
    ws.onMessage((m) => {
      const v = JSON.parse(m);
      if (v.type === "get" && fake[v.what]) return ws.send(JSON.stringify({ type: "data", what: v.what, arg: v.arg, id: v.id, data: fake[v.what] }));
      srv.send(m);
    });
    srv.onMessage((m) => ws.send(m));
  });
  await p.goto(`http://127.0.0.1:8799/?pair=${code()}`);
  await p.waitForTimeout(1500);
  await p.getByRole("button", { name: /^pair$/i }).first().click();
  await p.waitForTimeout(3000);
  await p.getByRole("button", { name: "Meetings" }).first().click();
  await p.waitForTimeout(2500);
  await p.screenshot({ path: path.join(OUT, "meetings.png") });
  await ctx.close();
}

await browser.close();

// Small enough for a website: WebP (desktop shots 1600 px wide), and the share image.
for (const f of fs.readdirSync(OUT).filter((f) => f.endsWith(".png"))) {
  const from = path.join(OUT, f);
  const wide = f !== "phone.png" ? "-resize 1600x" : "-resize 780x";
  execSync(`magick ${from} ${wide} -quality 82 ${from.replace(/\.png$/, ".webp")}`);
  if (f === "desktop.png") execSync(`magick ${from} -resize 1200x -gravity north -crop 1200x630+0+0 +repage public/og.png`);
  fs.rmSync(from);
}
console.log(`screenshots in ${OUT}:`, fs.readdirSync(OUT).join(", "));
process.exit(0);
