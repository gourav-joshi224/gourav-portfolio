"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

type ThemeToggleProps = {
  className?: string;
};

function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="10" cy="10" r="3.2" />
      <path d="M10 1.8v2.1M10 16.1v2.1M18.2 10h-2.1M3.9 10H1.8M15.8 4.2l-1.5 1.5M5.7 14.3l-1.5 1.5M15.8 15.8l-1.5-1.5M5.7 5.7L4.2 4.2" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="currentColor"
    >
      <path d="M14.7 13.6A6.7 6.7 0 0 1 8.1 4.5a.7.7 0 0 0-.9-.8 7.5 7.5 0 1 0 9.1 9.1.7.7 0 0 0-.8-.9 6.4 6.4 0 0 1-.8.1Z" />
    </svg>
  );
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const rootTheme = document.documentElement.dataset.theme;
    const initialTheme = isTheme(savedTheme)
      ? savedTheme
      : isTheme(rootTheme)
        ? rootTheme
        : getSystemTheme();

    applyTheme(initialTheme);
    setTheme(initialTheme);
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      if (window.localStorage.getItem(THEME_STORAGE_KEY)) {
        return;
      }

      const nextTheme = getSystemTheme();
      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";
  const stateLabel = mounted ? `${theme} mode` : "theme";

  return (
    <button
      type="button"
      onClick={() => {
        const updatedTheme = nextTheme;

        applyTheme(updatedTheme);
        window.localStorage.setItem(THEME_STORAGE_KEY, updatedTheme);
        setTheme(updatedTheme);
      }}
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === "dark"}
      className={`theme-toggle group inline-flex items-center gap-2 rounded-full px-2 py-1.5 ${className}`}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-sky" />
        <span className="theme-toggle-lane">
          <span className="theme-toggle-lane-icon text-[var(--theme-toggle-icon-muted)]">
            <SunIcon />
          </span>
          <span className="theme-toggle-lane-icon text-[var(--theme-toggle-icon-muted)]">
            <MoonIcon />
          </span>
        </span>
        <motion.span
          initial={false}
          animate={{
            x: mounted && theme === "dark" ? 28 : 0,
            rotate: mounted && theme === "dark" ? 0 : 180,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="theme-toggle-thumb"
        >
          <span className="text-[var(--theme-toggle-thumb-icon)]">
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </span>
        </motion.span>
      </span>

      <span className="hidden min-w-[3.8rem] text-right font-mono text-[0.68rem] uppercase tracking-[0.16em] text-text2 sm:block">
        {stateLabel}
      </span>
    </button>
  );
}
