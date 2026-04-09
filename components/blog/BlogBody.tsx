import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import MermaidDiagram from "@/components/blog/MermaidDiagram";

type Props = {
  source: string;
};

type CodeNode = {
  props?: {
    className?: string;
    children?: ReactNode;
  };
};

function getTextContent(value: ReactNode) {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.join("");
  }

  return "";
}

function extractMermaidChart(children: ReactNode) {
  const codeNode = children as CodeNode;
  const className = codeNode?.props?.className || "";

  if (!className.includes("language-mermaid")) {
    return null;
  }

  const chart = getTextContent(codeNode.props?.children).trim();
  return chart || null;
}

export default function BlogBody({ source }: Props) {
  return (
    <div className="site-panel prose-blog px-6 py-7 md:px-8 md:py-9">
      <MDXRemote
        source={source}
        components={{
          pre: ({ children, ...props }) => {
            const chart = extractMermaidChart(children);

            if (chart) {
              return <MermaidDiagram chart={chart} />;
            }

            return <pre {...props}>{children}</pre>;
          },
        }}
      />
    </div>
  );
}
