import AppDownload from "./AppDownload";
import { useState } from "react";
import NewsletterForm from "./NewsLetterForm";
import Thankyou from "./Thankyou";

function Footer() {
    const [showThankyouPopup, setShowThankyouPopup] = useState(false);

    const handleNewsletterSuccess = () => {
        setShowThankyouPopup(true);
    };

    const handleCloseThankyouPopup = () => {
        setShowThankyouPopup(false);
    };
    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

            <div className="relative max-w-6xl mx-auto px-6 py-8">
                {/* Main Footer Content */}
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
                    {/* Logo and Tagline - Condensed */}
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-wide mb-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Back&Bone
                        </h1>
                        <p className="text-sm italic text-gray-300 mb-2">Your Personal Coach, UPGRADED!</p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            A complete fitness ecosystem for every transformation journey.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-xs text-gray-300 hover:text-white transition-colors">Home</a></li>
                            <li><a href="/about" className="text-xs text-gray-300 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="/features" className="text-xs text-gray-300 hover:text-white transition-colors">Features</a></li>
                            <li><a href="/pricing" className="text-xs text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold mb-3 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="/support" className="text-xs text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="/privacy-policy" className="text-xs text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="/terms" className="text-xs text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* News Letter Sign In - Compact */}
                    <NewsletterForm onSuccess={handleNewsletterSuccess} />

                </div>

                <AppDownload />
                <Thankyou isOpen={showThankyouPopup} onClose={handleCloseThankyouPopup} />
                {/* Bottom Footer - Social Media and Copyright */}
                <div className="border-t border-gray-700/50 pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        {/* Social Media - Compact */}
                        <div className="flex space-x-3">
                            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center hover:bg-blue-600/20 transition-all">
                                <svg className="w-4 h-4 text-gray-400 hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center hover:bg-blue-400/20 transition-all">
                                <svg className="w-4 h-4 text-gray-400 hover:text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/backandboneapp/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center hover:bg-pink-500/20 transition-all">
                                <svg className="w-4 h-4 text-gray-400 hover:text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                                    <g>
                                        <path d="M12 2.163c3.309 0 3.688 0 4.975.072 1.144.072 1.959.285 2.473.598a4.895 4.895 0 0 1 1.77 1.77c.313.514.526 1.329.598 2.473.072 1.287.072 1.666.072 4.975s0 3.688-.072 4.975c-.072 1.144-.285 1.959-.598 2.473a4.895 4.895 0 0 1-1.77 1.77c-.514.313-1.329.526-2.473.598-1.287.072-1.666.072-4.975.072s-3.688 0-4.975-.072c-1.144-.072-1.959-.285-2.473-.598a4.895 4.895 0 0 1-1.77-1.77c-.313-.514-.526-1.329-.598-2.473-.072-1.287-.072-1.666-.072-4.975s0-3.688.072-4.975c.072-1.144.285-1.959.598-2.473a4.895 4.895 0 0 1 1.77-1.77c.514-.313 1.329-.526 2.473-.598 1.287-.072 1.666-.072 4.975-.072zM12 0c-3.46 0-3.889 0-5.236.074-1.428.074-2.571.334-3.585.924a6.42 6.42 0 0 0-2.42 2.42c-.59 1.014-.85 2.157-.924 3.585-.074 1.347-.074 1.776-.074 5.236 0 3.46 0 3.889.074 5.236.074 1.428.334 2.571.924 3.585a6.42 6.42 0 0 0 2.42 2.42c1.014.59 2.157.85 3.585.924 1.347.074 1.776.074 5.236.074s3.889 0 5.236-.074c1.428-.074 2.571-.334 3.585-.924a6.42 6.42 0 0 0 2.42-2.42c.59-1.014.85-2.157.924-3.585.074-1.347.074-1.776.074-5.236 0-3.46 0-3.889-.074-5.236-.074-1.428-.334-2.571-.924-3.585a6.42 6.42 0 0 0-2.42-2.42c-1.014-.59-2.157-.85-3.585-.924C15.889 0 15.46 0 12 0z" />
                                        <path d="M12 5.838c-3.437 0-6.202 2.765-6.202 6.201 0 3.436 2.765 6.201 6.202 6.201 3.436 0 6.201-2.765 6.201-6.201 0-3.436-2.765-6.201-6.201-6.201zm0 10.328c-2.259 0-4.127-1.868-4.127-4.127 0-2.259 1.868-4.127 4.127-4.127 2.259 0 4.127 1.868 4.127 4.127 0 2.259-1.868 4.127-4.127 4.127z" />
                                        <circle cx="17.5" cy="6.5" r="1.5" />
                                    </g>
                                </svg>
                            </a>
                            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center hover:bg-blue-700/20 transition-all">
                                <svg className="w-4 h-4 text-gray-400 hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>

                        {/* Copyright - Compact */}
                        <div className="text-gray-400 text-xs text-center sm:text-right">
                            <span>© {new Date().getFullYear()} Back&Bone. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
