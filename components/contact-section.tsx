"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Github, Linkedin, Mail, Send } from "lucide-react";

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

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.15 });
  const [submitted, setSubmitted] = useState(false);

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
          <span className="font-mono text-sm text-primary">
            {"// Contact"}
          </span>
        </div>
        <h2 className="mb-6 text-center text-3xl font-bold text-foreground md:text-4xl">
          {"Let's Connect"}
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-lg text-muted-foreground">
          {"Have a project in mind or just want to say hi? I'd love to hear from you."}
        </p>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Social links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-foreground">
              Find Me Online
            </h3>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/80"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <s.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.display}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="rounded-xl border border-border bg-card/50 p-8 backdrop-blur-sm">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Send size={24} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Message Sent!
                </h3>
                <p className="text-sm text-muted-foreground">
                  {"Thanks for reaching out. I'll get back to you soon."}
                </p>
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
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Write your message..."
                    className="w-full resize-none rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
