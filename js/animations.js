// js/animations.js

const btn     = document.getElementById('theme-toggle');
const overlay = document.getElementById('dark-overlay');

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function swipe(toDark) {
  // 1) Ensure overlay is visible and reset transform
  overlay.style.display   = 'block';
  overlay.style.transition = 'none';
  overlay.style.pointerEvents = 'all';

  // 2) Position overlay off-screen on the side we'll come from
  //    Light→Dark: slide in from left  (-100%) → 0
  //    Dark→Light: slide in from right (100%)  → 0
  overlay.style.transform = toDark ? 'translateX(-100%)' : 'translateX(100%)';

  // Force reflow
  void overlay.offsetWidth;

  // 3) Slide overlay to center
  overlay.style.transition = 'transform 0.5s ease';
  overlay.style.transform  = 'translateX(0)';
  await wait(500);

  // 4) Toggle theme under the overlay
  document.body.classList.toggle('dark-mode', toDark);
  localStorage.setItem('theme', toDark ? 'dark' : 'light');
  btn.textContent = toDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';

  // 5) Slide overlay off to opposite side
  //    Light→Dark: out left again (-100%)
  //    Dark→Light: out right (100%)
  overlay.style.transform = toDark ? 'translateX(-100%)' : 'translateX(100%)';
  await wait(500);

  // 6) Hide overlay until next toggle
  overlay.style.display = 'none';
  overlay.style.pointerEvents = 'none';
}

btn.addEventListener('click', () => {
  swipe(!document.body.classList.contains('dark-mode'));
});

// Initialize on load (no animation)
window.addEventListener('DOMContentLoaded', () => {
  const isDark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  btn.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';

  // Ensure overlay hidden
  overlay.style.display = 'none';
  overlay.style.pointerEvents = 'none';
  overlay.style.transform = 'translateX(-100%)';
});
