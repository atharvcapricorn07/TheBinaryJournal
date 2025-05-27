// js/animations.js

const btn = document.getElementById('theme-toggle');
const overlay = document.getElementById('dark-overlay');

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function swipe(toDark) {
  // 1) Prepare the overlay: show it & reset transition
  overlay.style.display = 'block';
  overlay.style.transition = 'none';

  // 2) Position off-screen start-side:
  overlay.style.transform = toDark
    ? 'translateX(100%)'  // start off-screen right
    : 'translateX(-100%)';// start off-screen left

  // Force the browser to apply that position:
  void overlay.offsetWidth;

  // 3) Phase 1: Slide overlay into center (0)
  overlay.style.transition = 'transform 0.5s ease';
  overlay.style.transform  = 'translateX(0)';
  await wait(500);

  // 4) Toggle the theme behind the cover
  document.body.classList.toggle('dark-mode', toDark);
  localStorage.setItem('theme', toDark ? 'dark' : 'light');
  btn.textContent = toDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';

  // 5) Phase 2: Slide overlay off the opposite side:
  overlay.style.transform = toDark
    ? 'translateX(-100%)' // back out to left
    : 'translateX(100%)'; // back out to right
  await wait(500);

  // 6) Cleanup: hide overlay entirely
  overlay.style.display = 'none';
}

// Wire it up
btn.addEventListener('click', () => {
  swipe(!document.body.classList.contains('dark-mode'));
});

// On load: initialize theme (no animation)
window.addEventListener('DOMContentLoaded', () => {
  const dark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark-mode', dark);
  btn.textContent = dark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
});
