const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

let isAnimating = false;

themeToggle.addEventListener('click', () => {
  if (isAnimating) return;
  isAnimating = true;

  const isDark = document.body.classList.contains('dark-mode');

  // Reset any old animation classes
  darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');
  void darkOverlay.offsetWidth; // force reflow

  // Start swipe in (left → right)
  darkOverlay.classList.add('slide-in');

  // Wait for swipe-in animation to finish (500ms)
  setTimeout(() => {
    // Toggle dark mode in the middle
    if (isDark) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }

    // Now swipe back out to the left
    darkOverlay.classList.remove('slide-in');
    darkOverlay.classList.add('slide-out-left');

    // Wait for swipe-out to complete
    setTimeout(() => {
      darkOverlay.classList.remove('slide-out-left');
      isAnimating = false;
    }, 500); // Match your CSS transition time
  }, 500); // Match your CSS transition time
});
