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

function clsx(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export default function Footer({ onNewsletterSuccess }: FooterProps) {
  const [showThankyouPopup, setShowThankyouPopup] = useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);

  const handleCloseDownload = () => setShowDownloadPopup(false);

  const handleNewsletterSuccess = () => {
    onNewsletterSuccess?.();
    setShowThankyouPopup(true);
  };

  const handleCloseThankyou = () => setShowThankyouPopup(false);

  // ✅ Always scroll to top when navigating from footer links (desktop + mobile)
  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  };

  const footerBg =
    "radial-gradient(1100px 260px at 12% -10%, rgba(34,211,238,0.28), transparent 60%)," +
    "radial-gradient(900px 240px at 85% 5%, rgba(99,102,241,0.30), transparent 55%)," +
    "radial-gradient(800px 240px at 55% 120%, rgba(255,255,255,0.10), transparent 60%)," +
    "linear-gradient(180deg,#6a4ff7 0%,#5a3ee6 28%,#462ecf 58%,#2b1a8f 100%)";

  const socialBtn =
    "grid h-10 w-10 place-items-center overflow-hidden rounded-full border-2 border-white/90 bg-white/5 " +
    "shadow-[0_16px_34px_rgba(0,0,0,0.16)] backdrop-blur-md transition-transform " +
    "hover:-translate-y-1 hover:scale-[1.04] active:-translate-y-0.5";

  return (
    <footer
      className="relative overflow-hidden text-slate-50"
      style={{ background: footerBg as any }}
    >
      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-10
        [background-size:38px_38px,44px_44px,52px_52px]
        [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.55)_1px,transparent_1px),radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.45)_1px,transparent_1px),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.35)_1px,transparent_1px)]
        motion-safe:animate-[bbNoiseDrift_18s_linear_infinite]"
        aria-hidden="true"
      />

      {/* Glows */}
      <div
        className="pointer-events-none absolute -left-44 -top-56 h-[560px] w-[560px] rounded-full opacity-70 blur-[34px] mix-blend-screen
        motion-safe:animate-[bbGlowA_10s_ease-in-out_infinite_alternate]
        [background:radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.55),transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-56 -top-40 h-[560px] w-[560px] rounded-full opacity-70 blur-[34px] mix-blend-screen
        motion-safe:animate-[bbGlowB_12s_ease-in-out_infinite_alternate]
        [background:radial-gradient(circle_at_35%_35%,rgba(99,102,241,0.62),transparent_62%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[35%] -bottom-80 h-[560px] w-[560px] rounded-full opacity-60 blur-[34px] mix-blend-screen
        motion-safe:animate-[bbGlowC_14s_ease-in-out_infinite_alternate]
        [background:radial-gradient(circle_at_40%_40%,rgba(236,72,153,0.26),transparent_62%)]"
        aria-hidden="true"
      />

      {/* Main grid */}
      <div className="relative z-[1] mx-auto grid max-w-[1120px] grid-cols-1 gap-y-7 px-4 pb-5 pt-8 text-center sm:px-5 md:grid-cols-2 md:gap-x-6 md:gap-y-6 md:text-left lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.25fr)_minmax(0,0.9fr)] lg:gap-x-8">
        {/* BRAND */}
        <div className="flex min-w-0 flex-col items-center gap-3 md:items-start motion-safe:animate-[bbFooterRise_520ms_ease_both] motion-reduce:animate-none">
          <h4 className="text-[1.55rem] font-black leading-tight tracking-[0.2px]">
            Back&Bone
          </h4>

          <p className="max-w-[44ch] text-[1.02rem] leading-relaxed text-slate-50/95">
            A complete fitness ecosystem for every transformation journey.
          </p>
        </div>

        {/* NEWSLETTER */}
        <div className="flex min-w-0 flex-col items-center gap-3 md:items-start motion-safe:animate-[bbFooterRise_520ms_ease_both] motion-reduce:animate-none [animation-delay:120ms]">
          <h4 className="text-[1.22rem] font-black leading-tight tracking-[0.25px] [text-shadow:0_10px_26px_rgba(0,0,0,0.20)]">
            Newsletter
          </h4>
          <p className="max-w-[52ch] text-[1.02rem] leading-relaxed text-slate-50/95">
            Tips, updates and exclusive perks straight to your inbox.
          </p>

          <div
            className={[
              "mt-1 w-full max-w-[520px]",
              "rounded-[18px] border border-white/20 bg-white/10 p-3",
              "shadow-[0_18px_40px_rgba(0,0,0,0.14)]",
              "[&_form]:flex [&_form]:w-full [&_form]:flex-col [&_form]:items-stretch [&_form]:gap-2.5",
              "[&_input]:w-full [&_input]:min-h-[44px] [&_input]:rounded-xl [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-[0.98rem]",
              "[&_input]:bg-white/10 [&_input]:text-white [&_input]:border [&_input]:border-white/20",
              "[&_input]:outline-none focus:[&_input]:border-white/35",
              "[&_input]:placeholder:text-white/60",
              "[&_button]:w-full [&_button]:min-h-[44px] [&_button]:rounded-xl [&_button]:px-3 [&_button]:py-2.5 [&_button]:text-[0.98rem]",
              "sm:[&_input]:min-h-[46px] sm:[&_button]:min-h-[46px]",
            ].join(" ")}
          >
            <NewsletterForm onSuccess={handleNewsletterSuccess} hideHeading />
          </div>
        </div>

        {/* SUPPORT */}
        <div className="flex min-w-0 flex-col items-center gap-3 md:items-start motion-safe:animate-[bbFooterRise_520ms_ease_both] motion-reduce:animate-none [animation-delay:180ms]">
          <h4 className="text-[1.22rem] font-black leading-tight tracking-[0.25px] [text-shadow:0_10px_26px_rgba(0,0,0,0.20)]">
            Support
          </h4>

          <div className="mt-1 flex flex-col items-center gap-3 md:items-start">
            {[
              { to: "/support", label: "Help Center" },
              { to: "/career", label: "Careers" },
              { to: "/privacy-policy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Service" },
            ].map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={scrollToTop}
                className="group inline-flex items-center gap-2 text-[1.06rem] leading-snug text-slate-50/95 transition hover:translate-x-[3px]"
              >
                <span className="font-black opacity-85">›</span>
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-white/80 transition-transform duration-200 group-hover:scale-x-100" />
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* APP DOWNLOAD POPUP */}
      <AppDownloadPopup isOpen={showDownloadPopup} onClose={handleCloseDownload} />

      {/* THANKYOU POPUP */}
      <Thankyou isOpen={showThankyouPopup} onClose={handleCloseThankyou} />

      {/* Bottom bar */}
      <div
        className={clsx(
          "relative z-[1] mx-auto max-w-[1120px] border-t border-white/20 px-4 py-5 sm:px-5",
          "flex flex-col items-center justify-center gap-4",
          "md:flex-row md:justify-between"
        )}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* X */}
          <a
            href="https://x.com/BackAndBone_"
            target="_blank"
            rel="noreferrer"
            aria-label="Back&Bone on X"
            className={socialBtn}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/backandboneapp/"
            target="_blank"
            rel="noreferrer"
            aria-label="Back&Bone on Instagram"
            className={socialBtn}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
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
            aria-label="Back&Bone on LinkedIn"
            className={socialBtn}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C0 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* Threads */}
          <a
            href="https://www.threads.com/@backandboneapp"
            target="_blank"
            rel="noreferrer"
            aria-label="Back&Bone on Threads"
            className={socialBtn}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 192 192">
              <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C81.4451 44.6208 67.2824 51.1918 58.5616 63.0692L70.6866 71.7839C75.3368 64.2673 84.2143 61.4609 91.9915 61.4609H92.2379C100.173 61.5147 106.536 63.9507 110.438 68.8334C112.917 71.8665 114.447 75.9471 115.167 80.8013C108.605 79.6383 101.447 79.3908 93.9921 80.0887C72.4521 81.6195 58.2896 94.9366 59.2498 112.961C59.7837 122.137 64.1491 129.958 71.2209 135.341C77.0099 139.599 84.3673 141.769 92.239 141.169C103.319 140.656 111.883 136.414 117.614 128.096C121.869 122.003 124.254 114.234 125.247 105.064C130.386 108.415 134.143 112.772 136.175 117.87C140.181 126.842 140.485 143.293 127.867 155.908C117.419 166.349 104.307 171.014 84.3144 171.207C63.5346 171.019 48.9156 164.888 39.9717 153.129C31.7211 142.325 27.3051 126.313 27.0945 105.106C27.3051 83.8993 31.7211 67.8874 39.9717 57.0833C48.9156 45.324 63.5346 39.193 84.3144 39.0049C105.25 39.193 120.261 45.3546 129.685 57.1449C134.273 62.9462 137.696 70.0584 140.071 78.2178L151.563 75.6402C148.946 64.8434 144.555 55.4451 138.287 47.4519C126.005 32.9604 108.074 24.9658 84.4599 24.7477H84.2135C60.5446 24.9658 42.4583 33.0087 30.0208 47.576C18.9964 60.0783 13.0174 77.9814 12.6568 100.818V101.129C13.0174 123.966 18.9964 141.869 30.0208 154.371C42.4583 168.939 60.5446 176.982 84.2135 177.2H84.4599C110.671 177.047 129.716 169.763 143.509 154.722C161.014 136.22 159.979 113.925 153.321 96.8777C148.622 84.9444 138.708 75.6402 124.694 68.6579V68.6579ZM95.3352 125.053C86.0111 125.648 76.4006 121.026 75.8667 111.85C75_4308 105.128 80.5967 97.4768 96.5998 96.3731C98.4509 96.2489 100.248 96.1865 101.992 96.1865C107.846 96.1865 113.163 96.838 117.769 98.0628C116.198 119.879 107.061 124.124 95.3352 125.053Z" />
            </svg>
          </a>
        </div>

        <span className="w-full text-center text-[1.02rem] tracking-[0.12px] text-slate-50/90 [text-shadow:0_10px_24px_rgba(0,0,0,0.18)] md:w-auto md:text-right">
          © {new Date().getFullYear()} Back&Bone. All rights reserved.
        </span>
      </div>

      {/* tiny keyframes (minimal) */}
      <style>{`
        @keyframes bbNoiseDrift {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-60px,-40px,0); }
        }
        @keyframes bbGlowA {
          0% { transform: translate(0,0) scale(1); opacity:.65; }
          100% { transform: translate(20px,18px) scale(1.05); opacity:.85; }
        }
        @keyframes bbGlowB {
          0% { transform: translate(0,0) scale(1); opacity:.60; }
          100% { transform: translate(-18px,16px) scale(1.06); opacity:.82; }
        }
        @keyframes bbGlowC {
          0% { transform: translate(0,0) scale(1); opacity:.45; }
          100% { transform: translate(14px,-10px) scale(1.06); opacity:.62; }
        }
        @keyframes bbFooterRise {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </footer>
  );
}
