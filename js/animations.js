const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

let isAnimating = false;

themeToggle.addEventListener('click', () => {
  if (isAnimating) return;
  isAnimating = true;

  const isDark = document.body.classList.contains('dark-mode');

  // Reset classes
  darkOverlay.classList.remove('slide-in', 'slide-out-right', 'slide-out-left');

  if (!isDark) {
    // Light -> dark: slide overlay IN from left
    darkOverlay.classList.add('slide-in');

    const onTransitionEnd = (e) => {
      if (e.propertyName === 'transform') {
        document.body.classList.add('dark-mode');
        darkOverlay.classList.remove('slide-in');
        darkOverlay.removeEventListener('transitionend', onTransitionEnd);
        isAnimating = false;
      }
    };

    darkOverlay.addEventListener('transitionend', onTransitionEnd);

  } else {
    // Dark -> light: slide overlay OUT to left (back to offscreen left)
    darkOverlay.classList.add('slide-out-left');

    const onTransitionEnd = (e) => {
      if (e.propertyName === 'transform') {
        document.body.classList.remove('dark-mode');
        darkOverlay.classList.remove('slide-out-left');
        darkOverlay.removeEventListener('transitionend', onTransitionEnd);
        isAnimating = false;
      }
    };

    darkOverlay.addEventListener('transitionend', onTransitionEnd);
  }
});
