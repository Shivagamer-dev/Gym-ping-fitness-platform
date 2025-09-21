import Contact from "../components/contact";
import { Helmet } from "react-helmet-async";
function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">

      <Helmet>
        <title>Privacy Policy - Back&Bone Fitness App</title>
        <meta name="description" content="Learn how Back&Bone protects your privacy and data with transparent policies, secure practices, and user control. Your trust matters to us." />
        <meta name="keywords" content="Back&Bone, privacy policy, data protection, fitness app privacy, user data security, GDPR, CCPA" />
        <meta property="og:title" content="Privacy Policy - Back&Bone Fitness App" />
        <meta property="og:description" content="Understand how Back&Bone collects, uses, and safeguards your personal information in our comprehensive Privacy Policy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/privacy-policy" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy - Back&Bone Fitness App" />
        <meta name="twitter:description" content="Your privacy is our priority. Read Back&Bone's Privacy Policy to see how we protect your data and respect your rights." />
      </Helmet>

      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your privacy matters. Here's how we protect your data and respect your trust.
            </p>
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl px-6 py-3 inline-block">
              <p className="text-sm text-gray-400">Last Updated: September 08, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        
        {/* Introduction */}
        <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            1. Introduction
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            <span className="text-blue-400 font-semibold">Back&Bone</span> App respects your privacy and is committed to protecting 
            the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect 
            information when you use our website and mobile application (together, the "Services").
          </p>
          <div className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
            <p className="text-blue-300 font-medium">
              By using our Services, you agree to the terms of this Privacy Policy.
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            2. Information We Collect
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            We may collect the following types of information:
          </p>

          <div className="space-y-6">
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 group hover:bg-gray-700/40 transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-blue-300 flex items-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                Personal Information (provided by you)
              </h3>
              <ul className="text-gray-300 leading-relaxed">
                <li className="flex items-start mb-2">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Name, email address, and contact details when signing up, contacting support, or subscribing to updates.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 group hover:bg-gray-700/40 transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-purple-300 flex items-center">
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                Usage Information (automatically collected)
              </h3>
              <ul className="text-gray-300 leading-relaxed">
                <li className="flex items-start mb-2">
                  <span className="text-purple-400 mr-2">•</span>
                  <span>App/website interactions, pages visited, actions taken, IP address, browser/device type, operating system.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 group hover:bg-gray-700/40 transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-green-300 flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                Location Data (with your consent)
              </h3>
              <ul className="text-gray-300 leading-relaxed">
                <li className="flex items-start mb-2">
                  <span className="text-green-400 mr-2">•</span>
                  <span>For the Locator feature, we may collect your approximate or precise location to display nearby gyms.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 group hover:bg-gray-700/40 transition-colors">
              <h3 className="text-xl font-semibold mb-4 text-yellow-300 flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                Health/Fitness Data (future features, with consent)
              </h3>
              <ul className="text-gray-300 leading-relaxed">
                <li className="flex items-start mb-2">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>If integrated with wearables, we may process steps, heart rate, workout details, and related metrics.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            We use collected information to:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Deliver and improve our Services.</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Provide exercise guidance, gym discovery, and personalized recommendations.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Communicate updates, promotions, or offers (only with consent).</p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-gray-300">Analyze usage trends to enhance performance and security.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sharing */}
        <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            4. Data Sharing and Disclosure
          </h2>
          
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-red-300 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Important Notice
            </h3>
            <p className="text-gray-300 font-medium">
              We do not sell your personal information. We may share data only with:
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-xl font-semibold mb-3 text-yellow-300 flex items-center">
                <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
                Service Providers
              </h3>
              <p className="text-gray-300">Vendors that help us operate (e.g., hosting, analytics, maps)</p>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-xl font-semibold mb-3 text-orange-300 flex items-center">
                <div className="w-4 h-4 bg-orange-400 rounded-full mr-3"></div>
                Legal Authorities
              </h3>
              <p className="text-gray-300">If required by law, court order, or to protect our legal rights</p>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-xl font-semibold mb-3 text-red-300 flex items-center">
                <div className="w-4 h-4 bg-red-400 rounded-full mr-3"></div>
                Business Transfers
              </h3>
              <p className="text-gray-300">In case of a merger, acquisition, or restructuring, data may transfer as a part of asset.</p>
            </div>
          </div>
        </section>

        {/* Data Retention */}
        <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            5. Data Retention
          </h2>
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
            <p className="text-gray-300 leading-relaxed text-lg">
              We retain your information only as long as necessary for the purposes outlined in this Policy or as required by law.
            </p>
          </div>
        </section>

        {/* Data Security */}
        <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            6. Data Security
          </h2>
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
            <p className="text-gray-300 leading-relaxed text-lg">
              We implement industry-standard security measures to protect your data. However, no method of transmission or 
              storage is 100% secure. You use our Services at your own risk.
            </p>
          </div>
        </section>

        {/* Your Rights */}
{/* Your Rights */}
        <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            7. Your Privacy Rights & Controls
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-8">
            Your data belongs to you. We believe in giving you complete transparency and control over your personal information. 
            Depending on your location, you may have additional rights under privacy laws like GDPR or CCPA.
          </p>

          <div className="space-y-6">
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-xl font-semibold mb-4 text-purple-300 flex items-center">
                <div className="w-4 h-4 bg-purple-400 rounded-full mr-3"></div>
                Access & Manage Your Data
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">You can always:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Access and review all your personal information through your account dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Update, correct, or modify your information at any time</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Download a copy of your workout data and progress history</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Adjust your privacy settings and communication preferences</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">You can also request:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Complete deletion of your account and associated data</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Restriction of certain data processing activities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Data portability to transfer your information to another service</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Detailed explanation of our data practices for specific activities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h3 className="text-xl font-semibold mb-4 text-pink-300 flex items-center">
                <div className="w-4 h-4 bg-pink-400 rounded-full mr-3"></div>
                Consent Management
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  You have the right to withdraw consent to data processing at any time, especially for location data and health data. 
                  This includes the ability to revoke permissions for specific features while continuing to use other parts of the app.
                </p>
                <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-pink-300 mb-2">Easy Opt-Out Options:</h4>
                  <ul className="text-sm text-gray-300import { Link } from 'react-router-dom'">
                    <li className="mb-1">In-app settings to disable location tracking or wearable integrations</li>
                    <li className="mb-1">Unsubscribe links in promotional emails</li>
                    <li className="mb-1">Contact support for any specific data requests</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>  

        {/* Third-Party Services */}
        <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            8. Third-Party Services
          </h2>
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
            <p className="text-gray-300 leading-relaxed text-lg">
              Our Services may integrate with third-party providers (e.g., Google Maps, analytics, wearable APIs). 
              Their collection and use of data is governed by their own privacy policies.
            </p>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            9. Children's Privacy
          </h2>
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
            <p className="text-gray-300 leading-relaxed text-lg">
              Our Services are not directed to children under 13. We do not knowingly collect data from children. 
              If we discover such a collection, we will delete it immediately.
            </p>
          </div>
        </section>

        {/* Policy Changes */}
        <section className="mb-12 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/40 transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            10. Changes to This Privacy Policy
          </h2>
          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
            <p className="text-gray-300 leading-relaxed text-lg">
              We may update this Privacy Policy from time to time. The revised version will be posted with an 
              updated "Last Updated" date.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <Contact />
      </div>
    </div>
  );
}

export default Privacy;