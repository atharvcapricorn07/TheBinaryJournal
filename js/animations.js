const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

let isAnimating = false;

themeToggle.addEventListener('click', () => {
  if (isAnimating) return;
  isAnimating = true;

  const isDark = document.body.classList.contains('dark-mode');

  // Reset overlay classes and force a reflow to reset animation state
  darkOverlay.classList.remove('slide-in', 'slide-out-right');
  void darkOverlay.offsetWidth; // Force reflow to reset animation properly

  if (!isDark) {
    // Light -> Dark: slide overlay in from left
    darkOverlay.classList.add('slide-in');

    const onTransitionEnd = (event) => {
      if (event.propertyName === 'transform') {
        // Add dark mode AFTER animation completes
        document.body.classList.add('dark-mode');
        darkOverlay.classList.remove('slide-in');
        darkOverlay.removeEventListener('transitionend', onTransitionEnd);
        isAnimating = false;
      }
    };

    darkOverlay.addEventListener('transitionend', onTransitionEnd);
  } else {
    // Dark -> Light: slide overlay out to right
    darkOverlay.classList.add('slide-out-right');

    const onTransitionEnd = (event) => {
      if (event.propertyName === 'transform') {
        // Remove dark mode AFTER animation completes
        document.body.classList.remove('dark-mode');
        darkOverlay.classList.remove('slide-out-right');
        darkOverlay.removeEventListener('transitionend', onTransitionEnd);
        isAnimating = false;
      }
    };

    darkOverlay.addEventListener('transitionend', onTransitionEnd);
  }
});
