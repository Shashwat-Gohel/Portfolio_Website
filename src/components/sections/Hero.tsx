"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

const ROLES = [
  "Full Stack Developer",
  "AI Engineer",
  "ML Practitioner",
  "Creative Technologist"
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

const CharacterReveal = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center whitespace-nowrap py-8 overflow-visible">
      {text.split("").map((char, i) => (
        <span key={i} className="overflow-hidden inline-flex px-[0.1em] py-4">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: i * 0.05,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        </span>
      ))}
    </div>
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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">

      {/* Dynamic Light Follower */}
      <motion.div
        style={{
          left: springX,
          top: springY,
        }}
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Subtle Background Textures */}
      <div className="absolute inset-0 drafting-grid opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl text-center space-y-16">
        <div className="space-y-8 overflow-visible w-full">


          <div className="relative px-4 w-full">
            <h1 className="text-[11vw] md:text-[8vw] lg:text-[7.5vw] font-extralight tracking-[-0.085em] text-foreground leading-tight text-center whitespace-nowrap">
              <CharacterReveal text="Shashwat Gohel" />
            </h1>


          </div>



          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col items-center gap-4 text-xl md:text-2xl font-light text-foreground/50"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-foreground/10" />
              <Typewriter />
              <span className="w-12 h-[1px] bg-foreground/10" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="max-w-xl mx-auto space-y-8"
        >
          <p className="text-base md:text-lg text-foreground/40 font-light leading-relaxed lowercase tracking-tight px-4">
            Engineering architected digital ecosystems where precision,
            performance, and aesthetics converge. Specialized in
            full-stack development and machine learning.
          </p>

          <div className="flex justify-center gap-12 pt-4">
            <Link href="/work" className="text-[11px] font-mono uppercase tracking-[0.4em] text-foreground/40 hover:text-foreground transition-all duration-500 py-3 group relative px-2">
              <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1 block">work_archive</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </Link>
            <Link href="/contact" className="text-[11px] font-mono uppercase tracking-[0.4em] text-foreground/40 hover:text-foreground transition-all duration-500 py-3 group relative px-2">
              <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1 block">connect_node</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Aesthetic Footer Element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 pointer-events-none"
      >
        <div className="w-[1px] h-32 bg-gradient-to-b from-foreground via-foreground/50 to-transparent" />
        <span className="font-mono text-[8px] uppercase tracking-[0.8em] text-foreground rotate-90 translate-y-24">Scroll</span>
      </motion.div>
    </section>
  );
};

