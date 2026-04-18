"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ProjectFolder } from "@/components/work/ProjectFolder";
import { MacDock } from "@/components/work/MacDock";
import { ResponsiveShell } from "@/components/work/ResponsiveShell";
import { ExperienceWindow, ExperienceRole } from "@/components/experience/ExperienceWindow";

export default function Experience() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [selectedRole, setSelectedRole] = useState<ExperienceRole | null>(null);

  const experience: ExperienceRole[] = [
    { 
      title: "Freelance Full Stack Developer", 
      company: "Zeta Layers", 
      period: "2024 - Present",
      description: "Leading the development of high-performance web infrastructure for the Zeta Layers ecosystem, focusing on extreme scalability and automated asset delivery.",
      achievements: [
        "Architected Next.js 15 App Router system for zetalayers.com",
        "Reduced Largest Contentful Paint (LCP) by 20% via custom font optimization",
        "Engineered automated Vercel deployment pipelines for peak operational efficiency",
        "Developed zero-config asset delivery logic utilized across the infrastructure"
      ],
      skills: ["Next.js 15", "TypeScript", "Tailwind CSS", "Vercel", "Performance Tuning"],
      liveLink: "https://zetalayers.com"
    },
  ];

  const handleOpenRole = (role: ExperienceRole) => {
    setSelectedRole(prev => {
      // If already selected, do nothing or re-set to trigger same effect without flicker
      if (prev?.company === role.company) return prev;
      return role;
    });
  };

  return (
    <main className="w-full bg-black flex flex-col items-center justify-center overflow-hidden relative z-[50]
                     h-[100dvh] pt-[57px] md:pt-0 px-2 sm:px-4 md:px-6 pb-2 md:pb-6">
      <div className="absolute inset-0 bg-black -z-10" />

      <ResponsiveShell>
        <div ref={constraintsRef} className="relative h-full w-full p-4 flex flex-col pt-4 overflow-hidden">
          
          <div className="flex flex-wrap md:justify-start justify-center items-start gap-4 sm:gap-8 p-4 sm:p-8 overflow-y-auto w-full h-full content-start">
            {experience.map((exp, i) => (
              <ProjectFolder 
                key={i}
                label={`${exp.company}`}
                onClick={() => handleOpenRole(exp)}
              />
            ))}
          </div>

          <ExperienceWindow 
            role={selectedRole}
            onClose={() => setSelectedRole(null)}
            dragConstraints={constraintsRef}
          />

          <MacDock />

        </div>
      </ResponsiveShell>
    </main>
  );
}
