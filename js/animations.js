const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

let isAnimating = false;

// Helper: update button text based on current mode
function updateToggleText() {
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.textContent = 'Toggle Light Mode';
  } else {
    themeToggle.textContent = 'Toggle Dark Mode';
  }
}

// On page load, apply saved mode and update button text
window.addEventListener('DOMContentLoaded', () => {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  updateToggleText();
});

themeToggle.addEventListener('click', () => {
  if (isAnimating) return;
  isAnimating = true;

  const isDark = document.body.classList.contains('dark-mode');

  // Clean animation classes
  darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');

  function onTransitionEnd(e) {
    if (e.target !== darkOverlay) return; // only run once for overlay

    // Toggle dark mode after animation completes
    if (!isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }

    updateToggleText();

    // Animate overlay off screen after mode toggle
    darkOverlay.classList.remove('slide-in');
    if (!isDark) {
      darkOverlay.classList.add('slide-out-right');  // dark mode activated, overlay slides out right
    } else {
      darkOverlay.classList.add('slide-out-left');   // light mode activated, overlay slides out left
    }

    // Wait for second transition to finish before clearing animation lock
    darkOverlay.removeEventListener('transitionend', onTransitionEnd);

    // Listen for second transition end
    darkOverlay.addEventListener('transitionend', () => {
      darkOverlay.classList.remove('slide-out-left', 'slide-out-right');
      isAnimating = false;
    }, { once: true });
  }

  darkOverlay.addEventListener('transitionend', onTransitionEnd, { once: true });

  // Start the animation: overlay slides in
  darkOverlay.classList.add('slide-in');
});
