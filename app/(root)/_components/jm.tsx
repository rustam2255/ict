"use client";

import React, { useRef, useEffect } from "react";

const ConnectedPolygonsBackground = () => {
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
      vx: number;
      vy: number;
      sides: number;
      size: number;
      angle: number;
      color: string;
    };

    const shapes: Shape[] = [];
    const colors = ["#22c55e55", "#16a34a55", "#4ade8055"]; // turli yashil soyalar

    // 🔥 Shakllar sonini oshiramiz (40 → ko‘p bo‘lib chiqadi)
    for (let i = 0; i < 40; i++) {
      shapes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, // sekin harakat
        vy: (Math.random() - 0.5) * 0.4,
        sides: Math.floor(Math.random() * 5) + 5, // 5–9 burchak
        size: Math.random() * 30 + 25, // kattaroq: 25–55px
        angle: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function drawPolygon(x: number, y: number, sides: number, size: number, angle: number, color: string) {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const theta = (i / sides) * Math.PI * 2 + angle;
        const px = x + size * Math.cos(theta);
        const py = y + size * Math.sin(theta);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3;
      ctx.stroke();
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);

      // chiziqlar
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const dx = shapes[i].x - shapes[j].x;
          const dy = shapes[i].y - shapes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) { // tutashish radiusini kattalashtirdim
            ctx.beginPath();
            ctx.moveTo(shapes[i].x, shapes[i].y);
            ctx.lineTo(shapes[j].x, shapes[j].y);
            ctx.strokeStyle = "rgba(34,197,94,0.18)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // shakllar
      shapes.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.angle += 0.003; // sekin aylanish

        if (s.x < 0 || s.x > w) s.vx *= -1;
        if (s.y < 0 || s.y > h) s.vy *= -1;

        drawPolygon(s.x, s.y, s.sides, s.size, s.angle, s.color);
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

export default ConnectedPolygonsBackground;
