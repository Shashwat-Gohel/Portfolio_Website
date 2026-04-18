"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { X, Terminal, Briefcase, Calendar, CheckCircle2, History, Database, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExperienceRole {
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  achievements: string[];
  skills: string[];
  liveLink?: string;
}

interface ExperienceWindowProps {
  role: ExperienceRole | null;
  onClose: () => void;
  zIndex?: number;
  dragConstraints?: React.RefObject<HTMLDivElement | null>;
}

export const ExperienceWindow = ({ 
  role, 
  onClose,
  zIndex = 60,
  dragConstraints
}: ExperienceWindowProps) => {
  const dragControls = useDragControls();
  
  if (!role) return null;

  const fileName = `${role.company.toLowerCase().replace(/ /g, "_")}_session.log`;
  const timestamp = new Date().toUTCString().replace("GMT", "IST 2026");

  return (
    <AnimatePresence>
      <motion.div
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragListener={false}
        dragConstraints={dragConstraints}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ zIndex }}
        className={cn(
          "absolute bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-[2.2rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden ring-1 ring-white/10",
          "w-[96%] left-[2%] h-[90%] top-[5%] sm:w-[92%] sm:max-w-2xl sm:h-[70%] sm:left-[15%] sm:top-[15%]"
        )}
      >
        {/* Header */}
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-white/5 select-none cursor-default active:cursor-grabbing rounded-t-[2.2rem]"
        >
          <div className="flex items-center gap-2 relative z-10 w-24">
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); onClose(); }} 
              className="w-3 h-3 flex-shrink-0 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 flex items-center justify-center group transition-colors p-0"
            >
              <X size={8} className="text-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="w-3 h-3 flex-shrink-0 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 flex-shrink-0 rounded-full bg-[#27C93F]" />
          </div>
          
          <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none gap-2">
            <History size={13} className="text-white/40" />
            <span className="font-mono text-[11px] font-medium text-white/60 tracking-tight lowercase">
              {fileName}
            </span>
          </div>

          <div className="flex items-center gap-3 text-white/30">
             <Terminal size={14} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 font-mono text-[12px] leading-relaxed select-text custom-scrollbar rounded-b-[2.2rem]">
          
          <div className="text-white/40 mb-6 border-b border-white/5 pb-4">
            --------------------------------------------------------------------------------<br />
            {timestamp}:<br />
            Mounting <span className="text-[#38bdf8]">{role.company}</span> experience_volume...<br />
            Status: <span className="text-[#4ade80]">ENCRYPTED_ACCESS_GRANTED</span><br />
            --------------------------------------------------------------------------------
          </div>

          <div className="space-y-8">
            {/* Header Info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#38bdf8]/10 rounded-lg border border-[#38bdf8]/20">
                  <Briefcase className="text-[#38bdf8]" size={20} />
                </div>
                <div>
                  <h2 className="text-white text-lg font-bold tracking-tight">{role.title}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-white/50 text-[11px] mt-1">
                    <span className="flex items-center gap-1.5"><History size={12} /> {role.company}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {role.period}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Introduction & Links */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[#4ade80] font-bold uppercase tracking-widest text-[10px]">[01] MISSION_OBJECTIVE</span>
                {role.liveLink && (
                  <a 
                    href={role.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[#38bdf8] hover:text-[#38bdf8]/80 transition-colors text-[10px] font-bold uppercase tracking-widest bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/20"
                  >
                    View Live <Terminal size={10} />
                  </a>
                )}
              </div>
              <p className="text-white/70 pl-4 border-l border-[#4ade80]/20 ml-1">
                {role.description}
              </p>
            </div>

            {/* Achievements */}
            <div className="flex flex-col gap-3">
              <span className="text-[#38bdf8] font-bold uppercase tracking-widest text-[10px]">[02] EXECUTION_LOGS</span>
              <div className="space-y-3 pl-4">
                {role.achievements.map((achv, i) => (
                  <div key={i} className="flex gap-3 group">
                    <CheckCircle2 size={14} className="text-[#38bdf8]/50 mt-0.5 flex-shrink-0 group-hover:text-[#38bdf8] transition-colors" />
                    <span className="text-white/60 group-hover:text-white/90 transition-colors">{achv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-3">
              <span className="text-[#fbbf24] font-bold uppercase tracking-widest text-[10px]">[03] TECH_ENVIRONMENT</span>
              <div className="flex flex-wrap gap-2 pl-4">
                {role.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 rounded text-white/50 text-[10px]">
                    <Cpu size={10} />
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 text-[#4ade80]/40 font-bold italic">
              // End of session log for {role.company}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
