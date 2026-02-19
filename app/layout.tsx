import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mastour Oversize | Mode Mastour Élégante",
  description: "Découvrez notre collection de vêtements mastour oversize, élégants et modernes. Robes, abayas, ensembles pour femmes.",
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeProvider from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import BottomNav from "@/components/BottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased font-sans bg-[#FAFAFA] text-gray-900 flex flex-col min-h-screen selection:bg-rose-200 selection:text-rose-900`}
      >
        <ThemeProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-grow">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <ScrollToTop />
          <Footer />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
