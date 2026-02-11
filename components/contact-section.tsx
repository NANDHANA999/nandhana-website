"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Github, Linkedin, Mail, Send, MapPin, Sparkles } from "lucide-react";

const socials = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:nandhana@example.com",
    display: "nandhana@example.com",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/nandhana",
    display: "github.com/nandhana",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/nandhana",
    display: "linkedin.com/in/nandhana",
  },
];

function HolographicCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group mx-auto mb-12 h-56 w-full max-w-md cursor-pointer [perspective:1000px]"
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped(!flipped);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Flip holographic business card"
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl border border-primary/30 holo-card p-8 neon-box [backface-visibility:hidden]">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-1 font-mono text-xs text-primary/60">
                DEVELOPER CARD
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Nandhana S
              </h3>
              <p className="font-mono text-sm text-primary">
                Computer Science Innovator
              </p>
            </div>
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin size={12} />
                GCE Bodinayakanur
              </div>
              <div className="font-mono text-3xl font-bold text-primary/20">
                {"<N />"}
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 right-8 font-mono text-xs text-muted-foreground/50">
            Click to flip
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-2xl border border-primary/30 holo-card p-8 neon-box [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex h-full flex-col justify-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <s.icon size={16} className="text-primary" />
                {s.display}
              </a>
            ))}
            <div className="mt-2 border-t border-border pt-3 font-mono text-xs text-muted-foreground/50">
              {"Status: Open to opportunities"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 px-6 py-24 md:py-32"
    >
      <div
        className={`mx-auto max-w-5xl transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-4 text-center">
          <span className="font-mono text-sm text-primary neon-text">
            {"// Contact Dimension"}
          </span>
        </div>
        <h2 className="mb-3 text-center text-3xl font-bold text-foreground md:text-4xl">
          {"Let's Connect"}
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-lg text-muted-foreground">
          {
            "Have a project in mind or just want to say hi? Flip the card or send a message."
          }
        </p>

        {/* Holographic business card */}
        <HolographicCard />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Animated social links */}
          <div className="flex flex-col gap-4">
            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Sparkles size={16} className="text-primary" />
              Communication Portal
            </h3>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-4 rounded-xl border p-5 backdrop-blur-sm transition-all duration-300 ${
                  hoveredSocial === s.label
                    ? "border-primary/60 bg-card/80 neon-box"
                    : "border-border bg-card/50 hover:border-primary/40"
                }`}
                onMouseEnter={() => setHoveredSocial(s.label)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 ${
                    hoveredSocial === s.label
                      ? "bg-primary/20 neon-box scale-110"
                      : "bg-primary/10"
                  }`}
                >
                  <s.icon size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {s.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.display}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="rounded-xl border border-border bg-card/50 p-8 backdrop-blur-sm">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary neon-box">
                  <Send size={24} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Message Transmitted!
                </h3>
                <p className="font-mono text-sm text-muted-foreground">
                  {"Signal received. I'll respond at light speed."}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 font-mono text-xs text-primary hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col gap-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block font-mono text-xs font-medium text-foreground"
                  >
                    {"// Name"}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:neon-box transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block font-mono text-xs font-medium text-foreground"
                  >
                    {"// Email"}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-mono text-xs font-medium text-foreground"
                  >
                    {"// Message"}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Write your message..."
                    className="w-full resize-none rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 neon-box"
                >
                  <Send size={16} />
                  Transmit Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
