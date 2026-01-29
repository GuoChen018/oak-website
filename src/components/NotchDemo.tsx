"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTimer } from "@/hooks/useTimer";
import { useAudio, MusicCategory } from "@/hooks/useAudio";

const FOCUS_PALS = [
  "baby-chick", "cat", "cow", "crocodile", "deer", "dog",
  "dove", "dragon", "fish", "hedgehog", "hippo", "sauropod",
  "sloth", "swan", "tiger", "two-hump-camel", "whale", "zebra",
];

const TIMER_OPTIONS = [5, 10, 15, 20, 25, 30, 45, 60];

const MUSIC_CATEGORIES: { id: MusicCategory; label: string; icon: string }[] = [
  { id: "piano", label: "Piano", icon: "🎹" },
  { id: "lofi", label: "LoFi", icon: "🎧" },
  { id: "ambient", label: "Ambient", icon: "🌿" },
];

export function NotchDemo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPal, setSelectedPal] = useState("dragon");
  const [showPalPicker, setShowPalPicker] = useState(false);
  const [showTimerPicker, setShowTimerPicker] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const timer = useTimer(25);
  const audio = useAudio();

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle music when timer starts/stops
  useEffect(() => {
    if (timer.isRunning && isMusicEnabled && !audio.isPlaying) {
      audio.play(audio.currentCategory);
    } else if (!timer.isRunning && audio.isPlaying) {
      audio.stop();
    }
  }, [timer.isRunning, isMusicEnabled, audio]);

  // Collapse when timer is running
  useEffect(() => {
    if (timer.isRunning) {
      setIsExpanded(false);
      setShowPalPicker(false);
      setShowTimerPicker(false);
    }
  }, [timer.isRunning]);

  const handleStartPause = () => {
    if (timer.isRunning) {
      timer.pause();
    } else {
      timer.start();
    }
  };

  const handleTimerSelect = (minutes: number) => {
    timer.setDuration(minutes);
    setShowTimerPicker(false);
  };

  const toggleMusicCategory = (category: MusicCategory) => {
    if (audio.currentCategory === category && isMusicEnabled) {
      setIsMusicEnabled(false);
      if (audio.isPlaying) {
        audio.stop();
      }
    } else {
      audio.setCategory(category);
      setIsMusicEnabled(true);
    }
  };

  if (!mounted) {
    return (
      <div className="flex justify-center">
        <div className="w-[200px] h-[24px] bg-black rounded-[10px]" />
      </div>
    );
  }

  const collapsedWidth = 200;
  const expandedWidth = collapsedWidth * 1.3;

  return (
    <div className="flex justify-center">
      <motion.div
        className="relative bg-black cursor-pointer overflow-hidden"
        animate={{
          width: isExpanded ? expandedWidth : collapsedWidth,
          height: isExpanded ? 340 : 24,
          borderRadius: isExpanded ? 25 : 10,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        onMouseEnter={() => !timer.isRunning && setIsExpanded(true)}
        onMouseLeave={() => {
          setIsExpanded(false);
          setShowPalPicker(false);
          setShowTimerPicker(false);
        }}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <ExpandedContent
              key="expanded"
              timer={timer}
              selectedPal={selectedPal}
              setSelectedPal={setSelectedPal}
              showPalPicker={showPalPicker}
              setShowPalPicker={setShowPalPicker}
              showTimerPicker={showTimerPicker}
              setShowTimerPicker={setShowTimerPicker}
              isMusicEnabled={isMusicEnabled}
              currentCategory={audio.currentCategory}
              toggleMusicCategory={toggleMusicCategory}
              onStartPause={handleStartPause}
              onTimerSelect={handleTimerSelect}
            />
          ) : (
            <CollapsedContent
              key="collapsed"
              selectedPal={selectedPal}
              timeDisplay={timer.formatTime(timer.timeRemaining)}
              isRunning={timer.isRunning}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

interface CollapsedContentProps {
  selectedPal: string;
  timeDisplay: string;
  isRunning: boolean;
}

function CollapsedContent({ selectedPal, timeDisplay, isRunning }: CollapsedContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="flex items-center justify-center h-full px-3 gap-2"
    >
      <div className="relative w-4 h-4">
        <Image
          src={`/focus-pals/${selectedPal}.png`}
          alt={selectedPal}
          fill
          className="object-contain"
        />
      </div>
      <span className={`text-white text-xs font-medium tabular-nums ${isRunning ? "animate-pulse" : ""}`}>
        {timeDisplay}
      </span>
    </motion.div>
  );
}

interface ExpandedContentProps {
  timer: ReturnType<typeof useTimer>;
  selectedPal: string;
  setSelectedPal: (pal: string) => void;
  showPalPicker: boolean;
  setShowPalPicker: (show: boolean) => void;
  showTimerPicker: boolean;
  setShowTimerPicker: (show: boolean) => void;
  isMusicEnabled: boolean;
  currentCategory: MusicCategory;
  toggleMusicCategory: (category: MusicCategory) => void;
  onStartPause: () => void;
  onTimerSelect: (minutes: number) => void;
}

function ExpandedContent({
  timer,
  selectedPal,
  setSelectedPal,
  showPalPicker,
  setShowPalPicker,
  showTimerPicker,
  setShowTimerPicker,
  isMusicEnabled,
  currentCategory,
  toggleMusicCategory,
  onStartPause,
  onTimerSelect,
}: ExpandedContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="flex flex-col items-center h-full pt-10 pb-6 px-4"
    >
      {/* Focus Pal */}
      <div
        className="relative w-16 h-16 cursor-pointer hover:scale-110 transition-transform"
        onClick={() => {
          setShowPalPicker(!showPalPicker);
          setShowTimerPicker(false);
        }}
      >
        <Image
          src={`/focus-pals/${selectedPal}.png`}
          alt={selectedPal}
          fill
          className="object-contain"
        />
      </div>

      {/* Pal Picker */}
      <AnimatePresence>
        {showPalPicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-6 gap-1 mt-2 max-w-[220px] overflow-hidden"
          >
            {FOCUS_PALS.map((pal) => (
              <button
                key={pal}
                onClick={() => {
                  setSelectedPal(pal);
                  setShowPalPicker(false);
                }}
                className={`relative w-8 h-8 rounded-lg hover:bg-white/20 transition-colors ${
                  selectedPal === pal ? "bg-white/30" : ""
                }`}
              >
                <Image
                  src={`/focus-pals/${pal}.png`}
                  alt={pal}
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer Display */}
      <div className="mt-4">
        <button
          onClick={() => {
            setShowTimerPicker(!showTimerPicker);
            setShowPalPicker(false);
          }}
          className="text-white text-4xl font-light tabular-nums hover:text-white/80 transition-colors"
        >
          {timer.formatTime(timer.timeRemaining)}
        </button>
      </div>

      {/* Timer Picker */}
      <AnimatePresence>
        {showTimerPicker && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap justify-center gap-2 mt-2 max-w-[220px] overflow-hidden"
          >
            {TIMER_OPTIONS.map((minutes) => (
              <button
                key={minutes}
                onClick={() => onTimerSelect(minutes)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  timer.timeRemaining === minutes * 60
                    ? "bg-white text-black"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {minutes}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Categories */}
      <div className="flex gap-2 mt-4">
        {MUSIC_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => toggleMusicCategory(category.id)}
            className={`px-3 py-1.5 rounded-full text-xs transition-all ${
              isMusicEnabled && currentCategory === category.id
                ? "bg-white text-black"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <span className="mr-1">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Start/Pause Button */}
      <button
        onClick={onStartPause}
        className="mt-6 w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors"
      >
        {timer.isRunning ? (
          <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </motion.div>
  );
}
