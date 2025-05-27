const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');

  // Clean previous transition classes
  darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');

  if (!isDark) {
    // Slide in to enter dark mode
    darkOverlay.classList.add('slide-in');

    setTimeout(() => {
      document.body.classList.add('dark-mode');
      darkOverlay.classList.remove('slide-in');
    }, 500);
  } else {
    // Slide out to right to leave dark mode
    darkOverlay.classList.add('slide-out-right');

    setTimeout(() => {
      document.body.classList.remove('dark-mode');
      darkOverlay.classList.remove('slide-out-right');
      darkOverlay.classList.add('slide-out-left'); // Reset state
    }, 500);
  }
});
