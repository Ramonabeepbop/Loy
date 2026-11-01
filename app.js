/* =========================================================
   CONFIG — everything you'll likely want to swap lives here
   ========================================================= */
const CONFIG = {
  worldBackground: "assets/art/world-bg.webp", // the pannable background, an animated image (set in index.html too)
  panHintText: { mouse: "drag to move<br>around!", touch: "swipe to move<br>around!" },
  tapHintText: "Tap to<br>play!",      // fades in over one fish at a time
  tapHintEvery: [5000, 9000],           // ms between hints (random in this range)
  tapHintStays: 3000,                   // ms each hint stays visible
  worldScale: 1.7,                         // map size = this × the screen on computers / landscape (bigger = more to explore)
  worldScalePortrait: 1.35,                // same, for phones held upright
  // Where the map is centred on screen when the site first opens (fractions of the whole map; 0.5/0.5 = dead centre).
  // Smaller x = start further left, smaller y = start further up. Nudge these to taste.
  startCenter: { x: 0.51, y: 0.62 },

  // Fish positions are the centre of each fish as a fraction (0-1) of the map, measured from your layout PNG.
  // Fish width is 188 units on the 2000-unit-wide layout (see .w-item in style.css).
  characters: [
    { id: "rice-fields", name: "Mun River", src: "assets/characters/rice-fields.png", x: 0.4530, y: 0.3363,
      thai: "แม่น้ำมูล", blurb: "แม่น้ำมูล",
      story: "The Mun winds across Isan, the rice country of northeastern Thailand, before it joins the mighty Mekong." },
    { id: "lanterns", name: "Nan River", src: "assets/characters/lanterns.png", x: 0.6460, y: 0.4303,
      thai: "แม่น้ำน่าน", blurb: "แม่น้ำน่าน",
      story: "The Nan flows down from the northern mountains. Near Nakhon Sawan it meets the Ping, and together they become the Chao Phraya." },
    { id: "dragon-waves", name: "Mekong River", src: "assets/characters/dragon-waves.png", x: 0.7950, y: 0.1793,
      thai: "แม่น้ำโขง", blurb: "แม่น้ำโขง",
      story: "The Mekong runs along Thailand's northern and northeastern border. Old tales tell of glowing naga fireballs rising from its waters." },
    { id: "sky-lanterns", name: "Ping River", src: "assets/characters/sky-lanterns.png", x: 0.3600, y: 0.5470,
      thai: "แม่น้ำปิง", blurb: "แม่น้ำปิง",
      palette: ["#5851B2", "#E25F36", "#ED9332", "#F3B63A", "#BF98AF", "#EBD9C7"],   // picked from this fish's artwork
      story: "The Ping flows through Chiang Mai, where thousands of sky lanterns light up the night sky during Yi Peng." },
    { id: "whirlpool", name: "Yom River", src: "assets/characters/whirlpool.png", x: 0.2370, y: 0.2351,
      thai: "แม่น้ำยม", blurb: "แม่น้ำยม",
      story: "The Yom is one of Thailand's last big rivers that still flows freely, with no large dam along its way. It passes through Phrae and Sukhothai on the way south." },
    { id: "friends", name: "Chi River", src: "assets/characters/friends.png", x: 0.4525, y: 0.8441,
      thai: "แม่น้ำชี", blurb: "แม่น้ำชี",
      story: "The Chi is the longest river that stays entirely inside Thailand. It travels across Isan before meeting the Mun." },
    { id: "blossoms", name: "Kok River", src: "assets/characters/blossoms.png", x: 0.1640, y: 0.7875,
      thai: "แม่น้ำกก", blurb: "แม่น้ำกก",
      story: "The Kok begins in the hills of Myanmar and flows through Chiang Rai before joining the Mekong." },
    { id: "lotus-pond", name: "Wang River", src: "assets/characters/lotus-pond.png", x: 0.6200, y: 0.7231,
      thai: "แม่น้ำวัง", blurb: "แม่น้ำวัง",
      story: "The Wang runs through Lampang in the north and joins the Ping on its long journey towards the Chao Phraya." },
    { id: "floating-market", name: "Chao Phraya River", src: "assets/characters/floating-market.png", x: 0.8215, y: 0.8073,
      thai: "แม่น้ำเจ้าพระยา", blurb: "แม่น้ำเจ้าพระยา",
      story: "The Chao Phraya, the river of kings, flows through Bangkok to the sea. Every year people float their krathongs on it for Loy Krathong." },
  ],
  defaultStory: "Every river has stories to tell, and you helped keep this one clean.", // shown after the river game; override per character with `story: "..."`

  // Art shown after you win a river. Each fish can have its own: drop a PNG called <fish id>.png (e.g. rice-fields.png) into
  // assets/art/coloring/ and assets/art/reveal/. If a fish has no file of its own these two are used.
  revealImage: "assets/art/reveal-logo.png",
  sharedReveal: true, // every river shows the Loy fish on the win page; set false to use per-river reveal art,
  glowImage: "assets/game/glow.png",       // the soft yellow glow behind a fish whose river you have saved
  loadingMs: 2600,                          // how long the yellow loading screen shows between pages (0 = no loading screen)
  funFacts: [                                // one pops up under the loading bar each time, in a shuffled order
    { en: "Loy Krathong is held on the night of the full moon of the 12th lunar month, usually in November.", th: "ลอยกระทงจัดในคืนวันเพ็ญเดือน 12 ซึ่งมักตรงกับเดือนพฤศจิกายน" },
    { en: "\u201cLoy\u201d means to float, and a krathong is a small floating basket.", th: "\u201cลอย\u201d แปลว่าลอยน้ำ และกระทงคือภาชนะเล็ก ๆ ที่ลอยได้" },
    { en: "Even krathongs made of natural materials add up. When so many are floated at once, they cannot break down fast enough, so cleanup crews have to collect them.", th: "แม้กระทงที่ทำจากวัสดุธรรมชาติ เมื่อลอยพร้อมกันจำนวนมากก็ย่อยสลายไม่ทัน ทีมทำความสะอาดจึงต้องคอยเก็บขึ้นจากน้ำ" },
    { en: "Many people thank Phra Mae Khongkha, the water goddess, when they float a krathong.", th: "หลายคนขอบคุณพระแม่คงคา เทพีแห่งสายน้ำ เมื่อลอยกระทง" },
    { en: "Bread krathongs are not as kind as people think. Fish cannot eat that much, and the bread dissolves in the water before cleanup crews can collect it.", th: "กระทงขนมปังไม่ได้ดีต่อแม่น้ำอย่างที่คนเข้าใจ ปลากินได้ไม่หมด และขนมปังละลายในน้ำก่อนที่ทีมทำความสะอาดจะเก็บได้ทัน" },
    { en: "The Chao Phraya is nicknamed the river of kings.", th: "แม่น้ำเจ้าพระยาได้ชื่อว่าเป็นแม่น้ำแห่งกษัตริย์" },
    { en: "The Chi is the longest river that stays entirely inside Thailand.", th: "แม่น้ำชีเป็นแม่น้ำที่ยาวที่สุดที่ไหลอยู่ภายในประเทศไทยทั้งสาย" },
    { en: "The Mekong runs along Thailand\u2019s northern and northeastern border.", th: "แม่น้ำโขงไหลเลียบชายแดนด้านเหนือและตะวันออกเฉียงเหนือของไทย" },
    { en: "The Yom is one of Thailand\u2019s last big rivers that still flows freely, with no large dam.", th: "แม่น้ำยมเป็นหนึ่งในแม่น้ำสายใหญ่ไม่กี่สายของไทยที่ยังไหลอย่างอิสระ ไม่มีเขื่อนขนาดใหญ่" },
    { en: "In Chiang Mai, the Yi Peng festival fills the sky with lanterns around the same time as Loy Krathong.", th: "ที่เชียงใหม่ งานยี่เป็งปล่อยโคมลอยเต็มท้องฟ้าในช่วงเดียวกับลอยกระทง" },
    { en: "A full bath can use more than twice as much water as a short shower.", th: "การแช่น้ำในอ่างเต็มใช้น้ำมากกว่าอาบน้ำสั้น ๆ มากกว่าสองเท่า" },
    { en: "Turning off the tap while you brush your teeth can save around ten litres each time.", th: "ปิดก๊อกน้ำขณะแปรงฟันช่วยประหยัดน้ำได้ราว 10 ลิตรในแต่ละครั้ง" },
    { en: "A tap that drips all year can waste thousands of litres of water.", th: "ก๊อกน้ำที่หยดตลอดทั้งปีอาจทำให้น้ำเสียไปหลายพันลิตร" },
    { en: "Watering plants in the early morning or evening wastes less water, because less of it evaporates.", th: "การรดน้ำต้นไม้ตอนเช้าตรู่หรือเย็นช่วยประหยัดน้ำ เพราะระเหยไปน้อยกว่า" },
    { en: "Less than one percent of the world\u2019s water is fresh water that is easy for people to use.", th: "น้ำจืดที่คนใช้ได้ง่ายมีไม่ถึงหนึ่งเปอร์เซ็นต์ของน้ำทั้งโลก" },
    { en: "Fish and birds can mistake tiny bits of plastic for food, which is why foam and plastic krathongs hurt rivers.", th: "ปลาและนกอาจกินเศษพลาสติกชิ้นเล็ก ๆ เพราะนึกว่าเป็นอาหาร กระทงโฟมและพลาสติกจึงทำร้ายแม่น้ำ" },
  ],
  loaderImage: null,                        // null = the fish you picked floats; or set a PNG path to always show the same one
  progressKey: "loyCleared",                // where finished rivers are remembered in the browser

  // The shop: people earn points by saving rivers and swap them for these items.
  // Item pictures are in images/shop/.
  shop: {
    pointsKey: "loyPoints",                 // where the points / things people swapped are remembered in the browser
    clearReward: 30,                         // points for saving a river the first time...
    perLevel: 15,                            // ...plus this much for every difficulty level (see GAME.stages in game.js)
    replayRate: 0,                           // replaying a saved river pays this share (0 = points only the first time, so they can't be farmed)
    endlessPerWave: 5,                       // endless river: points for every round beyond your best...
    endlessMax: 100,                         // ...up to this many points in total
    limitPerPerson: 1,                       // how many items one person can swap in total (0 = no limit)
    categories: ["All items", "Loy keychain", "Ripple keychain"],
    categoriesTh: { "All items": "สินค้าทั้งหมด", "Loy keychain": "พวงกุญแจลอย", "Ripple keychain": "พวงกุญแจริปเปิล" },
    // Each item's picture lives in images/shop/ (see images/README.txt). `th` is the Thai text shown under the English.
    items: [
      { id: "loy-blue", name: "Loy keychain, blue", tags: ["keychain", "blue"], cat: "Loy keychain", price: 500, img: "images/shop/loy-blue.png",
        desc: "The original Loy fish keychain in blue. Clear acrylic with a gold clasp.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจลอย สีฟ้า", desc: "พวงกุญแจปลา Loy ดั้งเดิมสีฟ้า อะคริลิกใสพร้อมตะขอสีทอง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "loy-green", name: "Loy keychain, green", tags: ["keychain", "green"], cat: "Loy keychain", price: 500, img: "images/shop/loy-green.png",
        desc: "The original Loy fish keychain in green. Clear acrylic with a gold clasp.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจลอย สีเขียว", desc: "พวงกุญแจปลา Loy ดั้งเดิมสีเขียว อะคริลิกใสพร้อมตะขอสีทอง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "loy-red", name: "Loy keychain, red", tags: ["keychain", "red"], cat: "Loy keychain", price: 500, img: "images/shop/loy-red.png",
        desc: "The original Loy fish keychain in red. Clear acrylic with a gold clasp.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจลอย สีแดง", desc: "พวงกุญแจปลา Loy ดั้งเดิมสีแดง อะคริลิกใสพร้อมตะขอสีทอง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "loy-yellow", name: "Loy keychain, yellow", tags: ["keychain", "yellow"], cat: "Loy keychain", price: 500, img: "images/shop/loy-yellow.png",
        desc: "The original Loy fish keychain in yellow. Clear acrylic with a gold clasp.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจลอย สีเหลือง", desc: "พวงกุญแจปลา Loy ดั้งเดิมสีเหลือง อะคริลิกใสพร้อมตะขอสีทอง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-whirlpool", name: "Ripple keychain, Yom", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-whirlpool.png",
        desc: "The Yom River fish as a shiny ripple keychain.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล แม่น้ำยม", desc: "ปลาแห่งแม่น้ำยม ในรูปพวงกุญแจริปเปิลแวววาว", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-friends", name: "Ripple keychain, Chi", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-friends.png",
        desc: "The Chi River fish as a shiny ripple keychain.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล แม่น้ำชี", desc: "ปลาแห่งแม่น้ำชี ในรูปพวงกุญแจริปเปิลแวววาว", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-floating-market", name: "Ripple keychain, Chao Phraya", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-floating-market.png",
        desc: "The Chao Phraya River fish as a shiny ripple keychain.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล แม่น้ำเจ้าพระยา", desc: "ปลาแห่งแม่น้ำเจ้าพระยา ในรูปพวงกุญแจริปเปิลแวววาว", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-lotus-pond", name: "Ripple keychain, Wang", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-lotus-pond.png",
        desc: "The Wang River fish as a shiny ripple keychain.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล แม่น้ำวัง", desc: "ปลาแห่งแม่น้ำวัง ในรูปพวงกุญแจริปเปิลแวววาว", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-blossoms", name: "Ripple keychain, Kok", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-blossoms.png",
        desc: "The Kok River fish as a shiny ripple keychain.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล แม่น้ำกก", desc: "ปลาแห่งแม่น้ำกก ในรูปพวงกุญแจริปเปิลแวววาว", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-lanterns", name: "Ripple keychain, Nan", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-lanterns.png",
        desc: "The Nan River fish as a shiny ripple keychain.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล แม่น้ำน่าน", desc: "ปลาแห่งแม่น้ำน่าน ในรูปพวงกุญแจริปเปิลแวววาว", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-dragon-waves", name: "Ripple keychain, Mekong", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-dragon-waves.png",
        desc: "The Mekong River fish as a shiny ripple keychain.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล แม่น้ำโขง", desc: "ปลาแห่งแม่น้ำโขง ในรูปพวงกุญแจริปเปิลแวววาว", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-rice-fields", name: "Ripple keychain, Mun", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-rice-fields.png",
        desc: "The Mun River fish as a shiny ripple keychain.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล แม่น้ำมูล", desc: "ปลาแห่งแม่น้ำมูล ในรูปพวงกุญแจริปเปิลแวววาว", details: ["อะคริลิก", "ตะขอสีทอง"] } },
    ],
  },

  // Coloring
  coloringPage: "assets/art/coloring-page.png",   // fallback page; transparent PNG line-art works best
  palette: ["#CD545B", "#418FDE", "#228848", "#F1BE48", "#453536"],   // the brand colours: red, blue, green, yellow, black
  confettiColors: ["#CD545B", "#418FDE", "#228848", "#F1BE48"],
  shareText: "Look what I colored!",
};

// For now every river uses the same coloring page and palette. Set sharedColoring to null to give each fish its own
// (assets/art/coloring/<fish id>.png and an optional palette on the fish).
CONFIG.sharedColoring = {
  page: "assets/art/coloring/sky-lanterns.png",
  palette: ["#5851B2", "#E25F36", "#ED9332", "#F3B63A", "#BF98AF", "#EBD9C7"],
};
CONFIG.characters.forEach(d => {
  if (CONFIG.sharedColoring) { d.coloring = CONFIG.sharedColoring.page; d.palette = CONFIG.sharedColoring.palette; }
  d.coloring = d.coloring || `assets/art/coloring/${d.id}.png`;
  d.reveal = (CONFIG.sharedReveal ? CONFIG.revealImage : d.reveal) || `assets/art/reveal/${d.id}.png`;
  d.about = d.about || `images/about/${d.id}.png`;        // the picture on this fish's About page
});

// which rivers have been saved (remembered in the browser; falls back to this visit only)
const cleared = new Set();
try { JSON.parse(localStorage.getItem(CONFIG.progressKey) || "[]").forEach(id => cleared.add(id)); } catch (e) {}
function markCleared(id) {
  cleared.add(id);
  try { localStorage.setItem(CONFIG.progressKey, JSON.stringify([...cleared])); } catch (e) {}
  applyCleared();
}
function applyCleared() { items.forEach(i => i.el.classList.toggle("cleared", cleared.has(i.d.id))); }
let currentFish = CONFIG.characters[0];

/* =========================================================
   Helpers
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const mod = (n, m) => ((n % m) + m) % m;
const rand = (a, b) => a + Math.random() * (b - a);

const views = { play: $("#view-play"), about: $("#view-about"), shop: $("#view-shop"), quiz: $("#view-quiz"), us: $("#view-us"), game: $("#view-game"), reveal: $("#view-reveal"), color: $("#view-color") };
let current = "play";

// Moving between pages shows the yellow loading screen (a fish floating over a loading bar). Returns a promise that
// resolves once the new page is visible.
let loading = false;
// fun facts: shuffled, and each one shows once before any repeats
let factQueue = [], lastFact = -1;
function nextFact() {
  const F = CONFIG.funFacts || [], el = $("#loaderFact"); if (!F.length || !el) return;
  if (!factQueue.length) {
    factQueue = F.map((_, i) => i).sort(() => Math.random() - 0.5);
    if (factQueue[factQueue.length - 1] === lastFact && F.length > 1) factQueue.unshift(factQueue.pop());   // never the same one twice in a row
  }
  const f = F[lastFact = factQueue.pop()];
  el.innerHTML = `<span class="fact-tag">Fun fact · รู้ไหมว่า</span>${f.en}<i class="th">${f.th}</i>`;
  el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop");
}
function go(name, opts = {}) {
  if (!views[name]) name = "play";
  if (opts.silent || name === current || !CONFIG.loadingMs) { showView(name, opts); return Promise.resolve(); }
  if (loading) return Promise.resolve();
  loading = true;
  const L = $("#loader"), fill = $("#loaderFill");
  $("#loaderFish").src = CONFIG.loaderImage || currentFish.src;
  nextFact();
  fill.style.transition = "none"; fill.style.transform = "scaleX(0)"; void fill.offsetWidth;
  L.classList.add("show");
  return new Promise(done => {
    setTimeout(() => {                                   // the screen now covers everything: swap the page underneath
      showView(name, opts);
      fill.style.transition = `transform ${CONFIG.loadingMs}ms cubic-bezier(.4,0,.2,1)`; fill.style.transform = "scaleX(1)";
      setTimeout(() => { L.classList.remove("show"); loading = false; setTimeout(done, 300); }, CONFIG.loadingMs + 150);
    }, 320);
  });
}
function showView(name, { silent = false } = {}) {
  Object.entries(views).forEach(([k, el]) => el.classList.toggle("active", k === name));
  current = name;
  document.body.classList.toggle("is-play", name === "play");
  document.body.classList.toggle("is-game", name === "game");
  if (!silent) history.replaceState(null, "", "#" + (name === "reveal" ? "play" : name));
  if (name === "play") closeBubble();
  if (name === "game") startGame(currentFish.id);
  if (name === "shop" && typeof renderShop === "function") renderShop();
  if (name === "quiz" && typeof startQuiz === "function") startQuiz();
  if (name === "color") requestAnimationFrame(layoutPaint);
  if (name !== "reveal") $("#view-reveal").classList.remove("copy");
  stopConfetti(name !== "reveal");
}

$$("[data-go]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); go(a.dataset.go); }));
$$("[data-soon]").forEach(a => a.addEventListener("click", e => e.preventDefault()));

let toastTimer;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* =========================================================
   PLAY — draggable, wrapping world
   ========================================================= */
const world = $("#world"), inner = $("#worldInner"), bgImg = $("#worldBg");
const items = [];
let W = 2400, H = 1700, ox = 0, oy = 0, vx = 0, vy = 0, bgRatio = 2262 / 3200;
let dragging = false, focused = null, lastX = 0, lastY = 0, moved = 0;

function buildWorld() {
  CONFIG.characters.forEach(d => {
    const el = document.createElement("div");
    el.className = "w-item clickable";
    el.style.left = d.x * 100 + "%"; el.style.top = d.y * 100 + "%";
    el.innerHTML = `<img class="w-glow" src="${CONFIG.glowImage}" alt="" draggable="false"><img class="w-fish" src="${d.src}" alt="${d.name || ""}" draggable="false">`;
    // "Tap to play!" note + dashed curve that fades in around this fish
    const tip = document.createElement("span");
    tip.className = "tap-hint";
    tip.innerHTML = `<span class="th-in"><span class="th-text">${CONFIG.tapHintText}</span><img class="th-curve" src="assets/art/tap-curve.png" alt="" draggable="false"></span>`;
    el.appendChild(tip);
    inner.appendChild(el);
    const it = { el, d, tip };
    el.addEventListener("click", () => { if (moved < 6) focusItem(it); });
    items.push(it);
  });
  applyCleared();
  bgImg.src = CONFIG.worldBackground;
  // keep the map invisible until it is sized and positioned AND its picture and fonts have loaded, then show it all at once
  // (the labels start fading in at that moment, so nothing jumps or swaps font while it is on screen)
  let shown = false;
  const reveal = () => { if (shown) return; shown = true; sizeWorld(); inner.classList.add("ready"); };
  const imgReady = new Promise(res => {
    const done = () => { if (bgImg.naturalWidth) { bgRatio = bgImg.naturalHeight / bgImg.naturalWidth; sizeWorld(); } res(); };
    bgImg.complete ? done() : (bgImg.addEventListener("load", done), bgImg.addEventListener("error", res));
  });
  const fontsReady = document.fonts && document.fonts.load
    ? Promise.all([document.fonts.load('48px "Broadsheet"'), document.fonts.load('500 14px "Sukhumvit Set"')]).catch(() => {})
    : Promise.resolve();
  Promise.all([imgReady, fontsReady]).then(reveal);
  setTimeout(reveal, 2500);                        // never wait longer than this
  // the "drag" label says swipe on touch screens
  if (matchMedia("(pointer: coarse)").matches) $("#dragLabel").innerHTML = CONFIG.panHintText.touch;
  sizeWorld(true);
}

/* The map is a fixed-size picture (no looping); fish, labels and sizes all scale with it (1u = W/2000 px).
   Panning is clamped so you can't leave it. */
function sizeWorld(center) {
  const portrait = innerHeight > innerWidth * 1.1;
  const k = portrait ? CONFIG.worldScalePortrait : CONFIG.worldScale;
  let w = innerWidth * k, h = w * bgRatio;
  if (h < innerHeight * k) { h = innerHeight * k; w = h / bgRatio; }
  W = w; H = h;
  inner.style.width = W + "px"; inner.style.height = H + "px";
  inner.style.setProperty("--u", W / 2000 + "px");
  if (center) { ox = innerWidth / 2 - CONFIG.startCenter.x * W; oy = innerHeight / 2 - CONFIG.startCenter.y * H; }
  clampWorld();
  inner.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;   // set straight away so the map never flashes at its corner
}
function clampWorld() {
  const nx = Math.min(0, Math.max(innerWidth - W, ox)), ny = Math.min(0, Math.max(innerHeight - H, oy));
  if (nx !== ox) vx = 0;
  if (ny !== oy) vy = 0;
  ox = nx; oy = ny;
}
function tick() {
  if (current === "play") {
    if (!dragging && !focused) { ox += vx; oy += vy; vx *= 0.94; vy *= 0.94; if (Math.abs(vx) < .05) vx = 0; if (Math.abs(vy) < .05) vy = 0; }
    clampWorld();
    inner.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
  }
  if (focused) positionBubble();
  requestAnimationFrame(tick);
}

world.addEventListener("pointerdown", e => {
  if (focused) return;
  dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; vx = vy = 0;
  world.classList.add("dragging");
});
addEventListener("pointermove", e => {
  if (!dragging) return;
  const dx = e.clientX - lastX, dy = e.clientY - lastY;
  lastX = e.clientX; lastY = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
  ox += dx; oy += dy; vx = dx; vy = dy;
  if (moved > 24) dismissPanHint();
});
addEventListener("pointerup", () => { dragging = false; world.classList.remove("dragging"); });
addEventListener("pointercancel", () => { dragging = false; world.classList.remove("dragging"); });
world.addEventListener("wheel", e => { if (focused) return; dismissPanHint(); ox -= e.deltaX; oy -= e.deltaY; }, { passive: true });
addEventListener("keydown", e => { if (e.key === "Escape") closeBubble(); });

/* --- hints --- */
const panHint = $("#panHint");
let panHintDone = false;
function inView(el, m = 30) {
  const r = el.getBoundingClientRect();
  const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2;
  return cx > m && cx < innerWidth - m && cy > 90 && cy < innerHeight - m;
}
function showPanHint() {
  if (panHintDone) return;
  // the "drag to move around!" label lives on the map; if it isn't on screen (phones) show the same words pinned to the screen
  if (inView($("#dragLabel"))) return;
  panHint.innerHTML = CONFIG.panHintText[matchMedia("(pointer: coarse)").matches ? "touch" : "mouse"];
  panHint.classList.add("show");
  setTimeout(() => { if (!panHintDone) { panHint.classList.remove("show"); panHintDone = true; } }, 7000);
}
function dismissPanHint() { panHintDone = true; panHint.classList.remove("show"); }
setTimeout(showPanHint, 2400);

// every so often a "Tap to play!" note fades in around ONE visible fish (the first is always the rice-fields fish, like your layout)
function visibleFish() {
  const m = 16;
  const rects = items.map(i => ({ i, r: i.el.getBoundingClientRect() }));
  const full = rects.filter(({ r }) => r.left > m && r.right < innerWidth - m && r.top > 90 && r.bottom < innerHeight - m);
  const part = rects.filter(({ r }) => r.right > 40 && r.left < innerWidth - 40 && r.bottom > 140 && r.top < innerHeight - 100);
  return (full.length ? full : part).map(x => x.i);
}
let lastTip = null, firstTip = true;
// which side of the fish the note can sit on without touching any other text (null = neither side is clear)
function tipSide(i) {
  const r = i.el.getBoundingClientRect(), u = W / 2000, cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2, pad = 10;
  const others = [...document.querySelectorAll("#view-play .w-label, #view-play .pan-hint, .nav")].filter(e => e.classList.contains("nav") || e.classList.contains("w-label") || e.classList.contains("show")).map(e => e.getBoundingClientRect()).filter(b => b.width && b.height);
  const hit = (a, b) => a.left < b.right + pad && a.right > b.left - pad && a.top < b.bottom + pad && a.bottom > b.top - pad;
  const box = flip => { const x1 = cx - 300 * u, x2 = cx - 50 * u; return flip ? { left: 2 * cx - x2, right: 2 * cx - x1, top: cy - 75 * u, bottom: cy + 135 * u } : { left: x1, right: x2, top: cy - 75 * u, bottom: cy + 135 * u }; };
  const ok = flip => { const b = box(flip); return b.left > 6 && b.right < innerWidth - 6 && b.top > 70 && !others.some(o => hit(b, o)); };
  const pref = cx - 292 * u < 6;                       // the old rule: flip if the note would leave the screen
  if (ok(pref)) return pref ? "flip" : "left";
  if (ok(!pref)) return pref ? "left" : "flip";
  return null;
}
function tapHintLoop() {
  const [a, b] = CONFIG.tapHintEvery;
  setTimeout(() => {
    const idle = current === "play" && !focused && !dragging && !panHint.classList.contains("show");
    if (idle) {
      const vis = visibleFish();
      const centreOnScreen = i => { const r = i.el.getBoundingClientRect(), cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2; return cx > 20 && cx < innerWidth - 20 && cy > 100 && cy < innerHeight - 40; };
      let pick = firstTip ? items.find(i => i.d.id === "rice-fields" && !cleared.has("rice-fields") && centreOnScreen(i) && tipSide(i)) : null;
      if (!pick) { const clear = vis.filter(tipSide), fresh = clear.filter(i => !cleared.has(i.d.id)), base = fresh.length ? fresh : clear, pool = base.filter(i => i !== lastTip); pick = (pool.length ? pool : base)[((pool.length ? pool : base).length * Math.random()) | 0]; }
      if (pick) {
        const side = tipSide(pick);
        firstTip = false; lastTip = pick;
        const r = pick.el.getBoundingClientRect();
        const u = W / 2000;                                    // 1 unit of the layout file, in screen px
        pick.tip.classList.toggle("flip", side === "flip");   // note sits left of the fish like your layout; flips right if it would leave the screen or touch other text
        pick.tip.classList.add("show");
        setTimeout(() => pick.tip.classList.remove("show"), CONFIG.tapHintStays);
      }
    }
    tapHintLoop();
  }, firstTip ? 2600 : a + Math.random() * (b - a));
}
tapHintLoop();

/* --- bubble --- */
const bubble = $("#bubble");
function focusItem(it) {
  focused = it;
  items.forEach(i => i.tip && i.tip.classList.remove("show"));
  $("#view-play").classList.add("focus");
  items.forEach(i => i.el.classList.toggle("focused", i === it));
  $("#bubbleText").innerHTML = (it.d.thai ? it.d.thai + "\n" + it.d.name : it.d.name).replace(/\n/g, "<br>");
  if (typeof tdRatingHTML === "function") {     // difficulty of this fish's river, shown before you click in
    $("#bubbleDiff").innerHTML = "Difficulty: " + tdRatingHTML(it.d.id);
    $("[data-activity=game]").textContent = (GAME.stages[it.d.id] || {}).endless ? "Endless river" : "Defend the river";
  }
  bubble.classList.add("show");
  positionBubble();
}
function positionBubble() {
  if (!focused) return;
  const r = focused.el.getBoundingClientRect();
  const bw = bubble.offsetWidth || 150;
  let x = r.right + 10;
  if (x + bw > innerWidth - 8) x = Math.max(8, r.left - bw - 10);
  bubble.style.left = x + "px";
  bubble.style.top = Math.max(60, r.top + 10) + "px";
}
function closeBubble() {
  focused = null;
  bubble.classList.remove("show");
  $("#view-play").classList.remove("focus");
  items.forEach(i => i.el.classList.remove("focused"));
}
// the world is paused while focused, but clicks on empty space should close it
$("#view-play").addEventListener("click", e => {
  if (focused && !e.target.closest(".bubble") && !e.target.closest(".w-item.focused")) closeBubble();
});
bubble.addEventListener("click", e => {
  const b = e.target.closest("[data-activity]");
  if (!b) return;
  openFish(focused ? focused.d : CONFIG.characters[0]);
  go(b.dataset.activity);
});
// everything that depends on which fish was picked: its story, reveal picture and coloring page
function openFish(d) {
  currentFish = d;
  $("#revealTitle").innerHTML = `You saved the ${d.name}!` + (d.thai ? `<i class="th">คุณช่วย${d.thai}ไว้ได้แล้ว!</i>` : "");
  $("#revealBody").innerHTML = `${d.story || CONFIG.defaultStory}<i class="th">Thank you for taking care of the water. · ขอบคุณที่ช่วยดูแลน้ำ</i>`;
  setImg($("#revealImg"), d.reveal, CONFIG.revealImage);
  fillAbout(d);
  loadColoring(d.coloring, d.palette);
}
// the About page for a fish: big river name, short story, a photo and a link to the coloring page
function fillAbout(d) {
  const words = d.name.split(" "), last = words.pop();
  $("#aboutThai").textContent = d.thai || "";
  $("#aboutTitle").innerHTML = (words.length ? words.join(" ") + "<br>" : "") + last;
  $("#aboutBody").textContent = d.story || CONFIG.defaultStory;
  $("#aboutMeta").innerHTML = typeof tdRatingHTML === "function" ? "River challenge: " + tdRatingHTML(d.id) : "";
  setImg($("#aboutImg"), d.about, d.src);
}
// use a picture, or the fallback if that file doesn't exist
function setImg(img, src, fallback) {
  img.onerror = () => { img.onerror = null; if (fallback && img.getAttribute("src") !== fallback) img.src = fallback; };
  if (img.getAttribute("src") !== src) img.src = src;
}

/* confetti */
const cv = $("#confetti"), cx = cv.getContext("2d");
let parts = [], confettiRaf = 0;
function sizeConfetti() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; }
function startConfetti() {
  sizeConfetti();
  const ox0 = innerWidth / 2, oy0 = innerHeight * 0.38;
  parts = Array.from({ length: 240 }, () => {
    const a = rand(0, Math.PI * 2), s = rand(2, 15) * Math.random();
    return { x: ox0, y: oy0, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 2, r: rand(2.5, 8),
      c: CONFIG.confettiColors[(Math.random() * CONFIG.confettiColors.length) | 0], life: rand(160, 300), age: 0 };
  });
  cancelAnimationFrame(confettiRaf);
  (function loop() {
    cx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    cx.clearRect(0, 0, innerWidth, innerHeight);
    parts.forEach(p => {
      p.age++; p.vx *= 0.97; p.vy = p.vy * 0.97 + 0.06; p.x += p.vx; p.y += p.vy;
      cx.globalAlpha = Math.max(0, 1 - p.age / p.life);
      cx.fillStyle = p.c; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7); cx.fill();
    });
    parts = parts.filter(p => p.age < p.life);
    if (parts.length) confettiRaf = requestAnimationFrame(loop); else cx.clearRect(0, 0, innerWidth, innerHeight);
  })();
}
function stopConfetti(doIt) {
  if (!doIt) return;
  cancelAnimationFrame(confettiRaf); parts = []; cx.clearRect(0, 0, cv.width, cv.height);
}

/* =========================================================
   COLORING
   ========================================================= */
const stage = $("#paintStage"), paint = $("#paint"), art = $("#art"), pctx = paint.getContext("2d");
const cursor = $("#brushCursor"), sizeInput = $("#size");
let color = CONFIG.palette[0], erasing = false, drawing = false, lx = 0, ly = 0, picked = false;
let nw = 1600, nh = 1000;

let artSrc = "";
function loadColoring(src, pal) {
  if (src === artSrc) return;                 // same page as before: keep the painting
  artSrc = src; buildPalette(pal || CONFIG.palette); setImg(art, src, CONFIG.coloringPage);
}
function onArtLoad() {
  nw = art.naturalWidth || 1600; nh = art.naturalHeight || 1000;
  paint.width = nw; paint.height = nh;        // (resizing also clears the old painting)
  layoutPaint();
}
art.addEventListener("load", onArtLoad);
loadColoring(currentFish.coloring, currentFish.palette);

function layoutPaint() {
  const tools = $(".tools").getBoundingClientRect();
  const availW = innerWidth - 24;
  const availH = tools.top - 78 - 12;
  const k = Math.min(availW / nw, Math.max(availH, 120) / nh);
  stage.style.width = nw * k + "px"; stage.style.height = nh * k + "px";
  stage.style.top = Math.max(78 + 8, (tools.top + 78 - nh * k) / 2) + "px";   // centre in the free space
  updateCursorSize();
}

/* palette */
// builds the colour swatches. Each fish can bring its own `palette` (made from its artwork); otherwise the brand colours are used.
function buildPalette(list) {
  const palette = $("#palette");
  palette.innerHTML = "";
  color = list[0]; erasing = false; $("#btnEraser").setAttribute("aria-pressed", "false");
  list.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "swatch"; b.style.setProperty("--c", c); b.setAttribute("role", "radio");
    b.setAttribute("aria-checked", i === 0 ? "true" : "false"); b.setAttribute("aria-label", "Color " + (i + 1));
    b.addEventListener("click", () => {
      color = c; setErasing(false); picked = true; $("#pickHint").classList.add("gone");
      $$(".swatch").forEach(s => s.setAttribute("aria-checked", s === b ? "true" : "false"));
      document.documentElement.style.setProperty("--brush", c);
    });
    palette.appendChild(b);
  });
  document.documentElement.style.setProperty("--brush", color);
}

function setErasing(v) { erasing = v; $("#btnEraser").setAttribute("aria-pressed", v); }
$("#btnEraser").addEventListener("click", () => setErasing(!erasing));
$("#btnStartOver").addEventListener("click", () => { pctx.clearRect(0, 0, nw, nh); toast("Fresh page!"); });
sizeInput.addEventListener("input", updateCursorSize);

function brushPx() { return +sizeInput.value; }               // size in screen pixels
function updateCursorSize() { cursor.style.width = cursor.style.height = brushPx() + "px"; }

function pos(e) {
  const r = paint.getBoundingClientRect();
  return [(e.clientX - r.left) * nw / r.width, (e.clientY - r.top) * nh / r.height, nw / r.width];
}
function stroke(x0, y0, x1, y1, k) {
  pctx.globalCompositeOperation = erasing ? "destination-out" : "source-over";
  pctx.strokeStyle = pctx.fillStyle = color;
  pctx.lineWidth = brushPx() * k; pctx.lineCap = pctx.lineJoin = "round";
  pctx.beginPath(); pctx.moveTo(x0, y0); pctx.lineTo(x1, y1); pctx.stroke();
}
stage.addEventListener("pointerdown", e => {
  drawing = true; stage.setPointerCapture(e.pointerId);
  const [x, y, k] = pos(e); lx = x; ly = y; stroke(x, y, x, y, k);
});
stage.addEventListener("pointermove", e => {
  cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px";
  if (e.pointerType === "mouse") cursor.classList.add("show");
  if (!drawing) return;
  const [x, y, k] = pos(e); stroke(lx, ly, x, y, k); lx = x; ly = y;
});
["pointerup", "pointercancel"].forEach(t => stage.addEventListener(t, () => { drawing = false; }));
stage.addEventListener("pointerleave", () => cursor.classList.remove("show"));

/* save / share */
function composite() {
  const c = document.createElement("canvas"); c.width = nw; c.height = nh;
  const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.body).backgroundColor; x.fillRect(0, 0, nw, nh);
  x.drawImage(paint, 0, 0);
  x.globalCompositeOperation = "multiply"; x.drawImage(art, 0, 0, nw, nh);
  return c;
}
const toBlob = c => new Promise(r => c.toBlob(r, "image/png"));
function download(blob) {
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
  a.download = "my-coloring.png"; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
$("#btnSave").addEventListener("click", async () => { download(await toBlob(composite())); toast("Saved to your downloads"); });
$("#btnShare").addEventListener("click", async () => {
  const blob = await toBlob(composite());
  const file = new File([blob], "my-coloring.png", { type: "image/png" });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], text: CONFIG.shareText });
    } else {
      download(blob); toast("Image saved. Share it from your downloads");
    }
  } catch (_) { /* user cancelled */ }
});

/* =========================================================
   Water ripple on every click / tap (not while painting)
   ========================================================= */
const rippleLayer = $("#ripples");
document.addEventListener("pointerdown", e => {
  if (e.target.closest("#paintStage")) return;
  const r = document.createElement("div");
  r.className = "ripple"; r.style.left = e.clientX + "px"; r.style.top = e.clientY + "px";
  [[260, 0], [180, 0.12], [110, 0.26]].forEach(([size, delay]) => {
    const i = document.createElement("i"); i.style.setProperty("--r", size + "px"); i.style.setProperty("--d", delay + "s"); r.appendChild(i);
  });
  rippleLayer.appendChild(r);
  setTimeout(() => r.remove(), 2200);
}, true);

/* =========================================================
   Boot
   ========================================================= */
let lastW = innerWidth;
addEventListener("resize", () => {
  sizeWorld(false);
  if (current === "color") layoutPaint();
  lastW = innerWidth;
});
buildWorld();
tick();
const start = location.hash.slice(1);
// wait until every script (game.js too) has loaded before opening the first page
addEventListener("DOMContentLoaded", () => { fillAbout(currentFish); go(["color", "game", "about", "shop", "quiz", "us"].includes(start) ? start : "play", { silent: true }); });

// "Reset" in the menu: forget which rivers have been saved (the fish stop glowing)
$("#resetProgress").addEventListener("click", e => {
  e.preventDefault();
  if (!confirm("Reset the glowing fish? All saved rivers will be forgotten.")) return;
  cleared.clear();
  try { localStorage.removeItem(CONFIG.progressKey); } catch (err) {}
  applyCleared();
  toast("Progress reset");
});
