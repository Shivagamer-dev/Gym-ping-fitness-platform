import React from "react";

interface ThankyouProps {
    isOpen: boolean;
    onClose: () => void;
}

const Thankyou: React.FC<ThankyouProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 min-h-screen">
            <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Thanks for reaching out!</h2>
                <p className="mb-6">We’ve got your submission and we’re excited to connect. You’ll hear from us soon if there’s anything else to share!</p>
                <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all duration-300"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Thankyou;
