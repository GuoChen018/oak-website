import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oak - Stay focused, with an animal pal & music",
  description: "A delightful macOS app that transforms your MacBook's notch into a productive focus companion with pomodoro timer, focus pals, and ambient music.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
