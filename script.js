function normalizeAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function setupEnterKey(inputId, callback) {
  const input = document.getElementById(inputId);
  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") callback();
  });
}

function typeMagicText(elementId, text) {
  const el = document.getElementById(elementId);
  let i = 0;
  el.textContent = "";

  function write() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(write, 34);
    }
  }

  write();
}

const canvas = document.getElementById("magic");

if (canvas) {
  const ctx = canvas.getContext("2d");
  const symbols = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function createSymbol() {
    const types = ["💖", "✨", "⭐", "💛"];
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      speed: 0.8 + Math.random() * 2.2,
      symbol: types[Math.floor(Math.random() * types.length)],
      size: 15 + Math.random() * 22,
      drift: -0.6 + Math.random() * 1.2
    };
  }

  for (let i = 0; i < 95; i++) {
    symbols.push(createSymbol());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    symbols.forEach(s => {
      ctx.font = s.size + "px serif";
      ctx.fillText(s.symbol, s.x, s.y);
      s.y += s.speed;
      s.x += s.drift;

      if (s.y > canvas.height + 30 || s.x < -40 || s.x > canvas.width + 40) {
        Object.assign(s, createSymbol());
        s.y = -30;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}
