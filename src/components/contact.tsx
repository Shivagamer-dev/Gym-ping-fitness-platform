import { Link } from 'react-router-dom';
function Contact() {
    return (
        <section className="mb-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
                14. Contact Us
            </h2>

            <div className="text-center mb-8">
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                    For questions or concerns about these Terms, we're here to help.
                </p>
            </div>

            <div className="flex justify-center">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 text-center hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 max-w-md">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-300">Email Support</h3>
                    <a
                        href="mailto:support@backandbone.com"
                        className="text-blue-400 hover:text-blue-300 underline text-lg font-medium transition-colors"
                    >
                        support@backandbone.com
                    </a>
                    <p className="text-gray-400 text-sm mt-2">We typically respond within 24 hours</p>
                </div>
            </div>

            <div className="text-center mt-8">
                <p className="text-gray-400">
                    Need immediate assistance? Visit our{' '}
                    <Link to="/support" className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors">
                        Support Center
                    </Link>
                    {' '}for quick help and resources.
                </p>
            </div>
        </section>
    );
}

export default Contact;