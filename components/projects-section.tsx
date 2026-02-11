"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import {
  ExternalLink,
  Github,
  Activity,
  Users,
  Clock,
  Star,
} from "lucide-react";

const projects = [
  {
    title: "Smart Task Manager",
    description:
      "A full-featured task management app with user authentication, priority-based sorting, and persistent data storage using SQLite.",
    tech: ["Python", "SQL", "Tkinter"],
    github: "#",
    demo: "#",
    stats: { tasks: "1,247", uptime: "99.8%", users: "50+" },
    orbitColor: "bg-chart-1",
    orbitDuration: "20s",
    orbitRadius: "120px",
  },
  {
    title: "College Event Website",
    description:
      "A responsive and animated website for showcasing college events, with smooth scrolling, image galleries, and registration forms.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "#",
    stats: { visitors: "2,340", pages: "12", events: "8" },
    orbitColor: "bg-chart-2",
    orbitDuration: "25s",
    orbitRadius: "160px",
  },
  {
    title: "Algorithm Visualizer",
    description:
      "An interactive tool that animates popular sorting and pathfinding algorithms to help understand how they work step by step.",
    tech: ["JavaScript", "HTML Canvas", "CSS"],
    github: "#",
    demo: "#",
    stats: { algorithms: "15", speed: "60fps", demos: "200+" },
    orbitColor: "bg-chart-4",
    orbitDuration: "30s",
    orbitRadius: "200px",
  },
];

function AnimatedCounter({
  end,
  duration = 2000,
  active,
}: {
  end: string;
  duration?: number;
  active: boolean;
}) {
  const [count, setCount] = useState("0");

  useEffect(() => {
    if (!active) return;

    // Extract numeric part
    const numMatch = end.match(/[\d,]+/);
    if (!numMatch) {
      setCount(end);
      return;
    }

    const numStr = numMatch[0].replace(/,/g, "");
    const target = parseInt(numStr, 10);
    const suffix = end.replace(numMatch[0], "");
    const prefix = end.substring(0, end.indexOf(numMatch[0]));

    if (isNaN(target)) {
      setCount(end);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      setCount(
        `${prefix}${current.toLocaleString()}${suffix}`
      );
      if (progress >= 1) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [active, end, duration]);

  return <span>{count}</span>;
}

function ProjectOrbit({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative mx-auto mb-16 hidden h-[420px] w-[420px] items-center justify-center lg:flex">
      {/* Center star */}
      <div className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-card neon-box">
        <Star size={24} className="text-primary animate-glow-pulse" />
      </div>

      {/* Orbit rings */}
      {[120, 160, 200].map((r) => (
        <div
          key={r}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/30"
          style={{ width: r * 2, height: r * 2 }}
        />
      ))}

      {/* Orbiting planets */}
      {projects.map((p, i) => {
        const radius = [120, 160, 200][i];
        const duration = [20, 25, 30][i];
        const size = [36, 32, 28][i];

        return (
          <div
            key={p.title}
            className={`absolute left-1/2 top-1/2 transition-opacity duration-1000 ${
              isInView ? "opacity-100" : "opacity-0"
            }`}
            style={{
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              animation: isInView
                ? `orbit ${duration}s linear infinite`
                : "none",
              // @ts-expect-error -- CSS custom properties
              "--orbit-radius": `${radius}px`,
              animationDelay: `${i * -5}s`,
            }}
          >
            <div
              className={`flex h-full w-full items-center justify-center rounded-full ${p.orbitColor} neon-box`}
              title={p.title}
            >
              <span className="text-xs font-bold text-primary-foreground">
                {p.title.charAt(0)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.05 });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative z-10 px-6 py-24 md:py-32"
    >
      <div
        className={`mx-auto max-w-6xl transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-4 text-center">
          <span className="font-mono text-sm text-primary neon-text">
            {"// Project Galaxy"}
          </span>
        </div>
        <h2 className="mb-3 text-center text-3xl font-bold text-foreground md:text-4xl">
          Featured Work
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-lg text-muted-foreground">
          Each project orbits the Nandhana Star -- hover to explore.
        </p>

        {/* Orbital visualization */}
        <ProjectOrbit isInView={isInView} />

        {/* Project Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-500 ${
                expandedProject === i
                  ? "border-primary/60 neon-box"
                  : "border-border hover:border-primary/40"
              } bg-card/50 backdrop-blur-sm`}
              style={{
                transitionDelay: isInView ? `${i * 150}ms` : "0ms",
              }}
              onMouseEnter={() => setExpandedProject(i)}
              onMouseLeave={() => setExpandedProject(null)}
            >
              {/* Glow line at top */}
              <div
                className={`h-1 w-full transition-all duration-300 ${
                  expandedProject === i
                    ? "bg-primary neon-box"
                    : "bg-primary/0 group-hover:bg-primary/60"
                }`}
              />

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {/* Live stats */}
                <div className="mb-5 grid grid-cols-3 gap-2">
                  {Object.entries(project.stats).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex flex-col items-center rounded-lg bg-secondary/50 p-2"
                    >
                      <span className="font-mono text-sm font-bold text-primary">
                        <AnimatedCounter
                          end={val}
                          active={isInView}
                          duration={1500 + i * 500}
                        />
                      </span>
                      <span className="text-xs capitalize text-muted-foreground">
                        {key}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github size={16} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    aria-label={`View ${project.title} live demo`}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
