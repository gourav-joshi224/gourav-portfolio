export const THEME_STORAGE_KEY = "gourav-theme";

export type Theme = "light" | "dark";

export const themeInitScript = `
  (() => {
    try {
      const storageKey = "${THEME_STORAGE_KEY}";
      const storedTheme = window.localStorage.getItem(storageKey);
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      const theme =
        storedTheme === "light" || storedTheme === "dark"
          ? storedTheme
          : systemTheme;

      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = "dark";
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;
