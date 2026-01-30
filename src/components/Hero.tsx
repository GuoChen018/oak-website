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
        <div className="flex items-start gap-1 ml-32">
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
              transition={{ duration: 0.8, delay: 3.2, ease: "easeOut" }}
            />
            {/* Arrowhead */}
            <motion.path 
              d="M1 45.7793C1.17745 46.3896 2.93193 49.8343 4.76538 52.4118C5.47163 53.4046 6.50694 53.8571 7.45505 53.9217C8.41472 53.6869 11.2928 51.7771 15.1777 48.9359C16.6782 47.8057 17.2227 47.308 18.0342 46.6761" 
              stroke="#3E3838" 
              strokeWidth="3.5" 
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 4.0, ease: "easeOut" }}
            />
          </svg>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 4.5 }}
            className="text-gray-800 text-lg font-handdrawn -mt-1"
          >
            Try it out!
          </motion.span>
        </div>
      </div>

      {/* Desktop Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative max-w-6xl mx-auto"
      >
        {/* Wallpaper with menu bar overlay */}
        <div className="relative rounded-xl border-2 border-black overflow-hidden">
          {/* Wallpaper Image */}
          <div className="relative w-full aspect-[16/5.5]">
            <Image
              src="/mountain-scene.jpg"
              alt="Mountain wallpaper"
              fill
              className="object-cover"
              priority
            />
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
                  If you like this, consider downloading! 🌿
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
          transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          className="text-6xl font-semibold text-gray-900 mb-6"
        >
          Focus mode. Made delightful
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
          className="text-gray-600 text-xl mb-6 max-w-md mx-auto"
        >
          Transform your Mac&apos;s notch into a focus space with calming music and a companion by your side.
        </motion.p>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.5, ease: "easeOut" }}
          href="#waitlist"
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-lg font-medium rounded-full hover:scale-[1.01] transition-transform"
        >
          Join Waitlist
        </motion.a>
      </div>
    </section>
  );
}
