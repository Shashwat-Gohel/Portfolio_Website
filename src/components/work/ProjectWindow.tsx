"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { X, FileText, LayoutGrid, MousePointer2, XCircle, RotateCw, Share2, Search, Clock, Folder, Monitor, Download, HardDrive, File, ChevronRight, GraduationCap, Cloud } from "lucide-react";
import { Project } from "@/lib/projectData";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProjectWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  projects: Project[];
  onProjectSelect?: (project: Project) => void;
  onCategoryChange?: (category: "sde" | "ml" | "media" | "cert") => void;
  currentCategory?: string | null;
  onFocus?: () => void;
  zIndex?: number;
  dragConstraints?: React.RefObject<HTMLDivElement | null>;
}

export const ProjectWindow = ({ 
  isOpen, 
  onClose, 
  title, 
  projects, 
  onProjectSelect, 
  onCategoryChange,
  currentCategory,
  onFocus,
  zIndex = 50,
  dragConstraints
}: ProjectWindowProps) => {
  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isFullScreen = isMobile;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          drag={!isFullScreen}
          dragControls={dragControls}
          dragMomentum={false}
          dragListener={false}
          dragConstraints={dragConstraints}
          onPointerDown={onFocus}
          initial={isFullScreen ? { opacity: 0, y: 20 } : { scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={isFullScreen ? { opacity: 0, y: 20 } : { scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ zIndex }}
          className={cn(
            "absolute bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/10 rounded-[2.2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,1)] flex flex-col overflow-hidden ring-1 ring-white/10",
            isFullScreen 
              ? "inset-2 w-auto h-auto rounded-[1.8rem] bottom-16" 
              : "w-[96%] left-[2%] h-[90%] top-[5%] md:w-[88%] md:left-[6%] md:h-[78%] md:top-[11%] md:max-w-4xl"
          )}
        >
          {/* macOS Finder Toolbar */}
          <div 
            onPointerDown={(e) => dragControls.start(e)}
            className="flex flex-col bg-white/5 border-b border-white/5 select-none pt-3 pb-2 cursor-default active:cursor-grabbing rounded-t-[2.2rem]"
          >
            
            {/* Top Row: Traffic Lights & Title */}
            <div className="flex items-center px-4 mb-2 relative">
              <div className="flex gap-2 w-20 relative z-10">
                <button 
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }} 
                  className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 flex items-center justify-center group cursor-pointer"
                >
                  <X size={8} className="text-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              
              <div className="absolute inset-x-0 flex items-center justify-center gap-1.5 pointer-events-none">
                 <FileText size={14} className="text-white/60" />
                 <span className="font-sans text-[12px] font-semibold text-white/80 tracking-tight">
                    {title.toLowerCase().replace(/ /g, "_")}.log
                 </span>
              </div>
            </div>

            {/* Bottom Row: Toolbar Controls & Search - Hidden on small screens */}
            <div className="hidden sm:flex items-center justify-between px-4 mt-2">
              <div className="flex items-center gap-6">
                <div 
                  className="flex flex-col items-center gap-0.5 group cursor-pointer"
                  onClick={() => alert("Reveal feature coming soon!")}
                >
                  <LayoutGrid size={18} className="text-white/40 group-hover:text-white/80 transition-colors" />
                  <span className="text-[8px] text-white/30 uppercase tracking-tighter">Reveal</span>
                </div>
                <div 
                  className="flex flex-col items-center gap-0.5 group cursor-pointer"
                  onClick={() => alert("Now feature engaged!")}
                >
                  <MousePointer2 size={18} className="text-white/40 group-hover:text-white/80 transition-colors" />
                  <span className="text-[8px] text-white/30 uppercase tracking-tighter">Now</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 group cursor-pointer" onClick={onClose}>
                  <XCircle size={18} className="text-white/40 group-hover:text-white/80 transition-colors" />
                  <span className="text-[8px] text-white/30 uppercase tracking-tighter">Clear</span>
                </div>
                <div className="w-[1px] h-6 bg-white/10 mx-1" />
                <div 
                  className="flex flex-col items-center gap-0.5 group cursor-pointer"
                  onClick={() => alert("Window reloaded!")}
                >
                  <RotateCw size={18} className="text-white/40 group-hover:text-white/80 transition-colors" />
                  <span className="text-[8px] text-white/30 uppercase tracking-tighter">Reload</span>
                </div>
                <div 
                  className="flex flex-col items-center gap-0.5 group cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }}
                >
                  <Share2 size={18} className="text-white/40 group-hover:text-white/80 transition-colors" />
                  <span className="text-[8px] text-white/30 uppercase tracking-tighter">Share</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative w-44">
                 <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/20" />
                 <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full bg-white/5 border border-white/10 rounded-md py-1.5 pl-8 pr-2 text-[11px] text-white/60 placeholder:text-white/10 focus:outline-none focus:border-white/20 transition-all font-sans"
                 />
              </div>
            </div>
          </div>

          {/* Window Content: Sidebar + List View */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar (Left Pane) - Hidden on mobile */}
            <div className={cn(
              "w-56 bg-black/40 border-r border-white/5 flex flex-col py-3 overflow-y-auto custom-scrollbar flex-shrink-0 rounded-bl-[2.2rem] transition-all",
              "hidden md:flex"
            )}>
              
              {/* Recents / Shared */}
              <div className="px-3 space-y-1 mb-4">
                <Link href="/experience" className="flex items-center gap-2 px-3 py-1.5 rounded text-white/70 hover:bg-white/10 transition-colors cursor-pointer">
                  <Clock size={14} className="text-white/50" />
                  <span className="text-[11px] font-medium tracking-tight">Recents</span>
                </Link>
                <Link href="/stack" className="flex items-center gap-2 px-3 py-1.5 rounded text-white/70 hover:bg-white/10 transition-colors cursor-pointer">
                  <Folder size={14} className="text-white/50" />
                  <span className="text-[11px] font-medium tracking-tight">Shared</span>
                </Link>
              </div>

              {/* Favourites */}
              <div className="px-3 mb-4">
                <span className="px-3 text-[9px] font-bold text-white/30 uppercase tracking-wider mb-1 block">Favourites</span>
                <div className="space-y-1">
                  <Link href="/ShashwatGohel_Resume-2.pdf" target="_blank" className="flex items-center gap-2 px-3 py-1.5 rounded text-white/70 hover:bg-white/10 transition-colors cursor-pointer">
                    <File size={14} className="text-white/50" />
                    <span className="text-[11px] font-medium tracking-tight">Resume</span>
                  </Link>
                  <Link href="/" className="flex items-center gap-2 px-3 py-1.5 rounded text-white/70 hover:bg-white/10 transition-colors cursor-pointer">
                    <Monitor size={14} className="text-white/50" />
                    <span className="text-[11px] font-medium tracking-tight">Desktop</span>
                  </Link>
                  <Link href="/stack" className="flex items-center gap-2 px-3 py-1.5 rounded text-white/70 hover:bg-white/10 transition-colors cursor-pointer">
                    <File size={14} className="text-white/50" />
                    <span className="text-[11px] font-medium tracking-tight">Stack Log</span>
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 px-3 py-1.5 rounded text-white/70 hover:bg-white/10 transition-colors cursor-pointer">
                    <Download size={14} className="text-white/50" />
                    <span className="text-[11px] font-medium tracking-tight">Downloads</span>
                  </Link>
                  <Link href="/" className="flex items-center gap-2 px-3 py-1.5 rounded text-white/70 hover:bg-white/10 transition-colors cursor-pointer">
                    <Folder size={14} className="text-white/50" />
                    <span className="text-[11px] font-medium tracking-tight">Portfolio Workspace</span>
                  </Link>
                  
                  {/* Folder Categories */}
                  <div className="pt-2 mt-2 border-t border-white/5 space-y-1">
                    <div 
                      onClick={() => onCategoryChange?.("sde")}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded transition-colors cursor-pointer",
                        currentCategory === 'sde' ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10"
                      )}
                    >
                      <Folder size={14} className={currentCategory === 'sde' ? "text-[#007AFF]" : "text-white/50"} />
                      <span className="text-[11px] font-medium tracking-tight">SDE_SYSTEMS</span>
                    </div>
                    <div 
                      onClick={() => onCategoryChange?.("ml")}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded transition-colors cursor-pointer",
                        currentCategory === 'ml' ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10"
                      )}
                    >
                      <Folder size={14} className={currentCategory === 'ml' ? "text-[#007AFF]" : "text-white/50"} />
                      <span className="text-[11px] font-medium tracking-tight">ML_MODELS</span>
                    </div>
                    <div 
                      onClick={() => onCategoryChange?.("media")}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded transition-colors cursor-pointer",
                        currentCategory === 'media' ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10"
                      )}
                    >
                      <Folder size={14} className={currentCategory === 'media' ? "text-[#007AFF]" : "text-white/50"} />
                      <span className="text-[11px] font-medium tracking-tight">MEDIA_NODES</span>
                    </div>
                    <div 
                      onClick={() => onCategoryChange?.("cert")}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded transition-colors cursor-pointer",
                        currentCategory === 'cert' ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10"
                      )}
                    >
                      <GraduationCap size={14} className={currentCategory === 'cert' ? "text-[#007AFF]" : "text-white/50"} />
                      <span className="text-[11px] font-medium tracking-tight">CERTIFICATIONS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Locations */}
              <div className="px-3">
                <span className="px-3 text-[9px] font-bold text-white/30 uppercase tracking-wider mb-1 block">Locations</span>
                <div className="space-y-1">
                  <Link href="/#contact" className="flex items-center gap-2 px-3 py-1.5 rounded text-white/70 hover:bg-white/10 transition-colors cursor-pointer">
                    <Cloud size={14} className="text-white/50" />
                    <span className="text-[11px] font-medium tracking-tight">iCloud Drive</span>
                  </Link>
                  <Link href="/#stack" className="flex items-center gap-2 px-3 py-1.5 rounded text-white/70 hover:bg-white/10 transition-colors cursor-pointer">
                    <HardDrive size={14} className="text-white/50" />
                    <span className="text-[11px] font-medium tracking-tight">System Disk</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content (Right Pane - List View) */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e]/50 rounded-br-[2.2rem]">
              
              {/* List Header - Hidden on mobile */}
              <div className="hidden sm:flex items-center px-4 py-1.5 border-b border-white/10 text-[10px] text-white/40 font-medium tracking-tight">
                <div className="w-1/2 flex items-center gap-1 cursor-pointer hover:text-white/60">Name <ChevronRight size={10} className="rotate-90"/></div>
                <div className="w-1/4">Date Modified</div>
                <div className="w-[12%]">Size</div>
                <div className="w-[13%]">Kind</div>
              </div>

              {/* List Body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => onProjectSelect && onProjectSelect(project)}
                    className={cn(
                      "flex items-center px-4 py-1.5 hover:bg-white/10 transition-colors cursor-pointer",
                      index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                    )}
                  >
                    <div className="w-full sm:w-1/2 flex items-center gap-2 pr-4">
                      {/* Icon representing project - show file icon for .txt files */}
                      {project.title.endsWith('.txt') ? (
                        <File size={16} className="text-white/60 flex-shrink-0" />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="#007AFF" className="w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.25 6.75C2.25 5.92157 2.92157 5.25 3.75 5.25H8.64645C8.84536 5.25 9.03613 5.32902 9.17678 5.46967L11.4697 7.76256C11.6103 7.90321 11.8011 7.98223 12 7.98223H20.25C21.0784 7.98223 21.75 8.65366 21.75 9.48209V17.25C21.75 18.0784 21.0784 18.75 20.25 18.75H3.75C2.92157 18.75 2.25 18.0784 2.25 17.25V6.75Z" />
                          <path d="M2.25 6.75C2.25 5.92157 2.92157 5.25 3.75 5.25H8.64645C8.84536 5.25 9.03613 5.32902 9.17678 5.46967L11.4697 7.76256C11.6103 7.90321 11.8011 7.98223 12 7.98223H20.25C21.0784 7.98223 21.75 8.65366 21.75 9.48209V9.75H2.25V6.75Z" fill="rgba(255,255,255,0.1)" />
                        </svg>
                      )}
                      <span className="text-[12px] font-medium text-white/90 truncate">{project.title}</span>
                    </div>
                    <div className="hidden sm:block w-1/4 text-[11px] text-white/60 truncate">Today at 10:15</div>
                    <div className="hidden sm:block w-[12%] text-[11px] text-white/60 truncate">--</div>
                    <div className="hidden sm:block w-[13%] text-[11px] text-white/60 truncate">Folder</div>
                  </motion.div>
                ))}
                
                {projects.length === 0 && (
                  <div className="h-40 flex items-center justify-center">
                    <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">No items found</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
