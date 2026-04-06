import type { Metadata } from "next";

import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/blog/Pagination";
import TagFilter from "@/components/blog/TagFilter";
import { SITE_URL } from "@/lib/config";
import { getAllPosts, getAllTags, getPaginatedPosts, getPostsByTag } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on backend engineering, Node.js, NestJS, PostgreSQL, system design, and everything I learn shipping production systems.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
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
    <main className="min-h-screen bg-bg px-6 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">
          {"// blog"}
        </p>

        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h1 className="font-display text-[clamp(3rem,6vw,5rem)] font-bold tracking-[-0.05em] text-text1">
              Writing.
            </h1>
            <p className="body-text mt-4 max-w-2xl text-base font-normal text-text2">
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
