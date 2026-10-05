(function(){
  var LINKS = [
    { href:'index.html',        key:'nav_home' },
    { href:'quiz.html',         key:'nav_quiz' },
    { href:'constitution.html', key:'nav_const', also:['constitution-full.html'] },
    { href:'history.html',      key:'nav_history' }
  ];
  var SOON = ['nav_current','nav_model','nav_study','nav_theme'];
  var page = location.pathname.split('/').pop() || 'index.html';

  var html = '<button class="hamburger-btn" id="hamburgerBtn" aria-label="Open menu"><span></span><span></span><span></span></button>'
    + '<div class="drawer-backdrop" id="drawerBackdrop"></div>'
    + '<nav class="drawer" id="drawer"><div class="drawer-header"><div class="drawer-title" data-i18n="drawer_title">Loksewa Hub</div>'
    + '<button class="drawer-close" id="drawerClose" aria-label="Close menu">\u2715</button></div><div class="drawer-links">'
    + '<div class="lang-row"><span class="lang-label">\u092D\u093E\u0937\u093E \u00B7 Language</span>'
    + '<div class="lang-toggle" id="langToggle">'
    + '<button type="button" data-lang="en" aria-label="English">E</button>'
    + '<button type="button" data-lang="ne" aria-label="\u0928\u0947\u092A\u093E\u0932\u0940">N</button></div></div>';
  LINKS.forEach(function(l){
    var on = page === l.href || (l.also && l.also.indexOf(page) !== -1);
    html += '<a href="'+l.href+'" class="drawer-link'+(on?' active':'')+'" data-i18n="'+l.key+'"></a>';
  });
  SOON.forEach(function(k){
    html += '<div class="drawer-link soon"><span data-i18n="'+k+'"></span><span class="drawer-soon-tag" data-i18n="soon"></span></div>';
  });
  html += '</div></nav>';

  var holder = document.createElement('div');
  holder.innerHTML = html;
  while(holder.firstChild) document.body.appendChild(holder.firstChild);
  document.body.classList.add('has-nav');

  var drawer = document.getElementById('drawer');
  var backdrop = document.getElementById('drawerBackdrop');
  function open(){ drawer.classList.add('open'); backdrop.classList.add('open'); }
  function close(){ drawer.classList.remove('open'); backdrop.classList.remove('open'); }
  document.getElementById('hamburgerBtn').addEventListener('click', open);
  document.getElementById('drawerClose').addEventListener('click', close);
  backdrop.addEventListener('click', close);

  var toggleBtns = document.querySelectorAll('#langToggle button');
  function syncToggle(){
    toggleBtns.forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-lang') === I18N.lang); });
  }
  toggleBtns.forEach(function(b){
    b.addEventListener('click', function(){ I18N.set(b.getAttribute('data-lang')); });
  });
  document.addEventListener('langchange', syncToggle);
  syncToggle();
  I18N.apply();
})();
