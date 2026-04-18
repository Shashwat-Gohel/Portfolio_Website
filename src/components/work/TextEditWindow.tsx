"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { X, FileCode2, Terminal, Info, Link2, Download, TerminalSquare, CheckCircle2, AlertCircle, Cpu, Copy, Check } from "lucide-react";
import { Project } from "@/lib/projectData";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TextEditWindowProps {
  project: Project | null;
  onClose: () => void;
  onFocus?: () => void;
  zIndex?: number;
  dragConstraints?: React.RefObject<HTMLDivElement>;
}

export const TextEditWindow = ({ 
  project, 
  onClose,
  onFocus,
  zIndex = 60,
  dragConstraints
}: TextEditWindowProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isFullScreen = isMobile;
  
  const isWip = project?.id === "publications-wip";

  React.useEffect(() => {
    if (isWip && project?.details?.introduction) {
      setDisplayText("");
      setIsTyping(true);
      const fullText = project.details.introduction;
      let i = 0;
      const timer = setInterval(() => {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 50);
      return () => clearInterval(timer);
    } else if (project?.details?.introduction) {
      setDisplayText(project.details.introduction);
    }
  }, [project, isWip]);

  if (!project || !project.details) return null;

  const handleCopy = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const { details } = project;
  const fileName = project.title.endsWith('.txt') ? project.title : `${project.id.toLowerCase().replace(/ /g, "_")}.log`;
  const timestamp = new Date().toUTCString().replace("GMT", "IST 2026");

  return (
    <AnimatePresence>
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
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ zIndex }}
        className={cn(
          "absolute bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-[2.2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,1)] flex flex-col overflow-hidden ring-1 ring-white/10",
          isFullScreen 
            ? "inset-2 w-auto h-auto rounded-[1.8rem] bottom-16" 
            : "w-[96%] left-[2%] h-[90%] top-[5%] md:w-[88%] md:left-[6%] md:h-[78%] md:top-[11%] md:max-w-4xl"
        )}
      >
        {/* macOS Log Header */}
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          className="flex items-center justify-between px-4 py-2.5 bg-[#161616] border-b border-white/5 select-none cursor-default active:cursor-grabbing rounded-t-[2.2rem]"
        >
          <div className="flex gap-2 w-24 relative z-10">
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); onClose(); }} 
              className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 flex items-center justify-center group cursor-pointer transition-colors"
            >
              <X size={8} className="text-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          
          <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none gap-2">
            <FileCode2 size={13} className="text-white/40" />
            <span className="font-mono text-[11px] font-medium text-white/70 tracking-tight">
              {fileName}
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/30 pr-1">
             <Terminal size={14} className="hover:text-white/60 transition-colors cursor-help" />
          </div>
        </div>

        {/* Log Viewer Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col font-mono text-[12px] leading-relaxed select-text custom-scrollbar rounded-b-[2.2rem]">
          
          <div className="text-white/40 mb-6 border-b border-white/5 pb-4">
            --------------------------------------------------------------------------------<br />
            {timestamp}:<br />
            Initializing <span className="text-[#38bdf8]">{project.title}</span> workspace (v2.4.x-stable)<br />
            Kernel Version: 10.0.19045 (x64_arch_shashwat)<br />
            --------------------------------------------------------------------------------
          </div>

          <div className="space-y-6">
            {/* 1. System Environment / Links Section (Promoted to top) */}
            <div className="flex flex-col gap-1 mb-2">
               <span className="text-[#fbbf24] font-bold">[CONFIG] ESTABLISHING_REMOTE_SESSION: tracking_active_nodes</span>
               <div className="pl-4 space-y-1 mt-1 border-l border-white/10 ml-1">
                  {details.liveDemoLink && (
                    <div className="flex gap-4 group">
                      <span className="text-[#4ade80] w-32">live.url</span>
                      <Link href={details.liveDemoLink} target="_blank" className="text-[#38bdf8] hover:underline flex items-center gap-1">
                        {details.liveDemoLink} <Link2 size={10} />
                      </Link>
                    </div>
                  )}
                  {details.githubLink && (
                    <div className="flex gap-4 group">
                      <span className="text-white/40 w-32">github.repo</span>
                      <Link href={details.githubLink} target="_blank" className="text-[#38bdf8] hover:underline flex items-center gap-1">
                        {details.githubLink} <Link2 size={10} />
                      </Link>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <span className="text-white/40 w-32">os.name</span>
                    <span className="text-white/60">Portfolio OS X (Stable)</span>
                  </div>
               </div>
            </div>

            {/* 2. Introduction & Stack */}
            <div className="flex flex-col gap-2">
              <span className="text-[#4ade80] font-bold">[INFO] INITIALIZING_CORE: intro_manifest</span>
              <p className="text-white/80 pl-4 border-l border-white/10 ml-1">
                {displayText}
                {isTyping && <span className="inline-block w-1.5 h-3.5 bg-[#4ade80] ml-1 animate-pulse align-middle" />}
              </p>
              {!isWip && details.techStackDetailed && (
                <div className="flex flex-wrap gap-2 pl-4 mt-2">
                  {details.techStackDetailed.map((stack, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-white/50 border border-white/10">
                      {stack}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {!isWip && details.requirements && (
              <div className="flex flex-col gap-2">
                <span className="text-[#fbbf24] font-bold">[REQS] LOADING_PREREQUISITES: system_env_check</span>
                <div className="pl-4 space-y-1 border-l border-white/10 ml-1">
                  {details.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/60 text-[11px]">
                      <AlertCircle size={12} className="text-[#fbbf24]/60" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Achievements (SDE Only) */}
            {!isWip && details.achievements && (
              <div className="flex flex-col gap-2">
                <span className="text-[#22d3ee] font-bold">[ACHV] EXTRACTION_SUCCESS: project_impact_metrics</span>
                <div className="pl-4 space-y-2 border-l border-white/10 ml-1">
                  {details.achievements.map((achv, i) => (
                    <div key={i} className="flex gap-3 bg-white/[0.03] border border-white/5 p-2 rounded">
                      <CheckCircle2 size={14} className="text-[#22d3ee] mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{achv}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Results (ML Only) */}
            {!isWip && details.results && (
              <div className="flex flex-col gap-2">
                <span className="text-[#a855f7] font-bold">[RESULT] METRIC_VALIDATION: model_inference_report</span>
                <div className="pl-4 space-y-2 border-l border-white/10 ml-1">
                  {details.results.map((res, i) => (
                    <div key={i} className="flex gap-3 bg-white/[0.03] border border-white/5 p-2 rounded">
                      <Cpu size={14} className="text-[#a855f7] mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Clone Guide Chart */}
            {!isWip && details.cloneGuide && (
              <div className="flex flex-col gap-2">
                <span className="text-[#38bdf8] font-bold">[GUIDE] REPO_CLONE_CHART: step_by_step_deployment</span>
                <div className="pl-4 space-y-4 border-l border-white/10 ml-1 mt-2">
                  {details.cloneGuide.map((step, i) => {
                    const stepId = `step-${i}`;
                    return (
                      <div key={i} className="flex flex-col gap-1.5">
                        <span className="text-white/40 text-[10px] uppercase tracking-wider">{i+1}. {step.step}</span>
                        <div className="flex items-center justify-between gap-3 bg-black/40 border border-white/5 p-2.5 rounded group hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <TerminalSquare size={13} className="text-white/20 flex-shrink-0" />
                            <code className="text-[#38bdf8] text-[11px] break-all truncate">{step.command}</code>
                          </div>
                          <button 
                            onClick={() => handleCopy(step.command, stepId)}
                            className="flex-shrink-0 p-1.5 rounded bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/80 transition-all"
                            title="Copy to clipboard"
                          >
                            {copiedId === stepId ? <Check size={12} className="text-[#4ade80]" /> : <Copy size={12} />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}



            {/* Finish Message */}
            <div className="mt-8 text-[#4ade80] font-bold animate-pulse">
              [SUCCESS] ALL_MODULES_LOADED_SUCCESSFULLY: READY_FOR_INSPECTION
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
