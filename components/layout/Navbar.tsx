import { Logo } from "@/components/ui/Logo";

interface NavbarProps {
    pathname: string;
}

export function Navbar({ pathname }: NavbarProps) {
    const defaultNavItems = [
        { label: "EXHIBITIONS", href: "/exhibitions" },
        { label: "PODCASTS", href: "https://youtube.com/playlist?list=PL3yt4Dw2i5BgJ-9UpC4WPX1OribA1DKYT&si=Dpmoer6TR3Newt8x" },
        { label: "UPDATES", href: "#" },
        { label: "NEWSLETTER", href: "https://mironjclaygilmore.substack.com" },
        { label: "ABOUT US", href: "/about" },
    ];

    const navItems = [{ label: "HOME", href: "/" }, ...defaultNavItems];

    return (
        <>
            <header className="w-full bg-white z-40 relative">
                <div className="w-full max-w-screen-2xl mx-auto flex flex-col items-center justify-center px-4 pt-8 pb-4 gap-6">
                    {/* Branding Section */}
                    <a className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6" href="/">
                        {/* Logo - above text on mobile (order-1), left on desktop (lg) */}
                        <Logo
                            className="w-20 h-20 lg:w-24 lg:h-24 order-1"
                            priority
                        />
                        {/* Title - controlled REM sizes: > 1.875rem(article mobile) and > 2.25rem(article desktop) */}
                        <span
                            style={{ fontFamily: 'var(--font-oswald)' }}
                            className="text-[2.25rem] lg:text-[2.75rem] font-semibold tracking-tight text-black text-center leading-tight order-2"
                        >
                            Clay-Gilmore Institute for Philosophy,<br />
                            Technology, and Counterinsurgency
                        </span>
                    </a>
                </div>
            </header>

            {/* Navigation Links - Sticky */}
            <div className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-zinc-100 transition-all">
                {/* Desktop View: Static Centered */}
                <div className="hidden md:flex justify-center py-4">
                    <nav className="flex items-center gap-8 lg:gap-12">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target={item.label === "PODCASTS" ? "_blank" : undefined}
                                rel={item.label === "PODCASTS" ? "noopener noreferrer" : undefined}
                                className="font-extrabold text-sm md:text-base tracking-widest text-zinc-900 hover:text-red-700 transition-colors uppercase cursor-pointer"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Mobile View: Horizontal Scroll */}
                <div className="flex md:hidden overflow-x-auto py-3 no-scrollbar">
                    <div className="flex items-center gap-8 px-6 min-w-max">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                target={item.label === "PODCASTS" ? "_blank" : undefined}
                                rel={item.label === "PODCASTS" ? "noopener noreferrer" : undefined}
                                className="font-extrabold text-sm tracking-widest text-zinc-900 whitespace-nowrap uppercase hover:text-red-700 cursor-pointer"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
