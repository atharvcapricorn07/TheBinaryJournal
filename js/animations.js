document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('dark-overlay');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Page load fade-in
  body.classList.add('page-enter');

  // Immediately reveal all fade-in elements
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach((el, index) => {
    el.style.transitionDelay = `${index * 50}ms`; // Slight stagger if desired
    el.classList.add('visible');
  });

  // Theme toggle with overlay animation
  function toggleTheme() {
    const isDark = body.classList.contains('dark-mode');

    overlay.classList.remove('slide-in', 'slide-out-left', 'slide-out-right');
    overlay.classList.add('slide-in');

    setTimeout(() => {
      body.classList.toggle('dark-mode');
      overlay.classList.remove('slide-in');
      overlay.classList.add(isDark ? 'slide-out-left' : 'slide-out-right');

      setTimeout(() => {
        overlay.classList.remove('slide-out-left', 'slide-out-right');
      }, 500);
    }, 500);
  }

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') body.classList.add('dark-mode');

  // Bind theme toggle button
  if (themeToggle) {
    themeToggle.textContent = savedTheme === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    themeToggle.addEventListener('click', () => {
      const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      toggleTheme();
      themeToggle.textContent = newTheme === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    });
  }

  // Exit animation for article links
  const articleLinks = document.querySelectorAll('.article-grid a[href]');
  articleLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.href;
      body.classList.add('page-exit');
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
});

