"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

const roles = [
  "Python Developer",
  "Frontend Developer",
  "Data Structures Enthusiast",
  "Future Software Engineer",
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
  }, [text, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-6"
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-block rounded-full border border-border bg-secondary/50 px-4 py-1.5">
          <span className="font-mono text-xs text-primary">
            {"Computer Science @ GCE Bodinayakanur"}
          </span>
        </div>

        <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {"Hi, I'm "}
          <span className="text-primary">Nandhana</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          I turn ideas into code and problems into solutions.
        </p>

        <div className="mb-12 flex h-10 items-center justify-center">
          <span className="font-mono text-lg text-primary md:text-2xl">
            {text}
          </span>
          <span className="ml-0.5 inline-block h-6 w-0.5 animate-glow-pulse bg-primary md:h-7" />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
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
    </section>
  );
}
