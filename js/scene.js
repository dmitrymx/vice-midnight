export function startScene(canvas) {
  const ctx = canvas.getContext("2d", { alpha: true });
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;
  const cars = Array.from({ length: 16 }, (_, index) => car(index));

  function car(index) {
    return {
      x: Math.random(),
      y: 0.72 + Math.random() * 0.22,
      speed: 0.04 + Math.random() * 0.12,
      len: 28 + Math.random() * 70,
      warm: index % 3 !== 0,
      alpha: 0.25 + Math.random() * 0.45,
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function skyline(now) {
    const base = height * 0.62;
    ctx.save();
    for (let i = 0; i < 18; i += 1) {
      const w = width * (0.035 + ((i * 37) % 5) * 0.012);
      const h = height * (0.08 + ((i * 53) % 9) * 0.028);
      const x = (i / 18) * width * 1.05 - 20;
      const hue = i % 2 === 0 ? "rgba(255,77,141,0.16)" : "rgba(122,246,255,0.1)";
      ctx.fillStyle = "rgba(8,6,16,0.55)";
      ctx.fillRect(x, base - h, w, h + 40);
      ctx.strokeStyle = hue;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + 0.5, base - h + 0.5, w - 1, h);
      const floors = Math.floor(h / 16);
      for (let f = 0; f < floors; f += 1) {
        const flicker = Math.sin(now / 700 + i * 2 + f) > 0.2;
        ctx.fillStyle = flicker ? "rgba(255,196,138,0.55)" : "rgba(255,77,141,0.18)";
        ctx.fillRect(x + 6, base - h + 8 + f * 16, Math.max(4, w * 0.28), 3);
      }
    }
    ctx.restore();
  }

  function palm(x, ground, scale) {
    ctx.save();
    ctx.translate(x, ground);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "rgba(7,4,12,0.72)";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.quadraticCurveTo(18, -40, 8, -120);
    ctx.stroke();
    ctx.lineWidth = 3;
    const crowns = [
      [-70, -18],
      [-40, -48],
      [10, -58],
      [54, -36],
      [78, -6],
    ];
    crowns.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.moveTo(8, -108);
      ctx.quadraticCurveTo(cx * 0.4, -120 + cy * 0.2, cx, -110 + cy);
      ctx.stroke();
    });
    ctx.restore();
  }

  function draw(now) {
    ctx.clearRect(0, 0, width, height);
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, "rgba(18,8,32,0.2)");
    sky.addColorStop(0.45, "rgba(48,12,42,0.08)");
    sky.addColorStop(1, "rgba(0,0,0,0.28)");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(width * 0.72, height * 0.78, 20, width * 0.72, height * 0.78, width * 0.45);
    glow.addColorStop(0, "rgba(255,77,141,0.28)");
    glow.addColorStop(0.45, "rgba(92,24,78,0.08)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    const moonX = width * 0.78;
    const moonY = height * 0.18;
    const moon = ctx.createRadialGradient(moonX, moonY, 8, moonX, moonY, 90);
    moon.addColorStop(0, "rgba(255,214,170,0.9)");
    moon.addColorStop(0.4, "rgba(255,120,150,0.28)");
    moon.addColorStop(1, "rgba(255,80,140,0)");
    ctx.fillStyle = moon;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 90, 0, Math.PI * 2);
    ctx.fill();

    skyline(now);

    ctx.strokeStyle = "rgba(122,246,255,0.16)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.64);
    ctx.lineTo(width, height * 0.64);
    ctx.stroke();

    cars.forEach((item) => {
      item.x += item.speed * 0.0028;
      if (item.x > 1.15) item.x = -0.2;
      const x = item.x * width;
      const y = item.y * height;
      const grad = ctx.createLinearGradient(x, y, x + item.len, y);
      const color = item.warm ? "255,77,141" : "122,246,255";
      grad.addColorStop(0, `rgba(${color},0)`);
      grad.addColorStop(1, `rgba(${color},${item.alpha})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + item.len, y);
      ctx.stroke();
    });

    palm(width * 0.08, height * 0.96, width < 700 ? 0.7 : 1);
    palm(width * 0.94, height * 0.98, width < 700 ? 0.85 : 1.15);

    if (!reduce) frame = requestAnimationFrame(draw);
  }

  resize();
  draw(performance.now());
  window.addEventListener("resize", resize, { passive: true });
  return () => cancelAnimationFrame(frame);
}
