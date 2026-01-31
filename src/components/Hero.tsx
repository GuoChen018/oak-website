"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MacMenuBar } from "./MacMenuBar";
import { NotchDemo } from "./NotchDemo";

export function Hero() {
  const [showToast, setShowToast] = useState(false);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (!showToast) return;
    
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showToast]);

  return (
    <section className="w-full px-4 pt-4 pb-12">
      {/* "Try it out!" annotation */}
      <div className="flex justify-center mb-2">
        <div className="flex items-start gap-1 ml-28">
          {/* Hand-drawn arrow */}
          <svg 
            className="w-10 h-9 mt-3" 
            viewBox="0 0 63 55" 
            fill="none"
          >
            {/* Main curved line */}
            <motion.path 
              d="M61.6892 1C61.4383 1 57.2497 1 50.325 1.0893C45.9041 1.14632 42.5904 2.14643 39.0941 3.54893C35.4294 5.01897 32.1011 7.57502 28.1048 11.135C25.6492 13.3225 22.76 16.7482 19.9831 20.2954C14.7404 27.5264 11.4958 32.8731 10.1858 36.7937C9.57972 39.1628 9.09302 42.3026 8.53027 46.3871" 
              stroke="#3E3838" 
              strokeWidth="3.5" 
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6, ease: "easeOut" }}
            />
            {/* Arrowhead */}
            <motion.path 
              d="M1 45.7793C1.17745 46.3896 2.93193 49.8343 4.76538 52.4118C5.47163 53.4046 6.50694 53.8571 7.45505 53.9217C8.41472 53.6869 11.2928 51.7771 15.1777 48.9359C16.6782 47.8057 17.2227 47.308 18.0342 46.6761" 
              stroke="#3E3838" 
              strokeWidth="3.5" 
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 2.1, ease: "easeOut" }}
            />
          </svg>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 2.5 }}
            className="text-gray-800 text-2xl font-handdrawn -mt-1"
          >
            Try it out!
          </motion.span>
        </div>
      </div>

      {/* Desktop Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="relative max-w-6xl mx-auto"
      >
        {/* Wallpaper with menu bar overlay */}
        <div className="relative rounded-xl border-2 border-black overflow-hidden">
          {/* Wallpaper Image */}
          <div className="relative w-full aspect-[16/5.5]">
            <Image
              src="/mountain.jpg"
              alt="Mountain wallpaper"
              fill
              className="object-cover"
              priority
              unoptimized
            />
            {/* Gray overlay - hidden for now */}
            {/* <div className="absolute inset-0 bg-gray-500/30" /> */}
          </div>
          
          {/* Menu Bar Overlay - positioned on top of wallpaper */}
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
                <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-lg">
                  If you like this, consider downloading!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Tagline and CTA */}
      <div className="text-center mt-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
          className="text-6xl font-semibold text-gray-900 mb-6"
        >
          Focus mode. Made delightful
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
          className="text-gray-600 text-xl mb-6 max-w-lg mx-auto leading-relaxed"
        >
          Transform your Mac&apos;s notch into a focus space with calming music and a companion by your side.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-4"
        >
          {/* Main CTA - Download for Mac */}
          <a
            href="#download"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-lg font-medium rounded-full hover:scale-[1.02] transition-transform backface-hidden transform-gpu"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download for Mac
          </a>
          
          {/* Secondary CTA - Purchase */}
          <a
            href="https://buy.polar.sh/polar_cl_RPTLq5WQIhGjV8cIa2JqdD0PuiYdYeLcA5K0n0MIYJr"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 text-lg font-medium rounded-full hover:scale-[1.02] transition-transform backface-hidden transform-gpu"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
            </svg>
            Purchase $4.99
          </a>
        </motion.div>
      </div>
    </section>
  );
}
