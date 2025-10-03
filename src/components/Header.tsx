import { useState, useEffect } from "react";
import NewsletterForm from "./NewsLetterForm";
import Thankyou from "./Thankyou"; // Import Thankyou component
import BetaSignupPopup from "../Home/BetaSignupPopup";
import Logo from '../assets/images/CircLogo.png';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false); // New state for Thankyou popup

    const handleNewsletterSuccess = () => {
        setShowThankYou(true);
    };

    const handleCloseThankYou = () => {
        setShowThankYou(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-black/95 backdrop-blur-lg shadow-2xl' 
                : 'bg-gradient-to-r from-black via-[#1A1A1A] to-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    
                    {/* Enhanced Brand Logo */}
                    <a
                        href="/"
                        className="text-white text-3xl md:text-4xl font-extrabold italic tracking-wide group flex items-center gap-3"
                    >
                        <div className="w-12 h-12 flex items-center justify-center shadow-lg">
                            {/*LogoSVG*/}
                            <img src={Logo}/>
                        </div>
                        <span className="relative">
                            Back&Bone
                            <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-500 rounded-full"></span>
                        </span>
                    </a>

                    {/* Desktop Navigation - Enhanced */}
                    <nav className="hidden lg:flex items-center gap-10">
                        <a href="/" className="text-white hover:text-red-400 relative group font-semibold text-lg transition-all duration-300">
                            Home
                            <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                        </a>

                        <a href="/about" className="text-white hover:text-blue-400 relative group font-semibold text-lg transition-all duration-300">
                            About Us
                            <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                        </a>

                        <a href="/tutorial" className="text-white hover:text-green-400 relative group font-semibold text-lg transition-all duration-300">
                            Tutorial
                            <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                        </a>

                        <a href="/pricing" className="text-white hover:text-purple-400 relative group font-semibold text-lg transition-all duration-300">
                            Pricing
                            <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                        </a>

                        {/* Enhanced Know More Dropdown */}
                        <div className="relative group">
                            <button className="text-white hover:text-orange-400 relative font-semibold text-lg transition-all duration-300 flex items-center gap-2">
                                Know More
                                <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-gradient-to-r from-red-500 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
                            </button>

                            {/* Enhanced Dropdown menu */}
                            <div className="absolute right-0 mt-4 w-64 bg-black/95 backdrop-blur-lg border border-gray-600/30 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                                <div className="p-2">
                                    <a
                                        href="/support"
                                        className="flex items-center gap-4 px-4 py-3 text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-blue-500/10 hover:text-red-400 transition-all duration-300 rounded-xl group/item"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg flex items-center justify-center group-hover/item:from-red-500/30 group-hover/item:to-orange-500/30 transition-all duration-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Help Center</div>
                                            <div className="text-xs text-gray-400">Get help and answers</div>
                                        </div>
                                    </a>
                                    <a
                                        href="/career"
                                        className="flex items-center gap-4 px-4 py-3 text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 hover:text-blue-400 transition-all duration-300 rounded-xl group/item"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover/item:from-blue-500/30 group-hover/item:to-purple-500/30 transition-all duration-300">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Careers</div>
                                            <div className="text-xs text-gray-400">Join our team</div>
                                        </div>
                                    </a>
                                    <NewsletterForm onSuccess={handleNewsletterSuccess} />
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Enhanced CTA Button */}
                    <div className="hidden lg:block">
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="bg-gradient-to-r from-red-500 via-orange-500 to-blue-500 hover:from-red-600 hover:via-orange-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/25 hover:scale-105 transform"
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-white hover:text-red-400 transition-colors duration-200 p-2"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Enhanced Mobile Menu */}
                <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
                    isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <nav className="pt-6 pb-4 space-y-1 bg-black/20 backdrop-blur-sm rounded-2xl mt-4 border border-gray-700/30">
                        <a href="/" className="block px-6 py-4 text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-blue-500/10 hover:text-red-400 rounded-xl mx-2 transition-all duration-300 font-semibold">
                            Home
                        </a>
                        <a href="/about" className="block px-6 py-4 text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-blue-500/10 hover:text-blue-400 rounded-xl mx-2 transition-all duration-300 font-semibold">
                            About Us
                        </a>
                        <a href="/tutorial" className="block px-6 py-4 text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-blue-500/10 hover:text-green-400 rounded-xl mx-2 transition-all duration-300 font-semibold">
                            Tutorial
                        </a>
                        <a href="/pricing" className="block px-6 py-4 text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-blue-500/10 hover:text-purple-400 rounded-xl mx-2 transition-all duration-300 font-semibold">
                            Pricing
                        </a>
                        <a href="/support" className="block px-6 py-4 text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-blue-500/10 hover:text-orange-400 rounded-xl mx-2 transition-all duration-300 font-semibold">
                            Help Center
                        </a>
                        <a href="/career" className="block px-6 py-4 text-white hover:bg-gradient-to-r hover:from-red-500/10 hover:to-blue-500/10 hover:text-yellow-400 rounded-xl mx-2 transition-all duration-300 font-semibold">
                            Careers
                        </a>
                        
                        <div className="px-4 pt-4 border-t border-gray-700/30 mt-4">
                            <button
                                onClick={() => {
                                    setIsPopupOpen(true);
                                    setIsMenuOpen(false); // Close mobile menu when opening popup
                                }}
                                className="block bg-gradient-to-r from-red-500 via-orange-500 to-blue-500 text-white py-4 rounded-xl font-bold text-center text-lg hover:from-red-600 hover:via-orange-600 hover:to-blue-600 transition-all duration-300 w-full"
                            >
                                Get Started
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
            {isPopupOpen && <BetaSignupPopup onClose={() => setIsPopupOpen(false)} />}
            {showThankYou && <Thankyou isOpen={showThankYou} onClose={handleCloseThankYou} />}
        </header>
    );
}

export default Header;
