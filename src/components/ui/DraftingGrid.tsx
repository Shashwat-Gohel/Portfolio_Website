"use client";

import React from "react";

export const DraftingGrid = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
      {/* Ultra-subtle texture */}
      <div className="absolute inset-0 drafting-grid opacity-[0.03]" />
      
      {/* Very soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};

