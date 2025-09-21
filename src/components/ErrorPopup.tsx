import React from "react";

interface ErrorPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ isOpen, onClose, title = "Error", message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-white text-center relative">
                <button
                    className="absolute top-2 right-2 text-white text-3xl font-bold leading-none hover:text-red-400 transition-colors"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-3xl font-bold mb-4 text-red-500">{title}</h2>
                <p className="mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-lg font-semibold transition-all duration-300"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ErrorPopup;
