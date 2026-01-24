"use client";

import Image from "next/image";
import { MacMenuBar } from "./MacMenuBar";
import { NotchDemo } from "./NotchDemo";

export function Hero() {
  return (
    <section className="w-full px-4 pt-8 pb-12">
      {/* Desktop Frame */}
      <div className="relative max-w-4xl mx-auto">
        {/* Wallpaper with menu bar overlay */}
        <div className="relative rounded-xl shadow-2xl">
          {/* Wallpaper Image */}
          <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden">
            <Image
              src="/wallpaper.png"
              alt="Mountain wallpaper"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Menu Bar Overlay - positioned on top of wallpaper, outside overflow-hidden */}
          <div className="absolute inset-x-0 top-0 z-10">
            <MacMenuBar>
              <NotchDemo />
            </MacMenuBar>
          </div>
        </div>
      </div>

      {/* Tagline and CTA */}
      <div className="text-center mt-12">
        <h1 className="text-[32px] md:text-3xl font-semibold text-gray-900 mb-6">
          Stay focused, with an animal pal & music
        </h1>
        <a
          href="#waitlist"
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-xl font-medium rounded-full hover:bg-gray-800 transition-colors"
        >
          Join Waitlist
        </a>
      </div>
    </section>
  );
}
