HOW TO RUN
  Open a terminal in this folder and run:  python3 -m http.server 8000
  then visit http://localhost:8000

WHERE TO SWAP THINGS
  app.js  -> CONFIG block at the top: characters/positions (x,y are 0-1 across the map), decor,
             dot coordinates, background image, map size (worldScale), coloring page, palette.
  assets/art/world-bg.webp        the pannable background (same aspect ratio as your original works best)
  assets/characters/*.png        characters + grass
  assets/logo/logo-dark.png + logo-light.png   your logo (dark shows on light pages, light on the Play page)
  assets/art/coloring-page.png   transparent-background line art works best
  assets/art/reveal-fallback.png   revealed after you win the river game
  style.css -> :root variables at the top, and body.is-play for the Play page colors

MAP LAYOUT
  The whole map is your layout PNG (2000 x 1414 units). Fish positions are in app.js (CONFIG.characters, x/y as 0-1 of the map).
  Text on the map is in index.html (<p class="w-label">): --x / --y are positions in layout units, --fs size, --r tilt.
  Hand-drawn arrows / dashed fish: assets/art/ghost-arrow.png and tap-curve.png.


RIVER DEFENCE (each fish has its own river)
  game.js          the whole game. The GAME block at the top is what you edit:
                   fish (costs, range, damage), enemies, waves, DP, river health, and GAME.stages =
                   one river map per fish on the home map (board size, the river tiles, difficulty "level").
  Saving a river is remembered in the browser and the fish keeps a soft yellow glow on the home map.
  To start fresh, run  localStorage.removeItem("loyCleared")  in the browser console (the key is CONFIG.progressKey).

SWAPPING PICTURES (everything is a PNG; overwrite the file with the same name, or change the path in the config)
  assets/game/river.png            the river's paper texture (tiles; any size)
  assets/game/bank.png             one bank tile
  assets/game/goal.png             the marker at the end of the river
  assets/game/drop-full.png / drop-empty.png   river health
  assets/game/enemy-bottle|bag|oil|boss.png    the pollution (paths in GAME.enemies)
  assets/game/shot-lotus|dragon|lantern.png    what the fish throw (paths in GAME.defenders)
  assets/game/glow.png             the yellow glow behind a saved fish (CONFIG.glowImage in app.js)
  assets/characters/<fish>.png     the fish on the map AND the defenders in the game
  assets/art/coloring/<fish id>.png   that fish's coloring page   (fish ids: see CONFIG.characters in app.js)
  assets/art/reveal/<fish id>.png     that fish's picture after you win its river
  assets/art/coloring-page.png / reveal-fallback.png   fallbacks if a fish has no file of its own
  assets/art/world-bg.webp, ghost-arrow.png, tap-curve.png, assets/logo/*   the map and logos
  If a game picture is missing, the game falls back to a simple drawn shape.

DIFFICULTY, ENDLESS AND LOADING SCREEN
  Each river shows a difficulty (1-5 dots) in the fish's speech bubble and on the start card. Set it per stage with
  `difficulty: 3` in GAME.stages (game.js); otherwise it is worked out from `level`.
  Floating Market is the endless river (`endless: true`): waves never stop and get bigger, faster and tougher until
  all river health is gone. It starts glowing on the map once you reach wave `clearAt`; your best wave is remembered.
  Make any other stage endless by adding `endless: true` to it.
  The yellow loading screen between pages: CONFIG.loadingMs (0 turns it off) and CONFIG.loaderImage in app.js.
  By default the fish you picked floats over the loading bar; set loaderImage to a PNG path to always use one picture.

RESET BUTTON / TOWER DEFENCE BACKGROUND
  "Reset" in the menu (next to Shop) forgets which rivers are saved so the fish stop glowing.
  assets/game/background.png is the dark paper behind the tower defence (swap it for any picture).

ABOUT PAGE, SHOP AND POINTS
  Tapping a fish shows "About" and "Defend the river". About opens that river's page (name, story, photo) with a
  "Color this river" link to its coloring page. River names and stories are in CONFIG.characters (app.js).
  images/about/<fish id>.png is the photo on each About page (square works best).
  The Shop (menu > Shop) swaps points for items. Items, prices, categories and how many points a river pays are in
  CONFIG.shop (app.js); item pictures are PNGs in images/shop/. Points and swapped items are kept in the browser.
  A swap gives a short code (LOY-XXXXX) shown under "My items". Nothing is sent anywhere: connect that to real
  orders however you like.

QUIZ
  quiz.js holds the questions (QUIZ.general and QUIZ.river). The FIRST answer in each list is the right one; they are shuffled on screen.
  5 points for every right answer beyond your best score. Each river gets its own quiz: 2 questions about that river (QUIZ.river, answers are in its About story) + 4 general ones.

POINTS AND PRICES (keeps the giveaway affordable)
  All of this is in CONFIG.shop (app.js): clearReward + perLevel per river, replayRate (0 = replays pay nothing),
  endlessPerWave and endlessMax, limitPerPerson (1 = one item per person), and each item's price.
  Most points anyone can ever earn: about 660 (rivers) + 100 (endless) + 270 (quizzes) = 1030. Keychains cost 500.
  NOTE: points live in the visitor's browser, so a determined person can edit them. Before you post an item, check the
  exchange code and keep one per person (for example one per email). A real order form or server would make this watertight.

PER FISH COLOUR PALETTE
  A fish can have its own coloring palette: add palette: ["#hex", ...] to its entry in CONFIG.characters (app.js).
  The Ping River (sky lanterns) has one picked from its artwork. Fish without one use the brand colours in CONFIG.palette.

SHARED COLORING PAGE (for now)
  CONFIG.sharedColoring in app.js makes every river use the sky lantern coloring page and palette.
  Set it to null to go back to one page per fish (assets/art/coloring/<fish id>.png).

REVEAL IMAGE: assets/art/reveal-logo.png (the yellow Loy fish) shows on every win page and floats. Set sharedReveal:false in app.js to use per-river art again.
