// src/components/Header.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Thankyou from "./Thankyou";
import BetaSignupPopup from "../Home/BetaSignupPopup";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when switching to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const DesktopLink = ({ to, label }: { to: string; label: string }) => (
    <Link
      to={to}
      className={`transition hover:opacity-85 whitespace-nowrap ${
        isActive(to) ? "opacity-100" : "opacity-95"
      }`}
    >
      {label}
    </Link>
  );

  const MobileLink = ({ to, label }: { to: string; label: string }) => (
    <Link
      to={to}
      className={`w-full rounded-xl px-4 py-3 text-base font-semibold transition
        ${
          isActive(to)
            ? "bg-white/15 ring-1 ring-white/20"
            : "hover:bg-white/10"
        }`}
    >
      {label}
    </Link>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#5d3be8] shadow-lg" : "bg-[#6e4aff]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* TEXT LOGO */}
            <button
              onClick={() => navigate("/")}
              className="text-white font-extrabold text-left select-none leading-[0.7] shrink-0"
              aria-label="Back & Bone Home"
              type="button"
            >
              <span className="block text-xl sm:text-2xl">Back</span>
              <span className="block text-xl sm:text-2xl -mt-2">&amp;Bone</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-16 text-white font-medium text-base min-w-0">
              <DesktopLink to="/" label="Home" />
              <DesktopLink to="/about" label="About us" />
              <DesktopLink to="/pricing" label="Pricing" />
              <DesktopLink to="/tutorial" label="Tutorial" />
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden text-white text-3xl shrink-0 rounded-lg px-2 py-1 hover:bg-white/10 transition"
              aria-label="Open menu"
              type="button"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Popups (unchanged logic) */}
        {isPopupOpen && (
          <BetaSignupPopup onClose={() => setIsPopupOpen(false)} />
        )}
        {showThankYou && (
          <Thankyou
            isOpen={showThankYou}
            onClose={() => setShowThankYou(false)}
          />
        )}
      </header>

      {/* MOBILE DRAWER + OVERLAY */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Overlay */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <aside
          className={`absolute right-0 top-0 h-full w-[86%] max-w-[360px]
          bg-[#4b2fd6] text-white shadow-2xl
          transition-transform duration-300 ease-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          role="dialog"
          aria-modal="true"
        >
          {/* Drawer header */}
          <div className="flex items-start justify-between px-5 pt-5">
            <div className="select-none">
              <div className="text-white font-extrabold leading-[0.85]">
                <div className="text-2xl">Back</div>
                <div className="text-2xl -mt-1">&amp;Bone</div>
              </div>
              <div className="mt-2 text-white/80 text-xs">
                Navigate quickly
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="rounded-lg px-3 py-2 text-white/90 hover:bg-white/10 transition"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <div className="px-4 pt-5">
            <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
              <div className="flex flex-col gap-2">
                <MobileLink to="/" label="Home" />
                <MobileLink to="/about" label="About us" />
                <MobileLink to="/pricing" label="Pricing" />
                <MobileLink to="/tutorial" label="Tutorial" />
              </div>
            </div>

            {/* Small footer line inside drawer */}
            <div className="mt-5 px-2 text-xs text-white/70">
              © {new Date().getFullYear()} Back&amp;Bone
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
