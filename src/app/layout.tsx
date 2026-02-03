import type { Metadata } from "next";
import { Delicious_Handrawn } from "next/font/google";
import "./globals.css";

const deliciousHandrawn = Delicious_Handrawn({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handdrawn",
});

export const metadata: Metadata = {
  title: "Oak - Stay focused, with an animal pal & music",
  description: "A delightful macOS app that transforms your MacBook's notch into a productive focus companion with pomodoro timer, focus pals, and ambient music.",
  metadataBase: new URL("https://www.oakfocus.co"),
  openGraph: {
    title: "Oak - Focus Mode. Made Delightful.",
    description: "Transform your Mac's notch into a focus space with calming music, timer, and a companion by your side.",
    url: "https://www.oakfocus.co",
    siteName: "Oak",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oak - Focus app for Mac with timer and focus pals",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oak - Focus Mode. Made Delightful.",
    description: "Transform your Mac's notch into a focus space with calming music, timer, and a companion by your side.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={deliciousHandrawn.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = "manual"` }} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
