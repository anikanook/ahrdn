/* ahrdn.com. Vanilla JS, no dependencies. */

/* Status banner (homepage): dismissal persists for the session. */
function dismissBanner() {
  var banner = document.getElementById('status-banner');
  if (banner) banner.classList.add('dismissed');
  try { sessionStorage.setItem('banner-dismissed', 'true'); } catch (e) {}
}

/* Mobile nav */
function toggleNav(btn) {
  var open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  document.getElementById('nav-links').classList.toggle('open');
}

/* Masthead: stays put. Past the hero, the name folds down to AHRDN. */
(function () {
  var nav = document.getElementById('masthead-wrap');
  if (!nav) return;
  var ticking = false;
  function update() {
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 60);
    nav.classList.toggle('compact', y > 120);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  });
  update();
})();

/* Scroll reveal */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(function (el) { observer.observe(el); });
})();

/* Back to top */
(function () {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      btn.classList.toggle('visible', window.scrollY > 400);
      ticking = false;
    });
  });
})();

/* Case-study scrollytelling (Green America, Get a Better Bank).
   The last step whose heading (or the step itself, if it has none) has passed the reading line sets the stage's
   data-step; CSS handles all the motion. */
(function () {
  var wrap = document.querySelector('[data-scrolly]');
  if (!wrap) return;
  var stage = wrap.querySelector('.scrolly__stage');
  var steps = wrap.querySelectorAll('.scrolly__step');
  var count = wrap.querySelector('.scrolly__count');
  var title = wrap.querySelector('.scrolly__title');
  var mast = document.getElementById('masthead-wrap');
  var intro = title ? title.textContent : '';
  var current = -1, ticking = false;

  function setMast() {
    if (mast) wrap.style.setProperty('--mast-h', mast.offsetHeight + 'px');
  }
  function update() {
    ticking = false;
    var r = stage.getBoundingClientRect();
    var stacked = r.width > wrap.clientWidth * 0.8; /* phone/tablet: stage sits above the text */
    var line = stacked ? r.bottom + (window.innerHeight - r.bottom) * 0.3 : window.innerHeight * 0.42;
    var active = 0;
    for (var i = 0; i < steps.length; i++) {
      if ((steps[i].querySelector('h3') || steps[i]).getBoundingClientRect().top < line) active = i + 1;
    }
    if (active === current) return;
    current = active;
    stage.setAttribute('data-step', active);
    steps.forEach(function (s, i) { s.classList.toggle('is-active', i + 1 === active); });
    if (count) count.textContent = active ? active + ' / ' + steps.length : '';
    if (title) {
      var step = steps[active - 1];
      title.textContent = !active ? intro : (step.getAttribute('data-caption') || step.querySelector('h3').textContent);
    }
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }
  setMast();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { setMast(); onScroll(); });
  update();
})();

/* Homepage lead art: each diagram plays once when its card is mostly on screen. */
(function () {
  var arts = document.querySelectorAll('.story__art');
  if (!arts.length) return;
  if (!('IntersectionObserver' in window)) {
    arts.forEach(function (a) { a.classList.add('is-played'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-played');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  arts.forEach(function (a) { observer.observe(a); });
})();

