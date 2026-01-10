// src/Home/BetaSignupPopup.tsx
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { apiClient } from "../lib/apiClient";
import Thankyou from "../components/Thankyou";

interface BetaSignupPopupProps {
  onClose: () => void;
}

export default function BetaSignupPopup({
  onClose,
}: BetaSignupPopupProps): JSX.Element {
  const [phoneValue, setPhoneValue] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // Create/Reuse modal root for portal
  const portalEl = useMemo(() => {
    const id = "bb-modal-root";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
    }
    return el;
  }, []);

  // ✅ Hard lock background scroll (desktop + mobile)
  useEffect(() => {
    const scrollY = window.scrollY;

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0)
      document.body.style.paddingRight = `${scrollbarWidth}px`;

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

      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.paddingRight = originalPaddingRight;

      window.scrollTo(0, scrollY);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();

    if (!fullName || !email || !phoneValue) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await apiClient.post("/beta/signup", {
        fullName,
        email,
        phone: phoneValue,
      });
      if (error) throw new Error(error.message);
      setShowThankYou(true);
    } catch {
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const content = showThankYou ? (
    <Thankyou isOpen={showThankYou} onClose={onClose} />
  ) : (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
      style={{ overscrollBehavior: "contain" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchMove={(e) => e.preventDefault()} // extra safety for mobile
      onWheel={(e) => e.preventDefault()} // extra safety for desktop
    >
      {/* modal wrapper */}
      <div className="relative w-full max-w-lg">
        <div className="relative overflow-hidden rounded-3xl bg-[#0B071A] text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)] ring-1 ring-white/10">
          {/* glow */}
          <div className="pointer-events-none absolute -inset-10 -z-10 blur-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.25),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.25),transparent_55%)]" />

          {/* close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/5 text-2xl text-white/80 hover:bg-white/10"
            aria-label="Close"
            type="button"
          >
            ×
          </button>

          {/* content (scrolls if needed, scrollbar hidden) */}
          <div className="bb-hide-scrollbar max-h-[85vh] overflow-y-auto px-6 py-7 sm:px-8">
            {/* header */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h2 className="text-xl font-extrabold sm:text-2xl">
                Join Our Beta Program
              </h2>
              <p className="mt-1 text-sm text-white/70">
                Get early access to Back&Bone and help shape AI-powered
                fitness.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              {/* name */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Full Name <span className="text-fuchsia-300">*</span>
                </label>
                <input
                  name="fullName"
                  placeholder="Your Full Name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#120A2A] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-violet-400/30"
                />
              </div>

              {/* email */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Email Address <span className="text-fuchsia-300">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="your.name@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#120A2A] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-violet-400/30"
                />
              </div>

              {/* phone */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold">
                  Phone Number <span className="text-fuchsia-300">*</span>
                </label>

                <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#120A2A] px-3 py-2 focus-within:ring-2 focus-within:ring-violet-400/30">
                  <PhoneInput
                    defaultCountry="IN"
                    value={phoneValue}
                    onChange={setPhoneValue}
                    placeholder="Enter phone number"
                    className="PhoneInput flex w-full max-w-full items-center gap-2"
                    // ✅ only styles the visible select, NOT the dropdown options
                    countrySelectProps={{
                      className:
                        "bg-transparent text-white/90 outline-none focus:outline-none",
                    }}
                    numberInputProps={{
                      className:
                        "w-full max-w-full bg-transparent px-2 py-1.5 text-sm text-white placeholder:text-white/35 outline-none",
                    }}
                  />
                </div>
              </div>

              <p className="text-xs text-white/50">* Required fields</p>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 py-3 text-sm font-semibold shadow-lg disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Join Beta Program"}
              </button>
            </form>
          </div>

          {/* ✅ FIX: country names not visible
              The dropdown list is rendered by native <select><option>.
              Tailwind can't style <option> reliably, so we force readable colors here.
          */}
          <style>{`
            .bb-hide-scrollbar {
              scrollbar-width: none;
              -ms-overflow-style: none;
            }
            .bb-hide-scrollbar::-webkit-scrollbar {
              width: 0px;
              height: 0px;
            }

            /* PhoneInput base alignment */
            .PhoneInput {
              width: 100%;
            }

            /* Visible select in the input row */
            .PhoneInputCountrySelect {
              background: transparent !important;
              color: rgba(255,255,255,0.9) !important;
              border: none !important;
              outline: none !important;
            }

            /* ✅ Dropdown options (THIS fixes your issue) */
            .PhoneInputCountrySelect option {
              color: #111827 !important;       /* slate-900 */
              background: #ffffff !important;  /* white */
            }

            /* Arrow */
            .PhoneInputCountrySelectArrow {
              color: rgba(255,255,255,0.75) !important;
            }

            /* Input */
            .PhoneInputInput {
              color: #ffffff !important;
              background: transparent !important;
            }
            .PhoneInputInput::placeholder {
              color: rgba(255,255,255,0.35) !important;
            }
          `}</style>
        </div>
      </div>
    </div>
  );

  return createPortal(content, portalEl);
}
