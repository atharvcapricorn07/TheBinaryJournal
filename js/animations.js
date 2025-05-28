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
    allCards.forEach((c, i) => { if (i >= 5) c.style.display = "none"; });
    readMoreBtn.style.display = "block";
    readMoreBtn.addEventListener("click", () => {
      allCards.forEach(c => c.style.display = "flex");
      readMoreBtn.style.display = "none";
    });
  }

  // --- Easter Egg: green wipe + secret prompt ---
  const eggBtn        = document.getElementById("egg-easter-egg");
  const gooeyOverlay  = document.getElementById("gooey-overlay");
  const secretPrompt  = document.getElementById("secret-code-prompt");
  const secretInput   = document.getElementById("secret-code-input");
  const secretSubmit  = document.getElementById("secret-code-submit");
  const secretError   = document.getElementById("secret-code-error");

  // Ensure overlay & prompt hidden initially
  gooeyOverlay.style.width = "0";
  secretPrompt.style.display = "none";

  eggBtn.addEventListener("click", () => {
    // grey out egg and disable further clicks
    eggBtn.disabled = true;
    eggBtn.style.filter = "grayscale(100%)";
    eggBtn.style.cursor = "default";

    // trigger the green wipe by expanding width
    gooeyOverlay.style.transition = "width 0.6s ease-in-out";
    gooeyOverlay.style.width = "100vw";

    // after wipe finishes, show prompt
    setTimeout(() => {
      secretPrompt.style.display = "flex";
      secretInput.focus();
    }, 650);
  });

  secretSubmit.addEventListener("click", checkSecretCode);
  secretInput.addEventListener("keydown", e => {
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
      return document.getElementById("flappy-bird-container").style.display = "flex";
    }

    // Container
    const container = document.createElement("div");
    container.id = "flappy-bird-container";
    Object.assign(container.style, {
      position: "fixed", top: 0, left: 0,
      width: "100vw", height: "100vh",
      background: "#70c5ce", zIndex: 10000,
      display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"
    });
    document.body.appendChild(container);

    // Exit button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Exit Game";
    Object.assign(closeBtn.style, {
      position: "absolute", top: "20px", right: "20px",
      padding: "8px 16px", fontSize: "16px", cursor: "pointer", zIndex: 10001
    });
    container.appendChild(closeBtn);

    // Canvas setup
    const canvas = document.createElement("canvas");
    canvas.width = 320; canvas.height = 480;
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let frames = 0, score = 0;
    const DEGREE = Math.PI / 180;
    const pipes = [], pipeWidth = 50, pipeGap = 120;

    const bird = {
      x: 50, y: 150, width: 34, height: 24,
      gravity: 0.25, jump: 4.6, speed: 0, rotation: 0,
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = "yellow";
        ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
        ctx.restore();
      },
      flap() { this.speed = -this.jump; },
      update() {
        this.speed += this.gravity;
        this.y += this.speed;
        if (this.y + this.height/2 >= canvas.height - 80) {
          this.y = canvas.height - 80 - this.height/2; this.speed = 0;
        }
        this.rotation = this.speed >= this.jump ? 90*DEGREE : -25*DEGREE;
      }
    };

    function createPipe() {
      const topH = Math.floor(Math.random()*(canvas.height-pipeGap-150))+50;
      pipes.push({ x: canvas.width, y: 0, width: pipeWidth, height: topH, passed: false });
      pipes.push({ x: canvas.width, y: topH+pipeGap, width: pipeWidth, height: canvas.height-(topH+pipeGap)-80 });
    }

    function loop() {
      // sky
      ctx.fillStyle = "#70c5ce";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      // ground
      ctx.fillStyle = "#ded895";
      ctx.fillRect(0,canvas.height-80,canvas.width,80);

      // pipes
      pipes.forEach((p, i) => {
        ctx.fillStyle = "green";
        ctx.fillRect(p.x, p.y, p.width, p.height);
        p.x -= 2;

        // collision
        if (bird.x+bird.width/2 > p.x && bird.x-bird.width/2 < p.x+p.width &&
            bird.y+bird.height/2 > p.y && bird.y-bird.height/2 < p.y+p.height) {
          resetGame();
          return;
        }
        // score
        if (!p.passed && p.x+p.width < bird.x && p.y===0) {
          score++; p.passed = true;
        }
      });

      // remove offscreen
      if (pipes.length && pipes[0].x+pipeWidth<0) pipes.splice(0,2);

      bird.update();
      bird.draw();

      if (frames%90===0) createPipe();

      // draw score
      ctx.fillStyle = "white";
      ctx.font = "24px Arial";
      ctx.fillText(`Score: ${score}`,10,30);

      frames++;
      requestAnimationFrame(loop);
    }

    function onSpace(e) {
      if (e.code==="Space"||e.type==="click") bird.flap();
    }
    window.addEventListener("keydown", onSpace);
    canvas.addEventListener("click", onSpace);

    closeBtn.addEventListener("click", () => {
      container.style.display = "none";
      window.removeEventListener("keydown", onSpace);
      canvas.removeEventListener("click", onSpace);
    });

    function resetGame() {
      alert(`Game over! Your score was ${score}.`);
      frames=0; pipes.length=0; bird.y=150; bird.speed=0; score=0;
    }

    loop();
  }
});

