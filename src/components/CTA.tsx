// src/components/CTA.tsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppDownloadPopup from "./AppDownloadPopup";

export default function CTA(): JSX.Element {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return false;

    // If you have a fixed navbar, adjust offset here
    const headerOffset = 84; // change if your navbar height differs
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
    return true;
  };

  const waitAndScroll = (id: string) => {
    const start = Date.now();
    const timeoutMs = 2000;

    const tick = () => {
      if (scrollToId(id)) return;
      if (Date.now() - start > timeoutMs) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const handleExploreFeatures = () => {
    const targetId = "features";

    // If already on Home, just scroll
    if (location.pathname === "/") {
      // update hash (nice for sharing / refresh)
      if (window.location.hash !== `#${targetId}`) {
        window.history.replaceState(null, "", `#${targetId}`);
      }
      waitAndScroll(targetId);
      return;
    }

    // If on any other page: go Home + hash, then scroll after route mounts
    navigate(`/#${targetId}`);
    // run after navigation (CTA unmounting won't cancel requestAnimationFrame)
    setTimeout(() => waitAndScroll(targetId), 50);
  };

  return (
    <section className="relative py-12 sm:py-14">
      {/* soft site-matching background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(139,92,246,0.12),transparent_55%),radial-gradient(circle_at_85%_90%,rgba(236,72,153,0.10),transparent_55%)]" />

      <div className="mx-auto max-w-6xl px-5">
        {/* Card */}
        <div className="relative overflow-hidden rounded-[28px] border border-violet-200/60 bg-white/75 px-6 py-10 text-center shadow-[0_22px_70px_rgba(15,23,42,0.10)] backdrop-blur-md sm:px-10 sm:py-12">
          {/* inner glow */}
          <div className="pointer-events-none absolute -inset-10 opacity-70 bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.16),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.12),transparent_55%)]" />

          <div className="relative z-10">
            <h2 className="mx-auto text-[clamp(1.7rem,4.2vw,2.6rem)] font-black leading-[1.12] text-slate-900">
              Ready to Transform Your Fitness Journey?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[1.02rem] leading-7 text-slate-600">
              Join thousands of users who are already experiencing the future of fitness. Download
              the app or jump back to the features.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <button
                onClick={() => setIsPopupOpen(true)}
                className="group w-full max-w-[30em] rounded-full bg-violet-600 px-9 py-3.5 text-base font-bold text-white shadow-[0_18px_40px_rgba(79,70,229,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-[0_24px_55px_rgba(79,70,229,0.34)] active:translate-y-0 sm:w-auto"
              >
                <span className="inline-flex items-center gap-1">
                  Download the Back&amp;Bone App
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </button>

              <button
                onClick={handleExploreFeatures}
                className="w-full max-w-[280px] rounded-full border border-slate-200 bg-white px-9 py-3.5 text-base font-bold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.10)] transition duration-200 hover:-translate-y-0.5 hover:bg-slate-50 active:translate-y-0 sm:w-auto"
              >
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </div>

      <AppDownloadPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
}
