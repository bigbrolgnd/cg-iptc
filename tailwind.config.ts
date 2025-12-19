import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                serif: ["var(--font-serif)", "Georgia", "serif"],
                "spectral-sc": ["var(--font-spectral-sc)", "serif"],
                lexend: ["var(--font-lexend)", "sans-serif"],
            },
            keyframes: {
                "spin-tick": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            animation: {
                "spin-tick": "spin-tick 60s steps(60) infinite",
                marquee: "marquee 3.3s linear infinite",
            },
        },
    },
    plugins: [typography],
} satisfies Config;
