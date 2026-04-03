import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SITE_URL } from "@/lib/config";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

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
      canonical: `${SITE_URL}/blog/${params.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    author: { "@type": "Person", name: "Gourav Joshi" },
    datePublished: post.date,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto min-h-screen max-w-3xl px-6 py-24 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Blog
        </p>
        <h1 className="mt-4 font-sans text-4xl font-bold text-primary md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 font-mono text-sm text-muted">{post.description}</p>
      </header>
      <section className="py-10 font-mono text-sm leading-7 text-muted">
        Blog content rendering is ready for `@/lib/posts` once MDX post loading is
        added.
      </section>
    </article>
  );
}
