"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "home_node", href: "/" },
  { label: "work_archive", href: "/work" },
  { label: "stack_log", href: "/stack" },
  { label: "experience_log", href: "/experience" },
  { label: "connect_node", href: "/contact" },
];


export const Navbar = () => {
  return (
    <div className="fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-[100] w-[95vw] sm:w-fit px-2">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-1 p-1 px-3 sm:px-6 bg-background/40 backdrop-blur-xl border border-foreground/5 rounded-full shadow-2xl shadow-black/50 overflow-x-auto scrollbar-none"
      >
        <div className="flex items-center gap-4 sm:gap-8 py-1.5 sm:py-2 min-w-max mx-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative px-1.5 sm:px-2 py-1 text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-foreground/40 hover:text-foreground transition-all duration-500"
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
  );
};

