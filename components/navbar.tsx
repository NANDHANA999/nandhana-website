"use client";

import { useState, useEffect } from "react";
import { Menu, X, Palette, Keyboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const themeLabels = {
  cyberpunk: "Cyberpunk",
  synthwave: "Synthwave",
  matrix: "Matrix",
} as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const { theme, cycleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-mono text-lg font-bold tracking-tight text-primary neon-text"
        >
          {"<Nandhana />"}
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-sm text-muted-foreground transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={cycleTheme}
            className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
            aria-label={`Switch theme. Current: ${themeLabels[theme]}`}
          >
            <Palette size={14} />
            <span className="font-mono">{themeLabels[theme]}</span>
          </button>

          {/* Keyboard shortcut hint */}
          <button
            type="button"
            onClick={() => setShowShortcuts((p) => !p)}
            className="flex items-center justify-center rounded-lg border border-border bg-secondary/50 p-1.5 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
            aria-label="Show keyboard shortcuts"
          >
            <Keyboard size={14} />
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={cycleTheme}
            className="flex items-center justify-center rounded-lg border border-border bg-secondary/50 p-2 text-muted-foreground transition-all hover:text-primary"
            aria-label={`Switch theme. Current: ${themeLabels[theme]}`}
          >
            <Palette size={16} />
          </button>
          <button
            type="button"
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-lg md:hidden">
          <ul className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-base text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Shortcuts popup */}
      {showShortcuts && (
        <div className="absolute top-full right-6 mt-2 rounded-xl border border-border bg-card/95 p-5 shadow-lg backdrop-blur-sm neon-box">
          <div className="mb-3 flex items-center justify-between gap-6">
            <span className="font-mono text-xs font-bold text-primary">
              Keyboard Shortcuts
            </span>
            <button
              type="button"
              onClick={() => setShowShortcuts(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { keys: "Ctrl+A", label: "About" },
              { keys: "Ctrl+S", label: "Skills" },
              { keys: "Ctrl+P", label: "Projects" },
              { keys: "Ctrl+C", label: "Contact" },
            ].map((s) => (
              <div key={s.keys} className="flex items-center gap-3">
                <kbd className="inline-flex h-6 min-w-[4rem] items-center justify-center rounded border border-border bg-secondary px-2 font-mono text-xs text-foreground">
                  {s.keys}
                </kbd>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
