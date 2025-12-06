// src/components/Footer.tsx

import { useState } from "react";
import AppDownload from "./FooterAppDownload";
import NewsletterForm from "./NewsLetterForm";
import Thankyou from "./Thankyou";

function Footer() {
  const [showThankyouPopup, setShowThankyouPopup] = useState(false);

  const handleNewsletterSuccess = () => {
    // Called by NewsletterForm when user successfully submits (e.g. presses Enter)
    setShowThankyouPopup(true);
  };

  const handleCloseThankyouPopup = () => {
    setShowThankyouPopup(false);
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
          {/* Logo and Tagline */}
          <div>
            <h1 className="text-2xl font-extrabold tracking-wide mb-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Back&Bone
            </h1>
            <p className="text-sm italic text-gray-300 mb-2">
              Your Personal Coach, UPGRADED!
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              A complete fitness ecosystem for every transformation journey.
            </p>

            <div className="mt-4 flex gap-3">
              <button className="px-4 py-1.5 rounded-full bg-black/70 text-xs font-medium hover:bg-black/90 transition">
                App Store
              </button>
              <button className="px-4 py-1.5 rounded-full bg-black/70 text-xs font-medium hover:bg-black/90 transition">
                Google Play
              </button>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold mb-3 bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
              Newsletter
            </h3>
            <p className="text-xs text-gray-300 mb-3">
              Tips, updates &amp; exclusive perks straight to your inbox.
            </p>

            {/* This component should call onSuccess() when user submits (Enter / button) */}
            <NewsletterForm onSuccess={handleNewsletterSuccess} />
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold mb-3 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/support"
                  className="text-xs text-gray-300 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-xs text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-xs text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Spacer / you can add something else here later */}
          <div />
        </div>

        {/* App download banner / section */}
        <AppDownload />

        {/* Thank you popup (tips & updates) */}
        <Thankyou
          isOpen={showThankyouPopup}
          onClose={handleCloseThankyouPopup}
        />

        {/* Bottom Footer - Social + Copyright */}
        <div className="border-t border-gray-700/50 pt-6 mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Social Icons */}
            <div className="flex space-x-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/back-and-bone/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:bg-blue-600/20 transition"
              >
                <svg
                  fill="currentColor"
                  className="w-4 h-4 text-gray-300 hover:text-blue-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 
                    2.239 5 5 5h14c2.761 0 5-2.239 
                    5-5v-14c0-2.761-2.239-5-5-5zm-11 
                    19h-3v-10h3v10zm-1.5-11.268c-.966 
                    0-1.75-.79-1.75-1.764s.784-1.764 
                    1.75-1.764 1.75.79 1.75 
                    1.764-.784 1.764-1.75 1.764zm13.5 
                    11.268h-3v-5.604c0-3.368-4-3.113-4 
                    0v5.604h-3v-10h3v1.569c1.396-2.586 
                    7-2.777 7 2.476v5.955z" />
                </svg>
              </a>
              
              {/* Instagram */}
              <a
                href="https://www.instagram.com/backandboneapp/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:bg-pink-500/20 transition"
              >
                <svg
                  fill="currentColor"
                  className="w-4 h-4 text-gray-300 hover:text-pink-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 
                    1.17.056 1.97.24 2.428.403a4.92 4.92 0 
                    0 1 1.75 1.145 4.9 4.9 0 0 1 1.145 
                    1.75c.163.459.347 1.259.403 2.428.058 
                    1.266.07 1.646.07 4.85s-.012 3.584-.07 
                    4.85c-.056 1.17-.24 1.97-.403 
                    2.428a4.92 4.92 0 0 1-1.145 
                    1.75 4.9 4.9 0 0 1-1.75 
                    1.145c-.459.163-1.259.347-2.428.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.428-.403a4.92 
                    4.92 0 0 1-1.75-1.145 4.9 4.9 0 0 
                    1-1.145-1.75c-.163-.459-.347-1.259-.403-2.428C2.175 
                    15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.428a4.92 
                    4.92 0 0 1 1.145-1.75A4.9 4.9 0 0 
                    1 5.531 2.636c.459-.163 1.259-.347 
                    2.428-.403C9.225 2.175 9.605 2.163 
                    12 2.163zm0 3.675a6.162 6.162 0 1 
                    0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 2a4.162 4.162 0 1 
                    1 0 8.324 4.162 4.162 0 0 1 0-8.324zm6.406-.406a1.44 
                    1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                </svg>
              </a>
              <a
                href="https://www.threads.com/@backandboneapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:bg-blue-500/20 transition"
              >
                <svg
                  fill="currentColor"
                  className="w-4 h-4 text-gray-300 hover:text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .597 
                    0 1.326v21.348C0 23.403.597 24 
                    1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 
                    1.893-4.788 4.659-4.788 
                    1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 
                    0-1.796.715-1.796 1.764v2.313h3.587l-.467 
                    3.622h-3.12V24h6.116C23.403 24 24 
                    23.403 24 22.674V1.326C24 .597 23.403 
                    0 22.675 0z" />
                </svg>
              </a>
              <a
                href="https://x.com/BackAndBone_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:bg-blue-500/20 transition"
              >
                <svg
                  fill="currentColor"
                  className="w-4 h-4 text-gray-300 hover:text-blue-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .597 
                    0 1.326v21.348C0 23.403.597 24 
                    1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 
                    1.893-4.788 4.659-4.788 
                    1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 
                    0-1.796.715-1.796 1.764v2.313h3.587l-.467 
                    3.622h-3.12V24h6.116C23.403 24 24 
                    23.403 24 22.674V1.326C24 .597 23.403 
                    0 22.675 0z" />
                </svg>
              </a>

            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-xs text-center sm:text-right">
              © {new Date().getFullYear()} Back&Bone. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
