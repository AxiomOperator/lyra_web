// Copy lyra's CHANGELOG.json into the site (committed, so the site builds
// without the lyra repo). Run after a lyra release: npm run sync
import fs from "node:fs";
import path from "node:path";

const from = path.resolve(process.argv[2] ?? "../lyra/CHANGELOG.json");
const to = path.resolve("src/data/changelog.json");
const releases = JSON.parse(fs.readFileSync(from, "utf8"));
fs.mkdirSync(path.dirname(to), { recursive: true });
fs.writeFileSync(to, JSON.stringify(releases, null, 2) + "\n");
// The newest one alone, for the header and the home page (the full list loads on /changelog).
fs.writeFileSync(path.join(path.dirname(to), "latest.json"), JSON.stringify(releases[0], null, 2) + "\n");
console.log(`synced ${releases.length} releases (latest ${releases[0].version}) from ${from}`);
