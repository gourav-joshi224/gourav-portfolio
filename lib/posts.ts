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
  image: string | null;
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

function sanitizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

function extractFallbackDescription(content: string, maxLength = 170) {
  const cleaned = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/[*_>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return "";
  }

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return `${cleaned.slice(0, maxLength).trimEnd()}…`;
}

function normalizeTags(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  const seen = new Set<string>();
  const tags: string[] = [];

  for (const entry of value) {
    if (typeof entry !== "string") {
      continue;
    }

    const normalized = sanitizeText(entry);

    if (!normalized) {
      continue;
    }

    const key = normalized.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    tags.push(normalized);
  }

  return tags;
}

function resolvePostImage(data: Record<string, unknown>) {
  const candidates = [data.ogImage, data.image, data.coverImage];

  for (const candidate of candidates) {
    if (typeof candidate !== "string") {
      continue;
    }

    const image = candidate.trim();
    if (image) {
      return image;
    }
  }

  return null;
}

export function getValidDate(date: string) {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getIsoDate(date: string) {
  return getValidDate(date)?.toISOString();
}

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
      const fileSlug = filename.replace(/\.mdx?$/, "");
      const slug =
        typeof data.slug === "string" && data.slug.trim()
          ? sanitizeText(data.slug)
          : fileSlug;
      const title =
        typeof data.title === "string" && data.title.trim()
          ? sanitizeText(data.title)
          : titleFromSlug(slug);
      const description =
        typeof data.description === "string" && data.description.trim()
          ? sanitizeText(data.description)
          : extractFallbackDescription(content);
      const date =
        typeof data.date === "string" && data.date.trim()
          ? sanitizeText(data.date)
          : "";

      return {
        slug,
        title,
        date,
        description,
        tags: normalizeTags(data.tags),
        image: resolvePostImage(data),
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
  const tagsByNormalizedLabel = new Map<string, string>();

  for (const post of allPosts) {
    for (const tag of post.tags) {
      const key = tag.toLowerCase();
      if (!tagsByNormalizedLabel.has(key)) {
        tagsByNormalizedLabel.set(key, tag);
      }
    }
  }

  return Array.from(tagsByNormalizedLabel.values()).sort((a, b) =>
    a.localeCompare(b, "en", { sensitivity: "base" })
  );
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
