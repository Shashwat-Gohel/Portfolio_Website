"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

const ROLES = [
  "Full stack developer",
  "AI engineer",
  "ML developer"
];

const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === ROLES[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 3000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="font-mono text-foreground/80 lowercase tracking-tighter">
      {ROLES[index].substring(0, subIndex)}
      <span className="animate-blink font-bold text-accent">_</span>
    </span>
  );
};

export const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 md:pt-0 overflow-hidden">

      {/* Dynamic Light Follower — hidden on touch devices */}
      <motion.div
        style={{ left: springX, top: springY }}
        className="hidden md:block absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Subtle Background Textures */}
      <div className="absolute inset-0 drafting-grid opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl text-center">

        {/* ── Name ── */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
          className="font-extralight tracking-[-0.05em] text-foreground leading-none text-center
                     text-[11.5vw] xs:text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7.5vw]"
        >
          Shashwat Gohel
        </motion.h1>

        {/* ── Typewriter Role ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center mt-6 sm:mt-10 gap-4 text-base sm:text-lg md:text-2xl font-light text-foreground/50"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="w-6 sm:w-12 h-[1px] bg-foreground/10" />
            <Typewriter />
            <span className="w-6 sm:w-12 h-[1px] bg-foreground/10" />
          </div>
        </motion.div>

        {/* ── Bio & CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-10 sm:mt-16 max-w-xl mx-auto space-y-6 sm:space-y-8"
        >
          <p className="text-xs sm:text-sm md:text-lg text-foreground/40 font-light leading-relaxed lowercase tracking-tight px-2 sm:px-6 mx-auto">
            I am a full-stack developer and freelancer who builds high-performance web applications.
            I also specialize in AI and Machine Learning, creating intelligent solutions that
            bridge the gap between complex algorithms and engaging digital experiences.
          </p>

          <div className="flex justify-center pt-2 sm:pt-4">
            <Link
              href="/work"
              className="text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.25em] sm:tracking-[0.5em] text-foreground/50 hover:text-foreground transition-all duration-500 py-3 sm:py-4 px-7 sm:px-10 border border-foreground/10 hover:border-foreground/30 rounded-full group relative overflow-hidden bg-white/[0.02]"
            >
              <span className="relative z-10 group-hover:scale-110 block transition-transform duration-500">Let&apos;s Explore</span>
              <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on small mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 2 }}
        className="hidden sm:flex absolute bottom-16 left-1/2 -translate-x-1/2 flex-col items-center gap-6 pointer-events-none"
      >
        <div className="w-[1px] h-32 bg-gradient-to-b from-foreground via-foreground/50 to-transparent" />
        <span className="font-mono text-[8px] uppercase tracking-[0.8em] text-foreground rotate-90 translate-y-24">Scroll</span>
      </motion.div>
    </section>
  );
};
