// src/components/NewsletterForm.tsx
import React, { useState } from "react";
import { apiClient } from "../lib/apiClient";

interface NewsletterFormProps {
  onSuccess: () => void;
  hideHeading?: boolean;
}

export default function NewsletterForm({
  onSuccess,
  hideHeading,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      alert("Please enter your email address.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await apiClient.post("/newsletter/subscribe", { email });

      if (error) {
        if (error.message.includes("duplicate key")) {
          alert("This email is already subscribed.");
        } else {
          alert(`Subscription failed: ${error.message}`);
        }
      } else {
        onSuccess();
        setEmail("");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Heading */}
      {!hideHeading && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
            Newsletter
          </h3>
          <p className="mt-2 text-xs leading-5 text-white/70">
            Stay updated with our latest news and offers.
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full" noValidate>
        <div className="flex w-full flex-col gap-3">
          <div className="group relative">
            {/* soft glow */}
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-fuchsia-500/25 via-violet-500/20 to-cyan-400/15 blur-lg opacity-0 transition group-focus-within:opacity-100" />

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={[
                "relative w-full",
                "h-11 rounded-xl px-3",
                "border border-white/15 bg-white/10",
                "text-sm text-white placeholder:text-white/55",
                "outline-none transition",
                "focus:border-white/30 focus:ring-2 focus:ring-white/20",
                "hover:border-white/25",
              ].join(" ")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={[
              "w-full h-11 rounded-xl",
              "bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500",
              "text-sm font-semibold text-white",
              "shadow-[0_14px_34px_rgba(124,58,237,0.35)]",
              "transition",
              "hover:brightness-110 active:scale-[0.99]",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              "focus:outline-none focus:ring-2 focus:ring-white/25",
            ].join(" ")}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>

          
        </div>
      </form>
    </div>
  );
}
