// Stores one family's Pocket Pals data, keyed by their private family code.
import { getStore } from "@netlify/blobs";

const json = (o, status = 200) =>
  new Response(JSON.stringify(o), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
const validCode = (c) => typeof c === "string" && /^[a-z0-9]{8,32}$/.test(c);

export default async (req) => {
  const store = getStore("pocketpals");

  if (req.method === "GET") {
    const code = new URL(req.url).searchParams.get("code");
    if (!validCode(code)) return json({ error: "bad code" }, 400);
    const v = await store.get("family-" + code, { type: "json" });
    return json(v || {});
  }

  if (req.method === "POST") {
    let b;
    try { b = await req.json(); } catch { return json({ error: "bad json" }, 400); }
    if (!validCode(b.code) || typeof b.json !== "string" || b.json.length > 800000 || typeof b.updated !== "number")
      return json({ error: "bad request" }, 400);
    const key = "family-" + b.code;
    const cur = await store.get(key, { type: "json" });
    if (cur && cur.updated > b.updated) return json({ ok: false, newer: true });
    await store.setJSON(key, { json: b.json, updated: b.updated });
    return json({ ok: true });
  }

  return json({ error: "method not allowed" }, 405);
};
