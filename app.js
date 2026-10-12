
let DATA, PROVINCE_OF, CITIES, LANDMARKS, DISTRICT_FACTS;

// Province identity colors (borders/badges/streak pills). 0 = All Nepal scope.
const PROV_COLORS = {
  0: '#c9a24b', // gold - All Nepal
  1: '#e07a63', // Koshi - warm coral
  2: '#e6c877', // Madhesh - amber
  3: '#8fd89a', // Bagmati - mint green
  4: '#7ab8e0', // Gandaki - sky blue
  5: '#c48fe0', // Lumbini - violet
  6: '#e0a45f', // Karnali - ochre
  7: '#6fc9c2'  // Sudurpashchim - teal
};
window.LH_APP_VERSION = '2026-10-12-b';
I18N.add({
  en:{
    prov_0:'Provinces Mode', prov_1:'Koshi (1)', prov_2:'Madhesh (2)', prov_3:'Bagmati (3)',
    prov_4:'Gandaki (4)', prov_5:'Lumbini (5)', prov_6:'Karnali (6)', prov_7:'Sudurpashchim (7)',
    mode_district:'Districts', mode_city:'Cities', mode_landmark:'Landmarks', mode_headquarters:'Headquarters',
    mode1_district:'district', mode1_city:'city', mode1_landmark:'landmark', mode1_headquarters:'headquarters',
    all_nepal:'All Nepal', recall_mode:'Recall Mode',
    quiz_title:'Nepal जिल्ला', quiz_sub:'District Recognition Drill',
    streak:'Streak', best:'Best', check:'Check',
    search_ph:'Type a district name to find it…', recall_ph:'Type your answer…',
    longest:'Longest streak (this scope):', shadowing:'Shadowing', info:'Info', labels:'Labels',
    sound_on:'SOUND ON', sound_off:'SOUND OFF',
    tap_on:'Tap on', tap_hq:'Tap the district whose HQ is',
    type_hq:'Type the headquarters of', type_hl:'Type the highlighted {x}',
    correct:'Correct — ',
    wrong_tap:'That was {a} — {b} is highlighted',
    wrong_type:'You typed "{a}" — correct: {b}',
    new_best:'New best ({m} · {p}): {n}',
    found:'Found: {n}', no_match:'No {x} matches "{q}"',
    hq:'HQ: {n}', people:'{n} people', area:'{n} km²',
    search_ph:'Search districts, cities, landmarks, HQs…',
    recent:'Recent searches', clear_all:'Clear all', remove:'Remove',
    tag_district:'District', tag_city:'City', tag_landmark:'Landmark', tag_hq:'HQ of {d}',
    no_match_all:'No match for "{q}"',
    flash:'Reveal', flash_on:'Reveal on — scoring paused', flash_off:'Reveal off',
    flash_pause:'Reveal is on — turn it off to answer',
    see_more:'See more', see_less:'See less'
  },
  ne:{
    prov_0:'प्रदेश मोड', prov_1:'कोशी (१)', prov_2:'मधेश (२)', prov_3:'बागमती (३)',
    prov_4:'गण्डकी (४)', prov_5:'लुम्बिनी (५)', prov_6:'कर्णाली (६)', prov_7:'सुदूरपश्चिम (७)',
    mode_district:'जिल्ला', mode_city:'सहर', mode_landmark:'स्थल', mode_headquarters:'सदरमुकाम',
    mode1_district:'जिल्ला', mode1_city:'सहर', mode1_landmark:'स्थल', mode1_headquarters:'सदरमुकाम',
    all_nepal:'सम्पूर्ण नेपाल', recall_mode:'स्मरण मोड',
    quiz_title:'नेपाल जिल्ला', quiz_sub:'जिल्ला पहिचान अभ्यास',
    streak:'लगातार', best:'उत्कृष्ट', check:'जाँच्नुहोस्',
    search_ph:'खोज्न जिल्लाको नाम लेख्नुहोस्…', recall_ph:'आफ्नो उत्तर लेख्नुहोस्…',
    longest:'यस दायराको सबैभन्दा लामो क्रम:', shadowing:'छायाँ', info:'जानकारी', labels:'नामहरू',
    sound_on:'आवाज चालु', sound_off:'आवाज बन्द',
    tap_on:'नक्सामा छुनुहोस्', tap_hq:'जसको सदरमुकाम यो हो, त्यो जिल्ला छुनुहोस्',
    type_hq:'यस जिल्लाको सदरमुकाम लेख्नुहोस्', type_hl:'चिह्नित {x}को नाम लेख्नुहोस्',
    correct:'सही — ',
    wrong_tap:'त्यो {a} थियो — {b} चिह्नित गरिएको छ',
    wrong_type:'तपाईंले "{a}" लेख्नुभयो — सही उत्तर: {b}',
    new_best:'नयाँ उत्कृष्ट ({m} · {p}): {n}',
    found:'फेला पर्‍यो: {n}', no_match:'"{q}" सँग मिल्ने कुनै {x} भेटिएन',
    hq:'सदरमुकाम: {n}', people:'{n} जना', area:'{n} वर्ग कि.मी.',
    search_ph:'जिल्ला, सहर, स्थल वा सदरमुकाम खोज्नुहोस्…',
    recent:'हालका खोजहरू', clear_all:'सबै हटाउनुहोस्', remove:'हटाउनुहोस्',
    tag_district:'जिल्ला', tag_city:'सहर', tag_landmark:'स्थल', tag_hq:'{d}को सदरमुकाम',
    no_match_all:'"{q}" सँग मिल्ने केही भेटिएन',
    flash:'देखाउनुहोस्', flash_on:'नाम देखाउँदै — अङ्क गणना रोकिएको', flash_off:'नाम देखाउन बन्द',
    flash_pause:'नाम देखाइँदै छ — उत्तर दिन यसलाई बन्द गर्नुहोस्',
    see_more:'थप हेर्नुहोस्', see_less:'कम हेर्नुहोस्'
  }
});
const tr = (k) => I18N.t(k);
const PROV_LABEL = new Proxy({}, { get:(_, k) => I18N.t('prov_' + k) });
const MODE_LABEL = new Proxy({}, { get:(_, k) => I18N.t('mode_' + k) });
const MODE_COLOR = { district:'#c9a24b', city:'#7ab8e0', landmark:'#c48fe0', headquarters:'#e07a63' };

let districts; // populated after data loads

const svg = document.getElementById('map');
const mapViewport = document.getElementById('mapViewport');
const zoomResetBtn = document.getElementById('zoomReset');
const promptEl = document.getElementById('promptName');
const promptLabelEl = document.getElementById('promptLabel');
const feedbackEl = document.getElementById('feedback');
const streakNumEl = document.getElementById('streakNum');
const bestNumEl = document.getElementById('bestNum');
const bestInlineEl = document.getElementById('bestInline');
const toastEl = document.getElementById('toast');
const tapLabelEl = document.getElementById('tapLabel');
const reactionPop = document.getElementById('reactionPop');
const muteBtn = document.getElementById('muteBtn');
const provTab = document.getElementById('provTab');
const provPanel = document.getElementById('provPanel');
const provGrid = document.getElementById('provGrid');
const provTabLabel = document.getElementById('provTabLabel');
const provTabDot = document.getElementById('provTabDot');
const modeTab = document.getElementById('modeTab');
const modePanel = document.getElementById('modePanel');
const modeGrid = document.getElementById('modeGrid');
const modeTabLabel = document.getElementById('modeTabLabel');
const modeTabDot = document.getElementById('modeTabDot');
const recallTab = document.getElementById('recallTab');
const recallDropdown = document.getElementById('recallPanel_dropdown');
const recallGrid = document.getElementById('recallGrid');
const recallTabLabel = document.getElementById('recallTabLabel');
const recallTabDot = document.getElementById('recallTabDot');
const recallPanel = document.getElementById('recallPanel');
const recallInput = document.getElementById('recallInput');
const recallCheckBtn = document.getElementById('recallCheckBtn');
const recallSuggestions = document.getElementById('recallSuggestions');
const shadowSwitch = document.getElementById('shadowSwitch');
const infoSwitch = document.getElementById('infoSwitch');
const labelsSwitch = document.getElementById('labelsSwitch');
const labelsToggleWrap = document.getElementById('labelsToggleWrap');
const searchIconBtn = document.getElementById('searchIconBtn');
const searchWrap = document.getElementById('searchWrap');
const searchInput = document.getElementById('searchInput');
const searchMsg = document.getElementById('searchMsg');
const factPanel = document.getElementById('factPanel');
const factDistrict = document.getElementById('factDistrict');
const factHq = document.getElementById('factHq');
const factPop = document.getElementById('factPop');
const factArea = document.getElementById('factArea');
const factText = document.getElementById('factText');

let mode = 'district';
let scope = 0; // current province scope, 0 = All Nepal
let streaks = {};
let bests   = {};
let soundOn = true;
let shadowOn = false;
let infoOn = true;
let labelsOn = false;
let interactionType = 'tap'; // 'tap' | 'recall'
let tapCategory = 'district';
let recallCategory = 'district';
let recallLocked = false;
let currentTarget = null;
let lastAsked = null;
let locked = false;
let recallUsed = false;
let lastFactName = null;
let appearedCounts = {}; // namespaced by mode, drives weighting + shadowing
const REPEAT_PENALTY = 0.05; // smaller = already-asked items come back even less (1 = no penalty)
let recentKeys = [];     // most recently asked items (cool-down so they don't come straight back)

function scopeKey(){ return mode + ':' + scope; }
function ensureScopeState(key){
  if(!(key in streaks)) streaks[key] = 0;
  if(!(key in bests)) bests[key] = 0;
}
function appearedKey(name){ return mode + '::' + name; }

// ---- Audio ----
let actx = null;
function ensureAudio(){
  if(!actx){ actx = new (window.AudioContext || window.webkitAudioContext)(); }
}
function playTone(freq, duration, type, startGain){
  if(!soundOn) return;
  ensureAudio();
  const osc = actx.createOscillator();
  const gain = actx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, actx.currentTime);
  gain.gain.setValueAtTime(startGain, actx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + duration);
  osc.connect(gain);
  gain.connect(actx.destination);
  osc.start();
  osc.stop(actx.currentTime + duration);
}
function playCorrect(){
  playTone(880, 0.12, 'sine', 0.18);
  setTimeout(()=>playTone(1320, 0.15, 'sine', 0.14), 80);
}
function playWrong(){
  playTone(180, 0.28, 'sawtooth', 0.12);
}

// ---- Reaction pop-ups (word banks + streak-milestone specials) ----
const CORRECT_WORDS = [
  "Bingo!!!","Yayyy!!!","Nailed it!","Boom!","Yasss!","Sharp!","Nice one!",
  "Ka-ching!","Correctamundo!","Smooth!","You got it!","Legend!","Sweet!",
  "That's it!","Bang on!","Woohoo!","Spot on!","Ez!","Crushed it!","Yes!!",
  "Perfect!","Solid!","Slick!","Score!","Zing!","Boom baby!","Chef's kiss!",
  "Too easy!","On point!","Clean hit!"
];
const WRONG_WORDS = [
  "Oops!","Yikes!","Seriously?","Not quite!","Nope!","Whoops!","Aw man!",
  "So close!","Nah!","Hmm, no.","Not this time!","Argh!","Miss!","Try again!",
  "Wrong turn!","Off by a mile!","Ouch!","Nuh-uh!","Way off!","Uh-oh!",
  "Nope, not it.","Big miss!","Wrong district!","That's a no.","Swing and a miss!",
  "Close, but no.","Nada.","Wrongo!","Not even close!","Whiff!"
];
const CORRECT_WORDS_NE = [
  "ज्यादै राम्रो!","वाह!","सही!","ठ्याक्कै!","बधाई छ!","जबर्जस्त!","शानदार!","कमाल!",
  "सटीक!","फत्ते!","लौ त!","एकदम ठीक!","खतरा!","अब्बल!","क्या बात!"
];
const WRONG_WORDS_NE = [
  "उफ्!","गलत!","अलि टाढा!","हत्तेरी!","होइन नि!","ओहो!","अर्को पटक!","चुक्यो!",
  "खै त?","लगभग!","फेरि प्रयास गर्नुहोस्!","छुट्यो!","मिलेन!","अहिले होइन!","आइहाल्यो!"
];
const MILESTONE_WORDS_NE = {
  5: "लय समात्यो!", 10: "आगो! 🔥", 15: "अविश्वसनीय!", 20: "रोकिनसक्नु!",
  25: "दन्त्यकथा!", 50: "देवतुल्य!", 100: "प्रमाणित नेपाल विज्ञ।"
};
const MILESTONE_WORDS = {
  5: "ON A ROLL!", 10: "ON FIRE! 🔥", 15: "UNREAL!", 20: "UNSTOPPABLE!",
  25: "LEGENDARY!", 50: "GODLIKE!", 100: "certified nepal expert."
};

let lastCorrectWord = null, lastWrongWord = null;

function pickWord(bank, lastPicked){
  let word = bank[Math.floor(Math.random() * bank.length)];
  if(bank.length > 1){
    while(word === lastPicked){
      word = bank[Math.floor(Math.random() * bank.length)];
    }
  }
  return word;
}

function showReaction(kind, streakAfter){
  const ne = I18N.lang === 'ne';
  const milestoneWord = (kind === 'correct') ? (ne ? MILESTONE_WORDS_NE : MILESTONE_WORDS)[streakAfter] : null;
  let word;
  if(milestoneWord){
    word = milestoneWord;
  } else if(kind === 'correct'){
    word = pickWord(ne ? CORRECT_WORDS_NE : CORRECT_WORDS, lastCorrectWord);
    lastCorrectWord = word;
  } else {
    word = pickWord(ne ? WRONG_WORDS_NE : WRONG_WORDS, lastWrongWord);
    lastWrongWord = word;
  }

  reactionPop.textContent = word;
  reactionPop.className = 'reaction-pop'; // clear animation state
  void reactionPop.offsetWidth; // force reflow so the animation restarts even on rapid re-trigger
  reactionPop.classList.add(kind);
}

// ---- Build SVG (colored by province for border clarity) ----
function buildMap(){
  districts = DATA.districts;
  document.getElementById('map').setAttribute('viewBox', DATA.viewBox);

  districts.forEach(d => {
    const prov = PROVINCE_OF[d.name] || 0;
    const baseColor = PROV_COLORS[prov];
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d.d);
    path.setAttribute('class', 'district');
    path.setAttribute('data-name', d.name);
    path.setAttribute('data-prov', prov);
    path.style.fill = shade(baseColor, -0.72);
    path.style.stroke = baseColor;
    path.addEventListener('click', () => handleTap(d.name, path));
    svg.appendChild(path);
  });

  // Label layer (for shadowing) - placed after all paths so it draws on top
  districts.forEach(d => {
    const path = pathFor(d.name);
    const bbox = path.getBBox();
    const cx = bbox.x + bbox.width/2;
    const cy = bbox.y + bbox.height/2;
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', cx);
    label.setAttribute('y', cy);
    label.setAttribute('class', 'district-label');
    label.setAttribute('data-name', d.name);
    label.textContent = d.name;
    svg.appendChild(label);
  });

  buildMarkerLayer(CITIES, 'city-layer');
  buildMarkerLayer(LANDMARKS, 'landmark-layer');
  buildMarkerLabels(CITIES, 'city-layer');
  buildMarkerLabels(LANDMARKS, 'landmark-layer');
}

// Name labels next to city / landmark dots (hidden until Flash Mode shows them)
function buildMarkerLabels(items, layerClass){
  items.forEach(item => {
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', item.x + 7);
    t.setAttribute('y', item.y - 7);
    t.setAttribute('class', 'marker-label ' + layerClass);
    t.setAttribute('data-name', item.name);
    t.textContent = item.name;
    svg.appendChild(t);
  });
}

function labelFor(name){
  return svg.querySelector(`text.district-label[data-name="${CSS.escape(name)}"]`);
}

// ---- Marker layers (cities / landmarks) ----
function buildMarkerLayer(items, layerClass){
  items.forEach(item => {
    const hit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    hit.setAttribute('cx', item.x);
    hit.setAttribute('cy', item.y);
    hit.setAttribute('r', 14);
    hit.setAttribute('class', 'marker-hit ' + layerClass);
    hit.setAttribute('data-name', item.name);
    hit.setAttribute('data-prov', item.prov);
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', item.x);
    dot.setAttribute('cy', item.y);
    dot.setAttribute('r', 5);
    dot.setAttribute('class', 'marker ' + layerClass);
    dot.setAttribute('data-name', item.name);
    dot.setAttribute('data-prov', item.prov);
    const tap = () => handleTap(item.name, dot);
    hit.addEventListener('click', tap);
    dot.addEventListener('click', tap);
    svg.appendChild(hit);
    svg.appendChild(dot);
  });
}

function markerFor(layerClass, name){
  return svg.querySelector(`circle.marker.${layerClass}[data-name="${CSS.escape(name)}"]`);
}
function elementFor(name){
  if(mode === 'district' || mode === 'headquarters') return pathFor(name);
  if(mode === 'city') return markerFor('city-layer', name);
  return markerFor('landmark-layer', name);
}
function currentItemSet(){
  if(mode === 'district' || mode === 'headquarters') return districts;
  if(mode === 'city') return CITIES;
  return LANDMARKS;
}
function itemProvince(name){
  if(mode === 'district' || mode === 'headquarters') return PROVINCE_OF[name] || 0;
  const item = currentItemSet().find(x => x.name === name);
  return item ? item.prov : 0;
}

function coreName(raw){
  // strips a parenthetical qualifier, e.g. "Bhadrapur (Chandragadhi)" -> "Bhadrapur"
  const idx = raw.indexOf('(');
  return (idx === -1 ? raw : raw.slice(0, idx)).trim();
}

// ---- Nepali name helpers ----
let NAMES_NE = { districts:{}, cities:{}, landmarks:{}, hq:{} };
let FACTS_NE = {};
function isNe(){ return I18N.lang === 'ne'; }
function itemCat(){ return mode === 'city' ? 'cities' : (mode === 'landmark' ? 'landmarks' : 'districts'); }
function dn(name, cat){            // display name in the current language
  if(!isNe()) return name;
  return (NAMES_NE[cat || itemCat()] || {})[name] || name;
}
function normNe(x){                // forgiving comparison: ignore ZWJ/ZWNJ, brackets, extra spaces
  return String(x).normalize('NFC').replace(/[\u200c\u200d]/g,'').replace(/[()]/g,' ').replace(/\s+/g,' ').trim();
}
function hqCore(district){         // headquarters core name in the current language
  if(isNe() && NAMES_NE.hq[district]) return coreName(NAMES_NE.hq[district]);
  return coreName(DISTRICT_FACTS[district][0]);
}

function shade(hex, amt){
  // darken a hex color toward background for fill, keep hue readable
  const c = hex.replace('#','');
  const r = parseInt(c.substring(0,2),16), g = parseInt(c.substring(2,4),16), b = parseInt(c.substring(4,6),16);
  const mix = (v)=> Math.round(v + (amt>0? (255-v)*amt : v*amt));
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

function pathFor(name){
  return svg.querySelector(`path[data-name="${CSS.escape(name)}"]`);
}
function poolForScope(){
  const set = currentItemSet();
  if(scope === 0) return set;
  if(mode === 'district' || mode === 'headquarters') return set.filter(d => PROVINCE_OF[d.name] === scope);
  return set.filter(d => d.prov === scope);
}

function applyLayerVisibility(){
  const districtInteractiveMode = (mode === 'district' || mode === 'headquarters');
  svg.querySelectorAll('path.district').forEach(p => {
    p.classList.toggle('bg-mode', !districtInteractiveMode);
  });
  svg.querySelectorAll('.city-layer').forEach(el => {
    el.style.display = (mode === 'city') ? '' : 'none';
  });
  svg.querySelectorAll('.landmark-layer').forEach(el => {
    el.style.display = (mode === 'landmark') ? '' : 'none';
  });
}

function applyDimming(){
  applyLayerVisibility();
  const pool = new Set(poolForScope().map(d=>d.name));

  if(mode === 'district' || mode === 'headquarters'){
    svg.querySelectorAll('path.district').forEach(p=>{
      const name = p.getAttribute('data-name');
      p.classList.toggle('dimmed', !pool.has(name));
    });
  } else {
    const layerClass = mode === 'city' ? 'city-layer' : 'landmark-layer';
    svg.querySelectorAll(`.${layerClass}`).forEach(el=>{
      const name = el.getAttribute('data-name');
      el.classList.toggle('dimmed', !pool.has(name));
    });
  }
  refreshShadowLabels();
}

function refreshShadowLabels(){
  const pool = new Set(poolForScope().map(d=>d.name));
  const labelsEligible = (mode === 'city' || mode === 'landmark' || mode === 'headquarters');
  districts.forEach(d => {
    const lbl = labelFor(d.name);
    const inScope = pool.has(d.name);
    let show = false;
    if(mode === 'district' || mode === 'headquarters'){
      const seen = (appearedCounts[appearedKey(d.name)] || 0) > 0;
      show = shadowOn && inScope && seen;
    }
    if(labelsOn && labelsEligible && inScope){
      show = true;
    }
    lbl.classList.toggle('show', show);
  });
  refreshFlashLabels();
}

function renderPrompt(){
  if(!currentTarget) return;
  if(interactionType === 'recall'){
    if(mode === 'headquarters'){
      promptLabelEl.textContent = tr('type_hq');
      promptEl.textContent = dn(currentTarget, 'districts');
    } else {
      promptLabelEl.textContent = tr('type_hl').replace('{x}', tr('mode1_' + mode));
      promptEl.textContent = '';
    }
  } else if(mode === 'headquarters' && DISTRICT_FACTS[currentTarget]){
    promptLabelEl.textContent = tr('tap_hq');
    promptEl.textContent = hqCore(currentTarget);
  } else {
    promptLabelEl.textContent = tr('tap_on');
    promptEl.textContent = dn(currentTarget);
  }
}

function pickNext(){
  const pool = poolForScope();

  // Cool-down: skip anything asked in the last few questions
  // (up to 10, but never more than about a quarter of the pool, so small scopes don't get stuck)
  const cooldown = Math.max(1, Math.min(10, Math.floor(pool.length / 4)));
  const recent = recentKeys.slice(-cooldown);
  let candidates = pool.filter(d => !recent.includes(appearedKey(d.name)));
  if(candidates.length === 0) candidates = pool.filter(d => d.name !== lastAsked);
  if(candidates.length === 0) candidates = pool;

  // Weighted so already-asked items come back much less often (each earlier appearance multiplies
  // the chance by REPEAT_PENALTY), but never to zero, so every item can still appear again.
  const weights = candidates.map(d => Math.pow(REPEAT_PENALTY, appearedCounts[appearedKey(d.name)] || 0));
  const total = weights.reduce((a,b)=>a+b, 0);
  let r = Math.random() * total;
  let choice = candidates[candidates.length-1];
  for(let i=0; i<candidates.length; i++){
    r -= weights[i];
    if(r <= 0){ choice = candidates[i]; break; }
  }

  recentKeys.push(appearedKey(choice.name));
  if(recentKeys.length > 12) recentKeys.shift();
  lastAsked = choice.name;
  currentTarget = choice.name;
  clearRecallGlow();

  if(interactionType === 'recall'){
    recallInput.value = '';
    recallSuggestions.innerHTML = '';
    if(mode !== 'headquarters'){
      const el = elementFor(choice.name);
      if(el) el.classList.add('recall-glow');
    }
  }
  renderPrompt();
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  locked = false;
  refreshShadowLabels();
}

function resetPaintedPaths(){
  svg.querySelectorAll('path.district, circle.marker').forEach(p=>{
    p.classList.remove('correct','wrong','locked');
  });
  svg.querySelectorAll('circle.marker-hit').forEach(p=>{
    p.classList.remove('locked');
  });
}

function unlockTapping(){
  svg.querySelectorAll('.locked').forEach(p => p.classList.remove('locked'));
}

function showTapLabel(name){
  tapLabelEl.textContent = dn(name);
  tapLabelEl.classList.add('show');
  setTimeout(()=> tapLabelEl.classList.remove('show'), 1000);
}

function handleTap(name, el){
  if(interactionType === 'recall') return; // map isn't the answer surface in Recall Mode
  if(flashOn){ showTapLabel(name); return; } // Flash Mode: just show the name, don't score
  if(locked) return;
  locked = true;
  resetPaintedPaths(); // clear previous question's highlight now that a new attempt is happening
  svg.querySelectorAll('path.district, circle.marker, circle.marker-hit').forEach(p=>p.classList.add('locked'));
  showTapLabel(name);

  const key = scopeKey();
  ensureScopeState(key);
  const correctEl = elementFor(currentTarget);

  if(name === currentTarget){
    el.classList.add('correct');
    feedbackEl.textContent = tr('correct') + dn(currentTarget);
    feedbackEl.className = 'feedback ok';
    playCorrect();
    streaks[key]++;
    showReaction('correct', streaks[key]);
    if(streaks[key] > bests[key]){
      bests[key] = streaks[key];
      saveBest(key, bests[key]);
      showToast(tr('new_best').replace('{m}', MODE_LABEL[mode]).replace('{p}', PROV_LABEL[scope]).replace('{n}', I18N.num(bests[key])));
    }
  } else {
    el.classList.add('wrong');
    if(correctEl) correctEl.classList.add('correct');
    feedbackEl.textContent = tr('wrong_tap').replace('{a}', dn(name)).replace('{b}', dn(currentTarget));
    feedbackEl.className = 'feedback bad';
    playWrong();
    showReaction('wrong', null);
    streaks[key] = 0;
  }
  appearedCounts[appearedKey(currentTarget)] = (appearedCounts[appearedKey(currentTarget)] || 0) + 1;
  updateScores();
  refreshShadowLabels();
  showFactPanel(currentTarget);

  setTimeout(() => {
    unlockTapping();
    pickNext();
  }, 1000);
}

function updateScores(){
  const key = scopeKey();
  ensureScopeState(key);
  streakNumEl.textContent = I18N.num(streaks[key]);
  bestNumEl.textContent = I18N.num(bests[key]);
  bestInlineEl.textContent = I18N.num(bests[key]);
}

function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(()=> toastEl.classList.remove('show'), 1800);
}

// ---- Province selector UI ----
function buildProvinceUI(){
  provGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
  for(let p=0; p<=7; p++){
    const opt = document.createElement('div');
    opt.className = 'prov-opt' + (p===scope ? ' active' : '');
    opt.setAttribute('data-scope', p);
    opt.innerHTML = `<div class="sw" style="background:${PROV_COLORS[p]}"></div><div>${p===0?tr('all_nepal'):PROV_LABEL[p]}</div>`;
    opt.addEventListener('click', () => selectScope(p));
    provGrid.appendChild(opt);
  }
}

function selectScope(p){
  scope = p;
  provTabLabel.textContent = PROV_LABEL[p];
  provTabDot.style.background = PROV_COLORS[p];
  document.querySelectorAll('.prov-opt').forEach(o=>{
    o.classList.toggle('active', parseInt(o.getAttribute('data-scope'),10) === p);
  });
  closePanel();
  applyDimming();
  updateScores();
  lastAsked = null;
  pickNext();
}

// ---- Mode selector UI ----
function buildModeUI(){
  ['district','city','landmark','headquarters'].forEach(m => {
    const opt = document.createElement('div');
    opt.className = 'prov-opt' + (m===tapCategory ? ' active' : '');
    opt.setAttribute('data-mode', m);
    opt.innerHTML = `<div class="sw" style="background:${MODE_COLOR[m]}"></div><div>${MODE_LABEL[m]}</div>`;
    opt.addEventListener('click', () => selectMode(m));
    modeGrid.appendChild(opt);
  });
}

function selectMode(m){
  interactionType = 'tap';
  tapCategory = m;
  mode = m;
  modeTabLabel.textContent = MODE_LABEL[m];
  modeTabDot.style.background = MODE_COLOR[m];
  document.querySelectorAll('#modeGrid .prov-opt').forEach(o=>{
    o.classList.toggle('active', o.getAttribute('data-mode') === m);
  });
  closeModePanel();
  exitRecallUI();
  applyDimming();
  updateScores();
  factPanel.style.display = 'none';

  const labelsEligible = (m === 'city' || m === 'landmark' || m === 'headquarters');
  labelsToggleWrap.style.display = labelsEligible ? '' : 'none';
  if(!labelsEligible && labelsOn){
    labelsOn = false;
    labelsSwitch.classList.remove('on');
    refreshShadowLabels();
  }

  lastAsked = null;
  pickNext();
}

function buildRecallModeUI(){
  ['district','city','landmark','headquarters'].forEach(m => {
    const opt = document.createElement('div');
    opt.className = 'prov-opt' + (m===recallCategory ? ' active' : '');
    opt.setAttribute('data-mode', m);
    opt.innerHTML = `<div class="sw" style="background:${MODE_COLOR[m]}"></div><div>${MODE_LABEL[m]}</div>`;
    opt.addEventListener('click', () => selectRecallMode(m));
    recallGrid.appendChild(opt);
  });
}

function selectRecallMode(m){
  recallUsed = true;
  interactionType = 'recall';
  recallCategory = m;
  mode = m;
  recallTabLabel.textContent = MODE_LABEL[m];
  recallTabDot.style.background = MODE_COLOR[m];
  document.querySelectorAll('#recallGrid .prov-opt').forEach(o=>{
    o.classList.toggle('active', o.getAttribute('data-mode') === m);
  });
  closeRecallDropdown();
  enterRecallUI();
  applyDimming();
  updateScores();
  factPanel.style.display = 'none';

  const labelsEligible = (m === 'city' || m === 'landmark' || m === 'headquarters');
  labelsToggleWrap.style.display = labelsEligible ? '' : 'none';
  if(!labelsEligible && labelsOn){
    labelsOn = false;
    labelsSwitch.classList.remove('on');
    refreshShadowLabels();
  }

  lastAsked = null;
  pickNext();
  recallInput.focus();
}

function enterRecallUI(){
  recallPanel.classList.add('show');
}
function exitRecallUI(){
  recallPanel.classList.remove('show');
  clearRecallGlow();
  recallInput.value = '';
  recallSuggestions.innerHTML = '';
}
function clearRecallGlow(){
  svg.querySelectorAll('.recall-glow').forEach(el => el.classList.remove('recall-glow'));
}

function toggleRecallDropdown(){
  const isOpen = recallDropdown.classList.toggle('open');
  recallTab.classList.toggle('open', isOpen);
  if(isOpen){ closeModePanel(); closePanel(); }
}
function closeRecallDropdown(){
  recallDropdown.classList.remove('open');
  recallTab.classList.remove('open');
}
recallTab.addEventListener('click', toggleRecallDropdown);

function expectedRecallAnswer(){
  if(mode === 'headquarters' && DISTRICT_FACTS[currentTarget]){
    return coreName(DISTRICT_FACTS[currentTarget][0]);
  }
  return currentTarget;
}

function recallAcceptable(){       // every spelling we accept as correct (English + Nepali)
  const list = [];
  if(mode === 'headquarters' && DISTRICT_FACTS[currentTarget]){
    list.push(coreName(DISTRICT_FACTS[currentTarget][0]));
    if(NAMES_NE.hq[currentTarget]) list.push(coreName(NAMES_NE.hq[currentTarget]));
  } else {
    list.push(currentTarget);
    const ne = NAMES_NE[itemCat()][currentTarget];
    if(ne) list.push(ne);
  }
  return list;
}
function recallExpectedDisplay(){
  const l = recallAcceptable();
  return (isNe() && l[1]) ? l[1] : l[0];
}
function isRecallCorrect(typed){
  const t1 = typed.trim().toLowerCase();
  const t2 = normNe(typed).toLowerCase();
  return recallAcceptable().some(a => a.toLowerCase() === t1 || normNe(a).toLowerCase() === t2);
}

function recallPool(){
  if(mode === 'headquarters'){
    return Object.keys(DISTRICT_FACTS).flatMap(d => {
      const a = [coreName(DISTRICT_FACTS[d][0])];
      if(NAMES_NE.hq[d]) a.push(coreName(NAMES_NE.hq[d]));
      return a;
    });
  }
  const cat = itemCat();
  return currentItemSet().flatMap(x => {
    const a = [x.name];
    if(NAMES_NE[cat][x.name]) a.push(NAMES_NE[cat][x.name]);
    return a;
  });
}

function submitRecall(typedRaw){
  if(recallLocked || interactionType !== 'recall') return;
  if(flashOn){ feedbackEl.textContent = tr('flash_pause'); feedbackEl.className = 'feedback'; return; }
  const typed = (typedRaw || '').trim();
  if(!typed) return;

  recallLocked = true;
  recallInput.disabled = true;
  recallCheckBtn.disabled = true;
  recallSuggestions.innerHTML = '';

  const expected = recallExpectedDisplay();
  const key = scopeKey();
  ensureScopeState(key);
  const isCorrect = isRecallCorrect(typed);

  if(mode !== 'headquarters'){
    const el = elementFor(currentTarget);
    if(el){ el.classList.remove('recall-glow'); el.classList.add('correct'); }
  }

  if(isCorrect){
    feedbackEl.textContent = tr('correct') + expected;
    feedbackEl.className = 'feedback ok';
    playCorrect();
    streaks[key]++;
    showReaction('correct', streaks[key]);
    if(streaks[key] > bests[key]){
      bests[key] = streaks[key];
      saveBest(key, bests[key]);
      showToast(tr('new_best').replace('{m}', MODE_LABEL[mode]).replace('{p}', PROV_LABEL[scope]).replace('{n}', I18N.num(bests[key])));
    }
  } else {
    feedbackEl.textContent = tr('wrong_type').replace('{a}', typed).replace('{b}', expected);
    feedbackEl.className = 'feedback bad';
    playWrong();
    showReaction('wrong', null);
    streaks[key] = 0;
  }

  appearedCounts[appearedKey(currentTarget)] = (appearedCounts[appearedKey(currentTarget)] || 0) + 1;
  updateScores();
  refreshShadowLabels();
  showFactPanel(currentTarget);

  setTimeout(() => {
    recallLocked = false;
    recallInput.disabled = false;
    recallCheckBtn.disabled = false;
    pickNext();
    recallInput.focus();
  }, 1200);
}

recallInput.addEventListener('input', () => {
  const val = recallInput.value.trim().toLowerCase();
  recallSuggestions.innerHTML = '';
  if(!val) return;
  const pool = recallPool();
  const seen = new Set();
  const matches = [];
  for(const n of pool){
    if(normNe(n).toLowerCase().startsWith(normNe(val)) && !seen.has(n)){
      seen.add(n);
      matches.push(n);
      if(matches.length >= 6) break;
    }
  }
  matches.forEach(name => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'recall-chip';
    chip.textContent = name;
    chip.addEventListener('click', () => {
      recallInput.value = name;
      submitRecall(name);
    });
    recallSuggestions.appendChild(chip);
  });
});
recallInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
    submitRecall(recallInput.value);
  }
});
recallCheckBtn.addEventListener('click', () => submitRecall(recallInput.value));

function escapeAttr(s){
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
}

// ---- Search ----
// ---- Flash Mode: show every name with one tap ----
let flashOn = false;
const flashBtn = document.getElementById('flashBtn');

function refreshFlashLabels(){
  const pool = new Set(poolForScope().map(d => d.name));
  districts.forEach(d => {
    const lbl = labelFor(d.name);
    if(!lbl) return;
    const on = flashOn && (mode === 'district' || mode === 'headquarters') && pool.has(d.name);
    lbl.classList.toggle('flash', on);
    const txt = (on && mode === 'headquarters' && DISTRICT_FACTS[d.name]) ? hqCore(d.name) : dn(d.name, 'districts');
    if(lbl.textContent !== txt) lbl.textContent = txt;
  });
  [['city-layer', 'cities', 'city'], ['landmark-layer', 'landmarks', 'landmark']].forEach(([layer, cat, modeName]) => {
    svg.querySelectorAll('text.marker-label.' + layer).forEach(t => {
      const name = t.getAttribute('data-name');
      t.classList.toggle('flash', flashOn && mode === modeName && pool.has(name));
      const txt = dn(name, cat);
      if(t.textContent !== txt) t.textContent = txt;
    });
  });
  if(flashBtn) flashBtn.classList.toggle('on', flashOn);
}
function toggleFlash(){
  flashOn = !flashOn;
  refreshFlashLabels();
  showToast(tr(flashOn ? 'flash_on' : 'flash_off'));
}
if(flashBtn) flashBtn.addEventListener('click', toggleFlash);

// ---- Search over everything on the map (districts, cities, landmarks, headquarters) + history ----
const SEARCH_HISTORY_KEY = 'loksewa-search-history-v1';
const SEARCH_HISTORY_MAX = 15;
const HISTORY_VISIBLE = 5;       // rows shown before "See more"
let historyExpanded = false;
const TYPE_ORDER = { district:0, city:1, landmark:2, hq:3 };
const TYPE_COLOR = { district:'#c9a24b', city:'#7ab8e0', landmark:'#c48fe0', hq:'#e07a63' };
let searchHit = null;     // { type, name } currently highlighted on the map
let searchPin = null;     // SVG pin used for cities / landmarks (they are hidden outside their own mode)
let searchRows = [];      // items listed in the dropdown
let searchActive = -1;    // keyboard-selected row

const searchDrop = document.createElement('div');
searchDrop.className = 'search-drop';
searchDrop.id = 'searchDrop';
searchWrap.appendChild(searchDrop);

function catOf(type){ return type === 'city' ? 'cities' : (type === 'landmark' ? 'landmarks' : 'districts'); }
function normQ(x){ return normNe(x).toLowerCase(); }

function allSearchItems(){
  const out = [];
  districts.forEach(d => out.push({ type:'district', name:d.name }));
  CITIES.forEach(c => out.push({ type:'city', name:c.name }));
  LANDMARKS.forEach(l => out.push({ type:'landmark', name:l.name }));
  Object.keys(DISTRICT_FACTS).forEach(d => out.push({ type:'hq', name:d }));
  return out;
}
function itemTexts(it){
  if(it.type === 'hq'){
    const en = (DISTRICT_FACTS[it.name] || [''])[0];
    const ne = NAMES_NE.hq[it.name] || '';
    return [en, coreName(en), ne, coreName(ne)];
  }
  return [it.name, (NAMES_NE[catOf(it.type)] || {})[it.name] || ''];
}
function itemLabel(it){
  if(it.type === 'hq'){
    const en = (DISTRICT_FACTS[it.name] || [it.name])[0];
    return (isNe() && NAMES_NE.hq[it.name]) ? NAMES_NE.hq[it.name] : en;
  }
  return dn(it.name, catOf(it.type));
}
function itemTag(it){
  if(it.type === 'hq') return tr('tag_hq').replace('{d}', dn(it.name, 'districts'));
  return tr('tag_' + it.type);
}
function searchMatches(raw){
  const q = normQ(raw);
  if(!q) return [];
  const scored = [];
  allSearchItems().forEach(it => {
    let best = 99;
    itemTexts(it).forEach(t => {
      const x = normQ(t);
      if(!x) return;
      let sc = 99;
      if(x === q) sc = 0;
      else if(x.startsWith(q)) sc = 1;
      else if(x.split(' ').some(w => w.startsWith(q))) sc = 2;
      else if(x.includes(q)) sc = 3;
      if(sc < best) best = sc;
    });
    if(best < 99) scored.push({ it:it, sc:best });
  });
  scored.sort((a, b) => a.sc - b.sc || TYPE_ORDER[a.it.type] - TYPE_ORDER[b.it.type] || a.it.name.localeCompare(b.it.name));
  return scored.slice(0, 8).map(x => x.it);
}

// history (saved in this browser only)
function loadSearchHistory(){
  try{
    const a = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
    return Array.isArray(a) ? a.filter(x => x && x.type && x.name).slice(0, SEARCH_HISTORY_MAX) : [];
  }catch(e){ return []; }
}
function saveSearchHistory(list){
  try{ localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(list)); }catch(e){ /* storage unavailable */ }
}
function addToHistory(it){
  const h = loadSearchHistory().filter(x => !(x.type === it.type && x.name === it.name));
  h.unshift({ type:it.type, name:it.name });
  saveSearchHistory(h.slice(0, SEARCH_HISTORY_MAX));
}

// highlighting on the map (works whatever mode is active)
function focusOn(x, y){
  if(currentScale() > 1.001){
    vb.x = x - vb.w / 2;
    vb.y = y - vb.h / 2;
    clampViewBox();
    applyViewBox();
  }
}
function showSearchPin(x, y, label){
  const NS = 'http://www.w3.org/2000/svg';
  if(!searchPin){
    searchPin = document.createElementNS(NS, 'g');
    searchPin.setAttribute('class', 'search-pin');
    ['ring', 'dot'].forEach(k => {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('class', 'search-pin-' + k);
      c.setAttribute('r', k === 'ring' ? 9 : 4.5);
      searchPin.appendChild(c);
    });
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('class', 'search-pin-label');
    searchPin.appendChild(t);
    svg.appendChild(searchPin);
  }
  searchPin.querySelectorAll('circle').forEach(c => { c.setAttribute('cx', x); c.setAttribute('cy', y); });
  const t = searchPin.querySelector('text');
  t.setAttribute('x', x + 10);
  t.setAttribute('y', y - 9);
  t.textContent = label;
  searchPin.style.display = '';
  svg.appendChild(searchPin); // keep on top
  const ring = searchPin.querySelector('.search-pin-ring');
  ring.style.animation = 'none'; void ring.getBoundingClientRect(); ring.style.animation = '';
}
function clearSearchHighlight(){
  if(searchHit && (searchHit.type === 'district' || searchHit.type === 'hq')){
    const p = pathFor(searchHit.name);
    if(p) p.classList.remove('searched');
  }
  if(searchPin) searchPin.style.display = 'none';
  searchHit = null;
}
function applySearchHit(it){
  clearSearchHighlight();
  let cx, cy;
  if(it.type === 'district' || it.type === 'hq'){
    const p = pathFor(it.name);
    if(!p) return;
    p.classList.add('searched');
    const bb = p.getBBox();
    cx = bb.x + bb.width / 2; cy = bb.y + bb.height / 2;
  } else {
    const item = (it.type === 'city' ? CITIES : LANDMARKS).find(x => x.name === it.name);
    if(!item) return;
    cx = item.x; cy = item.y;
    showSearchPin(cx, cy, itemLabel(it));
  }
  searchHit = it;
  focusOn(cx, cy);
}

// dropdown
function hideSearchDrop(){ searchDrop.classList.remove('open'); }
function setActiveRow(i){
  searchActive = i;
  searchDrop.querySelectorAll('.sd-row').forEach((r, k) => r.classList.toggle('active', k === i));
  const el = searchDrop.querySelectorAll('.sd-row')[i];
  if(el && el.scrollIntoView) el.scrollIntoView({ block:'nearest' });
}
function selectSearchItem(it){
  applySearchHit(it);
  addToHistory(it);
  searchInput.value = itemLabel(it);
  searchMsg.textContent = tr('found').replace('{n}', itemLabel(it) + (it.type === 'hq' ? ' · ' + itemTag(it) : ''));
  searchMsg.className = 'search-msg';
  hideSearchDrop();
  searchInput.blur();
}
function makeSearchRow(it, i, showingHistory, animate){
  const row = document.createElement('div');
  row.className = 'sd-row' + (animate ? '' : ' still');
  row.style.setProperty('--i', i);
  const ico = document.createElement('span');
  ico.className = 'sd-ico';
  if(showingHistory){
    ico.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15.5 14"></polyline></svg>';
  } else {
    ico.innerHTML = '<span class="sd-dot" style="background:' + TYPE_COLOR[it.type] + '"></span>';
  }
  const name = document.createElement('span'); name.className = 'sd-name'; name.textContent = itemLabel(it);
  const tag = document.createElement('span'); tag.className = 'sd-tag'; tag.textContent = itemTag(it);
  row.appendChild(ico); row.appendChild(name); row.appendChild(tag);
  if(showingHistory){
    const x = document.createElement('button');
    x.type = 'button'; x.className = 'sd-x'; x.setAttribute('aria-label', tr('remove')); x.textContent = '×';
    x.addEventListener('mousedown', e => e.preventDefault());
    x.addEventListener('click', e => {
      e.stopPropagation();
      saveSearchHistory(loadSearchHistory().filter(h => !(h.type === it.type && h.name === it.name)));
      renderSearchDrop();
    });
    row.appendChild(x);
  }
  row.addEventListener('mousedown', e => e.preventDefault());   // keep the input focused (keyboard stays open)
  row.addEventListener('click', () => selectSearchItem(it));
  return row;
}

// resetExpand = true when the list is freshly opened (always starts with 5 rows)
function renderSearchDrop(resetExpand){
  if(resetExpand === true) historyExpanded = false;
  const q = searchInput.value.trim();
  const showingHistory = !q;
  const rows = showingHistory ? loadSearchHistory() : searchMatches(q);
  searchRows = rows;
  searchActive = -1;
  searchDrop.innerHTML = '';
  if(!rows.length){ hideSearchDrop(); return; }

  if(showingHistory){
    const head = document.createElement('div');
    head.className = 'sd-head';
    const title = document.createElement('span'); title.textContent = tr('recent');
    const clear = document.createElement('button'); clear.type = 'button'; clear.className = 'sd-clear'; clear.textContent = tr('clear_all');
    clear.addEventListener('mousedown', e => e.preventDefault());
    clear.addEventListener('click', e => { e.stopPropagation(); saveSearchHistory([]); renderSearchDrop(true); });
    head.appendChild(title); head.appendChild(clear);
    searchDrop.appendChild(head);
  }

  const visible = showingHistory ? rows.slice(0, HISTORY_VISIBLE) : rows;
  const extra = showingHistory ? rows.slice(HISTORY_VISIBLE) : [];
  visible.forEach((it, i) => searchDrop.appendChild(makeSearchRow(it, i, showingHistory, true)));

  if(extra.length){
    const moreWrap = document.createElement('div');
    moreWrap.className = 'sd-morewrap';
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'sd-more';
    btn.textContent = tr(historyExpanded ? 'see_less' : 'see_more');
    const box = document.createElement('div');
    box.className = 'sd-extra' + (historyExpanded ? ' open' : '');
    extra.forEach((it, i) => box.appendChild(makeSearchRow(it, i, true, false)));
    btn.addEventListener('mousedown', e => e.preventDefault());
    btn.addEventListener('click', e => {
      e.stopPropagation();
      historyExpanded = !historyExpanded;
      btn.textContent = tr(historyExpanded ? 'see_less' : 'see_more');
      box.classList.toggle('open', historyExpanded);
      box.style.maxHeight = historyExpanded ? (box.scrollHeight + 'px') : '0px';
    });
    moreWrap.appendChild(btn);
    searchDrop.appendChild(moreWrap);
    searchDrop.appendChild(box);
    if(historyExpanded) box.style.maxHeight = '600px';
  }
  // open on the next frame so the drop animation always plays
  requestAnimationFrame(() => searchDrop.classList.add('open'));
}

function runSearch(){
  const raw = searchInput.value.trim();
  clearSearchHighlight();
  if(!raw){
    searchMsg.textContent = '';
    searchMsg.className = 'search-msg';
    renderSearchDrop(true);
    return;
  }
  const matches = searchMatches(raw);
  if(!matches.length){
    searchDrop.classList.remove('open');
    searchMsg.textContent = tr('no_match_all').replace('{q}', raw);
    searchMsg.className = 'search-msg err';
    return;
  }
  applySearchHit(matches[0]);    // live preview of the best match; saved to history once you pick it
  searchMsg.textContent = '';
  searchMsg.className = 'search-msg';
  renderSearchDrop();
}
searchInput.addEventListener('input', runSearch);
searchInput.addEventListener('focus', () => { if(searchWrap.classList.contains('ready')) renderSearchDrop(true); });
searchInput.addEventListener('click', () => { if(searchWrap.classList.contains('ready') && !searchDrop.classList.contains('open')) renderSearchDrop(true); });
// remember what was searched even if it was never "submitted" (like leaving the box after finding it)
searchInput.addEventListener('blur', () => {
  if(searchHit && searchInput.value.trim().length >= 2) addToHistory(searchHit);
});
searchInput.addEventListener('keydown', (e) => {
  const n = searchRows.length;
  if(e.key === 'ArrowDown' && n){ e.preventDefault(); setActiveRow((searchActive + 1) % n); }
  else if(e.key === 'ArrowUp' && n){ e.preventDefault(); setActiveRow((searchActive - 1 + n) % n); }
  else if(e.key === 'Enter'){
    e.preventDefault();
    const pick = searchActive >= 0 ? searchRows[searchActive] : searchRows[0];
    if(pick) selectSearchItem(pick);
  }
  else if(e.key === 'Escape'){ hideSearchDrop(); }
});
document.addEventListener('pointerdown', (e) => {
  if(!searchWrap.contains(e.target) && e.target !== searchIconBtn && !searchIconBtn.contains(e.target)) hideSearchDrop();
});

function togglePanel(){
  const isOpen = provPanel.classList.toggle('open');
  provTab.classList.toggle('open', isOpen);
  if(isOpen){ closeModePanel(); closeRecallDropdown(); }
}
function closePanel(){
  provPanel.classList.remove('open');
  provTab.classList.remove('open');
}
provTab.addEventListener('click', togglePanel);

// Tapping anywhere outside an open tab list closes it (tapping its own tab still toggles it)
document.addEventListener('pointerdown', (e) => {
  [[provPanel, provTab, closePanel], [modePanel, modeTab, closeModePanel], [recallDropdown, recallTab, closeRecallDropdown]].forEach(([panel, tab, close]) => {
    if(panel.classList.contains('open') && !panel.contains(e.target) && !tab.contains(e.target)) close();
  });
});

function toggleModePanel(){
  const isOpen = modePanel.classList.toggle('open');
  modeTab.classList.toggle('open', isOpen);
  if(isOpen){ closePanel(); closeRecallDropdown(); }
}
function closeModePanel(){
  modePanel.classList.remove('open');
  modeTab.classList.remove('open');
}
modeTab.addEventListener('click', toggleModePanel);

shadowSwitch.addEventListener('click', () => {
  shadowOn = !shadowOn;
  shadowSwitch.classList.toggle('on', shadowOn);
  refreshShadowLabels();
});

infoSwitch.addEventListener('click', () => {
  infoOn = !infoOn;
  infoSwitch.classList.toggle('on', infoOn);
  if(!infoOn) factPanel.style.display = 'none';
});

labelsSwitch.addEventListener('click', () => {
  labelsOn = !labelsOn;
  labelsSwitch.classList.toggle('on', labelsOn);
  refreshShadowLabels();
});

searchIconBtn.addEventListener('click', () => {
  const isOpen = searchWrap.classList.toggle('open');
  searchIconBtn.classList.toggle('active', isOpen);
  if(isOpen){
    searchInput.focus();
    setTimeout(() => {                       // once the bar has finished sliding open, let the dropdown overflow it
      if(searchWrap.classList.contains('open')){ searchWrap.classList.add('ready'); renderSearchDrop(true); }
    }, 300);
  } else {
    searchWrap.classList.remove('ready');
    hideSearchDrop();
    searchInput.value = '';
    runSearch();
    hideSearchDrop();
  }
});

muteBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  muteBtn.textContent = tr(soundOn ? 'sound_on' : 'sound_off');
  muteBtn.classList.toggle('active', soundOn);
  if(soundOn) ensureAudio();
});

// ---- Persistence ----
const ALL_MODES = ['district','city','landmark','headquarters'];
function allScopeKeys(){
  const keys = [];
  ALL_MODES.forEach(m => { for(let p=0;p<=7;p++) keys.push(m+':'+p); });
  return keys;
}
async function loadBests(){
  for(const key of allScopeKeys()){
    try{
      const res = await storage.get('nepal-quiz-best-' + key);
      if(res && res.value) bests[key] = parseInt(res.value,10) || 0;
    }catch(e){ /* no saved value yet */ }
  }
  updateScores();
}
async function saveBest(key, val){
  try{
    await storage.set('nepal-quiz-best-' + key, String(val));
  }catch(e){ /* ignore */ }
}

// ---- Local storage shim (matches the get/set shape the app expects) ----
const storage = {
  async get(key){
    const v = localStorage.getItem(key);
    return v === null ? null : { key, value: v };
  },
  async set(key, value){
    localStorage.setItem(key, value);
    return { key, value };
  }
};

// ---- Data loading ----
async function loadData(){
  const [districtsData, provinceData, citiesData, landmarksData, factsData, namesData, factsNeData] = await Promise.all([
    fetch('districts.json').then(r => r.json()),
    fetch('provinces.json').then(r => r.json()),
    fetch('cities.json').then(r => r.json()),
    fetch('landmarks.json').then(r => r.json()),
    fetch('facts.json').then(r => r.json()),
    fetch('names_ne.json').then(r => r.json()).catch(() => NAMES_NE),
    fetch('facts_ne.json').then(r => r.json()).catch(() => ({})),
  ]);
  DATA = districtsData;
  PROVINCE_OF = provinceData;
  CITIES = citiesData;
  LANDMARKS = landmarksData;
  DISTRICT_FACTS = factsData;
  NAMES_NE = namesData;
  FACTS_NE = factsNeData;
}

function showFactPanel(name){
  if(!infoOn || (mode !== 'district' && mode !== 'headquarters') || !DISTRICT_FACTS[name]){
    factPanel.style.display = 'none';
    return;
  }
  const [hq, pop, area, fact] = DISTRICT_FACTS[name];
  factDistrict.textContent = dn(name, 'districts');
  lastFactName = name;
  factHq.textContent = tr('hq').replace('{n}', (isNe() && NAMES_NE.hq[name]) ? NAMES_NE.hq[name] : hq);
  factPop.textContent = tr('people').replace('{n}', I18N.numFmt(pop));
  factArea.textContent = tr('area').replace('{n}', I18N.numFmt(area));
  factText.textContent = (isNe() && FACTS_NE[name]) ? FACTS_NE[name] : fact;
  factPanel.style.display = '';
}

// ---- Map pinch-zoom / pan via native SVG viewBox (stays vector-crisp at any zoom — no raster upscaling) ----
let baseVB = { x:0, y:0, w:1000, h:572 }; // set from DATA.viewBox once loaded
let vb = { x:0, y:0, w:1000, h:572 };     // current visible viewBox window
const MIN_SCALE = 1, MAX_SCALE = 6;

function initViewBox(){
  const parts = DATA.viewBox.split(' ').map(Number);
  baseVB = { x:parts[0], y:parts[1], w:parts[2], h:parts[3] };
  vb = { ...baseVB };
  applyViewBox();
}
function applyViewBox(){
  svg.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
  mapViewport.classList.toggle('zoomed', currentScale() > 1.001);
}
function currentScale(){
  return baseVB.w / vb.w;
}

function clampViewBox(){
  vb.w = Math.min(baseVB.w, Math.max(baseVB.w / MAX_SCALE, vb.w));
  vb.h = Math.min(baseVB.h, Math.max(baseVB.h / MAX_SCALE, vb.h));
  vb.x = Math.min(baseVB.x + (baseVB.w - vb.w), Math.max(baseVB.x, vb.x));
  vb.y = Math.min(baseVB.y + (baseVB.h - vb.h), Math.max(baseVB.y, vb.y));
}

function resetMapZoom(){
  vb = { ...baseVB };
  applyViewBox();
}
zoomResetBtn.addEventListener('click', resetMapZoom);

// Convert a screen point (relative to the viewport element) into map content coordinates
function screenToContent(relX, relY){
  const rect = mapViewport.getBoundingClientRect();
  return {
    x: vb.x + (relX / rect.width) * vb.w,
    y: vb.y + (relY / rect.height) * vb.h
  };
}

const activePointers = new Map();
let pinchStartDist = 0;
let pinchStartScale = 1;
let panStart = null; // { screenX, screenY, vbX, vbY }
let didDrag = false;  // true once a press has turned into a real drag (so we don't also "click" a district)
const DRAG_PX = 5;

function dist(p1, p2){
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}
function midpoint(p1, p2){
  return { x: (p1.x + p2.x)/2, y: (p1.y + p2.y)/2 };
}

mapViewport.addEventListener('pointerdown', (e) => {
  if(e.pointerType === 'mouse' && e.button !== 0) return;   // left button only
  didDrag = false;
  // Touch / pen: capture straight away (as before).
  // Mouse: do NOT capture yet. Capturing on press redirects the click to the viewport,
  // which is why districts could not be selected with a mouse. We capture only once a drag starts.
  const captured = e.pointerType !== 'mouse';
  if(captured){
    try{ mapViewport.setPointerCapture(e.pointerId); }catch(err){ /* ignore capture failures */ }
  }
  activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, captured: captured });
  if(activePointers.size === 2){
    const pts = [...activePointers.values()];
    pinchStartDist = dist(pts[0], pts[1]);
    pinchStartScale = currentScale();
  } else if(activePointers.size === 1){
    panStart = { screenX: e.clientX, screenY: e.clientY, vbX: vb.x, vbY: vb.y };
  }
});

mapViewport.addEventListener('pointermove', (e) => {
  const p = activePointers.get(e.pointerId);
  if(!p) return;
  p.x = e.clientX; p.y = e.clientY;

  if(activePointers.size === 2){
    const pts = [...activePointers.values()];
    const newDist = dist(pts[0], pts[1]);
    if(pinchStartDist > 0){
      let newScale = pinchStartScale * (newDist / pinchStartDist);
      newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));

      const rect = mapViewport.getBoundingClientRect();
      const mid = midpoint(pts[0], pts[1]);
      const midRelX = mid.x - rect.left;
      const midRelY = mid.y - rect.top;

      // Keep the map point under the fingers fixed while the viewBox window resizes
      const content = screenToContent(midRelX, midRelY);
      vb.w = baseVB.w / newScale;
      vb.h = baseVB.h / newScale;
      vb.x = content.x - (midRelX / rect.width) * vb.w;
      vb.y = content.y - (midRelY / rect.height) * vb.h;

      clampViewBox();
      applyViewBox();
      didDrag = true;
    }
  } else if(activePointers.size === 1 && panStart && currentScale() > 1){
    const moved = Math.hypot(e.clientX - p.sx, e.clientY - p.sy);
    if(moved >= DRAG_PX) didDrag = true;
    if(!p.captured){
      if(moved < DRAG_PX) return;                    // still just a click, not a drag
      try{ mapViewport.setPointerCapture(e.pointerId); }catch(err){ /* ignore */ }
      p.captured = true;
      panStart = { screenX: e.clientX, screenY: e.clientY, vbX: vb.x, vbY: vb.y };  // no jump
    }
    mapViewport.classList.add('dragging');
    const rect = mapViewport.getBoundingClientRect();
    const dxScreen = e.clientX - panStart.screenX;
    const dyScreen = e.clientY - panStart.screenY;
    vb.x = panStart.vbX - (dxScreen / rect.width) * vb.w;
    vb.y = panStart.vbY - (dyScreen / rect.height) * vb.h;
    clampViewBox();
    applyViewBox();
  }
});

function endPointer(e){
  activePointers.delete(e.pointerId);
  if(activePointers.size < 2) pinchStartDist = 0;
  if(activePointers.size === 1){
    // A pinch just ended with one finger lifted first (the normal way people release a pinch).
    // Re-anchor the pan reference to the CURRENT zoomed viewBox and the surviving finger's
    // current position, otherwise it snaps back to where that finger was before the zoom.
    const remaining = [...activePointers.values()][0];
    panStart = { screenX: remaining.x, screenY: remaining.y, vbX: vb.x, vbY: vb.y };
  } else if(activePointers.size === 0){
    panStart = null;
    mapViewport.classList.remove('dragging');
  }
}
mapViewport.addEventListener('pointerup', endPointer);
mapViewport.addEventListener('pointercancel', endPointer);
mapViewport.addEventListener('pointerleave', endPointer);

// After a real drag, swallow the click that follows so panning never selects a district
mapViewport.addEventListener('click', (e) => {
  if(didDrag){ e.stopPropagation(); e.preventDefault(); didDrag = false; }
}, true);

// Zoom helper shared by wheel, trackpad pinch and keyboard (cx, cy are relative to the viewport)
function zoomAt(factor, cx, cy){
  const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, currentScale() * factor));
  const rect = mapViewport.getBoundingClientRect();
  const content = screenToContent(cx, cy);
  vb.w = baseVB.w / newScale;
  vb.h = baseVB.h / newScale;
  vb.x = content.x - (cx / rect.width) * vb.w;
  vb.y = content.y - (cy / rect.height) * vb.h;
  clampViewBox();
  applyViewBox();
}
function zoomBy(factor){
  const rect = mapViewport.getBoundingClientRect();
  zoomAt(factor, rect.width / 2, rect.height / 2);
}

// Scroll wheel / trackpad zoom, centered on the cursor (smooth for trackpads, steady for mouse wheels)
mapViewport.addEventListener('wheel', (e) => {
  e.preventDefault();
  let dy = e.deltaY;
  if(e.deltaMode === 1) dy *= 33; else if(e.deltaMode === 2) dy *= 300;
  let factor = Math.exp(-dy * (e.ctrlKey ? 0.01 : 0.0016));   // ctrl = trackpad pinch gesture
  factor = Math.min(1.3, Math.max(0.77, factor));
  const rect = mapViewport.getBoundingClientRect();
  zoomAt(factor, e.clientX - rect.left, e.clientY - rect.top);
}, { passive:false });

// Keyboard: + / - zoom, 0 resets, arrow keys pan when zoomed in
document.addEventListener('keydown', (e) => {
  if(e.ctrlKey || e.metaKey || e.altKey) return;
  const tag = (e.target && e.target.tagName) || '';
  if(tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if(e.key === '+' || e.key === '='){ zoomBy(1.25); e.preventDefault(); }
  else if(e.key === '-' || e.key === '_'){ zoomBy(0.8); e.preventDefault(); }
  else if(e.key === '0'){ resetMapZoom(); }
  else if(e.key === 'r' || e.key === 'R'){ toggleFlash(); }
  else if(currentScale() > 1 && e.key.startsWith('Arrow')){
    const step = 0.12;
    if(e.key === 'ArrowLeft')  vb.x -= vb.w * step;
    if(e.key === 'ArrowRight') vb.x += vb.w * step;
    if(e.key === 'ArrowUp')    vb.y -= vb.h * step;
    if(e.key === 'ArrowDown')  vb.y += vb.h * step;
    clampViewBox(); applyViewBox(); e.preventDefault();
  }
});

// ---- Language switching ----
function refreshLanguage(){
  I18N.apply();
  svg.querySelectorAll('text.district-label').forEach(l => { l.textContent = dn(l.getAttribute('data-name'), 'districts'); });
  muteBtn.textContent = tr(soundOn ? 'sound_on' : 'sound_off');
  provGrid.innerHTML = ''; modeGrid.innerHTML = ''; recallGrid.innerHTML = '';
  buildProvinceUI(); buildModeUI(); buildRecallModeUI();
  modeTabLabel.textContent = MODE_LABEL[tapCategory];
  recallTabLabel.textContent = recallUsed ? MODE_LABEL[recallCategory] : tr('recall_mode');
  provTabLabel.textContent = PROV_LABEL[scope];
  updateScores();
  renderPrompt();
  refreshFlashLabels();
  if(searchHit) applySearchHit(searchHit);
  if(searchDrop.classList.contains('open')) renderSearchDrop();
  if(factPanel.style.display !== 'none' && lastFactName) showFactPanel(lastFactName);
}
document.addEventListener('langchange', refreshLanguage);

// ---- Init ----
(async function init(){
  try{
    await loadData();
    buildMap();
    initViewBox();
    buildModeUI();
    buildRecallModeUI();
    buildProvinceUI();
    applyDimming();
    await loadBests();
    pickNext();
  }catch(err){
    console.error('Quiz start-up problem:', err);
  }
  try{ refreshLanguage(); }catch(err){ console.error('Language refresh problem:', err); }
})();
