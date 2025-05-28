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
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });

  // Page fade-in
  body.classList.add('page-enter');

  // Article fade-in
  const fadeEls = document.querySelectorAll('.fade-in');
  fadeEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 100}ms`;
    el.classList.add('visible');
  });

  // Link transitions
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

  // Read More functionality on mobile
  const articles = document.querySelectorAll('#article-grid article');
  const readMoreBtn = document.getElementById('read-more');
  const isMobile = window.innerWidth <= 600;

  if (isMobile && articles.length > 5) {
    articles.forEach((article, index) => {
      if (index >= 5) {
        article.style.display = 'none';
        article.classList.add('extra');
      }
    });

    readMoreBtn.style.display = 'block';

    readMoreBtn.addEventListener('click', () => {
      document.querySelectorAll('#article-grid .extra').forEach(el => {
        el.style.display = '';
      });
      readMoreBtn.style.display = 'none';
    });
  }
});
