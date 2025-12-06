// src/components/ApplyPopup.tsx
import React, { useState } from "react";
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
  const [resumeLink, setResumeLink] = useState(""); // resume URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StructuredError | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const [links, setLinks] = useState<{ type: string; url: string }[]>([]);
  const [showAddLinkSection, setShowAddLinkSection] = useState(false);
  const [newLinkType, setNewLinkType] = useState("GitHub");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  // URL validation
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

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

    // Basic validation
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

    // URL validation for resume link
    if (!urlRegex.test(resumeLink)) {
      setError({
        type: "ValidationError",
        message: "Please enter a valid URL for your resume link.",
      });
      setLoading(false);
      return;
    }

    // Validate additional links
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

    // Email validation
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

  const inputBase =
    "w-full rounded-2xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/60 transition";
  const labelBase =
    "block text-sm font-medium text-slate-200 mb-1 flex items-center gap-1";

  return (
    <>
      {showThankYou ? (
        <Thankyou isOpen={showThankYou} onClose={handleClose} />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 sm:px-4">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-950/95 text-slate-50 shadow-2xl border border-violet-500/40 overflow-hidden">
            {/* Close icon */}
            <button
              className="absolute top-4 right-4 text-slate-300 hover:text-white text-2xl leading-none"
              onClick={handleClose}
              aria-label="Close"
            >
              &times;
            </button>

            {/* Header gradient */}
            <div className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 px-6 py-4 sm:px-8 sm:py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-100/90">
                Apply for this position
              </p>

              <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <p className="text-sm text-violet-50/90">Applying for:</p>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    {jobTitle || "Open role at Back&Bone"}
                  </h2>
                </div>
                {jobRole && (
                  <p className="text-sm font-medium text-violet-100/90 sm:text-right">
                    {jobRole}
                  </p>
                )}
              </div>
            </div>

            {/* Form body */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="max-h-[72vh] overflow-y-auto px-6 py-5 sm:px-8 sm:py-6 space-y-4"
            >
              {/* Full Name */}
              <div>
                <label className={labelBase}>
                  Full Name <span className="text-pink-400">*</span>
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
                  Email Address <span className="text-pink-400">*</span>
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
                  Phone Number <span className="text-pink-400">*</span>
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
                  Cover Letter <span className="text-pink-400">*</span>
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={4}
                  className={`${inputBase} min-h-[120px] resize-y`}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  required
                />
                <p className="text-xs text-slate-400 mt-1">
                  A concise, focused note is perfect – it doesn&apos;t need to be
                  a full essay.
                </p>
              </div>

              {/* Resume Link */}
              <div>
                <label className={labelBase}>
                  Resume Link <span className="text-pink-400">*</span>
                </label>
                <input
                  type="url"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  className={inputBase}
                  placeholder="Paste your resume / Drive / portfolio link"
                  required
                />
                <p className="text-xs text-slate-400 mt-1">
                  Use a public link (Google Drive, Notion, portfolio URL, etc.).
                </p>
              </div>

              {/* Required note */}
              <p className="text-[11px] text-slate-400 mt-1">
                * Required fields
              </p>

              {/* Add Links toggle button */}
              <button
                type="button"
                onClick={() => setShowAddLinkSection((v) => !v)}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 hover:from-blue-400 hover:to-indigo-400 transition"
              >
                {showAddLinkSection ? "Hide extra links" : "Add Portfolio / GitHub / LinkedIn"}
              </button>

              {/* Extra Links Section */}
              {showAddLinkSection && (
                <div className="mt-3 space-y-3 border-t border-slate-800/80 pt-3">
                  <h4 className="text-sm font-semibold text-slate-100">
                    Additional links (optional)
                  </h4>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={newLinkType}
                      onChange={(e) => setNewLinkType(e.target.value)}
                      className="w-full sm:w-1/3 rounded-2xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/60"
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
                      className="w-full sm:flex-1 rounded-2xl border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-50 placeholder:text-slate-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/60"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="inline-flex items-center rounded-2xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-500/40 hover:bg-emerald-400 transition"
                  >
                    Add Link
                  </button>
                </div>
              )}

              {/* Show Added Links */}
              {links.length > 0 && (
                <div className="mt-3 space-y-2">
                  <h4 className="text-sm font-semibold text-slate-100">
                    Added Links
                  </h4>
                  {links.map((link, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-2xl bg-slate-900/80 px-3 py-2 text-sm"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline break-all"
                      >
                        {link.type}: {link.url}
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(idx)}
                        className="ml-3 text-pink-400 hover:text-pink-300 text-lg leading-none"
                        aria-label="Remove link"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 px-4 py-3 text-sm sm:text-base font-semibold text-white shadow-xl shadow-violet-500/40 hover:from-indigo-400 hover:via-violet-400 hover:to-pink-400 disabled:opacity-70 disabled:cursor-not-allowed transition"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
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
