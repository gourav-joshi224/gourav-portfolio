"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

type Props = {
  chart: string;
};

type MermaidTheme = "default" | "dark";

function getMermaidTheme(): MermaidTheme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "default";
}

export default function MermaidDiagram({ chart }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Stable ID per component instance — must not change between renders
  const renderIdRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);
  const [theme, setTheme] = useState<MermaidTheme>("default");
  const [hasError, setHasError] = useState(false);

  // Sync theme with data-theme attribute changes (light/dark toggle)
  useEffect(() => {
    setTheme(getMermaidTheme());

    const observer = new MutationObserver(() => {
      setTheme(getMermaidTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const source = chart.trim();
    if (!source) return;

    let isCancelled = false;

    const renderDiagram = async () => {
      try {
        /**
         * ROOT CAUSE FIX:
         * Mermaid measures node dimensions using the font specified in its config
         * BEFORE the browser paints. If we override fontFamily with a web font
         * (e.g. Plus Jakarta Sans), Mermaid may attempt to measure with that font
         * before it is loaded, and the browser falls back to a system font with
         * different char widths. Node boxes are then sized for the wrong font,
         * causing labels to be clipped.
         *
         * SOLUTION: Do NOT override fontFamily. Let Mermaid use its built-in default
         * ("trebuchet ms", verdana, arial, sans-serif) for ALL layout and size
         * calculations. Those fonts are always available and produce consistent metrics.
         * After Mermaid generates the SVG string we inject it into the DOM and apply
         * our design-system font via CSS (see globals.css .mermaid-shell rules).
         * Because trebuchet ms is slightly wider than Plus Jakarta Sans at the same
         * px size, the boxes will always have room to spare — no more clipping.
         */
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: theme === "dark" ? "dark" : "default",
          themeVariables: theme === "dark" ? {
            // General
            background: 'transparent',
            primaryColor: '#121821', // surface-2
            primaryTextColor: '#edf5f7', // text-1
            primaryBorderColor: 'rgba(188, 207, 223, 0.2)', // border-strong
            lineColor: '#8896a1', // text-3
            secondaryColor: '#0d1116', // surface
            tertiaryColor: '#07090c', // bg
            // Flowchart & Nodes
            nodeBorder: 'rgba(188, 207, 223, 0.2)',
            mainBkg: '#121821',
            edgeLabelBackground: '#0d1116',
            // Sequence Diagram
            actorBkg: '#121821',
            actorBorder: 'rgba(188, 207, 223, 0.2)',
            actorTextColor: '#edf5f7',
            actorLineColor: 'rgba(188, 207, 223, 0.2)',
            signalColor: '#c4cfd6',
            signalTextColor: '#edf5f7',
            noteBkgColor: '#121821',
            noteBorderColor: 'rgba(188, 207, 223, 0.2)',
            // State Diagram
            labelBackgroundColor: '#0d1116',
            labelTextColor: '#edf5f7',
          } : undefined,
          // ─── DO NOT set fontFamily here ───────────────────────────────────────
          // Letting Mermaid use its default ("trebuchet ms", verdana, arial)
          // guarantees that measurement and rendering use the same available font.
          // The visual font is overridden post-render via CSS in globals.css.
          // ──────────────────────────────────────────────────────────────────────
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true, // DOM-measured sizing — more accurate than SVG text estimation
            padding: 20,
          },
          sequence: {
            useMaxWidth: true,
            showSequenceNumbers: false,
          },
          state: {
            useMaxWidth: true,
          },
        });

        const { svg } = await mermaid.render(renderIdRef.current, source);

        if (!isCancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setHasError(false);
        }
      } catch {
        if (!isCancelled) {
          setHasError(true);
        }
      }
    };

    renderDiagram();

    return () => {
      isCancelled = true;
    };
  }, [chart, theme]);

  if (hasError) {
    return (
      <pre>
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-shell"
      aria-label="Mermaid diagram"
    />
  );
}
