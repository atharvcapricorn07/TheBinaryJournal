const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

let isAnimating = false;

function applyDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

function saveMode(isDark) {
  localStorage.setItem('darkMode', isDark ? 'true' : 'false');
}

function getSavedMode() {
  return localStorage.getItem('darkMode') === 'true';
}

// On page load, apply saved mode
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = getSavedMode();
  applyDarkMode(savedMode);
});

themeToggle.addEventListener('click', () => {
  if (isAnimating) return;

  isAnimating = true;
  const isDark = document.body.classList.contains('dark-mode');

  darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');

  function onTransitionEnd(e) {
    if (!isDark) {
      applyDarkMode(true);
      saveMode(true);
    } else {
      applyDarkMode(false);
      saveMode(false);
    }

    darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');
    darkOverlay.removeEventListener('transitionend', onTransitionEnd);
    isAnimating = false;
  }

  darkOverlay.addEventListener('transitionend', onTransitionEnd);

  if (!isDark) {
    darkOverlay.classList.add('slide-in');
  } else {
    darkOverlay.classList.add('slide-out-left');
  }
});
