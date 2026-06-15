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
      size: 14 + Math.random() * 18
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

      if (s.y > canvas.height + 30) {
        s.y = -30;
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
