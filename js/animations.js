const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

let isAnimating = false;  // Flag to block double clicks during animation

themeToggle.addEventListener('click', () => {
  if (isAnimating) return;  // Prevent spamming clicks during animation
  isAnimating = true;

  const isDark = document.body.classList.contains('dark-mode');

  // Clear any animation classes to reset overlay position
  darkOverlay.classList.remove('slide-in', 'slide-out-right');

  if (!isDark) {
    // Going light -> dark: slide overlay IN from left
    darkOverlay.classList.add('slide-in');

    // Listen for transition end once
    const onTransitionEnd = (event) => {
      if (event.propertyName === 'transform') {
        document.body.classList.add('dark-mode');
        darkOverlay.classList.remove('slide-in');
        darkOverlay.removeEventListener('transitionend', onTransitionEnd);
        isAnimating = false;
      }
    };

    darkOverlay.addEventListener('transitionend', onTransitionEnd);

  } else {
    // Going dark -> light: slide overlay OUT to right
    darkOverlay.classList.add('slide-out-right');

    const onTransitionEnd = (event) => {
      if (event.propertyName === 'transform') {
        document.body.classList.remove('dark-mode');
        darkOverlay.classList.remove('slide-out-right');
        darkOverlay.removeEventListener('transitionend', onTransitionEnd);
        isAnimating = false;
      }
    };

    darkOverlay.addEventListener('transitionend', onTransitionEnd);
  }
});
