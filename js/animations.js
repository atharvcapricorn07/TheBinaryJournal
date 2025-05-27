// js/animations.js

const toggleBtn = document.getElementById('theme-toggle');
const overlay   = document.getElementById('dark-overlay');

function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function swipe(toDark) {
  // 1) Reset any old classes & enable pointer events
  overlay.classList.remove('show', 'hide-left', 'hide-right');
  overlay.style.pointerEvents = 'all';
  
  // 2) Phase 1: slide in overlay from left ➞ center
  //    - Force reflow so transform change is noticed
  void overlay.offsetWidth;
  overlay.classList.add('show');            // transforms: -100% → 0
  await wait(500);                          // wait for 0.5s

  // 3) Toggle the theme under the cover
  document.body.classList.toggle('dark-mode', toDark);
  localStorage.setItem('theme', toDark ? 'dark' : 'light');
  toggleBtn.textContent = toDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';

  // 4) Phase 2: slide overlay back out
  overlay.classList.remove('show');
  overlay.classList.add(toDark ? 'hide-left' : 'hide-right');
                                            // transforms: 0 → -100% (dark) or 0 → +100% (light)
  await wait(500);                          // wait for 0.5s

  // 5) Cleanup
  overlay.classList.remove('hide-left', 'hide-right');
  overlay.style.pointerEvents = 'none';
}

// Wire up the button
toggleBtn.addEventListener('click', () => {
  swipe(!document.body.classList.contains('dark-mode'));
});

// On load: restore saved theme, but don’t animate
window.addEventListener('DOMContentLoaded', () => {
  const isDark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  toggleBtn.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
});

