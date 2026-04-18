"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MacBookShell } from "@/components/work/MacBookShell";
import { ProjectFolder } from "@/components/work/ProjectFolder";
import { StackLogWindow } from "@/components/stack/StackLogWindow";
import { MacDock } from "@/components/work/MacDock";
import { STACK_DATA, SkillCategory } from "@/lib/stackData";

interface WindowInstance {
  id: string;
  category: SkillCategory;
  zIndex: number;
}

export default function StackLog() {
  const [openWindows, setOpenWindows] = useState<WindowInstance[]>([]);
  const [topZIndex, setTopZIndex] = useState(100);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const openWindow = (category: SkillCategory) => {
    setOpenWindows(prev => {
      const existing = prev.find(w => w.category.id === category.id);
      
      const nextZ = topZIndex + 1;
      setTopZIndex(nextZ);

      if (existing) {
        return prev.map(w => w.id === existing.id ? { ...w, zIndex: nextZ } : w);
      }
      
      const id = Math.random().toString(36).substring(2, 11);
      const newWindow: WindowInstance = {
        id,
        category,
        zIndex: nextZ,
      };
      
      return [...prev, newWindow];
    });
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const focusWindow = (id: string) => {
    const newZ = topZIndex + 1;
    setTopZIndex(newZ);
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: newZ } : w
    ));
  };

  return (
    <main className="w-full bg-black flex flex-col items-center justify-center overflow-hidden relative z-[50]
                     h-[100dvh] pt-[57px] md:pt-0 px-2 sm:px-4 md:px-6 pb-2 md:pb-6">
      <div className="absolute inset-0 bg-black -z-10" />

      <MacBookShell>
        <div ref={constraintsRef} className="relative h-full w-full p-4 flex flex-col pt-8 overflow-hidden">
          
          {/* Desktop Skill Folder Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-8 p-4 sm:p-8 overflow-y-auto custom-scrollbar-hidden w-full h-full content-start pb-32">
            {STACK_DATA.map((cat) => (
              <ProjectFolder 
                key={cat.id}
                label={cat.title}
                onClick={() => openWindow(cat)} 
              />
            ))}
          </div>

          <MacDock />

          {/* Window Renderer */}
          {openWindows.map((win) => (
            <StackLogWindow 
              key={win.id}
              category={win.category}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
              zIndex={win.zIndex}
              dragConstraints={constraintsRef}
            />
          ))}

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-4 left-0 right-0 text-center text-[9px] font-mono text-white/20 uppercase tracking-widest pointer-events-none"
          >
            System Inventory: Accessing Technical Assets
          </motion.p>
        </div>
      </MacBookShell>
    </main>
  );
}
