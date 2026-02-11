"use client";

import { useEffect, useState, useCallback } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function KonamiCode() {
  const [index, setIndex] = useState(0);
  const [activated, setActivated] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (activated) return;
      if (e.key === KONAMI[index]) {
        const next = index + 1;
        if (next === KONAMI.length) {
          setActivated(true);
          setVisible(true);
          setIndex(0);
        } else {
          setIndex(next);
        }
      } else {
        setIndex(0);
      }
    },
    [index, activated]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setVisible(false), 6000);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-md">
      <div className="relative flex flex-col items-center gap-6 rounded-2xl border border-primary/40 bg-card p-10 neon-box">
        <div className="absolute -top-3 rounded-full bg-primary px-4 py-1 font-mono text-xs font-bold text-primary-foreground">
          SECRET UNLOCKED
        </div>
        <div className="font-mono text-5xl font-bold text-primary neon-text">
          {"<N />"}
        </div>
        <div className="max-w-sm text-center">
          <p className="mb-3 text-lg font-semibold text-foreground">
            {"You found the secret!"}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {
              "Nandhana's hidden dev diary: Started coding at 17, fell in love with Python's elegance, debugged 1,247 errors (and counting), and dreams of building AI that makes the world a better place."
            }
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-md bg-secondary px-3 py-1.5 font-mono text-xs text-muted-foreground">
            Bugs Squashed: 1,247
          </div>
          <div className="rounded-md bg-secondary px-3 py-1.5 font-mono text-xs text-muted-foreground">
            Coffee Cups: 892
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            setActivated(false);
          }}
          className="mt-2 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
        >
          Close
        </button>
      </div>
    </div>
  );
}
