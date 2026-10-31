import type { Metadata } from "next";
import { Amiri, Bodoni_Moda, Fragment_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import { GarmentDefs } from "@/components/Garment";
import Header from "@/components/Header";
import SelectionDrawer from "@/components/SelectionDrawer";
import ThemeProvider from "@/components/ThemeProvider";
import { SITE_URL } from "@/lib/site";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const fragment = Fragment_Mono({
  variable: "--font-fragment",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: "400",
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mastour Oversize | Robes, abayas et ensembles amples",
    template: "%s | Mastour Oversize",
  },
  description: "Des coupes oversize pensées pour la femme moderne, alliant pudeur et liberté de mouvement. Robes, abayas, ensembles et kimonos. Commande sur Instagram.",
  openGraph: {
    siteName: "Mastour Oversize",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

// Applique le thème avant le premier rendu pour éviter un flash
const themeScript = `try{if(localStorage.getItem('mastour-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${bodoni.variable} ${instrument.variable} ${fragment.variable} ${amiri.variable} flex min-h-screen flex-col antialiased`}>
        <ThemeProvider>
          <GarmentDefs />
          <AnnouncementBar />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <SelectionDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
