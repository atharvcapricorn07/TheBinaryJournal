// js/animations.js

const btn     = document.getElementById('theme-toggle');
const overlay = document.getElementById('dark-overlay');

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function swipe(toDark) {
  // 1) Make overlay visible and reset styles
  overlay.style.display = 'block';
  overlay.style.transition = 'none';
  overlay.style.pointerEvents = 'all';

  // 2) Position overlay off-screen to side we're swiping from
  overlay.style.transform = toDark ? 'translateX(-100%)' : 'translateX(100%)';

  // 3) Force reflow to apply initial transform before animation
  void overlay.offsetWidth;

  // 4) Animate overlay into view
  overlay.style.transition = 'transform 0.5s ease';
  overlay.style.transform = 'translateX(0)';
  await wait(500);

  // 5) Toggle theme under the overlay
  document.body.classList.toggle('dark-mode', toDark);
  localStorage.setItem('theme', toDark ? 'dark' : 'light');
  btn.textContent = toDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';

  // 6) Swipe overlay out in the *same* direction it came from
  overlay.style.transform = toDark ? 'translateX(-100%)' : 'translateX(100%)';
  await wait(500);

  // 7) Hide overlay again
  overlay.style.display = 'none';
  overlay.style.pointerEvents = 'none';
}

btn.addEventListener('click', () => {
  swipe(!document.body.classList.contains('dark-mode'));
});

// Set up theme on page load (no animation)
window.addEventListener('DOMContentLoaded', () => {
  const isDark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  btn.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';

  // Reset overlay state
  overlay.style.display = 'none';
  overlay.style.pointerEvents = 'none';
  overlay.style.transform = 'translateX(-100%)';
});

