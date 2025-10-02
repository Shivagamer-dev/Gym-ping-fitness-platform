import React from "react";

interface AppDownloadPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const AppDownloadPopup: React.FC<AppDownloadPopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-white text-center relative shadow-lg">
                <button
                    className="absolute top-2 right-2 text-white text-3xl font-bold leading-none hover:text-pink-400 transition-colors"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-3xl font-bold mb-4 text-green-500">Thank You!</h2>
                <p className="mb-6 text-lg">
                    We are glad that you expressed your interest. Our app is currently under development. We will notify you as soon as it's available for download.
                </p>
                <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-lg font-semibold transition-all duration-300"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AppDownloadPopup;
