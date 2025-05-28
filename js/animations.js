document.addEventListener("DOMContentLoaded", () => {
  // --- Theme Toggle ---
  const toggleButton = document.querySelector(".theme-toggle");
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") document.body.classList.add("dark-mode");
  toggleButton.textContent = document.body.classList.contains("dark-mode")
    ? "Toggle Light Mode"
    : "Toggle Dark Mode";
  toggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    toggleButton.textContent = isDark ? "Toggle Light Mode" : "Toggle Dark Mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // --- Fade‑in for articles ---
  document.querySelectorAll(".article-grid .featured.initial").forEach((card, i) => {
    setTimeout(() => {
      card.classList.add("visible");
      card.classList.remove("initial");
    }, 100 * i);
  });

  // --- Read More on mobile ---
  const allCards = document.querySelectorAll(".article-grid .featured");
  const readMoreBtn = document.getElementById("read-more-btn");
  if (window.innerWidth <= 480 && allCards.length > 5) {
    allCards.forEach((c, i) => {
      if (i >= 5) c.style.display = "none";
    });
    readMoreBtn.style.display = "block";
    readMoreBtn.addEventListener("click", () => {
      allCards.forEach((c) => (c.style.display = "flex"));
      readMoreBtn.style.display = "none";
    });
  }

  // --- Easter Egg: green wipe + secret prompt ---
  const eggBtn = document.getElementById("egg-easter-egg");
  const gooeyOverlay = document.getElementById("gooey-overlay");
  const secretPrompt = document.getElementById("secret-code-prompt");
  const secretInput = document.getElementById("secret-code-input");
  const secretSubmit = document.getElementById("secret-code-submit");
  const secretError = document.getElementById("secret-code-error");

  // Initialize overlay & prompt
  gooeyOverlay.style.width = "0";
  secretPrompt.style.display = "none";

  eggBtn.addEventListener("click", () => {
    eggBtn.disabled = true;
    eggBtn.style.filter = "grayscale(100%)";
    eggBtn.style.cursor = "default";

    // Animate wipe
    gooeyOverlay.style.transition = "width 0.6s ease-in-out";
    gooeyOverlay.style.width = "100vw";

    // After wipe, show prompt
    setTimeout(() => {
      secretPrompt.style.display = "flex";
      secretInput.focus();
    }, 650);
  });

  secretSubmit.addEventListener("click", checkSecretCode);
  secretInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkSecretCode();
  });

  function checkSecretCode() {
    const code = secretInput.value.trim().toLowerCase();
    if (code === "skibidi") {
      secretError.style.display = "none";
      secretPrompt.style.pointerEvents = "none";
      startFlappyBirdGame();
    } else {
      secretError.style.display = "block";
      secretInput.value = "";
      secretInput.focus();
    }
  }

  // --- Flappy Bird Game ---
  function startFlappyBirdGame() {
    if (document.getElementById("flappy-bird-container")) {
      document.getElementById("flappy-bird-container").style.display = "flex";
      document.body.style.overflow = "hidden"; // prevent scroll on re-show
      return;
    }

    // Disable page scrolling during game
    document.body.style.overflow = "hidden";

    // Game container
    const container = document.createElement("div");
    container.id = "flappy-bird-container";
    Object.assign(container.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "#70c5ce",
      zIndex: 10000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      overflow: "hidden",
      userSelect: "none",
      touchAction: "none",
    });
    document.body.appendChild(container);

    // Exit button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Exit Game";
    Object.assign(closeBtn.style, {
      position: "absolute",
      top: "20px",
      right: "20px",
      padding: "8px 16px",
      fontSize: "16px",
      cursor: "pointer",
      zIndex: 10001,
      userSelect: "none",
    });
    container.appendChild(closeBtn);

    // Canvas
    const canvas = document.createElement("canvas");

    // Set responsive size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let frames = 0,
      score = 0;
    const DEGREE = Math.PI / 180;
    const pipes = [];
    const pipeWidth = 50;
    const pipeGap = canvas.height * 0.25; // gap scaled by screen height
    const groundHeight = canvas.height * 0.15; // ground height scaled

    const bird = {
      x: canvas.width * 0.15,
      y: canvas.height * 0.35,
      width: 34,
      height: 24,
      gravity: 0.25,
      jump: 4.6,
      speed: 0,
      rotation: 0,
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = "yellow";
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
      },
      flap() {
        this.speed = -this.jump;
      },
      update() {
        this.speed += this.gravity;
        this.y += this.speed;
        if (this.y + this.height / 2 >= canvas.height - groundHeight) {
          this.y = canvas.height - groundHeight - this.height / 2;
          this.speed = 0;
        }
        this.rotation = this.speed >= this.jump ? 90 * DEGREE : -25 * DEGREE;
      },
    };

    function createPipe() {
      const minPipeHeight = 50;
      const maxPipeHeight = canvas.height - pipeGap - groundHeight - minPipeHeight;
      const topH = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight;
      pipes.push({ x: canvas.width, y: 0, width: pipeWidth, height: topH, passed: false });
      pipes.push({
        x: canvas.width,
        y: topH + pipeGap,
        width: pipeWidth,
        height: canvas.height - (topH + pipeGap) - groundHeight,
      });
    }

    function loop() {
      // Clear & draw sky
      ctx.fillStyle = "#70c5ce";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      ctx.fillStyle = "#ded895";
      ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

      // Pipes
      pipes.forEach((p) => {
        ctx.fillStyle = "green";
        ctx.fillRect(p.x, p.y, p.width, p.height);
        p.x -= 2;

        // Collision detection
        if (
          bird.x + bird.width / 2 > p.x &&
          bird.x - bird.width / 2 < p.x + p.width &&
          bird.y + bird.height / 2 > p.y &&
          bird.y - bird.height / 2 < p.y + p.height
        ) {
          resetGame();
          return;
        }

        // Score update only for top pipes (y === 0)
        if (!p.passed && p.x + p.width < bird.x && p.y === 0) {
          score++;
          p.passed = true;
        }
      });

      // Remove offscreen pipes
      if (pipes.length && pipes[0].x + pipeWidth < 0) pipes.splice(0, 2);

      bird.update();
      bird.draw();

      if (frames % 90 === 0) createPipe();

      // Draw score
      ctx.fillStyle = "white";
      ctx.font = "24px Arial";
      ctx.fillText(`Score: ${score}`, 10, 30);

      frames++;
      requestAnimationFrame(loop);
    }

    function onSpace(e) {
      if (e.code === "Space" || e.type === "click" || e.type === "touchstart") bird.flap();
    }
    window.addEventListener("keydown", onSpace);
    canvas.addEventListener("click", onSpace);
    canvas.addEventListener("touchstart", onSpace);

    closeBtn.addEventListener("click", () => {
      container.style.display = "none";
      window.removeEventListener("keydown", onSpace);
      canvas.removeEventListener("click", onSpace);
      canvas.removeEventListener("touchstart", onSpace);
      document.body.style.overflow = ""; // restore scroll
      window.removeEventListener("resize", resizeCanvas);
    });

    function resetGame() {
      alert(`Game over! Your score was ${score}.`);
      frames = 0;
      pipes.length = 0;
      bird.y = canvas.height * 0.35;
      bird.speed = 0;
      score = 0;
    }

    loop();
  }
});



