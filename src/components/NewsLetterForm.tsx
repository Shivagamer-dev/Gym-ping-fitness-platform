import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface NewsletterFormProps {
    onSuccess: () => void;
}

function NewsletterForm({ onSuccess }: NewsletterFormProps) {
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
            const { error } = await supabase.from("newsletter_subscribers").insert([{ email }]);
            if (error) {
                if (error.code === "23505") {
                    alert("This email is already subscribed.");
                } else {
                    alert(`Subscription failed: ${error.message}`);
                }
            } else {
                onSuccess(); // Call onSuccess prop on successful subscription
                setEmail(""); // Reset email field
            }
        } catch (err) {
            console.error("Subscription error:", err);
            alert("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className="text-sm font-semibold mb-3 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                Newsletter
            </h3>
            <p className="text-xs text-gray-300 mb-3">Stay updated with our latest news and offers.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-50"
                >
                    {loading ? "Subscribing..." : "Subscribe"}
                </button>
            </form>
        </div>
    );
}

export default NewsletterForm;
