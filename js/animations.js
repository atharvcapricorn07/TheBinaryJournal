const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');

  // Clear any existing animation classes to avoid conflicts
  darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');

  if (!isDark) {
    // Going light -> dark: slide overlay in from left
    darkOverlay.classList.add('slide-in');

    const onTransitionEnd = (event) => {
      if (event.propertyName === 'transform') {
        document.body.classList.add('dark-mode');
        darkOverlay.classList.remove('slide-in');
        darkOverlay.removeEventListener('transitionend', onTransitionEnd);
      }
    };

    darkOverlay.addEventListener('transitionend', onTransitionEnd);

  } else {
    // Going dark -> light: slide overlay out to right
    darkOverlay.classList.add('slide-out-right');

    const onTransitionEnd = (event) => {
      if (event.propertyName === 'transform') {
        // Remove dark mode first
        document.body.classList.remove('dark-mode');

        // Remove slide-out-right to reset overlay position instantly
        darkOverlay.classList.remove('slide-out-right');

        // Don't add slide-out-left here — let CSS default handle offscreen left

        darkOverlay.removeEventListener('transitionend', onTransitionEnd);
      }
    };

    darkOverlay.addEventListener('transitionend', onTransitionEnd);
  }
});
