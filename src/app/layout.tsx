import type { Metadata } from "next";
import { Delicious_Handrawn, Inter } from "next/font/google";
import "./globals.css";

const deliciousHandrawn = Delicious_Handrawn({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handdrawn",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
    <html lang="en" className={`${deliciousHandrawn.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = "manual"` }} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
