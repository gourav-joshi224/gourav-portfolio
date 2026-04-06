"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { Post } from "@/lib/posts";

type Props = {
  post: Post;
  index: number;
  featured?: boolean;
  order: number;
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

export default function BlogCard({ post, index, featured = false, order }: Props) {
  const readingTone = getReadingTone(post.readingTime);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={featured ? "lg:col-span-3" : ""}
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <article
          className={`site-panel h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
            featured
              ? "grid lg:grid-cols-[minmax(240px,0.42fr)_minmax(0,0.58fr)]"
              : "flex flex-col p-6"
          }`}
        >
          {featured ? (
            <>
              <div className="flex min-h-[240px] items-end justify-between border-b border-border bg-surface2 p-6 lg:min-h-full lg:border-b-0 lg:border-r">
                <div>
                  <div className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">
                    Featured post
                  </div>
                  <div className="mt-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text3">
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="font-display text-7xl font-semibold leading-none tracking-[-0.08em] text-[rgba(255,255,255,0.09)]">
                  {String(order).padStart(2, "0")}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text3">
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className={`h-1.5 w-1.5 rounded-full ${readingTone.dotClass}`} />
                  <span
                    className={`font-mono text-[0.72rem] uppercase tracking-[0.14em] ${readingTone.textClass}`}
                  >
                    {post.readingTime}
                  </span>
                </div>

                <h2 className="font-display text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-text1 transition-colors duration-200">
                  {post.title}
                </h2>

                <p className="body-text mt-4 max-w-2xl text-base font-normal text-text2">
                  {post.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border bg-surface px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-text2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3 transition-colors duration-200 group-hover:text-accent">
                  Read post →
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-5 h-px w-10 bg-accent" />

              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text3">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${readingTone.dotClass}`} />
                <span
                  className={`font-mono text-[0.72rem] uppercase tracking-[0.14em] ${readingTone.textClass}`}
                >
                  {post.readingTime}
                </span>
              </div>

              <h2 className="flex-1 font-display text-xl font-semibold leading-[1.08] tracking-[-0.03em] text-text1 transition-colors duration-200 group-hover:text-accent">
                {post.title}
              </h2>

              <p className="body-text mt-4 line-clamp-3 text-sm font-normal text-text2">
                {post.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="border border-border bg-surface px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-text2"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text3">
                  Read post
                </span>
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text3 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              </div>
            </>
          )}
        </article>
      </Link>
    </motion.div>
  );
}
