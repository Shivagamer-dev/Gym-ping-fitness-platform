import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Thankyou from "./Thankyou";
import ErrorPopup from "./ErrorPopup";
import { handleError, StructuredError } from "../lib/errorHandler";

interface ApplyPopupProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle?: string;
    jobRole?: string;
}

const ApplyPopup: React.FC<ApplyPopupProps> = ({ isOpen, onClose, jobTitle, jobRole }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [resumeLink, setResumeLink] = useState(""); // Changed from File to string for resume link
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<StructuredError | null>(null); // State for error popup
    const [showThankYou, setShowThankYou] = useState(false); // New state for Thankyou popup
    const [links, setLinks] = useState<{ type: string; url: string }[]>([]); // State for additional links
    const [showAddLinkSection, setShowAddLinkSection] = useState(false); // State to toggle add link section
    const [newLinkType, setNewLinkType] = useState("GitHub"); // Default link type
    const [newLinkUrl, setNewLinkUrl] = useState(""); // New link URL input

    // Regex for URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!isOpen) return null;

    const resetForm = () => {
        setFullName("");
        setEmail("");
        setPhone("");
        setCoverLetter("");
        setResumeLink(""); // Reset resume link
        setLinks([]); // Reset links
        setShowAddLinkSection(false); // Hide add link section
        setNewLinkType("GitHub"); // Reset new link type
        setNewLinkUrl(""); // Reset new link URL
    };

    const handleClose = () => {
        resetForm();
        setShowThankYou(false); // Reset Thankyou popup state
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
            setError({ type: "ValidationError", message: "Please fill in all required fields." });
            setLoading(false);
            return;
        }

        if (!resumeLink) {
            setError({ type: "ValidationError", message: "Please provide your resume link." });
            setLoading(false);
            return;
        }

        // URL validation for resume link
        if (!urlRegex.test(resumeLink)) {
            setError({ type: "ValidationError", message: "Please enter a valid URL for your resume link." });
            setLoading(false);
            return;
        }

        // Validate additional links
        for (const link of links) {
            if (!urlRegex.test(link.url)) {
                setError({ type: "ValidationError", message: `Please enter a valid URL for the ${link.type} link.` });
                setLoading(false);
                return;
            }
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError({ type: "ValidationError", message: "Please enter a valid email address." });
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase
                .from('career_applications')
                .insert([{
                    job_title: jobTitle,
                    job_role: jobRole,
                    full_name: fullName,
                    email: email,
                    phone: phone,
                    cover_letter: coverLetter,
                    resume_link: resumeLink, // Send resume link directly
                    links: links // Send additional links
                }]);

            if (error) throw error;

            setShowThankYou(true); // Show Thankyou popup on success
        } catch (error) {
            const handledError = await handleError(error);
            setError(handledError);
        } finally {
            setLoading(false);
        }
    };


    const handleCloseErrorPopup = () => setError(null);

    return (
        <>
            {showThankYou ? (
                <Thankyou isOpen={showThankYou} onClose={handleClose} />
            ) : (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-lg p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto text-white relative shadow-lg">
                        {/* Close button */}
                        <button
                            className="absolute top-2 right-2 text-white text-3xl font-bold leading-none hover:text-pink-400 transition-colors"
                            onClick={handleClose}
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-bold mb-2">Apply for this position</h2>

                        {(jobTitle || jobRole) && (
                            <div className="mb-6 p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/30 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                    </svg>
                                    <p className="text-blue-300 text-sm font-medium">Applying for:</p>
                                </div>
                                <div className="flex gap-4">
                                    {jobTitle && (
                                        <p className="text-white font-bold text-lg">{jobTitle}</p>
                                    )}
                                    -
                                    {jobRole && (
                                        <p className="text-blue-300 font-medium">{jobRole}</p>
                                    )}
                                </div>
                            </div>
                        )}


                        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Cover Letter *
                                </label>
                                <textarea
                                    value={coverLetter}
                                    onChange={(e) => setCoverLetter(e.target.value)}
                                    required
                                    rows={4}
                                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Resume Link *
                                </label>
                                <input
                                    type="url"
                                    value={resumeLink}
                                    onChange={(e) => setResumeLink(e.target.value)}
                                    required
                                    className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your resume link"
                                />
                            </div>

                            <div className="text-xs text-gray-400 mt-2">* Required fields</div>

                            {/* Add Links Button */}
                            <button
                                type="button"
                                onClick={() => setShowAddLinkSection(!showAddLinkSection)}
                                className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                            >
                                {showAddLinkSection ? "Hide Links" : "Add Links"}
                            </button>

                            {/* Add Link Section */}
                            {showAddLinkSection && (
                                <div className="border border-gray-700 rounded-lg p-4 mb-4">
                                    <h4 className="text-md font-semibold mb-2 text-white">Add Additional Links</h4>
                                    <div className="flex flex-col sm:flex-row gap-2 mb-3">
                                        <select
                                            value={newLinkType}
                                            onChange={(e) => setNewLinkType(e.target.value)}
                                            className="w-full sm:w-1/3 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                            className="w-full sm:w-2/3 p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAddLink}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                                    >
                                        Add Link
                                    </button>
                                </div>
                            )}

                            {/* Display Added Links */}
                            {links.length > 0 && (
                                <div className="mb-3">
                                    <h4 className="text-lg font-semibold mb-2 text-white">Added Links:</h4>
                                    {links.map((link, index) => (
                                        <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-3 mb-2">
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                                {link.type}: {link.url}
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveLink(index)}
                                                className="text-red-400 hover:text-red-500 ml-4"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded transition-all duration-300 mt-2 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Application"}
                            </button>
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
