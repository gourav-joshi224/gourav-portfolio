import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  tag: string | null;
};

function buildPageHref(page: number, tag: string | null) {
  const params = new URLSearchParams();

  if (tag) {
    params.set("tag", tag);
  }

  params.set("page", page.toString());

  return `/blog?${params.toString()}`;
}

export default function Pagination({ currentPage, totalPages, tag }: Props) {
  return (
    <div className="mt-16 flex items-center justify-center gap-4">
      {currentPage > 1 ? (
        <Link
          href={buildPageHref(currentPage - 1, tag)}
          className="rounded-full border border-border px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text2 transition-all duration-200 hover:border-[color:var(--border-hover)] hover:text-accent"
        >
          ← prev
        </Link>
      ) : null}

      <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text2">
        {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={buildPageHref(currentPage + 1, tag)}
          className="rounded-full border border-border px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text2 transition-all duration-200 hover:border-[color:var(--border-hover)] hover:text-accent"
        >
          next →
        </Link>
      ) : null}
    </div>
  );
}
