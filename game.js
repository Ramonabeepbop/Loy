/* =========================================================
   RIVER DEFENCE — the tower-defence game (replaces connect-the-dots)
   Pollution floats down the river. Put your fish friends on the
   river or on the banks to stop it before it reaches the end.
   Every fish on the map has its own river (see GAME.stages).
   Everything you might want to tweak is in the GAME block below.
   ========================================================= */
const GAME = {
  startDP: 18,          // deploy points you start with (DP is what fish cost to place)
  maxDP: 60,
  dpPerSec: 1.0,        // DP you earn every second
  riverHealth: 5,       // how many bits of pollution can get through
  waveGap: 7,           // seconds before the next wave (it comes sooner if you clear the river)

  intro: "Pollution is floating down the river. Pick a fish below, then tap a glowing spot to place it. Don't let anything reach the end!",
  winText: "The river is clean again!",
  loseTitle: "Oh no!",
  loseText: "The river got polluted. Want to try again?",

  // ALL the game's pictures live in assets/game/ as PNGs. Replace any file (keep the name) or change the path here.
  art: {
    river: "assets/game/river.png",        // paper texture the river is cut from (any size, it tiles)
    bank: "assets/game/bank.png",          // one bank tile (a square; drawn once per tile)
    goal: "assets/game/goal.png",          // marker at the end of the river
    dropFull: "assets/game/drop-full.png", // river health, still safe
    dropEmpty: "assets/game/drop-empty.png", // river health, lost
  },

  // Your fish. where: "river" = placed on the water and blocks pollution, "bank" = placed on the grass and shoots from range.
  // img is the fish PNG, shotImg is what it throws. cost = DP. range is in tiles. Swap images / numbers freely.
  defenders: [
    { id: "friends",      name: "Keeper",  img: "assets/characters/friends.png",      where: "river", cost: 8,  hp: 130, block: 2, dmg: 9,  every: 0.9,  note: "Stands in the river, blocks 2 bits of pollution and fights them." },
    { id: "lotus-pond",   name: "Lotus",   img: "assets/characters/lotus-pond.png",   where: "bank",  cost: 9,  range: 2.3, dmg: 8,  every: 0.85, shotImg: "assets/game/shot-lotus.png",   note: "Cheap and steady. Splashes water at pollution in range." },
    { id: "dragon-waves", name: "Dragon",  img: "assets/characters/dragon-waves.png", where: "bank",  cost: 14, range: 2.2, dmg: 13, every: 1.1,  splash: 0.85, shotImg: "assets/game/shot-dragon.png", note: "Big splashes that hit a whole group at once." },
    { id: "lanterns",     name: "Lantern", img: "assets/characters/lanterns.png",     where: "bank",  cost: 16, range: 3.1, dmg: 42, every: 1.6,  shotImg: "assets/game/shot-lantern.png", note: "Slow but strong and shoots far. Great against oil and the trash heap." },
    { id: "whirlpool",    name: "Swirl",   img: "assets/characters/whirlpool.png",    where: "bank",  cost: 12, range: 2.1, dmg: 0,  every: 1,    slow: 0.5,  note: "Does no damage, but slows pollution nearby by half so your other fish get more shots." },
  ],

  // The bad stuff. speed is tiles per second. leak = river health lost if it gets through.
  // img is its PNG in assets/game/ (it's drawn at about 1 tile wide; size scales it).
  enemies: {
    bottle: { name: "Bottle",      img: "assets/game/enemy-bottle.png", imgs: ["assets/game/enemy-bottle.png", "assets/game/enemy-bottle2.png"], hp: 42,  speed: 0.85, leak: 1, dmg: 5,  every: 1.0, size: 1,    slots: 1 },
    bag:    { name: "Plastic bag", img: "assets/game/enemy-bag.png",    hp: 20,  speed: 1.55, leak: 1, dmg: 0,  every: 1.0, size: 0.95, slots: 1, flying: true },
    oil:    { name: "Oil slick",   img: "assets/game/enemy-oil.png",    hp: 150, speed: 0.55, leak: 1, dmg: 9,  every: 1.2, size: 1.1,  slots: 1 },
    boss:   { name: "Trash heap",  img: "assets/game/enemy-boss.png",   hp: 800, speed: 0.4,  leak: 3, dmg: 15, every: 1.2, size: 1.6,  slots: 2 },
  },

  // The waves every stage uses unless it brings its own `waves`. Each group: kind, n = how many, gap = seconds between each,
  // at = seconds after the wave starts. Later stages (higher `level`) get more and tougher pollution automatically.
  waves: [
    [{ kind: "bottle", n: 5, gap: 2.4, at: 0 }],
    [{ kind: "bottle", n: 6, gap: 2.0, at: 0 }, { kind: "bag", n: 3, gap: 2.5, at: 6 }],
    [{ kind: "oil", n: 2, gap: 5, at: 0 }, { kind: "bottle", n: 6, gap: 1.8, at: 2 }],
    [{ kind: "bag", n: 8, gap: 1.0, at: 0 }, { kind: "oil", n: 3, gap: 4.5, at: 3 }, { kind: "bottle", n: 5, gap: 1.6, at: 10 }],
    [{ kind: "bottle", n: 8, gap: 1.4, at: 0 }, { kind: "oil", n: 3, gap: 4, at: 4 }, { kind: "boss", n: 1, gap: 1, at: 14 }, { kind: "bag", n: 6, gap: 1.2, at: 18 }],
  ],

  // One stage per fish on the map (the key is the fish id). cols x rows is the board size.
  // river = the [column, row] tiles the water flows through, in order. It must start and end on the edge of the board
  // (it flows in from outside the first tile and out past the last one). Everything else is river bank.
  // difficulty (1-5 dots) is shown before you start; if you leave it out it is worked out from level.
  // endless: true = no end: the waves keep coming and keep getting harder until all your river health is gone.
  //   (clearAt = which wave you must reach for the fish to start glowing on the map).
  // level (0 = gentle) makes the waves bigger and tougher. You can also give a stage its own `waves` and `startDP`.
  stages: {
    "rice-fields":     { level: 0, cols: 8, rows: 5, river: [[0,2],[1,2],[2,2],[3,2],[3,1],[4,1],[5,1],[5,2],[5,3],[6,3],[7,3]] },
    "friends":         { level: 1, cols: 8, rows: 5, river: [[1,0],[1,1],[1,2],[2,2],[3,2],[3,1],[4,1],[5,1],[5,2],[5,3],[4,3],[4,4]] },
    "blossoms":        { level: 2, cols: 8, rows: 5, river: [[0,3],[1,3],[1,2],[1,1],[2,1],[3,1],[3,2],[3,3],[4,3],[5,3],[5,2],[5,1],[5,0]] },
    "sky-lanterns":    { level: 3, cols: 8, rows: 5, river: [[0,3],[1,3],[2,3],[2,2],[2,1],[3,1],[4,1],[4,2],[4,3],[5,3],[6,3],[6,2],[6,1],[7,1]] },
    "lotus-pond":      { level: 4, cols: 8, rows: 5, river: [[0,2],[1,2],[2,2],[2,1],[2,0],[3,0],[4,0],[5,0],[5,1],[5,2],[5,3],[5,4],[6,4],[7,4]] },
    "lanterns":        { level: 5, cols: 8, rows: 5, river: [[0,1],[1,1],[2,1],[2,2],[2,3],[3,3],[4,3],[4,2],[4,1],[5,1],[6,1],[6,2],[6,3],[7,3]] },
    "whirlpool":       { level: 6, cols: 8, rows: 5, river: [[0,4],[1,4],[2,4],[3,4],[4,4],[4,3],[4,2],[3,2],[2,2],[2,1],[2,0],[3,0],[4,0],[5,0],[6,0],[6,1],[6,2],[6,3],[7,3]] },
    "dragon-waves":    { level: 7, cols: 8, rows: 5, river: [[0,0],[1,0],[2,0],[3,0],[3,1],[3,2],[2,2],[1,2],[1,3],[1,4],[2,4],[3,4],[4,4],[5,4],[5,3],[5,2],[5,1],[6,1],[7,1]] },
    "floating-market": { level: 3, endless: true, clearAt: 8, cols: 9, rows: 5, river: [[0,4],[1,4],[1,3],[1,2],[1,1],[2,1],[3,1],[3,2],[3,3],[4,3],[5,3],[5,2],[5,1],[6,1],[7,1],[7,2],[7,3],[8,3]] },
  },
};

/* ---------------------------------------------------------
   Setup
   --------------------------------------------------------- */
const TD_INK = "#453536", TD_RIVER = "#4f8fde", TD_RIVER_LIGHT = "#86b6f0", TD_YELLOW = "#f2c94c";
const tdBoard = $("#tdBoard"), tdCv = $("#tdCanvas"), tdCx = tdCv.getContext("2d");
const tdTray = $("#tdTray"), tdTip = $("#tdTip"), tdPop = $("#tdPop"), tdBanner = $("#tdBanner");
const tdDef = Object.fromEntries(GAME.defenders.map(d => [d.id, d]));
// the stage being played (set by tdSetStage): board size, river tiles, waves
let TDS = null, tdRiverIdx = new Map(), tdPts = [];
function tdSetStage(id) {
  const first = Object.keys(GAME.stages)[0], key = GAME.stages[id] ? id : first, st = GAME.stages[key];
  const lv = st.level || 0;
  const waves = st.endless ? [] : st.waves || GAME.waves.map(w => w.map(g => ({ ...g, n: Math.max(1, Math.round(g.n * (1 + .12 * lv))), gap: g.gap / (1 + .04 * lv) })));
  TDS = { ...st, id: key, waves, hpMul: 1 + .08 * lv, startDP: st.startDP || GAME.startDP };
  tdRiverIdx = new Map(st.river.map((t, i) => [t[0] + "," + t[1], i]));
  // path points: the river tiles plus one tile beyond each end so things float in and out smoothly
  const r = st.river, a = r[0], b = r[1], y = r[r.length - 2], z = r[r.length - 1];
  tdPts = [[a[0] - (b[0] - a[0]), a[1] - (b[1] - a[1])], ...r, [z[0] + (z[0] - y[0]), z[1] + (z[1] - y[1])]];
}
// every picture the game uses is loaded from the PNG paths in GAME (a missing file just falls back to a drawn shape)
const tdImgs = {};
function tdLoad(src) { if (src && !tdImgs[src]) { const im = new Image(); im.src = src; tdImgs[src] = im; } return tdImgs[src]; }
const tdOk = src => { const im = src && tdImgs[src]; return im && im.complete && im.naturalWidth ? im : null; };
[...GAME.defenders.flatMap(d => [d.img, d.shotImg]), ...Object.values(GAME.enemies).flatMap(d => d.imgs || [d.img]), ...Object.values(GAME.art)].forEach(tdLoad);
let tdRiverPattern = null;

const TD = {
  running: false, over: false, t: 0, dp: 0, health: 0, wave: -1, waveT: 0, countdown: -1, waiting: false,
  queue: [], enemies: [], units: [], shots: [], fx: [], speed: 1, sel: null, selUnit: null, tipDrag: false,
};
let tdTile = 40, tdOx = 0, tdOy = 0, tdFlip = false, tdDpr = 1, tdW = 0, tdH = 0, tdHover = null, tdLast = 0, tdRaf = 0, tdUid = 0;

/* ---------------------------------------------------------
   Layout & coordinates   (a "grid" point is in tile units: tile [c,r] covers c..c+1, r..r+1)
   --------------------------------------------------------- */
function tdLayout() {
  const r = tdBoard.getBoundingClientRect();
  tdW = Math.max(10, r.width); tdH = Math.max(10, r.height);
  tdFlip = innerHeight > innerWidth * 0.9;              // portrait screens: the river flows top to bottom
  const C = tdFlip ? TDS.rows : TDS.cols, R = tdFlip ? TDS.cols : TDS.rows;
  tdTile = Math.max(20, Math.floor(Math.min(tdW / C, tdH / R)));
  tdOx = Math.round((tdW - C * tdTile) / 2); tdOy = Math.round((tdH - R * tdTile) / 2);
  tdDpr = Math.min(devicePixelRatio || 1, 2.5);
  tdCv.width = Math.round(tdW * tdDpr); tdCv.height = Math.round(tdH * tdDpr);
}
const tdX = (gx, gy) => tdFlip ? tdOx + gy * tdTile : tdOx + gx * tdTile;
const tdY = (gx, gy) => tdFlip ? tdOy + gx * tdTile : tdOy + gy * tdTile;
function tdTileAt(clientX, clientY) {
  const r = tdCv.getBoundingClientRect(), x = clientX - r.left - tdOx, y = clientY - r.top - tdOy;
  const gx = tdFlip ? y / tdTile : x / tdTile, gy = tdFlip ? x / tdTile : y / tdTile;
  const c = Math.floor(gx), rr = Math.floor(gy);
  return c >= 0 && rr >= 0 && c < TDS.cols && rr < TDS.rows ? [c, rr] : null;
}
function tdPathPos(p) {
  const i = Math.max(0, Math.min(tdPts.length - 2, Math.floor(p))), f = Math.max(0, Math.min(1, p - i));
  const a = tdPts[i], b = tdPts[i + 1];
  return [a[0] + (b[0] - a[0]) * f + 0.5, a[1] + (b[1] - a[1]) * f + 0.5];
}
const tdUnitAt = (c, r) => TD.units.find(u => u.c === c && u.r === r);
function tdCanPlace(def, c, r) {
  if (c < 0 || r < 0 || c >= TDS.cols || r >= TDS.rows) return false;
  if (tdUnitAt(c, r)) return false;
  return (def.where === "river") === tdRiverIdx.has(c + "," + r);
}

/* ---------------------------------------------------------
   Game flow
   --------------------------------------------------------- */
// difficulty shown before you click in: { n: 1-5 dots, label, endless }
function tdRating(id) {
  const st = GAME.stages[id]; if (!st) return null;
  if (st.endless) return { n: 5, label: "Endless", endless: true };
  const n = st.difficulty || Math.min(5, 1 + Math.floor((st.level || 0) / 2));
  return { n, label: ["Easy", "Gentle", "Medium", "Hard", "Very hard"][n - 1], endless: false };
}
function tdRatingHTML(id) {
  const r = tdRating(id); if (!r) return "";
  return `<span class="diff-dots">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= r.n ? "on" : ""}"></i>`).join("")}</span> ${r.label}${r.endless ? " ∞" : ""}`;
}
// the endless river: every wave is bigger, faster and tougher than the last
function tdEndlessWave(w) {
  const g = [{ kind: "bottle", n: 5 + Math.floor(w * 1.3), gap: Math.max(.6, 2.2 - .1 * w), at: 0 }];
  if (w >= 1) g.push({ kind: "bag", n: 1 + Math.floor(w * 1.1), gap: Math.max(.5, 1.6 - .06 * w), at: 3 });
  if (w >= 2) g.push({ kind: "oil", n: 1 + Math.floor(w / 2), gap: Math.max(1.2, 4 - .2 * w), at: 2 });
  if (w % 5 === 4) g.push({ kind: "boss", n: Math.floor(w / 5) + 1, gap: 6, at: 10 });
  return g;
}
const tdWaveCount = () => TDS.endless ? Infinity : TDS.waves.length;
const tdBestKey = () => CONFIG.progressKey + "Best";
function tdBest(id, set) {
  let all = {}; try { all = JSON.parse(localStorage.getItem(tdBestKey()) || "{}"); } catch (e) {}
  if (set != null && set > (all[id] || 0)) { all[id] = set; try { localStorage.setItem(tdBestKey(), JSON.stringify(all)); } catch (e) {} }
  return all[id] || 0;
}
let tdStageId = null;
const tdTitle = () => { const f = CONFIG.characters.find(c => c.id === TDS.id); return f ? f.name : "The river"; };
function startGame(id) {
  cancelAnimationFrame(tdRaf);
  if (typeof id === "string") tdStageId = id;          // (Try again calls this with a click event, so it keeps the same stage)
  tdSetStage(tdStageId);
  tdRiverPattern = null;
  Object.assign(TD, { running: false, over: false, t: 0, dp: TDS.startDP, health: GAME.riverHealth, wave: -1, waveT: 0,
    countdown: -1, waiting: false, queue: [], enemies: [], units: [], shots: [], fx: [], speed: 1, sel: null, selUnit: null });
  $("#tdSpeed").textContent = "1×";
  $("#tdEnd").classList.remove("show");
  $("#tdIntro").classList.add("show");
  $("#tdIntroTitle").textContent = tdTitle();
  $("#tdIntroText").textContent = TDS.endless ? "The pollution never stops and keeps getting worse. How long can you keep the river clean? The game ends when all your river health is gone." : GAME.intro;
  const best = TDS.endless ? tdBest(TDS.id) : 0;
  $("#tdIntroDiff").innerHTML = "Difficulty: " + tdRatingHTML(TDS.id) + (best ? ` &middot; Best: round ${best}` : "") + `<br>${rewardText(TDS.id)}`;
  tdBanner.classList.remove("show");
  tdPop.classList.remove("show");
  buildTray(); tdHud(); tdTipText();
  tdLayout();
  tdLast = performance.now();
  tdRaf = requestAnimationFrame(tdFrame);
}
function tdBegin() {
  $("#tdIntro").classList.remove("show");
  TD.running = true; TD.countdown = 1.5;
}
function tdStartWave() {
  TD.wave++; TD.waveT = 0; TD.waiting = false; TD.countdown = -1;
  const q = [];
  (TDS.endless ? tdEndlessWave(TD.wave) : TDS.waves[TD.wave]).forEach(g => { for (let i = 0; i < g.n; i++) q.push({ t: g.at + i * g.gap, kind: g.kind }); });
  TD.queue = q.sort((a, b) => a.t - b.t);
  if (TDS.endless && TD.wave + 1 === (TDS.clearAt || 8)) { markCleared(TDS.id); toast("Your fish is glowing! Keep going for a high score"); }
  tdHud();
}
function tdShowBanner(text) {
  tdBanner.textContent = text; tdBanner.classList.remove("show"); void tdBanner.offsetWidth; tdBanner.classList.add("show");
}
function tdSpawn(kind) {
  const def = GAME.enemies[kind];
  const grow = TDS.endless ? 1 + .1 * Math.max(0, TD.wave) : 1, hp = Math.round(def.hp * TDS.hpMul * grow);
  TD.enemies.push({ id: ++tdUid, kind, def, hp, maxHp: hp, spd: TDS.endless ? Math.min(1.7, 1 + .025 * Math.max(0, TD.wave)) : 1, p: 0, blocker: null, atk: 0, slow: 1, flash: 0, seed: Math.random() * 10, slot: 0, img: def.imgs ? def.imgs[(Math.random() * def.imgs.length) | 0] : def.img });
}
function tdWin() {
  TD.over = true; TD.running = false;
  markCleared(TDS.id);                                   // this fish now glows on the map
  const earned = awardStage(TDS.id);                     // points to spend in the shop
  $("#revealPoints").textContent = earned ? `+${earned} points! Spend them in the Shop.` : "";
  tdShowBanner(GAME.winText);
  setTimeout(() => {
    if (current !== "game") return;
    go("reveal").then(() => { startConfetti(); setTimeout(() => $("#view-reveal").classList.add("copy"), 1800); });
  }, 1500);
}
function tdLose() {
  TD.over = true; TD.running = false; tdPop.classList.remove("show");
  if (TDS.endless) {
    const reached = TD.wave + 1, prev = tdBest(TDS.id), best = Math.max(prev, reached); tdBest(TDS.id, reached);
    const pts = awardEndless(reached - prev);            // points only for waves beyond your best
    $("#tdEndTitle").textContent = "The river is overwhelmed!";
    $("#tdEndText").textContent = `You lasted ${reached} rounds.` + (reached > prev && prev ? " That's a new best!" : ` Best: ${best}.`) + (pts ? ` +${pts} points!` : "");
  } else {
    $("#tdEndTitle").textContent = GAME.loseTitle;
    $("#tdEndText").textContent = GAME.loseText;
  }
  setTimeout(() => { if (current === "game") $("#tdEnd").classList.add("show"); }, 600);
}

/* ---------------------------------------------------------
   Simulation (dt in game seconds; no drawing in here)
   --------------------------------------------------------- */
function tdHurtEnemy(e, dmg) {
  if (e.hp <= 0) return;
  e.hp -= dmg; e.flash = 0.12;
  if (e.hp <= 0) {
    tdDropEnemy(e);
    const c = tdPathPos(e.p);
    for (let i = 0; i < 6; i++) { const a = rand(0, 6.28); TD.fx.push({ k: "bit", x: c[0], y: c[1], vx: Math.cos(a) * rand(.5, 1.6), vy: Math.sin(a) * rand(.5, 1.6), life: .5, age: 0, col: e.kind === "oil" ? "#3b2c30" : e.kind === "boss" ? "#8a7a79" : "#bfe3ee" }); }
  }
}
function tdDropEnemy(e) {
  const i = TD.enemies.indexOf(e); if (i >= 0) TD.enemies.splice(i, 1);
  if (e.blocker) { const b = e.blocker.blocking; const j = b.indexOf(e); if (j >= 0) b.splice(j, 1); e.blocker = null; }
}
function tdRemoveUnit(u) {
  u.blocking.slice().forEach(e => { e.blocker = null; });
  u.blocking.length = 0;
  const i = TD.units.indexOf(u); if (i >= 0) TD.units.splice(i, 1);
  if (TD.selUnit === u) { TD.selUnit = null; tdPop.classList.remove("show"); }
}
function tdPlace(id, c, r) {
  const def = tdDef[id];
  if (!def || !tdCanPlace(def, c, r) || TD.dp < def.cost || TD.over) return false;
  TD.dp -= def.cost;
  const u = { id: ++tdUid, def, c, r, hp: def.hp || 1, cd: 0.3, blocking: [], pulse: 0, born: 0, idx: tdRiverIdx.get(c + "," + r) };
  TD.units.push(u);
  TD.fx.push({ k: "ring", x: c + .5, y: r + .5, life: .5, age: 0, r0: .3, r1: .8, col: TD_YELLOW });
  return true;
}
const tdUsed = u => u.blocking.reduce((n, e) => n + e.def.slots, 0);

function tdUpdate(dt) {
  if (!TD.running || TD.over) return;
  TD.t += dt;
  TD.dp = Math.min(GAME.maxDP, TD.dp + GAME.dpPerSec * dt);

  // waves
  if (TD.countdown >= 0) { TD.countdown -= dt; if (TD.countdown < 0) tdStartWave(); }
  if (TD.wave >= 0) {
    TD.waveT += dt;
    while (TD.queue.length && TD.queue[0].t <= TD.waveT) tdSpawn(TD.queue.shift().kind);
    if (!TD.queue.length && TD.wave < tdWaveCount() - 1) {
      if (!TD.waiting) { TD.waiting = true; TD.countdown = GAME.waveGap; }
      else if (!TD.enemies.length && TD.countdown > 2.5) TD.countdown = 2.5;
    }
  }

  // slows from whirlpools
  TD.enemies.forEach(e => { e.slow = 1; });
  TD.units.forEach(u => {
    if (!u.def.slow) return;
    TD.enemies.forEach(e => {
      const p = tdPathPos(e.p);
      if (Math.hypot(p[0] - (u.c + .5), p[1] - (u.r + .5)) <= u.def.range) e.slow = Math.min(e.slow, u.def.slow);
    });
  });

  // enemies
  for (const e of TD.enemies.slice()) {
    e.flash = Math.max(0, e.flash - dt);
    if (e.blocker) {
      e.atk -= dt;
      if (e.atk <= 0 && e.def.dmg) {
        e.atk += e.def.every; e.blocker.hp -= e.def.dmg; e.blocker.hurt = 0.12;
        if (e.blocker.hp <= 0) tdRemoveUnit(e.blocker);
      }
      continue;
    }
    e.p += e.def.speed * e.spd * e.slow * dt;
    if (!e.def.flying) {
      for (const u of TD.units) {
        if (!u.def.block) continue;
        const kp = u.idx + 1;
        if (e.p >= kp - 0.02 && e.p <= kp + 0.5 && tdUsed(u) + e.def.slots <= u.def.block) {
          e.blocker = u; e.atk = 0.4; u.blocking.push(e); e.slot = u.blocking.length - 1;
          if (e.p < kp) e.p = kp;
          break;
        }
      }
    }
    if (e.p >= tdPts.length - 1.5) {
      tdDropEnemy(e);
      TD.health -= e.def.leak; TD.hurtT = 0.4; tdHud(true);
      if (TD.health <= 0) { TD.health = 0; tdHud(); tdLose(); return; }
    }
  }

  // defenders
  TD.units.forEach(u => {
    const d = u.def;
    u.pulse = Math.max(0, u.pulse - dt * 4); u.hurt = Math.max(0, (u.hurt || 0) - dt); u.born += dt;
    u.cd = Math.max(0, u.cd - dt);
    if (d.block) {
      if (u.cd <= 0 && u.blocking.length) { tdHurtEnemy(u.blocking[0], d.dmg); u.cd = d.every; u.pulse = 1; }
    } else if (d.dmg) {
      if (u.cd <= 0) {
        let best = null, bp = -1;
        TD.enemies.forEach(e => {
          const p = tdPathPos(e.p);
          if (Math.hypot(p[0] - (u.c + .5), p[1] - (u.r + .5)) <= d.range && e.p > bp) { best = e; bp = e.p; }
        });
        if (best) {
          TD.shots.push({ x: u.c + .5, y: u.r + .5, t: best, lx: 0, ly: 0, dmg: d.dmg, splash: d.splash || 0, col: d.shot || TD_YELLOW, img: d.shotImg });
          u.cd = d.every; u.pulse = 1;
        }
      }
    }
  });

  // shots
  for (const s of TD.shots.slice()) {
    let tx, ty;
    if (s.t && TD.enemies.includes(s.t)) { const p = tdPathPos(s.t.p); tx = s.lx = p[0]; ty = s.ly = p[1]; } else { tx = s.lx; ty = s.ly; s.t = null; }
    const dx = tx - s.x, dy = ty - s.y, dist = Math.hypot(dx, dy), step = 9 * dt;
    if (dist <= step + 0.05) {
      TD.shots.splice(TD.shots.indexOf(s), 1);
      if (s.splash) {
        TD.fx.push({ k: "ring", x: tx, y: ty, life: .4, age: 0, r0: .1, r1: s.splash, col: s.col });
        TD.enemies.slice().forEach(e => { const p = tdPathPos(e.p); if (Math.hypot(p[0] - tx, p[1] - ty) <= s.splash) tdHurtEnemy(e, s.dmg); });
      } else if (s.t) {
        tdHurtEnemy(s.t, s.dmg);
        TD.fx.push({ k: "ring", x: tx, y: ty, life: .25, age: 0, r0: .05, r1: .3, col: s.col });
      }
    } else { s.x += dx / dist * step; s.y += dy / dist * step; }
  }

  TD.fx.forEach(f => { f.age += dt; if (f.k === "bit") { f.x += f.vx * dt; f.y += f.vy * dt; } });
  TD.fx = TD.fx.filter(f => f.age < f.life);
  TD.hurtT = Math.max(0, (TD.hurtT || 0) - dt);

  // win
  if (!TDS.endless && TD.wave === TDS.waves.length - 1 && !TD.queue.length && !TD.enemies.length) tdWin();
}

/* ---------------------------------------------------------
   Drawing
   --------------------------------------------------------- */
function tdRR(c, x, y, w, h, r) {
  c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}
function tdEyes(c, R, dy, angry) {
  for (const s of [-1, 1]) {
    c.fillStyle = "#fff"; c.beginPath(); c.arc(s * R * .3, dy, R * .2, 0, 6.3); c.fill();
    c.lineWidth = Math.max(1, R * .05); c.stroke();
    c.fillStyle = TD_INK; c.beginPath(); c.arc(s * R * .3 - s * R * .03, dy + R * .03, R * .09, 0, 6.3); c.fill();
    if (angry) { c.beginPath(); c.moveTo(s * R * .55, dy - R * .34); c.lineTo(s * R * .08, dy - R * .18); c.lineWidth = Math.max(1.5, R * .08); c.stroke(); }
  }
}
function tdDrawEnemy(c, e, x, y, R, now) {
  const def = e.def, k = e.kind;
  y += Math.sin(now * 4 + e.seed) * R * .07;
  c.save(); c.translate(x, y);
  c.lineWidth = Math.max(1.5, R * .09); c.strokeStyle = TD_INK; c.lineJoin = "round"; c.lineCap = "round";
  const eimg = e.img || def.img;
  if (tdOk(eimg)) {
    const im = tdOk(eimg), s = R * 3.4, ar = im.naturalWidth / im.naturalHeight;
    const w = ar >= 1 ? s : s * ar, h = ar >= 1 ? s / ar : s;
    c.rotate(Math.sin(now * 2.2 + e.seed) * .07);
    c.drawImage(im, -w / 2, -h / 2, w, h);
  } else if (k === "bottle") {
    c.rotate(Math.sin(now * 2 + e.seed) * .25);
    c.fillStyle = "#bfe3ee"; tdRR(c, -R * .5, -R * .8, R, R * 1.7, R * .32); c.fill(); c.stroke();
    c.fillStyle = "#F4F2EF"; tdRR(c, -R * .24, -R * 1.1, R * .48, R * .34, R * .1); c.fill(); c.stroke();
    c.fillStyle = "#6fb3d1"; c.fillRect(-R * .46, -R * .05, R * .92, R * .5);
    c.fillStyle = TD_INK; c.strokeStyle = TD_INK; tdEyes(c, R * .9, R * .2, true);
  } else if (k === "bag") {
    c.scale(1 + Math.sin(now * 6 + e.seed) * .07, 1 - Math.sin(now * 6 + e.seed) * .05);
    c.fillStyle = "#F4F2EF";
    c.beginPath(); c.arc(-R * .32, -R * .78, R * .24, Math.PI, 0); c.stroke(); c.beginPath(); c.arc(R * .32, -R * .78, R * .24, Math.PI, 0); c.stroke();
    c.beginPath(); c.moveTo(-R * .55, -R * .7); c.quadraticCurveTo(-R * .95, R * .2, -R * .6, R * .8); c.quadraticCurveTo(0, R * 1.05, R * .6, R * .8);
    c.quadraticCurveTo(R * .95, R * .2, R * .55, -R * .7); c.closePath(); c.fill(); c.stroke();
    tdEyes(c, R * .9, R * .05, true);
  } else if (k === "oil") {
    c.beginPath();
    for (let i = 0; i <= 12; i++) { const a = i / 12 * 6.2832, rr = R * (1 + .13 * Math.sin(i * 2 + now * 3 + e.seed)); const px = Math.cos(a) * rr * 1.15, py = Math.sin(a) * rr * .85; i ? c.lineTo(px, py) : c.moveTo(px, py); }
    c.closePath(); c.fillStyle = "#3b2c30"; c.fill(); c.stroke();
    c.lineWidth = Math.max(1.5, R * .07);
    c.strokeStyle = "rgba(120,215,200,.85)"; c.beginPath(); c.arc(-R * .1, -R * .1, R * .7, 3.6, 4.6); c.stroke();
    c.strokeStyle = "rgba(200,130,235,.8)"; c.beginPath(); c.arc(R * .1, R * .1, R * .62, 0.4, 1.4); c.stroke();
    c.strokeStyle = "#fff"; tdEyes(c, R * .9, -R * .02, true);
  } else {            // boss: a big heap of rubbish
    const wob = Math.sin(now * 3 + e.seed) * R * .03;
    c.fillStyle = "#8a7a79"; c.beginPath(); c.arc(-R * .45, R * .2 + wob, R * .62, 0, 6.3); c.fill(); c.stroke();
    c.fillStyle = "#a39392"; c.beginPath(); c.arc(R * .5, R * .25 - wob, R * .6, 0, 6.3); c.fill(); c.stroke();
    c.fillStyle = "#6d5f5e"; c.beginPath(); c.arc(0, -R * .15, R * .78, 0, 6.3); c.fill(); c.stroke();
    c.fillStyle = "#2f2527"; c.beginPath(); c.arc(-R * .62, R * .42, R * .26, 0, 6.3); c.fill(); c.stroke();
    c.fillStyle = "#bfe3ee"; c.save(); c.translate(R * .72, -R * .55); c.rotate(.7); tdRR(c, -R * .13, -R * .4, R * .26, R * .8, R * .1); c.fill(); c.stroke(); c.restore();
    c.strokeStyle = "#fff"; tdEyes(c, R * 1.15, -R * .12, true);
  }
  c.restore();
  if (e.flash > 0) { c.save(); c.globalAlpha = .55; c.fillStyle = "#fff"; c.beginPath(); c.arc(x, y, R * .95, 0, 6.3); c.fill(); c.restore(); }
  if (e.hp < e.maxHp) {
    const w = R * 1.6;
    c.fillStyle = "rgba(0,0,0,.4)"; tdRR(c, x - w / 2, y - R * 1.85, w, 4, 2); c.fill();
    c.fillStyle = "#c2412d"; tdRR(c, x - w / 2, y - R * 1.85, Math.max(2, w * e.hp / e.maxHp), 4, 2); c.fill();
  }
}
function tdDrawUnit(c, u, now) {
  const d = u.def, T = tdTile, x = tdX(u.c + .5, u.r + .5), y = tdY(u.c + .5, u.r + .5);
  const pop = u.born < .25 ? 1 + (1 - u.born / .25) * .35 : 1, sc = pop * (1 + u.pulse * .1);
  c.fillStyle = "rgba(0,0,0,.28)"; c.beginPath(); c.ellipse(x, y + T * .28, T * .34, T * .12, 0, 0, 6.3); c.fill();
  const im = tdOk(d.img);
  if (im) {
    const box = T * .9 * sc, ar = im.naturalWidth / im.naturalHeight;
    const w = ar >= 1 ? box : box * ar, h = ar >= 1 ? box / ar : box;
    if (u.hurt > 0) { c.save(); c.globalAlpha = .6; }
    c.drawImage(im, x - w / 2, y - h / 2, w, h);
    if (u.hurt > 0) c.restore();
  }
  if (d.block) {
    const w = T * .7;
    c.fillStyle = "rgba(0,0,0,.4)"; tdRR(c, x - w / 2, y + T * .38, w, 5, 2.5); c.fill();
    c.fillStyle = "#3d8a5f"; tdRR(c, x - w / 2, y + T * .38, Math.max(3, w * u.hp / d.hp), 5, 2.5); c.fill();
  }
}
function tdRange(c, def, c0, r0, strong) {
  if (!def.range) return;
  const x = tdX(c0 + .5, r0 + .5), y = tdY(c0 + .5, r0 + .5);
  c.save(); c.beginPath(); c.arc(x, y, def.range * tdTile, 0, 6.3);
  c.fillStyle = "rgba(242,201,76," + (strong ? .2 : .12) + ")"; c.fill();
  c.setLineDash([6, 6]); c.strokeStyle = "rgba(244,242,239,.6)"; c.lineWidth = 1.5; c.stroke(); c.restore();
}

function tdDraw(now) {
  const c = tdCx, T = tdTile, t = now / 1000;
  c.setTransform(tdDpr, 0, 0, tdDpr, 0, 0); c.clearRect(0, 0, tdW, tdH);
  const gw = (tdFlip ? TDS.rows : TDS.cols) * T, gh = (tdFlip ? TDS.cols : TDS.rows) * T;
  c.save(); tdRR(c, tdOx, tdOy, gw, gh, 18); c.clip();

  // banks
  for (let r = 0; r < TDS.rows; r++) for (let q = 0; q < TDS.cols; q++) {
    if (tdRiverIdx.has(q + "," + r)) continue;
    const x = Math.min(tdX(q, r), tdX(q + 1, r + 1)), y = Math.min(tdY(q, r), tdY(q + 1, r + 1));
    const bank = tdOk(GAME.art.bank);
    if (bank) c.drawImage(bank, x + 1.5, y + 1.5, T - 3, T - 3);
    else { c.fillStyle = (q + r) % 2 ? "rgba(244,242,239,.10)" : "rgba(244,242,239,.07)"; tdRR(c, x + 1.5, y + 1.5, T - 3, T - 3, 8); c.fill(); }
  }

  // river (one fat line with a lighter middle and flowing ripples)
  const line = tdPts.map(p => [tdX(p[0] + .5, p[1] + .5), tdY(p[0] + .5, p[1] + .5)]);
  const strokeRiver = (w, col, dash, off) => {
    c.beginPath(); line.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]));
    c.lineWidth = w; c.strokeStyle = col; c.lineJoin = "round"; c.lineCap = "butt"; c.setLineDash(dash || []); c.lineDashOffset = off || 0; c.stroke(); c.setLineDash([]);
  };
  const paper = tdOk(GAME.art.river);
  if (paper) {
    // the river is cut from your paper texture, lying on the board with a soft shadow
    if (!tdRiverPattern) { tdRiverPattern = c.createPattern(paper, "repeat"); const k = Math.min(1, 1100 / paper.naturalWidth); tdRiverPattern.setTransform(new DOMMatrix().scale(k * .6)); }
    c.save(); c.shadowColor = "rgba(0,0,0,.5)"; c.shadowBlur = 9; c.shadowOffsetY = 3;
    strokeRiver(T * .88, tdRiverPattern); c.restore();
    c.globalAlpha = .35; strokeRiver(T * .05, "#fff", [T * .2, T * .55], -t * T * .6); c.globalAlpha = 1;
  } else {
    strokeRiver(T * .9, TD_RIVER); strokeRiver(T * .66, TD_RIVER_LIGHT);
    c.globalAlpha = .7; strokeRiver(T * .09, "#fff", [T * .22, T * .5], -t * T * .6); c.globalAlpha = 1;
  }

  // goal: a little krathong at the end of the river
  const last = tdPts[tdPts.length - 2], gxp = tdX(last[0] + .5, last[1] + .5), gyp = tdY(last[0] + .5, last[1] + .5), goal = tdOk(GAME.art.goal);
  if (goal) { const s = T * .8, ar = goal.naturalWidth / goal.naturalHeight; c.drawImage(goal, gxp - s * Math.min(1, ar) / 2, gyp - s / Math.max(1, ar) / 2 + Math.sin(t * 3) * T * .015, s * Math.min(1, ar), s / Math.max(1, ar)); }
  else {
    c.fillStyle = "#3d8a5f"; c.strokeStyle = TD_INK; c.lineWidth = 1.5; c.beginPath(); c.ellipse(gxp, gyp + T * .05, T * .27, T * .15, 0, 0, 6.3); c.fill(); c.stroke();
    c.fillStyle = TD_YELLOW; c.beginPath(); c.arc(gxp, gyp - T * .08, T * .1 + Math.sin(t * 5) * T * .01, 0, 6.3); c.fill(); c.stroke();
  }

  // where you can place the selected fish
  const sel = TD.sel ? tdDef[TD.sel] : null;
  if (sel && !TD.over) {
    const pulse = .5 + .5 * Math.sin(t * 5);
    for (let r = 0; r < TDS.rows; r++) for (let q = 0; q < TDS.cols; q++) {
      if (!tdCanPlace(sel, q, r)) continue;
      const x = Math.min(tdX(q, r), tdX(q + 1, r + 1)), y = Math.min(tdY(q, r), tdY(q + 1, r + 1));
      c.fillStyle = "rgba(242,201,76," + (.28 + pulse * .3) + ")"; tdRR(c, x + 3, y + 3, T - 6, T - 6, 9); c.fill();
      c.strokeStyle = "rgba(244,242,239,.75)"; c.lineWidth = 1.5; c.setLineDash([5, 4]); c.stroke(); c.setLineDash([]);
    }
    if (tdHover && tdCanPlace(sel, tdHover[0], tdHover[1])) {
      tdRange(c, sel, tdHover[0], tdHover[1], true);
      c.globalAlpha = .75;
      const im = tdOk(sel.img);
      if (im) { const box = T * .9, ar = im.naturalWidth / im.naturalHeight, w = ar >= 1 ? box : box * ar, h = ar >= 1 ? box / ar : box; const hx = tdX(tdHover[0] + .5, tdHover[1] + .5), hy = tdY(tdHover[0] + .5, tdHover[1] + .5); c.drawImage(im, hx - w / 2, hy - h / 2, w, h); }
      c.globalAlpha = 1;
    }
  }
  if (TD.selUnit) tdRange(c, TD.selUnit.def, TD.selUnit.c, TD.selUnit.r, true);
  TD.units.forEach(u => { if (u.def.slow) { c.save(); c.beginPath(); c.arc(tdX(u.c + .5, u.r + .5), tdY(u.c + .5, u.r + .5), u.def.range * T, 0, 6.3); c.fillStyle = "rgba(79,143,222,.10)"; c.fill(); c.restore(); } });

  // units, enemies, shots, effects
  TD.units.slice().sort((a, b) => (tdFlip ? a.c - b.c : a.r - b.r)).forEach(u => tdDrawUnit(c, u, t));
  TD.enemies.slice().sort((a, b) => a.p - b.p).forEach(e => {
    const p = tdPathPos(e.p), off = e.blocker ? (e.slot - .5) * .22 : 0;
    const gx = tdFlip ? p[0] : p[0], gy = p[1];
    // blocked enemies stand a little to the side so two fit on one tile
    const px = tdX(gx, gy + (tdFlip ? 0 : off)) + (tdFlip ? off * T : 0), py = tdY(gx, gy + (tdFlip ? 0 : off));
    tdDrawEnemy(c, e, px, py, T * .24 * e.def.size, t);
  });
  TD.shots.forEach(s => {
    const si = tdOk(s.img);
    if (si) { const w = T * .3, h = w * si.naturalHeight / si.naturalWidth; c.drawImage(si, tdX(s.x, s.y) - w / 2, tdY(s.x, s.y) - h / 2, w, h); return; }
    c.fillStyle = s.col; c.strokeStyle = TD_INK; c.lineWidth = 1; c.beginPath(); c.arc(tdX(s.x, s.y), tdY(s.x, s.y), T * .08, 0, 6.3); c.fill(); c.stroke(); });
  TD.fx.forEach(f => {
    const k = f.age / f.life;
    if (f.k === "ring") { c.globalAlpha = 1 - k; c.strokeStyle = f.col; c.lineWidth = 3; c.beginPath(); c.arc(tdX(f.x, f.y), tdY(f.x, f.y), (f.r0 + (f.r1 - f.r0) * k) * T, 0, 6.3); c.stroke(); c.globalAlpha = 1; }
    else { c.globalAlpha = 1 - k; c.fillStyle = f.col; c.beginPath(); c.arc(tdX(f.x, f.y), tdY(f.x, f.y), T * .05, 0, 6.3); c.fill(); c.globalAlpha = 1; }
  });
  c.restore();
  tdRR(c, tdOx, tdOy, gw, gh, 18); c.strokeStyle = "rgba(244,242,239,.28)"; c.lineWidth = 1.5; c.stroke();
}

/* ---------------------------------------------------------
   Frame loop
   --------------------------------------------------------- */
function tdFrame(now) {
  if (current !== "game") return;
  const dt = Math.min(0.05, (now - tdLast) / 1000); tdLast = now;
  const steps = TD.speed;                                  // 2× speed = two simulation steps
  for (let i = 0; i < steps; i++) tdUpdate(dt);
  tdDraw(now);
  tdHud();
  tdRaf = requestAnimationFrame(tdFrame);
}

/* ---------------------------------------------------------
   HUD, tray, tips
   --------------------------------------------------------- */
let tdHudKey = "";
function tdHud(force) {
  const key = [TD.wave, TD.health, Math.floor(TD.dp), TD.hurtT > 0, TD.sel, TDS && TDS.id].join("|");
  $("#tdDpBar").style.width = Math.min(100, TD.dp / GAME.maxDP * 100) + "%";
  if (key === tdHudKey && !force) return;
  tdHudKey = key;
  $("#tdDp").textContent = Math.floor(TD.dp);
  const hp = $("#tdHp");
  if (hp.children.length !== GAME.riverHealth) hp.innerHTML = Array.from({ length: GAME.riverHealth }, () => `<i><img src="${GAME.art.dropFull}" alt="" draggable="false"></i>`).join("");
  [...hp.children].forEach((el, i) => { el.classList.toggle("lost", i >= TD.health); const s = i >= TD.health ? GAME.art.dropEmpty : GAME.art.dropFull; const im = el.firstChild; if (im.getAttribute("src") !== s) im.src = s; });
  hp.classList.toggle("hit", TD.hurtT > 0);
  $$(".td-card", tdTray).forEach(b => {
    const d = tdDef[b.dataset.id];
    b.classList.toggle("poor", TD.dp < d.cost);
    b.classList.toggle("on", TD.sel === d.id);
  });
}
function buildTray() {
  tdTray.innerHTML = "";
  GAME.defenders.forEach(d => {
    const b = document.createElement("button");
    b.className = "td-card"; b.dataset.id = d.id; b.title = d.note || d.name;
    b.setAttribute("aria-label", `${d.name}, costs ${d.cost}. ${d.note || ""}`);
    b.innerHTML = `<img src="${d.img}" alt="" draggable="false"><span class="td-cost">${d.cost}</span><span class="td-name">${d.name}</span>`;
    tdTray.appendChild(b);
  });
}
function tdTipText() {
  const d = TD.sel ? tdDef[TD.sel] : null;
  if (TD.over) { tdTip.innerHTML = ""; return; }
  if (!d) { tdTip.textContent = TD.units.length ? "Tap a fish on the board to take it back" : "Tap a fish below to see what it does"; return; }
  // what this fish does, then how to place it
  const how = TD.dp < d.cost ? "Wait for more DP…" : `Tap a glowing ${d.where === "river" ? "river" : "bank"} tile, or drag it there.`;
  tdTip.innerHTML = `<b>${d.name}</b> · ${d.note}<br><span>${how}</span>`;
}
function tdSelect(id) {
  TD.sel = TD.sel === id ? null : id;
  TD.selUnit = null; tdPop.classList.remove("show");
  tdHud(true); tdTipText();
}

/* ---------------------------------------------------------
   Input — tap a card then a tile, or drag a card onto a tile
   --------------------------------------------------------- */
const tdGhost = document.createElement("img");
tdGhost.className = "td-ghost"; tdGhost.draggable = false; document.body.appendChild(tdGhost);
let tdDrag = null;

tdTray.addEventListener("pointerdown", e => {
  const b = e.target.closest(".td-card"); if (!b || !TD.running) return;
  tdDrag = { id: b.dataset.id, x: e.clientX, y: e.clientY, active: false, wasOn: TD.sel === b.dataset.id, pid: e.pointerId };
});
addEventListener("pointermove", e => {
  if (!tdDrag || e.pointerId !== tdDrag.pid) return;
  if (!tdDrag.active && Math.hypot(e.clientX - tdDrag.x, e.clientY - tdDrag.y) > 10) {
    tdDrag.active = true; TD.sel = tdDrag.id; tdHud(true); tdTipText();
    tdGhost.src = tdDef[tdDrag.id].img; tdGhost.classList.add("show");
  }
  if (tdDrag.active) {
    const lift = e.pointerType === "mouse" ? 0 : 46;       // lift the ghost above a finger so you can see it
    tdGhost.style.left = e.clientX + "px"; tdGhost.style.top = (e.clientY - lift) + "px";
    tdHover = tdTileAt(e.clientX, e.clientY - lift);
  }
});
addEventListener("pointerup", e => {
  if (!tdDrag || e.pointerId !== tdDrag.pid) return;
  const d = tdDrag; tdDrag = null; tdGhost.classList.remove("show");
  if (d.active) {
    const lift = e.pointerType === "mouse" ? 0 : 46, t = tdTileAt(e.clientX, e.clientY - lift);
    tdHover = null;
    if (t && tdPlace(d.id, t[0], t[1])) TD.sel = null;
    tdHud(true); tdTipText();
  } else {
    // a plain tap on the card: select it (tap again to put it down)
    if (d.wasOn) { TD.sel = null; tdHud(true); tdTipText(); } else tdSelect(d.id);
  }
});
addEventListener("pointercancel", () => { tdDrag = null; tdGhost.classList.remove("show"); tdHover = null; });

tdCv.addEventListener("pointermove", e => { if (e.pointerType === "mouse") tdHover = tdTileAt(e.clientX, e.clientY); });
tdCv.addEventListener("pointerleave", () => { tdHover = null; });
tdCv.addEventListener("click", e => {
  if (!TD.running || TD.over) return;
  const t = tdTileAt(e.clientX, e.clientY);
  if (TD.sel) {
    if (t && tdPlace(TD.sel, t[0], t[1])) { TD.sel = null; tdHud(true); tdTipText(); return; }
    if (t && TD.dp < tdDef[TD.sel].cost && tdCanPlace(tdDef[TD.sel], t[0], t[1])) { tdTip.classList.remove("nudge"); void tdTip.offsetWidth; tdTip.classList.add("nudge"); return; }
  }
  const u = t && tdUnitAt(t[0], t[1]);
  if (u) { TD.sel = null; TD.selUnit = u; tdHud(true); tdTipText(); showPop(u); }
  else { TD.selUnit = null; tdPop.classList.remove("show"); }
});
function showPop(u) {
  const x = tdX(u.c + .5, u.r + .5), y = tdY(u.c + .5, u.r + .5);
  $("#tdRetreat").textContent = `Take back (+${Math.floor(u.def.cost / 2)})`;
  tdPop.querySelector("b").textContent = u.def.name;
  tdPop.querySelector("small").textContent = u.def.note || "";
  tdPop.classList.add("show");
  const w = tdPop.offsetWidth;
  tdPop.style.left = Math.max(w / 2 + 4, Math.min(tdW - w / 2 - 4, x)) + "px";
  tdPop.style.top = Math.max(0, y - tdTile * .55) + "px";
  tdPop.classList.toggle("below", y - tdTile * .55 < 46);
  if (tdPop.classList.contains("below")) tdPop.style.top = (y + tdTile * .55) + "px";
}
$("#tdRetreat").addEventListener("click", () => {
  const u = TD.selUnit; if (!u) return;
  TD.dp = Math.min(GAME.maxDP, TD.dp + Math.floor(u.def.cost / 2));
  TD.fx.push({ k: "ring", x: u.c + .5, y: u.r + .5, life: .4, age: 0, r0: .5, r1: .2, col: "#F4F2EF" });
  tdRemoveUnit(u); TD.selUnit = null; tdPop.classList.remove("show"); tdHud(true); tdTipText();
});
$("#tdSpeed").addEventListener("click", () => { TD.speed = TD.speed === 1 ? 2 : 1; $("#tdSpeed").textContent = TD.speed + "×"; });
$("#tdStart").addEventListener("click", tdBegin);
$("#tdRetry").addEventListener("click", startGame);

if (window.ResizeObserver) new ResizeObserver(() => { if (current === "game") { tdLayout(); if (tdPop.classList.contains("show") && TD.selUnit) showPop(TD.selUnit); } }).observe(tdBoard);
addEventListener("resize", () => { if (current === "game") tdLayout(); });

// small hook so the game can be tested from the console / automated tests
window.__td = { TD, GAME, update: tdUpdate, place: tdPlace, begin: tdBegin, canPlace: tdCanPlace };
