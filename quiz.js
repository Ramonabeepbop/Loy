/* =========================================================
   QUIZ: six questions about Loy Krathong, saving water and the river you picked.
   Every river gets its own quiz: 2 facts + 1 values question about that river (QUIZ.river) plus 3 general ones (one about water, one about Loy Krathong, one about values) picked at random from QUIZ.general.
   The answers to the river questions are written on that river's About page (the `story` in app.js), so people can read and find out.
   In every list the FIRST answer is the right one (they are shuffled on screen).
   Points: 5 for every right answer beyond your best score on that river.
   ========================================================= */
const QUIZ = {
  pointsPerRight: 5,
  bestKey: "loyQuizBest",
  general: [
    { kind: "loy", q: "Loy Krathong is held on the night of the full moon of which month?",
      a: ["The 12th lunar month, usually in November", "The 5th lunar month, in April", "The 1st lunar month, in January", "The 8th lunar month, in July"],
      why: "It falls on the full moon of the 12th lunar month, when the rivers are full after the rainy season." },
    { kind: "loy", q: "What do people say floating a krathong stands for?",
      a: ["Thanking the water spirit and letting go of anger and bad luck", "Calling the rain to come back", "Paying a fee to the river", "Making the water warmer"],
      why: "Many people thank Phra Mae Khongkha, the water goddess, and let go of grudges as the krathong drifts away." },
    { kind: "loy", q: "In Thai, what does \"loy\" mean?",
      a: ["To float", "To light", "To pray", "To dance"],
      why: "Loy means to float, and a krathong is a small basket, so Loy Krathong means floating a basket on the water." },
    { kind: "loy", q: "What is a traditional krathong made from?",
      a: ["A slice of banana trunk, banana leaves and flowers", "Foam and plastic", "Metal and glass", "Sand and stone"],
      why: "Traditional krathongs are made from natural materials such as banana trunk, banana leaves and flowers, topped with a candle and incense. Foam and plastic stay in the water for years." },
    { kind: "loy", q: "In Thailand, when does the rainy season usually fall?",
      a: ["From around May to October", "From December to February", "Only in April", "There is no rainy season"],
      why: "The rains usually run from about May to October, which is why the rivers are full and high when Loy Krathong comes round in November." },
    { kind: "loy", q: "What is the kindest thing to do with krathongs at Loy Krathong?",
      a: ["Share one krathong between a group, and make sure it gets collected afterwards", "Float a bread krathong, because the fish will eat it", "Float lots of natural krathongs, because they vanish by themselves", "Float a foam one, because it floats the best"],
      why: "Even krathongs made of natural materials cannot break down fast enough when so many are floated at once, so cleanup crews have to collect them. Bread is no better: fish cannot eat that much, and it dissolves before it can be picked up, which pollutes the water. Foam and plastic stay for years. Floating fewer, and making sure they are collected, is the kindest choice." },
    { kind: "water", q: "About how much of all the water on Earth is fresh water?",
      a: ["About 3%", "About 25%", "About 50%", "About 97%"],
      why: "Only about 3% of the world's water is fresh, and most of that is frozen in ice or deep underground. Rivers and lakes hold a tiny share, which is why every drop matters." },
    { kind: "water", q: "Most of the water on Earth is...",
      a: ["Salty ocean water", "Fresh water in rivers", "Water vapour in clouds", "Water in underground tanks"],
      why: "About 97% of Earth's water is salty ocean water, which we cannot drink or use for crops." },
    { kind: "water", q: "What is the water cycle?",
      a: ["Water moving between sea, sky and land again and again", "Water that only ever flows downhill and disappears", "A bicycle race along the river", "The way a tap fills a bath"],
      why: "Sun warms the sea and rivers, water rises as vapour, forms clouds and falls as rain. It is the same water used over and over." },
    { kind: "water", q: "Where does the water in a river come from?",
      a: ["Rain, springs and melting snow from the land around it", "The sea, flowing uphill", "Factories and pipes", "The moon"],
      why: "Rain and springs on the land, and in some places melting snow, feed a river on its way to the sea." },
    { kind: "water", q: "What do wetlands and mangroves do for us?",
      a: ["Soak up floods and filter the water", "Make rivers saltier", "Dry up the rain", "Block the sunlight"],
      why: "Wetlands and mangroves act like sponges and filters. They hold floodwater, trap dirt and give fish and birds a home." },
    { kind: "water", q: "Which of these should never go down the drain or into a river?",
      a: ["Used cooking oil", "Rainwater", "Clean tap water", "Ice cubes"],
      why: "Oil floats on water, coats animals and blocks drains. Let it cool, pour it into a container and put it in the bin." },
    { kind: "water", q: "Which uses the most fresh water around the world?",
      a: ["Farming and growing food", "Swimming pools", "Brushing teeth", "Fountains"],
      why: "Roughly 70% of the fresh water people take from rivers and underground goes to farming, so wasting food also wastes water." },
    { kind: "water", q: "About how much of your body is water?",
      a: ["More than half", "About 5%", "About 1%", "None, you are mostly bone"],
      why: "The human body is roughly 60% water, which is why we need to drink every day." },
    { kind: "water", q: "Why can't we drink seawater?",
      a: ["It is so salty it makes you thirstier and can make you ill", "It is too cold", "It has no taste", "It is too heavy"],
      why: "Seawater has far more salt than our bodies can handle, so drinking it dries you out." },
    { kind: "water", q: "What can you do with the water you used to rinse vegetables?",
      a: ["Use it to water the plants", "Pour it into the river", "Pour it on the road", "Nothing, it can't be used again"],
      why: "Water that has only rinsed clean vegetables is fine for plants, a simple way to use every drop twice." },
    { kind: "water", q: "What helps keep plastic out of the river?",
      a: ["Bringing your own bag and bottle", "Taking a new bag for every item", "Burying rubbish by the bank", "Floating it away"],
      why: "Plastic you never use cannot end up in the river. Reusable bags and bottles are an easy start." },
    { kind: "water", q: "Why is plastic in a river such a problem?",
      a: ["It breaks into tiny pieces that fish and birds swallow", "It makes the water taste sweeter", "It melts away by morning", "It helps fish grow bigger"],
      why: "Plastic never really goes away. It splits into tiny pieces that animals eat and that stay in the water for years." },
    { kind: "water", q: "Which wastes more water while you brush your teeth?",
      a: ["Leaving the tap running", "Turning the tap off until you rinse"],
      why: "A running tap pours away many litres in two minutes. Turn it off while you brush and use a cup to rinse." },
    { kind: "water", q: "A tap drips all day and all night and nobody fixes it. Over one year, how much water is lost?",
      a: ["Thousands of litres, enough to fill many bathtubs", "About a cup", "About one bucket", "Nothing, the drips go back into the pipes"],
      why: "Drip by drip it adds up to thousands of litres a year. Fixing a washer is a small job that saves a lot." },
    { kind: "water", q: "When is the best time to water the garden so less water is wasted?",
      a: ["Early morning or evening", "Hot midday", "Only when it is raining", "It makes no difference"],
      why: "In the cool of the morning or evening, less water evaporates, so more of it reaches the roots." },
    { kind: "values", q: "Which of these shows respect for nature?",
      a: ["Taking only what you need and leaving the place clean", "Picking every flower you see", "Leaving your rubbish behind for someone else", "Feeding the fish as much bread as you can"],
      why: "Respect for nature means taking only what you need and leaving a place as good as, or better than, you found it." },
    { kind: "values", q: "Your neighbours are cleaning the riverbank. What does working together give you?",
      a: ["Many hands make the work lighter and everyone enjoys the clean river", "Nothing, one person is just as good", "Less water in the river", "A fee to pay"],
      why: "Togetherness, or samakkhi, turns a big job into a small one and the whole community shares the result." },
    { kind: "values", q: "What is the best way to show gratitude to a river?",
      a: ["Say thank you and then look after it all year", "Only visit once a year", "Take as much water as you can", "Throw things in to see them float"],
      why: "Gratitude is shown in what we do. Thanking the water is lovely, and caring for it every day is better." },
    { kind: "values", q: "Which best describes having \"enough\"?",
      a: ["Having what you need and sharing the rest", "Having more than everyone else", "Having nothing at all", "Buying whatever is new"],
      why: "Enough means taking what you need, sharing what you have and never harming the land or water that supports you." },
    { kind: "values", q: "If one village takes much more water than it needs, what happens to people downstream?",
      a: ["There is less water left for them", "They get more water", "Nothing changes", "The river gets longer"],
      why: "Water is shared. What one place takes, another place cannot use, so using only what we need is a way of caring for others." },
    { kind: "values", q: "You see litter by a river on your way home. Which choice shows care for the community?",
      a: ["Pick it up and put it in a bin", "Walk past, someone else will do it", "Kick it into the water", "Take a photo and leave it"],
      why: "Small acts of care, like picking up a piece of litter, add up when many people do them." },
    { kind: "values", q: "Why do many people see a river as something to protect, not just to use?",
      a: ["It gives life to people, animals and farms, and others come after us", "It belongs only to those who live closest", "It will never run out whatever we do", "Rivers look after themselves"],
      why: "A river feeds farms, fish and families, and it will be needed by the people who come after us." },
  ],
  // two questions per river, keyed by fish id. The answers are in each river's story on its About page.
  river: {
    "rice-fields": [
      { q: "The Mun winds across Isan. Which big river does it join?", a: ["The Mekong", "The Chao Phraya", "The Ping", "The Kok"], why: "The Mun flows on until it joins the mighty Mekong." },
      { q: "Which part of Thailand does the Mun river wind across?", a: ["Isan, in the northeast", "The far south", "The western coast", "The centre of Bangkok"], why: "The Mun crosses Isan, the rice country of northeastern Thailand." },
      { value: true, q: "Why do Thai farmers ask the rice goddess, Phra Mae Phosop, for forgiveness before planting?", a: ["Because the land that gives them life must be treated with care", "Because rice is expensive", "Because the rains are late", "Because the fields are too big"], why: "Farmers ask her forgiveness because the land that gives them life must be treated with care." },
    ],
    "lanterns": [
      { q: "Near Nakhon Sawan, the Nan meets which river?", a: ["The Ping", "The Mun", "The Kok", "The Mekong"], why: "Near Nakhon Sawan the Nan meets the Ping." },
      { q: "When the Nan and the Ping join together, what river do they become?", a: ["The Chao Phraya", "The Mekong", "The Chi", "The Yom"], why: "Together the Nan and the Ping become the Chao Phraya." },
      { value: true, q: "Each glowing lantern at Yi Peng is a small act of faith in what?", a: ["That tomorrow can be brighter", "That the rain will stop", "That the river will flood", "That everyone will go home early"], why: "Hope is at the heart of Yi Peng: each lantern is a small act of faith that tomorrow can be brighter." },
    ],
    "dragon-waves": [
      { q: "Old tales say something glowing rises from the Mekong. What is it?", a: ["Naga fireballs", "Golden lanterns", "Silver coins", "Floating stars"], why: "Old tales tell of glowing naga fireballs rising from its waters." },
      { q: "Along which parts of Thailand does the Mekong run?", a: ["The northern and northeastern border", "The southern beaches", "Only through Bangkok", "The western mountains"], why: "The Mekong runs along Thailand's northern and northeastern border." },
      { value: true, q: "In Buddhist stories, how did the Naga king Mucalinda protect the Buddha?", a: ["He coiled around the Buddha to shelter him from a storm", "He carried him across a river", "He lit a thousand lanterns", "He gave him rice"], why: "Mucalinda coiled around the Buddha to shelter him from a storm, which is why the Naga is seen as a guardian of water." },
    ],
    "sky-lanterns": [
      { q: "Which city does the Ping flow through?", a: ["Chiang Mai", "Phuket", "Ayutthaya", "Khon Kaen"], why: "The Ping flows through Chiang Mai." },
      { q: "What festival fills the Ping's night sky with thousands of lanterns?", a: ["Yi Peng", "Songkran", "Vegetarian Festival", "Rocket Festival"], why: "Thousands of sky lanterns light up the night during Yi Peng." },
      { value: true, q: "What does the Thai word \"katanyu\" mean?", a: ["Knowing and repaying kindness", "Running fast", "Keeping quiet", "Saving money"], why: "Katanyu is knowing and repaying kindness, which is what we do at Loy Krathong when we thank the water." },
    ],
    "whirlpool": [
      { q: "What makes the Yom special among Thailand's big rivers?", a: ["It still flows freely with no large dam", "It is the shortest river", "It flows backwards", "It is made of salt water"], why: "The Yom is one of the last big rivers that still flows freely, with no large dam along its way." },
      { q: "Which of these places does the Yom pass through?", a: ["Sukhothai", "Phuket", "Krabi", "Trat"], why: "The Yom passes through Phrae and Sukhothai on the way south." },
      { value: true, q: "What does the saying \"mai pen rai\" mean?", a: ["Never mind", "Good morning", "Come here", "Very hot"], why: "Mai pen rai means never mind. It is close to plong wang, putting down what you cannot control." },
    ],
    "friends": [
      { q: "What is special about the length of the Chi?", a: ["It is the longest river that stays entirely inside Thailand", "It is the shortest river in the country", "It is longer than the Mekong", "It never reaches another river"], why: "The Chi is the longest river that stays entirely inside Thailand." },
      { q: "Which river does the Chi meet after crossing Isan?", a: ["The Mun", "The Nan", "The Wang", "The Kok"], why: "The Chi travels across Isan before meeting the Mun." },
      { value: true, q: "In the old custom of long khaek, what do neighbours do?", a: ["Gather to help one family harvest its rice or build its home", "Race boats along the river", "Trade fish at the market", "Collect rubbish from the river"], why: "Neighbours gather to help one family, and nobody is paid. The reward is food, laughter and knowing the whole community will be there for you." },
    ],
    "blossoms": [
      { q: "Where does the Kok river begin?", a: ["In the hills of Myanmar", "In the Gulf of Thailand", "In Bangkok", "In a lotus pond"], why: "The Kok begins in the hills of Myanmar." },
      { q: "Which northern province does the Kok flow through?", a: ["Chiang Rai", "Songkhla", "Rayong", "Nakhon Ratchasima"], why: "The Kok flows through Chiang Rai before joining the Mekong." },
      { value: true, q: "What does the Thai word \"sanuk\" mean?", a: ["Finding fun in life and in work", "A kind of boat", "Thank you", "A river"], why: "Sanuk is finding fun in life and work, and joy is meant to be shared." },
    ],
    "lotus-pond": [
      { q: "Which northern city does the Wang run through?", a: ["Lampang", "Hat Yai", "Pattaya", "Udon Thani"], why: "The Wang runs through Lampang in the north." },
      { q: "Which river does the Wang join on its way towards the Chao Phraya?", a: ["The Ping", "The Mekong", "The Mun", "The Chi"], why: "The Wang joins the Ping on its long journey towards the Chao Phraya." },
      { value: true, q: "Why is the lotus a symbol of purity in Thai Buddhism?", a: ["It grows out of muddy water yet rises clean and bright", "It is the biggest flower in the pond", "It only grows inside temples", "It never needs water"], why: "The lotus rises clean from muddy water, like a pure mind untouched by the world around it." },
    ],
    "floating-market": [
      { q: "The Chao Phraya has a royal nickname. What is it?", a: ["The river of kings", "The river of lights", "The golden road", "The silent river"], why: "The Chao Phraya is called the river of kings." },
      { q: "Which big city does the Chao Phraya flow through on its way to the sea?", a: ["Bangkok", "Chiang Mai", "Khon Kaen", "Phuket"], why: "It flows through Bangkok to the sea. Every year people float their krathongs on it for Loy Krathong." },
      { value: true, q: "What does the Sufficiency Economy philosophy encourage?", a: ["Take what you need, share what you have, and never harm the land or water", "Earn as much money as possible", "Buy something new every week", "Stay away from the river"], why: "It encourages living with moderation, good sense and care for the future." },
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
  const own = (QUIZ.river[fish.id] || []).map(q => ({ ...q, river: true }));       // 2 facts about the river + 1 about its value
  const want = 6 - own.length, general = [];
  ["water", "loy", "values"].forEach(kind => { const q = quizShuffle(QUIZ.general.filter(x => x.kind === kind))[0]; if (q && general.length < want) general.push(q); });   // one of each kind, a new mix every time
  quizShuffle(QUIZ.general).forEach(q => { if (general.length < want && !general.includes(q)) general.push(q); });
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
    ${item.river ? `<p class="quiz-tag">${currentFish.name} ${item.value ? "values question" : "question"} · <a href="#about" class="quiz-read" data-go="about">Not sure? Read about this river</a></p>` : ""}
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
