import Link from "next/link";

type TagEntry = {
  label: string;
  count: number;
};

type Props = {
  tags: TagEntry[];
  activeTag: string | null;
};

export default function TagFilter({ tags, activeTag }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 md:justify-end">
      <Link
        href="/blog"
        className={`min-h-10 rounded-full px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-all duration-200 ${
          activeTag
            ? "border border-border text-text2 hover:border-[color:var(--border-hover)] hover:text-accent"
            : "border border-[color:var(--border-hover)] bg-accentDim text-accent"
        }`}
      >
        All
      </Link>

      {tags.map((tag) => {
        const isActive = activeTag?.toLowerCase() === tag.label.toLowerCase();

        return (
          <Link
            key={tag.label}
            href={`/blog?tag=${encodeURIComponent(tag.label)}`}
            className={`min-h-10 rounded-full px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-all duration-200 ${
              isActive
                ? "border border-[color:var(--border-hover)] bg-accentDim text-accent"
                : "border border-border text-text2 hover:border-[color:var(--border-hover)] hover:text-accent"
            }`}
          >
            {tag.label} ({tag.count})
          </Link>
        );
      })}
    </div>
  );
}
