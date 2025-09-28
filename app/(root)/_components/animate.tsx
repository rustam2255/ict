"use client";

import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvasRef.current!.getContext("2d")!;


    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    type Shape = {
      x: number;
      y: number;
      sides: number;
      size: number;
      angle: number;
      speed: number;
      color: string;
    };

    const shapes: Shape[] = [];
    const colors = [
      "#16a34a55", // emerald-600
      "#22c55e55", // green-500
      "#4ade8055", // lime-400
      "#3b82f655", // blue-500 (kamroq rang balansi uchun)
    ];

    // Ko‘proq 7–8 burchakli shakllar
    for (let i = 0; i < 25; i++) {
      const radius = Math.random() * Math.min(w, h) * 0.6; // markazdan uzoqlash
      const angle = Math.random() * Math.PI * 2;

      shapes.push({
        x: w / 2 + radius * Math.cos(angle),
        y: h / 2 + radius * Math.sin(angle),
        sides: Math.random() > 0.2 ? (Math.random() > 0.5 ? 7 : 8) : Math.floor(Math.random() * 5) + 3,
        size: Math.random() * 35 + 25,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function drawPolygon(
      x: number,
      y: number,
      sides: number,
      size: number,
      angle: number,
      color: string
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
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      shapes.forEach((s) => {
        s.angle += s.speed * 0.01;
        s.x += Math.cos(s.angle) * 0.2;
        s.y += Math.sin(s.angle) * 0.2;

        if (s.x < -50) s.x = w + 50;
        if (s.x > w + 50) s.x = -50;
        if (s.y < -50) s.y = h + 50;
        if (s.y > h + 50) s.y = -50;

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

export default AnimatedBackground;
