const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');

  // Remove any existing transition classes
  darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');

  if (isDark) {
    // Exiting dark mode
    darkOverlay.classList.add('slide-out-left');

    setTimeout(() => {
      document.body.classList.remove('dark-mode');
    }, 500);
  } else {
    // Entering dark mode
    darkOverlay.classList.add('slide-in');

    setTimeout(() => {
      document.body.classList.add('dark-mode');
    }, 500);
  }

  // Clean up overlay after transition
  setTimeout(() => {
    darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');
  }, 1000);
});
