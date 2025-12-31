// src/components/Footer.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import NewsletterForm from "./NewsLetterForm";
import Thankyou from "./Thankyou";
import AppDownloadPopup from "./AppDownloadPopup";

type FooterProps = {
  onOpenDownloadPopup?: () => void;
  onNewsletterSuccess?: () => void;
};

export default function Footer({
  // onOpenDownloadPopup,
  onNewsletterSuccess,
}: FooterProps) {
  const [showThankyouPopup, setShowThankyouPopup] = useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

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

  // const handleOpenDownload = () => {
  //   if (onOpenDownloadPopup) onOpenDownloadPopup();
  //   setShowDownloadPopup(true);
  // };

  const handleCloseDownload = () => setShowDownloadPopup(false);

  const handleNewsletterSuccess = () => {
    if (onNewsletterSuccess) onNewsletterSuccess();
    setShowThankyouPopup(true);
  };

  const handleCloseThankyou = () => setShowThankyouPopup(false);

  // ✅ Always scroll to top when navigating from footer links (desktop + mobile)
  const scrollToTop = () => {
    // setTimeout ensures navigation happens first, then scroll resets
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      // fallback for some mobile browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  };

  return (
    <footer className="bb-footer">
      {/* energetic background layers */}
      <div className="bb-footer-noise" aria-hidden="true" />
      <div className="bb-footer-glow bb-footer-glow--a" aria-hidden="true" />
      <div className="bb-footer-glow bb-footer-glow--b" aria-hidden="true" />
      <div className="bb-footer-glow bb-footer-glow--c" aria-hidden="true" />

      <div className="bb-footer-inner">
        {/* BRAND */}
        <div className="bb-footer-col bb-footer-brand">
          <h4 className="bb-footer-heading bb-footer-heading--brand">
            Back&Bone
          </h4>
          <p className="bb-footer-text">
            A complete fitness ecosystem <br />
            for every transformation journey.
          </p>

          {/* <div className="bb-store-badges">
            <button
              className="bb-store-badge"
              onClick={handleOpenDownload}
              type="button"
            >
              App Store
            </button>
            <button
              className="bb-store-badge"
              onClick={handleOpenDownload}
              type="button"
            >
              Google Play
            </button>
          </div> */}
        </div>

        {/* NEWSLETTER */}
        <div className="bb-footer-col bb-footer-newsletter">
          <h4 className="bb-footer-heading">Newsletter</h4>
          <p className="bb-footer-text">
            Tips, updates and exclusive perks straight to your inbox.
          </p>

          <div className="bb-newsletter-wrap">
            <NewsletterForm onSuccess={handleNewsletterSuccess} hideHeading />
          </div>
        </div>

        {/* SUPPORT */}
        <div className="bb-footer-col bb-footer-support">
          <h4 className="bb-footer-heading">Support</h4>

          <div className="bb-footer-links">
            <NavLink to="/support" className="bb-footer-link" onClick={scrollToTop}>
              Help Center
            </NavLink>
            <NavLink to="/career" className="bb-footer-link" onClick={scrollToTop}>
              Careers
            </NavLink>
            <NavLink
              to="/privacy-policy"
              className="bb-footer-link"
              onClick={scrollToTop}
            >
              Privacy Policy
            </NavLink>
            <NavLink to="/terms" className="bb-footer-link" onClick={scrollToTop}>
              Terms of Service
            </NavLink>
          </div>
        </div>
      </div>

      {/* APP DOWNLOAD POPUP */}
      <AppDownloadPopup
        isOpen={showDownloadPopup}
        onClose={handleCloseDownload}
      />

      {/* THANKYOU POPUP */}
      <Thankyou isOpen={showThankyouPopup} onClose={handleCloseThankyou} />

      {/* SOCIAL + COPYRIGHT */}
      <div className="bb-footer-bottom">
        <div className="bb-social-row">
          {/* X */}
          <a
            href="https://x.com/BackAndBone_"
            target="_blank"
            rel="noreferrer"
            className="bb-social-icon"
            style={socialIconStyle}
            aria-label="Back&Bone on X"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <g>
                <path d="M12 2.163c3.309 0 3.688 0 4.975.072 1.144.072 1.959.285 2.473.598a4.895 4.895 0 0 1 1.77 1.77c.313.514.526 1.329.598 2.473.072 1.287.072 1.666.072 4.975s0 3.688-.072 4.975c-.072 1.144-.285 1.959-.598 2.473a4.895 4.895 0 0 1-1.77 1.77c-.514.313-1.329.526-2.473.598-1.287.072-1.666.072-4.975.072s-3.688 0-4.975-.072c-1.144-.072-1.959-.285-2.473-.598a4.895 4.895 0 0 1-1.77-1.77c-.313-.514-.526-1.329-.598-2.473-.072-1.287-.072-1.666-.072-4.975s0-3.688.072-4.975c.072-1.144.285-1.959.598-2.473a4.895 4.895 0 0 1 1.77-1.77c.514-.313 1.329-.526 2.473-.598 1.287-.072 1.666-.072 4.975-.072zM12 0c-3.46 0-3.889 0-5.236.074-1.428.074-2.571.334-3.585.924a6.42 6.42 0 0 0-2.42 2.42c-.59 1.014-.85 2.157-.924 3.585-.074 1.347-.074 1.776-.074 5.236 0 3.46 0 3.889.074 5.236.074 1.428.334 2.571.924 3.585a6.42 6.42 0 0 0 2.42 2.42c1.014.59 2.157.85 3.585.924 1.347.074 1.776.074 5.236.074s3.889 0 5.236-.074c1.428-.074 2.571-.334 3.585-.924a6.42 6.42 0 0 0 2.42-2.42c.59-1.014.85-2.157.924-3.585.074-1.347.074-1.776.074-5.236 0-3.46 0-3.889-.074-5.236-.074-1.428-.334-2.571-.924-3.585a6.42 6.42 0 0 0-2.42-2.42c-1.014-.59-2.157-.85-3.585-.924C15.889 0 15.46 0 12 0z" />
                <path d="M12 5.838c-3.437 0-6.202 2.765-6.202 6.201 0 3.436 2.765 6.201 6.202 6.201 3.436 0 6.201-2.765 6.201-6.201 0-3.436-2.765-6.201-6.201-6.201zm0 10.328c-2.259 0-4.127-1.868-4.127-4.127 0-2.259 1.868-4.127 4.127-4.127 2.259 0 4.127 1.868 4.127 4.127 0 2.259-1.868 4.127-4.127 4.127z" />
                <circle cx="17.5" cy="6.5" r="1.5" />
              </g>
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
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 192 192">
              <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C81.4451 44.6208 67.2824 51.1918 58.5616 63.0692L70.6866 71.7839C75.3368 64.2673 84.2143 61.4609 91.9915 61.4609H92.2379C100.173 61.5147 106.536 63.9507 110.438 68.8334C112.917 71.8665 114.447 75.9471 115.167 80.8013C108.605 79.6383 101.447 79.3908 93.9921 80.0887C72.4521 81.6195 58.2896 94.9366 59.2498 112.961C59.7837 122.137 64.1491 129.958 71.2209 135.341C77.0099 139.599 84.3673 141.769 92.239 141.169C103.319 140.656 111.883 136.414 117.614 128.096C121.869 122.003 124.254 114.234 125.247 105.064C130.386 108.415 134.143 112.772 136.175 117.87C140.181 126.842 140.485 143.293 127.867 155.908C117.419 166.349 104.307 171.014 84.3144 171.207C63.5346 171.019 48.9156 164.888 39.9717 153.129C31.7211 142.325 27.3051 126.313 27.0945 105.106C27.3051 83.8993 31.7211 67.8874 39.9717 57.0833C48.9156 45.324 63.5346 39.193 84.3144 39.0049C105.25 39.193 120.261 45.3546 129.685 57.1449C134.273 62.9462 137.696 70.0584 140.071 78.2178L151.563 75.6402C148.946 64.8434 144.555 55.4451 138.287 47.4519C126.005 32.9604 108.074 24.9658 84.4599 24.7477H84.2135C60.5446 24.9658 42.4583 33.0087 30.0208 47.576C18.9964 60.0783 13.0174 77.9814 12.6568 100.818V101.129C13.0174 123.966 18.9964 141.869 30.0208 154.371C42.4583 168.939 60.5446 176.982 84.2135 177.2H84.4599C110.671 177.047 129.716 169.763 143.509 154.722C161.014 136.22 159.979 113.925 153.321 96.8777C148.622 84.9444 138.708 75.6402 124.694 68.6579V68.6579ZM95.3352 125.053C86.0111 125.648 76.4006 121.026 75.8667 111.85C75.4308 105.128 80.5967 97.4768 96.5998 96.3731C98.4509 96.2489 100.248 96.1865 101.992 96.1865C107.846 96.1865 113.163 96.838 117.769 98.0628C116.198 119.879 107.061 124.124 95.3352 125.053Z" />
            </svg>
          </a>
        </div>

        <span className="bb-footer-copy">
          © {new Date().getFullYear()} Back&Bone. All rights reserved.
        </span>
      </div>

      <style>
        {`
          .bb-footer{
            position: relative;
            overflow: hidden;
            color:#f9fafb;
            background:
              radial-gradient(1100px 260px at 12% -10%, rgba(34,211,238,0.28), transparent 60%),
              radial-gradient(900px 240px at 85% 5%, rgba(99,102,241,0.30), transparent 55%),
              radial-gradient(800px 240px at 55% 120%, rgba(255,255,255,0.10), transparent 60%),
              linear-gradient(180deg,#6a4ff7 0%,#5a3ee6 28%,#462ecf 58%,#2b1a8f 100%);
              ;
          }

          /* light texture so it feels more alive */
          .bb-footer-noise{
            position:absolute;
            inset:0;
            opacity:.12;
            pointer-events:none;
            background-image:
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55) 1px, transparent 1px),
              radial-gradient(circle at 70% 40%, rgba(255,255,255,0.45) 1px, transparent 1px),
              radial-gradient(circle at 40% 80%, rgba(255,255,255,0.35) 1px, transparent 1px);
            background-size: 38px 38px, 44px 44px, 52px 52px;
            mix-blend-mode: overlay;
            animation: bbNoiseDrift 18s linear infinite;
          }
          @keyframes bbNoiseDrift{
            0% { transform: translate3d(0,0,0); }
            100% { transform: translate3d(-60px, -40px, 0); }
          }

          /* multiple moving glows */
          .bb-footer-glow{
            position:absolute;
            width: 560px;
            height: 560px;
            border-radius: 999px;
            filter: blur(34px);
            opacity: .75;
            pointer-events:none;
            mix-blend-mode: screen;
          }

          .bb-footer-glow--a{
            left: -180px;
            top: -220px;
            background: radial-gradient(circle at 30% 30%, rgba(34,211,238,0.55), transparent 60%);
            animation: bbGlowA 10s ease-in-out infinite alternate;
          }

          .bb-footer-glow--b{
            right: -220px;
            top: -160px;
            background: radial-gradient(circle at 35% 35%, rgba(99,102,241,0.62), transparent 62%);
            animation: bbGlowB 12s ease-in-out infinite alternate;
          }

          .bb-footer-glow--c{
            left: 35%;
            bottom: -320px;
            background: radial-gradient(circle at 40% 40%, rgba(236,72,153,0.26), transparent 62%);
            animation: bbGlowC 14s ease-in-out infinite alternate;
          }

          @keyframes bbGlowA{
            0% { transform: translate(0,0) scale(1); opacity:.65; }
            100% { transform: translate(20px, 18px) scale(1.05); opacity:.85; }
          }
          @keyframes bbGlowB{
            0% { transform: translate(0,0) scale(1); opacity:.60; }
            100% { transform: translate(-18px, 16px) scale(1.06); opacity:.82; }
          }
          @keyframes bbGlowC{
            0% { transform: translate(0,0) scale(1); opacity:.45; }
            100% { transform: translate(14px, -10px) scale(1.06); opacity:.62; }
          }

          /* prevent default h4 margins from adding extra space */
          .bb-footer h4{
            margin: 0;
            font-size: 1.7em;
          }

          .bb-footer-inner{
            position: relative;
            z-index: 1;
            max-width:1120px;
            margin:0 auto;
            padding: 2.1rem 1.25rem 1.2rem;
            display:grid;
            grid-template-columns: minmax(0,1.15fr) minmax(0,1.45fr) minmax(0,0.9fr);
            gap: 1.35rem 2.2rem;
            align-items:start;
          }

          .bb-footer-col{
            min-width: 0;
            display:flex;
            flex-direction:column;
            gap: 10px;
            animation: bbFooterRise 520ms ease both;
          }

          /* stagger columns a bit for energy */
          .bb-footer-brand{ animation-delay: 60ms; }
          .bb-footer-newsletter{ animation-delay: 120ms; }
          .bb-footer-support{ animation-delay: 180ms; }

          @keyframes bbFooterRise{
            from{ opacity: 0; transform: translateY(10px); }
            to{ opacity: 1; transform: translateY(0); }
          }

          .bb-footer-heading{
            margin:0;
            font-weight:900;
            letter-spacing:.25px;
            font-size: 1.22rem;
            line-height: 1.15;
            text-shadow: 0 10px 26px rgba(0,0,0,0.20);
          }

          /* brand heading with gradient pop */
          .bb-footer-heading--brand{
            background: linear-gradient(
              90deg,
              #ffffff 0%,
              #22d3ee 100%,
             
              #301934 50%
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;

            /* energetic glow */
            text-shadow:
              0 0 12px rgba(34,211,238,0.45),
              0 0 28px rgba(99,102,241,0.35);

            filter: none;
          }


          .bb-footer-text{
            margin:0;
            color: rgba(249,250,251,0.94);
            line-height:1.65;
            font-size: 1.05rem;
            max-width: 48ch;
          }

          /* Newsletter input alignment helper (doesn't touch your form markup) */
          .bb-newsletter-wrap{
            margin-top: 6px;
            max-width: 520px;
            padding: 10px;
            border-radius: 18px;
            background: rgba(255,255,255,0.09);
            border: 1px solid rgba(255,255,255,0.16);
            box-shadow: 0 18px 40px rgba(0,0,0,0.14);
            transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
          }
          .bb-newsletter-wrap:hover{
            transform: translateY(-2px);
            background: rgba(255,255,255,0.11);
            border-color: rgba(255,255,255,0.22);
          }

          .bb-footer-links{
            display:flex;
            flex-direction:column;
            gap: 12px;
            margin-top: 4px;
          }

          .bb-footer-link{
            display:inline-flex;
            align-items:center;
            gap: 8px;
            width: fit-content;
            color: rgba(249,250,251,0.96);
            font-size: 1.06rem;
            line-height: 1.4;
            text-decoration: none;
            position: relative;
            transition: transform 160ms ease, opacity 160ms ease;
          }

          /* tiny arrow for energy */
          .bb-footer-link::before{
            content:"›";
            font-weight:900;
            opacity:.85;
            transform: translateY(-1px);
          }

          /* animated underline */
          .bb-footer-link::after{
            content:"";
            position:absolute;
            left:0;
            bottom:-5px;
            width:100%;
            height:2px;
            border-radius:999px;
            background: rgba(255,255,255,0.78);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 180ms ease;
            opacity: .95;
          }

          .bb-footer-link:hover{
            transform: translateX(3px);
            opacity: 1;
          }
          .bb-footer-link:hover::after{
            transform: scaleX(1);
          }

          .bb-footer-bottom{
            position: relative;
            z-index: 1;
            max-width:1120px;
            margin:0 auto;
            padding: 1.05rem 1.25rem 1.35rem;
            border-top: 1px solid rgba(255,255,255,0.18);
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap: 14px;
            flex-wrap:wrap;
          }

          .bb-social-row{
            display:flex;
            gap: 12px;
            align-items:center;
            flex-wrap:wrap;
          }

          /* make icons feel more premium while keeping your inline style */
          .bb-social-icon{
            border-radius: 999px;
            backdrop-filter: blur(8px);
            background: rgba(255,255,255,0.06) !important;
            box-shadow: 0 16px 34px rgba(0,0,0,0.16);
            will-change: transform;
          }
          .bb-social-icon:hover{
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 22px 44px rgba(0,0,0,0.22);
            border-color: rgba(255,255,255,1) !important;
          }
          .bb-social-icon:active{
            transform: translateY(-1px) scale(1.02);
          }

          .bb-footer-copy{
            color: rgba(249,250,251,0.92);
            font-size: 1.02rem;
            white-space: nowrap;
            letter-spacing: .12px;
            text-shadow: 0 10px 24px rgba(0,0,0,0.18);
          }

          @media (max-width: 980px){
            .bb-footer-inner{
              grid-template-columns: 1fr 1fr;
              gap: 1.1rem 1.6rem;
            }
            .bb-footer-support{
              grid-column: 1 / -1;
            }
            .bb-footer-text{
              max-width: 100%;
            }
          }

          @media (max-width: 640px){
            .bb-footer-inner{
              grid-template-columns: 1fr;
              padding: 1.5rem 1.1rem 1.05rem;
              gap: 1rem;
            }

            /* ✅ increase ONLY the marked headings on mobile */
            .bb-footer-brand .bb-footer-heading,
            .bb-footer-newsletter .bb-footer-heading,
            .bb-footer-support .bb-footer-heading{
              font-size: 1.35rem;
              margin-bottom: .15rem;
              letter-spacing: .25px;
            }

            .bb-footer-text{
              font-size: 1.02rem;
              line-height: 1.65;
            }

            .bb-footer-support .bb-footer-links{
              margin-top: 2px;
              gap: 10px;
            }

            .bb-newsletter-wrap{
              max-width: 100%;
              padding: 10px;
            }

            .bb-footer-bottom{
              flex-direction: column;
              align-items: center;
              text-align: center;
              padding: .95rem 1.1rem 1.15rem;
              gap: 12px;
            }

            .bb-footer-copy{
              white-space: normal;
            }
          }

          /* accessibility: reduce motion */
          @media (prefers-reduced-motion: reduce){
            .bb-footer-noise,
            .bb-footer-glow--a,
            .bb-footer-glow--b,
            .bb-footer-glow--c{
              animation: none;
            }
            .bb-footer-link,
            .bb-footer-link::after,
            .bb-social-icon,
            .bb-newsletter-wrap{
              transition: none;
            }
          }
        `}
      </style>
    </footer>
  );
}
