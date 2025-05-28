document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const toggleButton = document.querySelector(".theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  toggleButton.textContent = document.body.classList.contains("dark-mode")
    ? "Toggle Light Mode"
    : "Toggle Dark Mode";

  toggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    toggleButton.textContent = isDark ? "Toggle Light Mode" : "Toggle Dark Mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Fade-in animation for articles
  const cards = document.querySelectorAll(".article-grid .featured.initial");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("visible");
      card.classList.remove("initial");
    }, 100 * index);
  });

  // Read More button logic
  const allCards = document.querySelectorAll(".article-grid .featured");
  const readMoreBtn = document.getElementById("read-more-btn");

  if (window.innerWidth <= 480 && allCards.length > 5) {
    allCards.forEach((card, index) => {
      if (index >= 5) {
        card.style.display = "none";
      }
    });
    readMoreBtn.style.display = "block";

    readMoreBtn.addEventListener("click", () => {
      allCards.forEach((card) => {
        card.style.display = "flex";
      });
      readMoreBtn.style.display = "none";
    });
  }

  // --- Easter Egg Logic ---
  const eggBtn = document.getElementById("egg-easter-egg");
  const gooeyOverlay = document.getElementById("gooey-overlay");
  const secretPrompt = document.getElementById("secret-code-prompt");
  const secretInput = document.getElementById("secret-code-input");
  const secretSubmit = document.getElementById("secret-code-submit");
  const secretError = document.getElementById("secret-code-error");

  gooeyOverlay.style.display = "none";
  secretPrompt.style.display = "none";

  // Setup initial clip-path for green liquid effect
  gooeyOverlay.style.clipPath = "circle(0% at 50% 50%)";
  gooeyOverlay.style.transition = "clip-path 1s ease";

  eggBtn.addEventListener("click", () => {
    // Disable button after one click
    eggBtn.disabled = true;
    eggBtn.style.cursor = "default";

    // Show overlay and expand clip-path to reveal green liquid fill
    gooeyOverlay.style.display = "block";
    gooeyOverlay.style.clipPath = "circle(150% at 50% 50%)";

    // After 1 second, show the secret prompt
    setTimeout(() => {
      secretPrompt.style.display = "flex";
      secretInput.focus();
    }, 1000);
  });

  secretSubmit.addEventListener("click", checkSecretCode);
  secretInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkSecretCode();
    }
  });

  function checkSecretCode() {
    const code = secretInput.value.trim().toLowerCase();
    if (code === "skibidi") {
      secretError.style.display = "none";
      secretPrompt.style.pointerEvents = "none";

      gooeyOverlay.style.transition = "opacity 1.5s ease";
      secretPrompt.style.transition = "opacity 1.5s ease";

      gooeyOverlay.style.opacity = 0;
      secretPrompt.style.opacity = 0;

      setTimeout(() => {
        gooeyOverlay.style.display = "none";
        secretPrompt.style.display = "none";
        startFlappyBirdGame();
      }, 1600);
    } else {
      secretError.style.display = "block";
      secretInput.value = "";
      secretInput.focus();
    }
  }

  // --- Flappy Bird Game Code ---
  function startFlappyBirdGame() {
    const existingContainer = document.getElementById("flappy-bird-container");
    if (existingContainer) {
      existingContainer.style.display = "block";
      return;
    }

    const container = document.createElement("div");
    container.id = "flappy-bird-container";
    Object.assign(container.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      background: "#70c5ce",
      zIndex: 10000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    });
    document.body.appendChild(container);

    // Add a close button to exit game
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
    });
    closeBtn.addEventListener("click", () => {
      container.style.display = "none";
    });
    container.appendChild(closeBtn);

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 480;
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let frames = 0;
    const DEGREE = Math.PI / 180;

    // Bird object
    const bird = {
      x: 50,
      y: 150,
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
        if (this.y + this.height / 2 >= canvas.height - 80) {
          this.y = canvas.height - 80 - this.height / 2;
          this.speed = 0;
        }
        if (this.speed >= this.jump) {
          this.rotation = 90 * DEGREE;
        } else {
          this.rotation = -25 * DEGREE;
        }
      },
    };

    // Pipes array
    const pipes = [];
    const pipeWidth = 50;
    const pipeGap = 120;

    function createPipe() {
      const topPipeHeight =
        Math.floor(Math.random() * (canvas.height - pipeGap - 150)) + 50;
      pipes.push({
        x: canvas.width,
        y: 0,
        width: pipeWidth,
        height: topPipeHeight,
        passed: false,
      });
      pipes.push({
        x: canvas.width,
        y: topPipeHeight + pipeGap,
        width: pipeWidth,
        height: canvas.height - (topPipeHeight + pipeGap) - 80,
      });
    }

    let score = 0;

    function loop() {
      ctx.fillStyle = "#70c5ce"; // sky
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.fillStyle = "#ded895";
      ctx.fillRect(0, canvas.height - 80, canvas.width, 80);

      // Draw pipes and move them
      for (let i = 0; i < pipes.length; i++) {
        const p = pipes[i];
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

        // Score counting
        if (!p.passed && p.x + p.width < bird.x && p.y === 0) {
          score++;
          p.passed = true;
        }
      }

      // Remove offscreen pipes
      if (pipes.length && pipes[0].x + pipeWidth < 0) {
        pipes.shift();
        pipes.shift();
      }

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
      if (e.code === "Space" || e.type === "click") {
        bird.flap();
      }
    }
    window.addEventListener("keydown", onSpace);
    canvas.addEventListener("click", onSpace);

    function resetGame() {
      alert(`Game over! Your score was ${score}.`);
      frames = 0;
      pipes.length = 0;
      bird.y = 150;
      bird.speed = 0;
      score = 0;
    }

    loop();
  }
});


