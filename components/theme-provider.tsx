"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type ThemeName = "cyberpunk" | "synthwave" | "matrix";

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "cyberpunk",
  setTheme: () => {},
  cycleTheme: () => {},
});

const themeOrder: ThemeName[] = ["cyberpunk", "synthwave", "matrix"];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("cyberpunk");

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme") as ThemeName | null;
    if (stored && themeOrder.includes(stored)) {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "cyberpunk") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const setTheme = useCallback((t: ThemeName) => {
    setThemeState(t);
    localStorage.setItem("portfolio-theme", t);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      const idx = themeOrder.indexOf(prev);
      const next = themeOrder[(idx + 1) % themeOrder.length];
      localStorage.setItem("portfolio-theme", next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
