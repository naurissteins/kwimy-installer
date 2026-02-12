import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

export const THEMES = {
  tokyoNightDefault: "tokyo-night-default",
  catppuccinMocha: "catppuccin-mocha",
} as const;

type ThemeValue = (typeof THEMES)[keyof typeof THEMES];

type ThemeContextValue = {
  theme: ThemeValue;
  setTheme: (nextTheme: ThemeValue) => void;
};

type ThemeOption = {
  value: ThemeValue;
  label: string;
  color: string;
};

const STORAGE_KEY = "kwimy-theme";
const DEFAULT_THEME: ThemeValue = THEMES.tokyoNightDefault;
const THEME_OPTIONS: ThemeOption[] = [
  {
    value: THEMES.tokyoNightDefault,
    label: "Tokyo Night Default",
    color: "#7aa2f7",
  },
  {
    value: THEMES.catppuccinMocha,
    label: "Catppuccin Mocha",
    color: "#f5c2e7",
  },
];

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
  const currentThemeOption =
    THEME_OPTIONS.find((option) => option.value === theme) ?? THEME_OPTIONS[0];

  return (
    <div className="flex items-center text-xs font-medium text-(--app-fg)">
      <Listbox value={theme} onChange={setTheme}>
        <div className="relative w-46">
          <ListboxButton className="relative w-full rounded-md border border-(--app-border) bg-(--app-surface) py-2 pl-3 pr-8 text-left text-xs font-medium text-(--app-fg) transition hover:bg-white/5 focus:outline-none cursor-pointer">
            <span className="flex items-center gap-x-2">
              <span
                aria-hidden="true"
                className="inline-block size-2.5 rounded-full"
                style={{ backgroundColor: currentThemeOption.color }}
              />
              <span className="block truncate">{currentThemeOption.label}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-(--app-fg)/70">
              <svg
                aria-hidden="true"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 9l4-4 4 4M16 15l-4 4-4-4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </ListboxButton>
          <ListboxOptions
            transition
            className="absolute z-30 mt-1 max-h-48 w-full overflow-auto rounded-md border border-(--app-border) bg-(--app-surface) py-1 text-left text-xs shadow-lg ring-1 ring-black/5 focus:outline-none data-closed:data-leave:opacity-0 data-leave:transition data-leave:duration-100 data-leave:ease-in"
          >
            {THEME_OPTIONS.map((option) => (
              <ListboxOption
                key={option.value}
                className="group relative cursor-pointer select-none py-2 pl-3 pr-3 text-xs font-medium text-(--app-fg) data-focus:bg-white/5"
                value={option.value}
              >
                <span className="flex items-center gap-x-2">
                  <span
                    aria-hidden="true"
                    className="inline-block size-2.5 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                  <span className="block truncate group-data-selected:font-semibold">
                    {option.label}
                  </span>
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}

export default Theme;
