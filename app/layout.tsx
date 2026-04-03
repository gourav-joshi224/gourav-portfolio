import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";

import { SITE_HANDLE, SITE_NAME, SITE_URL } from "@/lib/config";
import "./globals.css";

const sans = Syne({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gourav Joshi — Backend Developer | Node.js, NestJS, PostgreSQL",
    template: "%s | Gourav Joshi",
  },
  description:
    "Gourav Joshi is a backend developer from India with 3+ years building scalable APIs, microservices, and event-driven systems using Node.js, NestJS, PostgreSQL, and TypeScript. Open to full-time and freelance opportunities.",
  keywords: [
    "Gourav Joshi",
    "Gourav Joshi backend developer",
    "gouravjoshi",
    "gourav backend dev",
    "gourav dev",
    "backend developer India",
    "Node.js developer India",
    "NestJS",
    "NestJS backend engineer",
    "PostgreSQL",
    "TypeScript backend developer",
    "REST API developer India",
    "microservices",
    "backend engineer for hire",
    "BITS Pilani developer",
    "Delhi backend developer",
    "hire backend developer India",
    "Node.js NestJS PostgreSQL",
    "TypeORM developer",
    "JWT OAuth backend",
    "AWS backend developer India",
  ],
  authors: [{ name: "Gourav Joshi", url: SITE_URL }],
  creator: "Gourav Joshi",
  publisher: "Gourav Joshi",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Gourav Joshi — Backend Developer | Node.js · NestJS · PostgreSQL",
    description:
      "Backend developer with 3+ years shipping scalable systems. Node.js, NestJS, PostgreSQL, TypeScript. Based in India. Available for opportunities.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Gourav Joshi — Backend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gourav Joshi — Backend Developer",
    description:
      "Node.js · NestJS · PostgreSQL · TypeScript. Building scalable backend systems.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-bg text-primary antialiased scrollbar-thin scrollbar-track-surface scrollbar-thumb-accent/30">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: SITE_NAME,
              url: SITE_URL,
              jobTitle: "Backend Developer",
              description:
                "Backend developer with 3+ years building scalable APIs and microservices using Node.js, NestJS, and PostgreSQL.",
              knowsAbout: [
                "Node.js",
                "NestJS",
                "PostgreSQL",
                "TypeScript",
                "Microservices",
                "REST APIs",
                "Docker",
                "AWS",
                "Redis",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Unthinkable Solutions",
              },
              alumniOf: [
                {
                  "@type": "CollegeOrUniversity",
                  name: "BITS Pilani",
                },
                {
                  "@type": "CollegeOrUniversity",
                  name: "Indira Gandhi National Open University",
                },
              ],
              sameAs: [
                "https://www.linkedin.com/in/gourav-joshi",
                "https://github.com/YOUR_GITHUB_HANDLE",
              ],
              email: "gouravjoshi615@gmail.com",
              identifier: SITE_HANDLE,
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
