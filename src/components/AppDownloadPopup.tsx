// src/components/AppDownloadPopup.tsx
import React from "react";

interface AppDownloadPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppDownloadPopup: React.FC<AppDownloadPopupProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#05051a] via-[#050320] to-[#090320] shadow-[0_30px_100px_rgba(15,23,42,0.7)]">
        {/* Soft glow accent behind card content */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-purple-500/25 blur-3xl" />
          <div className="absolute -bottom-40 -right-16 h-64 w-64 rounded-full bg-pink-500/25 blur-3xl" />
        </div>

        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-xl text-slate-200 transition-colors hover:bg-white/15 hover:text-white"
          aria-label="Close"
        >
          ×
        </button>

        {/* Content */}
        <div className="relative z-10 px-8 pb-8 pt-9 sm:px-10 sm:pb-10 sm:pt-11 text-center">
          {/* Badge / icon */}
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-[0_16px_40px_rgba(79,70,229,0.55)]">
            <span className="text-lg font-semibold text-white">✓</span>
          </div>

          {/* Title */}
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              Thank you for your interest!
            </span>
          </h2>

          {/* Body text */}
          <p className="mx-auto mb-7 max-w-md text-sm leading-relaxed text-slate-200/85 sm:text-base">
            We’re polishing the Back&Bone app experience right now.
            You&apos;ll receive an email with the download link as soon as the
            mobile apps go live.
          </p>

          {/* CTA button */}
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-violet-500 px-8 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(56,189,248,0.45)] transition-transform duration-150 hover:translate-y-0.5 active:translate-y-1"
          >
            Close
          </button>

          {/* Tiny helper text */}
          <p className="mt-4 text-xs text-slate-400/80">
            If you have any questions in the meantime, reach us at{" "}
            <a
              href="mailto:support@backandbone.com"
              className="font-medium text-sky-300 hover:text-sky-200"
            >
              support@backandbone.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppDownloadPopup;
