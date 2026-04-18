"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Stack", href: "/stack" },
  { label: "Experience", href: "/experience" },
  { label: "Connect", href: "/contact" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <div className="hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-fit px-2">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-1 p-1 px-6 bg-background/40 backdrop-blur-xl border border-foreground/5 rounded-full shadow-2xl shadow-black/50"
        >
          <div className="flex items-center gap-8 py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative px-2 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-foreground/40 hover:text-foreground transition-all duration-500"
              >
                <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-0.5 block">
                  {link.label}
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile Navbar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 py-4 bg-background/80 backdrop-blur-xl border-b border-foreground/5">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50"
        >
          S.Gohel
        </motion.span>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-foreground/60 hover:text-foreground transition-colors p-1"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile Dropdown Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[57px] left-0 right-0 z-[99] bg-background/95 backdrop-blur-xl border-b border-foreground/5 flex flex-col"
          >
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-4 text-[11px] font-mono uppercase tracking-[0.3em] text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all duration-300 border-b border-foreground/5 last:border-0"
              >
                {String(i + 1).padStart(2, "0")} — {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
