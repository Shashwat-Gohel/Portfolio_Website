import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { Navbar } from "@/components/ui/Navbar";
import { Analytics } from "@vercel/analytics/next"


const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "shashwat gohel // portfolio",
  description: "Full-Stack Engineer & AI/ML Specialist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative font-outfit grain">
        <Navbar />
        <DottedSurface />
        {children}
        <Analytics />
      </body>
    </html>
  );
}


