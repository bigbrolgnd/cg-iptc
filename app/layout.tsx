import type { Metadata } from "next";
import Script from "next/script";
import { Source_Serif_4, Inter, Spectral_SC, Lexend_Deca, Oswald } from "next/font/google";
import "./globals.css";

/**
 * Inline script to handle chunk load failures gracefully.
 * When a deployment changes chunk hashes, users with stale cached HTML
 * will fail to load the new chunks. This script detects such failures
 * and automatically refreshes the page to get the latest HTML.
 */
const chunkErrorRecoveryScript = `
(function() {
  var hasReloaded = sessionStorage.getItem('chunk-reload');
  window.addEventListener('error', function(e) {
    var target = e.target;
    if (target && target.tagName === 'SCRIPT' && target.src && target.src.includes('/_next/')) {
      if (!hasReloaded) {
        sessionStorage.setItem('chunk-reload', '1');
        window.location.reload();
      }
    }
  }, true);
  // Clear the reload flag after successful page load
  window.addEventListener('load', function() {
    setTimeout(function() { sessionStorage.removeItem('chunk-reload'); }, 5000);
  });
})();
`;

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
    default: "Clay-Gilmore Institute",
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
        // Use a first-party image for reliable social previews.
        // External (e.g., Substack CDN) images can be flaky for some scrapers.
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clay-Gilmore Institute",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clay-Gilmore Institute",
    description: "Research, analysis, and discourse on anticolonial thought, philosophy, and technology.",
    images: ["/og-image.png"],
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
      <head>
        {/* Chunk error recovery - auto-refresh on stale cache */}
        <Script
          id="chunk-error-recovery"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: chunkErrorRecoveryScript }}
        />
      </head>
      <body
        className={`${sourceSerif.variable} ${inter.variable} ${spectralSC.variable} ${lexendDeca.variable} ${oswald.variable} font-sans antialiased bg-white text-zinc-900`}
      >
        {children}
      </body>
    </html>
  );
}
