"use client";

import Image from "next/image";

export function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between">
      {/* Logo and Name */}
      <div className="flex items-center gap-2">
        <Image
          src="/oak-icon.png"
          alt="Oak logo"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <span className="text-lg font-semibold text-gray-900">Oak</span>
      </div>

      {/* FAQ Link */}
      <a 
        href="#faq" 
        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        FAQ
      </a>
    </nav>
  );
}
