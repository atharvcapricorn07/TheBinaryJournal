const themeToggle = document.getElementById('theme-toggle');
const darkOverlay = document.getElementById('dark-overlay');

let isAnimating = false;

themeToggle.addEventListener('click', () => {
  console.log('Clicked button');

  if (isAnimating) {
    console.log('Animation in progress, ignoring click');
    return;
  }

  isAnimating = true;

  const isDark = document.body.classList.contains('dark-mode');
  console.log('Is dark mode?', isDark);

  // Clean animation classes
  darkOverlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');

  function onTransitionEnd(e) {
    console.log('Transition ended:', e.propertyName, 'on', e.target);

    darkOverlay.removeEventListener('transitionend', onTransitionEnd);
    isAnimating = false;
    console.log('Animation ended, isAnimating = false');
  }

  darkOverlay.addEventListener('transitionend', onTransitionEnd);

  if (!isDark) {
    console.log('Adding slide-in class (Light → Dark)');
    darkOverlay.classList.add('slide-in');
  } else {
    console.log('Adding slide-out-left class (Dark → Light)');
    darkOverlay.classList.add('slide-out-left');
  }
});
