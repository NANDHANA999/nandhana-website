"use client";

import { useEffect, useState, useRef } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bootLines = [
    "> Initializing Portfolio...",
    "> Loading neural networks...",
    "> Compiling code modules...",
    "> Establishing connections...",
    "> Mounting file systems...",
    "> nandhana.init_portfolio();",
    "> Ready.",
  ];

  // Digital rain on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 14);
    const drops: number[] = Array(cols).fill(1);
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";

    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(10, 15, 26, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const style = getComputedStyle(document.documentElement);
      const h = style.getPropertyValue("--primary").trim().split(" ")[0] || "199";
      ctx.fillStyle = `hsl(${h} 80% 50% / 0.6)`;
      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  // Boot sequence
  useEffect(() => {
    let lineIdx = 0;
    const lineInterval = setInterval(() => {
      if (lineIdx < bootLines.length) {
        setLines((prev) => [...prev, bootLines[lineIdx]]);
        lineIdx++;
      } else {
        clearInterval(lineInterval);
      }
    }, 300);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 2;
      });
    }, 40);

    const timeout = setTimeout(onComplete, 2800);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
      />
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center gap-6 px-6">
        {/* Logo */}
        <div className="mb-2 font-mono text-3xl font-bold tracking-tight text-primary neon-text">
          {"<N />"}
        </div>

        {/* Terminal output */}
        <div className="w-full rounded-lg border border-border bg-card/80 p-4 font-mono text-xs backdrop-blur-sm">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`${i === lines.length - 1 ? "text-primary" : "text-muted-foreground"}`}
            >
              {line}
              {i === lines.length - 1 && (
                <span className="ml-1 inline-block h-3 w-1.5 bg-primary animate-terminal-blink" />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="mb-2 flex justify-between font-mono text-xs text-muted-foreground">
            <span>Loading</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-100 neon-box"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
