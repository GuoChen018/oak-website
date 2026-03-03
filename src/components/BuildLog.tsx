"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  image?: string;
  imageAspectRatio?: string;
}

interface BuildLogEntry {
  date: string;
  features?: Feature[];
  improvements?: string[];
  bugFixes?: string[];
}

const BUILD_LOG_ENTRIES: BuildLogEntry[] = [
  {
    date: "March 3, 2026",
    features: [
      {
        title: "Flow State Extension",
        description:
          "When your timer ends, Oak now asks if you want to add more time to your session. Once you focus for 90+ minutes, you will be prompted to take a break.",
        image: "/flow-extension.png",
        imageAspectRatio: "1024 / 576",
      },
      {
        title: "Jazz Focus Music",
        description:
          "A brand new jazz genre with 20+ tracks. From mellow café vibes to smooth saxophone sessions.",
        image: "/jazz-genre.png",
        imageAspectRatio: "1024 / 576",
      },
    ],
    improvements: [
      "Added feature sections in Oak landing page",
      "Restored App Management permission check after onboarding",
    ],
    bugFixes: [
      "Fixed bug when I press on task input and Oak collapses",
    ]
  },
  {
    date: "February 23, 2026",
    features: [
      {
        title: "Custom Focus Pals",
        description:
          "You can now upload your own square image or GIF as a focus pal. Add your pet, favorite character, or anything that keeps you motivated.",
        image: "/custom-focus-pal.png",
        imageAspectRatio: "1024 / 576",
      },
    ],
    improvements: [
      "After adding a task, you can press Enter to start timer",
      "Added more default focus pals — Dinosaur, black cat, etc",
      "More songs added to each genre",
    ],
    bugFixes: [
      "Fixed laggy typing in task",
      "Fixed expanded to collapsed state bug",
      "Fixed trial → paid conversion bug",
      "Fixed notch hover misdetection on stacked external monitors (Y-axis upper bounds)",
      "Fixed collapsed notch icon spacing adjustment",
      "Fixed timer not staying close to the right side and shifting",
      "Fixed soundwave showing up after timer ends",
    ],
  },
  {
    date: "February 12, 2026",
    bugFixes: [
      "Fixed Oak collapsing too easily",
      "Fixed full screen display bug",
    ],
  },
];

export function BuildLog() {
  return (
    <motion.section
      className="w-full max-w-2xl mx-auto px-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="text-2xl font-semibold mb-10 text-gray-900">
        Build Log
      </h1>
      <div className="flex flex-col">
        {BUILD_LOG_ENTRIES.map((entry, index) => (
          <BuildLogEntryRow key={index} entry={entry} />
        ))}
      </div>
    </motion.section>
  );
}

function BuildLogEntryRow({ entry }: { entry: BuildLogEntry }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-0 md:gap-8 py-10">
      {/* Date column */}
      <div className="mb-4 md:mb-0">
        <div className="flex items-center gap-2 md:mt-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0" />
          <span className="text-sm text-gray-500">{entry.date}</span>
        </div>
      </div>

      {/* Content column */}
      <div className="flex flex-col gap-10">
        {entry.features?.map((feature, i) => (
          <div key={i}>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {feature.title}
            </h3>
            {feature.image && (
              <div className="rounded-xl overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={1024}
                  height={576}
                  className="w-full h-auto"
                />
              </div>
            )}
            <p className="text-base text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}

        {entry.improvements && entry.improvements.length > 0 && (
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Improvements
            </h4>
            <ul className="flex flex-col gap-2">
              {entry.improvements.map((item, i) => (
                <li
                  key={i}
                  className="text-base text-gray-600 leading-relaxed flex items-start gap-2"
                >
                  <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {entry.bugFixes && entry.bugFixes.length > 0 && (
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Bug Fixes
            </h4>
            <ul className="flex flex-col gap-2">
              {entry.bugFixes.map((item, i) => (
                <li
                  key={i}
                  className="text-base text-gray-600 leading-relaxed flex items-start gap-2"
                >
                  <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
