import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://jonespg.com"),

  title: {
    default: "Jones Paint & Glass",
    template: "%s | Jones Paint & Glass",
  },

  description:
    "Jones Paint & Glass has been Utah's trusted window, glass, door, and paint expert for over 85 years.",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    siteName: "Jones Paint & Glass",
    type: "website",
    images: [
      {
        url: "/assets/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Jones Paint & Glass",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/assets/images/logo.png"],
  },
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}