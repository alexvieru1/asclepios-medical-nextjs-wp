import "./globals.css";

import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import CookieConsent from "@/components/ui/cookie-consent"; // ⬅️ add this

import { cn } from "@/lib/utils";

import { SiteNavbar } from "@/components/nav/site-nav";
import { Footer } from "@/components/footer/footer";
import { Toaster } from "@/components/ui/sonner";

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen font-sans antialiased pt-24",
          font.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          forcedTheme="light"
        >
          <SiteNavbar />
          {children}
          <Footer />

          {/* Cookie banner (shows on first visit, can be reopened from footer) */}
          <CookieConsent />
        </ThemeProvider>

        {/* Vercel Analytics (privacy-friendly) */}
        <Analytics />

        {/* Sonner toast — move to top-right so it never overlaps the cookie bar */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
          offset="16px"
          toastOptions={{
            classNames: {
              toast:
                "bg-emerald-600 text-white border-0 shadow-2xl shadow-emerald-400/30 rounded-xl",
              title: "text-white font-semibold",
              description: "text-emerald-50/90",
              actionButton: "bg-white/20 hover:bg-white/30 text-white rounded-lg",
              cancelButton: "bg-white/10 hover:bg-white/20 text-white rounded-lg",
              closeButton: "text-white/80 hover:text-white",
            },
          }}
        />
      </body>
    </html>
  );
}
