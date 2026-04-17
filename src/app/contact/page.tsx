"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MacBookShell } from "@/components/work/MacBookShell";
import { MacDock } from "@/components/work/MacDock";
import { 
  Mail, 
  Send, 
  Inbox, 
  Trash2, 
  Archive, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Paperclip, 
  User,
  ExternalLink,
  ChevronRight,
  Terminal,
  Circle,
  Loader2,
  CheckCircle2
} from "lucide-react";

// Local SVG icons for high-end circular social logos
const GitHubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

interface MailItem {
  id: string;
  from: string;
  subject: string;
  time: string;
  preview: string;
  isRead: boolean;
  body?: string;
}

export default function Contact() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [activeFolder, setActiveFolder] = useState<"inbox" | "sent">("inbox");
  const [selectedMailId, setSelectedMailId] = useState<string>("0");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [sentMessages, setSentMessages] = useState<MailItem[]>([]);

  const inboxItems: MailItem[] = [
    {
      id: "official-welcome",
      from: "Official Mailbox",
      subject: "Direct Connectivity Established",
      time: "Now",
      preview: "Welcome to the official communication node. All messages dispatched...",
      isRead: false,
      body: "Welcome to the official communication node.\n\nAll messages dispatched through this platform are routed directly to shashwat.@ahduni.edu.in.\n\nThis interface serves as a secure, professional bridge for project inquiries, collaborations, and technical discussions.\n\nStatus: Online & Encrypted"
    }
  ];

  const handleSend = () => {
    if (!subject || !message) return;

    setIsSending(true);
    
    setTimeout(() => {
      const newSentMail: MailItem = {
        id: Math.random().toString(36).substr(2, 9),
        from: "Me",
        subject: subject,
        time: "Just Now",
        preview: message.substring(0, 50) + "...",
        isRead: true,
        body: message
      };

      setSentMessages(prev => [newSentMail, ...prev]);
      setIsSending(false);
      setShowSuccess(true);
      
      const mailtoUrl = `mailto:shashwat.@ahduni.edu.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      window.location.href = mailtoUrl;

      setSubject("");
      setMessage("");

      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  const currentDisplayItems = activeFolder === "inbox" ? inboxItems : sentMessages;

  return (
    <main className="h-[100dvh] w-full bg-black flex flex-col items-center justify-center pt-12 p-6 overflow-hidden relative z-[50]">
      <div className="absolute inset-0 bg-black -z-10" />

      <MacBookShell>
        <div ref={constraintsRef} className="relative h-full w-full p-0 flex flex-col overflow-hidden rounded-[1.5rem]">
          
          {/* Full Screen Mail Application */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full bg-[#1a1a1a]/95 backdrop-blur-3xl flex flex-col overflow-hidden font-sans rounded-[1.5rem]"
          >
            {/* Unified macOS Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-white/5 select-none z-20">
              <div className="flex items-center gap-8">
                <div className="flex gap-2 min-w-[60px]">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                
                <div className="flex items-center gap-6 text-white/40">
                  <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors group" onClick={() => { setSubject(""); setMessage(""); }}>
                    <Plus size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-tight">Compose</span>
                  </div>
                  <Archive size={16} className="hover:text-white cursor-pointer transition-colors" />
                  <Trash2 size={16} className="hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>

              <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none gap-2">
                 <Terminal size={12} className="text-[#38bdf8]/40" />
                 <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Mail.app -- Connectivity_Node</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                   <Search size={14} className="text-white/20" />
                   <input type="text" placeholder="Search Mail" className="bg-transparent border-none outline-none text-[11px] text-white/60 w-32 placeholder:text-white/10" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                   <MoreHorizontal size={14} className="text-white/40" />
                </div>
              </div>
            </div>

            {/* Application Panes */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Sidebar: Vibrant Glass (Pane 1) */}
              <div className="w-56 bg-black/40 backdrop-blur-3xl border-r border-white/5 flex flex-col p-4 gap-8">
                <div className="space-y-1.5">
                  <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2 mb-3">Mailboxes</h3>
                  <div 
                    onClick={() => setActiveFolder("inbox")}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      activeFolder === "inbox" ? "bg-[#007AFF] text-white shadow-lg shadow-blue-900/20" : "text-white/50 hover:bg-white/5"
                    }`}
                  >
                    <Inbox size={15} />
                    <span>Inbox</span>
                    <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${activeFolder === "inbox" ? "bg-white/20 text-white" : "bg-white/5 text-white/30"}`}>
                      {inboxItems.length}
                    </span>
                  </div>
                  <div 
                    onClick={() => setActiveFolder("sent")}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      activeFolder === "sent" ? "bg-[#007AFF] text-white shadow-lg shadow-blue-900/20" : "text-white/50 hover:bg-white/5"
                    }`}
                  >
                    <Send size={15} />
                    <span>Sent</span>
                    <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${activeFolder === "sent" ? "bg-white/20 text-white" : "bg-white/5 text-white/30"}`}>
                      {sentMessages.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2 mb-3">Accounts</h3>
                  <div className="space-y-1">
                    <a href="https://github.com/shashwatgohel" target="_blank" className="flex items-center gap-3 px-3 py-2 text-[11px] font-medium text-white/40 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all group">
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#333] transition-colors border border-white/5">
                        <GitHubIcon size={12} />
                      </div>
                      <span className="flex-1">GitHub</span>
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                    </a>
                    <a href="https://instagram.com/shashwatgohel" target="_blank" className="flex items-center gap-3 px-3 py-2 text-[11px] font-medium text-white/40 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all group">
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] transition-colors border border-white/5">
                        <InstagramIcon size={12} />
                      </div>
                      <span className="flex-1">Instagram</span>
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                    </a>
                    <a href="https://linkedin.com/in/shashwatgohel" target="_blank" className="flex items-center gap-3 px-3 py-2 text-[11px] font-medium text-white/40 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all group">
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0077b5] transition-colors border border-white/5">
                        <LinkedInIcon size={12} />
                      </div>
                      <span className="flex-1">LinkedIn</span>
                      <ChevronRight size={10} className="opacity-0 group-hover:opacity-40 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Message Preview List (Pane 2) */}
              <div className="w-80 bg-black/20 border-r border-white/5 overflow-y-auto custom-scrollbar-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-bold text-white/90 capitalize">{activeFolder}</h3>
                     <span className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">Sort by Date</span>
                  </div>
                  
                  <div className="space-y-1.5">
                    {currentDisplayItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 gap-3 opacity-10">
                         <Mail size={40} strokeWidth={1} />
                         <span className="text-[10px] font-mono uppercase tracking-[0.3em]">No Selection</span>
                      </div>
                    ) : (
                      currentDisplayItems.map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => setSelectedMailId(item.id)}
                          className={`p-4 rounded-xl flex flex-col gap-1.5 cursor-default transition-all duration-300 border ${
                            selectedMailId === item.id 
                              ? "bg-white/10 border-white/10 shadow-xl" 
                              : "bg-transparent border-transparent hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                               {!item.isRead && activeFolder === "inbox" && <Circle size={6} fill="#38bdf8" stroke="none" />}
                               <span className="text-[12px] font-bold text-white tracking-tight">{item.from}</span>
                            </div>
                            <span className="text-[10px] text-white/30 font-medium">{item.time}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-white/80 line-clamp-1">{item.subject}</span>
                          <p className="text-[11px] text-white/40 leading-relaxed line-clamp-2">{item.preview}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Detailed View / Compose (Pane 3) */}
              <div className="flex-1 bg-[#121212]/50 flex flex-col">
                {/* Email Metadata */}
                <div className="px-8 py-6 space-y-5 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#38bdf8] to-[#818cf8] flex items-center justify-center font-bold text-xs text-white shadow-lg shadow-blue-500/10">
                         SG
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">Direct Connection Matrix</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 opacity-30">
                       <ExternalLink size={14} />
                       <Paperclip size={14} />
                    </div>
                  </div>

                  <div className="py-2 space-y-2 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-white/20 w-16">Recipient:</span>
                      <span className="text-white/90 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">shashwat.@ahduni.edu.in</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] group focus-within:text-white transition-colors">
                      <span className="text-white/20 w-16">Subject:</span>
                      <input 
                        type="text" 
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Project Inquiry / Opportunity"
                        className="bg-transparent border-none outline-none text-white/90 font-bold flex-1 h-7 placeholder:text-white/5"
                        disabled={isSending}
                      />
                    </div>
                  </div>
                </div>

                {/* Email Body Editor */}
                <div className="flex-1 p-8 pb-32 relative overflow-y-auto custom-scrollbar">
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message details..."
                    className="w-full h-full bg-transparent border-none outline-none text-[13px] text-white/70 leading-relaxed resize-none font-mono placeholder:text-white/5"
                    disabled={isSending}
                  />

                  {/* Submission Layer */}
                  <div className="absolute bottom-8 right-10 flex items-center gap-6 bg-black/40 backdrop-blur-xl p-3 px-6 rounded-2xl border border-white/10 shadow-2xl">
                    <AnimatePresence>
                      {showSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 text-[#4ade80] text-[11px] font-bold"
                        >
                           <CheckCircle2 size={16} />
                           <span className="tracking-tight">DISPATCH_COMPLETE</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={isSending || !subject || !message}
                      className={`px-8 py-3 rounded-xl flex items-center gap-3 font-black text-[11px] uppercase tracking-widest transition-all ${
                        isSending || !subject || !message 
                          ? "bg-white/5 text-white/10 cursor-not-allowed" 
                          : "bg-[#007AFF] hover:bg-blue-600 text-white shadow-xl shadow-blue-500/30"
                      }`}
                    >
                      {isSending ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Forward Node</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          <MacDock />

        </div>
      </MacBookShell>
    </main>
  );
}
