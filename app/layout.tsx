import type { Metadata } from "next";
import { Source_Serif_4, Inter, Spectral_SC, Lexend_Deca } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Clay-Gilmore Institute for Philosophy, Technology, and Counterinsurgency",
  description: "The Clay-Gilmore Institute for Philosophy, Technology, and Counterinsurgency - Research, analysis, and discourse on anticolonial thought.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSerif.variable} ${inter.variable} ${spectralSC.variable} ${lexendDeca.variable} font-sans antialiased bg-white text-zinc-900`}
      >
        {children}
      </body>
    </html>
  );
}
