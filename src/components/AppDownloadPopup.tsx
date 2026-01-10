import { useEffect } from "react";
import { createPortal } from "react-dom";

type AppDownloadPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AppDownloadPopup({
  isOpen,
  onClose,
}: AppDownloadPopupProps): JSX.Element | null {
  // ✅ Lock body scroll + keep scroll position (prevents page jump)
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    // Freeze the page in place
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);

      // Restore body styles
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
      aria-modal="true"
      role="dialog"
      onMouseDown={(e) => {
        // close if clicked outside the modal
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[720px]">
        {/* Modal Card */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#0B071A] text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
          {/* Glow */}
          <div className="pointer-events-none absolute -inset-10 -z-10 blur-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.25),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.25),transparent_55%)]" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/5 text-2xl text-white/80 hover:bg-white/10"
            aria-label="Close"
          >
            ×
          </button>

          <div className="px-6 py-7 sm:px-10 sm:py-10">
            {/* Header */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <p className="text-[0.72rem] font-extrabold tracking-[0.22em] text-white/60">
                BACK&BONE • GET STARTED
              </p>
              <h2 className="mt-2 text-[clamp(1.6rem,3.3vw,2.4rem)] font-black leading-tight">
                Thank you for your interest!
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70">
                We’re polishing the Back&Bone app experience right now. You’ll receive an email
                with the download link as soon as the mobile apps go live.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={onClose}
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(79,70,229,0.35)] transition hover:-translate-y-[1px] hover:brightness-[1.05] active:translate-y-0"
              >
                Close
              </button>

              <button
                onClick={() => {
                  onClose();
                  // Scroll to features after close
                  requestAnimationFrame(() => {
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                }}
                className="w-full sm:w-auto rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white/90 shadow-[0_14px_36px_rgba(0,0,0,0.18)] backdrop-blur-md transition hover:bg-white/10"
              >
                Explore Features
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-white/50">
              If you have questions, reach us at{" "}
              <a className="font-semibold text-cyan-300 hover:underline" href="mailto:support@backandbone.com">
                support@backandbone.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
