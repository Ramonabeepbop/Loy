/* ---------- Collection: your own ring of fish (personal) and the Community ring (shared) ----------
   Photos are shrunk and saved in this browser (IndexedDB). Sharing sends a copy to the Community ring
   when the site runs with the included server.js; without it the Community page is a local preview. */
(function () {
  const $m = s => document.querySelector(s);
  const view = $m("#view-moments"), comm = $m("#view-community"); if (!view || !comm) return;
  const file = $m("#mFile"), count = $m("#mCount"), mHint = $m("#mHint"), cNote = $m("#cNote");
  const ed = $m("#mEditor"), edBox = $m("#edBox"), edImg = $m("#edImg"), edGhost = $m("#edGhost"), edZoom = $m("#edZoom"), edNote = $m("#edNote");
  const lb = $m("#lightbox"), lbBox = $m("#lbBox"), lbImg = $m("#lbImg"), lbCap = $m("#lbCap"), lbAct = $m("#lbActions"), lbShare = $m("#lbShare");
  const OTHERS = [
    { src: "assets/characters/blossoms.png", en: "Spring blossoms", th: "ดอกไม้บาน" }, { src: "assets/characters/floating-market.png", en: "Floating market", th: "ตลาดน้ำ" },
    { src: "assets/characters/rice-fields.png", en: "Rice fields", th: "ทุ่งนา" }, { src: "assets/characters/sky-lanterns.png", en: "Sky lanterns", th: "โคมลอย" },
    { src: "assets/characters/whirlpool.png", en: "Whirlpool", th: "วังวน" }, { src: "assets/characters/dragon-waves.png", en: "Dragon waves", th: "มังกรคลื่น" },
    { src: "assets/characters/lotus-pond.png", en: "Lotus pond", th: "สระบัว" }, { src: "assets/characters/lanterns.png", en: "Lanterns", th: "โคมไฟ" },
    { src: "assets/characters/friends.png", en: "Friends by the river", th: "เพื่อนริมน้ำ" }
  ];
  const TAU = Math.PI * 2, PITCH = 1.5, ROWSTEP = .5;   // fish touch corner to corner (half the space stays empty): 1.5 fish widths across, rows offset by half that and half a fish height down
  const TF0 = () => ({ s: 1, x: 0, y: 0 });
  const tfCss = t => `translate(${t.x * 100}%, ${t.y * 100}%) scale(${t.s})`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fishHTML = (src, tf) => `<span class="c-pop"><span class="m-fish"><img alt="" draggable="false" src="${esc(src)}" style="transform:${tfCss(tf || TF0())}"></span></span>`;
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const wrapA = a => { a = (a + Math.PI) % TAU; if (a < 0) a += TAU; return a - Math.PI; };

  /* ================= saving in the browser ================= */
  let db = null, items = []; const mem = [];
  const openDB = () => new Promise(res => { try { const r = indexedDB.open("loyMoments", 1); r.onupgradeneeded = () => r.result.createObjectStore("photos", { keyPath: "id" }); r.onsuccess = () => res(r.result); r.onerror = () => res(null); } catch (e) { res(null); } });
  const st = m => db.transaction("photos", m).objectStore("photos");
  const loadAll = () => new Promise(res => { if (!db) return res(mem.slice()); const r = st("readonly").getAll(); r.onsuccess = () => res(r.result || []); r.onerror = () => res([]); });
  const put = rec => { if (!db) { const i = mem.findIndex(m => m.id === rec.id); i < 0 ? mem.push(rec) : (mem[i] = rec); return; } try { st("readwrite").put(rec); } catch (e) { mem.push(rec); } };
  const del = id => { if (!db) { const i = mem.findIndex(m => m.id === id); if (i >= 0) mem.splice(i, 1); return; } try { st("readwrite").delete(id); } catch (e) {} };
  const shrink = (f, max = 1100) => new Promise((res, rej) => {
    const url = URL.createObjectURL(f), im = new Image();
    im.onload = () => { const k = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight)), c = document.createElement("canvas"); c.width = Math.round(im.naturalWidth * k); c.height = Math.round(im.naturalHeight * k); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(url); res(c.toDataURL("image/jpeg", .82)); };
    im.onerror = () => { URL.revokeObjectURL(url); rej(); }; im.src = url;
  });

  /* ================= the ring engine (3D ring of fish you can turn; used by both pages) ================= */
  function makeRing(stage, ringEl, o) {
    const S = { cols: 14, rows: 5, P: 700, CW: 200, CH: 300, R: 600, rot: 0, rvel: 0, panY: 0, pvel: 0, idleAt: performance.now(), auto: 0, drag: false, moved: 0, last: [0, 0, 0], down: null, raf: 0, lastT: 0, panLimit: 0, goal: null, cards: [], map: {} };
    const size = () => { const H = stage.clientHeight; S.CH = Math.max(150, Math.min(340, H * (stage.clientWidth < 560 ? .27 : .32))); S.CW = S.CH * 520 / 783; return S.CW * PITCH; };
    function measure(rows, need, fixed) {
      const ax = size(), P0 = Math.max(690, Math.min(820, stage.clientWidth * .62));      // a wide ring: small angle between neighbours keeps the flat cards fitting together
      let cols = fixed || Math.max(16, Math.round(TAU * P0 / ax)); while (cols * rows < need) cols++; return cols;
    }
    function build(cols, rows, cell) {
      const ax = size(), H = stage.clientHeight; S.cols = cols; S.rows = rows;
      const R = cols * ax / TAU, step = TAU / cols; S.R = R; S.P = R; stage.style.setProperty("--P", R + "px");
      ringEl.innerHTML = ""; S.cards = []; S.map = {};
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const d = cell(r, c) || {}, theta = (c - (r % 2) * .5) * step, y = (r - (rows - 1) / 2) * S.CH * ROWSTEP;
        const el = document.createElement("div"); el.className = "c-card " + (d.cls || ""); el.dataset.r = r; el.dataset.c = c; if (d.id) el.dataset.id = d.id;
        el.style.width = S.CW + "px"; el.style.height = S.CH + "px";
        el.style.transform = `rotateY(${theta}rad) translateZ(${-R}px) translate(-50%, calc(-50% + ${y}px))`;
        el.innerHTML = d.html || ""; el.style.display = "none"; ringEl.appendChild(el);
        const k = { el, theta, y, vis: false }; S.cards.push(k); S.map[r + "," + c] = k;
      }
      S.panLimit = Math.max(0, ((rows - 1) * S.CH * ROWSTEP + S.CH - H) / 2) + S.CH * .15;
      S.panY = Math.max(-S.panLimit, Math.min(S.panLimit, S.panY)); S.idleAt = performance.now();
    }
    const setCell = (r, c, d) => { const k = S.map[r + "," + c]; if (!k) return null; k.el.className = "c-card " + (d.cls || ""); if (d.id) k.el.dataset.id = d.id; else delete k.el.dataset.id; k.el.innerHTML = d.html || ""; return k.el; };
    const cardEl = (r, c) => (S.map[r + "," + c] || {}).el;
    function focus(r, c) { const k = S.map[r + "," + c]; if (!k) return; S.goal = { rot: S.rot + wrapA(k.theta - S.rot), pan: Math.max(-S.panLimit, Math.min(S.panLimit, -k.y)) }; S.rvel = S.pvel = 0; S.idleAt = performance.now(); start(); }
    function frame(now) {
      const dt = Math.min(48, now - S.lastT || 16); S.lastT = now;
      const paused = !o.active() || (o.paused && o.paused());
      if (S.goal) {
        const k = 1 - Math.pow(.004, dt / 1000); S.rot += (S.goal.rot - S.rot) * k; S.panY += (S.goal.pan - S.panY) * k;
        if (Math.abs(S.goal.rot - S.rot) < .0008 && Math.abs(S.goal.pan - S.panY) < .5) S.goal = null; S.idleAt = now;
      } else if (!S.drag) {
        if (Math.abs(S.rvel) > 1e-6) { S.rot += S.rvel * dt; S.rvel *= Math.pow(.05, dt / 1000); } else S.rvel = 0;
        if (Math.abs(S.pvel) > .002) { S.panY += S.pvel * dt; S.pvel *= Math.pow(.05, dt / 1000); } else S.pvel = 0;
        if (S.panY > S.panLimit || S.panY < -S.panLimit) S.panY += ((S.panY > 0 ? S.panLimit : -S.panLimit) - S.panY) * .15;
      }
      const want = (!S.drag && !S.goal && !paused && now - S.idleAt > 3000) ? -.05 : 0;       // 3 seconds untouched: a slow drift to the left
      S.auto += (want - S.auto) * (1 - Math.pow(.3, dt / 1000)); if (Math.abs(S.auto) < 1e-5 && !want) S.auto = 0;
      S.rot += S.auto * dt / 1000;
      const half = Math.atan((stage.clientWidth / 2) / S.P) + (S.CW / S.R) * .9;
      ringEl.style.transform = `translateY(${S.panY}px) translateZ(${S.P}px) rotateY(${-S.rot}rad)`;
      for (const c of S.cards) { const v = Math.abs(wrapA(c.theta - S.rot)) < half; if (v !== c.vis) { c.vis = v; c.el.style.display = v ? "" : "none"; } }
    }
    function start() { cancelAnimationFrame(S.raf); S.lastT = performance.now(); (function f(now) { frame(now); if (o.active()) S.raf = requestAnimationFrame(f); })(S.lastT); }
    stage.addEventListener("pointerdown", e => { S.drag = true; S.moved = 0; S.goal = null; S.last = [e.clientX, e.clientY, performance.now()]; S.rvel = S.pvel = 0; S.idleAt = performance.now(); S.down = e.target.closest ? e.target.closest(".c-card") : null; try { stage.setPointerCapture(e.pointerId); } catch (_) {} });
    stage.addEventListener("pointermove", e => {
      if (!S.drag) return;
      const now = performance.now(), dx = e.clientX - S.last[0], dy = e.clientY - S.last[1], dt = Math.max(1, now - S.last[2]); S.last = [e.clientX, e.clientY, now]; S.moved += Math.abs(dx) + Math.abs(dy); S.idleAt = now;
      const dr = dx / S.P; S.rot += dr; S.rvel = S.rvel * .6 + (dr / dt) * .4;
      let dp = dy; if (S.panY + dp > S.panLimit || S.panY + dp < -S.panLimit) dp *= .3; S.panY += dp; S.pvel = S.pvel * .6 + (dp / dt) * .4;
    });
    const up = () => {
      if (!S.drag) return; S.drag = false; S.idleAt = performance.now();
      if (performance.now() - S.last[2] > 90) { S.rvel = 0; S.pvel = 0; }
      if (S.moved < 6 && S.down) { S.rvel = S.pvel = 0; o.onTap(S.down); }
      S.down = null;
    };
    stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
    stage.addEventListener("wheel", e => { e.preventDefault(); S.goal = null; S.idleAt = performance.now(); S.rvel = 0; S.rot += (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) / S.P * .9; }, { passive: false });
    addEventListener("keydown", e => { if (!o.active() || lb.classList.contains("show") || ed.classList.contains("show")) return; S.idleAt = performance.now(); if (e.key === "ArrowRight") S.rvel += .0012; if (e.key === "ArrowLeft") S.rvel -= .0012; });
    return { measure, build, setCell, cardEl, focus, start, state: S };
  }

  /* ================= the fit editor: drag, pinch or scroll to place the photo inside the fish, and write a reflection ================= */
  let edRec = null, edTf = TF0(), edDone = null;
  const edSet = t => { edTf = t; const c = tfCss(t); edImg.style.transform = c; edGhost.style.transform = c; edZoom.value = Math.round(t.s * 100); };
  (function gestures() {
    const ptrs = new Map(); let pinch = 0;
    const apply = t => { t.s = Math.max(.5, Math.min(5, t.s)); t.x = Math.max(-2, Math.min(2, t.x)); t.y = Math.max(-2, Math.min(2, t.y)); edSet(t); };
    edBox.addEventListener("pointerdown", e => { ptrs.set(e.pointerId, [e.clientX, e.clientY]); try { edBox.setPointerCapture(e.pointerId); } catch (_) {} pinch = 0; });
    edBox.addEventListener("pointermove", e => {
      if (!ptrs.has(e.pointerId)) return; const p = ptrs.get(e.pointerId), w = edBox.clientWidth, h = edBox.clientHeight, t = Object.assign({}, edTf);
      if (ptrs.size === 1) { t.x += (e.clientX - p[0]) / w; t.y += (e.clientY - p[1]) / h; ptrs.set(e.pointerId, [e.clientX, e.clientY]); apply(t); }
      else { ptrs.set(e.pointerId, [e.clientX, e.clientY]); const [a, b] = [...ptrs.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (pinch) { t.s *= d / pinch; apply(t); } pinch = d; }
    });
    const end = e => { ptrs.delete(e.pointerId); pinch = 0; };
    edBox.addEventListener("pointerup", end); edBox.addEventListener("pointercancel", end);
    edBox.addEventListener("wheel", e => { e.preventDefault(); const t = Object.assign({}, edTf); t.s *= Math.exp(-e.deltaY * .0018); apply(t); }, { passive: false });
  })();
  edZoom.addEventListener("input", () => edSet(Object.assign({}, edTf, { s: edZoom.value / 100 })));
  $m("#edReset").addEventListener("click", () => edSet(TF0()));
  function openEditor(rec, done) { edRec = rec; edDone = done; edImg.src = edGhost.src = rec.data; edNote.value = rec.note || ""; edSet(Object.assign(TF0(), rec.tf || {})); ed.classList.add("show"); ed.setAttribute("aria-hidden", "false"); }
  function closeEditor(ok) {
    ed.classList.remove("show"); ed.setAttribute("aria-hidden", "true");
    if (ok && edRec) { edRec.tf = Object.assign({}, edTf); edRec.note = edNote.value.trim().slice(0, 280); }
    const cb = edDone, r = edRec; edDone = null; edRec = null; cb && cb(!!ok, r);
  }
  $m("#edOk").addEventListener("click", () => closeEditor(true)); $m("#edCancel").addEventListener("click", () => closeEditor(false));

  /* ================= YOUR collection: a ring that starts empty and fills up ================= */
  const mStage = $m("#mStage"), mRingEl = $m("#mRing"), ROWS_P = 5, ADD = { r: 2, c: 0 };
  let persCols = 14;
  const mine = makeRing(mStage, mRingEl, { active: () => view.classList.contains("active"), paused: () => lb.classList.contains("show") || ed.classList.contains("show"), onTap: card => {
    const r = +card.dataset.r, c = +card.dataset.c;
    if (r === ADD.r && c === ADD.c) return file.click();
    const rec = items.find(m => m.slot && m.slot.r === r && m.slot.c === c); if (rec) openLB("mine", sorted().indexOf(rec));
  } });
  const sorted = () => items.slice().sort((a, b) => a.t - b.t);
  const addCell = () => ({ cls: "add", html: '<span class="c-pop"><span class="m-fish"><span class="m-plus"><b>+</b><i>Add a memory</i><i class="th">เพิ่มความทรงจำ</i></span></span></span>' });
  const cellFor = (r, c) => {
    if (r === ADD.r && c === ADD.c) return addCell();
    const rec = items.find(m => m.slot && m.slot.r === r && m.slot.c === c);
    return rec ? { cls: "mine", html: fishHTML(rec.data, rec.tf), id: rec.id } : { cls: "empty", html: '<span class="c-pop"><span class="m-fish"></span></span>' };
  };
  function freeSlot() {                                       // a random empty place; the ring widens when it is full
    for (;;) {
      const free = []; for (let r = 0; r < ROWS_P; r++) for (let c = 0; c < persCols; c++) if (!(r === ADD.r && c === ADD.c) && !items.some(m => m.slot && m.slot.r === r && m.slot.c === c)) free.push({ r, c });
      if (free.length) return free[Math.floor(Math.random() * free.length)];
      persCols += 2;
    }
  }
  function buildMine() {
    items.forEach(m => { if (!m.slot || items.some(o => o !== m && o.slot && m.slot && o.slot.r === m.slot.r && o.slot.c === m.slot.c && o.t < m.t)) { m.slot = null; } });
    items.filter(m => !m.slot).forEach(m => { m.slot = freeSlot(); put(m); });
    persCols = Math.max(14, persCols, ...items.map(m => m.slot.c + 1));
    mine.build(persCols, ROWS_P, cellFor);
    count.textContent = items.length ? items.length + " fish" : "";
    mHint.hidden = !!items.length; mine.start();
  }
  const refreshCard = rec => { mine.setCell(rec.slot.r, rec.slot.c, cellFor(rec.slot.r, rec.slot.c)); count.textContent = items.length ? items.length + " fish" : ""; mHint.hidden = !!items.length; };
  async function reveal(rec) {                               // like pulling a card in a gacha: turn to the empty place, then the fish flips in with a glow
    mine.focus(rec.slot.r, rec.slot.c); await wait(1000);
    const el = mine.setCell(rec.slot.r, rec.slot.c, cellFor(rec.slot.r, rec.slot.c)); mHint.hidden = true;
    if (el) { el.classList.add("arrive"); const b = document.createElement("i"); b.className = "c-burst"; el.appendChild(b); setTimeout(() => b.remove(), 1700); }
    count.textContent = items.length + " fish"; await wait(1500); if (el) el.classList.remove("arrive");
  }
  file.addEventListener("change", async () => {
    const fs = [...file.files]; file.value = ""; if (!fs.length) return;
    const made = []; let tried = 0;
    for (const f of fs) {
      let data; try { data = await shrink(f); } catch (e) { continue; } tried++;
      const rec = { id: "m" + Date.now() + Math.random().toString(36).slice(2, 6), data, note: "", tf: TF0(), t: Date.now() + made.length };
      if (await new Promise(res => openEditor(rec, res))) made.push(rec);
    }
    if (!tried) { toast("That file could not be opened as a picture"); return; }
    for (const rec of made) {
      rec.slot = freeSlot(); items.push(rec); put(rec);
      if (persCols > mine.state.cols) { buildMine(); }
      await reveal(rec);
    }
  });

  /* ================= zoom view: the whole fish grows; shows the reflection the owner wrote ================= */
  let lbList = [], lbI = 0, lbMode = "mine", lbT = { s: 1, x: 0, y: 0 }, lbMoved = 0; const lbPtr = new Map(); let lbPinch = 0;
  const lbApply = () => { lbT.s = Math.max(.6, Math.min(6, lbT.s)); lbBox.style.transform = `translate(${lbT.x}px, ${lbT.y}px) scale(${lbT.s})`; };
  function lbShow(i) {
    if (!lbList.length) return closeLB();
    lbI = (i + lbList.length) % lbList.length; const r = lbList[lbI];
    lbImg.src = r.data || r.src; lbImg.style.transform = tfCss(Object.assign(TF0(), r.tf || {})); lbT = { s: 1, x: 0, y: 0 }; lbApply();
    const note = r.art ? esc(r.en) + (r.th ? `<i class="th">${esc(r.th)}</i>` : "") : (r.note ? esc(r.note) + (r.th ? `<i class="th">${esc(r.th)}</i>` : "") : "");
    lbCap.innerHTML = note; lbCap.hidden = !note;
    lbAct.hidden = lbMode !== "mine"; lbShare.hidden = !!r.fish;      // a saved river's fish is a keepsake, not a photo to share
    if (lbMode === "mine") lbShare.innerHTML = r.shared ? '<span class="bi">Unshare</span> <span class="th">เลิกแชร์</span>' : '<span class="bi">Share</span> <span class="th">แชร์</span>';
  }
  function openLB(mode, i, list) { lbMode = mode; lbList = list || sorted(); lbShow(i); lb.classList.add("show"); lb.setAttribute("aria-hidden", "false"); }
  function closeLB() { lb.classList.remove("show"); lb.setAttribute("aria-hidden", "true"); }
  lb.addEventListener("pointerdown", e => { if (e.target.closest("button, .lb-cap")) return; lbPtr.set(e.pointerId, [e.clientX, e.clientY]); lbMoved = 0; lbPinch = 0; try { lb.setPointerCapture(e.pointerId); } catch (_) {} });
  lb.addEventListener("pointermove", e => {
    if (!lbPtr.has(e.pointerId)) return; const p = lbPtr.get(e.pointerId);
    if (lbPtr.size === 1) { lbT.x += e.clientX - p[0]; lbT.y += e.clientY - p[1]; lbMoved += Math.abs(e.clientX - p[0]) + Math.abs(e.clientY - p[1]); lbPtr.set(e.pointerId, [e.clientX, e.clientY]); lbApply(); }
    else { lbPtr.set(e.pointerId, [e.clientX, e.clientY]); const [a, b] = [...lbPtr.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]); if (lbPinch) { lbT.s *= d / lbPinch; lbApply(); } lbPinch = d; lbMoved += 9; }
  });
  const lbEnd = e => { if (!lbPtr.has(e.pointerId)) return; lbPtr.delete(e.pointerId); lbPinch = 0; if (!lbPtr.size && lbMoved < 6) { const hit = document.elementFromPoint(e.clientX, e.clientY); if (!hit || (!lbBox.contains(hit) && !hit.closest("button, .lb-cap"))) closeLB(); } };
  lb.addEventListener("pointerup", lbEnd); lb.addEventListener("pointercancel", lbEnd);
  lb.addEventListener("wheel", e => { e.preventDefault(); lbT.s *= Math.exp(-e.deltaY * .002); lbApply(); }, { passive: false });
  $m("#lbClose").addEventListener("click", closeLB);
  $m("#lbPrev").addEventListener("click", () => lbShow(lbI - 1)); $m("#lbNext").addEventListener("click", () => lbShow(lbI + 1));
  $m("#lbIn").addEventListener("click", () => { lbT.s *= 1.4; lbApply(); }); $m("#lbOut").addEventListener("click", () => { lbT.s /= 1.4; lbApply(); });
  addEventListener("keydown", e => {
    if (ed.classList.contains("show")) { if (e.key === "Escape") closeEditor(false); return; }
    if (!lb.classList.contains("show")) return;
    if (e.key === "Escape") closeLB(); if (e.key === "ArrowRight") lbShow(lbI + 1); if (e.key === "ArrowLeft") lbShow(lbI - 1);
  });
  $m("#lbEdit").addEventListener("click", () => { const r = lbList[lbI]; if (lbMode !== "mine" || !r) return; openEditor(r, ok => { if (ok) { put(r); refreshCard(r); lbShow(lbI); } }); });
  $m("#lbDel").addEventListener("click", async () => {
    const r = lbList[lbI]; if (lbMode !== "mine" || !r) return;
    if (!confirm("Remove this fish from this device?" + (r.shared ? " It will also leave the Community page." : ""))) return;
    if (r.shared) await unshare(r);
    items = items.filter(x => x.id !== r.id); del(r.id); mine.setCell(r.slot.r, r.slot.c, cellFor(r.slot.r, r.slot.c)); count.textContent = items.length ? items.length + " fish" : ""; mHint.hidden = !!items.length;
    lbList = sorted(); if (lbList.length) lbShow(Math.min(lbI, lbList.length - 1)); else closeLB();
  });
  lbShare.addEventListener("click", async () => {
    const r = lbList[lbI]; if (lbMode !== "mine" || !r) return;
    if (r.shared) { await unshare(r); put(r); lbShow(lbI); toast("No longer shared"); return; }
    if (!confirm("Share this memory on the Community page?\nAnyone who visits will be able to see the photo and the reflection you wrote.")) return;
    const res = await share(r); put(r);
    if (res === "fail") { lbShow(lbI); return; }
    closeLB(); arriveRec = r;                                  // fly to the Community and show the fish arriving, like adding one to your own ring
    await go("community");
    await commLoaded; await playArrive();
    toast(res === "live" ? "Shared with the Community" : "Shared (preview, only on this device for now)");
  });
  $m("#lbCommunityOnly") && 0;

  /* ================= sharing: talks to server.js if it is there, otherwise a local preview ================= */
  let live = null;
  const api = (path, opt) => fetch("api/" + path, Object.assign({ cache: "no-store" }, opt));
  async function isLive() { if (live !== null) return live; try { const r = await api("moments"); live = r.ok && /json/.test(r.headers.get("content-type") || ""); } catch (e) { live = false; } return live; }
  async function share(m) {
    if (await isLive()) {
      try {
        const r = await api("moments", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ data: m.data, tf: m.tf, note: m.note }) });
        if (r.ok) { const j = await r.json(); m.shared = true; m.remoteId = j.id; m.token = j.token; return "live"; }
      } catch (e) {}
      toast("Could not reach the Community right now"); return "fail";
    }
    m.shared = true; return "preview";
  }
  async function unshare(m) {
    if (live && m.remoteId) { try { await api("moments/" + m.remoteId + "?token=" + encodeURIComponent(m.token || ""), { method: "DELETE" }); } catch (e) {} }
    m.shared = false; delete m.remoteId; delete m.token;
  }

  /* ================= Community: everyone's shared moments on one ring ================= */
  const cStage = $m("#cStage"), cRingEl = $m("#cRing"); let pool = [], cCols = 0, arriveRec = null, arrivePos = null, arriveIdx = -1, commLoaded = Promise.resolve();
  const community = makeRing(cStage, cRingEl, { active: () => comm.classList.contains("active"), paused: () => lb.classList.contains("show"), onTap: card => { const p = card.dataset.id; if (p !== undefined && pool[+p]) openLB("comm", +p, pool); } });
  function loadCommunity() { return commLoaded = loadCommunityNow(); }
  async function loadCommunityNow() {
    let real = [];
    if (await isLive()) {
      cNote.innerHTML = '<span class="bi">Photos shared by visitors float among the Loy fish.</span> <span class="th">ภาพที่ผู้เข้าชมแชร์ลอยอยู่ท่ามกลางปลา Loy</span>';
      try { real = (await (await api("moments")).json()).slice(0, 150).map(r => ({ src: r.url, tf: r.tf || TF0(), note: r.note || r.caption || "" })); } catch (e) {}
    } else {
      cNote.innerHTML = '<span class="bi">Preview: shared photos only appear on this device until the site runs with its server. The artwork fish are examples.</span> <span class="th">แสดงตัวอย่าง ภาพที่แชร์จะเห็นเฉพาะในอุปกรณ์นี้จนกว่าเว็บไซต์จะทำงานร่วมกับเซิร์ฟเวอร์ ปลาที่เป็นงานศิลป์เป็นตัวอย่าง</span>';
      real = items.filter(m => m.shared).sort((a, b) => b.t - a.t).map(m => ({ src: m.data, tf: m.tf, note: m.note, rec: m }));
    }
    if (arriveRec) { const i = real.findIndex(x => x.rec === arriveRec); arriveIdx = i >= 0 ? i : 0; } else arriveIdx = -1;   // live: the newest one is first
    pool = real.concat(OTHERS.map(o => ({ src: o.src, tf: TF0(), en: o.en, th: o.th, art: true })));
    buildCommunity(real.length);
  }
  async function playArrive() {
    const A = arrivePos, rec = arriveRec; arriveRec = null; if (!A) return;
    community.focus(A.r, A.c); await wait(1000);
    const it = pool[A.p], el = community.setCell(A.r, A.c, { cls: "", html: fishHTML(it.src, it.tf), id: A.p });
    if (el) { el.classList.add("arrive"); const b = document.createElement("i"); b.className = "c-burst"; el.appendChild(b); setTimeout(() => b.remove(), 1700); await wait(1500); el.classList.remove("arrive"); }
    arriveIdx = -1; arrivePos = null;
  }
  function buildCommunity(nReal) {
    const ROWS = 6, nArt = pool.length - nReal, cols = community.measure(ROWS, nReal), total = cols * ROWS, slot = new Array(total).fill(-1);
    for (let k = 0; k < nReal; k++) { let s = Math.floor((k + .5) * total / nReal); while (slot[s] !== -1) s = (s + 1) % total; slot[s] = k; }
    let a = 0; for (let s = 0; s < total; s++) if (slot[s] === -1) slot[s] = nReal + ((a++ * 5) % nArt);
    arrivePos = null;
    community.build(cols, ROWS, (r, c) => {
      const p = slot[r * cols + c], it = pool[p];
      if (p === arriveIdx && arriveIdx >= 0) { arrivePos = { r, c, p }; return { cls: "empty", html: '<span class="c-pop"><span class="m-fish"></span></span>' }; }   // held back until the arrival
      return { cls: "", html: fishHTML(it.src, it.tf), id: p };
    });
    community.start();
  }
  addEventListener("resize", () => {
    if (comm.classList.contains("active") && pool.length) buildCommunity(pool.filter(p => !p.art).length);
    if (view.classList.contains("active")) buildMine();
  });

  /* ================= opened by the app ================= */
  let ready = null;
  const boot = () => ready || (ready = (async () => {
    db = await openDB(); items = await loadAll();
    items.forEach(m => { if (m.note === undefined) m.note = m.caption || ""; });
  })());
  /* ================= saved rivers: each river you clear adds its fish to your ring, with the same arrival animation ================= */
  let givenMem = [], delivering = false;
  const given = () => { try { return JSON.parse(localStorage.getItem("loyFishGiven") || "[]"); } catch (e) { return givenMem; } };
  const setGiven = a => { givenMem = a; try { localStorage.setItem("loyFishGiven", JSON.stringify(a)); } catch (e) {} };
  async function deliverFish() {
    if (delivering) return; delivering = true;
    try {
      const have = given(), todo = CONFIG.characters.filter(d => cleared.has(d.id) && !have.includes(d.id));
      if (!todo.length) return;
      for (let i = 0; i < 80 && document.querySelector("#loader.show"); i++) await wait(100);   // let the loading screen finish first
      await wait(500);
      for (const d of todo) {
        if (!view.classList.contains("active")) return;
        setGiven(given().concat(d.id));
        if (items.some(m => m.fish === d.id)) continue;
        const rec = { id: "fish-" + d.id, fish: d.id, data: d.src, note: "You saved the " + d.name + ".", th: d.thai ? "คุณช่วย" + d.thai + "ไว้ได้แล้ว" : "", tf: TF0(), t: Date.now() };
        rec.slot = freeSlot(); items.push(rec); put(rec);
        if (persCols > mine.state.cols) buildMine();
        await reveal(rec);
      }
    } finally { delivering = false; }
  }
  window.openMoments = async function () { await boot(); closeLB(); buildMine(); deliverFish(); };
  window.openCommunity = async function () { await boot(); closeLB(); await loadCommunity(); };
})();
