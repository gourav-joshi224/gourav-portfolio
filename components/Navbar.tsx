"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useActiveSection } from "@/hooks/useActiveSection";
import { fadeUp } from "@/lib/animations";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Blog", href: "/blog", id: "blog", isPage: true },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const activeSection = useActiveSection();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const performScroll = () => {
      if (sectionId === "hero") {
        window.history.replaceState(null, "", "#hero");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const section = document.getElementById(sectionId);

      if (!section) {
        return;
      }

      window.history.replaceState(null, "", `#${sectionId}`);
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const delay = isOpen ? 320 : 0;
    setIsOpen(false);
    window.setTimeout(performScroll, delay);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [activeSection]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300 ${
        isScrolled
          ? "border-border bg-[rgba(8,8,8,0.9)]"
          : "border-transparent bg-[rgba(8,8,8,0.78)]"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5 md:px-8">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-3 text-left"
        >
          <span className="font-mono text-sm font-bold text-accent">GJ</span>
          <span className="h-4 w-px bg-border" />
          <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.16em] text-text3 sm:block">
            Backend Developer
          </span>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            if (item.isPage) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-text3 transition-colors duration-200 hover:text-accent"
                >
                  <span className="h-1 w-1 rounded-full bg-accent transition-transform duration-200 group-hover:scale-125" />
                  {item.label}
                </Link>
              );
            }

            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`font-mono text-[0.72rem] uppercase tracking-[0.15em] transition-colors duration-200 ${
                  isActive ? "text-accent" : "text-text3 hover:text-accent"
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center gap-2 border border-[rgba(0,255,135,0.18)] bg-accent px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-bg transition-transform duration-200 hover:-translate-y-px"
          >
            <span className="status-dot h-1.5 w-1.5 rounded-full bg-bg" />
            Open to work
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((open) => !open)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className="h-px w-6 bg-text1" />
          <span className="h-px w-6 bg-text1" />
          <span className="h-px w-6 bg-text1" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-surface md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {navItems.map((item, index) => {
                if (item.isPage) {
                  return (
                    <motion.div
                      key={item.id}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      custom={index}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block border-b border-border py-4 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent transition-opacity duration-200 last:border-b-0 hover:opacity-80"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                }

                const isActive = activeSection === item.id;

                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id);
                    }}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    custom={index}
                    className={`border-b border-border py-4 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-200 last:border-b-0 ${
                      isActive ? "text-accent" : "text-text3"
                    }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="mt-4 inline-flex w-fit items-center gap-2 bg-accent px-3 py-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-bg"
              >
                <span className="status-dot h-1.5 w-1.5 rounded-full bg-bg" />
                Open to work
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
