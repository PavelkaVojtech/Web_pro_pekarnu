import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="cs" suppressHydrationWarning> 
      {/* suppressHydrationWarning je nutný pro next-themes, aby nevyskakovala chyba v konzoli */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark" // Výchozí necháme tmavý, jak jsi měl
            enableSystem
            disableTransitionOnChange
          >
          {/* Zde vložíme Header */}
          <SiteHeader />
          
          {/* Main obsah, který se roztáhne (flex-1) */}
          <main className="flex-1">
            {children}
          </main>

          {/* Zde vložíme Footer */}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}