const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');

  // Clear any existing overlay animation classes before starting
  darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');

  if (!isDark) {
    // Slide overlay in from the left
    darkOverlay.classList.add('slide-in');

    // Listen for transition end on transform property
    const onTransitionEnd = (event) => {
      if (event.propertyName === 'transform') {
        // Toggle dark mode on
        document.body.classList.add('dark-mode');
        // Remove the slide-in class so overlay resets offscreen
        darkOverlay.classList.remove('slide-in');
        // Remove this event listener to prevent multiple triggers
        darkOverlay.removeEventListener('transitionend', onTransitionEnd);
      }
    };

    darkOverlay.addEventListener('transitionend', onTransitionEnd);
  } else {
    // Slide overlay out to the right
    darkOverlay.classList.add('slide-out-right');

    // Listen for transition end on transform property
    const onTransitionEnd = (event) => {
      if (event.propertyName === 'transform') {
        // Toggle dark mode off
        document.body.classList.remove('dark-mode');
        // Remove slide-out-right and reset overlay offscreen left
        darkOverlay.classList.remove('slide-out-right');
        darkOverlay.classList.add('slide-out-left');
        // Remove event listener
        darkOverlay.removeEventListener('transitionend', onTransitionEnd);
      }
    };

    darkOverlay.addEventListener('transitionend', onTransitionEnd);
  }
});
