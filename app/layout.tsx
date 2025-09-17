import "./globals.css";

import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";

import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";
import { SiteNavbar } from "@/components/nav/site-nav";
import { Footer } from "@/components/footer/footer";
import { Toaster } from "@/components/ui/sonner";

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// export const metadata: Metadata = {
//   title: "Asclepios Medical",
//   description: "Clinică medicală",
//   metadataBase: new URL(siteConfig.site_domain),
//   alternates: {
//     canonical: "/",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        </ThemeProvider>
        <Analytics />
        <Toaster
          richColors
          closeButton
          expand
          offset="64px"
          toastOptions={{
            classNames: {
              toast:
                // high-contrast card + soft shadow
                "bg-emerald-600 text-white border-0 shadow-2xl shadow-emerald-400/30 rounded-xl",
              title: "text-white font-semibold",
              description: "text-emerald-50/90",
              actionButton:
                "bg-white/20 hover:bg-white/30 text-white rounded-lg",
              cancelButton:
                "bg-white/10 hover:bg-white/20 text-white rounded-lg",
              closeButton: "text-white/80 hover:text-white",
            },
          }}
        />
      </body>
    </html>
  );
}
