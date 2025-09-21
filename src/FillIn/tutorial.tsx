import tutorialData from "../assets/data/tutorials.json";
import HowItWorks from "../components/HowItWorks";
import { Helmet } from "react-helmet-async";

function Tutorial() {
  const getFeatureIcon = (featureName: string) => {
    switch (featureName.toLowerCase()) {
      case 'spotter':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'locator':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'repbot':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'dashboard':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getFeatureGradient = (index: number) => {
    const gradients = [
      'from-red-500 to-orange-500',
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">

      <Helmet>
        <title>Back&Bone Tutorial - Master Your Fitness Journey</title>
        <meta name="description" content="Explore step-by-step guides, video tutorials, and expert tips to master Back&Bone's powerful fitness features like Spotter, Locator, RepBot AI, and Dashboard." />
        <meta name="keywords" content="Back&Bone, fitness tutorial, Spotter, Locator, RepBot AI, Dashboard, fitness guides, video tutorials, expert tips" />
        <meta property="og:title" content="Back&Bone Tutorial - Master Your Fitness Journey" />
        <meta property="og:description" content="Explore step-by-step guides, video tutorials, and expert tips to master Back&Bone's powerful fitness features." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tutorial" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Back&Bone Tutorial - Master Your Fitness Journey" />
        <meta name="twitter:description" content="Explore step-by-step guides, video tutorials, and expert tips to master Back&Bone's powerful fitness features." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-blue-600/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
              Master Your Fitness Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Learn how to unlock the full potential of Back&Bone's powerful features. 
              From exercise guidance to AI-powered coaching, we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                Step-by-Step Guides
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Video Tutorials
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Expert Tips
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Quick Start Guide</h2>
          <p className="text-gray-400 text-lg">Get up and running in just a few simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Download & Install</h3>
            <p className="text-gray-400">Get Back&Bone from the App Store or Google Play Store</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
            <p className="text-gray-400">Set up your fitness goals and preferences for personalized experience</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Start Your Journey</h3>
            <p className="text-gray-400">Explore features, find gyms, and begin your fitness transformation</p>
          </div>
        </div>
      </div>

      <HowItWorks />

      {/* Feature Tutorials Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Feature Tutorials</h2>
          <p className="text-gray-400 text-lg">Master each powerful feature with our comprehensive guides</p>
        </div>

        {tutorialData.features.map((feature, index) => (
          <div key={index} className="mb-20 last:mb-0">
            <div className={`bg-gradient-to-r ${getFeatureGradient(index)} p-1 rounded-2xl mb-8`}>
              <div className="bg-gray-900 rounded-2xl p-8">
                {/* Feature Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${getFeatureGradient(index)} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    {getFeatureIcon(feature.name)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-2">{feature.name}</h3>
                    <p className="text-xl text-gray-300 mb-4">{feature.subtitle}</p>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>

                {/* Video Tutorial */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div className="order-2 lg:order-1">
                    <h4 className="text-2xl font-semibold mb-6 text-white">How to Use {feature.name}</h4>
                    
                    {/* Step by Step Guide */}
                    <div className="space-y-4 mb-8">
                      {feature.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex gap-4 items-start">
                          <div className={`w-8 h-8 bg-gradient-to-r ${getFeatureGradient(index)} rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold`}>
                            {stepIndex + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-white mb-1">{step.title}</h5>
                            <p className="text-gray-400 text-sm">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Benefits */}
                    <div>
                      <h4 className="text-xl font-semibold mb-4 text-white">Key Benefits</h4>
                      <div className="grid gap-2">
                        {feature.benefits.map((benefit: string, benefitIndex: number) => (
                          <div key={benefitIndex} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* YouTube Video Embed */}
                  <div className="order-1 lg:order-2">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
                        src={`https://www.youtube.com/embed/${feature.videoId}?rel=0&modestbranding=1`}
                        title={`${feature.name} Tutorial`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-400 text-sm">
                        Watch our comprehensive {feature.name} tutorial
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Support Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-t border-gray-700/50">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Need More Help?</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Our support team is here to help you get the most out of Back&Bone. 
            Check out our comprehensive FAQ section or get in touch directly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/support"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Visit Support Center
            </a>
            <a
              href="mailto:support@backandbone.com"
              className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
