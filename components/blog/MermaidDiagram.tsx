"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

type Props = {
  chart: string;
};

let isMermaidInitialized = false;

type MermaidTheme = "default" | "dark";

function getMermaidTheme(): MermaidTheme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "default";
}

export default function MermaidDiagram({ chart }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderIdRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);
  const [theme, setTheme] = useState<MermaidTheme>("default");
  const [hasError, setHasError] = useState(false);

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
    if (!containerRef.current) {
      return;
    }

    const source = chart.trim();
    if (!source) {
      return;
    }

    let isCancelled = false;

    const renderDiagram = async () => {
      try {
        if (!isMermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: "strict",
            theme,
          });
          isMermaidInitialized = true;
        } else {
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: "strict",
            theme,
          });
        }

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

  return <div ref={containerRef} className="mermaid-shell" aria-label="Mermaid diagram" />;
}
