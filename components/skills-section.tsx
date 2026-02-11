"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Zap, Shield, Brain, Globe, Database, Code, Terminal, Cpu, Combine } from "lucide-react";

const skills = [
  {
    name: "Python",
    icon: Zap,
    level: 42,
    xp: 890,
    maxXp: 1000,
    class: "Sorcerer",
    color: "from-chart-1/20 to-chart-1/5",
  },
  {
    name: "JavaScript",
    icon: Shield,
    level: 38,
    xp: 720,
    maxXp: 1000,
    class: "Knight",
    color: "from-chart-4/20 to-chart-4/5",
  },
  {
    name: "Algorithms",
    icon: Brain,
    level: 45,
    xp: 950,
    maxXp: 1000,
    class: "Sage",
    color: "from-chart-2/20 to-chart-2/5",
  },
  {
    name: "HTML/CSS",
    icon: Globe,
    level: 40,
    xp: 850,
    maxXp: 1000,
    class: "Artisan",
    color: "from-destructive/20 to-destructive/5",
  },
  {
    name: "SQL",
    icon: Database,
    level: 35,
    xp: 680,
    maxXp: 1000,
    class: "Oracle",
    color: "from-chart-5/20 to-chart-5/5",
  },
  {
    name: "C",
    icon: Terminal,
    level: 33,
    xp: 620,
    maxXp: 1000,
    class: "Warrior",
    color: "from-muted-foreground/20 to-muted-foreground/5",
  },
  {
    name: "Data Structures",
    icon: Cpu,
    level: 41,
    xp: 870,
    maxXp: 1000,
    class: "Architect",
    color: "from-primary/20 to-primary/5",
  },
  {
    name: "Problem Solving",
    icon: Code,
    level: 44,
    xp: 930,
    maxXp: 1000,
    class: "Strategist",
    color: "from-chart-2/20 to-chart-2/5",
  },
];

const fusions = [
  { skills: ["Python", "SQL"], result: "Data Wizard", icon: Database },
  { skills: ["HTML/CSS", "JavaScript"], result: "Web Artisan", icon: Globe },
  { skills: ["Algorithms", "Data Structures"], result: "Code Architect", icon: Cpu },
  { skills: ["Python", "Algorithms"], result: "AI Apprentice", icon: Brain },
];

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [clickedSkill, setClickedSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
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
            {"// Skills Nexus"}
          </span>
        </div>
        <h2 className="mb-3 text-center text-3xl font-bold text-foreground md:text-4xl">
          Character Stats
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-lg text-muted-foreground">
          RPG-style skill progression. Each ability has been leveled up through
          real projects and practice.
        </p>

        {/* Skill Cards Grid */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, i) => {
            const xpPercent = (skill.xp / skill.maxXp) * 100;
            const isHovered = hoveredSkill === skill.name;
            const isClicked = clickedSkill === skill.name;

            return (
              <button
                key={skill.name}
                type="button"
                className={`group relative overflow-hidden rounded-xl border text-left transition-all duration-500 ${
                  isHovered
                    ? "border-primary/60 neon-box"
                    : "border-border"
                } bg-card/50 backdrop-blur-sm`}
                style={{
                  transitionDelay: isInView ? `${i * 80}ms` : "0ms",
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() =>
                  setClickedSkill(
                    clickedSkill === skill.name ? null : skill.name
                  )
                }
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative p-5">
                  {/* Header */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <skill.icon
                        size={18}
                        className="text-primary transition-all group-hover:neon-text"
                      />
                      <span className="font-mono text-sm font-bold text-foreground">
                        {skill.name}
                      </span>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                      Lv.{skill.level}
                    </span>
                  </div>

                  {/* Class */}
                  <div className="mb-3 font-mono text-xs text-muted-foreground">
                    Class: {skill.class}
                  </div>

                  {/* XP Bar */}
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                      style={{
                        width: isInView ? `${xpPercent}%` : "0%",
                        transitionDelay: isInView
                          ? `${i * 80 + 400}ms`
                          : "0ms",
                      }}
                    />
                  </div>

                  {/* Click to expand details */}
                  {isClicked && (
                    <div className="mt-3 border-t border-border pt-3 font-mono text-xs leading-relaxed text-muted-foreground animate-fade-in">
                      <div className="flex justify-between">
                        <span>ATK:</span>
                        <span className="text-primary">
                          {Math.floor(skill.level * 2.3)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>DEF:</span>
                        <span className="text-primary">
                          {Math.floor(skill.level * 1.8)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>SPD:</span>
                        <span className="text-primary">
                          {Math.floor(skill.level * 1.5)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Skill Fusion */}
        <div>
          <div className="mb-6 flex items-center justify-center gap-2">
            <Combine size={18} className="text-primary" />
            <h3 className="font-mono text-sm font-bold text-primary neon-text">
              Skill Fusion
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fusions.map((f, i) => (
              <div
                key={f.result}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card/30 p-5 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-card/60"
                style={{
                  transitionDelay: isInView ? `${i * 100 + 800}ms` : "0ms",
                }}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span>{f.skills[0]}</span>
                  <span className="text-primary">+</span>
                  <span>{f.skills[1]}</span>
                </div>
                <div className="text-lg text-primary">=</div>
                <div className="flex items-center gap-2">
                  <f.icon
                    size={16}
                    className="text-primary group-hover:neon-text transition-all"
                  />
                  <span className="font-mono text-sm font-bold text-foreground">
                    {f.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
