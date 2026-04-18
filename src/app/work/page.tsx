"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MacBookShell } from "@/components/work/MacBookShell";
import { ProjectFolder } from "@/components/work/ProjectFolder";
import { ProjectWindow } from "@/components/work/ProjectWindow";
import { TextEditWindow } from "@/components/work/TextEditWindow";
import { MacDock } from "@/components/work/MacDock";
import { PROJECTS, Project } from "@/lib/projectData";
import Link from "next/link";

interface WindowInstance {
  id: string;
  type: 'finder' | 'log';
  category?: "sde" | "ml" | "media" | "cert";
  project?: Project;
  zIndex: number;
}

export default function WorkArchive() {
  const [openWindows, setOpenWindows] = useState<WindowInstance[]>([]);
  const [topZIndex, setTopZIndex] = useState(50);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const categoryTitles = {
    sde: "SDE // Full Stack",
    ml: "ML // AI Systems",
    media: "Publications // Media",
    cert: "Certifications // Docs"
  };

  const openWindow = (type: 'finder' | 'log', data: any) => {
    setOpenWindows(prev => {
      // Check if already open
      const existing = type === 'finder' 
        ? prev.find(w => w.category === data)
        : prev.find(w => w.project?.id === data.id);

      if (existing) {
        // Just focus the existing window
        const nextZ = topZIndex + 1;
        setTopZIndex(nextZ);
        return prev.map(w => w.id === existing.id ? { ...w, zIndex: nextZ } : w);
      }

      // Open new window
      const id = Math.random().toString(36).substring(2, 11);
      const nextZ = topZIndex + 1;
      setTopZIndex(nextZ);

      const newWindow: WindowInstance = {
        id,
        type,
        zIndex: nextZ,
        category: type === 'finder' ? data : undefined,
        project: type === 'log' ? data : undefined,
      };
      
      return [...prev, newWindow];
    });
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const focusWindow = (id: string) => {
    setOpenWindows(prev => {
      const window = prev.find(w => w.id === id);
      if (!window) return prev;
      
      const nextZ = topZIndex + 1;
      setTopZIndex(nextZ);
      
      return prev.map(w =>
        w.id === id ? { ...w, zIndex: nextZ } : w
      );
    });
  };

  const updateWindowCategory = (id: string, newCategory: "sde" | "ml" | "media" | "cert") => {
    setOpenWindows(prev => prev.map(w =>
      w.id === id ? { ...w, category: newCategory } : w
    ));
  };

  return (
    <main className="w-full bg-black flex flex-col items-center justify-center overflow-hidden relative z-[50]
                     h-[100dvh] pt-[57px] md:pt-0 px-2 sm:px-4 md:px-6 pb-2 md:pb-6">
      <div className="absolute inset-0 bg-black -z-10" />

      <MacBookShell>
        <div ref={constraintsRef} className="relative h-full w-full p-4 flex flex-col pt-8 overflow-hidden">

          {/* Desktop Folder Grid - Refined for better alignment */}
          <div className="flex flex-wrap justify-start items-start gap-8 p-4 sm:p-8 overflow-y-auto custom-scrollbar-hidden w-full">
            <ProjectFolder
              label="SDE Projects"
              onClick={() => openWindow('finder', 'sde')}
            />
            <ProjectFolder
              label="ML Project"
              onClick={() => openWindow('finder', 'ml')}
            />
            <ProjectFolder
              label="Publications"
              onClick={() => openWindow('finder', 'media')}
            />
            <ProjectFolder
              label="Certifications"
              onClick={() => openWindow('finder', 'cert')}
            />

            {/* Resume File */}
            <Link href="/ShashwatGohel_Resume-2.pdf" target="_blank" className="flex flex-col items-center gap-2 w-28 p-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group z-20 flex-shrink-0">
              <div className="relative w-16 h-16 pointer-events-none drop-shadow-md">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white/90">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="white" />
                  <path d="M14 2V8H20" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="8" y="13" width="8" height="2" rx="1" fill="#1A1A1A" />
                  <rect x="8" y="17" width="6" height="2" rx="1" fill="#1A1A1A" />
                  <path d="M8 9H10" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[10px] font-sans text-white/90 text-center tracking-tight leading-tight px-1 rounded bg-black/40">
                Resume
              </span>
            </Link>

            {/* Grade Sheet File */}
            <Link href="/Grade_sheet.pdf" target="_blank" className="flex flex-col items-center gap-2 w-28 p-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group z-20 flex-shrink-0">
              <div className="relative w-16 h-16 pointer-events-none drop-shadow-md">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white/90">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="white" />
                  <path d="M14 2V8H20" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="8" y="12" width="8" height="2" rx="0.5" fill="#007AFF" fillOpacity="0.8" />
                  <rect x="8" y="15" width="8" height="2" rx="0.5" fill="#007AFF" fillOpacity="0.4" />
                  <rect x="8" y="18" width="5" height="2" rx="0.5" fill="#007AFF" fillOpacity="0.2" />
                </svg>
              </div>
              <span className="text-[10px] font-sans text-white/90 text-center tracking-tight leading-tight px-1 rounded bg-black/40">
                Grade Sheet
              </span>
            </Link>
          </div>

          <MacDock />

          {/* Window Renderer */}
          {openWindows.map((win) => {
            if (win.type === 'finder' && win.category) {
              return (
                <ProjectWindow
                  key={win.id}
                  isOpen={true}
                  onClose={() => closeWindow(win.id)}
                  onFocus={() => focusWindow(win.id)}
                  zIndex={win.zIndex}
                  title={categoryTitles[win.category as keyof typeof categoryTitles]}
                  projects={PROJECTS.filter(p => p.category === win.category)}
                  onProjectSelect={(project) => openWindow('log', project)}
                  onCategoryChange={(cat) => updateWindowCategory(win.id, cat)}
                  currentCategory={win.category}
                // dragConstraints={constraintsRef}
                />
              );
            }
            if (win.type === 'log' && win.project) {
              return (
                <TextEditWindow
                  key={win.id}
                  project={win.project}
                  onClose={() => closeWindow(win.id)}
                  onFocus={() => focusWindow(win.id)}
                  zIndex={win.zIndex}
                // dragConstraints={constraintsRef}
                />
              );
            }
            return null;
          })}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-4 left-0 right-0 text-center text-[9px] font-mono text-white/20 uppercase tracking-widest pointer-events-none"
          >
            Double-click folders to scan directories
          </motion.p>
        </div>
      </MacBookShell>
    </main>
  );
}
