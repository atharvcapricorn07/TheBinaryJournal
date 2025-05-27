document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Page load fade-in
  body.classList.add('page-enter');

  // Immediately reveal all fade-in elements
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach((el, index) => {
    el.style.transitionDelay = `${index * 50}ms`; // Optional light stagger
    el.classList.add('visible');
  });

  // Theme toggle (fade only, no overlay)
  function toggleTheme() {
    body.classList.add('transition-theme'); // optional class if you want to add more control
    body.classList.toggle('dark-mode');
    setTimeout(() => {
      body.classList.remove('transition-theme');
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


