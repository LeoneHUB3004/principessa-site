const canvas = document.getElementById("magic");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const symbols = [];

  function createSymbol() {
    const types = ["💖","✨","⭐"];
    return {
      x: Math.random()*canvas.width,
      y: -20,
      speed: 1 + Math.random()*3,
      symbol: types[Math.floor(Math.random()*types.length)],
      size: 16 + Math.random()*20
    };
  }

  for (let i=0;i<80;i++) symbols.push(createSymbol());

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    symbols.forEach(s=>{
      ctx.font = s.size + "px serif";
      ctx.fillText(s.symbol,s.x,s.y);
      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = -20;
        s.x = Math.random()*canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}
