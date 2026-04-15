"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

import {
  getMermaidConfig,
  getMermaidThemeMode,
  type MermaidThemeMode,
} from "@/lib/mermaid";

type Props = {
  chart: string;
};

export default function MermaidDiagram({ chart }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderIdRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);
  const [theme, setTheme] = useState<MermaidThemeMode>("light");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setTheme(getMermaidThemeMode());

    const observer = new MutationObserver(() => {
      setTheme(getMermaidThemeMode());
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
        if ("fonts" in document) {
          await document.fonts.ready;
        }

        mermaid.initialize(getMermaidConfig(theme));

        const { svg } = await mermaid.render(renderIdRef.current, source);

        if (!isCancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          const svgNode = containerRef.current.querySelector("svg");

          if (svgNode) {
            svgNode.setAttribute("role", "img");
            svgNode.setAttribute("focusable", "false");
            svgNode.classList.add("mermaid-svg");
          }

          setHasError(false);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
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
      <pre className="mermaid-fallback">
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <figure className="mermaid-shell">
      <div
        ref={containerRef}
        className="mermaid-canvas"
        aria-label="Mermaid diagram"
      />
    </figure>
  );
}
