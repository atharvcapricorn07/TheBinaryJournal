const toggleBtn = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function toggleTheme() {
  const isDark = document.body.classList.contains('dark-mode');

  // Slide overlay in from left (always from left, easier)
  darkOverlay.classList.remove('slide-out-right', 'slide-out-left');
  darkOverlay.classList.add('active');
  await wait(500);  // wait for slide-in animation to finish

  // Toggle theme
  if (isDark) {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    toggleBtn.textContent = 'Toggle Dark Mode';

    // Slide overlay out to right
    darkOverlay.classList.remove('active');
    darkOverlay.classList.add('slide-out-right');
  } else {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    toggleBtn.textContent = 'Toggle Light Mode';

    // Slide overlay out to left
    darkOverlay.classList.remove('active');
    darkOverlay.classList.add('slide-out-left');
  }

  await wait(500); // wait for slide-out animation to finish

  // Reset overlay state for next toggle
  darkOverlay.classList.remove('slide-out-right', 'slide-out-left');
  darkOverlay.style.pointerEvents = 'none';
}

toggleBtn.addEventListener('click', toggleTheme);

// On page load, apply saved theme
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = 'Toggle Light Mode';
  } else {
    toggleBtn.textContent = 'Toggle Dark Mode';
  }
});
