import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pekařství Bánov",
  description: "Tradiční rodinná pekárna v Bánově.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Zde vložíme Header */}
        <SiteHeader />
        
        {/* Main obsah, který se roztáhne (flex-1) */}
        <main className="flex-1">
          {children}
        </main>

        {/* Zde vložíme Footer - toto tam chybělo */}
        <SiteFooter />
      </body>
    </html>
  );
}