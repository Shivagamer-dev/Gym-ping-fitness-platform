import React, { useState } from 'react';

// Sample Instagram post URLs - replace with your actual post URLs
const SAMPLE_POSTS = [
    'https://www.instagram.com/p/DOvxci3EtNu/',
    'https://www.instagram.com/p/DO0x-FjjAJC/',
    'https://www.instagram.com/p/DPB7lHmD04P/',
];

interface InstaPostsProps {
    posts?: string[];
    title?: string;
    className?: string;
    postWidth?: string;
    postHeight?: string;
}

const InstaPosts: React.FC<InstaPostsProps> = ({
    posts = SAMPLE_POSTS,
    title,
    className = "",
    postWidth = "w-80",
    postHeight = "h-96"
}) => {
    const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});
    const [errorStates, setErrorStates] = useState<{ [key: number]: boolean }>({});

    const handleLoad = (index: number) => {
        setLoadingStates(prev => ({ ...prev, [index]: false }));
    };

    const handleError = (index: number) => {
        setLoadingStates(prev => ({ ...prev, [index]: false }));
        setErrorStates(prev => ({ ...prev, [index]: true }));
    };

    return (
        <div className={`w-full ${className}`}>
            {title && (
                <h3 className="text-2xl font-bold mb-6 text-white">{title}</h3>
            )}

            <div className="overflow-x-auto" style={{
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
            }}>
                <div className={`flex gap-4 items-center py-4 ${posts.length <= 3 ? 'justify-center' : ''}`}>
                    {posts.map((postUrl, index) => {
                        const embedUrl = `${postUrl}embed/`;
                        const isLoading = loadingStates[index] !== false;
                        const hasError = errorStates[index];

                        return (
                            <div
                                key={index}
                                className={`${postWidth} ${postHeight} flex-shrink-0 relative bg-gray-900 rounded-xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300`}
                            >
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 animate-pulse z-10">
                                        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}

                                {hasError ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-300 p-6">
                                        <div className="text-center">
                                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                </svg>
                                            </div>
                                            <h4 className="text-lg font-semibold mb-2 text-white">Instagram Post</h4>
                                            <p className="text-sm text-gray-400 mb-3">Content from our latest updates</p>
                                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                                <span>Follow @backandbone</span>
                                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            </div>
                                            <a
                                                href="https://instagram.com/backandbone"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-sm rounded-lg transition-all duration-200"
                                            >
                                                View on Instagram
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <iframe
                                        src={embedUrl}
                                        className="w-full h-full border-0 instagram-embed"
                                        onLoad={() => handleLoad(index)}
                                        onError={() => handleError(index)}
                                        allowTransparency={true}
                                        frameBorder="0"
                                        scrolling="no"
                                        title={`Instagram post ${index + 1}`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
          
          /* Attempt to style Instagram embeds - limited success */
          .instagram-embed {
            filter: brightness(0.8) contrast(1.1);
          }
          
          /* Try to target Instagram content inside iframe - may not work due to CORS */
          iframe[src*="instagram.com"] {
            background: #1f2937 !important;
          }
        `
            }} />
        </div>
    );
};

export default InstaPosts;
