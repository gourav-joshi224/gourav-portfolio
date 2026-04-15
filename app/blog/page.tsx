import type { Metadata } from "next";
import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle";
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";
import TagFilter from "@/components/blog/TagFilter";
import {
  BLOG_DESCRIPTION,
  BLOG_TITLE,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  buildAbsoluteUrl,
} from "@/lib/config";
import { getAllPosts, getAllTags, getPaginatedPosts, getPostsByTag } from "@/lib/posts";

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  alternates: {
    canonical: buildAbsoluteUrl("/blog"),
  },
  openGraph: {
    type: "website",
    url: buildAbsoluteUrl("/blog"),
    title: `${BLOG_TITLE} | ${SITE_NAME}`,
    description: BLOG_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: buildAbsoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Blog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BLOG_TITLE} | ${SITE_NAME}`,
    description: BLOG_DESCRIPTION,
    images: [buildAbsoluteUrl(DEFAULT_OG_IMAGE)],
  },
};

type Props = {
  searchParams?: {
    page?: string | string[];
    tag?: string | string[];
  };
};

function getSingleValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default function BlogPage({ searchParams }: Props) {
  const rawPage = getSingleValue(searchParams?.page) || "1";
  const rawTag = getSingleValue(searchParams?.tag) || null;
  const page = Number.parseInt(rawPage, 10);
  const safePage = Number.isNaN(page) ? 1 : page;
  const tag = rawTag?.trim() || null;

  const { posts, totalPages, currentPage, totalPosts } = tag
    ? getPostsByTag(tag, safePage)
    : getPaginatedPosts(safePage);

  const allPosts = getAllPosts();
  const tagCounts = getAllTags().map((entry) => ({
    label: entry,
    count: allPosts.filter((post) =>
      post.tags.map((item) => item.toLowerCase()).includes(entry.toLowerCase())
    ).length,
  }));

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-bg px-3 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-24 md:px-8 md:pt-28"
    >
      <div className="site-shell mx-auto">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-border pb-4 sm:mb-10 sm:pb-5">
          <Link
            href="/"
            className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text2 transition-colors duration-200 hover:text-accent"
          >
            ← portfolio
          </Link>
          <ThemeToggle />
        </div>

        <p className="mb-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">
          {"// blog"}
        </p>

        <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-[clamp(2.2rem,6vw,5rem)] font-bold tracking-[-0.05em] text-text1">
              Writing.
            </h1>
            <p className="body-text mt-3 max-w-2xl text-base font-normal leading-[1.82] text-[color:var(--text-2-strong)] sm:mt-4 sm:text-[1.05rem] sm:leading-[1.88]">
              {totalPosts} post{totalPosts !== 1 ? "s" : ""} on backend
              engineering, system design, and the production lessons behind the
              work.
            </p>
          </div>

          <TagFilter tags={tagCounts} activeTag={tag} />
        </div>

        {posts.length === 0 ? (
          <div className="border border-border py-24 text-center font-mono text-sm text-text3">
            <p className="text-accent">$ ls content/blog/</p>
            <p className="mt-2">no posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                index={index}
                order={index + 1}
                featured={index === 0}
              />
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <Pagination currentPage={currentPage} totalPages={totalPages} tag={tag} />
        ) : null}
      </div>
    </main>
  );
}
