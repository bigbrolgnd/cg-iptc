"use client";

import React, { useEffect, useState } from "react";

export function Footer() {
    const [year, setYear] = useState<number | string>('2025');

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="w-full border-t border-zinc-100 bg-white py-8 mt-auto">
            <div className="w-full max-w-screen-2xl mx-auto px-4 flex justify-center items-center">
                <p className="font-sans text-xs text-zinc-500 text-center uppercase tracking-wider">
                    All Rights Reserved {year} Clay-Gilmore Institute for Philosophy, Technology, and Counterinsurgency
                </p>
            </div>
        </footer>
    );
}
