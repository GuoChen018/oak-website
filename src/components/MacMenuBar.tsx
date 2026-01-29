"use client";

import { ReactNode } from "react";

interface MacMenuBarProps {
  children: ReactNode;
}

export function MacMenuBar({ children }: MacMenuBarProps) {
  return (
    <div className="relative w-full h-6">
      {/* Menu Bar Background */}
      <div className="absolute inset-x-0 top-0 h-6 bg-black/80 backdrop-blur-xl flex items-center justify-between px-4 text-white text-[11px]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}>
        {/* Left side - Apple logo and app name */}
        <div className="flex items-center gap-3">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <span className="font-medium">Notion</span>
          <span className="text-white/70">File</span>
          <span className="text-white/70">Edit</span>
          <span className="text-white/70">View</span>
          <span className="text-white/70">Window</span>
          <span className="text-white/70">Help</span>
        </div>

        {/* Right side - Status icons */}
        <div className="flex items-center gap-2.5">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
          </svg>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z"/>
          </svg>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span className="text-white/90 font-medium">Mon Jun 5  9:41 AM</span>
        </div>
      </div>

      {/* Notch Container - positioned in center of menu bar */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20">
        {children}
      </div>
    </div>
  );
}
