import Link from "next/link";
const Header = () => {
    const NavLinks = [
        { name: "Home", path: "/" },
        { name: "Game Library", path: "/gamelibrary" },
        { name: "Calendar", path: "/calendar" },
        { name: "Friends", path: "/friends" },
        { name: "Settings", path: "/settings" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-gray-950/90 backdrop-blur-md
                           border-b border-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo / Brand */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-3xl group-hover:rotate-12 transition-transform
                                     duration-300">
                        🦧
                    </span>
                    <span className="text-xl font-bold text-white tracking-wide
                                     group-hover:text-indigo-400 transition-colors duration-300">
                        The Hub
                    </span>
                </ Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-1">
                    {NavLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className="relative px-4 py-2 text-sm font-medium text-gray-300
                                       rounded-lg transition-colors duration-300
                                       hover:text-white hover:bg-white/10
                                       after:absolute after:bottom-0 after:left-1/2
                                       after:-translate-x-1/2 after:h-0.5 after:w-0
                                       after:bg-indigo-500 after:transition-all after:duration-300
                                       hover:after:w-3/4"
                        >
                            {link.name}
                        </ Link>
                    ))}
                </nav>

                {/* Profile / Avatar */}
                <div className="flex items-center gap-4">
                    <button className="relative text-gray-400 hover:text-white
                                       transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11
                                     a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67
                                     6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595
                                     1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {/* Notification Dot */}
                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full
                                         bg-indigo-500 ring-2 ring-gray-950" />
                    </button>

                    <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center
                                    justify-center text-white font-semibold text-sm
                                    cursor-pointer hover:ring-2 hover:ring-indigo-400
                                    transition-all duration-300">
                        K
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-300 hover:text-white
                                   transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header >
    );
};

export default Header;
