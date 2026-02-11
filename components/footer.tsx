import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          Designed & Developed by{" "}
          <span className="font-semibold text-primary">Nandhana</span>
          <Heart size={14} className="text-primary" aria-hidden="true" />
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {"Built with Next.js & Tailwind CSS"}
        </p>
      </div>
    </footer>
  );
}
