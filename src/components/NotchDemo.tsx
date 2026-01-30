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

const TIMER_OPTIONS = [5, 10, 15, 20, 25, 30, 45, 50, 60];

const MUSIC_CATEGORIES: { id: MusicCategory; label: string }[] = [
  { id: "piano", label: "Piano" },
  { id: "lofi", label: "LoFi" },
  { id: "ambient", label: "Ambient" },
];

export function NotchDemo() {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPal, setSelectedPal] = useState("dragon");
  const [showFocusPalGallery, setShowFocusPalGallery] = useState(false);
  const [showMusicSelector, setShowMusicSelector] = useState(false);
  const [showTimerDropdown, setShowTimerDropdown] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [mounted, setMounted] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(25);

  const timer = useTimer(25);
  const audio = useAudio();

  // Dimensions matching the app
  const collapsedWidth = 220;
  const expandedWidth = 360; // Wider for gallery (3 rows of 6)
  const collapsedHeight = 28;
  const expandedHeight = 170;
  const realNotchWidth = 100;
  const earSize = isExpanded ? 24 : 12;
  const cornerRadius = isExpanded ? 32 : 12;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (timer.isRunning && isMusicEnabled && !audio.isPlaying) {
      audio.play(audio.currentCategory);
    } else if (!timer.isRunning && audio.isPlaying) {
      audio.stop();
    }
  }, [timer.isRunning, isMusicEnabled, audio]);

  const handleHover = (hovering: boolean) => {
    setIsHovered(hovering);
    setIsExpanded(hovering);
    if (!hovering) {
      setShowFocusPalGallery(false);
      setShowMusicSelector(false);
      setShowTimerDropdown(false);
    }
  };

  const handleStartStop = () => {
    if (timer.isRunning) {
      timer.pause();
    } else {
      timer.start();
    }
    setShowTimerDropdown(false);
  };

  const handleTimerSelect = (minutes: number) => {
    setTimerMinutes(minutes);
    timer.setDuration(minutes);
    setShowTimerDropdown(false);
  };

  const toggleMusic = () => {
    setIsMusicEnabled(!isMusicEnabled);
    if (timer.isRunning) {
      audio.toggle(audio.currentCategory);
    } else if (isMusicEnabled && audio.isPlaying) {
      audio.stop();
    }
  };

  if (!mounted) {
    return (
      <div className="flex justify-center pt-1">
        <div className="w-[220px] h-[28px] bg-black rounded-[12px]" />
      </div>
    );
  }

  const notchWidth = isExpanded ? expandedWidth : collapsedWidth;

  return (
    <div 
      className="relative flex justify-center"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {/* Left Ear */}
      <motion.div
        className="absolute top-0"
        initial={false}
        animate={{
          width: earSize,
          height: earSize,
          x: -(notchWidth / 2 + earSize),
        }}
        style={{
          left: '50%',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 24 24" 
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          <path
            d="M24 0 L24 24 Q24 0 0 0 Z"
            fill="black"
          />
        </svg>
      </motion.div>

      {/* Right Ear */}
      <motion.div
        className="absolute top-0"
        initial={false}
        animate={{
          width: earSize,
          height: earSize,
          x: notchWidth / 2,
        }}
        style={{
          left: '50%',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 24 24" 
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          <path
            d="M0 0 L0 24 Q0 0 24 0 Z"
            fill="black"
          />
        </svg>
      </motion.div>

      {/* Main Notch Body */}
      <motion.div
        className={`relative bg-black ${isExpanded ? 'overflow-visible' : 'overflow-hidden'}`}
        initial={false}
        animate={{
          width: isExpanded ? expandedWidth : collapsedWidth,
          height: isExpanded ? expandedHeight : collapsedHeight,
          borderBottomLeftRadius: cornerRadius,
          borderBottomRightRadius: cornerRadius,
        }}
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
        }}
        whileHover={!isExpanded ? { scale: 1.03 } : {}}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <ExpandedContent
              key="expanded"
              timer={timer}
              timerMinutes={timerMinutes}
              selectedPal={selectedPal}
              setSelectedPal={setSelectedPal}
              showFocusPalGallery={showFocusPalGallery}
              setShowFocusPalGallery={setShowFocusPalGallery}
              showMusicSelector={showMusicSelector}
              setShowMusicSelector={setShowMusicSelector}
              showTimerDropdown={showTimerDropdown}
              setShowTimerDropdown={setShowTimerDropdown}
              isMusicEnabled={isMusicEnabled}
              toggleMusic={toggleMusic}
              currentCategory={audio.currentCategory}
              setCategory={audio.setCategory}
              taskText={taskText}
              setTaskText={setTaskText}
              onStartStop={handleStartStop}
              onTimerSelect={handleTimerSelect}
            />
          ) : (
            <CollapsedContent
              key="collapsed"
              selectedPal={selectedPal}
              timeDisplay={timer.isRunning 
                ? timer.formatTime(timer.timeRemaining) 
                : timer.formatTime(timerMinutes * 60)}
              realNotchWidth={realNotchWidth}
              totalWidth={collapsedWidth}
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
  realNotchWidth: number;
  totalWidth: number;
}

function CollapsedContent({ selectedPal, timeDisplay, realNotchWidth, totalWidth }: CollapsedContentProps) {
  const sideWidth = (totalWidth - realNotchWidth) / 2;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="flex items-center h-full"
    >
      {/* Left side - Focus Pal */}
      <div 
        className="flex items-center justify-start pl-3"
        style={{ width: sideWidth }}
      >
        <div className="relative w-5 h-5 -mt-0.5">
          <Image
            src={`/focus-pals/${selectedPal}.png`}
            alt={selectedPal}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
      
      {/* Middle - Real notch area (empty) */}
      <div style={{ width: realNotchWidth }} />
      
      {/* Right side - Timer */}
      <div 
        className="flex items-center justify-end pr-3"
        style={{ width: sideWidth }}
      >
        <span className="text-white text-xs font-medium tabular-nums">
          {timeDisplay}
        </span>
      </div>
    </motion.div>
  );
}

interface ExpandedContentProps {
  timer: ReturnType<typeof useTimer>;
  timerMinutes: number;
  selectedPal: string;
  setSelectedPal: (pal: string) => void;
  showFocusPalGallery: boolean;
  setShowFocusPalGallery: (show: boolean) => void;
  showMusicSelector: boolean;
  setShowMusicSelector: (show: boolean) => void;
  showTimerDropdown: boolean;
  setShowTimerDropdown: (show: boolean) => void;
  isMusicEnabled: boolean;
  toggleMusic: () => void;
  currentCategory: MusicCategory;
  setCategory: (category: MusicCategory) => void;
  taskText: string;
  setTaskText: (text: string) => void;
  onStartStop: () => void;
  onTimerSelect: (minutes: number) => void;
}

function ExpandedContent({
  timer,
  timerMinutes,
  selectedPal,
  setSelectedPal,
  showFocusPalGallery,
  setShowFocusPalGallery,
  showMusicSelector,
  setShowMusicSelector,
  showTimerDropdown,
  setShowTimerDropdown,
  isMusicEnabled,
  toggleMusic,
  currentCategory,
  setCategory,
  taskText,
  setTaskText,
  onStartStop,
  onTimerSelect,
}: ExpandedContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full px-4 py-3"
    >
      {/* Navigation row - only show when in sub-view */}
      {(showFocusPalGallery || showMusicSelector) && (
        <div className="flex items-center h-4 mb-2">
          <button
            onClick={() => {
              setShowFocusPalGallery(false);
              setShowMusicSelector(false);
            }}
            className="text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="popLayout">
          {showFocusPalGallery ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <FocusPalGallery
                selectedPal={selectedPal}
                onSelect={(pal) => {
                  setSelectedPal(pal);
                  setShowFocusPalGallery(false);
                }}
              />
            </motion.div>
          ) : showMusicSelector ? (
            <motion.div
              key="music"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <MusicSelector
                currentCategory={currentCategory}
                onSelect={(category) => {
                  setCategory(category);
                  setShowMusicSelector(false);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="timer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <TimerInterface
                timer={timer}
                timerMinutes={timerMinutes}
                showTimerDropdown={showTimerDropdown}
                setShowTimerDropdown={setShowTimerDropdown}
                taskText={taskText}
                setTaskText={setTaskText}
                onStartStop={onStartStop}
                onTimerSelect={onTimerSelect}
                selectedPal={selectedPal}
                onFocusPalClick={() => setShowFocusPalGallery(true)}
                isMusicEnabled={isMusicEnabled}
                toggleMusic={toggleMusic}
                onMusicClick={() => setShowMusicSelector(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface TimerInterfaceProps {
  timer: ReturnType<typeof useTimer>;
  timerMinutes: number;
  showTimerDropdown: boolean;
  setShowTimerDropdown: (show: boolean) => void;
  taskText: string;
  setTaskText: (text: string) => void;
  onStartStop: () => void;
  onTimerSelect: (minutes: number) => void;
  selectedPal: string;
  onFocusPalClick: () => void;
  isMusicEnabled: boolean;
  toggleMusic: () => void;
  onMusicClick: () => void;
}

function TimerInterface({
  timer,
  timerMinutes,
  showTimerDropdown,
  setShowTimerDropdown,
  taskText,
  setTaskText,
  onStartStop,
  onTimerSelect,
  selectedPal,
  onFocusPalClick,
  isMusicEnabled,
  toggleMusic,
  onMusicClick,
}: TimerInterfaceProps) {
  return (
    <div className="flex flex-col gap-3 mt-6">
      {/* Timer input row */}
      <div className="relative">
        <div className="flex items-center gap-3 px-4 py-3 bg-[#282828] rounded-[24px]">
          {/* Timer button/display */}
          {timer.isRunning ? (
            <span className="text-white text-sm font-medium px-3 py-1.5 bg-[#4F4F4F] rounded-full tabular-nums whitespace-nowrap">
              {timer.formatTime(timer.timeRemaining)}
            </span>
          ) : (
            <button
              onClick={() => setShowTimerDropdown(!showTimerDropdown)}
              className="text-white text-sm font-medium px-3 py-1.5 bg-[#4F4F4F] rounded-full hover:bg-[#5F5F5F] transition-colors whitespace-nowrap cursor-pointer"
            >
              {timerMinutes} min
            </button>
          )}

          {/* Task input */}
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Task"
            className="flex-1 bg-transparent text-white text-sm placeholder-[#999] outline-none min-w-0"
          />

          {/* Play/Stop button */}
          <button
            onClick={onStartStop}
            className="p-2 bg-[#4F4F4F] rounded-full hover:bg-[#5F5F5F] transition-colors flex-shrink-0 cursor-pointer"
          >
            {timer.isRunning ? (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="1" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Timer dropdown */}
        <AnimatePresence>
          {showTimerDropdown && !timer.isRunning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-full left-0 mt-1 bg-[#282828] rounded-xl p-1.5 z-50 shadow-xl"
            >
              <div className="grid grid-cols-3 gap-0.5">
                {TIMER_OPTIONS.map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => onTimerSelect(minutes)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      timerMinutes === minutes
                        ? "bg-white text-black"
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    {minutes}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom row: Focus Pal + Music */}
      <div className="flex gap-3">
          {/* Focus Pal button */}
          <button
            onClick={onFocusPalClick}
            className="flex-1 flex items-center justify-between px-4 py-2.5 bg-white/15 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
          >
            <span className="text-white text-sm font-medium">Focus Pal</span>
            <div className="relative w-5 h-5">
              <Image
                src={`/focus-pals/${selectedPal}.png`}
                alt={selectedPal}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </button>

          {/* Music button */}
          <div
            onClick={onMusicClick}
            className="flex-1 flex items-center justify-between px-4 py-2.5 bg-white/15 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
          >
            <span className="text-white text-sm font-medium">Music</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMusic();
              }}
              className="text-white text-xs font-semibold px-2 py-0.5 bg-white/30 rounded-full hover:bg-white/40 transition-colors cursor-pointer"
            >
              {isMusicEnabled ? "ON" : "OFF"}
            </button>
          </div>
        </div>
    </div>
  );
}

interface FocusPalGalleryProps {
  selectedPal: string;
  onSelect: (pal: string) => void;
}

const PAL_DISPLAY_NAMES: Record<string, string> = {
  "baby-chick": "Baby Chick",
  "cat": "Cat",
  "cow": "Cow",
  "crocodile": "Crocodile",
  "deer": "Deer",
  "dog": "Dog",
  "dove": "Dove",
  "dragon": "Dragon",
  "fish": "Fish",
  "hedgehog": "Hedgehog",
  "hippo": "Hippo",
  "sauropod": "Sauropod",
  "sloth": "Sloth",
  "swan": "Swan",
  "tiger": "Tiger",
  "two-hump-camel": "Camel",
  "whale": "Whale",
  "zebra": "Zebra",
};

function FocusPalGallery({ selectedPal, onSelect }: FocusPalGalleryProps) {
  const [hoveredPal, setHoveredPal] = useState<string | null>(null);
  const previewPal = hoveredPal || selectedPal;

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center">
        <span className="text-white text-sm font-semibold">Focus Pal</span>
      </div>

      <div className="flex gap-2">
        {/* Grid of creatures - 6 columns, 3 rows */}
        <div className="grid grid-cols-6 gap-1">
        {FOCUS_PALS.map((pal) => (
          <button
            key={pal}
            onClick={() => onSelect(pal)}
            onMouseEnter={() => setHoveredPal(pal)}
            onMouseLeave={() => setHoveredPal(null)}
            className={`relative w-7 h-7 rounded-lg transition-all cursor-pointer ${
              selectedPal === pal
                ? "bg-white/40 scale-110"
                : "hover:bg-white/20"
            }`}
          >
            <Image
              src={`/focus-pals/${pal}.png`}
              alt={pal}
              fill
              className="object-contain p-0.5"
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Preview panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white/10 rounded-2xl p-3">
        <div className="relative w-14 h-14">
          <Image
            src={`/focus-pals/${previewPal}.png`}
            alt={previewPal}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <span className="text-white text-xs font-medium mt-1">
          {PAL_DISPLAY_NAMES[previewPal] || previewPal}
        </span>
      </div>
      </div>
    </div>
  );
}

interface MusicSelectorProps {
  currentCategory: MusicCategory;
  onSelect: (category: MusicCategory) => void;
}

const MUSIC_ICON_PATHS: Record<MusicCategory, string> = {
  piano: "/piano-icon.png",
  lofi: "/lofi-icon.png",
  ambient: "/ambient-icon.png",
};

function MusicSelector({ currentCategory, onSelect }: MusicSelectorProps) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {/* Header */}
      <div className="flex items-center">
        <span className="text-white text-sm font-semibold">Music</span>
      </div>

      {/* Category cards in a row */}
      <div className="flex gap-2">
        {MUSIC_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 rounded-2xl transition-all cursor-pointer ${
              currentCategory === category.id
                ? "bg-white/30 ring-1 ring-white/50"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <div className="relative w-6 h-6">
              <Image
                src={MUSIC_ICON_PATHS[category.id]}
                alt={category.label}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <span className="text-white text-xs font-medium">{category.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
