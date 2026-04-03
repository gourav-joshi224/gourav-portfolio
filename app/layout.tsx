import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
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
  title: "Gourav Joshi — Backend Developer | Node.js, NestJS, PostgreSQL",
  description:
    "Backend developer with 3+ years building scalable systems using Node.js, NestJS, and PostgreSQL. Open to full-time and freelance roles.",
  keywords: [
    "Gourav Joshi",
    "backend developer",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "TypeScript",
    "REST API",
    "microservices",
  ],
  authors: [{ name: "Gourav Joshi" }],
  openGraph: {
    title: "Gourav Joshi — Backend Developer",
    description:
      "Backend engineer specializing in scalable APIs, microservices, and event-driven architecture.",
    type: "website",
  },
  robots: { index: true, follow: true },
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
        {children}
      </body>
    </html>
  );
}
