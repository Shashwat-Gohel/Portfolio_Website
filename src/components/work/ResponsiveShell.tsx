"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ShellProps {
  children: React.ReactNode;
  className?: string;
}

const DynamicIsland = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
      initial={{ width: 110, height: 28, borderRadius: 20 }}
      animate={{ 
        width: isHovered ? 180 : 110, 
        height: isHovered ? 36 : 32,
        borderRadius: isHovered ? 24 : 22 
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="bg-black flex items-center justify-between px-3 shadow-lg border border-white/5 cursor-pointer overflow-hidden"
    >
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] shadow-inner" />
        <AnimatePresence>
          {isHovered && (
            <motion.span 
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              className="text-[10px] font-mono text-white/40 uppercase whitespace-nowrap"
            >
              System Active
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="w-2 h-2 rounded-full bg-green-500/60 blur-[1px] animate-pulse" />
    </motion.div>
  );
};

const IPhoneShell = ({ children, className }: ShellProps) => (
  <div className={cn("relative mx-auto w-full max-w-[340px] h-[700px] flex justify-center", className)}>
    {/* Device Frame */}
    <div className="relative bg-[#0d0d0d] rounded-[3.5rem] p-3 border-[6px] border-[#1a1a1a] shadow-2xl w-full h-full overflow-hidden ring-1 ring-white/10">
      
      {/* Dynamic Island Area */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100]">
        <DynamicIsland />
      </div>

      {/* Screen Content */}
      <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-black shadow-inner border border-white/5">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/HD-wallpaper-macbook-m3-stock-macbook-pro-macbook-apple-computer-stock-abstract-original-dark-black.jpg')" }}
        />
        <div className="relative h-full w-full z-10 overflow-hidden pt-12 pb-6">
          {children}
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-[100]" />
    </div>
  </div>
);

const IPadShell = ({ children, className }: ShellProps) => (
  <div className={cn("relative mx-auto w-full max-w-4xl h-[650px] flex justify-center", className)}>
    <div className="relative bg-[#0d0d0d] rounded-[2.5rem] p-4 border-[4px] border-[#1a1a1a] shadow-2xl w-full h-full overflow-hidden ring-1 ring-white/10">
      
      {/* Small camera dot */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1a1a1a] z-[100]" />

      <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-black shadow-inner border border-white/5">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/HD-wallpaper-macbook-m3-stock-macbook-pro-macbook-apple-computer-stock-abstract-original-dark-black.jpg')" }}
        />
        <div className="relative h-full w-full z-10 overflow-hidden">
          {children}
        </div>
      </div>
      
      {/* Bottom Bar Indicator */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-40 h-1 bg-white/10 rounded-full z-[100]" />
    </div>
  </div>
);

const MacShell = ({ children, className }: ShellProps) => (
  <div className={cn("relative mx-auto w-full max-w-5xl flex justify-center px-4 md:px-0", className)}>
    <div className="relative bg-[#0d0d0d] rounded-[3rem] p-0 border border-white/5 aspect-[16/10] w-full mt-[2vh] overflow-hidden">
      <div className="relative bg-black rounded-[2.8rem] p-3 overflow-hidden shadow-inner h-full w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-black z-[100] rounded-b-2xl flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
        </div>
        <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-black shadow-2xl border border-white/5">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/HD-wallpaper-macbook-m3-stock-macbook-pro-macbook-apple-computer-stock-abstract-original-dark-black.jpg')" }}
          />
          <div className="relative h-full w-full z-10 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
      <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full opacity-50" />
    </div>
  </div>
);

export const ResponsiveShell = ({ children, className }: ShellProps) => {
  const [device, setDevice] = useState<"phone" | "tablet" | "desktop">("desktop");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 640) setDevice("phone");
      else if (window.innerWidth < 1024) setDevice("tablet");
      else setDevice("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={device}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full flex justify-center items-center"
      >
        {device === "phone" && <IPhoneShell className={className}>{children}</IPhoneShell>}
        {device === "tablet" && <IPadShell className={className}>{children}</IPadShell>}
        {device === "desktop" && <MacShell className={className}>{children}</MacShell>}
      </motion.div>
    </AnimatePresence>
  );
};
