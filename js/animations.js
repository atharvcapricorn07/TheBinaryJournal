document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  console.log('JS loaded: animations.js');

  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      themeToggle.textContent = 'Toggle Light Mode';
    } else {
      body.classList.remove('dark-mode');
      themeToggle.textContent = 'Toggle Dark Mode';
    }
    console.log(`Applied theme: ${theme}`);
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
      console.log(`Theme toggled to: ${newTheme}`);
    });
  } else {
    console.warn('Theme toggle button not found.');
  }

  // Page enter animation
  body.classList.add('page-enter');

  // Fade-in effect for all articles
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 100}ms`;
    el.classList.add('visible');
  });

  // Link transition
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
