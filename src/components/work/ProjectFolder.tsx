"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectFolderProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export const ProjectFolder = ({ label, onClick, className }: ProjectFolderProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1.5 sm:gap-2 w-20 sm:w-28 p-2 rounded-lg cursor-pointer transition-all duration-300 z-20 select-none",
        className
      )}
    >
      {/* MacOS Blue Folder Icon */}
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 pointer-events-none">
        <svg 
          viewBox="0 0 24 24" 
          fill="#007AFF" 
          className="w-full h-full drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.25 6.75C2.25 5.92157 2.92157 5.25 3.75 5.25H8.64645C8.84536 5.25 9.03613 5.32902 9.17678 5.46967L11.4697 7.76256C11.6103 7.90321 11.8011 7.98223 12 7.98223H20.25C21.0784 7.98223 21.75 8.65366 21.75 9.48209V17.25C21.75 18.0784 21.0784 18.75 20.25 18.75H3.75C2.92157 18.75 2.25 18.0784 2.25 17.25V6.75Z" />
        </svg>
      </div>

      <span className="text-[9px] sm:text-[10px] font-sans text-white/90 text-center tracking-tight leading-tight px-1 rounded bg-black/40">
        {label}
      </span>
    </motion.div>
  );
};
