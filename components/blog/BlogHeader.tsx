import type { Post } from "@/lib/posts";

type Props = {
  post: Post;
};

function getReadingTone(readingTime: string) {
  const minutes = Number.parseInt(readingTime, 10);

  if (!Number.isFinite(minutes) || minutes < 5) {
    return { textClass: "text-accent", dotClass: "bg-accent" };
  }

  if (minutes <= 10) {
    return { textClass: "text-amber", dotClass: "bg-amber" };
  }

  return { textClass: "text-danger", dotClass: "bg-danger" };
}

export default function BlogHeader({ post }: Props) {
  const readingTone = getReadingTone(post.readingTime);

  return (
    <header className="mb-12 border-b border-border pb-10">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--text-meta)]">
          {new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className={`h-1.5 w-1.5 rounded-full ${readingTone.dotClass}`} />
        <span
          className={`font-mono text-[0.72rem] uppercase tracking-[0.16em] ${readingTone.textClass}`}
        >
          {post.readingTime}
        </span>
      </div>

      <h1 className="font-display text-[clamp(1.8rem,5vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.04em] text-text1">
        {post.title}
      </h1>

      <p className="body-text mt-5 max-w-3xl text-[0.97rem] font-normal leading-[1.82] text-[color:var(--text-2-strong)] sm:text-[1.05rem] sm:leading-[1.86] md:text-lg">
        {post.description}
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <a
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className="border border-border bg-surface px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[color:var(--chip-text)] transition-colors duration-200 hover:border-[color:var(--border-hover)] hover:text-accent"
          >
            {tag}
          </a>
        ))}
      </div>
    </header>
  );
}
