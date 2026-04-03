import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const { getAllPosts } = await import("@/lib/posts");
    const posts = await getAllPosts();

    blogRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    blogRoutes.unshift({
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  } catch {
    // Blog is optional for now.
  }

  return [...staticRoutes, ...blogRoutes];
}
