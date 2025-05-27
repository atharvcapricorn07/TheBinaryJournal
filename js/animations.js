const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

let isAnimating = false;

function updateToggleText() {
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
  console.log("Updated button text to:", themeToggle.textContent);
}

// Make sure DOM elements exist
if (!themeToggle) {
  console.error("No element with ID 'theme-toggle' found!");
}
if (!darkOverlay) {
  console.error("No element with ID 'dark-overlay' found!");
}

// Initialize text on page load
updateToggleText();

themeToggle.addEventListener('click', () => {
  if (isAnimating) {
    console.log("Animation in progress, ignoring click");
    return;
  }
  isAnimating = true;

  const isDark = document.body.classList.contains('dark-mode');
  console.log("Current mode is dark?", isDark);

  darkOverlay.classList.remove('slide-in', 'slide-out-right', 'slide-out-left');

  if (!isDark) {
    console.log("Switching Light → Dark");

    darkOverlay.classList.add('slide-in');

    const onTransitionEnd = (e) => {
      if (e.propertyName === 'transform') {
        document.body.classList.add('dark-mode');
        darkOverlay.classList.remove('slide-in');
        darkOverlay.removeEventListener('transitionend', onTransitionEnd);
        isAnimating = false;
        updateToggleText();
        console.log("Switched to dark mode");
      }
    };

    darkOverlay.addEventListener('transitionend', onTransitionEnd);

  } else {
    console.log("Switching Dark → Light");

    darkOverlay.classList.add('slide-out-left');

    const onTransitionEnd = (e) => {
      if (e.propertyName === 'transform') {
        document.body.classList.remove('dark-mode');
        darkOverlay.classList.remove('slide-out-left');
        darkOverlay.removeEventListener('transitionend', onTransitionEnd);
        isAnimating = false;
        updateToggleText();
        console.log("Switched to light mode");
      }
    };

    darkOverlay.addEventListener('transitionend', onTransitionEnd);
  }
});
