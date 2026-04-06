import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogBody from "@/components/blog/BlogBody";
import BlogHeader from "@/components/blog/BlogHeader";
import { SITE_URL } from "@/lib/config";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: "Gourav Joshi" }],
    openGraph: {
      title: `${post.title} | Gourav Joshi`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Gourav Joshi"],
      tags: post.tags,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Gourav Joshi",
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <main className="min-h-screen bg-bg px-6 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <a
          href="/blog"
          className="mb-12 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3 transition-colors duration-200 hover:text-accent"
        >
          ← back to blog
        </a>

        <article className="max-w-3xl">
          <BlogHeader post={post} />
          <BlogBody source={post.content} />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />

          <div className="mt-16 border-t border-border pt-8">
            <a
              href="/blog"
              className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3 transition-colors duration-200 hover:text-accent"
            >
              ← all posts
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}
