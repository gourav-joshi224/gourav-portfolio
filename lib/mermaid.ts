type MermaidThemeMode = "light" | "dark";

function readCssVar(styles: CSSStyleDeclaration, name: string, fallback: string) {
  const value = styles.getPropertyValue(name).trim();
  return value || fallback;
}

export function getMermaidThemeMode(): MermaidThemeMode {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function getMermaidConfig(theme: MermaidThemeMode) {
  const rootStyles = getComputedStyle(document.documentElement);
  const bodyStyles = getComputedStyle(document.body);
  const fontFamily = bodyStyles.fontFamily || "ui-sans-serif, system-ui, sans-serif";

  return {
    startOnLoad: false,
    securityLevel: "loose" as const,
    theme: "base" as const,
    darkMode: theme === "dark",
    htmlLabels: false,
    fontFamily,
    themeVariables: {
      background: "transparent",
      fontFamily,
      fontSize: "16px",
      primaryColor: readCssVar(rootStyles, "--surface-2", "#121821"),
      primaryTextColor: readCssVar(rootStyles, "--text-1", "#edf5f7"),
      primaryBorderColor: readCssVar(rootStyles, "--border-strong", "rgba(188, 207, 223, 0.2)"),
      secondaryColor: readCssVar(rootStyles, "--surface", "#0d1116"),
      tertiaryColor: readCssVar(rootStyles, "--bg", "#07090c"),
      lineColor: readCssVar(rootStyles, "--text-3", "#8896a1"),
      textColor: readCssVar(rootStyles, "--text-1", "#edf5f7"),
      mainBkg: readCssVar(rootStyles, "--surface-2", "#121821"),
      clusterBkg: readCssVar(rootStyles, "--surface", "#0d1116"),
      clusterBorder: readCssVar(rootStyles, "--border-strong", "rgba(188, 207, 223, 0.2)"),
      edgeLabelBackground: readCssVar(rootStyles, "--surface", "#0d1116"),
      labelBackgroundColor: readCssVar(rootStyles, "--surface", "#0d1116"),
      labelTextColor: readCssVar(rootStyles, "--text-1", "#edf5f7"),
      nodeBorder: readCssVar(rootStyles, "--border-strong", "rgba(188, 207, 223, 0.2)"),
      nodeTextColor: readCssVar(rootStyles, "--text-1", "#edf5f7"),
      actorBkg: readCssVar(rootStyles, "--surface-2", "#121821"),
      actorBorder: readCssVar(rootStyles, "--border-strong", "rgba(188, 207, 223, 0.2)"),
      actorTextColor: readCssVar(rootStyles, "--text-1", "#edf5f7"),
      actorLineColor: readCssVar(rootStyles, "--border-strong", "rgba(188, 207, 223, 0.2)"),
      signalColor: readCssVar(rootStyles, "--text-2-strong", "#d1dde4"),
      signalTextColor: readCssVar(rootStyles, "--text-1", "#edf5f7"),
      noteBkgColor: readCssVar(rootStyles, "--surface", "#0d1116"),
      noteBorderColor: readCssVar(rootStyles, "--border-strong", "rgba(188, 207, 223, 0.2)"),
      noteTextColor: readCssVar(rootStyles, "--text-1", "#edf5f7"),
      sequenceNumberColor: readCssVar(rootStyles, "--accent", "#31f59d"),
      stateBkg: readCssVar(rootStyles, "--surface-2", "#121821"),
      stateBorder: readCssVar(rootStyles, "--border-strong", "rgba(188, 207, 223, 0.2)"),
      stateTextColor: readCssVar(rootStyles, "--text-1", "#edf5f7"),
      transitionColor: readCssVar(rootStyles, "--text-2", "#c4cfd6"),
    },
    flowchart: {
      useMaxWidth: false,
      padding: 28,
      nodeSpacing: 38,
      rankSpacing: 48,
    },
    sequence: {
      useMaxWidth: false,
      diagramMarginX: 24,
      diagramMarginY: 20,
      actorMargin: 48,
      messageMargin: 36,
      boxMargin: 16,
    },
    state: {
      useMaxWidth: false,
      padding: 18,
    },
  };
}

export type { MermaidThemeMode };
