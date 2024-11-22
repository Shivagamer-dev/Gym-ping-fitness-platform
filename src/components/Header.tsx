import React from 'react';
import { UserButton } from '@clerk/clerk-react';

function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black via-[#1A1A1A] to-transparent px-6 py-3 shadow-lg">
            <div className="flex justify-between items-center w-full">
                {/* Brand Name */}
                <a href="/" className="text-white text-4xl font-extrabold italic tracking-wide group">
                    Gym-Ping
                    <span className="block w-0 h-[2px] bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </a>

                {/* Navigation Links */}
                <nav className="flex gap-10 text-lg font-semibold">
                    {['Spotter', 'Locator', 'Dashboard'].map((link, index) => (
                        <a
                            key={index}
                            href={`/${link.toLowerCase()}`}
                            className="text-white relative group"
                        >
                            {link}
                            {/* Gradient Underline on Hover */}
                            <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                        </a>
                    ))}
                </nav>

                {/* Redesigned User Button */}
                <div className="flex items-center">
                    <div className="relative group">
                        <UserButton />
                        <div className="absolute right-0 mt-2 p-2 text-sm font-medium text-white bg-black/90 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                            Profile
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
