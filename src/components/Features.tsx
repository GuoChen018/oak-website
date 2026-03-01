"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ALL_FOCUS_PALS = [
  "baby-chick", "black-cat", "cat", "cow", "crocodile", "deer", "dog",
  "dove", "dragon", "elephant", "fish", "flamingo", "hedgehog", "hippo",
  "otter", "sauropod", "sloth", "swan", "t-rex", "tiger",
  "two-hump-camel", "whale", "zebra",
];

const PAL_DISPLAY_NAMES: Record<string, string> = {
  "baby-chick": "Baby Chick",
  "black-cat": "Black Cat",
  cat: "Cat",
  cow: "Cow",
  crocodile: "Crocodile",
  deer: "Deer",
  dog: "Dog",
  dove: "Dove",
  dragon: "Dragon",
  elephant: "Elephant",
  fish: "Fish",
  flamingo: "Flamingo",
  hedgehog: "Hedgehog",
  hippo: "Hippo",
  otter: "Otter",
  sauropod: "Sauropod",
  sloth: "Sloth",
  swan: "Swan",
  "t-rex": "T-Rex",
  tiger: "Tiger",
  "two-hump-camel": "Camel",
  whale: "Whale",
  zebra: "Zebra",
};

const CUSTOM_PAL_IMAGES = [
  "/custom-pals/feifei.png",
  "/custom-pals/mochi-1.png",
  "/custom-pals/feifei-1.png",
  "/custom-pals/mochi-2.png",
  "/custom-pals/feifei-2.png",
  "/custom-pals/mochi-3.png",
  "/custom-pals/feifei-3.png",
  "/custom-pals/mochi-4.png",
  "/custom-pals/feifei-4.png",
  "/custom-pals/feifei-mochi.png",
  "/custom-pals/mochi.png",
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function FeatureCard({
  children,
  className = "",
  colSpan = false,
}: {
  children: React.ReactNode;
  className?: string;
  colSpan?: boolean;
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`bg-[#1C1C1E] rounded-2xl p-6 ${colSpan ? "md:col-span-2" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Card 1: Custom Focus Pal (left side of enlarged notch) ─────────────────

function CustomFocusPalCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CUSTOM_PAL_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <FeatureCard className="flex flex-col overflow-hidden relative h-[200px] pt-0 px-6 pb-5">
      {/* Black notch area: left ear visible, body extends to right edge */}
      <div className="absolute top-0 right-0 left-[44px] h-[90px] bg-black rounded-bl-[28px]" />
      <div className="absolute top-0 left-[20px] w-[24px] h-[24px]">
        <svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="none">
          <path d="M24 0 L24 24 Q24 0 0 0 Z" fill="black" />
        </svg>
      </div>

      {/* Cat image - centered inside the 90px notch area */}
      <div className="relative z-10 ml-[34px] mt-[13px]">
        <div className="relative w-[64px] h-[64px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={CUSTOM_PAL_IMAGES[currentIndex]}
                alt="Custom focus pal"
                fill
                className="object-cover rounded-xl"
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="text-white text-lg font-semibold">Custom Focus Pal</h3>
        <p className="text-[#999] text-sm mt-1">
          Any image or GIF, right in your Mac&apos;s notch.
        </p>
      </div>
    </FeatureCard>
  );
}

// ─── Card 2: A Persistent Timer (right side of enlarged notch) ──────────────

function PersistentTimerCard() {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) return 25 * 60;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const display = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <FeatureCard className="flex flex-col overflow-hidden relative h-[200px] pt-0 px-6 pb-5">
      {/* Black notch area: body extends from left edge, right ear visible */}
      <div className="absolute top-0 left-0 h-[90px] bg-black rounded-br-[28px]" style={{ right: 44 }} />
      <div className="absolute top-0 w-[24px] h-[24px]" style={{ right: 20 }}>
        <svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="none">
          <path d="M0 0 L0 24 Q0 0 24 0 Z" fill="black" />
        </svg>
      </div>

      {/* Timer display - right-aligned, fits inside the 90px notch */}
      <div className="relative z-10 flex justify-end mt-[20px]" style={{ marginRight: 44 }}>
        <span className="text-white text-4xl font-semibold tracking-tight">
          {display.split("").map((char, i) => (
            <span
              key={i}
              className="inline-block text-center"
              style={{ width: char === ":" ? "16px" : "24px" }}
            >
              {char}
            </span>
          ))}
        </span>
      </div>

      <div className="mt-auto">
        <h3 className="text-white text-lg font-semibold">
          A Persistent Timer
        </h3>
        <p className="text-[#999] text-sm mt-1">
          A timer always visible to help you stay on track.
        </p>
      </div>
    </FeatureCard>
  );
}

// ─── Card 3: Focus Patterns (stats + calendar combined) ─────────────────────

const MOCK_TOP_PALS = [
  { name: "Sauropod", pal: "sauropod", time: "38m" },
  { name: "Hedgehog", pal: "hedgehog", time: "23m" },
  { name: "Whale", pal: "whale", time: "12m" },
];

const MOCK_TOP_GENRES = [
  { name: "Piano", icon: "/piano-icon.png", time: "38m" },
  { name: "Ambient", icon: "/ambient-icon.png", time: "23m" },
  { name: "Lofi", icon: "/lofi-icon.png", time: "8m" },
];

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

const MOCK_CALENDAR_DATA: { intensity: number; minutes: number }[][] = [
  [
    { intensity: -1, minutes: 0 },
    { intensity: -1, minutes: 0 },
    { intensity: -1, minutes: 0 },
    { intensity: 0, minutes: 0 },
    { intensity: 0.75, minutes: 45 },
    { intensity: 0.25, minutes: 10 },
    { intensity: 0, minutes: 0 },
  ],
  [
    { intensity: 0.5, minutes: 25 },
    { intensity: 0, minutes: 0 },
    { intensity: 0, minutes: 0 },
    { intensity: 0.75, minutes: 50 },
    { intensity: 0.25, minutes: 8 },
    { intensity: 0.5, minutes: 30 },
    { intensity: 0.25, minutes: 12 },
  ],
  [
    { intensity: 0.25, minutes: 15 },
    { intensity: 0, minutes: 0 },
    { intensity: 0.5, minutes: 35 },
    { intensity: 0.25, minutes: 10 },
    { intensity: 0.75, minutes: 55 },
    { intensity: 1, minutes: 90 },
    { intensity: 0.5, minutes: 28 },
  ],
  [
    { intensity: 0.25, minutes: 12 },
    { intensity: 0, minutes: 0 },
    { intensity: 0.75, minutes: 48 },
    { intensity: 0, minutes: 0 },
    { intensity: 0.25, minutes: 15 },
    { intensity: 0.5, minutes: 22 },
    { intensity: 1, minutes: 75 },
  ],
  [
    { intensity: 0, minutes: 0 },
    { intensity: 0.25, minutes: 10 },
    { intensity: 0, minutes: 0 },
    { intensity: 0, minutes: 0 },
    { intensity: 0.5, minutes: 30 },
    { intensity: 0.25, minutes: 14 },
    { intensity: 0, minutes: 0 },
  ],
];

function colorForIntensity(intensity: number): string {
  if (intensity < 0) return "transparent";
  if (intensity === 0) return "#333333";
  if (intensity < 0.3) return "#3A3A3A";
  if (intensity < 0.55) return "#5A5A5A";
  if (intensity < 0.8) return "#8A8A8A";
  return "#FFFFFF";
}

function formatMinutes(min: number): string {
  if (min === 0) return "0m";
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function FocusPatternsCard() {
  const calendarData = MOCK_CALENDAR_DATA;
  const [hoveredCell, setHoveredCell] = useState<{
    week: number;
    day: number;
  } | null>(null);
  const todayCell = { week: 4, day: 4 };

  return (
    <FeatureCard colSpan>
      <div className="flex flex-col md:flex-row gap-3 md:items-stretch">
        {/* Left: Stats + Top Pals/Genre */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Stats row */}
          <div className="flex gap-2">
            {[
              { value: "1h 34m", label: "Total Focus Time" },
              { value: "25m", label: "Avg Session Time" },
              { value: "40", label: "Total Sessions" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex-1 bg-[#2A2A2C] rounded-xl px-3 py-2.5"
              >
                <div className="text-white text-base font-semibold">
                  {stat.value}
                </div>
                <div className="text-[#777] text-xs mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Top Pals & Genre - each in its own container */}
          <div className="flex gap-2 flex-1">
            <div className="flex-1 bg-[#2A2A2C] rounded-xl p-3">
              <div className="text-[#777] text-xs font-medium mb-2">
                Top Focus Pals
              </div>
              <div className="flex flex-col gap-2">
                {MOCK_TOP_PALS.map((pal) => (
                  <div key={pal.name} className="flex items-center gap-2">
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Image
                        src={`/focus-pals/${pal.pal}.png`}
                        alt={pal.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <span className="text-white text-sm flex-1">
                      {pal.name}
                    </span>
                    <span className="text-[#777] text-sm">{pal.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 bg-[#2A2A2C] rounded-xl p-3">
              <div className="text-[#777] text-xs font-medium mb-2">
                Top Focus Genre
              </div>
              <div className="flex flex-col gap-2">
                {MOCK_TOP_GENRES.map((genre) => (
                  <div key={genre.name} className="flex items-center gap-2">
                    <div className="relative w-6 h-6 flex-shrink-0">
                      <Image
                        src={genre.icon}
                        alt={genre.name}
                        width={24}
                        height={24}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <span className="text-white text-sm flex-1">
                      {genre.name}
                    </span>
                    <span className="text-[#777] text-sm">{genre.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Calendar in its own container */}
        <div className="flex-1 bg-[#2A2A2C] rounded-xl p-3">
          {/* Calendar header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#777] text-xs font-medium">
              Monthly Usage
            </span>
            <span className="text-[#555] text-xs">February</span>
            <svg
              className="w-3 h-3 text-[#555]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Calendar Grid */}
          <div className="flex flex-col gap-1.5">
            <div className="grid grid-cols-7 gap-1.5">
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="text-[#555] text-[10px] text-center font-medium"
                >
                  {label}
                </div>
              ))}
            </div>

            {calendarData.map((week, weekIdx) => (
              <div key={weekIdx} className="grid grid-cols-7 gap-1.5">
                {week.map((day, dayIdx) => {
                  const isToday =
                    weekIdx === todayCell.week && dayIdx === todayCell.day;
                  const isHovered =
                    hoveredCell?.week === weekIdx &&
                    hoveredCell?.day === dayIdx;
                  const isEmpty = day.intensity < 0;

                  return (
                    <div
                      key={dayIdx}
                      className="relative h-[26px] rounded-[4px] flex items-center justify-center cursor-default"
                      style={{
                        backgroundColor: isEmpty
                          ? "transparent"
                          : colorForIntensity(day.intensity),
                      }}
                      onMouseEnter={() =>
                        !isEmpty &&
                        setHoveredCell({ week: weekIdx, day: dayIdx })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      {isHovered && !isEmpty && (
                        <span
                          className="text-[8px] font-medium"
                          style={{
                            color:
                              day.intensity > 0.6 ? "#1A1A1A" : "#FFF",
                          }}
                        >
                          {formatMinutes(day.minutes)}
                        </span>
                      )}
                      {isToday && !isHovered && (
                        <span
                          className="text-[8px] font-medium"
                          style={{
                            color:
                              day.intensity > 0.6 ? "#1A1A1A" : "#FFF",
                          }}
                        >
                          Today
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-white text-lg font-semibold">Focus Patterns</h3>
        <p className="text-[#999] text-sm mt-1">
          Your habits and stats, beautifully tracked.
        </p>
      </div>
    </FeatureCard>
  );
}

// ─── Card 4: Task Log ───────────────────────────────────────────────────────

const MOCK_TASKS = [
  {
    date: "Yesterday",
    name: "Revamp Oak website",
    duration: "1h 3m",
    pal: "dragon",
    genre: "piano",
  },
  {
    date: "Jan 31",
    name: "Design settings usage page",
    duration: "1h 3s",
    pal: "hedgehog",
    genre: "ambient",
  },
  {
    date: "Jan 31",
    name: "Think about how to plan for...",
    duration: "12h 3s",
    pal: "sauropod",
    genre: "lofi",
  },
  {
    date: "Jan 30",
    name: "Continue to build",
    duration: "1h 3s",
    pal: "whale",
    genre: "piano",
  },
  {
    date: "Jan 29",
    name: "Fix bugs",
    duration: "45m",
    pal: "cat",
    genre: "ambient",
  },
  {
    date: "Jan 28",
    name: "Write documentation",
    duration: "2h 10m",
    pal: "dove",
    genre: "lofi",
  },
  {
    date: "Jan 27",
    name: "Refactor timer logic",
    duration: "1h 20m",
    pal: "tiger",
    genre: "piano",
  },
  {
    date: "Jan 26",
    name: "Design new onboarding",
    duration: "55m",
    pal: "sloth",
    genre: "ambient",
  },
];

function TaskLogCard() {
  return (
    <FeatureCard className="flex flex-col min-h-[260px]">
      <div className="flex-1 relative overflow-hidden">
        <div className="overflow-y-auto h-[180px] hide-scrollbar" style={{ scrollbarWidth: "none" }}>
          <div className="flex flex-col">
            {MOCK_TASKS.map((task, i) => (
              <div
                key={i}
                className="flex items-center gap-2 py-2 border-b border-[#2A2A2A] last:border-b-0"
              >
                <span className="text-[#555] text-[11px] w-16 flex-shrink-0">
                  {task.date}
                </span>
                <span className="text-white text-[13px] font-medium flex-1 truncate">
                  {task.name}
                </span>
                <span className="text-[#777] text-[11px] flex-shrink-0">
                  {task.duration}
                </span>
                <div className="relative w-4 h-4 flex-shrink-0">
                  <Image
                    src={`/focus-pals/${task.pal}.png`}
                    alt={task.pal}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="relative w-4 h-4 flex-shrink-0">
                  <Image
                    src={`/${task.genre}-icon.png`}
                    alt={task.genre}
                    width={16}
                    height={16}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#1C1C1E] to-transparent pointer-events-none" />
      </div>
      <div className="mt-3">
        <h3 className="text-white text-lg font-semibold">Task History</h3>
        <p className="text-[#999] text-sm mt-1">
          Keep track of your tasks all in one place.
        </p>
      </div>
    </FeatureCard>
  );
}

// ─── Card 5: Focus Music ────────────────────────────────────────────────────

const MUSIC_GENRES = [
  { name: "Piano", icon: "/piano-icon.png" },
  { name: "Lo-fi", icon: "/lofi-icon.png" },
  { name: "Ambient", icon: "/ambient-icon.png" },
  { name: "Jazz", icon: "/jazz-icon.png" },
];

function FocusMusicCard() {
  return (
    <FeatureCard className="flex flex-col justify-between min-h-[260px]">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex gap-6">
          {MUSIC_GENRES.map((genre) => (
            <div
              key={genre.name}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-14 h-14 bg-[#2A2A2C] rounded-2xl flex items-center justify-center">
                <Image
                  src={genre.icon}
                  alt={genre.name}
                  width={32}
                  height={32}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-[#999] text-xs font-medium">
                {genre.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-white text-lg font-semibold">Focus Music</h3>
        <p className="text-[#999] text-sm mt-1">
          50+ curated tracks to get you in the zone.
        </p>
      </div>
    </FeatureCard>
  );
}

// ─── Card 6: Focus Pals (full width) ────────────────────────────────────────

function FocusPalsCard() {
  const [selectedPal, setSelectedPal] = useState("dragon");

  return (
    <FeatureCard colSpan className="overflow-hidden relative pt-0 px-6 pb-6">
      {/* Top-right notch (Custom Focus Pal style - opening on left) */}
      <div className="absolute top-0 right-0 h-[60px] bg-black rounded-bl-[20px]" style={{ width: 400 }} />
      <div className="absolute top-0 w-[20px] h-[20px]" style={{ right: 400 }}>
        <svg width="100%" height="100%" viewBox="0 0 24 24" preserveAspectRatio="none">
          <path d="M24 0 L24 24 Q24 0 0 0 Z" fill="black" />
        </svg>
      </div>

      {/* Title + notch pal preview on the same line */}
      <div className="relative z-10 flex items-start justify-between pt-4 mb-3">
        <div>
          <h3 className="text-white text-lg font-semibold">Focus Pals</h3>
          <p className="text-[#999] text-sm mt-1">
            20+ default animated companions, always by your side.
          </p>
        </div>
        <div className="relative w-8 h-8 mr-[320px] -mt-[2px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPal}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src={`/focus-pals/${selectedPal}.png`}
                alt={selectedPal}
                fill
                className="object-contain"
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pals grid - spans full width */}
      <div className="flex flex-wrap gap-2">
        {ALL_FOCUS_PALS.map((pal) => (
          <motion.button
            key={pal}
            onClick={() => setSelectedPal(pal)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-10 h-10 rounded-xl cursor-pointer transition-colors duration-200 ${
              selectedPal === pal
                ? "bg-white/20 ring-1 ring-white/30"
                : "hover:bg-white/10"
            }`}
          >
            <Image
              src={`/focus-pals/${pal}.png`}
              alt={PAL_DISPLAY_NAMES[pal] || pal}
              fill
              className="object-contain p-1"
              unoptimized
            />
          </motion.button>
        ))}
      </div>
    </FeatureCard>
  );
}

// ─── Card 7: Any Screen (placeholder) ───────────────────────────────────────

function AnyScreenCard() {
  return (
    <FeatureCard className="flex flex-col justify-between min-h-[220px]">
      <div className="flex-1 flex items-center justify-center gap-4 py-4">
        <div className="w-20 h-14 bg-[#2A2A2C] rounded-lg border border-[#3A3A3A]" />
        <div className="w-28 h-18 bg-[#2A2A2C] rounded-lg border border-[#3A3A3A]" />
      </div>
      <div>
        <h3 className="text-white text-lg font-semibold">Any Screen</h3>
        <p className="text-[#999] text-sm mt-1">
          Macbook, monitor, or both. Works even without a notch.
        </p>
      </div>
    </FeatureCard>
  );
}

// ─── Card 8: Your Music (placeholder) ───────────────────────────────────────

function YourMusicCard() {
  return (
    <FeatureCard className="flex flex-col justify-between min-h-[220px]">
      <div className="flex-1 flex items-center justify-center gap-3 py-4">
        <div className="w-12 h-12 bg-[#2A2A2C] rounded-full border border-[#3A3A3A]" />
        <div className="w-12 h-[2px] bg-[#3A3A3A]" />
        <div className="w-12 h-12 bg-[#2A2A2C] rounded-full border border-[#3A3A3A]" />
      </div>
      <div>
        <h3 className="text-white text-lg font-semibold">Your Music</h3>
        <p className="text-[#999] text-sm mt-1">
          Connect Spotify. Play your own tracks.
        </p>
      </div>
    </FeatureCard>
  );
}

// ─── Main Features Section ──────────────────────────────────────────────────

export function Features() {
  return (
    <section className="w-full py-16">
      <div className="w-full bg-black rounded-[64px] py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomFocusPalCard />
          <PersistentTimerCard />
          <FocusPatternsCard />
          <TaskLogCard />
          <FocusMusicCard />
          <FocusPalsCard />
          <AnyScreenCard />
          <YourMusicCard />
        </div>
      </div>
    </section>
  );
}
