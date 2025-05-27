const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

let isAnimating = false;
let fallbackTimeout = null;

function updateToggleText() {
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
  console.log("Updated button text to:", themeToggle.textContent);
}

function clearAnimation() {
  isAnimating = false;
  if (fallbackTimeout) {
    clearTimeout(fallbackTimeout);
    fallbackTimeout = null;
  }
}

function onTransitionEnd(e) {
  console.log("Transition ended:", e.propertyName, e.target);
  // Make sure this event is for transform and the right element
  if (e.propertyName === 'transform' && e.target === darkOverlay) {
    const isDark = document.body.classList.contains('dark-mode');

    if (darkOverlay.classList.contains('slide-in')) {
      // Animation for Light → Dark completed
      document.body.classList.add('dark-mode');
      darkOverlay.classList.remove('slide-in');
      console.log("Switched to dark mode");
    } else if (darkOverlay.classList.contains('slide-out-left')) {
      // Animation for Dark → Light completed
      document.body.classList.remove('dark-mode');
      darkOverlay.classList.remove('slide-out-left');
      console.log("Switched to light mode");
    }

    darkOverlay.removeEventListener('transitionend', onTransitionEnd);
    clearAnimation();
    updateToggleText();
  }
}

themeToggle.addEventListener('click', () => {
  if (isAnimating) {
    console.log("Animation in progress, ignoring click");
    return;
  }
  isAnimating = true;

  const isDark = document.body.classList.contains('dark-mode');
  console.log("Current mode is dark?", isDark);

  // Remove all possible slide classes first
  darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');

  if (!isDark) {
    // Light → Dark
    console.log("Switching Light → Dark");
    darkOverlay.classList.add('slide-in');
    darkOverlay.addEventListener('transitionend', onTransitionEnd);

    fallbackTimeout = setTimeout(() => {
      console.warn("Fallback: resetting animation flag (Light → Dark)");
      darkOverlay.classList.remove('slide-in');
      darkOverlay.removeEventListener('transitionend', onTransitionEnd);
      clearAnimation();
      document.body.classList.add('dark-mode');
      updateToggleText();
    }, 1500);

  } else {
    // Dark → Light
    console.log("Switching Dark → Light");
    darkOverlay.classList.add('slide-out-left');
    darkOverlay.addEventListener('transitionend', onTransitionEnd);

    fallbackTimeout = setTimeout(() => {
      console.warn("Fallback: resetting animation flag (Dark → Light)");
      darkOverlay.classList.remove('slide-out-left');
      darkOverlay.removeEventListener('transitionend', onTransitionEnd);
      clearAnimation();
      document.body.classList.remove('dark-mode');
      updateToggleText();
    }, 1500);
  }
});

// Initialize button text on load
updateToggleText();


