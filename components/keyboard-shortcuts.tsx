"use client";

import { useEffect, useState } from "react";

const shortcuts = [
  { key: "p", section: "projects", label: "Projects" },
  { key: "s", section: "skills", label: "Skills" },
  { key: "c", section: "contact", label: "Contact" },
  { key: "a", section: "about", label: "About" },
];

export function KeyboardShortcuts() {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Only trigger with Ctrl key
      if (!e.ctrlKey) return;

      for (const s of shortcuts) {
        if (e.key === s.key) {
          e.preventDefault();
          const el = document.getElementById(s.section);
          if (el) el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }

      // Ctrl+/ to show hint
      if (e.key === "/") {
        e.preventDefault();
        setShowHint((p) => !p);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!showHint) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] rounded-xl border border-border bg-card/95 p-5 shadow-lg backdrop-blur-sm neon-box">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-xs font-bold text-primary">
          Keyboard Shortcuts
        </span>
        <button
          type="button"
          onClick={() => setShowHint(false)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Close
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {shortcuts.map((s) => (
          <div key={s.key} className="flex items-center gap-3">
            <kbd className="inline-flex h-6 min-w-[4rem] items-center justify-center rounded border border-border bg-secondary px-2 font-mono text-xs text-foreground">
              Ctrl+{s.key.toUpperCase()}
            </kbd>
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <kbd className="inline-flex h-6 min-w-[4rem] items-center justify-center rounded border border-border bg-secondary px-2 font-mono text-xs text-foreground">
            Ctrl+/
          </kbd>
          <span className="text-xs text-muted-foreground">Toggle hints</span>
        </div>
      </div>
    </div>
  );
}
