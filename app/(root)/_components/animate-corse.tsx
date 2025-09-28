"use client";

import React, { useEffect, useRef } from "react";

const CourseBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    type Shape = {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      sides: number;
      size: number;
      angle: number;
      orbit: number;
      speed: number;
      pulse: number;
      color: CanvasGradient | string;
    };

    const shapes: Shape[] = [];

    // Gradient palitra (asosan yashil ohanglarda)
    const colors = [
      ["#34d399AA", "#059669AA"],
      ["#10b981AA", "#047857AA"],
      ["#22c55eAA", "#166534AA"],
      ["#4ade80AA", "#065f46AA"],
    ];

    for (let i = 0; i < 20; i++) {
      const gradient = ctx.createLinearGradient(0, 0, 100, 100);
      const [c1, c2] = colors[Math.floor(Math.random() * colors.length)];
      gradient.addColorStop(0, c1);
      gradient.addColorStop(1, c2);

      const baseX = Math.random() * w;
      const baseY = Math.random() * h;

      shapes.push({
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        sides: Math.random() > 0.3 ? 8 : 7,
        size: Math.random() * 35 + 25,
        angle: Math.random() * Math.PI * 2,
        orbit: Math.random() * 80 + 40,
        speed: (Math.random() - 0.5) * 0.004,
        pulse: Math.random() * 0.03 + 0.01,
        color: gradient,
      });
    }

    function drawPolygon(
      x: number,
      y: number,
      sides: number,
      size: number,
      angle: number,
      color: CanvasGradient | string
    ) {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const theta = (i / sides) * Math.PI * 2 + angle;
        const px = x + size * Math.cos(theta);
        const py = y + size * Math.sin(theta);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = color as string;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#22c55e55";
      ctx.stroke();
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      shapes.forEach((s) => {
        s.angle += s.speed;
        const offsetX = Math.cos(s.angle) * s.orbit;
        const offsetY = Math.sin(s.angle) * s.orbit;
        const pulseSize = Math.sin(Date.now() * s.pulse * 0.1) * 5;

        s.x = s.baseX + offsetX;
        s.y = s.baseY + offsetY;

        drawPolygon(s.x, s.y, s.sides, s.size + pulseSize, s.angle, s.color);
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
};

export default CourseBackground;
