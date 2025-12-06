// src/components/Header.tsx
import { useEffect, useState } from "react";


import { Link, useNavigate } from "react-router-dom";
// import NewsletterForm from "./NewsLetterForm";
import Thankyou from "./Thankyou";
import BetaSignupPopup from "../Home/BetaSignupPopup";

// 👉 Use LOCAL LOGO (your Back&Bone image)
import Logo from "../assets/logo.png";

export default function Header() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => navigate("/");

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#5d3be8] shadow-lg"
          : "bg-[#6944ff]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* -------------------- LOGO -------------------- */}
          <button
            onClick={handleLogoClick}
            className="flex items-center select-none"
            aria-label="Back & Bone Home"
          >
            <img
              src={Logo}
              alt="Back & Bone Logo"
              className="h-12 w-auto object-contain"
              draggable={false}
            />
          </button>
          {/* ------------------------------------------------ */}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 text-white font-semibold">
            <Link to="/">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/tutorial">Tutorial</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white text-3xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 space-y-3 bg-[#5738d3] text-white p-4 rounded-xl">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About us</Link>
            <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <Link to="/tutorial" onClick={() => setIsMenuOpen(false)}>Tutorial</Link>
          </nav>
        )}
      </div>

      {/* Popups */}
      {isPopupOpen && <BetaSignupPopup onClose={() => setIsPopupOpen(false)} />}
      {showThankYou && (
        <Thankyou isOpen={showThankYou} onClose={() => setShowThankYou(false)} />
      )}
    </header>
  );
}
