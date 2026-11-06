const SHOPCFG = CONFIG.shop;
const shopKeys = { points: SHOPCFG.pointsKey, rewarded: SHOPCFG.pointsKey + "Rewarded", orders: SHOPCFG.pointsKey + "Orders" };
const shopStore = {
  get(k, fallback) { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? fallback : v; } catch (e) { return fallback; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
};
let shopPoints = +shopStore.get(shopKeys.points, 0) || 0;
const shopRewarded = new Set(shopStore.get(shopKeys.rewarded, []));
let shopOrders = shopStore.get(shopKeys.orders, []);
let shopCat = SHOPCFG.categories[0];
let shopMode = shopStore.get(shopKeys.points + "Mode", "points") === "money" ? "money" : "points";   // how the shop is paid for
let shopCart = shopStore.get(shopKeys.points + "Cart", []);            // [{ id, qty }] while buying with money
const shopQty = {};                                   // quantity chosen on each card

function shopSave() {
  shopStore.set(shopKeys.points + "Cart", shopCart);
  shopStore.set(shopKeys.points, shopPoints);
  shopStore.set(shopKeys.rewarded, [...shopRewarded]);
  shopStore.set(shopKeys.orders, shopOrders);
}
function addPoints(n) { shopPoints = Math.max(0, shopPoints + n); shopSave(); shopHeader(); }

/* ---- earning points (called by the game) ---- */
const stageReward = id => SHOPCFG.clearReward + ((GAME.stages[id] || {}).level || 0) * SHOPCFG.perLevel;
function awardStage(id) {                              // a river was saved: first time pays in full
  const first = !shopRewarded.has(id);
  const pts = first ? stageReward(id) : Math.round(stageReward(id) * SHOPCFG.replayRate);
  shopRewarded.add(id); addPoints(pts);
  return pts;
}
function awardEndless(gainWaves) {                      // endless river: points for every wave beyond your best
  const earned = +shopStore.get(shopKeys.rewarded + "Endless", 0) || 0;                     // endless points are capped in total
  const pts = Math.max(0, Math.min(gainWaves * SHOPCFG.endlessPerWave, SHOPCFG.endlessMax - earned));
  if (pts) { shopStore.set(shopKeys.rewarded + "Endless", earned + pts); addPoints(pts); }
  return pts;
}
function rewardText(id) {                               // shown on the river's start card
  const st = GAME.stages[id]; if (!st) return "";
  if (st.endless) return `Reward: ${SHOPCFG.endlessPerWave} pts for every round beyond your best (up to ${SHOPCFG.endlessMax})`;
  if (!shopRewarded.has(id)) return `Reward: ${stageReward(id)} pts`;
  const again = Math.round(stageReward(id) * SHOPCFG.replayRate);
  return again ? `Reward: ${again} pts (replay)` : "Points already collected";
}

/* ---- the shop page ---- */
const bi = (en, th) => th ? `${en}<i class="th">${th}</i>` : en;     // English first, a smaller Thai line under it
const shopEl = { track: $("#shopTrack"), cat: $("#shopCat"), modal: $("#shopModal") };
const totalOwned = () => shopOrders.filter(o => o.via !== "money").reduce((n, o) => n + o.qty, 0);   // the per person limit only counts points swaps
const usdOf = it => (SHOPCFG.money.byCategory[it.cat] || 0);
const fmtMoney = v => SHOPCFG.money.symbol + v.toFixed(2);
const isMoney = () => shopMode === "money";
const swapsLeft = () => SHOPCFG.limitPerPerson ? Math.max(0, SHOPCFG.limitPerPerson - totalOwned()) : Infinity;
const owned = id => shopOrders.filter(o => o.id === id).reduce((n, o) => n + o.qty, 0);

function shopHeader() {
  $("#view-shop").classList.toggle("money-mode", isMoney());
  document.querySelectorAll(".shop-mode button").forEach(b => b.classList.toggle("on", b.dataset.mode === shopMode));
  $("#shopPoints").textContent = shopPoints;
  $("#shopCartCount").textContent = shopCart.reduce((n, l) => n + l.qty, 0);
  $("#shopBagCount").textContent = shopOrders.reduce((n, o) => n + o.qty, 0);
}
function renderShop() {
  // the slowly sliding "Rewards" strip and the category dropdown
  if (!shopEl.cat.options.length) {
    shopEl.cat.innerHTML = SHOPCFG.categories.map(c => `<option value="${c}">${c} · ${SHOPCFG.categoriesTh[c] || ""}</option>`).join("");
    shopEl.cat.addEventListener("change", () => { shopCat = shopEl.cat.value; renderCards(); shopEl.track.scrollTo({ left: 0 }); });
  }
  shopHeader(); renderCards();
}
function renderCards() {
  const items = SHOPCFG.items.filter(it => shopCat === SHOPCFG.categories[0] || it.cat === shopCat);
  shopEl.track.innerHTML = items.map(it => {
    const money = isMoney(), left = money ? 9 : swapsLeft(), q = Math.min(shopQty[it.id] || 1, Math.max(1, left)), total = money ? usdOf(it) * q : it.price * q, short = money ? 0 : total - shopPoints, have = owned(it.id);
    return `<article class="shop-card" data-id="${it.id}">
      <h3 class="shop-title"><span>${it.name}</span>${it.th && it.th.name ? `<span class="shop-title-th">${it.th.name}</span>` : ""}</h3>
      <div class="shop-circle"><img src="${it.img}" alt="${it.name}" draggable="false"></div>
      <div class="shop-info">
        <div class="shop-left">
          <div class="shop-price">${money ? `<b>${fmtMoney(total)}</b> ${SHOPCFG.money.currency}` : `<b>${total}</b> pt`}</div>
          <div class="shop-meta"><small>${bi("Details", "รายละเอียด")}</small>${it.details.map((d, k) => `<span>${bi(d, it.th && it.th.details[k])}</span>`).join("")}${have ? `<span class="have">${bi("You have " + have, "คุณมี " + have)}</span>` : ""}</div>
        </div>
        <div class="shop-right">
          <div class="shop-buy">
            ${left > 1 ? `<span class="qty-label">${bi("Qty", "จำนวน")}</span>
            <span class="qty"><b>${q}</b><span class="qbtns"><button data-q="1" aria-label="More">▲</button><button data-q="-1" aria-label="Fewer">▼</button></span></span>` : ""}
            ${money ? `<button class="pill pill-outline shop-addcart">${bi("Add to cart", "ใส่ตะกร้า")}</button>` : ""}
            <button class="pill pill-solid shop-redeem${!money && (short > 0 || !swapsLeft()) ? " poor" : ""}">${money ? bi("Buy now", "ซื้อเลย") : !swapsLeft() ? bi("Limit reached", "ครบสิทธิ์แล้ว") : short > 0 ? bi(`Need ${short} more`, `ต้องการอีก ${short} แต้ม`) : bi("Exchange", "แลกเลย")}</button>
          </div>
          <p class="shop-desc">${bi(it.desc, it.th && it.th.desc)}</p>${money ? `<p class="shop-note">${bi(SHOPCFG.moneyNote, SHOPCFG.moneyNoteTh)}</p>` : ""}
        </div>
      </div>
    </article>`;
  }).join("") || `<p class="shop-empty">Nothing here yet. · ยังไม่มีสินค้า</p>`;
}
shopEl.track.addEventListener("click", e => {
  const card = e.target.closest(".shop-card"); if (!card) return;
  const it = SHOPCFG.items.find(x => x.id === card.dataset.id);
  const qb = e.target.closest("[data-q]");
  if (qb) { shopQty[it.id] = Math.max(1, Math.min(Math.min(9, isMoney() ? 9 : swapsLeft()), (shopQty[it.id] || 1) + +qb.dataset.q)); const x = shopEl.track.scrollLeft; renderCards(); shopEl.track.scrollLeft = x; return; }
  if (e.target.closest(".shop-addcart")) { addToCart(it); return; }
  if (e.target.closest(".shop-redeem")) isMoney() ? checkout([{ it, q: shopQty[it.id] || 1 }]) : redeem(it);
});
function redeem(it) {
  const q = shopQty[it.id] || 1, cost = it.price * q;
  if (!swapsLeft()) { toast(`You can swap ${SHOPCFG.limitPerPerson} item${SHOPCFG.limitPerPerson > 1 ? "s" : ""} per person. Thank you for playing! · ขอบคุณที่ร่วมเล่น`); return; }
  if (shopPoints < cost) { toast(`You need ${cost - shopPoints} more points. Save a river to earn some! · ต้องการอีก ${cost - shopPoints} แต้ม`); return; }
  const code = "LOY-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  shopPoints -= cost;
  shopOrders.push({ id: it.id, name: it.name, qty: q, cost, code, t: Date.now() });
  shopQty[it.id] = 1; shopSave(); shopHeader(); renderCards();
  openModal(bi("Exchanged!", "แลกสำเร็จ!"), `<p>${q} × ${bi(it.name, it.th && it.th.name)}</p><p class="shop-code">${code}</p><p class="small">${bi("Keep this code. It shows what you swapped. You can find it again under “My items”.", "เก็บรหัสนี้ไว้ ใช้แสดงสิ่งที่คุณแลก และดูซ้ำได้ที่ “ของของฉัน”")}</p>`);
}

/* ---- paying with real money: a preview only, nothing is charged or sent anywhere ---- */
let pendingLines = [], pendingFromCart = false;
const cartLines = () => shopCart.map(l => ({ it: SHOPCFG.items.find(x => x.id === l.id), q: l.qty })).filter(l => l.it);
function addToCart(it) {
  const q = shopQty[it.id] || 1, line = shopCart.find(l => l.id === it.id);
  if (line) line.qty = Math.min(20, line.qty + q); else shopCart.push({ id: it.id, qty: q });
  shopQty[it.id] = 1; shopSave(); shopHeader();
  const x = shopEl.track.scrollLeft; renderCards(); shopEl.track.scrollLeft = x;
  toast("Added to cart · ใส่ตะกร้าแล้ว");
}
function openCart() {
  const lines = cartLines();
  if (!lines.length) { openModal(bi("Cart", "ตะกร้า"), `<p>${bi("Your cart is empty.", "ตะกร้าของคุณยังว่างอยู่")}</p>`); return; }
  const total = lines.reduce((n, l) => n + usdOf(l.it) * l.q, 0);
  openModal(bi("Cart", "ตะกร้า"), `<ul class="shop-orders">${lines.map(l => `<li><span>${l.q} × ${l.it.name}</span><b>${fmtMoney(usdOf(l.it) * l.q)}</b><button class="cart-x" data-rm="${l.it.id}" aria-label="Remove">×</button></li>`).join("")}</ul>
    <p class="shop-total">${fmtMoney(total)} ${SHOPCFG.money.currency}</p>
    <button class="pill pill-solid shop-redeem" id="shopCartPay">${bi("Checkout", "ชำระเงิน")}</button>`);
}
function checkout(lines, fromCart) {
  pendingLines = lines; pendingFromCart = !!fromCart;
  const total = lines.reduce((n, l) => n + usdOf(l.it) * l.q, 0);
  openModal(bi("Checkout", "ชำระเงิน"), `
    ${lines.map(l => `<p>${l.q} × ${bi(l.it.name, l.it.th && l.it.th.name)}</p>`).join("")}
    <p class="shop-total">${fmtMoney(total)} ${SHOPCFG.money.currency}</p>
    <div class="shop-form">
      <input type="text" placeholder="Full name · ชื่อ นามสกุล" aria-label="Full name">
      <input type="email" placeholder="Email · อีเมล" aria-label="Email">
      <input type="text" placeholder="Shipping address · ที่อยู่จัดส่ง" aria-label="Shipping address">
      <input type="text" inputmode="numeric" placeholder="Card number · หมายเลขบัตร" aria-label="Card number">
    </div>
    <button class="pill pill-solid shop-redeem" id="shopPay">${bi("Place order", "สั่งซื้อ")}</button>
    <p class="small">${bi("This is a preview. No payment is taken.", "นี่คือตัวอย่างเท่านั้น ไม่มีการเรียกเก็บเงินจริง")}</p>
    <p class="small">${bi(SHOPCFG.moneyNote, SHOPCFG.moneyNoteTh)}</p>`);
}
$("#shopCart").addEventListener("click", openCart);
$("#shopModalBody").addEventListener("click", e => {
  const rm = e.target.closest("[data-rm]");
  if (rm) { shopCart = shopCart.filter(l => l.id !== rm.dataset.rm); shopSave(); shopHeader(); openCart(); return; }
  if (e.target.closest("#shopCartPay")) { e.stopPropagation(); checkout(cartLines(), true); return; }
  const b = e.target.closest("#shopPay"); if (!b) return;
  e.stopPropagation();
  const code = "LOY-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  pendingLines.forEach(l => shopOrders.push({ id: l.it.id, name: l.it.name, qty: l.q, cost: 0, code, via: "money", t: Date.now() }));
  if (pendingFromCart) shopCart = [];
  pendingLines.forEach(l => { shopQty[l.it.id] = 1; });
  shopSave(); shopHeader(); renderCards();
  openModal(bi("Thank you!", "ขอบคุณ!"), `${pendingLines.map(l => `<p>${l.q} × ${bi(l.it.name, l.it.th && l.it.th.name)}</p>`).join("")}<p class="shop-code">${code}</p><p class="small">${bi("This is a preview, so no real order was placed. Your thanks go to the rivers.", "นี่คือตัวอย่าง จึงไม่มีการสั่งซื้อจริง")}</p>`);
});
document.querySelectorAll(".shop-mode button").forEach(b => b.addEventListener("click", () => {
  shopMode = b.dataset.mode; shopStore.set(shopKeys.points + "Mode", shopMode); shopHeader();
  const x = shopEl.track.scrollLeft; renderCards(); shopEl.track.scrollLeft = x;
}));
function openModal(title, html) {
  $("#shopModalTitle").innerHTML = title; $("#shopModalBody").innerHTML = html; shopEl.modal.classList.add("show");
}
$("#shopModalClose").addEventListener("click", () => shopEl.modal.classList.remove("show"));
shopEl.modal.addEventListener("click", e => { if (e.target === shopEl.modal) shopEl.modal.classList.remove("show"); });
$("#shopBag").addEventListener("click", () => {
  openModal(bi("My items", "ของของฉัน"), shopOrders.length
    ? `<ul class="shop-orders">${shopOrders.slice().reverse().map(o => `<li><span>${o.qty} × ${o.name}</span><b>${o.code}</b></li>`).join("")}</ul>`
    : `<p>${bi("Nothing yet. Save a river to earn points, then swap them for something nice.", "ยังไม่มีอะไร ช่วยแม่น้ำเพื่อสะสมแต้ม แล้วนำมาแลกของน่ารัก ๆ")}</p>`);
});

/* arrows scroll one card at a time */
const shopStep = dir => { const c = shopEl.track.querySelector(".shop-card"); shopEl.track.scrollBy({ left: dir * (c ? c.offsetWidth + 40 : 300), behavior: "smooth" }); };
$("#shopPrev").addEventListener("click", () => shopStep(-1));
$("#shopNext").addEventListener("click", () => shopStep(1));

shopHeader();
