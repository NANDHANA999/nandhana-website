"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Code2, Brain, Lightbulb } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing efficient, readable code in Python, C, JavaScript and SQL.",
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

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.2 });

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
          <span className="font-mono text-sm text-primary">{"// About Me"}</span>
        </div>
        <h2 className="mb-6 text-center text-3xl font-bold text-foreground md:text-4xl">
          Get to Know Me
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
          {
            "I'm a Computer Science student at Government College of Engineering, Bodinayakanur, with a deep passion for programming and problem-solving. I thrive on building projects that challenge my thinking and push the boundaries of what I know."
          }
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/80"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <item.icon size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
