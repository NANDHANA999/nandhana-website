"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Smart Task Manager",
    description:
      "A full-featured task management app with user authentication, priority-based sorting, and persistent data storage using SQLite.",
    tech: ["Python", "SQL", "Tkinter"],
    github: "#",
    demo: "#",
  },
  {
    title: "College Event Website",
    description:
      "A responsive and animated website for showcasing college events, with smooth scrolling, image galleries, and registration forms.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "#",
  },
  {
    title: "Algorithm Visualizer",
    description:
      "An interactive tool that animates popular sorting and pathfinding algorithms to help understand how they work step by step.",
    tech: ["JavaScript", "HTML Canvas", "CSS"],
    github: "#",
    demo: "#",
  },
];

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

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
          <span className="font-mono text-sm text-primary">
            {"// Projects"}
          </span>
        </div>
        <h2 className="mb-6 text-center text-3xl font-bold text-foreground md:text-4xl">
          Featured Work
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-lg text-muted-foreground">
          A selection of projects that showcase my problem-solving skills and technical abilities.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="group flex flex-col rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-card/80"
              style={{
                transitionDelay: isInView ? `${i * 120}ms` : "0ms",
              }}
            >
              {/* Glow line at top */}
              <div className="h-0.5 w-full rounded-t-xl bg-primary/0 transition-all duration-300 group-hover:bg-primary/60" />

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

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
