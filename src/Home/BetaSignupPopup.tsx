// src/Home/BetaSignupPopup.tsx
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../phone-input.css";
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

  // Lock body scroll while popup is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleCloseBetaSignup = () => {
    setShowThankYou(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();

    // Basic validation
    if (!fullName || !email || !phoneValue) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
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
    } catch (err) {
      console.error("Supabase insert error:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (showThankYou) {
    return (
      <Thankyou isOpen={showThankYou} onClose={handleCloseBetaSignup} />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-950/95 text-white shadow-2xl">
        {/* Soft gradient border glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-pink-500/30 via-purple-600/25 to-blue-500/30 blur-2xl" />

        {/* Close button */}
        <button
          type="button"
          className="absolute right-4 top-4 text-3xl font-bold leading-none text-slate-300 transition-colors hover:text-pink-400"
          onClick={onClose}
          aria-label="Close beta signup"
        >
          &times;
        </button>

        <div className="px-7 pb-7 pt-6 sm:px-8 sm:pb-8 sm:pt-7">
          {/* Header block */}
          <div className="mb-6 rounded-2xl border border-slate-700/70 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/90 px-4 py-4">
            <h2 className="text-xl font-semibold text-pink-300 sm:text-2xl">
              Join Our Beta Program
            </h2>
            <p className="mt-1 text-sm text-slate-300/80">
              Get early access to Back&amp;Bone, help us improve the experience,
              and shape the future of AI-powered fitness.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-1 block text-sm font-medium text-slate-200"
              >
                Full Name <span className="text-pink-400">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Your Full Name"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-3 text-sm text-white outline-none transition ring-0 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/60"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-200"
              >
                Email Address <span className="text-pink-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your.name@example.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-3 text-sm text-white outline-none transition ring-0 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/60"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-200">
                Phone Number <span className="text-pink-400">*</span>
              </label>
              <div className="w-full rounded-lg border border-slate-700 bg-slate-900/80 transition focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-500/60">
                <PhoneInput
                  placeholder="Enter phone number"
                  value={phoneValue}
                  onChange={setPhoneValue}
                  defaultCountry="IN"
                  className="phone-input-custom-inner"
                  numberInputProps={{
                    className:
                      "w-full bg-transparent px-3 py-3 text-sm text-white outline-none",
                  }}
                />
              </div>
            </div>

            <div className="mt-1 text-xs text-slate-400">
              * Required fields
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(236,72,153,0.55)] transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Join Beta Program"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
