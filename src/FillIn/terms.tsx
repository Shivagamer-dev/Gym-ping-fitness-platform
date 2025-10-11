import Contact from '../components/contact';
import { Helmet } from 'react-helmet-async';

function Terms() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">

            <Helmet>
                <title>Terms & Conditions - Back&Bone Fitness App</title>
                <meta name="description" content="Read the Terms & Conditions for using Back&Bone fitness app. Understand your rights, responsibilities, and legal agreements with our services." />
                <meta name="keywords" content="Back&Bone, terms and conditions, user agreement, fitness app terms, legal, privacy, compliance" />
                <meta property="og:title" content="Terms & Conditions - Back&Bone Fitness App" />
                <meta property="og:description" content="Review the legal terms and conditions governing your use of Back&Bone fitness app and services." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://backandbone.com/terms" />
                <meta property="og:image" content="https://backandbone.com/assets/images/LineLogoSVG.svg" />
                <meta property="og:image" content="https://backandbone.com/assets/images/LineLogoSVG.svg" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Terms & Conditions - Back&Bone Fitness App" />
                <meta name="twitter:description" content="Understand the terms and conditions for using Back&Bone fitness app to ensure compliance and informed use." />
                <meta name="twitter:image" content="https://backandbone.com/assets/images/LineLogoSVG.svg" />
                <meta name="twitter:image" content="https://backandbone.com/assets/images/LineLogoSVG.svg" />
            </Helmet>

            {/* Header Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                <div className="relative max-w-4xl mx-auto px-6 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Terms & Conditions
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Your agreement with Back&Bone. Please read these terms carefully before using our services.
                        </p>
                        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl px-6 py-3 inline-block">
                            <p className="text-sm text-gray-400">Last Updated: October 02, 2025</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 pb-16">

                {/* Introduction */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Welcome to Back&Bone
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-lg mb-6">
                        Welcome to <span className="text-blue-400 font-semibold">Back&Bone</span>. These Terms and Conditions ("Terms")
                        govern your use of the Back&Bone mobile application and webpage ("App") and any related services. By accessing
                        or using the App, you agree to be bound by these Terms.
                    </p>
                    <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4">
                        <p className="text-amber-300 font-medium">
                            If you do not agree with these Terms, you must not use the App.
                        </p>
                    </div>
                </section>

                {/* Eligibility */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        1. Eligibility
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                            <p className="text-gray-300 text-lg">You must be at least <span className="text-blue-400 font-semibold">16 years old</span> to use Back&Bone.</p>
                        </div>
                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                            <p className="text-gray-300 text-lg">By creating an account, you confirm that the information you provide is accurate and complete.</p>
                        </div>
                    </div>
                </section>

                {/* Account and Security */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        2. Account & Security
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                            <h3 className="text-xl font-semibold mb-4 text-purple-300 flex items-center">
                                <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                                Your Responsibilities
                            </h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-purple-400 mr-3">•</span>
                                    <span>Maintain the confidentiality of your account credentials</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-purple-400 mr-3">•</span>
                                    <span>Immediately notify us of any unauthorized access to your account</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-pink-900/20 border border-pink-500/30 rounded-xl p-4">
                            <p className="text-pink-300 font-medium">
                                We reserve the right to suspend or terminate accounts that violate these Terms or pose a security risk.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Acceptable Use */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                        3. Acceptable Use
                    </h2>
                    <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-semibold mb-4 text-red-300 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            You agree NOT to:
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <span className="text-red-400 mr-3">×</span>
                                    <span className="text-gray-300">Use Back&Bone for unlawful, harmful, or abusive purposes</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-red-400 mr-3">×</span>
                                    <span className="text-gray-300">Upload false, misleading, or offensive content</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <span className="text-red-400 mr-3">×</span>
                                    <span className="text-gray-300">Interfere with the App's functionality, security, or availability</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-red-400 mr-3">×</span>
                                    <span className="text-gray-300">Copy, modify, or reverse engineer the App or its features</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Health & Fitness Disclaimer */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        4. Health & Fitness Disclaimer
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-3 text-yellow-300 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                Important Medical Disclaimer
                            </h3>
                            <div className="space-y-3 text-gray-300">
                                <p>Back&Bone provides fitness management tools, exercise recommendations, and health tracking features for <strong>informational purposes only</strong>.</p>
                                <p className="text-yellow-200 font-medium">The App does not provide medical advice. Always consult a qualified healthcare provider before beginning any fitness program.</p>
                            </div>
                        </div>
                        <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-4">
                            <p className="text-orange-300 font-medium">
                                You assume all risks associated with your exercise and health activities. We are not responsible for injuries, health issues, or damages resulting from your use of the App.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content and Intellectual Property */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        5. Content & Intellectual Property
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                            <h3 className="text-xl font-semibold mb-4 text-indigo-300 flex items-center">
                                <div className="w-3 h-3 bg-indigo-400 rounded-full mr-3"></div>
                                Our Property
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                All software, designs, trademarks, logos, and content in Back&Bone are the property of Back&Bone or its licensors.
                                You may not reproduce, distribute, or use Back&Bone's intellectual property without permission.
                            </p>
                        </div>
                        <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                            <h3 className="text-xl font-semibold mb-4 text-purple-300 flex items-center">
                                <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                                Your Content
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                User-generated content (e.g., workout logs, reviews, comments) remains your responsibility. By submitting content,
                                you grant Back&Bone a limited, non-exclusive license to use it to provide the App's services.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Data Privacy */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        6. Data Privacy
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                            <p className="text-gray-300 text-lg">We collect and process personal data in compliance with the Information Technology Act, 2000, and applicable Indian data protection guidelines.</p>
                        </div>
                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                            <p className="text-gray-300 text-lg">We use third-party services (e.g., gym locator, exercise database, authentication, APIs) and are not responsible for their independent privacy practices.</p>
                        </div>
                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                            <p className="text-gray-300 text-lg">You are responsible for managing the privacy of the data you choose to share within the App.</p>
                        </div>
                    </div>
                </section>

                {/* Third-Party Links and Services */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        7. Third-Party Links & Services
                    </h2>
                    <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Back&Bone may contain links or integrations with third-party services. We do not endorse or control these
                            services and are not responsible for their content, availability, or practices.
                        </p>
                    </div>
                </section>

                {/* Subscription and Payments */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        8. Subscription & Payments
                    </h2>
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                                <h3 className="text-lg font-semibold mb-3 text-purple-300">Payment Terms</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-start">
                                        <span className="text-purple-400 mr-2">•</span>
                                        <span>Payment terms displayed at purchase</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-400 mr-2">•</span>
                                        <span>Auto-renewal unless canceled</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                                <h3 className="text-lg font-semibold mb-3 text-pink-300">Compliance</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-start">
                                        <span className="text-pink-400 mr-2">•</span>
                                        <span>RBI regulations compliant</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-pink-400 mr-2">•</span>
                                        <span>Indian e-commerce law adherent</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-pink-900/20 border border-pink-500/30 rounded-xl p-4">
                            <p className="text-pink-300 font-medium">
                                All fees are non-refundable unless required by Indian law.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Limitation of Liability */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                        9. Limitation of Liability
                    </h2>
                    <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-semibold mb-4 text-red-300">
                            To the maximum extent permitted by Indian law:
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <span className="text-red-400 mr-3">•</span>
                                <span className="text-gray-300">Back&Bone will not be liable for personal injury, health issues, or damages arising from fitness activities</span>
                            </div>
                            <div className="flex items-start">
                                <span className="text-red-400 mr-3">•</span>
                                <span className="text-gray-300">We are not responsible for service interruptions, technical errors, or data loss</span>
                            </div>
                            <div className="flex items-start">
                                <span className="text-red-400 mr-3">•</span>
                                <span className="text-gray-300">We are not liable for the actions of third-party services integrated into the App</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                        <p className="text-gray-300 font-medium">
                            Your sole remedy is to stop using the App.
                        </p>
                    </div>
                </section>

                {/* Termination & Governing Law */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                10. Termination
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <span className="text-orange-400 mr-3">•</span>
                                    <span className="text-gray-300">We may suspend or terminate accounts that violate these Terms</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="text-orange-400 mr-3">•</span>
                                    <span className="text-gray-300">You may stop using Back&Bone at any time by deleting your account</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                11. Governing Law
                            </h2>
                            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                                <p className="text-blue-300 font-medium">
                                    These Terms shall be governed by and construed in accordance with the laws of India.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Compliance with Indian Law */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        12. Compliance with Indian Law
                    </h2>
                    <div className="space-y-6">
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Users must comply with the provisions of the Information Technology Act, 2000, the Consumer Protection Act, 2019,
                            and all other applicable laws while using the App.
                        </p>
                        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                            <p className="text-red-300 font-medium">
                                Any unlawful, fraudulent, or abusive use of Back&Bone will result in immediate termination and may be reported to authorities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Changes to Terms */}
                <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        13. Changes to These Terms
                    </h2>
                    <div className="space-y-4">
                        <p className="text-gray-300 leading-relaxed text-lg">
                            We may update these Terms from time to time. Changes will be effective once posted in the App or on our website.
                        </p>
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
                            <p className="text-purple-300 font-medium">
                                Continued use of Back&Bone after changes means you accept the new Terms.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Information */}
                <Contact />
            </div>
        </div>
    );
}

export default Terms;
