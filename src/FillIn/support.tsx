import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// Type definitions
interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

function Support() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<FAQ[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/BUTDRILL1/backnbone-data/contents/faq.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { content } = await response.json();
        const decodedContent = atob(content);
        const data: FAQ[] = JSON.parse(decodedContent);
        setFaqData(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaq();
  }, []);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">

      <Helmet>
        <title>Help Center & FAQ - Back&Bone Fitness App</title>
        <meta name="description" content="Find answers to common questions and get support for Back&Bone fitness app. Explore our Help Center and FAQs to get the assistance you need." />
        <meta name="keywords" content="Back&Bone, help center, FAQ, support, fitness app help, customer support, fitness app FAQ" />
        <meta property="og:title" content="Help Center & FAQ - Back&Bone Fitness App" />
        <meta property="og:description" content="Explore Back&Bone's Help Center and Frequently Asked Questions to get support and make the most of your fitness journey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://backandbone.com/support" />
        <meta property="og:image" content="https://backandbone.com/assets/images/LineLogoSVG.svg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Help Center & FAQ - Back&Bone Fitness App" />
        <meta name="twitter:description" content="Get support and answers to your questions with Back&Bone's Help Center and FAQ page." />
        <meta name="twitter:image" content="https://backandbone.com/assets/images/LineLogoSVG.svg" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Help Center
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Find answers to your questions and get the help you need to make the most of Back&Bone.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Click on any question to see the answer</p>
        </div>

        {/* FAQ Items */}
        {loading && <div className="text-center py-16 text-gray-400">Loading FAQs...</div>}
        {error && <div className="text-center py-16 text-red-500">Error: {error}</div>}

        {faqData && faqData.length > 0 ? (
          <div className="space-y-6">
            {faqData.map((faq: FAQ, index: number) => {
              const isExpanded = expandedIndex === index;
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative rounded-2xl transition-all duration-300 ${isHovered || isExpanded
                    ? 'bg-gradient-to-b from-blue-600/10 to-purple-600/10 border-2 border-blue-500/30 shadow-xl shadow-blue-500/10'
                    : 'bg-gray-800/50 border border-gray-700/50'
                    } backdrop-blur-sm hover:scale-[1.02] cursor-pointer`}
                  onClick={() => toggleExpanded(index)}
                >
                  <div className="p-6">
                    {/* Question Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white pr-4 flex-1">
                        {faq.question}
                      </h3>
                      <div className={`w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all duration-300 ${isExpanded ? 'border-blue-400 bg-blue-500/20 rotate-180' : 'hover:border-blue-400'
                        }`}>
                        <svg
                          className={`w-4 h-4 transition-colors duration-300 ${isExpanded ? 'text-blue-400' : 'text-gray-400'}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Answer with smooth expand/collapse */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                      }`}>
                      <div className="pt-4 border-t border-gray-600/30">
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Subtle gradient overlay for expanded state */}
                  {isExpanded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl pointer-events-none" />
                  )}
                </div>
              );
            })}
          </div>
        ) : (!loading && !error && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No FAQs available</h3>
            <p className="text-gray-400 mb-6">We couldn't load any frequently asked questions at this time.</p>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-t border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Our support team is here to help you succeed on your fitness journey.
            </p>
          </div>

          <div className='flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12'>
            <div className="flex justify-center">
              {/* Email Support */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center hover:bg-gray-800/50 transition-all duration-300 max-w-md w-full">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3">Email Support</h3>
                <p className="text-gray-400 mb-6 text-lg">Get detailed help via email</p>
                <a
                  href="mailto:support@backandbone.com"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors duration-300"
                >
                  support@backandbone.com
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="mt-6 md:mt-12 text-center">
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 inline-block">
                <h3 className="text-xl font-semibold mb-2">Response Time</h3>
                <p className="text-gray-300">
                  We typically respond within 24 hours<br />
                  <span className="text-blue-400">Monday - Friday</span><br />
                  <span className="text-gray-400">Faster response during business hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
