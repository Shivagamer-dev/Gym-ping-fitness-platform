// src/App.tsx
import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

import "./index.css";
import newLogo from "./assets/images/newlogo.jpg";

import AppDownloadPopup from "./components/AppDownloadPopup";
import Thankyou from "./components/Thankyou";
import NewsletterForm from "./components/NewsLetterForm";

export default function App() {
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showNewsletterThankyou, setShowNewsletterThankyou] = useState(false);

  const openDownloadPopup = () => setShowDownloadPopup(true);
  const closeDownloadPopup = () => setShowDownloadPopup(false);

  const handleNewsletterSuccess = () => {
    setShowNewsletterThankyou(true);
  };

  const closeNewsletterThankyou = () => setShowNewsletterThankyou(false);

  // Outer circle style for all social icons
  const socialIconStyle = {
    width: 40,
    height: 40,
    borderRadius: "999px",
    border: "2px solid rgba(255,255,255,0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "transparent",
    cursor: "pointer",
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
  } as const;

  return (
    <div className="bb-app">
      {/* ---------- NAVBAR ---------- */}
      <header className="bb-nav">
        <div className="bb-nav-inner">
          <NavLink
            to="/"
            className="bb-logo-img-wrapper"
            aria-label="Back & Bone Home"
          >
            <img
              src={newLogo}
              alt="Back&Bone"
              className="bb-logo-img"
              style={{
                background: "transparent",
                boxShadow: "none",
                borderRadius: 0,
              }}
            />
          </NavLink>

          <nav className="bb-nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `bb-nav-link${isActive ? " bb-nav-link-active" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `bb-nav-link${isActive ? " bb-nav-link-active" : ""}`
              }
            >
              About us
            </NavLink>

            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `bb-nav-link${isActive ? " bb-nav-link-active" : ""}`
              }
            >
              Pricing
            </NavLink>

            <NavLink
              to="/tutorial"
              className={({ isActive }) =>
                `bb-nav-link${isActive ? " bb-nav-link-active" : ""}`
              }
            >
              Tutorial
            </NavLink>
          </nav>
        </div>
      </header>

      {/* ---------- PAGE CONTENT ---------- */}
      <main className="bb-main">
        <Outlet />
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer className="bb-footer">
        <div className="bb-footer-inner">
          {/* BRAND */}
          <div className="bb-footer-col bb-footer-brand">
            <h4>Back&amp; Bone</h4>
            <p>
              A complete fitness ecosystem <br />
              for every transformation journey.
            </p>

            <div className="bb-store-badges">
              <button className="bb-store-badge" onClick={openDownloadPopup}>
                App Store
              </button>
              <button className="bb-store-badge" onClick={openDownloadPopup}>
                Google Play
              </button>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="bb-footer-col bb-footer-newsletter">
            <h4>Newsletter</h4>
            <p>Tips, updates &amp; exclusive perks straight to your inbox.</p>

            {/* hideHeading removes the inner pink “Newsletter” heading in the form */}
            <NewsletterForm onSuccess={handleNewsletterSuccess} hideHeading />
          </div>

          {/* SUPPORT */}
          <div className="bb-footer-col bb-footer-support">
            <h4>Support</h4>
            <NavLink to="/support" className="bb-footer-link">
              Help Center
            </NavLink>
            <NavLink to="/career" className="bb-footer-link">
              Careers
            </NavLink>
            <NavLink to="/privacy-policy" className="bb-footer-link">
              Privacy Policy
            </NavLink>
            <NavLink to="/terms" className="bb-footer-link">
              Terms of Service
            </NavLink>
          </div>
        </div>

        {/* ---------- SOCIAL + COPYRIGHT ---------- */}
        <div className="bb-footer-bottom">
          <span className="bb-footer-copy">
            © {new Date().getFullYear()} Back&amp;Bone. All rights reserved.
          </span>

          <div className="bb-social-row">
            {/* X */}
            <a
              href="https://x.com/BackAndBone"
              target="_blank"
              rel="noreferrer"
              className="bb-social-icon"
              style={socialIconStyle}
              aria-label="Back&Bone on X"
            >
              <svg
                viewBox="0 0 24 24"
                style={{ width: 22, height: 22, display: "block" }}
                aria-hidden="true"
              >
                <path
                  d="M18.9 3h-3.2l-3.3 4.3L9.3 3H5.1l5.1 7L4.9 17h3.2l3.5-4.6 3.8 4.6h4.2l-5.8-7.8L18.9 3z"
                  fill="#ffffff"
                />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/backandboneapp/"
              target="_blank"
              rel="noreferrer"
              className="bb-social-icon"
              style={socialIconStyle}
              aria-label="Back&Bone on Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                style={{ width: 22, height: 22, display: "block" }}
                aria-hidden="true"
              >
                <rect
                  x="3.5"
                  y="3.5"
                  width="17"
                  height="17"
                  rx="5"
                  ry="5"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  fill="none"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.1"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  fill="none"
                />
                <circle cx="17" cy="7" r="1.4" fill="#ffffff" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/back-and-bone/"
              target="_blank"
              rel="noreferrer"
              className="bb-social-icon"
              style={socialIconStyle}
              aria-label="Back&Bone on LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                style={{ width: 22, height: 22, display: "block" }}
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2.5"
                  ry="2.5"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                />
                <rect x="6.1" y="10" width="2.3" height="7" fill="#ffffff" />
                <circle cx="7.25" cy="7.4" r="1.35" fill="#ffffff" />
                <path
                  d="M11 17v-4.1c0-1.4.85-2.3 2.26-2.3 1.36 0 2.17.9 2.17 2.3V17h-2.25v-3.8c0-.6-.3-1-.86-1-.56 0-.97.4-.97 1V17H11z"
                  fill="#ffffff"
                />
              </svg>
            </a>

            {/* Threads */}
            <a
              href="https://www.threads.com/@backandboneapp"
              target="_blank"
              rel="noreferrer"
              className="bb-social-icon"
              style={socialIconStyle}
              aria-label="Back&Bone on Threads"
            >
              <svg
                viewBox="0 0 24 24"
                style={{ width: 22, height: 22, display: "block" }}
                aria-hidden="true"
              >
                <path
                  d="M12 4.2c-4.5 0-7.8 2.9-7.8 7.6 0 4.9 3.6 8 8 8 3.4 0 5.9-1.9 6.6-4.9.2-.8.3-1.7.3-2.7 0-4.9-3.3-8-7.1-8h-.1zm3.2 8.2c-.3 1.8-1.6 3-3.4 3-1 0-1.8-.3-2.3-.9-.4-.4-.6-1-.6-1.6h2c0 .6.4 1 .9 1 .7 0 1.2-.5 1.4-1.5-.4-.3-.9-.5-1.6-.5-1.9 0-3.2-1.3-3.2-3.1 0-1.9 1.4-3.2 3.5-3.2 2.4 0 4 1.7 4.3 4.6.2.4.3.9.3 1.4 0 .5-.1.9-.3 1.7zm-2-3.4c-.1-1-.7-1.6-1.6-1.6-.9 0-1.4.6-1.4 1.4 0 .8.5 1.3 1.4 1.3.6 0 1.1-.2 1.6-.5z"
                  fill="#ffffff"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* ---------- THEME CSS ---------- */}
        <style>
          {`
            .bb-footer {
              background: linear-gradient(
                180deg,
                #6a4ff7 0%,
                #5a3ee6 30%,
                #462ecf 60%,
                #2b1a8f 100%
              );
              color: #f9fafb;
            }

            .bb-footer-inner {
              max-width: 1120px;
              margin: 0 auto;
              padding: 1.75rem 1.5rem 1.1rem;
              display: grid;
              grid-template-columns: minmax(0, 1.4fr) minmax(0, 1.5fr) minmax(0, 1fr);
              gap: 1.4rem 2rem; /* slightly tighter columns */
            }

            .bb-footer-link {
              display: block;
              margin-top: 0.25rem;
              font-size: 0.92rem;
              color: rgba(249,250,251,0.95);
            }

            .bb-footer-link:hover {
              text-decoration: underline;
            }

            .bb-footer-support .bb-footer-link {
              margin-top: 0.2rem;
              line-height: 1.3;
            }

            .bb-footer-support h4 {
              margin-bottom: 0.4rem;
            }

            .bb-footer-newsletter p {
              margin-bottom: 0.35rem;
            }

            .bb-footer-newsletter form {
              margin-top: 0.35rem;
            }

            .bb-footer-bottom {
              max-width: 1120px;
              margin: 0 auto;
              padding: 0.75rem 1.5rem 1rem;
              border-top: 1px solid rgba(255,255,255,0.18);
              display: flex;
              justify-content: space-between;
            }

            @media (max-width: 900px) {
              .bb-footer-inner {
                grid-template-columns: 1fr;
              }

              .bb-footer-bottom {
                flex-direction: column-reverse;
                align-items: flex-start;
              }
            }
          `}
        </style>
      </footer>

      {/* POPUPS */}
      {showDownloadPopup && (
        <AppDownloadPopup
          isOpen={showDownloadPopup}
          onClose={closeDownloadPopup}
        />
      )}

      {showNewsletterThankyou && (
        <Thankyou
          isOpen={showNewsletterThankyou}
          onClose={closeNewsletterThankyou}
        />
      )}
    </div>
  );
}
