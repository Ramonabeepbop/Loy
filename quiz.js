/* =========================================================
   QUIZ: six questions about Loy Krathong, saving water and the river you picked.
   Every river gets its own quiz: 2 questions about that river (QUIZ.river) plus 4 general ones picked from QUIZ.general.
   The answers to the river questions are written on that river's About page (the `story` in app.js), so people can read and find out.
   In every list the FIRST answer is the right one (they are shuffled on screen).
   Points: 5 for every right answer beyond your best score on that river.
   ========================================================= */
const QUIZ = {
  pointsPerRight: 5,
  bestKey: "loyQuizBest",
  general: [
    { q: "Loy Krathong is held on the night of the full moon of which month?",
      a: ["The 12th lunar month, usually in November", "The 5th lunar month, in April", "The 1st lunar month, in January", "The 8th lunar month, in July"],
      why: "It falls on the full moon of the 12th lunar month, when the rivers are full after the rainy season." },
    { q: "What do people say floating a krathong stands for?",
      a: ["Thanking the water spirit and letting go of anger and bad luck", "Calling the rain to come back", "Paying a fee to the river", "Making the water warmer"],
      why: "Many people thank Phra Mae Khongkha, the water goddess, and let go of grudges as the krathong drifts away." },
    { q: "What is the kindest thing to do with krathongs at Loy Krathong?",
      a: ["Share one krathong between a group, and make sure it gets collected afterwards", "Float a bread krathong, because the fish will eat it", "Float lots of natural krathongs, because they vanish by themselves", "Float a foam one, because it floats the best"],
      why: "Even krathongs made of natural materials cannot break down fast enough when so many are floated at once, so cleanup crews have to collect them. Bread is no better: fish cannot eat that much, and it dissolves before it can be picked up, which pollutes the water. Foam and plastic stay for years. Floating fewer, and making sure they are collected, is the kindest way." },
    { q: "Which wastes more water?",
      a: ["A full bath", "A 5 minute shower"],
      why: "A full bath can use around 80 to 150 litres. A short shower often uses less than half of that." },
    { q: "A tap drips all day and all night and nobody fixes it. Over one year, how much water is lost?",
      a: ["Thousands of litres, enough to fill many bathtubs", "About a cup", "About one bucket", "Nothing, the drips go back into the pipes"],
      why: "Drip by drip it adds up to thousands of litres a year. Fixing a washer is a small job that saves a lot." },
    { q: "When is the best time to water the garden so less water is wasted?",
      a: ["Early morning or evening", "Hot midday", "Only when it is raining", "It makes no difference"],
      why: "In the cool of the morning or evening, less water evaporates, so more of it reaches the roots." },
    { q: "In Thai, what does \"loy\" mean?",
      a: ["To float", "To light", "To pray", "To dance"],
      why: "Loy means to float, and a krathong is a small basket, so Loy Krathong means floating a basket on the water." },
    { q: "Which wastes more water while you brush your teeth?",
      a: ["Leaving the tap running", "Turning the tap off until you rinse"],
      why: "A running tap pours away many litres in two minutes. Turn it off while you brush and use a cup to rinse." },
    { q: "Why is plastic in a river such a problem?",
      a: ["It breaks into tiny pieces that fish and birds swallow", "It makes the water taste sweeter", "It melts away by morning", "It helps fish grow bigger"],
      why: "Plastic never really goes away. It splits into tiny pieces that animals eat and that stay in the water for years." },
    { q: "What is a smart way to wash a car and save water?",
      a: ["Use a bucket and a sponge", "Leave the hose running the whole time", "Wash it every day", "Wait for a flood"],
      why: "A bucket uses a fraction of the water a running hose does." },
  ],
  // two questions per river, keyed by fish id. The answers are in each river's story on its About page.
  river: {
    "rice-fields": [
      { q: "The Mun winds across Isan. Which big river does it join?", a: ["The Mekong", "The Chao Phraya", "The Ping", "The Kok"], why: "The Mun flows on until it joins the mighty Mekong." },
      { q: "Which part of Thailand does the Mun river wind across?", a: ["Isan, in the northeast", "The far south", "The western coast", "The centre of Bangkok"], why: "The Mun crosses Isan, the rice country of northeastern Thailand." },
    ],
    "lanterns": [
      { q: "Near Nakhon Sawan, the Nan meets which river?", a: ["The Ping", "The Mun", "The Kok", "The Mekong"], why: "Near Nakhon Sawan the Nan meets the Ping." },
      { q: "When the Nan and the Ping join together, what river do they become?", a: ["The Chao Phraya", "The Mekong", "The Chi", "The Yom"], why: "Together the Nan and the Ping become the Chao Phraya." },
    ],
    "dragon-waves": [
      { q: "Old tales say something glowing rises from the Mekong. What is it?", a: ["Naga fireballs", "Golden lanterns", "Silver coins", "Floating stars"], why: "Old tales tell of glowing naga fireballs rising from its waters." },
      { q: "Along which parts of Thailand does the Mekong run?", a: ["The northern and northeastern border", "The southern beaches", "Only through Bangkok", "The western mountains"], why: "The Mekong runs along Thailand's northern and northeastern border." },
    ],
    "sky-lanterns": [
      { q: "Which city does the Ping flow through?", a: ["Chiang Mai", "Phuket", "Ayutthaya", "Khon Kaen"], why: "The Ping flows through Chiang Mai." },
      { q: "What festival fills the Ping's night sky with thousands of lanterns?", a: ["Yi Peng", "Songkran", "Vegetarian Festival", "Rocket Festival"], why: "Thousands of sky lanterns light up the night during Yi Peng." },
    ],
    "whirlpool": [
      { q: "What makes the Yom special among Thailand's big rivers?", a: ["It still flows freely with no large dam", "It is the shortest river", "It flows backwards", "It is made of salt water"], why: "The Yom is one of the last big rivers that still flows freely, with no large dam along its way." },
      { q: "Which of these places does the Yom pass through?", a: ["Sukhothai", "Phuket", "Krabi", "Trat"], why: "The Yom passes through Phrae and Sukhothai on the way south." },
    ],
    "friends": [
      { q: "What is special about the length of the Chi?", a: ["It is the longest river that stays entirely inside Thailand", "It is the shortest river in the country", "It is longer than the Mekong", "It never reaches another river"], why: "The Chi is the longest river that stays entirely inside Thailand." },
      { q: "Which river does the Chi meet after crossing Isan?", a: ["The Mun", "The Nan", "The Wang", "The Kok"], why: "The Chi travels across Isan before meeting the Mun." },
    ],
    "blossoms": [
      { q: "Where does the Kok river begin?", a: ["In the hills of Myanmar", "In the Gulf of Thailand", "In Bangkok", "In a lotus pond"], why: "The Kok begins in the hills of Myanmar." },
      { q: "Which northern province does the Kok flow through?", a: ["Chiang Rai", "Songkhla", "Rayong", "Nakhon Ratchasima"], why: "The Kok flows through Chiang Rai before joining the Mekong." },
    ],
    "lotus-pond": [
      { q: "Which northern city does the Wang run through?", a: ["Lampang", "Hat Yai", "Pattaya", "Udon Thani"], why: "The Wang runs through Lampang in the north." },
      { q: "Which river does the Wang join on its way towards the Chao Phraya?", a: ["The Ping", "The Mekong", "The Mun", "The Chi"], why: "The Wang joins the Ping on its long journey towards the Chao Phraya." },
    ],
    "floating-market": [
      { q: "The Chao Phraya has a royal nickname. What is it?", a: ["The river of kings", "The river of lights", "The golden road", "The silent river"], why: "The Chao Phraya is called the river of kings." },
      { q: "Which big city does the Chao Phraya flow through on its way to the sea?", a: ["Bangkok", "Chiang Mai", "Khon Kaen", "Phuket"], why: "It flows through Bangkok to the sea. Every year people float their krathongs on it for Loy Krathong." },
    ],
  },
};

const quizEl = $("#quizBody");
let quizState = null;
const quizBest = id => +(localStorage.getItem(QUIZ.bestKey + ":" + id) || 0) || 0;
const quizShuffle = (arr, rnd = Math.random) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const quizSeed = n => () => (n = (n * 1664525 + 1013904223) >>> 0) / 4294967296;   // same river, same 4 general questions

function buildQuiz(fish) {
  const idx = Math.max(0, CONFIG.characters.findIndex(c => c.id === fish.id));
  const own = (QUIZ.river[fish.id] || []).map(q => ({ ...q, river: true }));
  const general = quizShuffle(QUIZ.general, quizSeed(idx * 97 + 13)).slice(0, 6 - own.length);
  return quizShuffle([...general, ...own]);
}
function startQuiz(fresh) {
  const same = quizState && quizState.fish === currentFish.id && !quizState.done;
  if (!fresh && same) { quizRender(); return; }          // coming back from reading the About page: carry on where you were
  quizState = { fish: currentFish.id, qs: buildQuiz(currentFish), i: 0, score: 0, picked: false, done: false };
  quizRender();
}
function quizRender() { quizState.done ? quizDone(true) : quizAsk(quizState.picked); }

function quizAsk(keep) {
  const s = quizState, n = s.qs.length, item = s.qs[s.i];
  if (!keep) { s.picked = false; s.opts = quizShuffle(item.a.map((text, k) => ({ text, right: k === 0 }))); }
  $(".quiz-title").innerHTML = "Test your<br>knowledge";
  quizEl.innerHTML = `
    <p class="about-label"><b>${s.i + 1} / ${n}</b><span></span></p>
    ${item.river ? `<p class="quiz-tag">${currentFish.name} question · <a href="#about" class="quiz-read" data-go="about">Not sure? Read about this river</a></p>` : ""}
    <p class="quiz-q">${item.q}</p>
    <div class="quiz-opts">${s.opts.map((o, k) => `<button class="quiz-opt" data-k="${k}">${o.text}</button>`).join("")}</div>
    <div class="quiz-fb" id="quizFb"></div>`;
  if (keep) quizReveal(s.picked.k);
}
function quizReveal(pickedK) {
  const s = quizState, item = s.qs[s.i], right = s.opts[pickedK].right;
  quizEl.querySelectorAll(".quiz-opt").forEach((b, k) => { b.disabled = true; if (s.opts[k].right) b.classList.add("right"); else if (k === pickedK) b.classList.add("wrong"); });
  const last = s.i === s.qs.length - 1;
  $("#quizFb").innerHTML = `<p><b>${right ? "That's right!" : "Not quite."}</b> ${item.why}</p>
    <button class="pill pill-solid" data-next>${last ? "See my score" : "Next question"}</button>`;
}
quizEl.addEventListener("click", e => {
  const s = quizState; if (!s) return;
  const go_ = e.target.closest("[data-go]");
  if (go_) { e.preventDefault(); go(go_.dataset.go); return; }
  const opt = e.target.closest(".quiz-opt");
  if (opt && !s.picked) {
    const k = +opt.dataset.k; s.picked = { k };
    if (s.opts[k].right) s.score++;
    quizReveal(k); return;
  }
  if (e.target.closest("[data-next]")) {
    if (++s.i < s.qs.length) quizAsk(); else quizDone();
  } else if (e.target.closest("[data-again]")) startQuiz(true);
});
function quizDone(again) {
  const s = quizState, n = s.qs.length;
  if (!again) {
    s.done = true;
    const prev = quizBest(s.fish), gain = Math.max(0, s.score - prev) * QUIZ.pointsPerRight;
    if (s.score > prev) { try { localStorage.setItem(QUIZ.bestKey + ":" + s.fish, s.score); } catch (e) {} }
    if (gain && typeof addPoints === "function") addPoints(gain);
    s.gain = gain;
  }
  const msg = s.score === n ? "Perfect! You really know this river." : s.score >= n - 2 ? "Great job! You know a lot about this river." : "Good try! Read the About page and have another go.";
  quizEl.innerHTML = `
    <p class="about-label"><b>your score</b><span></span></p>
    <p class="quiz-score"><b>${s.score}</b> / ${n}</p>
    <p class="quiz-q">${msg}${s.gain ? ` <br>+${s.gain} points!` : ""}</p>
    <div class="about-links quiz-end">
      <button class="pill pill-solid" data-again>Try again</button>
      <a href="#about" class="about-link soft" data-go="about">Back to About</a>
    </div>`;
}
