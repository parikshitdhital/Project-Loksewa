/* Loksewa Hub — tiny shared i18n engine (English <-> Nepali).
   Pages mark text with data-i18n="key" (also data-i18n-placeholder),
   scripts call I18N.t('key'), and I18N.add({en:{...}, ne:{...}}) adds strings. */
(function(){
  var KEY = 'loksewa-lang';
  var DICT = { en:{}, ne:{} };
  var lang = 'en';
  try { if(localStorage.getItem(KEY) === 'ne') lang = 'ne'; } catch(e){}

  function add(d){
    ['en','ne'].forEach(function(l){
      if(d[l]) for(var k in d[l]) DICT[l][k] = d[l][k];
    });
  }
  function t(key){
    if(DICT[lang][key] !== undefined) return DICT[lang][key];
    if(DICT.en[key] !== undefined) return DICT.en[key];
    return key;
  }
  function num(n){
    var s = String(n);
    return lang === 'ne' ? s.replace(/\d/g, function(d){ return '०१२३४५६७८९'.charAt(d); }) : s;
  }
  function numFmt(n){
    if(lang !== 'ne') return Number(n).toLocaleString('en-US');
    var s = String(Math.round(n));
    if(s.length > 3){
      var last = s.slice(-3), rest = s.slice(0, -3);
      s = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last;   // lakh/crore grouping
    }
    return num(s);
  }
  function apply(root){
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function(el){
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });
    document.documentElement.lang = (lang === 'ne') ? 'ne' : 'en';
    if(document.body) document.body.classList.toggle('lang-ne', lang === 'ne');
  }
  function set(l){
    lang = (l === 'ne') ? 'ne' : 'en';
    try { localStorage.setItem(KEY, lang); } catch(e){}
    apply();
    document.dispatchEvent(new CustomEvent('langchange', { detail:{ lang:lang } }));
  }

  add({
    en:{
      lang_label:'Language', drawer_title:'Loksewa Hub', soon:'Soon',
      nav_home:'🏠 Home', nav_quiz:'🗺️ Nepal Geography Quiz', nav_const:'⚖️ Constitution & Governance',
      nav_history:'📜 Nepal\'s History', nav_current:'📰 Current Affairs', nav_model:'📝 Model Questions',
      nav_study:'📚 Study Material', nav_theme:'🎨 Theme',
      back_hub:'← Back to Loksewa Hub', back_const:'← Back to Constitution Overview',
      home_title:'Loksewa Hub',
      home_sub:'A growing set of free practice tools to help you prepare — one exam topic at a time.',
      home_quiz_name:'Nepal Geography Quiz',
      home_quiz_desc:'Districts, cities and landmarks — test yourself on the map of Nepal.',
      home_play:'Play now', home_explore:'Explore',
      home_const_name:'Constitution & Governance',
      home_const_desc:'Fundamental rights, federal structure and constitutional bodies.',
      home_hist_name:'Nepal\'s History',
      home_hist_desc:'Key events, dynasties and milestones through the ages.',
      home_cur_name:'Current Affairs',
      home_cur_desc:'Stay sharp on recent national and international events.',
      home_model_name:'Model Questions',
      home_model_desc:'Practice sets modeled on past Loksewa exam papers.',
      home_soon:'Coming soon…',
      home_foot:'More tools are added over time — check back for updates.'
    },
    ne:{
      lang_label:'भाषा', drawer_title:'लोकसेवा हब', soon:'छिट्टै',
      nav_home:'🏠 गृहपृष्ठ', nav_quiz:'🗺️ नेपाल भूगोल क्विज', nav_const:'⚖️ संविधान र शासन',
      nav_history:'📜 नेपालको इतिहास', nav_current:'📰 समसामयिक घटना', nav_model:'📝 नमुना प्रश्नहरू',
      nav_study:'📚 अध्ययन सामग्री', nav_theme:'🎨 थिम',
      back_hub:'← लोकसेवा हबमा फर्कनुहोस्', back_const:'← संविधानको परिचयमा फर्कनुहोस्',
      home_title:'लोकसेवा हब',
      home_sub:'तयारीमा सघाउने निःशुल्क अभ्यास सामग्रीको बढ्दो संग्रह — एक–एक परीक्षा विषय गर्दै।',
      home_quiz_name:'नेपाल भूगोल क्विज',
      home_quiz_desc:'जिल्ला, सहर र प्रसिद्ध स्थल — नेपालको नक्सामा आफ्नो ज्ञान जाँच्नुहोस्।',
      home_play:'खेल्नुहोस्', home_explore:'हेर्नुहोस्',
      home_const_name:'संविधान र शासन',
      home_const_desc:'मौलिक हक, सङ्घीय संरचना र संवैधानिक निकायहरू।',
      home_hist_name:'नेपालको इतिहास',
      home_hist_desc:'युगौँका प्रमुख घटना, राजवंश र कोसेढुङ्गाहरू।',
      home_cur_name:'समसामयिक घटना',
      home_cur_desc:'हालका राष्ट्रिय तथा अन्तर्राष्ट्रिय घटनाबारे अद्यावधिक रहनुहोस्।',
      home_model_name:'नमुना प्रश्नहरू',
      home_model_desc:'विगतका लोकसेवा परीक्षाका प्रश्नपत्रमा आधारित अभ्यास सेटहरू।',
      home_soon:'छिट्टै आउँदैछ…',
      home_foot:'समयसँगै थप सामग्री थपिँदै जानेछन् — अद्यावधिकका लागि फेरि हेर्नुहोस्।'
    }
  });

  window.I18N = {
    add:add, t:t, num:num, numFmt:numFmt, apply:apply, set:set,
    get lang(){ return lang; }
  };
  apply();
})();
