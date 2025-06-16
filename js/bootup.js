window.addEventListener("DOMContentLoaded", () => {
  const bootScreen = document.getElementById("boot-screen");

  // Fade out the whole screen after all lines appear
  setTimeout(() => {
    bootScreen.classList.add("fade-out");
    document.body.style.overflow = "auto";
  }, 4000); // Lines finish at ~3s, fade out after
});
