// src/components/Thankyou.tsx
import React from "react";

interface ThankyouProps {
    isOpen: boolean;
    onClose: () => void;
}

const Thankyou: React.FC<ThankyouProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 px-4">

            <div className="
                relative w-full max-w-2xl p-10 rounded-3xl text-center shadow-2xl
                bg-gradient-to-b from-[#2f235a] via-[#241b47] to-[#1a1535]
                border border-white/10
            ">

                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl"
                >
                    &times;
                </button>

                {/* Floating Check Icon */}
                <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[#a98bff] to-[#6b4dfc] flex items-center justify-center shadow-lg mb-6">
                    <span className="text-white text-3xl">✔</span>
                </div>

                {/* Gradient Heading */}
                <h2 className="
                    text-3xl font-bold mb-4
                    bg-gradient-to-r from-[#3bb3ff] via-[#7e5bff] to-[#ff66c4]
                    text-transparent bg-clip-text
                ">
                    Thank you for your interest!
                </h2>

                {/* Description */}
                <p className="text-gray-200 text-lg leading-relaxed mb-6">
                    We’re polishing the Back&Bone app experience right now.
                    You'll receive an email with the download link as soon as the
                    mobile apps go live.
                </p>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="
                        px-8 py-3 rounded-2xl font-semibold text-white
                        bg-gradient-to-r from-[#4caeff] to-[#7c5bff]
                        hover:from-[#3d9eff] hover:to-[#6a4fff]
                        shadow-[0_8px_25px_rgba(100,80,255,0.45)]
                        transition-all duration-300
                    "
                >
                    Close
                </button>

                {/* Support Text */}
                <p className="text-sm text-gray-300 mt-8">
                    If you have any questions in the meantime, reach us at
                    <br />
                    <a
                        href="mailto:support@backandbone.com"
                        className="text-blue-300 font-semibold hover:underline"
                    >
                        support@backandbone.com
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Thankyou;
