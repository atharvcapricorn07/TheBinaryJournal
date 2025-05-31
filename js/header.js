window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded.");

  const canvas = document.getElementById("headerCanvas");
  if (!canvas) {
    console.error("❌ Canvas element not found!");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("❌ Could not get 2D context.");
    return;
  }

  let particles = [];
  let animationFrameId;

  function isLightMode() {
    return !document.body.classList.contains("dark-mode");
  }

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    console.log(`📐 Canvas resized: ${canvas.width} x ${canvas.height} (DPR: ${dpr})`);
  }

  function createParticles() {
    const count = 60;
    particles = [];
    for (let i = 0; i < count; i++) {
      const p = {
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * Math.PI * 2,
        s: Math.random() * 0.4 + 0.1
      };
      particles.push(p);
    }
    console.log(`✨ Created ${particles.length} particles.`);
  }

  function getParticleColor() {
    return isLightMode()
      ? "rgba(255, 215, 0, 0.5)" // gold for contrast on green
      : "rgba(255,255,255,0.3)"; // soft white in dark mode
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    for (let p of particles) {
      p.x += Math.cos(p.a) * p.s;
      p.y += Math.sin(p.a) * p.s;

      if (p.x < 0) p.x = canvas.offsetWidth;
      if (p.x > canvas.offsetWidth) p.x = 0;
      if (p.y < 0) p.y = canvas.offsetHeight;
      if (p.y > canvas.offsetHeight) p.y = 0;

      // Soft glow underneath
      if (isLightMode()) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 215, 0, 0.1)";
        ctx.fill();
      }

      // Main particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = getParticleColor();
      ctx.fill();
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  function stopParticles() {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  }

  // Initialize
  resizeCanvas();
  createParticles();
  canvas.style.display = "block";
  draw();

  // Theme toggle support
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      setTimeout(() => {
        stopParticles();
        canvas.style.display = "block";
        draw();
      }, 300);
    });
  }

  // Resize support
  window.addEventListener("resize", () => {
    console.log("📏 Window resized, updating canvas.");
    resizeCanvas();
  });
});
