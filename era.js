(function(){
  var overlay = document.createElement('div'); overlay.className = 'pop-blur';
  var pop = document.createElement('div'); pop.className = 'pop-card'; pop.setAttribute('role','dialog');
  document.body.appendChild(overlay); document.body.appendChild(pop);
  var current = null;

  function close(){
    if(!current) return;
    current.classList.remove('active');
    overlay.classList.remove('show'); pop.classList.remove('show');
    current = null;
  }
  function place(a){
    var r = a.getBoundingClientRect();
    var vw = document.documentElement.clientWidth;
    var w = Math.min(340, vw - 24);
    var sx = window.pageXOffset, sy = window.pageYOffset;
    pop.style.width = w + 'px';
    var left = r.left + sx + r.width / 2 - w / 2;
    left = Math.max(12 + sx, Math.min(left, sx + vw - w - 12));
    pop.style.left = left + 'px';
    pop.style.top = (r.bottom + sy + 10) + 'px';
    var arrow = r.left + sx + r.width / 2 - left;
    pop.style.setProperty('--arrow', Math.max(20, Math.min(w - 20, arrow)) + 'px');
  }
  function open(a){
    var src = document.getElementById(a.getAttribute('href').slice(1));
    if(!src) return;
    pop.innerHTML = '<div class="pop-title"></div><p></p>';
    pop.firstChild.textContent = src.querySelector('summary').textContent;
    pop.querySelector('p').textContent = src.querySelector('p').textContent;
    if(current) current.classList.remove('active');
    current = a; a.classList.add('active');
    place(a);
    overlay.classList.add('show'); pop.classList.add('show');
    var pr = pop.getBoundingClientRect();
    if(pr.bottom > window.innerHeight - 12){
      window.scrollBy({ top: pr.bottom - window.innerHeight + 16, behavior: 'smooth' });
    }
  }

  document.querySelectorAll('a.term').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      if(current === a) close(); else open(a);
    });
  });
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });
  window.addEventListener('resize', function(){ if(current) place(current); });
  window.addEventListener('scroll', function(){ if(current) place(current); }, { passive:true });
})();

// ---- Desktop layout helper: group the summary (glance + timeline) and the reading column ----
(function(){
  var deep = document.querySelector('.wrap.deep');
  if(!deep) return;
  var glance = deep.querySelector('.glance');
  var table = deep.querySelector('table.tl');
  if(!glance || !table) return;
  var cols = document.createElement('div'); cols.className = 'era-cols';
  var side = document.createElement('div'); side.className = 'era-side';
  var main = document.createElement('div'); main.className = 'era-main';
  deep.insertBefore(cols, glance);
  cols.appendChild(side); cols.appendChild(main);
  // everything from .glance up to and including the first timeline table goes to the side
  var node = glance, endNode = table;
  while(node){
    var next = node.nextElementSibling;
    side.appendChild(node);
    if(node === endNode) break;
    node = next;
  }
  // everything after that goes to the main column
  var rest = cols.nextElementSibling;
  while(rest){
    var nxt = rest.nextElementSibling;
    main.appendChild(rest);
    rest = nxt;
  }
})();
