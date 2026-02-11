"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  char: string;
}

const chars = "01{}()<>/;=+-*&|~";

export function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (frame.current % 3 === 0) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          char: chars[Math.floor(Math.random() * chars.length)],
        });
      }
      frame.current++;
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const style = getComputedStyle(document.documentElement);
      const primaryHsl = style.getPropertyValue("--primary").trim();

      particles.current = particles.current.filter((p) => p.life < p.maxLife);

      for (const p of particles.current) {
        const alpha = 1 - p.life / p.maxLife;
        ctx.font = `${10 + (1 - alpha) * 4}px monospace`;
        ctx.fillStyle = `hsl(${primaryHsl} / ${alpha * 0.6})`;
        ctx.fillText(p.char, p.x, p.y - p.life * 0.5);
        p.life++;
      }

      requestAnimationFrame(animate);
    };

    const anim = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(anim);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      aria-hidden="true"
    />
  );
}
