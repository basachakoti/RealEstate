// ---------- Mobile nav toggle ----------
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// ---------- Hero carousel: autoplay + dot navigation ----------
const slides = [...document.querySelectorAll('.slide')];
const dotsWrap = document.getElementById('dots');
let current = 0, timer;

slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', `Go to slide ${i + 1}`);
  b.addEventListener('click', () => { show(i); restart(); });
  dotsWrap.appendChild(b);
});
const dots = [...dotsWrap.children];

function show(i) {
  current = (i + slides.length) % slides.length;
  slides.forEach((s, n) => s.classList.toggle('active', n === current));
  dots.forEach((d, n) => d.classList.toggle('on', n === current));
}
function restart() { clearInterval(timer); timer = setInterval(() => show(current + 1), 5500); }
show(0); restart();

// ---------- Animated stat counters (run once when visible) ----------
const counters = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, suffix = el.dataset.suffix || '';
    let n = 0;
    const step = setInterval(() => {
      n++;
      el.textContent = n + suffix;
      if (n >= end) clearInterval(step);
    }, 900 / end);
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => countObserver.observe(c));

// ---------- Scroll reveal for cards ----------
const revealEls = document.querySelectorAll('.card, .project, details');
revealEls.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ---------- FAQ: keep only one item open at a time ----------
document.querySelectorAll('.faq details').forEach(d => {
  d.addEventListener('toggle', () => {
    if (d.open) document.querySelectorAll('.faq details').forEach(o => { if (o !== d) o.open = false; });
  });
});
