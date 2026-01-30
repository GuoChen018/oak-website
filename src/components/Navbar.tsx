"use client";

import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
      className="w-full px-6 py-4 flex items-center justify-between"
    >
      {/* Logo and Name */}
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6 text-gray-900" viewBox="0 0 16 16" fill="none">
          <path d="M4.2666 1.55566H11.7334C13.7216 1.5557 15.333 3.1671 15.333 5.15527V10.8438C15.333 12.832 13.7216 14.4443 11.7334 14.4443H4.2666C2.27841 14.4443 0.666992 12.832 0.666992 10.8438V5.15527C0.667026 3.1671 2.27843 1.5557 4.2666 1.55566Z" stroke="currentColor" strokeWidth="1.33333"/>
          <rect x="2.66699" y="3.55566" width="10.6667" height="4.44444" rx="2.22222" fill="currentColor"/>
        </svg>
        <span className="text-lg font-semibold text-gray-900">Oak</span>
      </div>

      {/* FAQ Link */}
      <a 
        href="#faq" 
        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        FAQ
      </a>
    </motion.nav>
  );
}
