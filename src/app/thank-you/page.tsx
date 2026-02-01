"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MacMenuBar } from "@/components/MacMenuBar";
import { NotchDemo } from "@/components/NotchDemo";

// Custom Navbar for thank you page (Contact instead of FAQ)
function ThankYouNavbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
      className="w-full px-6 py-4 flex items-center justify-between"
    >
      {/* Logo and Name */}
      <motion.a 
        href="/" 
        className="flex items-center gap-2 cursor-pointer"
        whileHover="hover"
      >
        <svg className="w-6 h-6 text-gray-900" viewBox="0 0 16 16" fill="none">
          <path d="M4.2666 1.55566H11.7334C13.7216 1.5557 15.333 3.1671 15.333 5.15527V10.8438C15.333 12.832 13.7216 14.4443 11.7334 14.4443H4.2666C2.27841 14.4443 0.666992 12.832 0.666992 10.8438V5.15527C0.667026 3.1671 2.27843 1.5557 4.2666 1.55566Z" stroke="currentColor" strokeWidth="1.33333"/>
          <motion.rect 
            x="2.66699" 
            y="3.55566" 
            width="10.6667" 
            rx="2.22222" 
            fill="currentColor"
            initial={{ height: 4.44444 }}
            variants={{
              hover: { height: 6 }
            }}
            transition={{ duration: 0.2 }}
          />
        </svg>
        <span className="text-lg font-semibold text-gray-900">Oak</span>
      </motion.a>

      {/* Contact Link */}
      <a 
        href="mailto:guoc0818@gmail.com" 
        className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        Contact
      </a>
    </motion.nav>
  );
}

// Hero section for thank you page
function ThankYouHero() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return;
    const timeout = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timeout);
  }, [showToast]);

  return (
    <section className="w-full px-4 pt-4 pb-12">
      {/* Spacer to match home page layout (no "Try it out!") */}
      <div className="h-12" />

      {/* Desktop Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="relative max-w-6xl mx-auto"
      >
        {/* Wallpaper with menu bar overlay */}
        <div className="relative rounded-xl overflow-hidden">
          {/* Wallpaper Image */}
          <div className="relative w-full aspect-[16/11] md:aspect-[16/5.5]">
            <Image
              src="/mountain.jpg"
              alt="Mountain wallpaper"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          
          {/* Menu Bar Overlay */}
          <div className="absolute inset-x-0 top-0 z-10">
            <MacMenuBar>
              <NotchDemo onShowToast={() => setShowToast(true)} />
            </MacMenuBar>
          </div>

          {/* Toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
              >
                <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-lg whitespace-nowrap">
                  Like this? Consider downloading!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Thank you message and CTA */}
      <div className="text-center mt-8 md:mt-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-medium text-gray-900 mb-4 leading-tight"
        >
          Thank you for purchasing Oak!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
          className="text-gray-600 text-lg md:text-xl mb-6 max-w-lg mx-auto leading-relaxed"
        >
          Your license and receipt have been sent to your email.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
          className="flex items-center justify-center px-4"
        >
          {/* Download button only */}
          <a
            href="https://github.com/GuoChen018/oak-app/releases/download/v1.0.0/Oak-1.0.0.dmg"
            download="Oak-1.0.0.dmg"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-base font-medium rounded-full hover:scale-[1.02] transition-transform backface-hidden transform-gpu w-full sm:w-auto"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download for Mac
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen">
      <ThankYouNavbar />
      <ThankYouHero />
      {/* No FAQ section */}
      {/* No footer */}
    </main>
  );
}
