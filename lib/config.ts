const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://gourav-dev-psi.vercel.app";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export const SITE_NAME = "Gourav Joshi";
export const SITE_HANDLE = "gourav-dev-psi.vercel.app";
export const SITE_AUTHOR = "Gourav Joshi";
export const SITE_DESCRIPTION =
  "Gourav Joshi is a backend developer from India with 3+ years building scalable APIs, microservices, and event-driven systems using Node.js, NestJS, PostgreSQL, and TypeScript. Open to full-time and freelance opportunities.";

export const BLOG_TITLE = "Blog";
export const BLOG_DESCRIPTION =
  "Thoughts on backend engineering, Node.js, NestJS, PostgreSQL, system design, and production lessons from building real systems.";
export const DEFAULT_OG_IMAGE = "/opengraph-image";

function withLeadingSlash(value: string) {
  return value.startsWith("/") ? value : `/${value}`;
}

export function buildAbsoluteUrl(value: string) {
  if (!value) {
    return SITE_URL;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${SITE_URL}${withLeadingSlash(value)}`;
}
