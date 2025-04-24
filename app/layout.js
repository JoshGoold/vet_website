import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Canada from "@/assets/canada-flag.png";
import Link from "next/link";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "WWII: Unknown Graves",
  description: "For Research on aircrew members with unknown graves",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico"></link>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-100`}>
        <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
          <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl font-bold"> WWII Canadian MIA Aircrew Database</h1>
              <Image className="w-16 mx-2 h-10 sm:w-20 sm:h-12" alt="Canada flag" src={Canada} />
            </div>
            <Nav/>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}