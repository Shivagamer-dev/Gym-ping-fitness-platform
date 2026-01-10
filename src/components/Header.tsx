// src/components/Header.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const go = (to: string) => {
    if (location.pathname === to) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      setIsMenuOpen(false);
      return;
    }
    setIsMenuOpen(false);
    navigate(to);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  };

  const DesktopLink = ({ to, label }: { to: string; label: string }) => (
    <button
      type="button"
      onClick={() => go(to)}
      className={[
        "relative whitespace-nowrap text-white/90 hover:text-white transition",
        "text-base font-medium",
        isActive(to) ? "text-white" : "",
      ].join(" ")}
    >
      {label}
      <span
        className={[
          "pointer-events-none absolute left-0 -bottom-2 h-[2px] w-full rounded-full transition-opacity",
          isActive(to) ? "opacity-100 bg-white/80" : "opacity-0 bg-transparent",
        ].join(" ")}
      />
    </button>
  );

  const MobileLink = ({ to, label }: { to: string; label: string }) => (
    <button
      type="button"
      onClick={() => go(to)}
      className={[
        "w-full text-left rounded-xl px-4 py-3 text-base font-semibold transition",
        isActive(to)
          ? "bg-white/15 ring-1 ring-white/20 text-white"
          : "text-white/90 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      {label}
    </button>
  );

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#5d3be8] shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
            : "bg-[#6e4aff]",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-[92px] items-center justify-between gap-4">
            <button
              onClick={() => go("/")}
              className="select-none text-left font-extrabold leading-[0.7] text-white"
              aria-label="Back & Bone Home"
              type="button"
            >
              <span className="block text-xl sm:text-2xl">Back</span>
              <span className="block -mt-2 text-xl sm:text-2xl">&Bone</span>
            </button>

            <nav className="hidden min-w-0 items-center gap-16 text-base font-medium text-white lg:flex">
              <DesktopLink to="/" label="Home" />
              <DesktopLink to="/about" label="About us" />
              <DesktopLink to="/pricing" label="Pricing" />
              <DesktopLink to="/tutorial" label="Tutorial" />
            </nav>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="rounded-lg px-2 py-1 text-3xl text-white transition hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
              type="button"
            >
              ☰
            </button>
          </div>
        </div>

        {isPopupOpen && <BetaSignupPopup onClose={() => setIsPopupOpen(false)} />}
        {showThankYou && (
          <Thankyou isOpen={showThankYou} onClose={() => setShowThankYou(false)} />
        )}
      </header>

      <div
        className={`fixed inset-0 z-[60] transition lg:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-[86%] max-w-[360px] bg-[#4b2fd6] text-white shadow-2xl transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-start justify-between px-5 pt-5">
            <div className="select-none">
              <div className="font-extrabold leading-[0.85] text-white">
                <div className="text-2xl">Back</div>
                <div className="-mt-1 text-2xl">&Bone</div>
              </div>
              {/* <div className="mt-2 text-xs text-white/80">Navigate quickly</div> */}
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="rounded-lg px-3 py-2 text-white/90 transition hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          <div className="px-4 pt-5">
            <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
              <div className="flex flex-col gap-2">
                <MobileLink to="/" label="Home" />
                <MobileLink to="/about" label="About us" />
                <MobileLink to="/pricing" label="Pricing" />
                <MobileLink to="/tutorial" label="Tutorial" />
              </div>
            </div>

            <div className="mt-5 px-2 text-xs text-white/70">
              © {new Date().getFullYear()} Back&Bone
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
