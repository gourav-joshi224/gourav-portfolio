import fs from "fs";
import path from "path";

import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content/blog");
const POSTS_PER_PAGE = 9;

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
  readingTime: string;
  content: string;
};

export type PaginatedPosts = {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  totalPosts: number;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const filePath = path.join(POSTS_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      return {
        slug: (data.slug as string | undefined) || filename.replace(/\.mdx?$/, ""),
        title: (data.title as string | undefined) || "",
        date: (data.date as string | undefined) || "",
        description: (data.description as string | undefined) || "",
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        published: data.published !== false,
        readingTime: (data.readingTime as string | undefined) || stats.text,
        content,
      } satisfies Post;
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPaginatedPosts(page = 1): PaginatedPosts {
  const allPosts = getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const currentPage = Math.min(Math.max(page, 1), totalPages || 1);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return { posts, totalPages, currentPage, totalPosts };
}

export function getPostBySlug(slug: string): Post | null {
  const allPosts = getAllPosts();
  return allPosts.find((post) => post.slug === slug) || null;
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = allPosts.flatMap((post) => post.tags);

  return [...new Set(tags)].sort();
}

export function getPostsByTag(tag: string, page = 1): PaginatedPosts {
  const allPosts = getAllPosts().filter((post) =>
    post.tags.map((entry) => entry.toLowerCase()).includes(tag.toLowerCase())
  );
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const currentPage = Math.min(Math.max(page, 1), totalPages || 1);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return { posts, totalPages, currentPage, totalPosts };
}

export { getAllPosts as default };
