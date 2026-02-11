"use client";

import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { LoadingScreen } from "@/components/loading-screen";
import { ParticlesBackground } from "@/components/particles-background";
import { MouseTrail } from "@/components/mouse-trail";
import { KonamiCode } from "@/components/konami-code";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
        className={`transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <ParticlesBackground />
        <MouseTrail />
        <KonamiCode />
        <KeyboardShortcuts />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
