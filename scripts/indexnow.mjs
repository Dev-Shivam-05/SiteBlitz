// IndexNow, step 2 of 2 (SEO-5): submit only the URLs whose editorial hash changed since the last submission.
// Run only after a healthy production deployment. Node.js 22+. Based on the script proposed in debate round 3
// (docs/debate/2026-11-10-multipage-seo-ranking/03_chatgpt.md), reviewed and kept as is.
//
//   SITE_URL=https://<origin> INDEXNOW_KEY=<key> node scripts/indexnow.mjs current-indexnow.json previous-indexnow.json         # dry run
//   SITE_URL=https://<origin> INDEXNOW_KEY=<key> node scripts/indexnow.mjs current-indexnow.json previous-indexnow.json --send  # submit
//
// The key is public by design: it is served at /<key>.txt (public/). For a first launch, create previous-indexnow.json
// containing {} once. Keep previous-indexnow.json outside the build output; never reset it per deploy. A 202 means
// "received, key check pending", never "indexed". Participating engines include Bing, Yandex, Seznam and Naver;
// Google and Brave do not use IndexNow.
import { readFile, writeFile, rename } from "node:fs/promises";

async function main() {
  const [currentPath, statePath, ...flags] = process.argv.slice(2);
  if (!currentPath || !statePath || flags.some((x) => x !== "--send")) {
    throw new Error("Usage: node indexnow.mjs current.json previous.json [--send]");
  }
  if (currentPath === statePath) throw new Error("Use separate current and state files.");

  const base = new URL(process.env.SITE_URL ?? "");
  if (base.protocol !== "https:" || base.pathname !== "/" || base.search || base.hash || base.username || base.password) {
    throw new Error("SITE_URL must be the canonical HTTPS production origin.");
  }
  const key = process.env.INDEXNOW_KEY ?? "";
  if (!/^[a-f0-9]{32}$/.test(key)) throw new Error("Expected a 32-character hex key.");

  async function load(path) {
    const data = JSON.parse(await readFile(path, "utf8"));
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error(`Invalid manifest: ${path}`);
    for (const [url, hash] of Object.entries(data)) {
      const u = new URL(url);
      if (
        u.origin !== base.origin ||
        u.href.replace(/\/$/, "") !== url.replace(/\/$/, "") ||
        u.search ||
        u.hash ||
        u.username ||
        u.password ||
        /^\/(admin|api|demo)(\/|$)/.test(decodeURIComponent(u.pathname)) ||
        typeof hash !== "string" ||
        !/^[a-f0-9]{64}$/.test(hash)
      ) {
        throw new Error(`Invalid URL or content hash: ${url}`);
      }
    }
    return data;
  }

  const [current, previous] = await Promise.all([load(currentPath), load(statePath)]);
  const urls = [...new Set([...Object.keys(previous), ...Object.keys(current)])].filter((u) => previous[u] !== current[u]).sort();

  console.log(JSON.stringify({ changed: urls.length, urls }, null, 2));
  if (!urls.length || !flags.includes("--send")) return;
  if (urls.length > 10000) throw new Error("Split this release into explicit batches.");

  const keyLocation = `${base.origin}/${key}.txt`;
  const proof = await fetch(keyLocation, { redirect: "error", signal: AbortSignal.timeout(15000) });
  if (proof.status !== 200 || (await proof.text()).trim() !== key) {
    throw new Error("Production key file is unavailable or incorrect.");
  }

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    redirect: "error",
    signal: AbortSignal.timeout(20000),
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: base.host, key, keyLocation, urlList: urls }),
  });
  if (![200, 202].includes(response.status)) {
    throw new Error(
      `IndexNow ${response.status}; Retry-After=${response.headers.get("retry-after") ?? "not supplied"}; ${(await response.text()).slice(0, 400)}`
    );
  }

  await writeFile(`${statePath}.receipt.json`, JSON.stringify({ submittedAt: new Date().toISOString(), status: response.status, urls }, null, 2));
  await writeFile(`${statePath}.tmp`, JSON.stringify(current, null, 2));
  await rename(`${statePath}.tmp`, statePath);
  console.log(response.status === 202 ? "Received; key verification pending. Check before the next release." : "Received. This is not an indexing confirmation.");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
