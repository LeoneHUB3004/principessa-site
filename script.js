function goToPage(page) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = page;
  }, 430);
}

function startMusic() {
  const music = document.getElementById("bgMusic");
  if (!music) return;

  music.volume = 0.28;
  music.play().catch(() => {});
}

document.addEventListener("click", () => {
  if (sessionStorage.getItem("musicAllowed") === "yes") {
    startMusic();
  }
}, { once: true });

window.addEventListener("load", () => {
  if (sessionStorage.getItem("musicAllowed") === "yes") {
    startMusic();
  }

  const typewriter = document.querySelector(".typewriter-text");
  if (typewriter) {
    const text = typewriter.dataset.text || "";
    let index = 0;

    function writeLetter() {
      if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(writeLetter, 32);
      } else {
        typewriter.classList.add("finished");
      }
    }

    writeLetter();
  }
});

const canvas = document.getElementById("magic");

if (canvas) {
  const ctx = canvas.getContext("2d");
  let symbols = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createSymbol() {
    const types = ["💖", "✨", "⭐", "💛"];
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      speed: 0.8 + Math.random() * 2,
      symbol: types[Math.floor(Math.random() * types.length)],
      size: 14 + Math.random() * 18,
      drift: -0.4 + Math.random() * 0.8
    };
  }

  function initSymbols() {
    symbols = [];
    for (let i = 0; i < 70; i++) {
      symbols.push(createSymbol());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    symbols.forEach((s) => {
      ctx.font = s.size + "px serif";
      ctx.fillText(s.symbol, s.x, s.y);
      s.y += s.speed;
      s.x += s.drift;

      if (s.y > canvas.height + 30) {
        s.y = -30;
        s.x = Math.random() * canvas.width;
      }

      if (s.x < -30 || s.x > canvas.width + 30) {
        s.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  resizeCanvas();
  initSymbols();
  animate();

  window.addEventListener("resize", () => {
    resizeCanvas();
    initSymbols();
  });
}
