// src/components/ApplyPopup.tsx
import React, { useEffect, useState } from "react";
import { apiClient } from "../lib/apiClient";
import Thankyou from "./Thankyou";
import ErrorPopup from "./ErrorPopup";
import { handleError, StructuredError } from "../lib/errorHandler";

interface ApplyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  jobRole?: string;
}

const ApplyPopup: React.FC<ApplyPopupProps> = ({
  isOpen,
  onClose,
  jobTitle,
  jobRole,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StructuredError | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const [links, setLinks] = useState<{ type: string; url: string }[]>([]);
  const [showAddLinkSection, setShowAddLinkSection] = useState(false);
  const [newLinkType, setNewLinkType] = useState("GitHub");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  // ✅ Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setCoverLetter("");
    setResumeLink("");
    setLinks([]);
    setShowAddLinkSection(false);
    setNewLinkType("GitHub");
    setNewLinkUrl("");
  };

  const handleClose = () => {
    resetForm();
    setShowThankYou(false);
    onClose();
  };

  const handleAddLink = () => {
    if (newLinkUrl && urlRegex.test(newLinkUrl)) {
      setLinks([...links, { type: newLinkType, url: newLinkUrl }]);
      setNewLinkUrl("");
    } else {
      alert("Please enter a valid URL for the new link.");
    }
  };

  const handleRemoveLink = (indexToRemove: number) => {
    setLinks(links.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!fullName || !email || !phone || !coverLetter) {
      setError({
        type: "ValidationError",
        message: "Please fill in all required fields.",
      });
      setLoading(false);
      return;
    }

    if (!resumeLink) {
      setError({
        type: "ValidationError",
        message: "Please provide your resume link.",
      });
      setLoading(false);
      return;
    }

    if (!urlRegex.test(resumeLink)) {
      setError({
        type: "ValidationError",
        message: "Please enter a valid URL for your resume link.",
      });
      setLoading(false);
      return;
    }

    for (const link of links) {
      if (!urlRegex.test(link.url)) {
        setError({
          type: "ValidationError",
          message: `Please enter a valid URL for the ${link.type} link.`,
        });
        setLoading(false);
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError({
        type: "ValidationError",
        message: "Please enter a valid email address.",
      });
      setLoading(false);
      return;
    }

    try {
      const { error } = await apiClient.post("/careers/apply", {
        jobTitle,
        jobRole,
        fullName,
        email,
        phone,
        coverLetter,
        resumeLink,
        links,
      });

      if (error) throw new Error(error.message);
      setShowThankYou(true);
    } catch (err) {
      const handledError = await handleError(err);
      setError(handledError);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseErrorPopup = () => setError(null);

  // ✅ Slightly more solid inputs (no see-through)
  const inputBase =
    "w-full rounded-2xl border border-white/10 bg-[#0F0B1F] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/25";
  const labelBase =
    "block text-sm font-medium text-white/85 mb-1 flex items-center gap-1";

  return (
    <>
      {showThankYou ? (
        <Thankyou isOpen={showThankYou} onClose={handleClose} />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden">
          {/* ✅ Overlay: stronger + blur so nothing behind is readable */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Panel wrapper */}
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl">
            {/* ✅ Fully opaque modal panel (prevents background text bleed) */}
            <div className="relative rounded-3xl bg-[#080615] text-white shadow-[0_30px_90px_rgba(0,0,0,0.55)] border border-white/10 overflow-hidden">
              {/* glow sits behind, not affecting opacity */}
              <div className="pointer-events-none absolute -inset-10 -z-10 blur-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.20),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.22),transparent_55%)]" />

              {/* Close icon */}
              <button
                className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white text-2xl leading-none"
                onClick={handleClose}
                aria-label="Close"
                type="button"
              >
                &times;
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 px-6 py-4 sm:px-8 sm:py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
                  Apply for this position
                </p>

                <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="text-sm text-white/85">Applying for:</p>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                      {jobTitle || "Open role at Back&Bone"}
                    </h2>
                  </div>

                  {jobRole && (
                    <p className="text-sm font-medium text-white/85 sm:text-right">
                      {jobRole}
                    </p>
                  )}
                </div>
              </div>

              {/* Form body */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="
                  max-h-[72vh]
                  overflow-y-auto
                  overflow-x-hidden
                  overscroll-contain
                  px-6 py-5
                  sm:px-8 sm:py-6
                  space-y-4
                "
              >
                {/* Full Name */}
                <div>
                  <label className={labelBase}>
                    Full Name <span className="text-fuchsia-300">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputBase}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={labelBase}>
                    Email Address <span className="text-fuchsia-300">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputBase}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={labelBase}>
                    Phone Number <span className="text-fuchsia-300">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputBase}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Cover Letter */}
                <div>
                  <label className={labelBase}>
                    Cover Letter <span className="text-fuchsia-300">*</span>
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={4}
                    className={`${inputBase} min-h-[120px] resize-y`}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    required
                  />
                  <p className="text-xs text-white/55 mt-1">
                    A concise, focused note is perfect – it doesn&apos;t need to be a full essay.
                  </p>
                </div>

                {/* Resume Link */}
                <div>
                  <label className={labelBase}>
                    Resume Link <span className="text-fuchsia-300">*</span>
                  </label>
                  <input
                    type="url"
                    value={resumeLink}
                    onChange={(e) => setResumeLink(e.target.value)}
                    className={inputBase}
                    placeholder="Paste your resume / Drive / portfolio link"
                    required
                  />
                  <p className="text-xs text-white/55 mt-1">
                    Use a public link (Google Drive, Notion, portfolio URL, etc.).
                  </p>
                </div>

                <p className="text-[11px] text-white/55">* Required fields</p>

                {/* Add Links toggle */}
                <button
                  type="button"
                  onClick={() => setShowAddLinkSection((v) => !v)}
                  className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:brightness-110 transition"
                >
                  {showAddLinkSection
                    ? "Hide extra links"
                    : "Add Portfolio / GitHub / LinkedIn"}
                </button>

                {/* Extra Links */}
                {showAddLinkSection && (
                  <div className="space-y-3 border-t border-white/10 pt-3">
                    <h4 className="text-sm font-semibold text-white/90">
                      Additional links (optional)
                    </h4>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <select
                        value={newLinkType}
                        onChange={(e) => setNewLinkType(e.target.value)}
                        className="w-full sm:w-1/3 rounded-2xl border border-white/10 bg-[#0F0B1F] px-3 py-2 text-sm text-white outline-none focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/25"
                      >
                        <option value="GitHub">GitHub</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Portfolio">Portfolio</option>
                        <option value="Figma">Figma</option>
                        <option value="Canva">Canva</option>
                        <option value="Other">Other</option>
                      </select>

                      <input
                        type="url"
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        placeholder="Enter link URL"
                        className="w-full sm:flex-1 rounded-2xl border border-white/10 bg-[#0F0B1F] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/25"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="inline-flex items-center rounded-2xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-500/30 hover:brightness-110 transition"
                    >
                      Add Link
                    </button>
                  </div>
                )}

                {/* Added Links */}
                {links.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-white/90">
                      Added Links
                    </h4>
                    {links.map((link, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2 text-sm border border-white/10"
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-200 hover:underline break-all"
                        >
                          {link.type}: {link.url}
                        </a>
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(idx)}
                          className="ml-3 text-fuchsia-300 hover:text-fuchsia-200 text-lg leading-none"
                          aria-label="Remove link"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 px-4 py-3 text-sm sm:text-base font-semibold text-white shadow-xl shadow-violet-500/30 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed transition"
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {error && (
        <ErrorPopup
          isOpen={!!error}
          onClose={handleCloseErrorPopup}
          errorType={error.type}
          message={error.message}
        />
      )}
    </>
  );
};

export default ApplyPopup;
