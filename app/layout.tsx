import type { Metadata } from "next";
import { Source_Serif_4, Inter, Spectral_SC, Lexend_Deca, Oswald } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spectralSC = Spectral_SC({
  variable: "--font-spectral-sc",
  subsets: ["latin"],
  weight: ["600"],
});

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cg-iptc.org"),
  title: {
    template: "%s | Clay-Gilmore Institute",
    default: "Clay-Gilmore Institute for Philosophy, Technology, and Counterinsurgency",
  },
  description: "Research, analysis, and discourse on anticolonial thought, philosophy, and technology.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  openGraph: {
    title: "Clay-Gilmore Institute",
    description: "Research, analysis, and discourse on anticolonial thought, philosophy, and technology.",
    url: "https://cg-iptc.org",
    siteName: "Clay-Gilmore Institute",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/cg-iptc.png",
        width: 1200, // Assuming standard OG size, browser will resize if needed
        height: 630,
        alt: "Clay-Gilmore Institute Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clay-Gilmore Institute",
    description: "Research, analysis, and discourse on anticolonial thought, philosophy, and technology.",
    images: ["/cg-iptc.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSerif.variable} ${inter.variable} ${spectralSC.variable} ${lexendDeca.variable} ${oswald.variable} font-sans antialiased bg-white text-zinc-900`}
      >
        {children}
      </body>
    </html>
  );
}
