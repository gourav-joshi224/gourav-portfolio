import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ThemeToggle } from "@/components/ThemeToggle";
import BlogBody from "@/components/blog/BlogBody";
import BlogHeader from "@/components/blog/BlogHeader";
import {
  DEFAULT_OG_IMAGE,
  SITE_AUTHOR,
  SITE_NAME,
  SITE_URL,
  buildAbsoluteUrl,
} from "@/lib/config";
import { getAllPosts, getIsoDate, getPostBySlug } from "@/lib/posts";

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
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = buildAbsoluteUrl(`/blog/${post.slug}`);
  const imageUrl = buildAbsoluteUrl(post.image || DEFAULT_OG_IMAGE);
  const publishedTime = getIsoDate(post.date);

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
    keywords: post.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: canonicalUrl,
      siteName: SITE_NAME,
      publishedTime,
      authors: [SITE_AUTHOR],
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
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

  const canonicalUrl = buildAbsoluteUrl(`/blog/${post.slug}`);
  const imageUrl = buildAbsoluteUrl(post.image || DEFAULT_OG_IMAGE);
  const publishedDate = getIsoDate(post.date);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: publishedDate,
    dateModified: publishedDate,
    image: imageUrl,
    keywords: post.tags,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: SITE_URL,
    },
    url: canonicalUrl,
  };

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-bg px-6 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-12 flex items-center justify-between gap-4 border-b border-border pb-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text2 transition-colors duration-200 hover:text-accent"
          >
            ← back to blog
          </Link>
          <ThemeToggle />
        </div>

        <article className="w-full">
          <div className="mx-auto w-full max-w-6xl">
            <BlogHeader post={post} />
          </div>

          <div className="mx-auto w-full max-w-[70rem]">
            <BlogBody source={post.content} />
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />

          <div className="mx-auto mt-16 w-full max-w-[64rem] border-t border-border pt-8">
            <Link
              href="/blog"
              className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text2 transition-colors duration-200 hover:text-accent"
            >
              ← all posts
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
