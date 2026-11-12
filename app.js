/* =========================================================
   CONFIG — everything you'll likely want to swap lives here
   ========================================================= */
const CONFIG = {
  worldBackground: "assets/art/world-bg.webp", // the pannable background, an animated image (set in index.html too)
  panHintText: { mouse: "drag to move<br>around!", touch: "swipe to move<br>around!" },
  tapHintText: "Tap a fish<br>to play!",      // fades in over one fish at a time
  tapHintEvery: [2200, 4200],           // ms between hints (random in this range)
  tapHintStays: 3400,                   // ms each hint stays visible
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
    moneyNote: "All proceeds go towards maintaining this site and supporting causes such as water conservation and river cleaning.",
    moneyNoteTh: "รายได้ทั้งหมดนำไปดูแลเว็บไซต์ และสนับสนุนกิจกรรมอนุรักษ์น้ำและทำความสะอาดแม่น้ำ",
    money: { symbol: "$", currency: "NZD", byCategory: { "Loy keychain": 15, "Ripple keychain": 15 } },   // real money prices (a preview only, no payment is taken)
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
      { id: "ripple-whirlpool", name: "Ripple keychain, Letting go", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-whirlpool.png",
        desc: "Letting go, a value from Thai culture, in our Ripple series: an acrylic keychain with a textured finish you can truly feel.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล การปล่อยวาง", desc: "การปล่อยวาง ค่านิยมของไทย ในซีรีส์ริปเปิล พวงกุญแจอะคริลิกพื้นผิวสัมผัสนูนที่สัมผัสได้จริง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-friends", name: "Ripple keychain, Social harmony", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-friends.png",
        desc: "Social harmony, a value from Thai culture, in our Ripple series: an acrylic keychain with a textured finish you can truly feel.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล ความสามัคคี", desc: "ความสามัคคี ค่านิยมของไทย ในซีรีส์ริปเปิล พวงกุญแจอะคริลิกพื้นผิวสัมผัสนูนที่สัมผัสได้จริง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-floating-market", name: "Ripple keychain, Sufficiency", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-floating-market.png",
        desc: "Sufficiency, a value from Thai culture, in our Ripple series: an acrylic keychain with a textured finish you can truly feel.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล ความพอเพียง", desc: "ความพอเพียง ค่านิยมของไทย ในซีรีส์ริปเปิล พวงกุญแจอะคริลิกพื้นผิวสัมผัสนูนที่สัมผัสได้จริง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-lotus-pond", name: "Ripple keychain, Purity", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-lotus-pond.png",
        desc: "Purity, a value from Thai culture, in our Ripple series: an acrylic keychain with a textured finish you can truly feel.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล ความบริสุทธิ์", desc: "ความบริสุทธิ์ ค่านิยมของไทย ในซีรีส์ริปเปิล พวงกุญแจอะคริลิกพื้นผิวสัมผัสนูนที่สัมผัสได้จริง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-blossoms", name: "Ripple keychain, Joy", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-blossoms.png",
        desc: "Joy, a value from Thai culture, in our Ripple series: an acrylic keychain with a textured finish you can truly feel.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล ความสุข", desc: "ความสุข ค่านิยมของไทย ในซีรีส์ริปเปิล พวงกุญแจอะคริลิกพื้นผิวสัมผัสนูนที่สัมผัสได้จริง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-lanterns", name: "Ripple keychain, Hope", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-lanterns.png",
        desc: "Hope, a value from Thai culture, in our Ripple series: an acrylic keychain with a textured finish you can truly feel.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล ความหวัง", desc: "ความหวัง ค่านิยมของไทย ในซีรีส์ริปเปิล พวงกุญแจอะคริลิกพื้นผิวสัมผัสนูนที่สัมผัสได้จริง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-dragon-waves", name: "Ripple keychain, Protection", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-dragon-waves.png",
        desc: "Protection, a value from Thai culture, in our Ripple series: an acrylic keychain with a textured finish you can truly feel.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล การปกป้อง", desc: "การปกป้อง ค่านิยมของไทย ในซีรีส์ริปเปิล พวงกุญแจอะคริลิกพื้นผิวสัมผัสนูนที่สัมผัสได้จริง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-rice-fields", name: "Ripple keychain, Respect for nature", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-rice-fields.png",
        desc: "Respect for nature, a value from Thai culture, in our Ripple series: an acrylic keychain with a textured finish you can truly feel.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล ความเคารพธรรมชาติ", desc: "ความเคารพธรรมชาติ ค่านิยมของไทย ในซีรีส์ริปเปิล พวงกุญแจอะคริลิกพื้นผิวสัมผัสนูนที่สัมผัสได้จริง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
      { id: "ripple-sky-lanterns", name: "Ripple keychain, Gratitude", tags: ["keychain", "ripple"], cat: "Ripple keychain", price: 500, img: "images/shop/ripple-sky-lanterns.png",
        desc: "Gratitude, a value from Thai culture, in our Ripple series: an acrylic keychain with a textured finish you can truly feel.", details: ["Acrylic", "Gold clasp"],
        th: { name: "พวงกุญแจริปเปิล ความกตัญญู", desc: "ความกตัญญู ค่านิยมของไทย ในซีรีส์ริปเปิล พวงกุญแจอะคริลิกพื้นผิวสัมผัสนูนที่สัมผัสได้จริง", details: ["อะคริลิก", "ตะขอสีทอง"] } },
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

const views = { play: $("#view-play"), about: $("#view-about"), shop: $("#view-shop"), quiz: $("#view-quiz"), us: $("#view-us"), game: $("#view-game"), reveal: $("#view-reveal"), color: $("#view-color"), moments: $("#view-moments"), community: $("#view-community"), festival: $("#view-festival") };
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
  document.body.classList.toggle("is-moments", name === "moments" || name === "community");
  document.body.dataset.view = name;
  if (!silent) history.replaceState(null, "", "#" + (name === "reveal" ? "play" : name));
  if (name === "play") closeBubble();
  if (name === "game") startGame(currentFish.id);
  if (name === "shop" && typeof renderShop === "function") renderShop();
  if (name === "moments" && typeof openMoments === "function") openMoments();
  if (name === "community" && typeof openCommunity === "function") openCommunity();
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
let glide = false;   // true while the map glides home after the intro
let homeAnchor = null;   // world point (as fractions) the intro centred; kept centred while the map finishes sizing, dropped on the first drag
function sizeWorld(center) {
  const portrait = innerHeight > innerWidth * 1.1;
  const k = portrait ? CONFIG.worldScalePortrait : CONFIG.worldScale;
  let w = innerWidth * k, h = w * bgRatio;
  if (h < innerHeight * k) { h = innerHeight * k; w = h / bgRatio; }
  W = w; H = h;
  inner.style.width = W + "px"; inner.style.height = H + "px";
  inner.style.setProperty("--u", W / 2000 + "px");
  if (center) { ox = innerWidth / 2 - CONFIG.startCenter.x * W; oy = innerHeight / 2 - CONFIG.startCenter.y * H; }
  if (homeAnchor) { ox = innerWidth / 2 - homeAnchor.x * W; oy = innerHeight / 2 - homeAnchor.y * H; }
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
  homeAnchor = null; glide = false;
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
  if (document.body.classList.contains("intro-on")) { setTimeout(showPanHint, 1500); return; }
  // the "drag to move around!" label lives on the map; if it isn't on screen (phones) show the same words pinned to the screen
  if (inView($("#dragLabel"))) return;
  panHint.innerHTML = CONFIG.panHintText[matchMedia("(pointer: coarse)").matches ? "touch" : "mouse"];
  panHint.classList.add("show");
  const watch = setInterval(() => {                      // never show the pinned note and the map label together
    if (panHintDone) return clearInterval(watch);
    if (inView($("#dragLabel"))) { dismissPanHint(); clearInterval(watch); }
  }, 150);
  setTimeout(() => { clearInterval(watch); if (!panHintDone) { panHint.classList.remove("show"); panHintDone = true; } }, 7000);
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
    const idle = !document.body.classList.contains("intro-on") && current === "play" && !focused && !dragging && !panHint.classList.contains("show");
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
  $("#revealBody").innerHTML = `Thank you for taking care of the water.<i class="th">ขอบคุณที่ช่วยดูแลน้ำ</i>`;
  setImg($("#revealImg"), d.reveal, CONFIG.revealImage);
  fillAbout(d);
  loadColoring(d.coloring, d.palette);
}
// the About page for a fish: big river name, short story, a photo and a link to the coloring page
const RIVER_VALUES = {
  "rice-fields": {
    "name": "Respect for nature",
    "th": "ความเคารพธรรมชาติ",
    "body": "Thai rice farming has always followed the rhythm of the water and the seasons, so it is no surprise that farmers honour Phra Mae Phosop, the rice goddess. Before planting, they ask her forgiveness, because the land that gives them life must be treated with care. That same spirit lives on in the Royal Ploughing Ceremony, held each year to mark the start of the planting season and to remind everyone that people and nature depend on each other.",
    "bodyTh": "การทำนาของไทยเดินตามจังหวะของน้ำและฤดูกาลมาโดยตลอด ชาวนาจึงเคารพพระแม่โพสพ เทพีแห่งข้าว และขออภัยท่านก่อนลงมือปลูก เพราะผืนดินที่ให้ชีวิตแก่พวกเขาต้องได้รับการดูแลอย่างอ่อนโยน น้ำใจเดียวกันนี้ยังคงอยู่ในพระราชพิธีพืชมงคลจรดพระนังคัลแรกนาขวัญ ซึ่งจัดขึ้นทุกปีเพื่อเริ่มต้นฤดูเพาะปลูก และเตือนใจทุกคนว่าคนกับธรรมชาติต้องพึ่งพากัน"
  },
  "friends": {
    "name": "Social harmony",
    "th": "ความสามัคคี",
    "body": "Samakkhi means togetherness, and it sits at the heart of village life in Thailand. You can see it in long khaek, an old custom in which neighbours gather to help one family harvest its rice or build its home. Nobody is paid, because the reward is food, laughter and the knowledge that when your turn comes, the whole community will be there for you.",
    "bodyTh": "สามัคคีคือความพร้อมเพรียงกัน และเป็นหัวใจของชีวิตในหมู่บ้านไทย เราเห็นได้จากประเพณีลงแขก ที่เพื่อนบ้านมาช่วยกันเกี่ยวข้าวหรือปลูกบ้านให้ครอบครัวหนึ่ง ไม่มีใครได้ค่าจ้าง เพราะสิ่งตอบแทนคืออาหาร เสียงหัวเราะ และความรู้ว่าเมื่อถึงคราวของเรา ทั้งชุมชนจะอยู่เคียงข้าง"
  },
  "lotus-pond": {
    "name": "Purity",
    "th": "ความบริสุทธิ์",
    "body": "The lotus grows out of muddy water yet rises clean and bright, which is why Thai Buddhism sees it as a symbol of a pure mind untouched by the world around it. Lotus buds are offered to the Buddha at temples across the country, a small gesture that carries a big idea. An old teaching even compares people to lotuses in a pond: some still beneath the water, some just breaking the surface, and every one of them able to bloom in time.",
    "bodyTh": "ดอกบัวเติบโตจากโคลนตมแต่ชูช่อสะอาดงดงาม พุทธศาสนาแบบไทยจึงมองว่าบัวเป็นสัญลักษณ์ของจิตใจบริสุทธิ์ที่ไม่แปดเปื้อนด้วยสิ่งรอบตัว ชาวไทยนำดอกบัวไปถวายพระที่วัดทั่วประเทศ เป็นการกระทำเล็กๆ ที่แฝงความหมายยิ่งใหญ่ และมีคำสอนโบราณที่เปรียบคนเป็นดอกบัวในสระ บางดอกยังอยู่ใต้น้ำ บางดอกเพิ่งพ้นผิวน้ำ และทุกดอกบานได้ในเวลาของตน"
  },
  "blossoms": {
    "name": "Joy",
    "th": "ความสุข",
    "body": "Thailand has a word for finding fun in life and in work: sanuk. It explains why festivals, food and flowers matter so much, and why joy is meant to be shared. A garland of fresh blossoms, called a phuang malai, is given to welcome a guest or to say thank you, and flowers drift through Songkran and Loy Krathong too. Every petal is a small reminder that happiness grows when it is passed on.",
    "bodyTh": "ในภาษาไทยมีคำว่า สนุก ที่หมายถึงการหาความสุขในชีวิตและในการงาน คำนี้อธิบายว่าทำไมเทศกาล อาหาร และดอกไม้จึงสำคัญนัก และทำไมความสุขจึงควรแบ่งปัน พวงมาลัยดอกไม้สดใช้ต้อนรับแขกหรือกล่าวขอบคุณ และดอกไม้ยังปรากฏในสงกรานต์และลอยกระทง กลีบดอกทุกกลีบจึงเตือนใจว่าความสุขจะเติบโตเมื่อส่งต่อให้ผู้อื่น"
  },
  "whirlpool": {
    "name": "Letting go",
    "th": "การปล่อยวาง",
    "body": "Plong wang is a Buddhist idea woven into everyday Thai life: put down what you cannot control, and stop gripping on to anger or worry. It is close to the well loved saying mai pen rai, which means never mind. The same thought lies at the heart of Loy Krathong, where some people place a clipping of hair or a fingernail in their krathong, so that bad luck and bad feelings can float away with the water.",
    "bodyTh": "ปล่อยวางเป็นแนวคิดทางพุทธศาสนาที่แทรกอยู่ในชีวิตประจำวันของคนไทย คือวางสิ่งที่เราควบคุมไม่ได้ และเลิกยึดติดกับความโกรธหรือความกังวล ใกล้เคียงกับคำพูดติดปากว่า ไม่เป็นไร ความคิดเดียวกันนี้อยู่ในหัวใจของลอยกระทง ที่บางคนใส่เส้นผมหรือเล็บลงในกระทง เพื่อให้โชคร้ายและความรู้สึกไม่ดีลอยไปกับสายน้ำ"
  },
  "dragon-waves": {
    "name": "Protection",
    "th": "การปกป้อง",
    "body": "Along the Mekong, people believe that the Naga, a great serpent, guards the waters. The belief comes from Buddhist stories, in which the Naga king Mucalinda coiled around the Buddha to shelter him from a storm. It is still alive today: each year at the end of Buddhist Lent, glowing balls rise from the river near Nong Khai, and many villagers say they are the Naga's fire. To protect the river, then, is to honour its guardian.",
    "bodyTh": "ตามริมแม่น้ำโขง ผู้คนเชื่อว่าพญานาคคืองูใหญ่ผู้พิทักษ์สายน้ำ ความเชื่อนี้มาจากเรื่องเล่าทางพุทธศาสนา ที่พญามุจลินท์นาคราชขดตัวโอบพระพุทธเจ้าเพื่อกำบังพายุ และยังคงมีชีวิตอยู่ถึงวันนี้ ทุกปีเมื่อสิ้นสุดเทศกาลออกพรรษา ลูกไฟลอยขึ้นจากแม่น้ำใกล้หนองคาย ชาวบ้านจำนวนมากเชื่อว่าเป็นไฟของพญานาค การปกป้องแม่น้ำจึงเป็นการให้เกียรติผู้พิทักษ์ของแม่น้ำ"
  },
  "lanterns": {
    "name": "Hope",
    "th": "ความหวัง",
    "body": "Lanna lanterns light up northern Thailand during Yi Peng, a festival of the old Lanna culture that Nan shares. Families hang paper lanterns outside their homes and temples to welcome good fortune, and many release floating lanterns while making a wish for the year ahead. Each glowing lantern is a small act of faith that tomorrow can be brighter. Nan keeps that hope alive on the water too: at the end of Buddhist Lent, whole villages gather at the river for traditional boat races, hoping for good water and good harvests.",
    "bodyTh": "โคมล้านนาประดับประดาภาคเหนือของไทยในเทศกาลยี่เป็ง ซึ่งเป็นประเพณีของวัฒนธรรมล้านนาที่จังหวัดน่านร่วมสืบทอดมาด้วยกัน ครอบครัวแขวนโคมกระดาษหน้าบ้านและวัดเพื่อต้อนรับโชคดี และหลายคนปล่อยโคมลอยพร้อมอธิษฐานขอให้ปีข้างหน้าเป็นปีที่ดี โคมที่เปล่งแสงแต่ละดวงคือการแสดงศรัทธาเล็กๆ ว่าวันพรุ่งนี้จะสว่างกว่าเดิม น่านยังรักษาความหวังนี้ไว้บนสายน้ำด้วย เมื่อสิ้นสุดเทศกาลออกพรรษา ทั้งหมู่บ้านมาพร้อมกันที่ริมแม่น้ำเพื่อแข่งเรือตามประเพณี หวังให้น้ำดีและผลผลิตดี"
  },
  "sky-lanterns": {
    "name": "Gratitude",
    "th": "ความกตัญญู",
    "body": "Katanyu, knowing and repaying kindness, is one of the most valued virtues in Thailand, and Loy Krathong is built on it. People thank Phra Mae Khongkha, the goddess of water, for the river that feeds them, and they ask her forgiveness for the harm they have done to it. This is easy to see along the Ping River in Chiang Mai, where every November thousands of lanterns and krathongs fill the sky and the water together.",
    "bodyTh": "กตัญญู คือการรู้คุณและตอบแทนคุณ เป็นคุณธรรมที่คนไทยยกย่องที่สุดข้อหนึ่ง และลอยกระทงก็ตั้งอยู่บนคุณธรรมนี้ ผู้คนขอบคุณพระแม่คงคา เทพีแห่งน้ำ สำหรับสายน้ำที่หล่อเลี้ยงชีวิต และขอขมาที่เคยทำร้ายแม่น้ำ เห็นได้ชัดริมแม่น้ำปิงในเชียงใหม่ ที่ทุกเดือนพฤศจิกายน โคมและกระทงนับพันเต็มท้องฟ้าและผืนน้ำไปพร้อมกัน"
  },
  "floating-market": {
    "name": "Sufficiency",
    "th": "ความพอเพียง",
    "body": "The Sufficiency Economy philosophy was shared by King Bhumibol Adulyadej, who encouraged Thai people to live with moderation, good sense and care for the future. In simple terms, take what you need, share what you have, and never harm the land or water that supports you. You can picture it in the canals of the Chao Phraya plain, where families once traded from boat to boat, selling only what their gardens and kitchens could spare.",
    "bodyTh": "ปรัชญาของเศรษฐกิจพอเพียงเป็นพระราชดำริของพระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช ที่ทรงแนะนำให้คนไทยดำรงชีวิตด้วยความพอประมาณ มีเหตุผล และมีภูมิคุ้มกันเพื่ออนาคต พูดง่ายๆ คือใช้เท่าที่จำเป็น แบ่งปันสิ่งที่มี และไม่ทำร้ายผืนดินและสายน้ำที่เลี้ยงเรา ลองนึกภาพคลองในที่ราบลุ่มเจ้าพระยา ที่ครอบครัวเคยค้าขายกันจากเรือสู่เรือ ขายเฉพาะสิ่งที่สวนและครัวของตนเหลือเฟือ"
  }
};
function fillAbout(d) {
  const words = d.name.split(" "), last = words.pop();
  $("#aboutThai").textContent = d.thai || "";
  $("#aboutTitle").innerHTML = (words.length ? words.join(" ") + "<br>" : "") + last;
  $("#aboutBody").textContent = d.story || CONFIG.defaultStory;
  const v = RIVER_VALUES[d.id];
  $("#aboutValue").style.display = v ? "" : "none";
  if (v) { $("#aboutValueTitle").textContent = v.name; $("#aboutValueThai").textContent = v.th; $("#aboutValueBody").textContent = v.body; $("#aboutValueBodyTh").textContent = v.bodyTh; }
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
  [[260, 0], [150, 0.14]].forEach(([size, delay]) => {
    const i = document.createElement("i"); i.style.setProperty("--r", size + "px"); i.style.setProperty("--d", delay + "s"); r.appendChild(i);
  });
  rippleLayer.appendChild(r);
  setTimeout(() => r.remove(), 1800);
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
addEventListener("DOMContentLoaded", () => { fillAbout(currentFish); go(["color", "game", "about", "shop", "quiz", "us", "moments", "community", "festival"].includes(start) ? start : "play", { silent: true }); });

// "Reset" in the menu: forget which rivers have been saved (the fish stop glowing)
$$("#resetProgress, #menuReset").forEach(el => el.addEventListener("click", e => {
  e.preventDefault();
  if (!confirm("Reset everything? Saved rivers will be forgotten and you will see the start screen again.")) return;
  cleared.clear();
  try { localStorage.removeItem("loyFishGiven"); } catch (err) {}
  try { localStorage.removeItem("loyTdSeen"); localStorage.removeItem("loyTdCost"); } catch (err) {}      // the first-stage help shows again
  try { localStorage.removeItem(CONFIG.progressKey); } catch (err) {}
  applyCleared();
  try { localStorage.removeItem("loyIntroSeen"); } catch (err) {}
  toast("Progress reset");
  setTimeout(() => { location.href = location.pathname; }, 700);   // reload so the start screen shows again
}));


/* ---- first visit intro: yellow cover with a circle around one fish; tap the fish and the circle grows to reveal the site ---- */
(function intro() {
  const el = $("#intro"); if (!el) return;
  const KEY = "loyIntroSeen";
  let seen = false; try { seen = !!localStorage.getItem(KEY); } catch (e) {}
  const forced = /[?&]intro\b/.test(location.search);     // add ?intro to the address to see it again
  if ((seen && !forced) || (start && start !== "play")) { el.remove(); return; }
  document.body.classList.add("intro-on");
  const txt = el.querySelector(".intro-text"), ring = el.querySelector(".intro-ring");
  let cx = 0, cy = 0, r = 0, busy = false;
  const setHole = (v, lite) => { r = v; el.style.setProperty("--r", v + "px"); if (!lite) ring.style.width = ring.style.height = v * 2 + "px"; };   // lite: skip the ring while it is hidden (no layout every frame)
  function place() {
    const W2 = innerWidth, H2 = innerHeight, portrait = H2 > W2 * 1.1, M = 28;
    // slide the map so one fish sits exactly in the middle of the screen (the fish that needs the least sliding)
    const tx = W2 / 2, ty = H2 / 2;
    const cands = items.map(i => {
      const bb = i.el.getBoundingClientRect(), dx = tx - (bb.left + bb.right) / 2, dy = ty - (bb.top + bb.bottom) / 2;
      const nx = Math.min(0, Math.max(W2 - W, ox + dx)), ny = Math.min(0, Math.max(H2 - H, oy + dy));
      return { nx, ny, off: Math.hypot(nx - (ox + dx), ny - (oy + dy)), mv: Math.hypot(dx, dy) };
    }).sort((p, q) => ((p.off > 2) - (q.off > 2)) || (p.mv - q.mv));
    if (cands[0]) { ox = cands[0].nx; oy = cands[0].ny; vx = vy = 0; inner.style.transform = `translate3d(${ox}px, ${oy}px, 0)`; }
    homeAnchor = { x: (tx - ox) / W, y: (ty - oy) / H };
    cx = tx; cy = ty;
    // phones: the circle fills the width with an even margin on both sides; computers: a smaller circle
    const R = portrait ? Math.max(64, Math.min(W2 * 0.3, H2 * 0.18)) : Math.max(110, Math.min(Math.min(W2, H2) * 0.19, 190));
    el.style.setProperty("--cx", cx + "px"); el.style.setProperty("--cy", cy + "px");
    ring.style.left = cx + "px"; ring.style.top = cy + "px";
    // the words sit above the circle (or below it when there is no room above); the circle shrinks a little if the words would touch the logo
    const place2 = R2 => {
      setHole(R2);
      const above = cy - R2 > 150;
      txt.classList.toggle("below", !above);
      txt.style.top = above ? "auto" : cy + R2 + 20 + "px";
      txt.style.bottom = above ? innerHeight - (cy - R2) + 16 + "px" : "auto";
      txt.style.left = cx + "px";
      return above;
    };
    let R3 = R;
    if (place2(R3)) {
      const room = cy - R3 - 16 - txt.offsetHeight - 70;      // 70px = the logo and a gap under it
      if (room < 0) { R3 = Math.max(90, R3 + room); place2(R3); }
    }
  }
  addEventListener("resize", () => { if (!busy) place(); });
  const t00 = performance.now();
  (function wait() { if ((inner.classList.contains("ready") && performance.now() - t00 > 380) || performance.now() - t00 > 3000) { place(); el.classList.add("ready"); } else setTimeout(wait, 60); })();

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.addEventListener("pointerup", e => {
    if (busy || !el.classList.contains("ready")) return;
    if (Math.hypot(e.clientX - cx, e.clientY - cy) > r * 1.08) {      // missed the fish: nudge the ring
      ring.classList.remove("nudge"); void ring.offsetWidth; ring.classList.add("nudge"); return;
    }
    busy = true; el.classList.add("opening");
    try { localStorage.setItem(KEY, "1"); } catch (err) {}
    const r0 = r, r1 = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy)) + 30, dur = reduce ? 250 : 1150, t0 = performance.now();
    let gliding = false;
    function startGlide() {                              // glide the map from the fish to the home view (where the title sits), no dragging needed
      if (gliding) return; gliding = true; homeAnchor = null;
      const sx = ox, sy = oy, gx = Math.min(0, Math.max(innerWidth - W, innerWidth / 2 - CONFIG.startCenter.x * W)), gy = Math.min(0, Math.max(innerHeight - H, innerHeight / 2 - CONFIG.startCenter.y * H));
      const dist = Math.hypot(gx - sx, gy - sy), g0 = performance.now(), gd = reduce ? 1 : Math.max(2200, Math.min(4600, dist / 0.3)); glide = true;
      (function g(t) {
        if (!glide) return;
        const k = Math.min(1, (t - g0) / gd), q = .5 - Math.cos(Math.PI * k) / 2;       // gentle sine ease in and out
        ox = sx + (gx - sx) * q; oy = sy + (gy - sy) * q; vx = vy = 0;
        if (k < 1) requestAnimationFrame(g); else glide = false;
      })(g0);
    }
    (function frame(t) {
      const k = Math.min(1, (t - t0) / dur), e2 = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      setHole(r0 + (r1 - r0) * e2, true);
      if (k > .55) startGlide();                          // the map starts drifting while the circle is still opening, so there is no sudden jump afterwards
      if (k < 1) requestAnimationFrame(frame);
      else { el.remove(); document.body.classList.remove("intro-on"); startGlide(); }
    })(t0);
  });
})();


/* ---------- phone hamburger menu ---------- */
(function () {
  const burger = $("#burger"), menu = $("#menu");
  const setOpen = open => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open); menu.setAttribute("aria-hidden", !open);
  };
  burger.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
  menu.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });   // any choice closes the menu (go() runs from its own handler)
  addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
  addEventListener("resize", () => { if (innerWidth > 640) setOpen(false); });
})();


/* ---------- map label: tap "Explore the story of Loy Krathong" to read the festival in short sentences, then it loops back ---------- */
(function () {
  const label = $("#storyLabel"), text = $("#storyText");
  if (!label || !text) return;
  const TITLE = text.innerHTML;
  const STORY = [
    ["Loy Krathong is a festival of floating lights in Thailand.", "ลอยกระทงคือเทศกาลแห่งแสงที่ลอยบนผืนน้ำของประเทศไทย"],
    ["Loy means to float. A krathong is a small floating vessel.", "ลอย แปลว่า ทำให้ลอยน้ำ กระทงคือภาชนะเล็ก ๆ ที่ลอยน้ำได้"],
    ["It happens on the night of the full moon of the 12th lunar month, usually in November.", "จัดในคืนวันเพ็ญเดือนสิบสองตามปฏิทินจันทรคติไทย มักตรงกับเดือนพฤศจิกายน"],
    ["People set their krathong afloat on rivers, canals and ponds.", "ผู้คนลอยกระทงในแม่น้ำ คลอง และบ่อน้ำ"],
    ["They thank the water, make a wish and let go of what they no longer need.", "ขอบคุณสายน้ำ อธิษฐาน และปล่อยวางสิ่งที่ไม่ต้องการอีกต่อไป"],
    ["It also reminds us to look after the water all year round.", "เทศกาลนี้ยังเตือนให้เราดูแลน้ำตลอดทั้งปี"],
    ["Come float with us and take care of water.", "มาลอยไปกับเรา และช่วยกันดูแลน้ำ"]
  ];                                                       // English on top, smaller Thai beneath (Thai is draft wording)
  let idx = -1, timer = 0, swapping = false, tapped = false;
  try { tapped = localStorage.getItem("loyStoryTapped") === "1"; } catch (e) {}
  // words fade in one by one; short words and the last two words stay together so no line ends with a lone word
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let seg = null; try { seg = new Intl.Segmenter("th", { granularity: "word" }); } catch (e) {}
  const esc = t => t.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  function words(t, n0, step) {
    const thai = /[\u0E00-\u0E7F]/.test(t);
    let parts = thai && seg ? [...seg.segment(t)].map(x => x.segment) : t.split(/(\s+)/);
    parts = parts.filter(x => x !== "");
    let n = n0; const bits = [];
    parts.forEach(w => { if (/^\s+$/.test(w)) { bits.push(null); return; } bits.push({ w, h: `<span class="w" style="--i:${n++ * step}ms">${esc(w)}</span>` }); });
    let out = "";
    if (thai) out = bits.map(x => x ? x.h : " ").join("");
    else {                                                    // glue: a short word sticks to the next one, and the last two words stay together
      const ws = bits.filter(Boolean), g = []; let cur = [];
      ws.forEach((x, i) => { cur.push(x.h); if (!(x.w.length <= 2 && i < ws.length - 1) && i !== ws.length - 2) { g.push(cur); cur = []; } });
      if (cur.length) g.push(cur);
      out = g.map(a => a.length > 1 ? `<span class="g">${a.join(" ")}</span>` : a[0]).join(" ");
    }
    return { html: out, n };
  }
  const dots = ms => `<span class="dots" style="--dd:${ms}ms" aria-hidden="true"><span></span><span></span><span></span></span>`;   // three hopping dots: "tap me"
  const build = (en, th) => { const x = words(en, 0, 85), y = words(th, x.n, 55), ms = x.n * 85 + (y.n - x.n) * 55; return { html: `${x.html}<i>${y.html}</i>${dots(ms)}`, ms }; };
  const buildTitle = () => { const lines = TITLE.split(/<br\s*\/?>/i).map(l => l.trim()); let n = 0; const parts = lines.map(l => { const r = words(l, n, 110); n = r.n; return r.html; }); return { html: parts.join("<br>") + dots(n * 110), ms: n * 110 }; };
  const mark = () => { text.classList.toggle("pulse", !tapped); text.classList.toggle("glow", tapped); };
  const fitWidth = () => { if (idx < 0) label.style.setProperty("--tw", text.offsetWidth + "px"); };   // sentences stay as narrow as the title so they do not run over the fish
  let first = false, fadeMs = 0;
  const render = () => {
    label.classList.toggle("story", idx >= 0);
    const b = idx < 0 ? buildTitle() : build(STORY[idx][0], STORY[idx][1]);
    fadeMs = b.ms;
    text.classList.toggle("anim", !calm && !first);           // the very first title just appears; every change after that fades in word by word
    text.innerHTML = b.html; first = false;
    mark(); if (idx < 0) setTimeout(fitWidth, 0);
  };
  const schedule = () => {
    clearTimeout(timer);
    if (idx >= 0) timer = setTimeout(next, 2400 + fadeMs + STORY[idx][0].length * 40);   // about as long as it takes to read
  };
  function show(i) {
    swapping = true; clearTimeout(timer); text.classList.add("out");
    setTimeout(() => { idx = i; render(); text.classList.remove("out"); swapping = false; schedule(); }, 450);
  }
  function next() { show(idx + 1 >= STORY.length ? -1 : idx + 1); }   // after the last sentence, back to the title
  text.addEventListener("click", e => {
    e.stopPropagation(); if (swapping) return;
    if (!tapped) { tapped = true; try { localStorage.setItem("loyStoryTapped", "1"); } catch (err) {} }
    next();
  });
  text.innerHTML = buildTitle().html;                       // the first title gets its dots too (no fade, it just appears)
  mark(); setTimeout(fitWidth, 800); addEventListener("resize", () => setTimeout(fitWidth, 200));
  text.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (!swapping) next(); } });
})();
