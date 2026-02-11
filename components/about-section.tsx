"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Code2, Brain, Lightbulb, Cpu, Sparkles } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing efficient, readable code in Python, C, JavaScript and SQL.",
  },
  {
    icon: Brain,
    title: "Problem Solver",
    description:
      "Passionate about data structures, algorithms, and logical thinking.",
  },
  {
    icon: Lightbulb,
    title: "Creative Builder",
    description:
      "Turning creative ideas into functional, user-friendly digital experiences.",
  },
];

const radarStats = [
  { label: "Logic", value: 95 },
  { label: "Creativity", value: 88 },
  { label: "Problem Solving", value: 92 },
  { label: "Collaboration", value: 85 },
  { label: "Innovation", value: 90 },
];

const timeline = [
  {
    year: "2021",
    title: 'First "Hello World"',
    desc: "Wrote my first Python program and fell in love with coding.",
  },
  {
    year: "2022",
    title: "Deep Dive into DSA",
    desc: "Mastered data structures and algorithms, solved 200+ problems.",
  },
  {
    year: "2023",
    title: "Web Development",
    desc: "Built responsive websites and interactive front-end projects.",
  },
  {
    year: "2024",
    title: "Full-Stack Journey",
    desc: "Started building full-stack applications with databases and APIs.",
  },
  {
    year: "2025",
    title: "AI & Innovation",
    desc: "Exploring AI/ML and building intelligent applications.",
  },
];

function RadarChart({ inView }: { inView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 280;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const maxR = 100;
    const levels = 4;
    const count = radarStats.length;
    const angle = (Math.PI * 2) / count;

    ctx.clearRect(0, 0, size, size);

    const style = getComputedStyle(document.documentElement);
    const primaryHsl = style.getPropertyValue("--primary").trim();
    const mutedHsl = style.getPropertyValue("--muted-foreground").trim();

    // Grid
    for (let l = 1; l <= levels; l++) {
      const r = (maxR / levels) * l;
      ctx.beginPath();
      for (let i = 0; i <= count; i++) {
        const a = angle * i - Math.PI / 2;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `hsl(${mutedHsl} / 0.15)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axes
    for (let i = 0; i < count; i++) {
      const a = angle * i - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + maxR * Math.cos(a), cy + maxR * Math.sin(a));
      ctx.strokeStyle = `hsl(${mutedHsl} / 0.1)`;
      ctx.stroke();
    }

    // Data polygon
    if (inView) {
      ctx.beginPath();
      for (let i = 0; i <= count; i++) {
        const idx = i % count;
        const r = (radarStats[idx].value / 100) * maxR;
        const a = angle * idx - Math.PI / 2;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.fillStyle = `hsl(${primaryHsl} / 0.15)`;
      ctx.fill();
      ctx.strokeStyle = `hsl(${primaryHsl} / 0.8)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Dots + labels
      for (let i = 0; i < count; i++) {
        const r = (radarStats[i].value / 100) * maxR;
        const a = angle * i - Math.PI / 2;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${primaryHsl})`;
        ctx.fill();

        // Label
        const lx = cx + (maxR + 22) * Math.cos(a);
        const ly = cy + (maxR + 22) * Math.sin(a);
        ctx.font = "11px monospace";
        ctx.fillStyle = `hsl(${mutedHsl})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          `${radarStats[i].label} ${radarStats[i].value}%`,
          lx,
          ly
        );
      }
    }
  }, [inView]);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={280}
      className="mx-auto"
      aria-label="Personality radar chart showing Logic 95%, Creativity 88%, Problem Solving 92%, Collaboration 85%, Innovation 90%"
      role="img"
    />
  );
}

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  const [activeTimeline, setActiveTimeline] = useState(-1);

  useEffect(() => {
    if (!isInView) return;
    const timers = timeline.map((_, i) =>
      setTimeout(() => setActiveTimeline(i), 400 + i * 300)
    );
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section
      id="about"
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
            {"// About Me"}
          </span>
        </div>
        <h2 className="mb-6 text-center text-3xl font-bold text-foreground md:text-4xl">
          Get to Know Me
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
          {
            "I'm a Computer Science student at Government College of Engineering, Bodinayakanur, with a deep passion for programming and problem-solving. I thrive on building projects that challenge my thinking and push the boundaries of what I know."
          }
        </p>

        {/* Highlight cards */}
        <div className="mb-20 grid gap-6 md:grid-cols-3">
          {highlights.map((item, i) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-card/80"
              style={{
                transitionDelay: isInView ? `${i * 150}ms` : "0ms",
              }}
            >
              <div className="absolute inset-0 bg-primary/0 transition-all duration-500 group-hover:bg-primary/5" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary/20 group-hover:neon-box">
                  <item.icon size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Personality Matrix + Timeline */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Radar chart */}
          <div className="flex flex-col items-center">
            <div className="mb-4 flex items-center gap-2">
              <Cpu size={16} className="text-primary" />
              <h3 className="font-mono text-sm font-bold text-primary">
                Personality Matrix
              </h3>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
              <RadarChart inView={isInView} />
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              <h3 className="font-mono text-sm font-bold text-primary">
                Coding Journey
              </h3>
            </div>
            <div className="relative ml-4">
              {/* Vertical line */}
              <div className="absolute top-0 bottom-0 left-0 w-px bg-border" />

              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative mb-8 pl-8 transition-all duration-500 last:mb-0 ${
                    i <= activeTimeline
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-1 -translate-x-1/2 h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                      i <= activeTimeline
                        ? "border-primary bg-primary neon-box"
                        : "border-border bg-background"
                    }`}
                  />
                  <div className="font-mono text-xs text-primary">{item.year}</div>
                  <div className="text-sm font-semibold text-foreground">
                    {item.title}
                  </div>
                  <div className="text-xs leading-relaxed text-muted-foreground">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
