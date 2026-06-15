function getMusic() {
  return document.getElementById("bgMusic");
}

function updateMusicButton() {
  const btn = document.getElementById("musicButton");
  const music = getMusic();
  if (!btn || !music) return;

  if (!music.paused) {
    btn.textContent = "🔊";
    btn.classList.add("playing");
  } else {
    btn.textContent = "🎵";
    btn.classList.remove("playing");
  }
}

function activateMusic() {
  sessionStorage.setItem("musicAllowed", "yes");
  sessionStorage.setItem("musicPlaying", "yes");
  startMusic();
}

function startMusic() {
  const music = getMusic();
  if (!music) return;

  music.volume = 0.28;

  const savedTime = sessionStorage.getItem("musicTime");
  if (savedTime && !Number.isNaN(Number(savedTime))) {
    try {
      music.currentTime = Number(savedTime);
    } catch (e) {}
  }

  music.play()
    .then(() => {
      sessionStorage.setItem("musicPlaying", "yes");
      updateMusicButton();
    })
    .catch(() => {
      updateMusicButton();
    });
}

function pauseMusic() {
  const music = getMusic();
  if (!music) return;

  music.pause();
  sessionStorage.setItem("musicPlaying", "no");
  updateMusicButton();
}

function toggleMusic() {
  const music = getMusic();
  if (!music) return;

  sessionStorage.setItem("musicAllowed", "yes");

  if (music.paused) {
    startMusic();
  } else {
    pauseMusic();
  }
}

function saveMusicTime() {
  const music = getMusic();
  if (music) {
    sessionStorage.setItem("musicTime", String(music.currentTime || 0));
  }
}

function goToPage(page) {
  saveMusicTime();
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = page;
  }, 430);
}

window.addEventListener("beforeunload", saveMusicTime);

window.addEventListener("load", () => {
  const music = getMusic();

  if (music) {
    music.addEventListener("timeupdate", saveMusicTime);
    music.addEventListener("play", updateMusicButton);
    music.addEventListener("pause", updateMusicButton);
  }

  if (
    sessionStorage.getItem("musicAllowed") === "yes" &&
    sessionStorage.getItem("musicPlaying") === "yes"
  ) {
    startMusic();
  } else {
    updateMusicButton();
  }

  const typewriter = document.querySelector(".typewriter-text");
  if (typewriter) {
    const text = typewriter.dataset.text || "";
    let index = 0;

    function writeLetter() {
      if (index < text.length) {
        typewriter.textContent += text.charAt(index);
        index++;
        setTimeout(writeLetter, 28);
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
    const smallScreen = window.innerWidth < 600;
    const types = ["💖", "✨", "⭐", "💛"];
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      speed: 0.7 + Math.random() * 1.8,
      symbol: types[Math.floor(Math.random() * types.length)],
      size: (smallScreen ? 12 : 14) + Math.random() * (smallScreen ? 14 : 18),
      drift: -0.35 + Math.random() * 0.7
    };
  }

  function initSymbols() {
    symbols = [];
    const count = window.innerWidth < 600 ? 42 : 70;
    for (let i = 0; i < count; i++) {
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
