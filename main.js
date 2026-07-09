/* ============================================================
   PARABLE hub — progressive enhancement only.
   Nothing here is required to read the page or follow a link.
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- hero intro (curtain + staggered reveals) ---- */
  var hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add('loaded'); });
    });
  }

  /* ---- scroll reveals ---- */
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  var deferred = reveals.filter(function (el) { return !hero || !hero.contains(el); });
  if (reduce || !('IntersectionObserver' in window)) {
    deferred.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    deferred.forEach(function (el) { io.observe(el); });
  }

  /* ---- animated counters ---- */
  function animateCount(el) {
    var to = parseFloat(el.getAttribute('data-to')) || 0;
    if (reduce) { el.textContent = String(to); return; }
    var start = null, dur = 1300;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = String(to);
    }
    requestAnimationFrame(step);
  }
  var counters = [].slice.call(document.querySelectorAll('.c-num'));
  if (counters.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      counters.forEach(animateCount);
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* ---- stack filter ---- */
  var filters = [].slice.call(document.querySelectorAll('.filter'));
  var cards = [].slice.call(document.querySelectorAll('.card'));
  var status = document.getElementById('filterStatus');
  var labels = { all: 'all', vanilla: 'Vanilla', astro: 'Astro', next: 'Next.js', svelte: 'SvelteKit', vite: 'Vite' };

  function applyFilter(key) {
    var shown = 0;
    cards.forEach(function (card) {
      var match = key === 'all' || card.getAttribute('data-stack') === key;
      if (match) { card.hidden = false; shown++; } else { card.hidden = true; }
    });
    filters.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === key));
    });
    if (status) {
      status.textContent = key === 'all'
        ? 'Showing all ' + shown + ' sites.'
        : 'Showing ' + shown + ' ' + labels[key] + ' site' + (shown === 1 ? '' : 's') + '.';
    }
  }
  filters.forEach(function (b) {
    b.addEventListener('click', function () { applyFilter(b.getAttribute('data-filter')); });
  });
})();
