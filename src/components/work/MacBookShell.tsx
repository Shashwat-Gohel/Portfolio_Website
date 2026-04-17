"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MacBookShellProps {
  children: React.ReactNode;
  className?: string;
}

export const MacBookShell = ({ children, className }: MacBookShellProps) => {
  return (
    <div className={cn("relative mx-auto w-full max-w-5xl transition-all duration-700 h-auto flex justify-center", className)}>
      {/* Outer Case / Aluminum Frame */}
      <div className="relative bg-[#0d0d0d] rounded-[2rem] p-0 border border-white/5 aspect-[16/10] h-auto w-full mt-[2vh]">

        {/* Screen Bezel */}
        <div className="relative bg-black rounded-[2.2rem] p-3 overflow-hidden shadow-inner aspect-[16/10] h-fill">

          {/* Top Notch Container */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-black z-[100] rounded-b-xl flex items-center justify-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#1a1a1a] shadow-inner" /> {/* Camera */}
          </div>

          {/* Actual Screen Content / Desktop */}
          <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-black shadow-2xl">
            {/* Local wallpaper from public/image.png */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/HD-wallpaper-macbook-m3-stock-macbook-pro-macbook-apple-computer-stock-abstract-original-dark-black.jpg')" }}
            >
            </div>


            <div className="relative h-full w-full z-10 overflow-hidden rounded-[1.5rem]">
              {children}
            </div>
          </div>
        </div>

        {/* Bottom Aluminum Edge (Mock) */}
        <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full opacity-50" />
      </div>

    </div>
  );
};
