const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

let isAnimating = false;

themeToggle.addEventListener('click', () => {
  if (isAnimating) return;
  isAnimating = true;

  const isDark = document.body.classList.contains('dark-mode');

  // Clean up any existing classes
  darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');

  // Force reflow to make sure class change triggers animation
  void darkOverlay.offsetWidth;

  if (!isDark) {
    // Light → Dark
    darkOverlay.classList.add('slide-in');

    // Wait for animation to finish
    setTimeout(() => {
      document.body.classList.add('dark-mode');
      darkOverlay.classList.remove('slide-in');
      isAnimating = false;
    }, 500); // match CSS transition duration
  } else {
    // Dark → Light
    darkOverlay.classList.add('slide-out-left');

    setTimeout(() => {
      document.body.classList.remove('dark-mode');
      darkOverlay.classList.remove('slide-out-left');
      isAnimating = false;
    }, 500);
  }
});
