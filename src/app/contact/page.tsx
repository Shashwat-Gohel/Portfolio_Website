"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveShell } from "@/components/work/ResponsiveShell";
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
import { cn } from "@/lib/utils";

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

const GoogleDriveIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.74 3.522L4.67 8.83l3.07 5.31h6.14l3.07-5.31-3.07-5.308h-6.14zm1.536 1.5h4.604l2.302 3.982-2.302 3.982H9.276L6.974 9.004l2.302-3.982zM15.44 14.14l-3.07 5.31-3.07-5.31h6.14z" />
    <path d="M12 2.5L2 19h20L12 2.5zM12 5l7.5 12.5H4.5L12 5z" />
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
  type?: "received" | "sent";
}

export default function Contact() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFolder, setActiveFolder] = useState<"inbox" | "sent">("inbox");
  const [selectedMailId, setSelectedMailId] = useState<string>("official-welcome");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [sentMessages, setSentMessages] = useState<MailItem[]>([]);
  const [deletedMailIds, setDeletedMailIds] = useState<string[]>([]);
  const [archivedMailIds, setArchivedMailIds] = useState<string[]>([]);
  const [readMailIds, setReadMailIds] = useState<string[]>(["official-welcome"]); // Default to read after first view

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedSent = localStorage.getItem("portfolio_sent_mails");
    const savedDeleted = localStorage.getItem("portfolio_deleted_mails");
    const savedArchived = localStorage.getItem("portfolio_archived_mails");
    const savedRead = localStorage.getItem("portfolio_read_mails");
    
    if (savedSent) setSentMessages(JSON.parse(savedSent));
    if (savedDeleted) setDeletedMailIds(JSON.parse(savedDeleted));
    if (savedArchived) setArchivedMailIds(JSON.parse(savedArchived));
    if (savedRead) setReadMailIds(JSON.parse(savedRead));
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("portfolio_sent_mails", JSON.stringify(sentMessages));
    localStorage.setItem("portfolio_deleted_mails", JSON.stringify(deletedMailIds));
    localStorage.setItem("portfolio_archived_mails", JSON.stringify(archivedMailIds));
    localStorage.setItem("portfolio_read_mails", JSON.stringify(readMailIds));
  }, [sentMessages, deletedMailIds, archivedMailIds, readMailIds]);

  const inboxItems: MailItem[] = [
    {
      id: "official-welcome",
      from: "System Node",
      subject: "Communication Manual & Logic",
      time: "Initial",
      preview: "Essential guide to the high-fidelity professional mail suite...",
      isRead: false,
      body: `SYSTEM COMMUNICATION NODE: OPERATIONAL GUIDE

This portfolio uses a professional-grade backend for all correspondence. Please review the operating parameters below:

1. DIRECT DISPATCH
Every message sent here is routed directly to my professional mail account using a secure SMTP relay. There is no simulation; your inquiry leads to a real-world notification.

2. ATTACHMENT PARAMETERS
Smaller files and technical sheets can be attached directly via the paperclip icon. For payloads exceeding 10MB, please use the Cloud Storage tab in the sidebar and include the link in your message.

3. PRIVACY & LOCAL SILOS
Your 'Sent' folder is private to this browser session. To ensure visitor privacy, no communication data is stored on external servers except for the direct email received by me.

4. CONTROL SUITE
Use the built-in search to index your local history. You can Delete or Archive individual messages to maintain a clean workspace.

STATUS: ENCRYPTED & ONLINE`,
      type: "received"
    }
  ];

  const handleSend = async () => {
    if (!subject || !message || !senderEmail) return;

    setIsSending(true);
    
    try {
      const formData = new FormData();
      formData.append("senderEmail", senderEmail);
      formData.append("subject", subject);
      formData.append("message", message);
      attachedFiles.forEach(file => {
        formData.append("attachments", file);
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Dispatch failed");

      const newSentMail: MailItem = {
        id: Math.random().toString(36).substr(2, 9),
        from: "Me",
        subject: subject,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        preview: message.substring(0, 50) + "...",
        isRead: true,
        body: `From: ${senderEmail}\n\n${message}${attachedFiles.length > 0 ? `\n\n[Attachments: ${attachedFiles.length} files]` : ""}`,
        type: "sent"
      };

      setSentMessages(prev => [newSentMail, ...prev]);
      setIsSending(false);
      setShowSuccess(true);
      setIsComposing(false);
      setSelectedMailId(newSentMail.id);
      setActiveFolder("sent");

      // Reset fields
      setSubject("");
      setMessage("");
      setSenderEmail("");
      setAttachedFiles([]);

      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      console.error(err);
      setIsSending(false);
      alert("Failed to reach Secure_Node. Please check your connection.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartCompose = () => {
    setIsComposing(true);
    setSelectedMailId("");
    setSubject("");
    setMessage("");
    setSenderEmail("");
    setAttachedFiles([]);
  };

  const handleDeleteSelected = () => {
    if (!selectedMailId || selectedMailId === "official-welcome") return;
    
    // If it's in sent messages
    if (sentMessages.find(m => m.id === selectedMailId)) {
      setSentMessages(prev => prev.filter(m => m.id !== selectedMailId));
    } else {
      // If it's a static inbox message
      setDeletedMailIds(prev => [...prev, selectedMailId]);
    }
    setSelectedMailId("");
  };

  const handleSelectMail = (id: string) => {
    setSelectedMailId(prev => (prev === id ? prev : id));
    setIsComposing(false);
    if (!readMailIds.includes(id)) {
      setReadMailIds(prev => prev.includes(id) ? prev : [...prev, id]);
    }
  };

  const handleArchiveSelected = () => {
    if (!selectedMailId || selectedMailId === "official-welcome") return;
    setArchivedMailIds(prev => [...prev, selectedMailId]);
    setSelectedMailId("");
  };

  const handleClearFolder = () => {
    if (activeFolder === "sent") {
      if (confirm("Are you sure you want to clear all sent messages? This cannot be undone.")) {
        setSentMessages([]);
      }
    } else {
      // For inbox, we mark everything except the system guide as deleted
      setDeletedMailIds(prev => [
        ...prev, 
        ...inboxItems.filter(m => m.id !== "official-welcome").map(m => m.id)
      ]);
    }
  };

  const currentDisplayItems = (activeFolder === "inbox" ? inboxItems : sentMessages)
    .filter(item => item.id === "official-welcome" || (!deletedMailIds.includes(item.id) && !archivedMailIds.includes(item.id)))
    .filter(item => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.subject.toLowerCase().includes(query) ||
        item.from.toLowerCase().includes(query) ||
        item.body?.toLowerCase().includes(query)
      );
    });
  const selectedMail = [...inboxItems, ...sentMessages].find(m => m.id === selectedMailId);

  return (
    <main className="w-full bg-black flex flex-col items-center justify-center overflow-hidden relative z-[50]
                     h-[100dvh] pt-[57px] md:pt-0 px-2 sm:px-4 md:px-6 pb-2 md:pb-6">
      <div className="absolute inset-0 bg-black -z-10" />

      <ResponsiveShell>
        <div ref={constraintsRef} className="relative h-full w-full p-0 flex flex-col overflow-hidden rounded-[2.2rem]">
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full bg-[#1a1a1a]/95 backdrop-blur-3xl flex flex-col overflow-hidden font-sans rounded-[2.2rem]"
          >
            {/* Unified macOS Toolbar */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-[#161616] border-b border-white/5 select-none z-20 rounded-t-[2.2rem]">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 min-w-[60px]">
                  <div 
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (selectedMailId) setSelectedMailId("");
                      else if (isComposing) setIsComposing(false);
                      else window.history.back();
                    }}
                    className="w-3 h-3 min-w-[12px] min-h-[12px] aspect-square flex-shrink-0 rounded-full bg-[#FF5F56] cursor-pointer hover:bg-[#FF5F56]/80 flex items-center justify-center group p-0 border-none outline-none overflow-hidden"
                  >
                     {(selectedMailId || isComposing) && <ChevronRight size={8} className="text-black/60 rotate-180" />}
                  </div>
                  <div className="w-3 h-3 min-w-[12px] min-h-[12px] aspect-square flex-shrink-0 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 min-w-[12px] min-h-[12px] aspect-square flex-shrink-0 rounded-full bg-[#27C93F]" />
                </div>
                
                <div className="flex items-center gap-6 text-white/40">
                  <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors group" onClick={handleStartCompose}>
                    <Plus size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-tight">Compose</span>
                  </div>
                  <Archive 
                    size={16} 
                    className={`transition-colors ${selectedMailId === "official-welcome" ? "opacity-10 cursor-not-allowed" : "hover:text-white cursor-pointer"}`} 
                    onClick={handleArchiveSelected} 
                    aria-label="Archive" 
                  />
                  <Trash2 
                    size={16} 
                    className={`transition-colors ${selectedMailId === "official-welcome" ? "opacity-10 cursor-not-allowed" : "hover:text-red-400 cursor-pointer text-red-400/60"}`} 
                    onClick={handleDeleteSelected} 
                    aria-label="Delete" 
                  />
                </div>
              </div>

              <div className="absolute inset-x-0 hidden sm:flex items-center justify-center pointer-events-none gap-2">
                 <Terminal size={12} className="text-[#38bdf8]/40" />
                 <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Mail.app -- Secure_Node</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                   <Search size={14} className="text-white/20" />
                   <input 
                     type="text" 
                     placeholder="Search" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="bg-transparent border-none outline-none text-[11px] text-white/60 w-32 placeholder:text-white/10" 
                   />
                </div>
                 <div 
                   onClick={handleClearFolder}
                   className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 cursor-pointer transition-all active:scale-95"
                 >
                    <Trash2 size={14} className="text-white/40 hover:text-red-400" />
                 </div>
              </div>
            </div>

            {/* Application Panes */}
            <div className="flex-1 flex overflow-hidden relative">
              
              {/* Sidebar (Pane 1) - Hidden on mobile if viewing mail */}
              <div className={cn(
                "w-56 bg-black/40 backdrop-blur-3xl border-r border-white/5 flex flex-col p-4 gap-8 rounded-bl-[2.2rem] transition-all duration-300",
                (selectedMailId || isComposing) ? "hidden md:flex" : "flex"
              )}>
                <div className="space-y-1.5">
                  <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2 mb-3">Mailboxes</h3>
                  <div 
                    onClick={() => { setActiveFolder("inbox"); setIsComposing(false); setSelectedMailId(inboxItems[0].id); }}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      activeFolder === "inbox" && !isComposing ? "bg-[#007AFF] text-white shadow-lg shadow-blue-900/20" : "text-white/50 hover:bg-white/5"
                    }`}
                  >
                    <Inbox size={15} />
                    <span>Inbox</span>
                    <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${activeFolder === "inbox" && !isComposing ? "bg-white/20 text-white" : "bg-white/5 text-white/30"}`}>
                      {inboxItems.filter(m => !readMailIds.includes(m.id) && !deletedMailIds.includes(m.id)).length}
                    </span>
                  </div>
                  <div 
                    onClick={() => { setActiveFolder("sent"); setIsComposing(false); setSelectedMailId(""); }}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      activeFolder === "sent" && !isComposing ? "bg-[#007AFF] text-white shadow-lg shadow-blue-900/20" : "text-white/50 hover:bg-white/5"
                    }`}
                  >
                    <Send size={15} />
                    <span>Sent</span>
                    <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full ${activeFolder === "sent" && !isComposing ? "bg-white/20 text-white" : "bg-white/5 text-white/30"}`}>
                      {sentMessages.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2 mb-3">Professional</h3>
                  <div className="space-y-1">
                    <a href="https://github.com/Shashwat-Gohel" target="_blank" className="flex items-center gap-3 px-3 py-2 text-[11px] font-medium text-white/40 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all group">
                      <GitHubIcon size={12} />
                      <span className="flex-1">Repository</span>
                    </a>
                    <a href="https://linkedin.com/in/shashwatgohel" target="_blank" className="flex items-center gap-3 px-3 py-2 text-[11px] font-medium text-white/40 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all group">
                      <LinkedInIcon size={12} />
                      <span className="flex-1">Network</span>
                    </a>
                    <a href="https://instagram.com/_shashwatgohel" target="_blank" className="flex items-center gap-3 px-3 py-2 text-[11px] font-medium text-white/40 hover:text-white/90 hover:bg-white/5 rounded-lg transition-all group">
                      <InstagramIcon size={12} />
                      <span className="flex-1">Instagram</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] ml-2 mb-3">Storage</h3>
                  <div className="space-y-1">
                    <a 
                      href="https://drive.google.com/drive/folders/1RsQzfolVZ_FoOcUneNAz5w4_shqruDeT?usp=sharing" 
                      target="_blank" 
                      className="flex items-center gap-3 px-3 py-2 text-[11px] font-medium text-white/40 hover:text-[#34A853] hover:bg-white/5 rounded-lg transition-all group"
                      title="Use this for files over 10MB"
                    >
                      <GoogleDriveIcon size={12} />
                      <span className="flex-1">Google Drive</span>
                      <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Message Preview List (Pane 2) - Hidden on mobile if viewing mail */}
              <div className={cn(
                "w-full md:w-80 bg-black/20 border-r border-white/5 overflow-y-auto custom-scrollbar-hidden transition-all duration-300",
                (selectedMailId || isComposing) ? "hidden lg:flex" : "flex flex-1 md:flex-none"
              )}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-bold text-white/90 capitalize">{activeFolder}</h3>
                  </div>
                  
                  <div className="space-y-1.5">
                    {currentDisplayItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-20 gap-3 opacity-10">
                         <Mail size={40} strokeWidth={1} />
                         <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Empty</span>
                      </div>
                    ) : (
                      currentDisplayItems.map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => handleSelectMail(item.id)}
                          className={`p-4 rounded-xl flex flex-col gap-1.5 cursor-default transition-all duration-300 border ${
                            selectedMailId === item.id 
                              ? "bg-white/10 border-white/10 shadow-xl" 
                              : "bg-transparent border-transparent hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                               {!readMailIds.includes(item.id) && !deletedMailIds.includes(item.id) && (
                                 <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF]" />
                               )}
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

              {/* Detailed View / Compose (Pane 3) - Full screen on mobile if active */}
              <div className={cn(
                "flex-1 bg-[#121212]/50 flex flex-col rounded-br-[2.2rem] transition-all duration-300",
                (!selectedMailId && !isComposing) ? "hidden md:flex" : "flex"
              )}>
                {isComposing ? (
                  <>
                    <div className="px-8 py-6 space-y-5 border-b border-white/5 bg-white/[0.02]">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white tracking-tight">New Message</h4>
                      </div>
                      <div className="py-2 space-y-2 border-t border-white/5">
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-white/20 w-16">To:</span>
                          <span className="text-white/90 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">shashwat.@ahduni.edu.in</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-white/20 w-16">From:</span>
                          <input 
                            type="email" 
                            value={senderEmail}
                            onChange={(e) => setSenderEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="bg-transparent border-none outline-none text-white/90 font-bold flex-1 h-7 placeholder:text-white/5"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-[11px]">
                          <span className="text-white/20 w-16">Subject:</span>
                          <input 
                            type="text" 
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Inquiry / Feedback"
                            className="bg-transparent border-none outline-none text-white/90 font-bold flex-1 h-7 placeholder:text-white/5"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-8 pb-32 relative">
                      <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write something..."
                        className="w-full h-full bg-transparent border-none outline-none text-[13px] text-white/70 leading-relaxed resize-none font-mono placeholder:text-white/5"
                      />
                      <div className="absolute bottom-8 right-10 flex items-center gap-6 bg-black/40 backdrop-blur-xl p-3 px-6 rounded-2xl border border-white/10 shadow-2xl">
                        <div className="flex items-center gap-4">
                          <input 
                            type="file" 
                            multiple 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            className="hidden" 
                          />
                          <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                          >
                             <Paperclip size={18} />
                          </button>
                        </div>

                        <AnimatePresence>
                          {showSuccess && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-[#4ade80] text-[11px] font-bold">
                               <CheckCircle2 size={16} />
                               <span>DISPATCHED</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <button
                          onClick={handleSend}
                          disabled={!subject || !message || !senderEmail || isSending}
                          className="px-8 py-3 rounded-xl bg-[#007AFF] hover:bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest transition-all disabled:opacity-20"
                        >
                          {isSending ? <Loader2 className="animate-spin" /> : "Send Message"}
                        </button>
                      </div>

                      {/* Attachment Previews */}
                      {attachedFiles.length > 0 && (
                        <div className="absolute bottom-24 left-8 right-8 flex flex-wrap gap-2">
                           {attachedFiles.map((file, idx) => (
                             <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] text-white/60">
                                <Paperclip size={12} />
                                <span className="max-w-[100px] truncate">{file.name}</span>
                                <button onClick={() => removeFile(idx)} className="ml-1 hover:text-white">✕</button>
                             </div>
                           ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : selectedMail ? (
                  <div className="flex-1 flex flex-col overflow-y-auto">
                    <div className="px-8 py-8 border-b border-white/5">
                       <h2 className="text-2xl font-black text-white mb-2">{selectedMail.subject}</h2>
                       <div className="flex items-center gap-3 text-[11px]">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-white/40">
                             {selectedMail.from[0]}
                          </div>
                          <span className="text-white/90 font-bold">{selectedMail.from}</span>
                          <span className="text-white/20">•</span>
                          <span className="text-white/40">{selectedMail.time}</span>
                       </div>
                    </div>
                    <div className="p-8 text-[13px] text-white/70 leading-relaxed font-mono whitespace-pre-wrap">
                       {selectedMail.body}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center opacity-20">
                     <Mail size={48} strokeWidth={1} />
                     <p className="text-[10px] font-mono mt-4 tracking-widest">SELECT_MESSAGE_NODE</p>
                  </div>
                )}
              </div>

            </div>
          </motion.div>

          <MacDock />

        </div>
      </ResponsiveShell>
    </main>
  );
}
