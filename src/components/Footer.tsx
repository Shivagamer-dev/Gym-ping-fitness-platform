import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                {/* Logo and Site Name */}
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <h1 className="text-3xl font-extrabold tracking-wide text-gradient">
                        Gym-Ping
                    </h1>
                    <p className="text-sm italic text-gray-400">Find! Fit! Thrive!</p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex space-x-6 text-gray-300">
                        <a href="/" className="hover:text-white transition">Home</a>
                        <a href="/about" className="hover:text-white transition">About Us</a>
                        <a href="/support" className="hover:text-white transition">Support</a>
                        <a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a>
                    </div>
                    <div className="flex space-x-6 mt-4 text-gray-300">
                        <a href="/spotter" className="hover:text-white transition">Spotter</a>
                        <a href="/locator" className="hover:text-white transition">Locator</a>
                        <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-6 mt-6 md:mt-0">
                    <a
                        href="https://facebook.com"
                        aria-label="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 transition transform hover:scale-110"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                        href="https://twitter.com"
                        aria-label="Twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition transform hover:scale-110"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a
                        href="https://instagram.com"
                        aria-label="Instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-500 transition transform hover:scale-110"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a
                        href="https://linkedin.com"
                        aria-label="LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-700 transition transform hover:scale-110"
                    >
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 mt-6"></div>

            {/* Copyright */}
            <div className="text-center mt-6 text-gray-500 text-sm">
                © {new Date().getFullYear()} Gym-Ping. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
