
import React, { useState, useEffect } from "react"; // Import useEffect
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../phone-input.css";
import { apiClient } from "../lib/apiClient";
import Thankyou from "../components/Thankyou"; // Import Thankyou component

interface BetaSignupPopupProps {
    onClose: () => void;
}

export default function BetaSignupPopup({ onClose }: BetaSignupPopupProps) {
    const [phoneValue, setPhoneValue] = useState<string | undefined>("");
    const [loading, setLoading] = useState(false);
    const [showThankYou, setShowThankYou] = useState(false); // New state for Thankyou popup

    // Effect to prevent body scrolling when popup is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleCloseBetaSignup = () => {
        setShowThankYou(false);
        onClose(); // Close the BetaSignupPopup itself
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const fullName = formData.get("fullName")?.toString().trim();
        const email = formData.get("email")?.toString().trim();

        // Basic validation
        if (!fullName || !email || !phoneValue) {
            alert("Please fill in all required fields");
            setLoading(false);
            return;
        }

        // Email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            setLoading(false);
            return;
        }

        // Save to Supabase
        try {
            const { error } = await apiClient.post("/beta/signup", {
                fullName,
                email,
                phone: phoneValue,
            });

            if (error) throw new Error(error.message);

            setShowThankYou(true); // Show Thankyou popup on success
        } catch (err) {
            console.error("Supabase insert error:", err);
            alert("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {showThankYou ? (
                <Thankyou isOpen={showThankYou} onClose={handleCloseBetaSignup} />
            ) : (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center min-h-screen">
                    <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full relative shadow-lg max-h-[90vh] overflow-y-auto">
                        {/* Close button */}
                        <button
                            className="absolute top-2 right-2 text-white text-3xl font-bold leading-none hover:text-pink-400 transition-colors"
                            onClick={onClose}
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-white">Join Our Beta Program</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                            Full Name *
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Your Full Name"
                            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email Address *
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.name@example.com"
                            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Phone Number *
                        </label>
                        <div className="w-full rounded bg-gray-800 border border-gray-700 focus-within:ring-2 focus-within:ring-pink-500">
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={phoneValue}
                                onChange={setPhoneValue}
                                defaultCountry="IN"
                                className="phone-input-custom-inner"
                                numberInputProps={{
                                    className: "w-full p-3 bg-transparent text-white focus:outline-none",
                                }}
                            />
                        </div>
                    </div>

                    <div className="text-xs text-gray-400 mt-2">* Required fields</div>

                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded transition-colors duration-300 mt-2 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Join Beta Program"}
                    </button>
                </form>
                    </div>
                </div>
            )}
        </>
    );
}
