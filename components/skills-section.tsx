"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";

const skills = [
  { name: "Python", level: 90 },
  { name: "C", level: 75 },
  { name: "SQL", level: 80 },
  { name: "HTML", level: 95 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "Data Structures", level: 85 },
  { name: "Algorithms", level: 80 },
];

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.15 });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative z-10 px-6 py-24 md:py-32"
    >
      <div
        className={`mx-auto max-w-4xl transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-4 text-center">
          <span className="font-mono text-sm text-primary">
            {"// Skills & Tech"}
          </span>
        </div>
        <h2 className="mb-6 text-center text-3xl font-bold text-foreground md:text-4xl">
          My Tech Stack
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-lg text-muted-foreground">
          Technologies and skills I work with to bring ideas to life.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="group rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/80"
              style={{
                transitionDelay: isInView ? `${i * 80}ms` : "0ms",
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-foreground">
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-primary">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                  style={{
                    width: isInView ? `${skill.level}%` : "0%",
                    transitionDelay: isInView ? `${i * 80 + 200}ms` : "0ms",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
