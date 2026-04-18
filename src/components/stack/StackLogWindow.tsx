"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { X, Terminal, FileCode2, ChevronRight, Cpu } from "lucide-react";
import { SkillCategory, Skill } from "@/lib/stackData";
import { cn } from "@/lib/utils";

interface StackLogWindowProps {
  category: SkillCategory | null;
  onClose: () => void;
  onFocus?: () => void;
  zIndex?: number;
  dragConstraints?: React.RefObject<HTMLDivElement | null>;
}

export const StackLogWindow = ({ 
  category, 
  onClose,
  onFocus,
  zIndex = 60,
  dragConstraints
}: StackLogWindowProps) => {
  const [visibleSkills, setVisibleSkills] = useState<Skill[]>([]);
  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isFullScreen = isMobile;

  useEffect(() => {
    if (category) {
      setVisibleSkills([]);
      const timer = setInterval(() => {
        setVisibleSkills((prev) => {
          if (prev.length < category.skills.length) {
            return [...prev, category.skills[prev.length]];
          }
          clearInterval(timer);
          return prev;
        });
      }, 150); // Speed of typing reveal

      return () => clearInterval(timer);
    }
  }, [category]);

  if (!category) return null;

  const fileName = `${category.id}.sh`;
  const timestamp = new Date().toUTCString().replace("GMT", "IST");

  return (
    <AnimatePresence>
      <motion.div
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragListener={false}
        dragConstraints={dragConstraints}
        onPointerDown={onFocus}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ zIndex }}
        className={cn(
          "absolute bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_40px_80px_-20px_rgba(0,0,0,1)] flex flex-col overflow-hidden ring-1 ring-white/5",
          isFullScreen 
            ? "inset-2 w-auto h-auto rounded-xl bottom-16" 
            : "w-[96%] left-[2%] h-[88%] top-[6%] md:w-[88%] md:max-w-4xl md:h-[78%] md:left-[6%] md:top-[11%]"
        )}
      >
        {/* macOS Terminal Header */}
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          className="flex items-center justify-between px-4 py-2.5 bg-[#161616] border-b border-white/5 select-none cursor-default active:cursor-grabbing"
        >
          <div className="flex items-center gap-2 w-24 relative z-10">
            <div 
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); onClose(); }} 
              className="w-3 h-3 min-w-[12px] min-h-[12px] aspect-square flex-shrink-0 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 flex items-center justify-center group cursor-pointer p-0 border-none outline-none overflow-hidden"
            >
              <X size={8} className="text-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="w-3 h-3 min-w-[12px] min-h-[12px] aspect-square flex-shrink-0 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 min-w-[12px] min-h-[12px] aspect-square flex-shrink-0 rounded-full bg-[#27C93F]" />
          </div>
          
          <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none gap-2">
            <Terminal size={13} className="text-white/40" />
            <span className="font-mono text-[11px] font-medium text-white/70 tracking-tight">
              shashwat -- {fileName}
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/20 pr-1">
             <FileCode2 size={14} />
          </div>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-[11px] leading-relaxed select-text custom-scrollbar bg-black/20">
          <div className="text-white/40 mb-4 whitespace-nowrap">
            Last login: {timestamp} on ttys002<br />
            shashwat@macbook ~ % <span className="text-[#4ade80]">cat ./inventory/{category.id}.list</span>
          </div>

          <div className="space-y-2 mb-6">
            <div className="text-[#fbbf24] font-bold">[SYSTEM_SCAN] INITIALIZING_NODE_QUERY...</div>
            <div className="text-white/40">Found {category.skills.length} matching resources in category: <span className="text-[#38bdf8]">{category.title}</span></div>
          </div>

          <div className="space-y-2.5 pl-2 relative">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/5" />
            
            <AnimatePresence mode="popLayout">
              {visibleSkills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-[120px] sm:min-w-[180px]">
                    <span className="text-[#38bdf8] font-semibold tracking-tight">{skill.name.toLowerCase().replace(/ /g, "_")}</span>
                  </div>
                  <div className="h-[1px] flex-1 bg-white/5" />
                  <div className="flex items-center gap-2">
                    <span className="text-white/20 uppercase text-[9px] tracking-widest">Status:</span>
                    <span className="text-[#4ade80] font-bold text-[9px]">PRODUCTION_READY</span>
                    <Cpu size={10} className="text-white/20 animate-pulse" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Pulsing cursor after typing */}
            {visibleSkills.length < category.skills.length ? (
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-[#4ade80] mt-1 ml-4"
              />
            ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/40 mt-6 border-t border-white/5 pt-4"
                >
                  shashwat@macbook ~ % <span className="animate-pulse">_</span>
                </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
