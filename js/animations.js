const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');
let isAnimating = false;

// Utility: Update button label based on current theme
function updateToggleText() {
  themeToggle.textContent = document.body.classList.contains('dark-mode')
    ? 'Toggle Light Mode'
    : 'Toggle Dark Mode';
}

// Apply saved theme preference on load
window.addEventListener('DOMContentLoaded', () => {
  const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark-mode', darkModeEnabled);
  updateToggleText();
});

// Handle toggle with animation
themeToggle.addEventListener('click', () => {
  if (isAnimating) return;
  isAnimating = true;

  const isCurrentlyDark = document.body.classList.contains('dark-mode');

  // Reset overlay animation classes
  darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');

  // Listen for slide-in transition end
  const onFirstTransitionEnd = (e) => {
    if (e.target !== darkOverlay) return;

    // Toggle theme
    document.body.classList.toggle('dark-mode', !isCurrentlyDark);
    localStorage.setItem('darkMode', String(!isCurrentlyDark));
    updateToggleText();

    // Prepare overlay to slide out
    darkOverlay.classList.remove('slide-in');
    darkOverlay.classList.add(isCurrentlyDark ? 'slide-out-left' : 'slide-out-right');

    darkOverlay.removeEventListener('transitionend', onFirstTransitionEnd);

    // Wait for slide-out to finish
    darkOverlay.addEventListener('transitionend', () => {
      darkOverlay.classList.remove('slide-out-left', 'slide-out-right');
      isAnimating = false;
    }, { once: true });
  };

  // Start animation: slide in overlay
  darkOverlay.addEventListener('transitionend', onFirstTransitionEnd, { once: true });
  darkOverlay.classList.add('slide-in');
});

