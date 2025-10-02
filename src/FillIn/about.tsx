import { Helmet } from "react-helmet-async";
// import InstaPosts from "../components/instaPosts";
import Team from "../Home/Team";

function About() {
  return (
    <div className="min-h-screen bg-black text-white">

      <Helmet>
        <title>About Back&Bone - Revolutionizing Fitness with AI-Powered Tools</title>
        <meta name="description" content="Discover Back&Bone's vision to transform fitness through intelligent technology, personalized experiences, and a supportive community. Learn about our powerful features like Locator, Spotter, RepBot AI, and upcoming Dashboard." />
        <meta name="keywords" content="Back&Bone, fitness app, AI fitness coach, gym locator, workout tracker, personalized training, fitness community, Spotter, RepBot AI, fitness dashboard" />
        <meta property="og:title" content="About Back&Bone - Revolutionizing Fitness with AI-Powered Tools" />
        <meta property="og:description" content="Explore how Back&Bone is building a complete fitness ecosystem with AI-driven features and a community-driven approach to help you achieve your wellness goals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://backandbone.com/about" />
        <meta property="og:image" content="https://backandbone.com/og-about-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Back&Bone - Revolutionizing Fitness with AI-Powered Tools" />
        <meta name="twitter:description" content="Learn about Back&Bone's mission to democratize fitness with AI-powered tools and a supportive community." />
        <meta name="twitter:image" content="https://backandbone.com/twitter-about-image.jpg" />
      </Helmet>

      {/* Hero Section - Gradient from top */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-blue-950/30 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 mt-3 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Back&Bone
            </h1>
            <p className="text-xl md:text-2xl mb-3 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing fitness through intelligent technology and personalized experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section - Smooth transition */}
      <div className="relative bg-gradient-to-b from-transparent via-black to-transparent">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Our Vision
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Back&Bone isn't just another fitness app – it's your complete fitness ecosystem. We're building the bridge between where you are and where you want to be on your wellness journey.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Whether you're taking your first steps into fitness or you're a seasoned athlete, our platform adapts to your needs, grows with your progress, and celebrates every milestone along the way.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">2</div>
                    <div className="text-gray-400">Founders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
                    <div className="text-gray-400">Gyms Mapped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">1.5K+</div>
                    <div className="text-gray-400">Workouts Enlisted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                    <div className="text-gray-400">AI Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section with gradient wrapper */}
      <div className="relative bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
        <Team />
      </div>

      {/* <InstaPosts /> */}

      {/* Features Section - Smooth gradient transition */}
      <div className="relative bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/30 to-black"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Powerful Features, Simple Experience
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Every tool you need to transform your fitness journey, all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Spotter */}
            <div className="group">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Spotter</h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Master every movement with exercise videos, form tips, and progressive training guides.
                </p>
              </div>
            </div>

            {/* Locator */}
            <div className="group">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Locator</h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Find the perfect gym with detailed equipment lists, real-time availability, and authentic reviews from our community.
                </p>
              </div>
            </div>

            {/* RepBot AI */}
            <div className="group">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">RepBot AI</h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Your 24/7 AI fitness coach providing personalized workout plans, nutrition advice, and real-time form corrections.
                </p>
              </div>
            </div>

            {/* Dashboard */}
            <div className="group">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 relative">
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  Coming Soon
                </div>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Dashboard</h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Comprehensive analytics tracking your progress, milestones, and health metrics with beautiful, actionable insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section - Gradient transition */}
      <div className="relative bg-gradient-to-b from-transparent via-violet-950/40 to-transparent">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Back&Bone Stands Apart
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Privacy First</h3>
              <p className="text-gray-300 leading-relaxed">
                Your data belongs to you. We use encryption and never sell your personal information to third parties.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-gray-300 leading-relaxed">
                Built for speed with cutting-edge technology that delivers instant results and seamless performance across all devices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Community Driven</h3>
              <p className="text-gray-300 leading-relaxed">
                Join a supportive community of fitness enthusiasts sharing experiences, tips, and celebrating victories together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement - Final gradient fade */}
      <div className="relative bg-gradient-to-b from-black via-blue-950/35 to-gray-900/50">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            To democratize fitness by making professional-grade tools and knowledge accessible to everyone,
            regardless of experience level or budget. We believe everyone deserves to feel strong, healthy, and confident.
          </p>
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 inline-block">
            <p className="text-lg text-blue-400 font-semibold italic">
              "Growth happens not when you're at your best, but when you're willing to show up even when you feel your worst."
            </p>
            <p className="text-gray-400 mt-2">- The Back&Bone Team</p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-2">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;