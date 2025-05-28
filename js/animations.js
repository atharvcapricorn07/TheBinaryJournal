// Theme toggle logic
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle');

  // Check saved theme on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
  }

  // Theme toggle click
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Read More logic
  const readMoreBtn = document.getElementById('read-more-btn');
  const articleGrid = document.querySelector('.article-grid');
  if (readMoreBtn && articleGrid) {
    readMoreBtn.addEventListener('click', () => {
      articleGrid.classList.add('show-all');
      readMoreBtn.style.display = 'none';
    });
  }
});
