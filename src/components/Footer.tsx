import AppDownload from "./FooterAppDownload";
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
                            <li><a href="/tutorial" className="text-xs text-gray-300 hover:text-white transition-colors">Tutorial</a></li>
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
                            {/* <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center hover:bg-blue-600/20 transition-all">
                                <svg className="w-4 h-4 text-gray-400 hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a> */}
                            <a href="https://x.com/BackAndBone_" aria-label="X" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center hover:bg-gray-600/20 transition-all">
                                <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
                            <a href="https://www.linkedin.com/company/back-and-bone/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center hover:bg-blue-700/20 transition-all">
                                <svg className="w-4 h-4 text-gray-400 hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href="https://www.threads.com/@backandboneapp" aria-label="Threads" target="_blank" rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-800/50 border border-gray-700/50 rounded-lg flex items-center justify-center hover:bg-blue-600/20 transition-all">
                                <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 192 192">
                                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C81.4451 44.6208 67.2824 51.1918 58.5616 63.0692L70.6866 71.7839C75.3368 64.2673 84.2143 61.4609 91.9915 61.4609H92.2379C100.173 61.5147 106.536 63.9507 110.438 68.8334C112.917 71.8665 114.447 75.9471 115.167 80.8013C108.605 79.6383 101.447 79.3908 93.9921 80.0887C72.4521 81.6195 58.2896 94.9366 59.2498 112.961C59.7837 122.137 64.1491 129.958 71.2209 135.341C77.0099 139.599 84.3673 141.769 92.239 141.169C103.319 140.656 111.883 136.414 117.614 128.096C121.869 122.003 124.254 114.234 125.247 105.064C130.386 108.415 134.143 112.772 136.175 117.87C140.181 126.842 140.485 143.293 127.867 155.908C117.419 166.349 104.307 171.014 84.3144 171.207C63.5346 171.019 48.9156 164.888 39.9717 153.129C31.7211 142.325 27.3051 126.313 27.0945 105.106C27.3051 83.8993 31.7211 67.8874 39.9717 57.0833C48.9156 45.324 63.5346 39.193 84.3144 39.0049C105.25 39.193 120.261 45.3546 129.685 57.1449C134.273 62.9462 137.696 70.0584 140.071 78.2178L151.563 75.6402C148.946 64.8434 144.555 55.4451 138.287 47.4519C126.005 32.9604 108.074 24.9658 84.4599 24.7477H84.2135C60.5446 24.9658 42.4583 33.0087 30.0208 47.576C18.9964 60.0783 13.0174 77.9814 12.6568 100.818V101.129C13.0174 123.966 18.9964 141.869 30.0208 154.371C42.4583 168.939 60.5446 176.982 84.2135 177.2H84.4599C110.671 177.047 129.716 169.763 143.509 154.722C161.014 136.22 159.979 113.925 153.321 96.8777C148.622 84.9444 138.708 75.6402 124.694 68.6579V68.6579ZM95.3352 125.053C86.0111 125.648 76.4006 121.026 75.8667 111.85C75.4308 105.128 80.5967 97.4768 96.5998 96.3731C98.4509 96.2489 100.248 96.1865 101.992 96.1865C107.846 96.1865 113.163 96.838 117.769 98.0628C116.198 119.879 107.061 124.124 95.3352 125.053Z" />
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
