document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');

  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');

  if (!themeToggle) {
    console.error('Theme toggle button not found!');
    return;
  }

  console.log('Theme toggle button found');

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme') || 'light';
  console.log('Saved theme:', savedTheme);

  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    console.log('Dark mode applied on load');
  }

  // Set initial button label
  themeToggle.textContent = body.classList.contains('dark-mode')
    ? 'Toggle Light Mode'
    : 'Toggle Dark Mode';

  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    console.log('Toggle button clicked');
    const isDark = body.classList.toggle('dark-mode');
    console.log('Dark mode active:', isDark);

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
  });
});
