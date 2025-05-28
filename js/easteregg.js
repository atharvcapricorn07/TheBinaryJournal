if (window.innerWidth > 768) {
  const eggBtn = document.getElementById('easterEggBtn');
  const overlay = document.getElementById('easterEggOverlay');
  const prompt = document.getElementById('codePrompt');
  const input = document.getElementById('secretCodeInput');
  const errorMsg = document.getElementById('errorMsg');
  const flappyContainer = document.getElementById('flappyContainer');
  const canvas = document.getElementById('flappyCanvas');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const exitBtn = document.getElementById('exitGameBtn');
  const ctx = canvas.getContext('2d');

  let isGameReady = false;
  let isGameRunning = false;

  function resizeCanvas() {
    canvas.width = 600;
    canvas.height = 750;
  }

  resizeCanvas();

  eggBtn.addEventListener('click', () => {
    overlay.classList.add('show');
    setTimeout(() => {
      prompt.classList.add('show');
    }, 400);
  });

  function cancelAndRedirect() {
    overlay.classList.remove('show');
    prompt.classList.remove('show');
    flappyContainer.classList.remove('show');
    isGameReady = false;
    isGameRunning = false;
    setTimeout(() => {
      window.location.href = 'https://atharvcapricorn07.github.io/TheBinaryJournal/index.html';
    }, 300);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cancelAndRedirect();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cancelAndRedirect();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (input.value === '0701') {
        prompt.classList.remove('show');
        setTimeout(() => {
          flappyContainer.classList.remove('fade-out');
          flappyContainer.classList.add('show');
          isGameReady = true;
        }, 300);
      } else {
        errorMsg.textContent = 'Wrong code';
        errorMsg.style.display = 'block';
      }
    }
  });

  let bird = { x: 50, y: 200, width: 20, height: 20, velocity: 0 };
  const gravity = 0.4;
  const lift = -8;
  let pipes = [];
  let frame = 0;
  let score = 0;
  let gameOver = false;

  function startFlappyGame() {
    score = 0;
    gameOver = false;
    pipes = [];
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    frame = 0;
    scoreDisplay.textContent = '';
    exitBtn.style.display = 'none';
    isGameRunning = true;
    resizeCanvas();
    requestAnimationFrame(updateGame);
  }

  function endGame() {
    scoreDisplay.textContent = 'Game Over! Score: ' + score;
    exitBtn.style.display = 'inline-block';
    isGameRunning = false;
  }

  exitBtn.addEventListener('click', () => {
    flappyContainer.classList.remove('show');
    flappyContainer.classList.add('fade-out');
    isGameReady = false;
    setTimeout(() => {
      overlay.classList.remove('show');
    }, 400);
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      if (isGameReady && !isGameRunning) {
        startFlappyGame();
      }
      if (isGameRunning) {
        bird.velocity = lift;
      }
    }
  });

  canvas.addEventListener('click', () => {
    if (isGameRunning) {
      bird.velocity = lift;
    }
  });

  function updateGame() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.velocity += gravity;
    bird.y += bird.velocity;
    ctx.fillStyle = '#ff0';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    if (frame % 100 === 0) {
      const gap = 160;
      const width = 50;
      const top = Math.random() * (canvas.height - gap);
      pipes.push({ x: canvas.width, y: 0, width, height: top });
      pipes.push({ x: canvas.width, y: top + gap, width, height: canvas.height - top - gap });
    }

    for (let p of pipes) {
      p.x -= 1.5;
      ctx.fillStyle = '#0a0';
      ctx.fillRect(p.x, p.y, p.width, p.height);

      if (
        bird.x < p.x + p.width &&
        bird.x + bird.width > p.x &&
        bird.y < p.y + p.height &&
        bird.y + bird.height > p.y
      ) {
        gameOver = true;
      }

      if (p.x + p.width === bird.x) {
        score++;
      }
    }

    if (bird.y + bird.height > canvas.height || bird.y < 0) {
      gameOver = true;
    }

    frame++;

    if (!gameOver) {
      requestAnimationFrame(updateGame);
    } else {
      endGame();
    }
  }
}
