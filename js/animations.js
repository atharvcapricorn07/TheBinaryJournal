const overlay = document.getElementById('dark-overlay');
const body = document.body;

function toggleTheme() {
  const isDark = body.classList.contains('dark-mode');

  // Reset all animation classes
  overlay.classList.remove('slide-out-left', 'slide-out-right', 'slide-in');

  // Trigger entry animation
  overlay.classList.add('slide-in');

  // Wait for animation to complete
  setTimeout(() => {
    // Toggle dark mode class
    body.classList.toggle('dark-mode');

    // Remove slide-in
    overlay.classList.remove('slide-in');

    // Apply exit animation based on direction
    overlay.classList.add(isDark ? 'slide-out-left' : 'slide-out-right');

    // Optional cleanup after animation finishes
    setTimeout(() => {
      overlay.classList.remove('slide-out-left', 'slide-out-right');
    }, 500); // matches the CSS transition time
  }, 500); // matches the CSS transition time
}

// Fade in on page load
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-enter');
});

// grab all the article <a> links
const articleLinks = document.querySelectorAll('.article-grid a[href]');

articleLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.href;

    // Add fade out class
    document.body.classList.add('page-exit');

    // Wait for the fade out to complete then navigate
    setTimeout(() => {
      window.location.href = href;
    }, 500); // match this to your CSS transition time
  });
});
