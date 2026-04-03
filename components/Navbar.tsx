"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useActiveSection } from "@/hooks/useActiveSection";
import { fadeUp } from "@/lib/animations";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const activeSection = useActiveSection();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-20">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="font-mono text-sm font-medium text-accent transition-opacity duration-200 hover:opacity-80"
        >
          GJ
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                  isActive ? "text-accent" : "text-muted hover:text-accent"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((open) => !open)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className="h-px w-6 bg-primary" />
          <span className="h-px w-6 bg-primary" />
          <span className="h-px w-6 bg-primary" />
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
                    className={`border-b border-border py-4 font-mono text-xs uppercase tracking-widest transition-colors duration-200 last:border-b-0 ${
                      isActive ? "text-accent" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
