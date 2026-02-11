"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Terminal } from "lucide-react";

function BinaryRain() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cols = 30;
    const streams: HTMLSpanElement[] = [];

    for (let i = 0; i < cols; i++) {
      const span = document.createElement("span");
      span.className =
        "absolute top-0 font-mono text-xs text-primary/20 leading-none select-none pointer-events-none";
      span.style.left = `${(i / cols) * 100}%`;
      span.style.animationDuration = `${3 + Math.random() * 4}s`;
      span.style.animationDelay = `${Math.random() * 3}s`;
      span.style.animation = `digital-rain ${3 + Math.random() * 4}s linear ${Math.random() * 3}s infinite`;

      let text = "";
      for (let j = 0; j < 20; j++) {
        text += Math.random() > 0.5 ? "1" : "0";
        if (j < 19) text += "\n";
      }
      span.textContent = text;
      span.style.whiteSpace = "pre";

      el.appendChild(span);
      streams.push(span);
    }

    return () => {
      streams.forEach((s) => s.remove());
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden opacity-30"
      aria-hidden="true"
    />
  );
}

export function Footer() {
  const [showExit, setShowExit] = useState(false);

  return (
    <footer className="relative z-10 overflow-hidden border-t border-border px-6 py-12">
      <BinaryRain />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* System status */}
        <div className="mb-8 rounded-xl border border-border bg-card/50 p-5 font-mono text-xs backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Terminal size={14} />
            <span className="font-bold">System Status</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-chart-2 animate-glow-pulse" />
              <span className="text-muted-foreground">
                System:{" "}
                <span className="text-foreground">OPERATIONAL</span>
              </span>
            </div>
            <div className="text-muted-foreground">
              Last Project:{" "}
              <span className="text-foreground">2 days ago</span>
            </div>
            <div className="text-muted-foreground">
              Current Focus:{" "}
              <span className="text-foreground">Advanced Algorithms</span>
            </div>
            <div className="text-muted-foreground">
              Next Goal:{" "}
              <span className="text-primary">Internship 2026</span>
            </div>
          </div>
        </div>

        {/* Footer content */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              Designed & Developed by{" "}
              <span className="font-semibold text-primary neon-text">
                Nandhana
              </span>
              <Heart
                size={14}
                className="text-primary"
                aria-hidden="true"
              />
            </p>
            <p className="font-mono text-xs text-muted-foreground/60">
              {"Built with Next.js, Tailwind CSS & lots of coffee"}
            </p>
          </div>

          {/* Retro exit terminal */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowExit(true)}
              className="rounded-lg border border-border bg-secondary/50 px-4 py-2 font-mono text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
            >
              {"exit();"}
            </button>
            <a
              href="#hero"
              className="rounded-lg border border-border bg-secondary/50 px-4 py-2 font-mono text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
            >
              {"scrollToTop();"}
            </a>
          </div>
        </div>

        {/* Exit overlay */}
        {showExit && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="font-mono text-sm text-primary animate-flicker">
                {">"} Shutting down...
              </div>
              <div className="font-mono text-xs text-muted-foreground">
                Just kidding! Thanks for visiting.
              </div>
              <button
                type="button"
                onClick={() => setShowExit(false)}
                className="mt-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
              >
                {"reboot();"}
              </button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
