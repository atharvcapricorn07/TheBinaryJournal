document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
  }

  // Set initial button label
  if (themeToggle) {
    themeToggle.textContent = body.classList.contains('dark-mode')
      ? 'Toggle Light Mode'
      : 'Toggle Dark Mode';

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      themeToggle.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    });
  }
});
