import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/config";
import { getAllPosts, getValidDate } from "@/lib/posts";

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
    const posts = getAllPosts();
    const latestPostDate = posts[0] ? getValidDate(posts[0].date) : null;

    blogRoutes = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: getValidDate(post.date) || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    blogRoutes.unshift({
      url: `${SITE_URL}/blog`,
      lastModified: latestPostDate || new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  } catch {
    // Blog is optional for now.
  }

  return [...staticRoutes, ...blogRoutes];
}
