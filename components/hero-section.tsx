"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowDown } from "lucide-react";

const terminalLines = [
  { text: "> nandhana.init_portfolio();", delay: 0 },
  { text: "Loading...", delay: 600 },
  { text: "> portfolio.display();", delay: 1200 },
  { text: "===========================================", delay: 1800 },
  { text: "  IDENTITY : Nandhana S", delay: 2000 },
  { text: "  ROLE     : Computer Science Innovator", delay: 2200 },
  { text: "  LOCATION : GCE Bodinayakanur", delay: 2400 },
  { text: "  STATUS   : Building Tomorrow's Solutions", delay: 2600 },
  { text: "===========================================", delay: 2800 },
];

const roles = [
  "Python Developer",
  "Frontend Developer",
  "Data Structures Enthusiast",
  "Future Software Engineer",
];

export function HeroSection() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [terminalDone, setTerminalDone] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  // Terminal boot sequence
  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === terminalLines.length - 1) {
          setTimeout(() => setTerminalDone(true), 600);
        }
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!terminalDone) return;
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else {
      timeout = setTimeout(
        () => setText(currentRole.slice(0, text.length + 1)),
        80
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, terminalDone]);

  // Live clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center px-6"
    >
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        {/* Terminal window */}
        <div className="mb-8 overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-sm neon-box">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-destructive/70" />
            <div className="h-3 w-3 rounded-full bg-chart-4/70" />
            <div className="h-3 w-3 rounded-full bg-chart-2/70" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              nandhana@portfolio ~ %
            </span>
            <span className="ml-auto font-mono text-xs text-muted-foreground">
              {currentTime}
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-5 font-mono text-sm leading-relaxed md:p-6">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={`${
                  line.text.startsWith(">")
                    ? "text-primary"
                    : line.text.startsWith("=")
                      ? "text-primary/50"
                      : line.text.includes(":")
                        ? "text-foreground"
                        : "text-muted-foreground"
                } animate-fade-in`}
              >
                {line.text.includes(":") && !line.text.startsWith("=") ? (
                  <>
                    <span className="text-muted-foreground">
                      {line.text.split(":")[0]}:
                    </span>
                    <span className="text-primary">
                      {line.text.split(":").slice(1).join(":")}
                    </span>
                  </>
                ) : (
                  line.text
                )}
              </div>
            ))}
            {visibleLines === terminalLines.length && (
              <div className="mt-2 text-primary">
                {">"}{" "}
                <span className="animate-terminal-blink inline-block h-4 w-2 bg-primary" />
              </div>
            )}
          </div>
        </div>

        {/* Main content - appears after terminal */}
        <div
          className={`text-center transition-all duration-1000 ${
            terminalDone
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {"Hi, I'm "}
            <span className="text-primary neon-text">Nandhana</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            I turn ideas into code and problems into solutions.
          </p>

          <div className="mb-12 flex h-10 items-center justify-center">
            <span className="font-mono text-lg text-primary neon-text md:text-2xl">
              {text}
            </span>
            <span className="ml-0.5 inline-block h-6 w-0.5 animate-glow-pulse bg-primary md:h-7" />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 neon-box"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              Get In Touch
            </a>
          </div>

          <a
            href="#about"
            className="mt-16 inline-flex animate-float items-center justify-center text-muted-foreground transition-colors hover:text-primary"
            aria-label="Scroll to about section"
          >
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
