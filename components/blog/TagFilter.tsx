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
    <div className="flex flex-wrap items-center gap-2 md:justify-end">
      <Link
        href="/blog"
        className={`px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-all duration-200 ${
          activeTag
            ? "border border-border text-text3 hover:border-[rgba(0,255,135,0.3)] hover:text-accent"
            : "border border-[rgba(0,255,135,0.3)] bg-accentDim text-accent"
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
            className={`px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-all duration-200 ${
              isActive
                ? "border border-[rgba(0,255,135,0.3)] bg-accentDim text-accent"
                : "border border-border text-text3 hover:border-[rgba(0,255,135,0.3)] hover:text-accent"
            }`}
          >
            {tag.label} ({tag.count})
          </Link>
        );
      })}
    </div>
  );
}
