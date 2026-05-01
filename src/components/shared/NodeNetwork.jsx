import { useEffect, useRef } from "react";

export default function NodeNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let nodes = [];

    const primary = { r: 34, g: 211, b: 238 };   // cyan ~hsl(195 85% 52%)
    const ACCENT  = { r: 251, g: 191, b: 36  };   // amber

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function buildNodes() {
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      nodes = Array.from({ length: Math.max(80, Math.min(count, 200)) }, () => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.10,
        r:  Math.random() * 3 + 1.5,
        // randomly pick primary or accent colour
        color: Math.random() > 0.15 ? primary : ACCENT,
        pulse: Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const maxDist = 220;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.pulse += 0.015;

        // move
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > canvas.width)  a.vx *= -1;
        if (a.y < 0 || a.y > canvas.height) a.vy *= -1;

        // draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            const { r, g, b: blue } = a.color;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${r},${g},${blue},${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // draw node
        const pulse = 0.6 + 0.4 * Math.sin(a.pulse);
        const { r, g, b: blue } = a.color;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${blue},${0.9 * pulse})`;
        ctx.fill();

        // soft glow
        const grd = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.r * 5 * pulse);
        grd.addColorStop(0, `rgba(${r},${g},${blue},${0.3 * pulse})`);
        grd.addColorStop(1, `rgba(${r},${g},${blue},0)`);
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r * 5 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    buildNodes();
    draw();

    const onResize = () => { resize(); buildNodes(); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.48 }}
    />
  );
}