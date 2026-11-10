/* Loy server: serves the site AND runs the shared Community gallery for the Moments page.
   Run:   node server.js          (then open http://localhost:3000)
   Needs: Node 18 or newer, nothing to install.
   Optional environment variables:  PORT=3000   ADMIN_KEY=somesecret (lets you delete any photo)   MAX_ITEMS=500
   Photos are saved in ./data (a JSON list plus the image files). Back that folder up if it matters.
   API:  GET /api/moments   POST /api/moments {data,tf,note}   DELETE /api/moments/:id?token=...   (or ?key=ADMIN_KEY) */
const http = require("http"), fs = require("fs"), path = require("path"), crypto = require("crypto");
const PORT = +process.env.PORT || 3000, ADMIN = process.env.ADMIN_KEY || "", MAX = +process.env.MAX_ITEMS || 500;
const ROOT = __dirname, DATA = path.join(ROOT, "data"), IMG = path.join(DATA, "img"), DB = path.join(DATA, "moments.json");
fs.mkdirSync(IMG, { recursive: true });
let rows = []; try { rows = JSON.parse(fs.readFileSync(DB, "utf8")); } catch (e) {}
const save = () => fs.writeFileSync(DB, JSON.stringify(rows));
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml", ".json": "application/json", ".ttf": "font/ttf", ".woff2": "font/woff2", ".txt": "text/plain" };
const hits = new Map();                                        // very small rate limit: 6 posts per 10 minutes per address
const limited = ip => { const n = Date.now(), a = (hits.get(ip) || []).filter(t => n - t < 6e5); a.push(n); hits.set(ip, a); return a.length > 6; };
const send = (res, code, obj) => { res.writeHead(code, { "content-type": "application/json", "cache-control": "no-store" }); res.end(JSON.stringify(obj)); };
const num = (v, lo, hi, d) => (typeof v === "number" && isFinite(v) ? Math.max(lo, Math.min(hi, v)) : d);

http.createServer((req, res) => {
  const u = new URL(req.url, "http://x"), p = decodeURIComponent(u.pathname);
  if (p === "/api/moments" && req.method === "GET") return send(res, 200, rows.slice().reverse().map(r => ({ id: r.id, url: "data/img/" + r.id + ".jpg", tf: r.tf, note: r.note || r.caption || "", t: r.t })));
  if (p === "/api/moments" && req.method === "POST") {
    if (limited(req.socket.remoteAddress)) return send(res, 429, { error: "slow down" });
    let body = "", big = false;
    req.on("data", c => { body += c; if (body.length > 1.2e6) { big = true; req.destroy(); } });
    req.on("end", () => {
      if (big) return;
      let j; try { j = JSON.parse(body); } catch (e) { return send(res, 400, { error: "bad json" }); }
      const m = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(j.data || ""); if (!m) return send(res, 400, { error: "jpeg only" });
      const buf = Buffer.from(m[1], "base64"); if (buf.length > 900e3 || buf[0] !== 0xff || buf[1] !== 0xd8) return send(res, 400, { error: "bad image" });
      const id = crypto.randomBytes(6).toString("hex"), token = crypto.randomBytes(12).toString("hex");
      fs.writeFileSync(path.join(IMG, id + ".jpg"), buf);
      const t = j.tf || {}; rows.push({ id, token, tf: { s: num(t.s, .5, 5, 1), x: num(t.x, -2, 2, 0), y: num(t.y, -2, 2, 0) }, note: String(j.note || j.caption || "").slice(0, 280), t: Date.now() });
      while (rows.length > MAX) { const o = rows.shift(); try { fs.unlinkSync(path.join(IMG, o.id + ".jpg")); } catch (e) {} }
      save(); send(res, 200, { id, token });
    });
    return;
  }
  const d = /^\/api\/moments\/([a-f0-9]+)$/.exec(p);
  if (d && req.method === "DELETE") {
    const i = rows.findIndex(r => r.id === d[1]);
    if (i < 0) return send(res, 404, { error: "not found" });
    if (!((ADMIN && u.searchParams.get("key") === ADMIN) || u.searchParams.get("token") === rows[i].token)) return send(res, 403, { error: "not yours" });
    try { fs.unlinkSync(path.join(IMG, rows[i].id + ".jpg")); } catch (e) {} rows.splice(i, 1); save(); return send(res, 200, { ok: true });
  }
  // everything else: the website itself
  let f = path.normalize(path.join(ROOT, p === "/" ? "index.html" : p));
  if (!f.startsWith(ROOT) || f.startsWith(path.join(ROOT, "server.js")) || f === DB || f.startsWith(path.join(DATA, "moments"))) { res.writeHead(404); return res.end("Not found"); }
  fs.readFile(f, (e, buf) => { if (e) { res.writeHead(404); return res.end("Not found"); } res.writeHead(200, { "content-type": TYPES[path.extname(f).toLowerCase()] || "application/octet-stream" }); res.end(buf); });
}).listen(PORT, () => console.log("Loy is running at http://localhost:" + PORT));
