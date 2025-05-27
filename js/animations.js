const themeToggle = document.getElementById('theme-toggle');

function updateToggleText() {
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
  console.log("Updated button text to:", themeToggle.textContent);
}

// Make sure button exists
if (!themeToggle) {
  console.error("No element with ID 'theme-toggle' found!");
}

// Initialize text on load
updateToggleText();

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  console.log("Current mode is dark?", isDark);

  if (isDark) {
    document.body.classList.remove('dark-mode');
    console.log("Switched to light mode");
  } else {
    document.body.classList.add('dark-mode');
    console.log("Switched to dark mode");
  }

  updateToggleText();
});
