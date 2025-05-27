const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');

  // Remove any existing transition classes so we start fresh
  darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');

  if (!isDark) {
    // Slide in overlay to cover the page (starting dark mode)
    darkOverlay.classList.add('slide-in');

    // Wait for transition end before toggling dark mode and hiding overlay
    darkOverlay.addEventListener('transitionend', function handler() {
      document.body.classList.add('dark-mode');
      darkOverlay.classList.remove('slide-in');
      darkOverlay.removeEventListener('transitionend', handler);
    });
  } else {
    // Slide overlay out to right (leaving dark mode)
    darkOverlay.classList.add('slide-out-right');

    // Wait for transition end before toggling off dark mode and resetting overlay
    darkOverlay.addEventListener('transitionend', function handler() {
      document.body.classList.remove('dark-mode');
      darkOverlay.classList.remove('slide-out-right');
      darkOverlay.classList.add('slide-out-left'); // reset to left offscreen
      darkOverlay.removeEventListener('transitionend', handler);
    });
  }
});

