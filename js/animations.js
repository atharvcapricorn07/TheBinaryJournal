const themeToggle = document.getElementById('theme-toggle');

function updateToggleText() {
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
  console.log("Updated button text to:", themeToggle.textContent);
}

updateToggleText();

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  if (isDark) {
    console.log("Switching Dark → Light");
    document.body.classList.remove('dark-mode');
  } else {
    console.log("Switching Light → Dark");
    document.body.classList.add('dark-mode');
  }
  updateToggleText();
});

