const toggleButton = document.getElementById('theme-toggle');
const overlay = document.getElementById('dark-overlay');
const body = document.body;

toggleButton.addEventListener('click', () => {
  // Slide in overlay
  overlay.classList.add('slide-in');
  overlay.classList.remove('slide-out-right', 'slide-out-left');

  // Wait for animation to finish before toggling theme
  setTimeout(() => {
    body.classList.toggle('dark-mode');

    // Slide out overlay in correct direction
    if (body.classList.contains('dark-mode')) {
      overlay.classList.remove('slide-in');
      overlay.classList.add('slide-out-right');
    } else {
      overlay.classList.remove('slide-in');
      overlay.classList.add('slide-out-left');
    }
  }, 600); // Must match CSS transition duration
});


