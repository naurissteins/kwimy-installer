import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const THEMES = {
  tokyoNightDefault: "tokyo-night-default",
  catppuccinMocha: "catppuccin-mocha",
} as const;

type ThemeValue = (typeof THEMES)[keyof typeof THEMES];

type ThemeContextValue = {
  theme: ThemeValue;
  setTheme: (nextTheme: ThemeValue) => void;
};

const STORAGE_KEY = "kwimy-theme";
const DEFAULT_THEME: ThemeValue = THEMES.tokyoNightDefault;

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readInitialTheme(): ThemeValue {
  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === THEMES.catppuccinMocha) {
    return THEMES.catppuccinMocha;
  }

  return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeValue>(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

function Theme() {
  const { theme, setTheme } = useTheme();

  return (
    <label className="flex items-center gap-2 text-sm text-(--app-fg)">
      Theme
      <select
        className="rounded-md border border-(--app-border) bg-(--app-surface) px-2 py-1 text-sm text-(--app-fg) outline-none"
        onChange={(event) => setTheme(event.target.value as ThemeValue)}
        value={theme}
      >
        <option value={THEMES.tokyoNightDefault}>Tokyo Night Default</option>
        <option value={THEMES.catppuccinMocha}>Catppuccin Mocha</option>
      </select>
    </label>
  );
}

export default Theme;
