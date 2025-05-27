// js/animations.js

const toggleBtn = document.getElementById('theme-toggle');
const overlay = document.getElementById('dark-overlay');

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function swipe(toDark) {
  // Clear any previous classes
  overlay.classList.remove('show', 'hide-left', 'hide-right');
  overlay.style.pointerEvents = 'all';

  // Phase 1: slide overlay in from left
  void overlay.offsetWidth;            // force reflow
  overlay.classList.add('show');
  await wait(500);

  // Toggle the theme
  document.body.classList.toggle('dark-mode', toDark);
  localStorage.setItem('theme', toDark ? 'dark' : 'light');
  toggleBtn.textContent = toDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';

  // Phase 2: slide overlay out
  overlay.classList.remove('show');
  overlay.classList.add(toDark ? 'hide-left' : 'hide-right');
  await wait(500);

  // Cleanup
  overlay.classList.remove('hide-left', 'hide-right');
  overlay.style.pointerEvents = 'none';
}

toggleBtn.addEventListener('click', () => {
  swipe(!document.body.classList.contains('dark-mode'));
});

window.addEventListener('DOMContentLoaded', () => {
  const dark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark-mode', dark);
  toggleBtn.textContent = dark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
});
